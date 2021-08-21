import { verdeApiFetcher } from '$lib/client/clients/verde';
import { useQuery } from '@sveltestack/svelte-query';

export function useTransactions() {
	return useQuery<{ output: string }>('/api/transactions', verdeApiFetcher);
}
