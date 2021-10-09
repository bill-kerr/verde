<script lang="ts">
	import { useUserAccounts } from '$lib/client/hooks/use-user-accounts';
	import { useUserInstitutions } from '$lib/client/hooks/use-user-institutions';
	import Card from '$lib/client/components/card.svelte';
	import IconChevronRight from '$lib/client/components/icons/icon-chevron-right.svelte';
	import clsx from 'clsx';
	import { slide } from 'svelte/transition';
	import Button from '$lib/client/components/button.svelte';
	import Modal from '$lib/client/components/modal.svelte';

	let klass = '';
	export { klass as class };
	let isConfirmationModalOpen = false;

	const userInstitutionResult = useUserInstitutions();
	const userAccountsResult = useUserAccounts();

	let expandedInstitutions: Record<number, boolean> = {};

	function toggleExpandInstitution(id: number) {
		const isExpanded = expandedInstitutions[id];
		expandedInstitutions = { ...expandedInstitutions, [id]: !isExpanded };
	}

	function handleRemoveInstitution(id: number) {
		isConfirmationModalOpen = true;
	}
</script>

<div class={klass}>
	{#if $userInstitutionResult.data && $userAccountsResult.data}
		<ul class="space-y-2">
			{#each $userInstitutionResult.data as { institution }}
				<li>
					<Card>
						<button class="w-full" on:click={() => toggleExpandInstitution(institution.id)}>
							<div class="flex items-center justify-between">
								<div class="flex items-center">
									<span class="h-12 w-12 flex items-center justify-center border-2 border-gray-400 bg-white rounded-xl">
										<img class="h-10 w-10" src={`data:image/png;base64,${institution.logo}`} alt={institution.name} />
									</span>
									<span class="ml-3 font-bold text-lg">{institution.name}</span>
								</div>
								<IconChevronRight
									class={clsx('transition-transform duration-300 ease-in-out', {
										'rotate-90': expandedInstitutions[institution.id],
									})}
								/>
							</div>
						</button>
						{#if expandedInstitutions[institution.id]}
							<div transition:slide class="mt-4">
								<h3 class="text-xs uppercase text-gray-300 font-bold">Linked Accounts</h3>
								<div class="mt-2 flex items-center flex-wrap gap-3">
									{#each $userAccountsResult.data.filter((account) => account.userInstitutionId === institution.id) as userAccount}
										<div class="py-3 px-4 border border-gray-500 rounded-xl">
											<div>
												<span class="font-bold">{userAccount.name}</span>
												<span class="ml-1 text-gray-400 text-sm font-bold">{userAccount.mask}</span>
											</div>
											<div class="text-sm italic capitalize">
												{userAccount.subtype ?? userAccount.type}
											</div>
										</div>
									{/each}
								</div>
								<div class="mt-2 flex justify-end items-center">
									<Button class="border-red-400" on:click={() => handleRemoveInstitution(institution.id)}
										>Remove Institution</Button
									>
								</div>
							</div>
						{/if}
					</Card>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<Modal isOpen={isConfirmationModalOpen} on:close={() => (isConfirmationModalOpen = false)}>
	<h2 class="font-hand text-4xl text-red-300">Warning!</h2>
	<p>Are you sure you'd like to remove this institution and all its related accounts?</p>
	<div class="mt-6 flex items-center justify-end">
		<Button on:click={() => (isConfirmationModalOpen = false)}>Cancel</Button>
		<Button class="ml-2 border-red-400" on:click={() => (isConfirmationModalOpen = false)}>Yes, remove it</Button>
	</div>
</Modal>
