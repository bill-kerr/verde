<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/client/domains/auth/store';

	$: if (!$authStore.user && $authStore.isInitialized && browser) {
		goto('/login', { replaceState: true });
	}

	$: isAuthed = $authStore.isInitialized && $authStore.user;
</script>

{#if isAuthed}
	<slot />
{/if}
