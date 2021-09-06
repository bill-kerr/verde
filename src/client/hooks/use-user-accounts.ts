import { verdeApiFetcher } from '$lib/client/clients/verde';
import type { GetUserAccountsResponse } from '$lib/routes/api/user-accounts';
import { useQuery } from '@sveltestack/svelte-query';

export function useUserAccounts() {
	return useQuery<GetUserAccountsResponse>('/user-accounts', verdeApiFetcher, { staleTime: 60000 });
}
