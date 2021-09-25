<script lang="ts">
	import { verdeAxiosClient } from '$lib/client/clients/verde';
	import SettingsAction from '$lib/client/components/settings-actions/settings-action.svelte';
	import IconSwitchVertical from '$lib/client/components/icons/icon-switch-vertical.svelte';
	import IconCloudDownload from '$lib/client/components/icons/icon-cloud-download.svelte';
	import IconLogout from '$lib/client/components/icons/icon-logout.svelte';
	import { authStore } from '$lib/client/domains/auth/store';

	let klass = '';
	export { klass as class };

	let isSyncingAccounts = false;
	function syncUserAccounts() {
		isSyncingAccounts = true;
		verdeAxiosClient
			.get('/user-accounts/sync')
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
			.get(`/user-accounts/3/balance`)
			.then(() => (isSyncingBalance = false))
			.catch(() => (isSyncingBalance = false));
	}
</script>

<div class={`space-y-4 ${klass}`}>
	<SettingsAction
		title="Synchronize Accounts"
		description="Synchronizing your accounts will keep your information up to date."
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
		title="Sign Out"
		description="Sign out of your account. You will have to sign back in when you visit again."
		buttonText="Sign Out"
		on:click={() => authStore.logout()}
	>
		<IconLogout slot="icon" class="h-5 w-5 mr-2" />
	</SettingsAction>
</div>
