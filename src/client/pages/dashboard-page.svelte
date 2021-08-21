<script lang="ts">
	import { browser } from '$app/env';
	import { openPlaidLink } from '$lib/client/clients/plaid';
	import { verdeAxiosClient } from '$lib/client/clients/verde';
	import Button from '$lib/client/components/button.svelte';
	import IconLibrary from '$lib/client/components/icons/icon-library.svelte';
	import TransactionCard from '$lib/client/components/transaction-card.svelte';
	import { getAuthContext } from '$lib/client/domains/auth/auth-context';
	import type { LinkToken } from '$lib/common/types/link-token';

	const { user } = getAuthContext();

	async function link() {
		if (!browser) return;

		try {
			const response = await verdeAxiosClient.get<LinkToken>('/api/financial-institutions/link-token');
			openPlaidLink(response.data.token, {
				async onSuccess(token) {
					await createNewFinancialInstitution(token);
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
		const response = await verdeAxiosClient.post('/api/financial-institutions', { publicToken });
	}
</script>

<div class="flex items-center space-x-4">
	<TransactionCard date={new Date()} amount={34563} name="Test" />
	<TransactionCard date={new Date()} amount={34563} name="Test" />
	<Button variant="blue" size="md" class="flex items-center">
		<span><IconLibrary class="h-5 w-5" /></span>
		<span class="ml-1.5" on:click={link}>Link An Account</span>
	</Button>
</div>
