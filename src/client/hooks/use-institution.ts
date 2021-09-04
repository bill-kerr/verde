import { verdeApiFetcher } from '$lib/client/clients/verde';
import type { Institution } from '@prisma/client';
import { useQuery } from '@sveltestack/svelte-query';

export function useInstitution(institutionId: number) {
	return useQuery<Institution>(`/api/institutions/${institutionId}`, verdeApiFetcher);
}
