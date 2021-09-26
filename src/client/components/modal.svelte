<script lang="ts">
	import { clickOutside } from '$lib/client/actions/use-click-outside';
	import { focusTrap } from '$lib/client/actions/use-focus-trap';
	import IconX from '$lib/client/components/icons/icon-x.svelte';
	import { hideScrollbar } from '$lib/client/utils/hideScrollbar';
	import { createEventDispatcher, onDestroy, tick } from 'svelte';
	import { fade } from 'svelte/transition';

	export let isOpen: boolean;
	let previousFocus: Element | null = null;
	let closeButton: HTMLButtonElement | undefined = undefined;
	let resetScrollbar: () => void = () => {};

	const dispatch = createEventDispatcher();

	$: {
		if (isOpen) {
			resetScrollbar = hideScrollbar();
			previousFocus = document.activeElement;
			focusCloseButton();
		}
	}

	async function focusCloseButton() {
		await tick();
		closeButton?.focus();
	}

	function handleClose() {
		if (previousFocus instanceof HTMLElement) {
			previousFocus.focus();
		}
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
			use:focusTrap
		>
			<button class="absolute right-6 top-6 focusable rounded-md" bind:this={closeButton} on:click={handleClose}>
				<IconX />
			</button>
			<slot />
		</div>
	</div>
{/if}
