<script lang="ts">
	import IconCalendar from '$lib/client/components/icons/icon-calendar.svelte';
	import IconRefresh from '$lib/client/components/icons/icon-refresh.svelte';
	import clsx from 'clsx';

	export let type: 'recurring' | 'one-time';

	const label = type === 'recurring' ? 'Recurring' : 'One Time';

	const sharedIconClasses =
		'h-16 w-16 text-gray-500 group-hover:text-blue-500 transition-all duration-300 group-focus:text-blue-500';
</script>

<button
	class={clsx(
		'h-72 w-72 p-6 flex flex-col items-center justify-center border-2 border-gray-600 rounded-xl',
		'hover:bg-gray-700/50 hover:border-blue-300 overflow-hidden group transition-all duration-300',
		'hover:scale-102 focus:bg-gray-700/50 focus:border-blue-300 focus:scale-102',
	)}
	on:click
>
	{#if type === 'recurring'}
		<IconRefresh class={clsx('group-hover:-rotate-180 group-focus:-rotate-180', sharedIconClasses)} />
	{:else}
		<IconCalendar class={clsx('origin-bottom-left group-hover:-rotate-6 group-focus:-rotate-6', sharedIconClasses)} />
	{/if}
	<span class="mt-2 text-xl font-bold">{label}</span>
</button>
