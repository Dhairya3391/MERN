<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/authStore';
	import ChatWindow from '$lib/components/Chat/ChatWindow.svelte';
	import { goto } from '$app/navigation';

	const roomId = $page.params.roomId;
	let chatId;
	let loading = true;
	let error = null;

	onMount(async () => {
		if (!$authStore.isAuthenticated) {
			goto('/login');
			return;
		}

		try {
			// Get chat ID for this room
			const response = await fetch('http://localhost:3000/api/chat/join-room', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: $authStore.user.uniqueId,
					roomId
				})
			});

			const data = await response.json();
			if (data.success) {
				chatId = data.chatId;
			} else {
				error = 'Room not found';
			}
		} catch (err) {
			error = 'Error joining room';
		} finally {
			loading = false;
		}
	});
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-4xl">
		<header class="mb-4 flex items-center justify-between">
			<h1 class="text-2xl font-bold">Room: {roomId}</h1>
			<a href="/" class="text-blue-500 hover:underline">← Back to Dashboard</a>
		</header>

		{#if loading}
			<p>Loading room...</p>
		{:else if error}
			<p class="text-red-500">{error}</p>
		{:else}
			<div class="h-[600px] overflow-hidden rounded-lg border">
				<ChatWindow {chatId} userId={$authStore.user.uniqueId} />
			</div>
		{/if}
	</div>
</div>
