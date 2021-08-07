<script lang="ts">
	import '$lib/client/css/main.css';
	import '$lib/client/css/fonts.css';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/client/domains/auth/store';
	import { setAuthContext } from '$lib/client/domains/auth/auth-context';
	import { goto } from '$app/navigation';

	let loggingIn = false;

	onMount(() => {
		authStore.initialize();
	});

	$: if ($authStore.user) {
		setAuthContext({ user: $authStore.user });
	}

	const logout = () => authStore.logout();

	const login = async () => {
		loggingIn = true;
		await authStore.login();
		await goto('/dashboard');
		loggingIn = false;
	};
</script>

<slot />
{#if !loggingIn}
	{#if $authStore.user}
		<button on:click={logout} class="p-2 bg-blue-700 text-white rounded">Logout</button>
	{:else}
		<button on:click={login} class="p-2 bg-blue-700 text-white rounded">Login</button>
	{/if}
{/if}
