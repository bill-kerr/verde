import type { PlaidGetTransactionsResponse } from '$lib/common/types/plaid';
import { formatDate, parseDateString } from '$lib/common/utils/date-utils';
import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { prisma } from '$lib/server/clients/prisma';
import { convertAmount, convertPaymentChannel } from '$lib/server/utils/plaid-conversions';
import type { Transaction } from '@prisma/client';

function buildOffsetArray(totalTransactions: number): number[] {
	const requiredRequestCount = Math.ceil((totalTransactions - 500) / 500);
	return new Array(requiredRequestCount).map((_, i) => (i + 1) * 500);
}

async function getTransactions(accessToken: string, offset = 0): Promise<PlaidGetTransactionsResponse> {
	return plaidAxiosClient
		.post<PlaidGetTransactionsResponse>('/transactions/get', {
			access_token: accessToken,
			start_date: '1990-01-01',
			end_date: formatDate(new Date()),
			options: {
				count: 500,
				offset,
			},
		})
		.then(({ data }) => data);
}

async function getPaginatedTransactions(accessToken: string): Promise<PlaidGetTransactionsResponse> {
	const firstResponse = await getTransactions(accessToken, 0);
	const offsets = buildOffsetArray(firstResponse.total_transactions);
	const plaidPromises = offsets.map((offset) => getTransactions(accessToken, offset));
	const otherResponses = await Promise.all(plaidPromises);
	const mergedAccounts = [...firstResponse.accounts];
	const mergedTransactions = [...firstResponse.transactions];
	otherResponses.forEach((response) => {
		const newAccounts = response.accounts.filter(
			(account) => !mergedAccounts.find((mergedAccount) => mergedAccount.account_id === account.account_id),
		);
		mergedAccounts.push(...newAccounts);
		mergedTransactions.push(...response.transactions);
	});
	return {
		item: firstResponse.item,
		total_transactions: firstResponse.total_transactions,
		request_id: firstResponse.request_id,
		accounts: mergedAccounts,
		transactions: mergedTransactions,
	};
}

export async function syncTransactions(userId: string): Promise<void> {
	const institutions = await prisma.userInstitution.findMany({ where: { userId } });

	const responsePromises = institutions.map((institution) => getPaginatedTransactions(institution.plaidAccessToken));
	const results = await Promise.all(responsePromises);

	const accountIds = results.map((result) => result.accounts.map((account) => account.account_id)).flat();
	const userAccounts = await prisma.userAccount.findMany({
		where: { userId, plaidAccountId: { in: accountIds } },
	});

	const upsertPromises = results
		.map((result) => {
			const promises: Promise<Transaction>[] = [];
			result.transactions.forEach((plaidTransaction) => {
				const userAccountId = userAccounts.find(
					(userAccount) => userAccount.plaidAccountId === plaidTransaction.account_id,
				)?.id;
				if (!userAccountId) {
					return;
				}
				const payload = {
					amount: convertAmount(plaidTransaction.amount),
					date: parseDateString(plaidTransaction.date),
					isPending: plaidTransaction.pending,
					name: plaidTransaction.name,
					paymentChannel: convertPaymentChannel(plaidTransaction.payment_channel),
					plaidTransactionId: plaidTransaction.transaction_id,
					userId,
					category: plaidTransaction.category ?? [],
					merchantName: plaidTransaction.merchant_name,
				};
				promises.push(
					prisma.transaction
						.upsert({
							where: { plaidTransactionId: plaidTransaction.transaction_id },
							create: {
								...payload,
								userAccountId,
							},
							update: payload,
						})
						.then((transaction) => transaction),
				);
			});
			return promises;
		})
		.flat();

	await Promise.all(upsertPromises);
}
