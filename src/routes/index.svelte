<script lang="ts">
	import { tooltip } from '$lib/client/actions/use-tooltip';
	import Test from '$lib/client/components/test.svelte';
	import { getAuthContext } from '$lib/client/domains/auth/auth-context';
	import { authStore } from '$lib/client/domains/auth/store';

	const { user } = getAuthContext();

	const logout = () => authStore.logout();
</script>

<h1 use:tooltip={{ content: 'this is a test' }}>Hello world</h1>
<pre>{JSON.stringify(user, null, 4)}</pre>
<button class="p-2 bg-blue-500 text-white rounded" on:click={logout}>Logout</button>

<Test />
