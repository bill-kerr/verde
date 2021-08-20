<script lang="ts">
	import type { IconType } from '$lib/client/types/icon';
	import es from 'date-fns/locale/es';

	let klass = '';
	export { klass as class };

	export let type: IconType = 'outline';
</script>

{#if type === 'outline'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class={`h-6 w-6 ${klass}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
		/>
	</svg>
{:else}
	<svg xmlns="http://www.w3.org/2000/svg" class={`h-5 w-5 ${klass}`} viewBox="0 0 20 20" fill="currentColor">
		<path
			fill-rule="evenodd"
			d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
			clip-rule="evenodd"
		/>
	</svg>
{/if}
