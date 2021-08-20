<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { setAuthContext } from '$lib/client/domains/auth/auth-context';
	import { authStore } from '$lib/client/domains/auth/store';

	$: if (!$authStore.user && $authStore.isInitialized && browser) {
		goto('/login', { replaceState: true });
	}

	$: if ($authStore.isInitialized && $authStore.user) {
		setAuthContext({ user: $authStore.user });
	}
</script>

{#if $authStore.isInitialized && $authStore.user}
	<slot />
{/if}
