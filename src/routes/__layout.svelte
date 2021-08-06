<script lang="ts">
	import '$lib/client/css/main.css';
	import '$lib/client/css/fonts.css';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/client/domains/auth/store';
	import AuthenticatedLayout from '$lib/client/domains/auth/components/authenticated-layout.svelte';

	onMount(() => {
		authStore.initialize();
	});
</script>

<AuthenticatedLayout>
	<slot />
</AuthenticatedLayout>
