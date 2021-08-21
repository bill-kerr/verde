<script lang="ts">
	import { page } from '$app/stores';
	import IconHome from '$lib/client/components/icons/icon-home.svelte';
	import IconSettings from '$lib/client/components/icons/icon-settings.svelte';
	import IconSwitchHorizontal from '$lib/client/components/icons/icon-switch-horizontal.svelte';
	import NavItem from '$lib/client/components/top-navigation/nav-item.svelte';

	type NavItemOption = 'Transactions' | 'Dashboard' | 'Settings';

	$: getActiveItem = (): NavItemOption => {
		if ($page.path.startsWith('/dashboard/transactions')) {
			return 'Transactions';
		}
		if ($page.path.startsWith('/dashboard/settings')) {
			return 'Settings';
		}
		return 'Dashboard';
	};
</script>

<nav class="flex justify-end space-x-4 text-sm font-medium">
	<NavItem href="/dashboard" isActive={getActiveItem() === 'Dashboard'} icon={IconHome} text="Dashboard" />
	<NavItem
		href="/dashboard/transactions"
		isActive={getActiveItem() === 'Transactions'}
		icon={IconSwitchHorizontal}
		text="Transactions"
	/>
	<NavItem href="/dashboard/settings" isActive={getActiveItem() === 'Settings'} icon={IconSettings} text="Settings" />
</nav>
