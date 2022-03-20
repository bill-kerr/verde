<script lang="ts">
	import clsx from 'clsx';
	import type { SvelteComponent } from 'svelte/internal';

	type ButtonVariant = 'primary' | 'headless';

	export let variant: ButtonVariant = 'primary';
	export let leftIcon: SvelteComponent | undefined = undefined;
	export let rightIcon: SvelteComponent | undefined = undefined;
	export let isLoading = false;
	export let isDisabled = false;
	export let loadingText = '';
	let klass = '';
	export { klass as class };
</script>

<button on:click disabled={isDisabled || isLoading} class={clsx('default-base default-primary', klass)}>
	<slot />
</button>

<style lang="postcss">
	.default-base {
		@apply relative px-6 py-2 font-semibold rounded-xl transition-colors duration-75 bg-transparent select-none;
	}

	.default-primary {
		@apply border-2 border-gray-300 hover:bg-red-700;
	}
</style>
