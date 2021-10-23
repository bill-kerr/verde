import { withAuth } from '$lib/server/middleware/with-auth';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';
import { syncUserAccounts } from '$lib/server/utils/sync/user-accounts';

export const get = withAuth(async (req) => {
	try {
		await syncUserAccounts(req.locals.userId);
		return successResponse({ message: 'Sync successful' });
	} catch (error) {
		console.error(error);
		return errorResponse('An unknown error occurred while syncing user accounts');
	}
});
