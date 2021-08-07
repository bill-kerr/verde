<script lang="ts">
	import { authStore } from '$lib/client/domains/auth/store';
</script>

<p>Welcome to Verde!</p>

{#if $authStore.user}
	<p>You're logged in, bro</p>
{/if}

<div class="flex flex-col">
	<a href="/dashboard" class="text-blue-700 hover:text-blue-600">Dashboard</a>
</div>
