<script>
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/authStore';
	import CreateRoom from '$lib/components/Chat/CreateRoom.svelte';
	import JoinRoom from '$lib/components/Chat/JoinRoom.svelte';
	import RoomList from '$lib/components/Chat/RoomList.svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		authStore.initializeFromStorage();
	});

	function handleRoomCreated(event) {
		const { roomId } = event.detail;
		goto(`/room/${roomId}`);
	}

	function handleRoomJoined(event) {
		const { roomId } = event.detail;
		goto(`/room/${roomId}`);
	}
</script>

<div class="container mx-auto px-4 py-8">
	{#if $authStore.loading}
		<p>Loading...</p>
	{:else if !$authStore.isAuthenticated}
		<div class="text-center">
			<p>Please log in to access the chat.</p>
			<a href="/login" class="text-blue-500 hover:underline">Login</a>
		</div>
	{:else}
		<div class="mx-auto max-w-4xl space-y-8">
			<header class="flex items-center justify-between">
				<h1 class="text-2xl font-bold">Welcome, {$authStore.user.username}!</h1>
				<button on:click={() => authStore.logout()} class="text-red-500 hover:underline">
					Logout
				</button>
			</header>

			<div class="grid gap-8 md:grid-cols-2">
				<div class="space-y-4">
					<h2 class="text-xl font-semibold">Create or Join Room</h2>
					<div class="space-y-4">
						<CreateRoom on:roomCreated={handleRoomCreated} />
						<JoinRoom on:roomJoined={handleRoomJoined} />
					</div>
				</div>

				<RoomList />
			</div>
		</div>
	{/if}
</div>
