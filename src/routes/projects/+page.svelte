<script lang="ts">
	import PageNav from '$lib/components/PageNav.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import config from '$lib/config';
	let { data } = $props();
</script>

<SEO
	title={config.pages['/projects'].title}
	description={config.pages['/projects'].description}
/>

<div class="page">
	<PageNav />
	<h1 class="page-title">Projects</h1>

	<div class="panel list">
		{#each data.projects as project}
			<div class="item">
				<div class="item-main">
					<span class="title">{project.name}</span>
					<span class="desc">{project.description}</span>
				</div>
				<div class="links">
					{#if project.github}
						<a href={project.github} target="_blank" rel="noopener" class="link-btn">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
							<span>GitHub</span>
						</a>
					{/if}
					{#if project.url}
						<a href={project.url} target="_blank" rel="noopener" class="link-btn live">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 1.5h5.5V7M12.5 1.5L6 8M5.5 3H2a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V8"/></svg>
							<span>Live</span>
						</a>
					{/if}
				</div>
			</div>
		{/each}

		{#if data.projects.length === 0}
			<div class="empty">No projects yet.</div>
		{/if}
	</div>
</div>

<style>
	.page {
		max-width: 750px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem;
	}

	.page-title {
		font-size: 1.6rem;
		font-weight: 600;
		margin-bottom: 1.25rem;
	}

	.list {
		overflow: hidden;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1rem 1rem;
		color: var(--text);
		border-bottom: 1px solid var(--border);
		gap: 1.5rem;
	}

	.item:last-child {
		border-bottom: none;
	}

	.item-main {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.title {
		font-size: 1.1rem;
		font-weight: 500;
	}

	.desc {
		font-size: 0.95rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.links {
		display: flex;
		gap: 0.4rem;
		flex-shrink: 0;
		padding-top: 0.15rem;
	}

	.link-btn {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.3rem 0.6rem;
		font-size: 0.8rem;
		color: var(--text-dim);
		background: var(--bg-input);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		transition: all 0.1s;
		white-space: nowrap;
	}

	.link-btn:hover {
		background: var(--bg-hover);
		color: var(--text);
		border-color: var(--border-light);
	}

	.link-btn.live {
		color: var(--accent-light);
	}

	.link-btn.live:hover {
		color: var(--accent);
	}

	.empty {
		padding: 2rem;
		text-align: center;
		color: var(--text-muted);
		font-size: 1rem;
	}
</style>
