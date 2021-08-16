export async function get() {
	const result = await fetch(`${import.meta.env.VITE_PLAID_API_BASE_URL}/link/token/create`, {
		method: 'POST',
		body: JSON.stringify({
			client_id: import.meta.env.VITE_PLAID_CLIENT_ID ?? '',
			secret: import.meta.env.VITE_PLAID_SECRET ?? '',
			client_name: 'verde',
			language: 'en',
			country_codes: [import.meta.env.VITE_PLAID_COUNTRY_CODES ?? 'US'],
			user: {
				client_user_id: '1',
			},
			products: ['transactions', 'auth'],
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const json = await result.json();
	console.log(json);

	return {
		body: {
			...json,
		},
	};
}
