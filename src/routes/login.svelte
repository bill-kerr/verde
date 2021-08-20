<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/client/domains/auth/store';

	$: if ($authStore.user && browser) {
		goto('/dashboard');
	}
</script>

<button on:click={authStore.login} class="p-2 bg-blue-500 text-white rounded bg-red bg-primary">Login</button>
