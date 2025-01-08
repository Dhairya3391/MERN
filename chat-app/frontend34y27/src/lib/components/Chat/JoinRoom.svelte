<script>
	import { createEventDispatcher } from 'svelte';
	import { authStore } from '$lib/stores/authStore';
	import { get } from 'svelte/store';

	const dispatch = createEventDispatcher();
	let roomId = '';
	let joining = false;

	async function joinRoom() {
		if (!roomId.trim()) return;

		const { user } = get(authStore);
		if (!user) {
			console.error('User not authenticated');
			return;
		}

		try {
			joining = true;
			const response = await fetch('http://localhost:3000/api/chat/join-room', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: user.uniqueId,
					roomId: roomId.trim()
				})
			});

			const data = await response.json();
			if (data.success) {
				dispatch('roomJoined', { roomId: roomId.trim() });
				roomId = '';
			}
		} catch (error) {
			console.error('Error joining room:', error);
		} finally {
			joining = false;
		}
	}
</script>

<form on:submit|preventDefault={joinRoom} class="flex gap-2">
	<input
		type="text"
		bind:value={roomId}
		placeholder="Enter room code"
		class="flex-1 rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
	/>
	<button
		type="submit"
		class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none disabled:opacity-50"
		disabled={joining}
	>
		{joining ? 'Joining...' : 'Join Room'}
	</button>
</form>
