import type { PlaidGetAccountBalancesResponse } from '$lib/common/types/plaid';
import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { prisma } from '$lib/server/clients/prisma';
import type { UserAccount } from '@prisma/client';

export async function syncBalance(accessToken: string, plaidAccountId: string, userAccountId: UserAccount['id']) {
	return plaidAxiosClient
		.post<PlaidGetAccountBalancesResponse>('/accounts/balance/get', {
			access_token: accessToken,
			options: { account_ids: [plaidAccountId] },
		})
		.then(async (response) => {
			const plaidBalance =
				response.data.accounts.find((plaidAccount) => plaidAccount.account_id === plaidAccountId)?.balances.current ??
				undefined;

			if (!plaidBalance) {
				throw new Error('Unable to sync balance');
			}

			const convertedBalance = plaidBalance * 100;

			return prisma.userAccount
				.update({ where: { id: userAccountId }, data: { currentBalance: convertedBalance } })
				.then(() => convertedBalance);
		});
}
