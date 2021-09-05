import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';

export const get = withAuth(async (req) => {
	try {
		const transactions = await prisma.transaction.findMany({ where: { userId: req.locals.userId } });
		return successResponse(transactions);
	} catch (error) {
		console.error(error);
		return errorResponse('An unknown error occurred while fetching transactions');
	}
});
