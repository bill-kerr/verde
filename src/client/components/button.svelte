<script lang="ts">
	import clsx from 'clsx';

	type ButtonVariant = 'blue' | 'white';
	type ButtonSize = 'sm' | 'md';

	export let variant: ButtonVariant = 'blue';
	export let size: ButtonSize = 'md';
	let klass: string = '';
	export { klass as class };

	const variantClasses: Record<ButtonVariant, string> = {
		blue: 'bg-blue-700 hover:bg-blue-600 active:bg-blue-600 text-white',
		white: 'bg-white hover:bg-gray-100 active:bg-gray-100 text-gray-900',
	};

	const sizeClasses: Record<ButtonSize, string> = {
		sm: 'h-8 text-sm',
		md: 'h-10 text-base',
	};
</script>

<button
	on:click
	class={clsx(
		'px-3 py-1',
		'font-semibold rounded-xl transition-colors duration-75',
		'focus-visible:ring focus-visible:outline-none',
		sizeClasses[size],
		variantClasses[variant],
		klass,
	)}
>
	<slot />
</button>
