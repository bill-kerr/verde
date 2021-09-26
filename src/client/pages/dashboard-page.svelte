<script lang="ts">
	import { browser } from '$app/env';
	import { openPlaidLink } from '$lib/client/clients/plaid';
	import { verdeAxiosClient } from '$lib/client/clients/verde';
	import Button from '$lib/client/components/button.svelte';
	import IconLibrary from '$lib/client/components/icons/icon-library.svelte';
	import Modal from '$lib/client/components/modal.svelte';
	import TransactionCard from '$lib/client/components/transaction-card.svelte';
	import { useAccountBalance } from '$lib/client/hooks/use-account-balance';
	import { useUserAccounts } from '$lib/client/hooks/use-user-accounts';
	import type { LinkToken } from '$lib/common/types/link-token';

	const userAccountsResult = useUserAccounts();
	const balanceResult = useAccountBalance($userAccountsResult.data?.[0]?.id);

	async function linkFinancialInstitution() {
		if (!browser) return;

		try {
			const response = await verdeAxiosClient.get<LinkToken>('/user-institutions/link-token');
			openPlaidLink(response.data.token, {
				async onSuccess(publicToken) {
					await verdeAxiosClient.post('/user-institutions/link', { publicToken });
				},
				onExit() {
					console.log('exited');
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	let isModalOpen = false;
	function openModal() {
		isModalOpen = true;
	}
	function closeModal() {
		isModalOpen = false;
	}
</script>

<div>
	<h3>Your account balance</h3>
	<p>{$balanceResult.data?.currentBalance}</p>
	<h3 class="text-sm font-bold text-gray-600">Recent transactions</h3>
	<div class="mt-2 flex items-center space-x-4">
		<TransactionCard date={new Date()} amount={34563} name="Test" />
		<TransactionCard date={new Date()} amount={34563} name="Test" />
		<p class="font-hand text-xl text-gray-700">This is a test</p>
	</div>
	<Button on:click={openModal}>Open Modal</Button>
	<Button class="mt-12 flex items-center" on:click={linkFinancialInstitution}>
		<IconLibrary slot="icon" class="h-5 w-5" />
		<span class="ml-1">Link an Account</span>
	</Button>
	<Modal isOpen={isModalOpen} on:close={closeModal}>
		<Button on:click={closeModal}>close</Button>
	</Modal>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
	<h1 class="text-7xl font-hand">hello</h1>
</div>
