<script lang="ts">
	import { verdeApiFetcher } from '$lib/client/clients/verde';

	import { useQuery, useQueryClient } from '@sveltestack/svelte-query';

	const result = useQuery<{ message: string }, Error>('/api/transaction-schedules', verdeApiFetcher);

	const client = useQueryClient();

	const mutate = () => {
		client.setQueryData('/api/transaction-schedules', { message: 'mutated bro' });
	};
</script>

<div class="mt-12 space-y-12">
	{#if $result.data}
		<div class="p-2 inline-flex items-center bg-gray-100 rounded">
			<span class="text-gray-600 text-sm font-medium">Message:</span>
			<span class="ml-2">
				{$result.data.message}
			</span>
		</div>
	{/if}

	<div>
		<button on:click={() => $result.refetch()} class="p-2 bg-blue-500 text-white rounded">refetch</button>
	</div>

	<div>
		<button on:click={mutate} class="p-2 bg-blue-500 text-white rounded">mutate</button>
	</div>
</div>
