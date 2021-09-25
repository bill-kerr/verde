<script lang="ts">
	import type { IconType } from '$lib/client/types/icon';

	let klass = '';
	export { klass as class };

	export let type: IconType = 'outline';
</script>

{#if type === 'outline'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class={`icon-outline ${klass}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
	</svg>
{:else}
	<svg xmlns="http://www.w3.org/2000/svg" class={`icon-solid ${klass}`} viewBox="0 0 20 20" fill="currentColor">
		<path
			fill-rule="evenodd"
			d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
			clip-rule="evenodd"
		/>
	</svg>
{/if}
