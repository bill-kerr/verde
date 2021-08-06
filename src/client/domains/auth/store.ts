import {
	initializeFirebase,
	loginWithGoogle,
	logout as firebaseLogout,
	subscribeToAuthState,
} from '$lib/client/services/firebase/client';
import type { User } from '$lib/types/user';
import { writable } from 'svelte/store';

export type AuthStoreState = { user: User | null; isInitialized: boolean };

const initialState: AuthStoreState = { user: null, isInitialized: false };

const createStore = () => {
	const { subscribe, update } = writable<AuthStoreState>(initialState);

	const initialize = () => {
		initializeFirebase();
		subscribeToAuthState((user) => {
			update((state) => ({ ...state, isInitialized: true, user }));
		});
	};

	const login = () => loginWithGoogle();

	const logout = () => firebaseLogout();

	return {
		subscribe,
		login,
		logout,
		initialize,
	};
};

export const authStore = createStore();
