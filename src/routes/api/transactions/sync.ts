import { withAuth } from '$lib/server/middleware/with-auth';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';
import { syncTransactions } from '$lib/server/utils/sync/transactions';

export const get = withAuth(async (req) => {
	try {
		await syncTransactions(req.locals.userId);
		return successResponse({ message: 'Transactions successfully synced' });
	} catch (error) {
		console.error(error);
		return errorResponse('An unknown error occurred while syncing transactions');
	}
});
