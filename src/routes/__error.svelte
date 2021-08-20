<script lang="ts" context="module">
	import type { ErrorLoad } from '@sveltejs/kit';

	export const load: ErrorLoad = ({ status }) => {
		return {
			props: {
				status,
			},
		};
	};
</script>

<script lang="ts">
	export let status: number;
	let message = '';

	$: {
		switch (status) {
			case 404:
				message = "We couldn't find the page you were looking for.";
				break;
			case 500:
			default:
				message = 'An unknown error occurred.';
				break;
		}
	}
</script>

<div class="h-screen flex flex-col items-center justify-center">
	<h1 class="text-lg font-bold text-green-600">{status}</h1>
	<span class="text-gray-700">{message}</span>
</div>
