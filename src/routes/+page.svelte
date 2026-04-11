<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import config from '$lib/config';
	let { data } = $props();

	const nav = [
		{ href: '/writing', label: 'Writing' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/terminal', label: 'Terminal' }
	];

	const socials = [
		{ label: 'GitHub', url: config.author.socials.github },
		{ label: 'Email', url: `mailto:${config.author.email}` },
		{ label: 'Twitter', url: config.author.socials.twitter },
		{ label: 'LinkedIn', url: config.author.socials.linkedin }
	];

	function renderMd(md: string): string {
		const inline = (s: string) =>
				s
						.replace(/!\[((?:[^\[\]]*|\[[^\]]*\])*)\]\(([^)]+)\)/g, (_m, alt, src) => {
							const caption = alt.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
							return `<figure><img src="${src}" alt="${alt.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;
						})
						.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
						.replace(/\*(.+?)\*/g, '<em>$1</em>')
						.replace(/`([^`]+)`/g, '<code>$1</code>')
						.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

		const lines = md.split('\n');
		const out: string[] = [];
		let i = 0;
		let paraLines: string[] = [];

		const flushPara = () => {
			if (!paraLines.length) return;
			out.push(`<p>${paraLines.map(inline).join('<br />')}</p>`);
			paraLines = [];
		};

		while (i < lines.length) {
			const line = lines[i];

			// Fenced code block
			if (line.startsWith('```')) {
				flushPara();
				const lang = line.slice(3).trim();
				const codeLines: string[] = [];
				i++;
				while (i < lines.length && !lines[i].startsWith('```')) {
					codeLines.push(
							lines[i]
									.replace(/&/g, '&amp;')
									.replace(/</g, '&lt;')
									.replace(/>/g, '&gt;')
									.replace(/"/g, '&quot;')
					);
					i++;
				}
				out.push(`<pre><code class="language-${lang}">${codeLines.join('\n')}</code></pre>`);
				i++; // skip closing ```
				continue;
			}

			// Horizontal rule
			if (/^[ \t]*([-*_])([ \t]*\1){2,}[ \t]*$/.test(line)) {
				flushPara();
				out.push('<hr />');
				i++;
				continue;
			}

			// Headings
			const headingMatch = line.match(/^(#{1,3}) (.+)/);
			if (headingMatch) {
				flushPara();
				const tag = `h${headingMatch[1].length}`;
				out.push(`<${tag}>${inline(headingMatch[2])}</${tag}>`);
				i++;
				continue;
			}

			// Blockquote
			if (line.startsWith('>')) {
				flushPara();
				const bqLines: string[] = [];
				while (i < lines.length && lines[i].startsWith('>')) {
					bqLines.push(lines[i].slice(1).trimStart());
					i++;
				}
				out.push(`<blockquote>${bqLines.map(inline).join('<br />')}</blockquote>`);
				continue;
			}

			// Unordered list
			if (/^[ \t]*- /.test(line)) {
				flushPara();
				const items: string[] = [];
				while (i < lines.length && /^[ \t]*- /.test(lines[i])) {
					items.push(`<li>${inline(lines[i].replace(/^[ \t]*- /, ''))}</li>`);
					i++;
				}
				out.push(`<ul>${items.join('')}</ul>`);
				continue;
			}

			// Ordered list
			if (/^[ \t]*\d+\. /.test(line)) {
				flushPara();
				const items: string[] = [];
				while (i < lines.length && /^[ \t]*\d+\. /.test(lines[i])) {
					items.push(`<li>${inline(lines[i].replace(/^[ \t]*\d+\. /, ''))}</li>`);
					i++;
				}
				out.push(`<ol>${items.join('')}</ol>`);
				continue;
			}

			// Blank line — flush paragraph, don't emit anything
			if (line.trim() === '') {
				flushPara();
				i++;
				continue;
			}

			// Regular text — accumulate into paragraph
			paraLines.push(line);
			i++;
		}

		flushPara();
		return out.join('\n');
	}
</script>

<SEO
	title={config.pages['/'].title}
	description={config.pages['/'].description}
	url="/"
/>

<div class="home">
	<!-- Header with crest + nav -->
	<div class="header panel">
		<div class="header-left">
			<img src="/assets/crest.webp" alt="Umarbek" class="avatar" width="52" height="52" />
			<div>
				<h1 class="name">{config.name}</h1>
				<p class="tagline">{config.author.jobTitle} at {config.author.organization}</p>
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

	.about-body :global(pre) {
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 1rem 1.25rem;
		margin: 1rem 0;
		overflow-x: auto;
		scrollbar-width: none; /* Firefox */
	}

	.about-body :global(pre::-webkit-scrollbar) {
		display: none; /* Chrome, Safari, Edge */
	}

	.about-body :global(pre code) {
		font-family: var(--font-mono);
		font-size: 0.82em;
		background: none;
		border: none;
		padding: 0;
		color: var(--accent-light);
		white-space: pre;
		display: block;
	}

	.about-body :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 1.5rem 0;
	}

	.about-body :global(blockquote) {
		border-left: 3px solid var(--border-light);
		margin: 1rem 0;
		padding: 0.25rem 0 0.25rem 1rem;
		color: var(--text-muted);
		font-style: italic;
	}
</style>
