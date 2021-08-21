import type { LinkToken } from '$lib/common/types/link-token';
import type { PlaidCreateTokenResponse } from '$lib/common/types/plaid';
import { withAuth } from '$lib/server/middleware/with-auth';
import type { DefaultInput, DefaultOutput } from '$lib/server/types/default-handler';
import axios from 'axios';
import { parseISO } from 'date-fns';

export const get = withAuth<DefaultInput, DefaultOutput>(async (req) => {
	try {
		const { data } = await axios.post<PlaidCreateTokenResponse>(
			`${import.meta.env.VITE_PLAID_API_BASE_URL}/link/token/create`,
			{
				client_id: import.meta.env.VITE_PLAID_CLIENT_ID ?? '',
				secret: import.meta.env.VITE_PLAID_SECRET ?? '',
				client_name: import.meta.env.VITE_PLAID_CLIENT_NAME ?? 'Verde',
				language: 'en',
				country_codes: [import.meta.env.VITE_PLAID_COUNTRY_CODES ?? 'US'],
				user: {
					client_user_id: req.locals.userId,
				},
				products: ['transactions', 'auth'],
			},
		);

		const linkToken: LinkToken = {
			expires: parseISO(data.expiration),
			token: data.link_token,
		};

		return {
			status: 200,
			body: linkToken,
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			body: {
				error: 'An unknown error occurred while creating a link token',
			},
		};
	}
});
