<script lang="ts">
	import PageNav from '$lib/components/PageNav.svelte';
	import SEO from '$lib/components/SEO.svelte';
	let { data } = $props();

	const statusLabel: Record<string, string> = {
		read: 'Read',
		reading: 'Reading',
		want: 'Want to read'
	};
</script>

<SEO
	title="Reading Log - umarbek.dev"
	description="Books Umarbek Bakhodirjonov is reading, has read, or wants to read."
	url="/reading"
/>

<div class="page">
	<PageNav />
	<h1 class="page-title">Reading Log</h1>

	<div class="grid">
		{#each data.books as book}
			<div class="book panel">
				<div class="cover-wrap">
					<img src={book.cover} alt={book.title} class="cover" loading="lazy" />
				</div>
				<div class="info">
					<h3 class="book-title">{book.title}</h3>
					<p class="author">{book.author}</p>
					<span class="status" class:reading={book.status === 'reading'} class:want={book.status === 'want'}>
						{statusLabel[book.status] || book.status}
					</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.page {
		max-width: 780px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem;
	}

	.page-title {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 0.75rem;
	}

	.book {
		padding: 0.5rem;
		transition: border-color 0.15s;
	}

	.book:hover {
		border-color: var(--border-light);
	}

	.cover-wrap {
		aspect-ratio: 2/3;
		overflow: hidden;
		border-radius: 2px;
		margin-bottom: 0.5rem;
		background: var(--bg-input);
	}

	.cover {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.book-title {
		font-size: 0.8rem;
		font-weight: 500;
		line-height: 1.3;
		margin-bottom: 0.15rem;
	}

	.author {
		font-size: 0.7rem;
		color: var(--text-muted);
		margin-bottom: 0.25rem;
	}

	.status {
		font-size: 0.65rem;
		color: var(--text-dim);
	}

	.status.reading {
		color: var(--accent-orange);
	}

	.status.want {
		color: var(--text-muted);
	}
</style>
