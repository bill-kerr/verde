<script lang="ts">
	import Button from '$lib/client/components/button.svelte';
	import IconPlus from '$lib/client/components/icons/icon-plus.svelte';
	import { useTransactions } from '$lib/client/hooks/use-transactions';

	const result = useTransactions();
</script>

<div class="flex items-center justify-end">
	<Button class="border-blue-300">
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
