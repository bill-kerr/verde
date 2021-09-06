<script lang="ts">
	let klass = '';
	export { klass as class };
</script>

<div class={`p-4 bg-white border border-gray-200 rounded-xl ${klass}`}>
	<slot />
</div>
