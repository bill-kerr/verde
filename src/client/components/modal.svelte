<script lang="ts">
	import { clickOutside } from '$lib/client/actions/use-click-outside';
	import { focusTrap } from '$lib/client/actions/use-focus-trap';
	import Button from '$lib/client/components/button.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let isOpen: boolean;

	const dispatch = createEventDispatcher();

	function disableBodyScroll() {
		document.body.style.overflow = 'hidden';
	}

	function enableBodyScroll() {
		document.body.style.overflow = 'auto';
	}

	function handleClose() {
		dispatch('close');
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if isOpen}
	<div class="fixed inset-0 p-6 flex items-center justify-center bg-gray-400/50" transition:fade={{ duration: 100 }}>
		<div
			class="p-6 w-full max-w-screen-md max-h-full bg-gray-800 rounded-xl shadow-xl overflow-y-auto"
			use:clickOutside={{ onClickOutside: handleClose }}
			use:focusTrap
		>
			<Button on:click={handleClose}>Close</Button>
		</div>
	</div>
{/if}
