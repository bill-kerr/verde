<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { setAuthContext } from '$lib/client/domains/auth/auth-context';
	import { authStore } from '$lib/client/domains/auth/store';

	$: if ($authStore.user) {
		setAuthContext({ user: $authStore.user });
	}

	$: if (!$authStore.user && $authStore.isInitialized && browser) {
		goto('/login');
	}

	$: isAuthed = $authStore.isInitialized && $authStore.user;
</script>

{#if isAuthed}
	<slot />
{/if}
