<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/writing', label: 'Writing' },
		{ href: '/reading', label: 'Reading' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/terminal', label: 'Terminal' }
	];
</script>

<nav class="nav">
	<a href="/" class="logo">
		<img src="/crest.png" alt="crest" class="crest" />
	</a>
	<div class="links">
		{#each links as link}
			<a
				href={link.href}
				class="link"
				class:active={page.url.pathname === link.href ||
					(link.href !== '/' && page.url.pathname.startsWith(link.href))}
			>
				{link.label}
			</a>
		{/each}
	</div>
</nav>

<style>
	.nav {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 0 1.5rem;
		height: 40px;
		background: var(--bg-header);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.logo {
		display: flex;
		align-items: center;
	}

	.crest {
		width: 22px;
		height: 22px;
		border-radius: 50%;
	}

	.links {
		display: flex;
		gap: 0;
		height: 100%;
	}

	.link {
		display: flex;
		align-items: center;
		padding: 0 0.75rem;
		font-size: 0.8rem;
		color: var(--text-dim);
		height: 100%;
		border-bottom: 2px solid transparent;
		transition: all 0.15s;
	}

	.link:hover {
		color: var(--text);
		background: var(--bg-hover);
	}

	.link.active {
		color: var(--text);
		border-bottom-color: var(--accent);
	}

	@media (max-width: 640px) {
		.nav {
			padding: 0 0.75rem;
			gap: 1rem;
		}
		.link {
			padding: 0 0.5rem;
			font-size: 0.75rem;
		}
	}
</style>
