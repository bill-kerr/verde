<script lang="ts">
	import PlayfulHeader from '$lib/client/components/playful-header.svelte';
	import SettingsActions from '$lib/client/components/settings-actions/settings-actions.svelte';
	import UserInstitutionList from '$lib/client/components/user-institution-list.svelte';
</script>

<PlayfulHeader>Actions</PlayfulHeader>
<SettingsActions class="mt-2" />

<PlayfulHeader class="mt-16">Institutions & Accounts</PlayfulHeader>
<UserInstitutionList class="mt-2" />
