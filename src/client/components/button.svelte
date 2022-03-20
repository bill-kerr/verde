<script lang="ts">
	import Spinner from '$lib/client/components/spinner.svelte';
	import clsx from 'clsx';

	export let isLoading = false;
	export let isDisabled = false;
	export let loadingText: string | undefined = undefined;
	export let ref: HTMLElement | undefined = undefined;
	let klass: string = '';
	export { klass as class };
</script>

<button
	bind:this={ref}
	on:click
	class={clsx(
		'relative px-6 py-2 focusable',
		'font-semibold rounded-xl transition-colors duration-75 bg-transparent',
		'border-2 border-gray-300 select-none',
		'disabled:cursor-not-allowed',
		'hover:bg-gray-700',
		klass,
	)}
	disabled={isLoading || isDisabled}
>
	<span class={clsx('flex items-center', { 'opacity-0': isLoading })}>
		<slot name="icon" />
		<slot />
	</span>
	{#if isLoading}
		<span class="absolute inset-0 inline-flex items-center justify-center">
			<Spinner />
			{#if loadingText}
				<span class="ml-2">{loadingText}</span>
			{/if}
		</span>
	{/if}
</button>
