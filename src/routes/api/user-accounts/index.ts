import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';

export const get = withAuth(async (req) => {
	const userInstitutions = await prisma.userInstitution.findMany({
		where: { userId: req.locals.userId },
	});

	const plaidRequests = userInstitutions.map((institution) =>
		plaidAxiosClient.post('/accounts/get', { access_token: institution.plaidAccessToken }),
	);

	try {
		const results = await Promise.all(plaidRequests);
		const response = results.map((result) => result.data);

		return successResponse(response);
	} catch (error) {
		console.error(error);
		return errorResponse('An unknown error occurred while fetching accounts');
	}
});
