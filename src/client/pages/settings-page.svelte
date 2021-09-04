<script lang="ts">
	import { useUserInstitutions } from '$lib/client/hooks/use-user-institutions';

	const userInstitutionResult = useUserInstitutions();
</script>

<h2>Linked Institutions</h2>
{#if $userInstitutionResult.data}
	<ul class="mt-2">
		{#each $userInstitutionResult.data as userInstitution}
			<li class="flex items-center">
				<span class="h-10 w-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl">
					<img
						class="h-8 w-8"
						src={`data:image/png;base64,${userInstitution.institution.logo}`}
						alt={userInstitution.institution.name}
					/>
				</span>
				<span class="ml-2 font-bold">{userInstitution.institution.name}</span>
			</li>
		{/each}
	</ul>
{/if}
