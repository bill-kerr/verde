<script lang="ts">
	import { tooltip } from '$lib/client/actions/use-tooltip';
	import { formatCurrency } from '$lib/client/utils/currency';
	import clsx from 'clsx';
	import { format } from 'date-fns';

	export let amount: number;
	export let date: Date;
	export let name: string;

	$: textColorClasses = amount > 0 ? 'text-green-600' : 'text-gray-900';
</script>

<div
	class={clsx(
		'relative h-36 w-36 p-4 flex flex-col justify-between items-center',
		'rounded-xl overflow-hidden bg-white border border-gray-200',
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
	<div class={clsx('mt-2 flex justify-center bg-white font-semibold', textColorClasses)}>
		{formatCurrency(amount, { withSign: 'plus' })}
	</div>
	<div class="text-xs text-gray-600 uppercase">{format(date, 'MMMM dd')}</div>
</div>
