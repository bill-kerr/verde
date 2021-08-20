<script lang="ts">
	import { tooltip } from '$lib/client/actions/use-tooltip';
	import { formatCurrency } from '$lib/client/utils/currency';
	import clsx from 'clsx';
	import format from 'date-fns/format';

	export let amount: number;
	export let date: Date;
	export let name: string;
</script>

<div
	class={clsx(
		'relative h-36 w-36 p-4 flex flex-col justify-between items-center',
		'rounded-xl overflow-hidden shadow bg-white',
	)}
>
	<div
		class={clsx(
			'mx-auto h-12 w-12 flex items-center justify-center',
			'rounded-lg bg-blue-700',
			'text-white text-xl font-semibold uppercase',
		)}
		use:tooltip={{ content: name }}
	>
		{name.charAt(0)}
	</div>
	<div class="mt-2 flex justify-center bg-white font-semibold">{formatCurrency(amount)}</div>
	<div class="text-xs text-gray-600 uppercase">{format(date, 'MMMM dd')}</div>
</div>
