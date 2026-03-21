<script lang="ts">
	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/writing', label: 'Writing' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/terminal', label: 'Terminal' }
	];
</script>

<nav class="page-nav">
	<a href="/" class="nav-crest">
		<img src="/crest.png" alt="home" class="crest" />
	</a>
	{#each links as link}
		<a href={link.href} class="nav-link">{link.label}</a>
	{/each}
</nav>

<style>
	.page-nav {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		margin-bottom: 2rem;
	}

	.nav-crest {
		margin-right: 0.6rem;
	}

	.crest {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		opacity: 0.7;
	}

	.nav-link {
		padding: 0.3rem 0.7rem;
		font-size: 0.95rem;
		color: var(--text-muted);
		border-radius: var(--radius);
		transition: all 0.1s;
	}

	.nav-link:hover {
		background: var(--bg-hover);
		color: var(--text);
	}
</style>
