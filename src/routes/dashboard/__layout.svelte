<script lang="ts">
	import '$lib/client/css/main.css';
	import '$lib/client/css/fonts.css';
	import AuthenticatedLayout from '$lib/client/domains/auth/components/authenticated-layout.svelte';
	import TopNavigation from '$lib/client/components/top-navigation/top-navigation.svelte';
	import MaxWidthContainer from '$lib/client/components/layout/max-width-container.svelte';
</script>

<AuthenticatedLayout>
	<MaxWidthContainer>
		<TopNavigation />
	</MaxWidthContainer>
	<MaxWidthContainer>
		<slot />
	</MaxWidthContainer>
</AuthenticatedLayout>
