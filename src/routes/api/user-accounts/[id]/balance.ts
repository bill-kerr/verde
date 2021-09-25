import type { PlaidGetAccountBalancesResponse } from '$lib/common/types/plaid';
import type { VerdeGetAccountBalanceResponse } from '$lib/common/types/verde-api';
import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import type { AuthedRequestHandler } from '$lib/server/types/authed-handler';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';
import type { UserAccount } from '@prisma/client';

async function syncBalance(accessToken: string, plaidAccountId: string, userAccountId: UserAccount['id']) {
	const response = await plaidAxiosClient.post<PlaidGetAccountBalancesResponse>('/accounts/balance/get', {
		access_token: accessToken,
		options: { account_ids: [plaidAccountId] },
	});

	const plaidBalance =
		response.data.accounts.find((plaidAccount) => plaidAccount.account_id === plaidAccountId)?.balances.current ??
		undefined;

	const convertedBalance = plaidBalance ? plaidBalance * 100 : undefined;

	if (convertedBalance !== undefined) {
		await prisma.userAccount.update({ where: { id: userAccountId }, data: { currentBalance: convertedBalance } });
	}

	return convertedBalance;
}

const getAccountBalance: AuthedRequestHandler = async (req) => {
	try {
		const accountId = Number(req.params.id);
		if (Number.isNaN(accountId)) {
			return errorResponse();
		}

		const account = await prisma.userAccount.findFirst({
			where: { userId: req.locals.userId, id: accountId },
			include: { userInstitution: { select: { plaidItemId: true, plaidAccessToken: true } } },
		});

		if (!account) {
			return errorResponse(`An account with an id of ${accountId} was not found`, 400);
		}

		const shouldRevalidate = req.query.get('revalidate') === 'true';
		const balance = shouldRevalidate
			? await syncBalance(account.userInstitution.plaidAccessToken, account.plaidAccountId, accountId)
			: account.currentBalance;

		if (!balance) {
			return errorResponse(`Sorry, we could not retrieve the balance for the account with an id of ${account.id}`);
		}

		return successResponse<VerdeGetAccountBalanceResponse>({ accountId: account.id, currentBalance: balance });
	} catch (error) {
		console.error(error);
		return errorResponse();
	}
};

export const get = withAuth(getAccountBalance);
