import { verdeApiFetcher } from '$lib/client/clients/verde';
import { useQuery } from '@sveltestack/svelte-query';

export function useUserAccounts() {
	return useQuery('/user-accounts', verdeApiFetcher, { staleTime: 60000 });
}
