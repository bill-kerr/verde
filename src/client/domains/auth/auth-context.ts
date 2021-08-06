import type { User } from '$lib/types/user';
import { getContext, setContext } from 'svelte';

export type AuthContext = {
	user: User;
};

export const authContextKey = {};

export const getAuthContext = (): AuthContext => {
	const ctx = getContext<AuthContext>(authContextKey);
	if (!ctx) {
		throw new Error('getAuthContext() must be used within a child of <AuthenticatedLayout>');
	}
	return ctx;
};

export const setAuthContext = (ctx: AuthContext): void => {
	setContext<AuthContext>(authContextKey, ctx);
};
