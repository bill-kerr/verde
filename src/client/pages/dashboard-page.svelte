<script lang="ts">
	import { browser } from '$app/env';
	import { openPlaidLink } from '$lib/client/clients/plaid';
	import { verdeAxiosClient } from '$lib/client/clients/verde';
	import Button from '$lib/client/components/button.svelte';
	import IconLibrary from '$lib/client/components/icons/icon-library.svelte';
	import TransactionCard from '$lib/client/components/transaction-card.svelte';
	import { useTransactions } from '$lib/client/hooks/use-transactions';
	import type { LinkToken } from '$lib/common/types/link-token';

	const result = useTransactions();

	async function link() {
		if (!browser) return;

		try {
			const response = await verdeAxiosClient.get<LinkToken>('/user-institutions/link-token');
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
		const response = await verdeAxiosClient.post('/user-institutions', { publicToken });
		console.log(response.data);
	}
</script>

<p>{$result.data}</p>
<div>
	<h3 class="text-sm font-bold text-gray-600">Recent transactions</h3>
	<div class="mt-2 flex items-center space-x-4">
		<TransactionCard date={new Date()} amount={34563} name="Test" />
		<TransactionCard date={new Date()} amount={34563} name="Test" />
	</div>
	<Button variant="blue" size="md" class="mt-12 flex items-center">
		<span><IconLibrary class="h-5 w-5" /></span>
		<span class="ml-1.5" on:click={link}>Link An Account</span>
	</Button>
</div>
