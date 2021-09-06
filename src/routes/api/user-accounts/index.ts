import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';
import type { Institution, UserAccount, UserInstitution } from '@prisma/client';

export type GetUserAccountsResponse = (UserAccount & {
	userInstitution: UserInstitution & {
		institution: Institution;
	};
})[];

export const get = withAuth(async (req) => {
	try {
		const accounts = await prisma.userAccount.findMany({
			where: { userId: req.locals.userId },
		});
		return successResponse(accounts);
	} catch (error) {
		console.error(error);
		return errorResponse('An unknown error occurred while fetching accounts');
	}
});
