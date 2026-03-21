<script lang="ts">
	import '../app.css';
	import StarTrails from '$lib/components/StarTrails.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Favicon from '$lib/components/Favicon.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { initKonami } from '$lib/actions/konami';

	let { children } = $props();

	onMount(() => {
		const cleanup = initKonami();
		return cleanup;
	});

	let isTerminal = $derived(page.url.pathname === '/terminal');
</script>

<Favicon />
<StarTrails />
<div class="page-wrap">
	<main>
		{@render children()}
	</main>
	{#if !isTerminal}
		<Footer />
	{/if}
</div>

<style>
	.page-wrap {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
