import { verdeApiFetcher } from '$lib/client/clients/verde';
import type { VerdeGetAccountBalanceResponse } from '$lib/common/types/verde-api';
import type { UserAccount } from '@prisma/client';
import { useQuery } from '@sveltestack/svelte-query';

export function useAccountBalance(accountId?: UserAccount['id']) {
	return useQuery<VerdeGetAccountBalanceResponse>(`/user-accounts/${accountId}/balance`, verdeApiFetcher, {
		enabled: !!accountId,
	});
}
