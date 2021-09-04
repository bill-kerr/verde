import type { PlaidGetAccountsResponse } from '$lib/common/types/plaid';
import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { prisma } from '$lib/server/clients/prisma';
import { withAuth } from '$lib/server/middleware/with-auth';
import { plaidAccountTypeToUserAccountType } from '$lib/server/utils/accounts';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';

export const get = withAuth(async (req) => {
	try {
		const institutions = await prisma.userInstitution.findMany({ where: { userId: req.locals.userId } });
		const promises = institutions.map((institution) =>
			plaidAxiosClient
				.post<PlaidGetAccountsResponse>('/accounts/get', {
					access_token: institution.plaidAccessToken,
				})
				.then(({ data }) =>
					data.accounts.map((plaidAccount) => {
						const payload = {
							name: plaidAccount.name,
							plaidAccountId: plaidAccount.account_id,
							type: plaidAccountTypeToUserAccountType(plaidAccount.type),
							userId: req.locals.userId,
							mask: plaidAccount.mask,
							subtype: plaidAccount.subtype,
						};
						return prisma.userAccount
							.upsert({
								create: {
									...payload,
									userInstitution: {
										connect: {
											id: institution.id,
										},
									},
								},
								update: payload,
								where: {
									plaidAccountId: plaidAccount.account_id,
								},
							})
							.then((userAccount) => userAccount);
					}),
				),
		);

		await Promise.all(promises);
		return successResponse({ message: 'Sync successful' });
	} catch (error) {
		console.error(error);
		return errorResponse('An unknown error occurred while syncing user accounts');
	}
});
