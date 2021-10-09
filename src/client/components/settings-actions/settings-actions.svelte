<script lang="ts">
	import { verdeAxiosClient } from '$lib/client/clients/verde';
	import SettingsAction from '$lib/client/components/settings-actions/settings-action.svelte';
	import IconSwitchVertical from '$lib/client/components/icons/icon-switch-vertical.svelte';
	import IconCloudDownload from '$lib/client/components/icons/icon-cloud-download.svelte';
	import IconLogout from '$lib/client/components/icons/icon-logout.svelte';
	import { authStore } from '$lib/client/domains/auth/store';
	import { browser } from '$app/env';
	import type { LinkToken } from '$lib/common/types/link-token';
	import { openPlaidLink } from '$lib/client/clients/plaid';
	import IconLink from '$lib/client/components/icons/icon-link.svelte';

	let klass = '';
	export { klass as class };

	let isSyncingAccounts = false;
	function syncUserAccounts() {
		isSyncingAccounts = true;
		const accountSync = verdeAxiosClient.get('/user-accounts/sync');
		const balanceSync = verdeAxiosClient.get('/user-institutions/balances/sync');
		Promise.allSettled([accountSync, balanceSync])
			.then(() => (isSyncingAccounts = false))
			.catch(() => (isSyncingAccounts = false));
	}

	let isSyncingTransactions = false;
	function syncTransactions() {
		isSyncingTransactions = true;
		verdeAxiosClient
			.get('/transactions/sync')
			.then(() => (isSyncingTransactions = false))
			.catch(() => (isSyncingTransactions = false));
	}

	let isSyncingBalance = false;
	function syncBalance() {
		isSyncingBalance = true;
		verdeAxiosClient
			.get(`/user-institutions/balances/sync`)
			.then(() => (isSyncingBalance = false))
			.catch(() => (isSyncingBalance = false));
	}

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
</script>

<div class={`space-y-4 ${klass}`}>
	<SettingsAction
		title="Synchronize Accounts"
		description="Synchronizing your accounts will keep your information up to date. This may take up to a minute."
		buttonText="Synchronize Accounts"
		isLoading={isSyncingAccounts}
		loadingText="Syncing"
		buttonClass="border-blue-400"
		on:click={syncUserAccounts}
	>
		<IconSwitchVertical slot="icon" class="h-5 w-5 mr-2" />
	</SettingsAction>
	<SettingsAction
		title="Fetch Latest Transactions"
		description="Get the latest transactions across all of your synced institutions and accounts."
		buttonText="Fetch Transactions"
		isLoading={isSyncingTransactions}
		loadingText="Fetching"
		buttonClass="border-blue-400"
		on:click={syncTransactions}
	>
		<IconCloudDownload slot="icon" class="h-5 w-5 mr-2" />
	</SettingsAction>
	<SettingsAction
		title="Link an Account"
		description="Link a financial institution to Verde so you can see your balances and activity."
		buttonText="Link an Account"
		buttonClass="border-blue-400"
		on:click={linkFinancialInstitution}
	>
		<IconLink slot="icon" class="h-5 w-5 mr-2" />
	</SettingsAction>
	<SettingsAction
		title="Sign Out"
		description="Sign out of your account. You will have to sign back in when you visit again."
		buttonText="Sign Out"
		on:click={() => authStore.logout()}
	>
		<IconLogout slot="icon" class="h-5 w-5 mr-2" />
	</SettingsAction>
</div>
