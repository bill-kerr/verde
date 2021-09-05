import { verdeApiFetcher } from '$lib/client/clients/verde';
import type { VerdeGetTransactionsResponse } from '$lib/common/types/verde-api';
import { useQuery } from '@sveltestack/svelte-query';

export function useTransactions() {
	return useQuery<VerdeGetTransactionsResponse>('/transactions', verdeApiFetcher);
}
