import type {
	PlaidGetItemResponse,
	PlaidInstitutionByIdResponse,
	PlaidPublicTokenExchangeResponse,
} from '$lib/common/types/plaid';
import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { prisma } from '$lib/server/clients/prisma';
import { createUserInstitutionSchema } from '$lib/server/endpoints/user-institutions/create-user-institution-schema';
import { withAuth } from '$lib/server/middleware/with-auth';
import { apiErrorResponse, apiSuccessResponse } from '$lib/server/utils/api-response';

export const post = withAuth<{ publicToken: string }>(async (req) => {
	if (!createUserInstitutionSchema.isValidSync(req.body)) {
		return apiErrorResponse('A valid createUserInstitutionSchema must be provided', 400);
	}

	try {
		const exchangeResponse = await plaidAxiosClient.post<PlaidPublicTokenExchangeResponse>(
			'/item/public_token/exchange',
			{
				public_token: req.body.publicToken,
			},
		);

		const itemResponse = await plaidAxiosClient.post<PlaidGetItemResponse>('/item/get', {
			access_token: exchangeResponse.data.access_token,
		});
		if (!itemResponse.data.item.institution_id) {
			throw new Error('Institution ID did not exist on the response object');
		}

		const institutionResponse = await plaidAxiosClient.post<PlaidInstitutionByIdResponse>('/institutions/get_by_id', {
			institution_id: itemResponse.data.item.institution_id,
			country_codes: ['US'],
			options: {
				include_optional_metadata: true,
			},
		});

		const institution = await prisma.institution.upsert({
			where: { plaidInstitutionId: institutionResponse.data.institution.institution_id },
			update: {
				name: institutionResponse.data.institution.name,
				logo: institutionResponse.data.institution.logo,
				primaryColor: institutionResponse.data.institution.primary_color,
			},
			create: {
				name: institutionResponse.data.institution.name,
				plaidInstitutionId: institutionResponse.data.institution.institution_id,
				logo: institutionResponse.data.institution.logo,
				primaryColor: institutionResponse.data.institution.primary_color,
			},
		});

		const userInstitution = await prisma.userInstitution.create({
			data: {
				plaidAccessToken: exchangeResponse.data.access_token,
				plaidItemId: itemResponse.data.item.item_id,
				userId: req.locals.userId,
				institutionId: institution.id,
			},
		});

		// TODO: do an initial fetch of transactions

		return apiSuccessResponse({
			institution,
			userInstitution,
		});
	} catch (error) {
		console.error(error);
		return apiErrorResponse(
			'An unknown error occurred while exchanging tokens, fetching institution data, or writing to the database',
		);
	}
});
