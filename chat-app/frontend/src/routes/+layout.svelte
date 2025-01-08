<script>
	import '../app.css';
	import { authStore } from '$lib/stores/authStore';
	import { onMount } from 'svelte';

	onMount(() => {
		authStore.initializeFromStorage();
	});
</script>

<div class="min-h-screen bg-gray-50">
	<slot />
</div>
