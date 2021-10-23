import type { PlaidGetAccountsResponse } from '$lib/common/types/plaid';
import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { prisma } from '$lib/server/clients/prisma';
import { convertAccountType } from '$lib/server/utils/plaid-conversions';

export async function syncUserAccounts(userId: string): Promise<void> {
	const institutions = await prisma.userInstitution.findMany({ where: { userId } });
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
						type: convertAccountType(plaidAccount.type),
						userId,
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
}
