<script lang="ts">
	import PageNav from '$lib/components/PageNav.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import config from '$lib/config';
	let { data } = $props();
</script>

<SEO title={config.pages['/wall-of-shame'].title} noindex={true} />

<div class="page">
	<PageNav />
	<h1 class="page-title">Wall of Shame</h1>
	<p class="subtitle">{data.entries.length} login attempts logged</p>

	<div class="panel log-panel">
		<!-- Blender-style header bar -->
		<div class="log-header">
			<span class="header-icon">
				<svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="1" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="1" y1="5" x2="13" y2="5" stroke="currentColor" stroke-width="1"/><line x1="5" y1="5" x2="5" y2="13" stroke="currentColor" stroke-width="1"/></svg>
			</span>
			<span class="header-label">Log Viewer</span>
			<span class="header-count">{data.entries.length} entries</span>
		</div>

		<!-- Column headers -->
		<div class="col-headers">
			<span class="ch" style="min-width:170px">Timestamp</span>
			<span class="ch" style="min-width:130px">IP Address</span>
			<span class="ch" style="min-width:140px">Username</span>
			<span class="ch" style="min-width:140px">Password</span>
		</div>

		<!-- Log rows -->
		<div class="log-body">
			{#if data.entries.length > 0}
				{#each data.entries as entry, i}
					<div class="log-row" class:alt={i % 2 === 1}>
						<span class="cell ts" style="min-width:170px">{entry.timestamp.slice(0, 19).replace('T', ' ')}</span>
						<span class="cell ip" style="min-width:130px">{entry.ip}</span>
						<span class="cell user" style="min-width:140px">{entry.username}</span>
						<span class="cell pass" style="min-width:140px">{entry.password}</span>
					</div>
				{/each}
			{:else}
				<div class="empty-state">
					No attempts yet. Try <a href="/admin">/admin</a>.
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.page {
		max-width: 900px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem;
	}

	.page-title {
		font-size: 1.6rem;
		font-weight: 600;
		margin-bottom: 0.35rem;
	}

	.subtitle {
		font-size: 0.95rem;
		color: var(--text-muted);
		margin-bottom: 1.25rem;
	}

	.log-panel {
		overflow: hidden;
	}

	/* Blender-style header */
	.log-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.75rem;
		background: #343434;
		border-bottom: 1px solid #1e1e1e;
	}

	.header-icon {
		color: var(--text-muted);
		display: flex;
		align-items: center;
	}

	.header-label {
		font-size: 0.85rem;
		color: var(--text-dim);
	}

	.header-count {
		margin-left: auto;
		font-size: 0.8rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
	}

	/* Column headers */
	.col-headers {
		display: flex;
		gap: 0;
		padding: 0.35rem 0.75rem;
		background: #2e2e2e;
		border-bottom: 1px solid #1e1e1e;
		font-size: 0.8rem;
		color: var(--text-dim);
		font-weight: 500;
	}

	.ch {
		flex-shrink: 0;
	}

	/* Log body */
	.log-body {
		overflow-x: auto;
	}

	.log-row {
		display: flex;
		gap: 0;
		padding: 0.35rem 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		border-bottom: 1px solid #262626;
	}

	.log-row.alt {
		background: #242424;
	}

	.log-row:hover {
		background: #2a2a3a;
	}

	.cell {
		flex-shrink: 0;
	}

	.ts { color: var(--text-dim); }
	.ip { color: var(--accent-light); }
	.user { color: var(--accent-orange); }
	.pass { color: #c55; }

	.empty-state {
		padding: 2rem;
		text-align: center;
		color: var(--text-muted);
		font-size: 0.95rem;
	}
</style>
