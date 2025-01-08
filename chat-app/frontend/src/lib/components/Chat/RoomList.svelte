<script>
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/authStore';

	let rooms = [];
	let loading = true;

	onMount(async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/chat/user-chats/${$authStore.user.uniqueId}`
			);
			const data = await response.json();
			rooms = data.chats.filter((chat) => chat.roomId); // Only get group chats
		} catch (error) {
			console.error('Error fetching rooms:', error);
		} finally {
			loading = false;
		}
	});
</script>

<div class="space-y-4">
	<h2 class="text-xl font-semibold">Your Rooms</h2>

	{#if loading}
		<p>Loading rooms...</p>
	{:else if rooms.length === 0}
		<p>You haven't joined any rooms yet.</p>
	{:else}
		<div class="grid gap-4">
			{#each rooms as room}
				<a
					href="/room/{room.roomId}"
					class="block rounded-lg border p-4 transition-colors hover:border-blue-500"
				>
					<h3 class="font-medium">Room: {room.roomId}</h3>
					<p class="text-sm text-gray-500">{room.participants.length} participants</p>
				</a>
			{/each}
		</div>
	{/if}
</div>
