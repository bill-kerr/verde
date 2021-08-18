import { browser } from '$app/env';
import type { Plaid } from 'plaid-link';

type PlaidLinkCallbacks = {
	onSuccess: (publicToken: string) => void;
	onExit: (error: Plaid.Error | null) => void;
	onEvent?: Plaid.OnEvent;
	onLoad?: Plaid.OnLoad;
};

export function openPlaidLink(linkToken: string, callbacks: PlaidLinkCallbacks) {
	if (!browser) return;

	const handler = window.Plaid.create({
		token: linkToken,
		onSuccess: callbacks.onSuccess,
		onExit: callbacks.onExit,
		onEvent: callbacks.onEvent,
		onLoad: callbacks.onLoad,
		key: '',
		clientName: 'Verde',
		env: 'development',
		product: ['transactions', 'income', 'auth'],
	});

	handler.open();
}
