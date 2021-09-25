<script lang="ts">
	import Card from '$lib/client/components/card.svelte';
	import Button from '$lib/client/components/button.svelte';
	import clsx from 'clsx';

	let klass = '';
	export { klass as class };
	export let isLoading: boolean = false;
	export let loadingText: string | undefined = undefined;
	export let title: string;
	export let description: string;
	export let buttonText: string;
	export let buttonClass: string | undefined = undefined;
</script>

<Card class={`flex flex-col lg:flex-row items-start lg:items-center lg:justify-between ${klass}`}>
	<div>
		<h3 class="font-bold">{title}</h3>
		<p class="text-gray-400">{description}</p>
	</div>
	<Button
		class={clsx('mt-3 lg:mt-0 relative flex items-center space-x-1', buttonClass)}
		on:click
		{isLoading}
		{loadingText}
	>
		<slot name="icon" />
		<span>
			{buttonText}
		</span>
	</Button>
</Card>
