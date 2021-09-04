import { verdeApiFetcher } from '$lib/client/clients/verde';
import type { Institution, UserInstitution } from '@prisma/client';
import { useQuery } from '@sveltestack/svelte-query';

export function useUserInstitutions() {
	return useQuery<(UserInstitution & { institution: Institution })[]>('/api/user-institutions', verdeApiFetcher);
}
