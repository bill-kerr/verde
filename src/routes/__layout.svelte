<script lang="ts">
	import '$lib/client/css/main.css';
	import '$lib/client/css/fonts.css';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/client/domains/auth/store';
	import AuthenticatedLayout from '$lib/client/domains/auth/components/authenticated-layout.svelte';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	const queryClient = new QueryClient();

	onMount(() => {
		authStore.initialize();
	});
</script>

<AuthenticatedLayout>
	<QueryClientProvider client={queryClient}>
		<slot />
	</QueryClientProvider>
</AuthenticatedLayout>
