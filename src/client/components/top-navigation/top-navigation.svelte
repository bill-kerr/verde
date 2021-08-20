<script lang="ts">
	import IconHome from '$lib/client/components/icons/icon-home.svelte';
	import IconSettings from '$lib/client/components/icons/icon-settings.svelte';
	import IconSwitchHorizontal from '$lib/client/components/icons/icon-switch-horizontal.svelte';
</script>

<nav class="flex justify-end space-x-4 text-sm font-medium">
	<a href="/" class="px-4 py-1.5 flex items-center hover:bg-gray-100 rounded-xl">
		<IconHome type="solid" class="h-4 w-4" />
		<span class="ml-1.5">Dashboard</span>
	</a>
	<a href="/" class="px-4 py-1.5 flex items-center hover:bg-gray-100 rounded-xl">
		<IconSwitchHorizontal type="solid" class="h-4 w-4" />
		<span class="ml-1.5">Transactions</span>
	</a>
	<a href="/" class="px-4 py-1.5 flex items-center bg-blue-50 hover:bg-gray-100 rounded-xl text-blue-900">
		<IconSettings type="solid" class="h-4 w-4" />
		<span class="ml-1.5">Settings</span>
	</a>
</nav>
