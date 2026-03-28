<script lang="ts">
	import PageNav from '$lib/components/PageNav.svelte';
	import SEO from '$lib/components/SEO.svelte';
	let { data } = $props();
</script>

<SEO
	title="Writing - umarbek.dev"
	description="Blog posts and articles by Umarbek Bakhodirjonov on development, design, and things I find interesting."
	url="/writing"
/>

<div class="page">
	<PageNav />
	<h1 class="page-title">Writing</h1>

	<div class="panel list">
		{#each data.posts as post}
			<a href="/writing/{post.slug}" class="item">
				<div class="item-main">
					<span class="title">{post.title}</span>
					<span class="desc">{post.description}</span>
				</div>
				<span class="meta">{post.date}</span>
			</a>
		{/each}

		{#if data.posts.length === 0}
			<div class="empty">Nothing here yet.</div>
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
		text-decoration: none;
		border-bottom: 1px solid var(--border);
		gap: 1.5rem;
		transition: background 0.1s;
	}

	.item:last-child {
		border-bottom: none;
	}

	.item:hover {
		background: var(--bg-hover);
		color: var(--text);
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

	.meta {
		font-size: 0.85rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
		white-space: nowrap;
		padding-top: 0.15rem;
	}

	.empty {
		padding: 2rem;
		text-align: center;
		color: var(--text-muted);
		font-size: 1rem;
	}
</style>
