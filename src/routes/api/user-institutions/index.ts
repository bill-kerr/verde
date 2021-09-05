import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';

export const get = withAuth(async (req) => {
	try {
		const userInstitutions = await prisma.userInstitution.findMany({
			where: { userId: req.locals.userId },
			include: { institution: true },
		});
		return successResponse(userInstitutions);
	} catch (error) {
		console.error(error);
		return errorResponse('An unknown error occurred while fetching user institutions');
	}
});
