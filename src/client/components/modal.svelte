<script lang="ts">
	import { clickOutside } from '$lib/client/actions/use-click-outside';
	import { focusTrap } from '$lib/client/actions/use-focus-trap';
	import IconX from '$lib/client/components/icons/icon-x.svelte';
	import { hideScrollbar } from '$lib/client/utils/hide-scrollbar';
	import { createEventDispatcher, onDestroy, tick } from 'svelte';
	import { fade } from 'svelte/transition';

	export let isOpen: boolean;
	export let initialFocus: HTMLElement | undefined = undefined;
	let resetScrollbar: () => void = () => {};
	let closeButton: HTMLButtonElement;

	const dispatch = createEventDispatcher();

	$: {
		if (isOpen) {
			resetScrollbar = hideScrollbar();
		}
	}

	function handleClose() {
		dispatch('close');
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}

	onDestroy(() => {
		resetScrollbar();
	});
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if isOpen}
	<div
		class="fixed inset-0 p-6 flex items-center justify-center bg-gray-400/50"
		transition:fade={{ duration: 100 }}
		on:outroend={() => resetScrollbar()}
	>
		<div
			class="relative p-6 w-full max-w-screen-md max-h-full bg-gray-800 rounded-xl shadow-xl overflow-y-auto"
			use:clickOutside={{ onClickOutside: handleClose }}
			use:focusTrap={{ initialFocus: initialFocus ?? closeButton }}
		>
			<button class="absolute right-6 top-6 focusable rounded-md" bind:this={closeButton} on:click={handleClose}>
				<IconX />
			</button>
			<slot />
		</div>
	</div>
{/if}
