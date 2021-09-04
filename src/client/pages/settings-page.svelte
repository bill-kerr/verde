<script lang="ts">
	import { verdeAxiosClient } from '$lib/client/clients/verde';

	import { useTransactions } from '$lib/client/hooks/use-transactions';
	import { useUserAccounts } from '$lib/client/hooks/use-user-accounts';
	import { useUserInstitutions } from '$lib/client/hooks/use-user-institutions';

	const userInstitutionResult = useUserInstitutions();
	const userAccountsResult = useUserAccounts();

	let loading = false;
	function handleSyncUserAccounts() {
		loading = true;
		verdeAxiosClient
			.get('/user-accounts/sync')
			.then(() => {
				loading = false;
			})
			.catch(() => {
				loading = false;
			});
	}
</script>

<button class="p-2 rounded bg-blue-600 text-white" on:click={handleSyncUserAccounts}>
	{#if loading}
		Syncing...
	{:else}
		Click here to sync user accounts
	{/if}
</button>

<h2>Linked Institutions</h2>
{#if $userInstitutionResult.data}
	<ul class="mt-2 space-y-2">
		{#each $userInstitutionResult.data as { institution }}
			<li class="flex items-center">
				<span class="p-1 flex items-center justify-center bg-white border border-gray-200 rounded-xl">
					<img class="h-10 w-10" src={`data:image/png;base64,${institution.logo}`} alt={institution.name} />
				</span>
				<span class="ml-2 font-bold">{institution.name}</span>
			</li>
		{/each}
	</ul>
{/if}
{#if $userAccountsResult.data}
	{JSON.stringify($userAccountsResult.data, null, 4)}
{/if}
