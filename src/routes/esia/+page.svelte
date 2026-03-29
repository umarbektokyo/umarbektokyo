<script lang="ts">
	import PageNav from '$lib/components/PageNav.svelte';
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO title="esia" description="" />

<div class="page">
	<PageNav />
	<div class="photo">
		<img src="/assets/rumi.jpg" alt="Rumi" />
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

	.photo {
		border-radius: var(--radius);
		overflow: hidden;
	}

	.photo img {
		width: 100%;
		height: auto;
		display: block;
	}
</style>
