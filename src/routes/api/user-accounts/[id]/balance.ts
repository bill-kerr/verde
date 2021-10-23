import type { VerdeGetAccountBalanceResponse } from '$lib/common/types/verde-api';
import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import type { AuthedRequestHandler } from '$lib/server/types/authed-handler';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';
import { syncBalance } from '$lib/server/utils/sync/balances';

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
