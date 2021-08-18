<script lang="ts">
	import { browser } from '$app/env';
	import { clickOutside } from '$lib/client/actions/use-click-outside';
	import { openPlaidLink } from '$lib/client/clients/plaid';
	import type { LinkToken } from '$lib/common/types/link-token';
	import axios from 'axios';

	let toggled = false;
	let isLinking = false;

	const handleClickOutside = () => {
		console.log('clicked outside');
	};

	const otherHandleClickOutside = () => {
		console.log('this is the new clicked outside');
	};

	$: clickOutsideHandler = toggled ? otherHandleClickOutside : handleClickOutside;

	async function postTransactionSchedule() {
		fetch('/api/transaction-schedules', {
			method: 'POST',
			body: JSON.stringify({ message: 'this is useless' }),
		});
	}

	async function link() {
		if (!browser) return;
		isLinking = true;

		try {
			const response = await axios.get<LinkToken>('/api/financial-institutions/link-token');
			openPlaidLink(response.data.token, {
				onSuccess() {
					isLinking = false;
					console.log('success');
				},
				onExit() {
					isLinking = false;
					console.log('exited');
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function createNewFinancialInstitution(publicToken: string) {
		const response = await axios.post('/api/financial-institutions', { publicToken });
	}
</script>

{#if !isLinking}
	<div class="min-h-screen bg-gradient-to-t from-lime-50 to-emerald-100 bg-fixed">
		<div class="p-6 mx-auto max-w-screen-xl">
			<div class="p-4 bg-white rounded-xl border border-green-200">
				<nav class="text-sm flex space-x-4">
					<button type="button" class="inline-block px-4 py-2 rounded-lg" on:click={postTransactionSchedule}
						>+ Add an expense</button
					>
					<button type="button" class="inline-block px-4 py-2 rounded-lg">Do nothing</button>
				</nav>
				<div use:clickOutside={{ onClickOutside: clickOutsideHandler }} class="bg-blue-300 h-40 w-40 rounded">
					inside
				</div>
				<button on:click={() => (toggled = !toggled)}>toggle</button>
				<button on:click={link} class="bg-red-200">Link an account</button>
			</div>
		</div>
	</div>
{:else}
	LINKING YO
{/if}
