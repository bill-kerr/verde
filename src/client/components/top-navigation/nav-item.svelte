<script lang="ts">
	import clsx from 'clsx';
	import type { SvelteComponent } from 'svelte';

	export let isActive: boolean;
	export let icon: typeof SvelteComponent;
	export let href: string;
	export let text: string;
</script>

<div class="relative group">
	<div
		class={clsx(
			'absolute -inset-0.5 rounded-xl blur bg-blue-300',
			isActive ? 'block opacity-75' : 'hidden group-hover:block opacity-25',
		)}
	/>
	<a
		{href}
		class={clsx(
			'relative px-4 py-1.5 flex items-center rounded-xl transition-colors duration-75',
			'focus-visible:ring focus:outline-none hover:text-gray-800',
			isActive ? 'bg-gray-200 hover:bg-gray-200 text-gray-800' : 'hover:bg-gray-300 text-gray-300',
		)}
	>
		<svelte:component
			this={icon}
			class={clsx('h-4 w-4 group-hover:text-gray-600', isActive ? 'text-gray-600' : 'text-gray-400')}
			type="solid"
		/>
		<span class={clsx('ml-1.5')}>{text}</span>
	</a>
</div>
