<script lang="ts">
	import '$lib/client/css/main.css';
	import '$lib/client/css/fonts.css';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/client/domains/auth/store';
	import { setAuthContext } from '$lib/client/domains/auth/auth-context';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';

	onMount(() => {
		authStore.initialize();
	});

	$: if ($authStore.user) {
		setAuthContext({ user: $authStore.user });
	}

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
