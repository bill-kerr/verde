import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import type { AuthedRequestHandler } from '$lib/server/types/authed-handler';
import { errorResponse } from '$lib/server/utils/api-response';
import { syncBalance } from '$lib/server/utils/sync/balances';

const syncAccountBalances: AuthedRequestHandler = async (req) => {
	try {
		const results = await prisma.userInstitution.findMany({
			where: { userId: req.locals.userId },
			select: {
				userAccounts: { select: { plaidAccountId: true, id: true } },
				plaidAccessToken: true,
				plaidItemId: true,
			},
		});

		const balancePromises = results
			.map((result) =>
				result.userAccounts.map(({ plaidAccountId, id }) => syncBalance(result.plaidAccessToken, plaidAccountId, id)),
			)
			.flat(1);

		await Promise.all(balancePromises);
	} catch (e) {
		console.error(e);
		return errorResponse();
	}
};

export const get = withAuth(syncAccountBalances);
