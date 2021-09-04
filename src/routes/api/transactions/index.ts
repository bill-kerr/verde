import type { PlaidAccount, PlaidGetTransactionsResponse, PlaidTransaction } from '$lib/common/types/plaid';
import { formatDate } from '$lib/common/utils/date-utils';
import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';

export const get = withAuth(async (req) => {
	const institutions = await prisma.userInstitution.findMany({ where: { userId: req.locals.userId } });

	const plaidRequests = institutions.map((institution) =>
		plaidAxiosClient.post<PlaidGetTransactionsResponse>('/transactions/get', {
			access_token: institution.plaidAccessToken,
			start_date: '1990-01-01',
			end_date: formatDate(new Date()),
			options: {
				count: 500,
			},
		}),
	);

	try {
		const results = await Promise.all(plaidRequests);

		let totalTransactions = 0;
		const accounts: PlaidAccount[] = [];
		const transactions: PlaidTransaction[] = [];
		results.forEach(({ data }) => {
			totalTransactions += data.total_transactions;
			accounts.push(...data.accounts);
			transactions.push(...data.transactions);
		});
		const sortedTransactions = transactions.sort((a, b) => (a.date < b.date ? 1 : -1));
		return successResponse({
			accounts,
			transactions: sortedTransactions,
			totalTransactions,
		});
	} catch (error) {
		console.error(error);
		return errorResponse('An unknown error occurred while fetching transactions');
	}
});
