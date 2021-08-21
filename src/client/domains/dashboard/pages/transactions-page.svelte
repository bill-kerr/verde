<script lang="ts">
	import { useTransactions } from '$lib/client/hooks/use-transactions';

	const result = useTransactions();
</script>

<div>transactions page</div>
{#if $result.data}
	<div>{$result.data.output}</div>
{/if}
{#if $result.isFetching}
	<div>fetching</div>
{/if}
