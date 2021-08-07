<script lang="ts">
	let description = '';

	const handleSubmit = () => {
		fetch('/api/transaction-schedules', {
			method: 'POST',
			body: JSON.stringify({ description }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => (description = res.description));
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		<span>Description</span>
		<input type="text" name="description" class="p-1 border border-gray-200 rounded" bind:value={description} />
	</label>
	<button type="submit">Submit</button>
</form>
