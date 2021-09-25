<script lang="ts">
	import clsx from 'clsx';

	export let isLoading = false;
	export let isDisabled = false;
	export let loadingText: string | undefined = undefined;
	let klass: string = '';
	export { klass as class };

	// const variantClasses: Record<ButtonVariant, string> = {
	// 	blue: 'bg-blue-700 hover:bg-blue-600 active:bg-blue-600 text-white disabled:bg-blue-400',
	// 	white: 'bg-white hover:bg-gray-100 active:bg-gray-100 text-gray-900',
	// };

	// const sizeClasses: Record<ButtonSize, string> = {
	// 	sm: 'h-8 text-sm',
	// 	md: 'h-10 text-base',
	// };
</script>

<button
	on:click
	class={clsx(
		'relative px-6 py-2',
		'font-semibold rounded-xl transition-colors duration-75 bg-transparent',
		'focus-visible:ring focus-visible:outline-none',
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
