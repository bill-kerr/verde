<script lang="ts">
	import { browser } from '$app/env';
	import { openPlaidLink } from '$lib/client/clients/plaid';
	import { getAuthContext } from '$lib/client/domains/auth/auth-context';
	import type { LinkToken } from '$lib/common/types/link-token';
	import axios from 'axios';

	const { user } = getAuthContext();

	async function link() {
		if (!browser) return;

		try {
			const response = await axios.get<LinkToken>('/api/financial-institutions/link-token');
			openPlaidLink(response.data.token, {
				onSuccess() {
					console.log('success');
				},
				onExit() {
					console.log('exited');
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function createNewFinancialInstitution(publicToken: string) {
		const response = await axios.post('/api/financial-institutions', { publicToken });
	}
</script>

<div class="p-4 bg-white rounded-xl border border-gray-100">hello</div>
