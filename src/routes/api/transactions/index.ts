import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';

export const get = withAuth(async (req) => {
	const institution = await prisma.userInstitution.findFirst({ where: { userId: req.locals.userId } });

	if (!institution) {
		return {
			status: 400,
			body: {
				error: 'Could not find an associated financial institution',
			},
		};
	}

	const response = await plaidAxiosClient.post('/transactions/get', {
		access_token: institution.plaidAccessToken,
		start_date: '1990-01-01',
		end_date: '2021-08-21',
		options: {
			count: 500,
		},
	});

	return {
		status: 200,
		body: response.data,
	};
});
