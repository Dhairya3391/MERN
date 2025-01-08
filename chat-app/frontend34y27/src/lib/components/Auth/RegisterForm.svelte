<script>
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/authStore';

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let loading = false;
	let error = '';

	async function handleRegister(e) {
		e.preventDefault();

		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await fetch('http://localhost:3000/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, email, password })
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Registration failed');
			}

			authStore.login(data);
			goto('/');
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit={handleRegister} class="mx-auto max-w-md space-y-4">
	{#if error}
		<div class="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
			{error}
		</div>
	{/if}

	<div>
		<label class="mb-2 block text-gray-700" for="username">Username</label>
		<input
			type="text"
			id="username"
			bind:value={username}
			required
			class="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
		/>
	</div>

	<div>
		<label class="mb-2 block text-gray-700" for="email">Email</label>
		<input
			type="email"
			id="email"
			bind:value={email}
			required
			class="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
		/>
	</div>

	<div>
		<label class="mb-2 block text-gray-700" for="password">Password</label>
		<input
			type="password"
			id="password"
			bind:value={password}
			required
			class="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
		/>
	</div>

	<div>
		<label class="mb-2 block text-gray-700" for="confirmPassword">Confirm Password</label>
		<input
			type="password"
			id="confirmPassword"
			bind:value={confirmPassword}
			required
			class="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
		/>
	</div>

	<button
		type="submit"
		disabled={loading}
		class="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
	>
		{loading ? 'Registering...' : 'Register'}
	</button>

	<p class="mt-4 text-center">
		Already have an account?
		<a href="/login" class="text-blue-500 hover:underline">Login here</a>
	</p>
</form>
