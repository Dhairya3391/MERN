<script>
	import { onMount, onDestroy } from 'svelte';
	import { socketService } from '$lib/utils/socket';

	export let chatId;
	export let userId;

	let messages = [];
	let messageInput = '';
	let socket;

	onMount(async () => {
		// Connect to socket
		socket = socketService.connect();

		// Join the chat room
		socketService.joinRoom(chatId, userId);

		// Listen for new messages
		socketService.onMessage((message) => {
			messages = [...messages, message];
		});

		// Fetch chat history
		try {
			const response = await fetch(`http://localhost:3000/api/chat/history/${chatId}`);
			const data = await response.json();
			messages = data.messages;
		} catch (error) {
			console.error('Error fetching chat history:', error);
		}
	});

	onDestroy(() => {
		socketService.disconnect();
	});

	async function sendMessage() {
		if (!messageInput.trim()) return;

		try {
			// Send message through socket
			socketService.sendMessage(chatId, userId, messageInput);

			// Save message to database
			await fetch(`http://localhost:3000/api/chat/message/${chatId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					senderId: userId,
					text: messageInput
				})
			});

			messageInput = '';
		} catch (error) {
			console.error('Error sending message:', error);
		}
	}
</script>

<div class="flex h-full flex-col">
	<!-- Chat messages -->
	<div class="flex-1 space-y-4 overflow-y-auto p-4">
		{#each messages as message}
			<div class="flex {message.sender === userId ? 'justify-end' : 'justify-start'}">
				<div
					class="max-w-[70%] rounded-lg p-3 {message.sender === userId
						? 'bg-blue-500 text-white'
						: 'bg-gray-200'}"
				>
					<p>{message.text}</p>
					<span class="text-xs opacity-75">
						{new Date(message.timestamp).toLocaleTimeString()}
					</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- Message input -->
	<div class="border-t p-4">
		<form on:submit|preventDefault={sendMessage} class="flex gap-2">
			<input
				type="text"
				bind:value={messageInput}
				placeholder="Type a message..."
				class="flex-1 rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
			/>
			<button
				type="submit"
				class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
			>
				Send
			</button>
		</form>
	</div>
</div>
