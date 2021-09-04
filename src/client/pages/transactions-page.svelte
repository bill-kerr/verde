<script lang="ts">
	import { useTransactions } from '$lib/client/hooks/use-transactions';

	const result = useTransactions();
</script>

<div>transactions page</div>
{#if $result.data}
	<h3>Total transactions:</h3>
	<div>{$result.data.totalTransactions}</div>
{/if}
{#if $result.isFetching}
	<div>fetching</div>
{/if}
