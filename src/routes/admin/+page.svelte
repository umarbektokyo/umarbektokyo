<script lang="ts">
	import { enhance } from '$app/forms';

	let { form }: { form: { error?: string } | null } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Admin Login</title>
</svelte:head>

<div class="login-page">
	<div class="login-card">
		<div class="login-header">
			<img src="/crest.png" alt="Logo" class="login-logo" />
			<h1 class="login-title">Admin Panel</h1>
			<p class="login-subtitle">Sign in to continue</p>
		</div>

		{#if form?.error}
			<div class="error-msg">{form.error}</div>
		{/if}

		<form
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
		>
			<div class="field">
				<label for="username">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="admin"
					autocomplete="username"
					required
				/>
			</div>

			<div class="field">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="password"
					autocomplete="current-password"
					required
				/>
			</div>

			<button type="submit" disabled={loading}>
				{loading ? 'Signing in...' : 'Sign In'}
			</button>
		</form>

		<div class="login-footer">
			<span>Forgot your password?</span>
		</div>
	</div>
</div>

<style>
	.login-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 80vh;
		padding: 2rem;
	}

	.login-card {
		width: 100%;
		max-width: 380px;
		background: #0d1117;
		border: 1px solid #30363d;
		border-radius: 8px;
		padding: 2rem;
	}

	.login-header {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.login-logo {
		width: 48px;
		height: 48px;
		margin-bottom: 1rem;
		opacity: 0.8;
	}

	.login-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: #e6edf3;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	.login-subtitle {
		font-size: 0.85rem;
		color: #8b949e;
		margin-top: 0.25rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	.error-msg {
		background: #da363340;
		border: 1px solid #da3633;
		color: #f85149;
		padding: 0.6rem 0.75rem;
		border-radius: 6px;
		font-size: 0.8rem;
		margin-bottom: 1rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	.field {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		font-size: 0.8rem;
		color: #e6edf3;
		margin-bottom: 0.35rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	input {
		width: 100%;
		padding: 0.5rem 0.75rem;
		background: #010409;
		border: 1px solid #30363d;
		border-radius: 6px;
		color: #e6edf3;
		font-size: 0.85rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		transition: border-color 0.2s;
	}

	input:focus {
		outline: none;
		border-color: #58a6ff;
		box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.15);
	}

	input::placeholder {
		color: #484f58;
	}

	button {
		width: 100%;
		padding: 0.55rem;
		background: #238636;
		border: 1px solid rgba(240, 246, 252, 0.1);
		border-radius: 6px;
		color: #fff;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	button:hover {
		background: #2ea043;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.login-footer {
		text-align: center;
		margin-top: 1rem;
		font-size: 0.75rem;
		color: #58a6ff;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}
</style>
