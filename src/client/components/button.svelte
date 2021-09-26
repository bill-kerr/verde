<script lang="ts">
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
			<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
			{#if loadingText}
				<span class="ml-2">{loadingText}</span>
			{/if}
		</span>
	{/if}
</button>
