import axios from 'axios';

export const plaidAxiosClient = axios.create({
	responseType: 'json',
	baseURL: import.meta.env.VITE_PLAID_API_BASE_URL?.toString() ?? '',
});

plaidAxiosClient.interceptors.request.use(async (request) => {
	request.headers = {
		...(request.headers ?? {}),
		'PLAID-CLIENT-ID': import.meta.env.VITE_PLAID_CLIENT_ID ?? '',
		'PLAID-SECRET': import.meta.env.VITE_PLAID_SECRET ?? '',
	};
	return request;
});
