<script lang="ts">
	let klass = '';
	export { klass as class };
</script>

<h2 class={`inline-block font-hand text-blue-200 text-4xl -rotate-2 ${klass}`}>
	<slot />
</h2>
