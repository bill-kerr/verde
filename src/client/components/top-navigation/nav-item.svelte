<script lang="ts">
	import clsx from 'clsx';
	import type { SvelteComponent } from 'svelte';

	export let isActive: boolean;
	export let icon: typeof SvelteComponent;
	export let href: string;
	export let text: string;
</script>

<a
	{href}
	class={clsx(
		'px-4 py-1.5 flex items-center rounded-xl transition-colors duration-75',
		'focus-visible:ring focus:outline-none',
		isActive ? 'bg-gray-100 hover:bg-gray-100' : 'hover:bg-gray-100',
	)}
>
	<svelte:component this={icon} class="h-4 w-4 text-gray-600" type="solid" />
	<span class={clsx('ml-1.5', isActive ? 'text-gray-900' : 'text-gray-700')}>{text}</span>
</a>
