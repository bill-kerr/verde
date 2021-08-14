<script lang="ts">
	import { clickOutside } from '$lib/client/actions/use-click-outside';

	let toggled = false;

	const handleClickOutside = () => {
		console.log('clicked outside');
	};

	const otherHandleClickOutside = () => {
		console.log('this is the new clicked outside');
	};

	$: handler = toggled ? otherHandleClickOutside : handleClickOutside;
</script>

<div class="min-h-screen bg-gradient-to-t from-lime-50 to-emerald-100 bg-fixed">
	<div class="p-6 mx-auto max-w-screen-xl">
		<div class="p-4 bg-white rounded-xl border border-green-200">
			<nav class="text-sm flex space-x-4">
				<button type="button" class="inline-block px-4 py-2 rounded-lg">+ Add an expense</button>
				<button type="button" class="inline-block px-4 py-2 rounded-lg">Do nothing</button>
			</nav>
			<div use:clickOutside={{ onClickOutside: handler }} class="bg-blue-300 h-40 w-40 rounded">inside</div>
			<button on:click={() => (toggled = !toggled)}>toggle</button>
		</div>
	</div>
</div>
