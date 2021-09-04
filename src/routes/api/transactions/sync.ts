import type { PlaidGetTransactionsResponse } from '$lib/common/types/plaid';
import { formatDate } from '$lib/common/utils/date-utils';
import { plaidAxiosClient } from '$lib/server/clients/plaid';
import { withAuth } from '$lib/server/middleware/with-auth';
import { errorResponse, successResponse } from '$lib/server/utils/api-response';

function getPaginatedTransactions(accessToken: string, offset = 0): Promise<PlaidGetTransactionsResponse> {
	return plaidAxiosClient
		.post<PlaidGetTransactionsResponse>('/transactions/get', {
			access_token: accessToken,
			start_date: '1990-01-01',
			end_date: formatDate(new Date()),
			options: {
				count: 500,
				offset,
			},
		})
		.then(({ data }) => data);
}

export const get = withAuth(async () => {
	try {
		return successResponse({ message: 'TODO: implement this endpoint' });
	} catch (error) {
		console.error(error);
		return errorResponse('An unknown error occurred while syncing transactions');
	}
});
