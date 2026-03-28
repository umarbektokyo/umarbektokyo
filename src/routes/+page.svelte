<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	let { data } = $props();

	const nav = [
		{ href: '/writing', label: 'Writing' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/terminal', label: 'Terminal' }
	];

	const socials = [
		{ label: 'GitHub', url: 'https://github.com/umarbektokyo' },
		{ label: 'Email', url: 'mailto:hello@umarbek.dev' },
		{ label: 'Twitter', url: 'https://twitter.com/umarbektokyo' },
		{ label: 'LinkedIn', url: 'https://linkedin.com/in/umarbektokyo' }
	];

	function renderMd(md: string): string {
		return md
			.replace(/!\[((?:[^\[\]]*|\[[^\]]*\])*)\]\(([^)]+)\)/g, (_m, alt, src) => {
				const caption = alt.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
				return `<figure><img src="${src}" alt="${alt.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;
			})
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			.replace(/`([^`]+)`/g, '<code>$1</code>')
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
			.replace(/^### (.+)/gm, '<h3>$1</h3>')
			.replace(/^## (.+)/gm, '<h2>$1</h2>')
			.replace(/^# (.+)/gm, '<h1>$1</h1>')
			.replace(/^- (.+)/gm, '<li>$1</li>')
			.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
			.split('\n\n')
			.map((block) => {
				block = block.trim();
				if (!block || block.startsWith('<h') || block.startsWith('<ul')) return block;
				return `<p>${block}</p>`;
			})
			.join('\n');
	}
</script>

<SEO
	title="umarbek.dev"
	description="Personal website of Umarbek Bakhodirjonov - student, developer, and cool-things enthusiast based in Tokyo."
	url="/"
/>

<div class="home">
	<!-- Header with crest + nav -->
	<div class="header panel">
		<div class="header-left">
			<img src="/crest.webp" alt="Umarbek" class="avatar" width="52" height="52" />
			<div>
				<h1 class="name">Umarbek Bakhodirjonov</h1>
				<p class="tagline">Student at Shinagawa International School</p>
			</div>
		</div>
		<nav class="nav-links">
			{#each nav as link}
				<a href={link.href} class="nav-link">{link.label}</a>
			{/each}
		</nav>
	</div>

	<!-- About section from markdown -->
	{#if data.about}
		<div class="panel about-section">
			<div class="about-body">
				{@html renderMd(data.about)}
			</div>
		</div>
	{/if}

	<!-- Social links -->
	<div class="socials">
		{#each socials as s}
			<a href={s.url} target="_blank" rel="noopener" class="social-link panel">{s.label}</a>
		{/each}
	</div>
</div>

<style>
	.home {
		max-width: 750px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.25rem;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.avatar {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.name {
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 0.15rem;
	}

	.tagline {
		color: var(--text-dim);
		font-size: 0.9rem;
	}

	.nav-links {
		display: flex;
		gap: 0.25rem;
	}

	.nav-link {
		padding: 0.35rem 0.7rem;
		font-size: 0.9rem;
		color: var(--text-dim);
		border-radius: var(--radius);
		transition: all 0.1s;
	}

	.nav-link:hover {
		background: var(--bg-hover);
		color: var(--text);
	}

	.about-section {
		padding: 1.5rem;
	}

	.about-body {
		font-size: 1rem;
		line-height: 1.75;
		color: var(--text-dim);
	}

	.about-body :global(p) {
		margin-bottom: 0.75rem;
	}

	.about-body :global(p:last-child) {
		margin-bottom: 0;
	}

	.about-body :global(strong) {
		color: var(--text);
		font-weight: 500;
	}

	.about-body :global(code) {
		font-family: var(--font-mono);
		font-size: 0.82em;
		background: var(--bg-input);
		padding: 0.1em 0.3em;
		border-radius: 3px;
		border: 1px solid var(--border);
		color: var(--accent-light);
	}

	.about-body :global(a) {
		color: var(--accent-light);
	}

	.about-body :global(figure) {
		margin: 1.5rem 0;
	}

	.about-body :global(figure img) {
		width: 100%;
		border-radius: 8px;
		border: 1px solid var(--border);
		display: block;
	}

	.about-body :global(figcaption) {
		font-size: 0.75rem;
		color: var(--text-muted);
		text-align: center;
		margin-top: 0.5rem;
	}

	.socials {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.social-link {
		padding: 0.4rem 0.85rem;
		font-size: 0.9rem;
		color: var(--text-dim);
		transition: all 0.1s;
	}

	.social-link:hover {
		border-color: var(--border-light);
		color: var(--text);
	}

	@media (max-width: 640px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}
		.nav-links {
			flex-wrap: wrap;
		}
	}
</style>
