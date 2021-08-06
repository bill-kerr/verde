<script lang="ts">
	import { tooltip } from '$lib/client/actions/use-tooltip';
</script>

<h1 use:tooltip={{ content: 'this is a test' }}>Hello world</h1>
