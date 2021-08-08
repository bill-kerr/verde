<script lang="ts" context="module">
	import type { ErrorLoad } from '@sveltejs/kit';

	export const load: ErrorLoad = ({ status }) => {
		return {
			props: {
				status,
			},
		};
	};
</script>

<script lang="ts">
	import Page404 from '$lib/client/pages/404.svelte';

	export let status: number;
</script>

{#if status === 404}
	<Page404 />
{/if}
