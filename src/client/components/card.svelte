<script lang="ts">
	let klass = '';
	export { klass as class };
</script>

<div class={`p-4 bg-gray-700/50 border border-gray-700 rounded-xl ${klass}`}>
	<slot />
</div>
