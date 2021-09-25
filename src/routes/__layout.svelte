<script lang="ts">
	import '$lib/client/css/main.css';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/client/domains/auth/store';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';

	onMount(() => {
		authStore.initialize();
	});

	const queryClient = new QueryClient();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link href="https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap" rel="stylesheet" />
	<link
		href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
	<script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
