<script lang="ts">
	import '$lib/client/css/main.css';
	import '$lib/client/css/fonts.css';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/client/domains/auth/store';
	import AuthenticatedLayout from '$lib/client/domains/auth/components/authenticated-layout.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	onMount(() => {
		authStore.initialize();
	});

	const login = () => authStore.login();

	const logout = () => authStore.logout();

	$: if (!$authStore.user && browser) {
		goto('/login');
	}
</script>

{#if $authStore.user}
	<AuthenticatedLayout user={$authStore.user}>inside layout</AuthenticatedLayout>
{/if}

<slot />
