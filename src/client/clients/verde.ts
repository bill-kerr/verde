import { authStore } from '$lib/client/domains/auth/store';
import type { QueryKey } from '@sveltestack/svelte-query';
import { get } from 'svelte/store';
import axios from 'axios';

export const verdeApiFetcher = async ({ queryKey }: { queryKey: QueryKey }) => {
	const { user } = get(authStore);
	if (!user) {
		return;
	}
	const res = await fetch(queryKey.toString(), {
		headers: {
			Authorization: `Bearer ${user.accessToken}`,
		},
	});
	return res.json();
};

export const verdeUnauthenticatedApiFetcher = async ({ queryKey }: { queryKey: QueryKey }) => {
	const res = await fetch(queryKey.toString());
	return res.json();
};

export const verdeAxiosClient = axios.create({
	responseType: 'json',
});

verdeAxiosClient.interceptors.request.use(async (request) => {
	const { user } = get(authStore);
	request.headers = {
		...(request.headers ?? {}),
		Authorization: `Bearer ${user?.accessToken}`,
	};
	return request;
});
