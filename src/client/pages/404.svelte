<script lang="ts">
	import { goto } from '$app/navigation';

	import Blob from '$lib/client/components/blob.svelte';

	function goBack() {
		const defaultRoute = '/dashboard';
		const referrer = document ? document.referrer : defaultRoute;
		goto(referrer);
	}
</script>

<div class="h-screen bg-lime-200">
	<div class="absolute inset-0 flex items-center justify-center">
		<Blob class="h-full w-full text-lime-50" />
	</div>
	<div class="relative h-full w-full flex items-center justify-center">
		<div class="max-w-sm">
			<h2 class="text-5xl text-lime-600 font-bold">Oops!</h2>
			<p class="mt-2 text-gray-600">
				We couldn't find the page you were looking for. Refresh and try again, or <button
					type="button"
					on:click={goBack}>go back</button
				>.
			</p>
		</div>
	</div>
</div>
