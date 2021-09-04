import { formatDate } from '$lib/common/utils/date-utils';
import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';

export const get = withAuth(async (req) => {
	const institution = await prisma.userInstitution.findFirst({ where: { userId: req.locals.userId } });

	if (!institution) {
		return errorResponse('Could not find an associated financial institution', 400);
	}

	const response = await plaidAxiosClient.post('/transactions/get', {
		access_token: institution.plaidAccessToken,
		start_date: '1990-01-01',
		end_date: formatDate(new Date()),
		options: {
			count: 500,
		},
	});

	return successResponse(response.data);
});
