<script lang="ts">
	import Button from '$lib/client/components/button.svelte';
	import IconCalendar from '$lib/client/components/icons/icon-calendar.svelte';
	import IconPlus from '$lib/client/components/icons/icon-plus.svelte';
	import IconRefresh from '$lib/client/components/icons/icon-refresh.svelte';
	import Modal from '$lib/client/components/modal.svelte';
	import TransactionTypeButton from '$lib/client/components/transaction-form/transaction-type-button.svelte';
	import { useTransactions } from '$lib/client/hooks/use-transactions';
	import clsx from 'clsx';
	import { fade, fly } from 'svelte/transition';

	type Step = 'recurrence' | 'details';

	let step: Step = 'recurrence';

	const result = useTransactions();

	let isTransactionModalOpen = false;
	function openTransactionModal() {
		isTransactionModalOpen = true;
	}
	function closeTransactionModal() {
		step = 'recurrence';
		isTransactionModalOpen = false;
	}
</script>

<div class="flex items-center justify-end">
	<Button class="border-blue-300" on:click={openTransactionModal}>
		<IconPlus slot="icon" class="h-5 w-5" />
		<span class="ml-1.5"> Add Transaction </span>
	</Button>
</div>

<div>transactions page</div>
{#if $result.data}
	<h3>Total transactions:</h3>
	<div>{$result.data.length}</div>
{/if}
{#if $result.isFetching}
	<div>fetching</div>
{/if}

<Modal isOpen={isTransactionModalOpen} on:close={closeTransactionModal}>
	<div class="flex flex-col" style="height: 512px;">
		{#if step === 'recurrence'}
			<h2 class="text-xl font-bold">What kind of transaction is this?</h2>
			<div class="flex-1 flex items-center justify-center" out:fade>
				<div class="mt-8 flex space-x-8 justify-center">
					<TransactionTypeButton type="recurring" on:click={() => (step = 'details')} />
					<TransactionTypeButton type="one-time" />
				</div>
			</div>
		{:else if step === 'details'}
			<div in:fade out:fade class="flex-1">hello</div>
		{/if}
		<div class="mt-8 flex justify-end">
			<Button on:click={closeTransactionModal}>Cancel</Button>
		</div>
	</div>
</Modal>
