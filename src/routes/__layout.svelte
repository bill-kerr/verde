<script lang="ts">
	import '$lib/client/css/main.css';
	import '$lib/client/css/fonts.css';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/client/domains/auth/store';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';
	import MaxWidthContainer from '$lib/client/domains/dashboard/components/layout/max-width-container.svelte';

	onMount(() => {
		authStore.initialize();
	});

	const queryClient = new QueryClient();
</script>

<svelte:head>
	<script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<MaxWidthContainer>
		<slot />
	</MaxWidthContainer>
</QueryClientProvider>
