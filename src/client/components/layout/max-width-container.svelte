<script lang="ts">
	let klass = '';
	export { klass as class };
</script>

<div class={`mx-auto p-6 max-w-screen-xl ${klass}`}>
	<slot />
</div>
