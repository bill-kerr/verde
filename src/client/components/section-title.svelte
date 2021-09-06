<script lang="ts">
	let klass = '';
	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';
	export { klass as class };

	$: classes = `text-sm font-bold text-gray-400 tracking-wide uppercase ${klass}`;
</script>

{#if as === 'h1'}
	<h1 class={classes}><slot /></h1>
{:else if as === 'h2'}
	<h2 class={classes}><slot /></h2>
{:else if as === 'h3'}
	<h3 class={classes}><slot /></h3>
{:else if as === 'h4'}
	<h4 class={classes}><slot /></h4>
{:else if as === 'h5'}
	<h5 class={classes}><slot /></h5>
{:else if as === 'h6'}
	<h6 class={classes}><slot /></h6>
{/if}
