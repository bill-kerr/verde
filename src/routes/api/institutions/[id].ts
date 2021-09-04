import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';

export const get = withAuth(async (req) => {
	const id = Number(req.params.id);

	const institution = await prisma.institution.findUnique({ where: { id } });

	if (!institution) {
		return errorResponse(`Could not find an institution with an id of ${req.params.id}`);
	}

	return successResponse(institution);
});
