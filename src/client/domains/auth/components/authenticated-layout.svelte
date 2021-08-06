<script lang="ts">
	import { setAuthContext } from '$lib/client/domains/auth/auth-context';
	import type { User } from '$lib/types/user';

	export let user: User;

	setAuthContext({ user });
</script>

<slot />
