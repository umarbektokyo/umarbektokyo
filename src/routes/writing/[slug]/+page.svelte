<script lang="ts">
	import PageNav from '$lib/components/PageNav.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import config from '$lib/config';
	let { data } = $props();

	function renderBody(raw: string): string {
		return raw
			.replace(/^# .+\n/, '')
			.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) => {
				const lines = code.split('\n');
				const indent = lines
					.filter((l: string) => l.trim())
					.reduce((min: number, l: string) => {
						const spaces = l.match(/^(\s*)/)?.[1].length ?? 0;
						return Math.min(min, spaces);
					}, Infinity);
				const trimmed = lines.map((l: string) => l.slice(indent)).join('\n');
				return `<pre><code class="language-${lang}">${trimmed.trim()}</code></pre>`;
			})
			// Images with alt text as captions
			.replace(/!\[((?:[^\[\]]*|\[[^\]]*\])*)\]\(([^)]+)\)/g, (_m, alt, src) => {
				const caption = alt.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
				return `<figure><img src="${src}" alt="${alt.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;
			})
			.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
			.replace(/## (.+)/g, '<h2>$1</h2>')
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			.replace(/`([^`]+)`/g, '<code>$1</code>')
			.replace(/^- (.+)/gm, '<li>$1</li>')
			.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
			.replace(/\n\n/g, '</p><p>')
			.replace(/^/, '<p>')
			.replace(/$/, '</p>')
			.replace(/<p>\s*<\/p>/g, '')
			.replace(/<p>\s*(<h2>)/g, '$1')
			.replace(/(<\/h2>)\s*<\/p>/g, '$1')
			.replace(/<p>\s*(<pre>)/g, '$1')
			.replace(/(<\/pre>)\s*<\/p>/g, '$1')
			.replace(/<p>\s*(<ul>)/g, '$1')
			.replace(/(<\/ul>)\s*<\/p>/g, '$1')
			.replace(/<p>\s*(<figure>)/g, '$1')
			.replace(/(<\/figure>)\s*<\/p>/g, '$1');
	}
</script>

<SEO
	title="{data.meta.title} - {config.title}"
	description={data.meta.description}
	url="/writing/{data.meta.slug}"
	type="article"
	publishedDate={data.meta.date}
	image={data.meta.image || ''}
/>

<article class="post">
	<PageNav />

	<header class="post-header">
		<h1 class="title">{data.meta.title}</h1>
		<div class="divider">
			<span class="divider-line"></span>
			<span class="divider-date">{data.meta.date}</span>
			<span class="divider-line"></span>
		</div>
	</header>

	<div class="body">
		{@html renderBody(data.body)}
	</div>
</article>

<style>
	.post {
		max-width: 700px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 7rem;
	}

	.post-header {
		margin-bottom: 3rem;
	}

	.title {
		font-family: var(--font-sans);
		font-size: 1.6rem;
		font-weight: 600;
		line-height: 1.3;
		margin-bottom: 1.25rem;
		letter-spacing: -0.02em;
	}

	.divider {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.divider-line {
		flex: 1;
		height: 1px;
		background: var(--border);
	}

	.divider-date {
		font-size: 0.75rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
		white-space: nowrap;
	}

	/* Body: IBM Plex Serif */
	.body {
		font-family: var(--font-serif);
		font-size: 0.95rem;
		line-height: 1.85;
		color: var(--text);
		letter-spacing: 0.005em;
		word-spacing: 0.03em;
	}

	.body :global(h2) {
		font-family: var(--font-sans);
		font-size: 1.15rem;
		font-weight: 600;
		margin: 2.5rem 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
		letter-spacing: -0.01em;
		line-height: 1.3;
	}

	.body :global(p) {
		margin-bottom: 1.5rem;
	}

	.body :global(code) {
		font-family: var(--font-mono);
		font-size: 0.78em;
		color: var(--accent-light);
		background: var(--bg-input);
		padding: 0.15em 0.4em;
		border-radius: 3px;
		border: 1px solid var(--border);
	}

	.body :global(pre) {
		background: #1a1a1a;
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		padding: 1.25rem 1.5rem;
		border-radius: var(--radius);
		overflow-x: auto;
		margin: 2rem 0;
	}

	.body :global(pre code) {
		font-family: var(--font-mono);
		background: none;
		padding: 0;
		border: none;
		font-size: 0.8rem;
		line-height: 1.65;
		color: var(--text);
	}

	.body :global(strong) {
		font-weight: 600;
		color: #f0f0f0;
	}

	.body :global(em) {
		font-style: italic;
		color: var(--text-dim);
	}

	.body :global(ul) {
		margin: 1.25rem 0 1.5rem;
		padding-left: 1.5rem;
	}

	.body :global(li) {
		margin-bottom: 0.65rem;
		line-height: 1.8;
	}

	.body :global(li::marker) {
		color: var(--accent-light);
	}

	/* Images with captions */
	.body :global(figure) {
		margin: 2.5rem 0;
	}

	.body :global(figure img) {
		width: 100%;
		border-radius: 8px;
		border: 1px solid var(--border);
		display: block;
	}

	.body :global(figcaption) {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		color: var(--text-muted);
		text-align: center;
		margin-top: 0.6rem;
		line-height: 1.4;
	}

	.body :global(img) {
		max-width: 100%;
		border-radius: 8px;
		border: 1px solid var(--border);
		margin: 2rem 0;
	}

	.body :global(blockquote) {
		border-left: 3px solid var(--accent);
		padding: 1rem 1.5rem;
		margin: 2rem 0;
		background: var(--bg-panel);
		border-radius: 0 var(--radius) var(--radius) 0;
		color: var(--text-dim);
		font-style: italic;
	}

	.body :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 3rem 0;
	}
</style>
