<script lang="ts">
	import { browser } from '$app/env';
	import { openPlaidLink } from '$lib/client/clients/plaid';
	import Button from '$lib/client/components/button.svelte';
	import TransactionCard from '$lib/client/components/transaction-card.svelte';
	import { getAuthContext } from '$lib/client/domains/auth/auth-context';
	import type { LinkToken } from '$lib/common/types/link-token';
	import axios from 'axios';
	import clsx from 'clsx';

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

<div class="flex items-center space-x-4">
	<TransactionCard date={new Date()} amount={34563} name="Test" />
	<TransactionCard date={new Date()} amount={34563} name="Test" />
	<Button variant="white">hello there</Button>
</div>
