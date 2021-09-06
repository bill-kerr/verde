<script lang="ts">
	import { verdeAxiosClient } from '$lib/client/clients/verde';
	import Card from '$lib/client/components/card.svelte';
	import SectionTitle from '$lib/client/components/section-title.svelte';
	import Button from '$lib/client/components/button.svelte';
	import { useUserAccounts } from '$lib/client/hooks/use-user-accounts';
	import { useUserInstitutions } from '$lib/client/hooks/use-user-institutions';
	import clsx from 'clsx';

	const userInstitutionResult = useUserInstitutions();
	const userAccountsResult = useUserAccounts();

	let isSyncingAccounts = false;
	function handleSyncUserAccounts() {
		isSyncingAccounts = true;
		verdeAxiosClient
			.get('/user-accounts/sync')
			.then(() => {
				isSyncingAccounts = false;
			})
			.catch(() => {
				isSyncingAccounts = false;
			});
	}

	function handleSyncTransactions() {
		verdeAxiosClient
			.get('/transactions/sync')
			.then(() => {})
			.catch(() => {});
	}
</script>

<Card class="flex items-center justify-between">
	<div>
		<h3 class="font-bold">Synchronize Accounts</h3>
		<p class="text-gray-600">Synchronizing your accounts will keep your information up to date.</p>
	</div>
	<Button class="relative" on:click={handleSyncUserAccounts} isLoading={true}>Synchronize Accounts</Button>
</Card>

{#if $userInstitutionResult.data && $userAccountsResult.data}
	<ul class="mt-2 space-y-2">
		{#each $userInstitutionResult.data as { institution }}
			<li>
				<Card class="inline-block">
					<SectionTitle as="h3">Institution</SectionTitle>
					<div class="flex items-center">
						<img class="h-10 w-10" src={`data:image/png;base64,${institution.logo}`} alt={institution.name} />
						<span class="ml-2 font-bold">{institution.name}</span>
					</div>
					<div class="mt-4">
						<SectionTitle as="h3">Linked Accounts</SectionTitle>
						{#each $userAccountsResult.data.filter((account) => account.userInstitutionId === institution.id) as userAccount}
							<div>
								<span>{userAccount.name}</span>
								<span class="ml-1 text-gray-400 text-sm font-bold">{userAccount.mask}</span>
							</div>
							<div class="text-sm italic capitalize">
								{userAccount.subtype ?? userAccount.type}
							</div>
						{/each}
					</div>
				</Card>
			</li>
		{/each}
	</ul>
{/if}
