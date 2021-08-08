<script lang="ts">
	import '$lib/client/css/main.css';
	import '$lib/client/css/fonts.css';
	import AuthenticatedLayout from '$lib/client/domains/auth/components/authenticated-layout.svelte';
</script>

<AuthenticatedLayout>
	<slot />
</AuthenticatedLayout>
