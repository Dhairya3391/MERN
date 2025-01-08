<script>
	import { createEventDispatcher } from 'svelte';
	import { authStore } from '$lib/stores/authStore';

	const dispatch = createEventDispatcher();
	let creating = false;

	async function createRoom() {
		if (!$authStore.user) {
			console.error('User not authenticated');
			return;
		}

		try {
			creating = true;
			const response = await fetch('http://localhost:3000/api/chat/create-room', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					creatorId: $authStore.user.uniqueId
				})
			});

			const data = await response.json();
			dispatch('roomCreated', { roomId: data.roomId });
		} catch (error) {
			console.error('Error creating room:', error);
		} finally {
			creating = false;
		}
	}
</script>

<button
	on:click={createRoom}
	class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none disabled:opacity-50"
	disabled={creating}
>
	{creating ? 'Creating...' : 'Create New Room'}
</button>
