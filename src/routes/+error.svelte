<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let isTeapot = $derived(page.status === 418);
	let starsEl: HTMLDivElement;

	onMount(() => {
		if (!starsEl) return;
		for (let i = 0; i < 150; i++) {
			const star = document.createElement('div');
			const size = 0.5 + Math.random() * 2;
			star.style.cssText = `
				position:absolute;
				width:${size}px;
				height:${size}px;
				left:${Math.random() * 100}%;
				top:${Math.random() * 100}%;
				background:white;
				border-radius:50%;
				opacity:${0.15 + Math.random() * 0.55};
			`;
			starsEl.appendChild(star);
		}
	});
</script>

{#if isTeapot}
	<!-- 418 I'm a teapot -->
	<div class="teapot-page">
		<div class="teapot-card panel">
			<div class="teapot-img">
				<img
					src="https://place.dog/500/400"
					alt="A puppy drinking coffee"
					class="puppy"
				/>
			</div>
			<div class="teapot-text">
				<h1>418</h1>
				<p class="teapot-msg">I'm a teapot</p>
				<p class="teapot-sub">This server refuses to brew coffee because it is, permanently, a teapot.</p>
				<a href="/" class="teapot-link">Go home</a>
			</div>
		</div>
	</div>
{:else}
	<!-- BSOD for everything else -->
	<div class="bsod">
		<div class="bsod-overlay"></div>
		<div class="stars" bind:this={starsEl}></div>
		<div class="bsod-content">
			<div class="sad-face">:(</div>
			<div class="bsod-main">
				<p class="bsod-title">
					Oh no! You're lost...
				</p>

				<div class="bsod-details">
					<p class="bsod-percent">
						{page.status} {page.status === 404 ? 'Not Found' : 'Error'}
					</p>
					<br />
					<p class="bsod-stop">
						If you call a support person, give them this info:
					</p>
					<p class="bsod-code">
						Stop code: PAGE_NOT_FOUND_IN_SPACE
					</p>
					<p class="bsod-code">
						What failed: {page.url.pathname}
					</p>
				</div>

				<a href="/" class="bsod-home">
					[ Press here to return to Earth ]
				</a>
			</div>
		</div>
	</div>
{/if}

<style>
	/* 418 Teapot */
	.teapot-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 80vh;
		padding: 2rem;
	}

	.teapot-card {
		max-width: 500px;
		width: 100%;
		overflow: hidden;
		text-align: center;
	}

	.teapot-img {
		background: #232323;
		border-bottom: 1px solid var(--border);
	}

	.puppy {
		width: 100%;
		height: auto;
		display: block;
	}

	.teapot-text {
		padding: 2rem;
	}

	.teapot-text h1 {
		font-family: var(--font-mono);
		font-size: 3rem;
		font-weight: 700;
		color: var(--accent-light);
		margin-bottom: 0.25rem;
	}

	.teapot-msg {
		font-size: 1.3rem;
		font-weight: 500;
		margin-bottom: 0.75rem;
	}

	.teapot-sub {
		font-size: 0.9rem;
		color: var(--text-dim);
		margin-bottom: 1.5rem;
		line-height: 1.5;
	}

	.teapot-link {
		display: inline-block;
		padding: 0.4rem 1.2rem;
		background: var(--bg-input);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		color: var(--text-dim);
		font-size: 0.9rem;
		transition: all 0.1s;
	}

	.teapot-link:hover {
		background: var(--bg-hover);
		color: var(--text);
	}

	/* BSOD */
	.bsod {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bsod-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 120, 215, 0.85);
		z-index: -1;
	}

	.bsod-content {
		color: white;
		max-width: 700px;
		padding: 3rem;
		font-family: var(--font-mono);
	}

	.sad-face {
		font-size: 6rem;
		font-weight: 100;
		margin-bottom: 1.5rem;
		line-height: 1;
	}

	.bsod-title {
		font-size: 1.3rem;
		line-height: 1.6;
		margin-bottom: 2rem;
		font-weight: 400;
	}

	.bsod-details { margin-bottom: 2rem; }
	.bsod-percent { font-size: 1rem; }
	.bsod-info { font-size: 0.7rem; line-height: 1.6; opacity: 0.9; }
	.bsod-link { text-decoration: underline; }
	.bsod-stop { font-size: 0.7rem; opacity: 0.8; }
	.bsod-code { font-size: 0.7rem; opacity: 0.8; margin-top: 0.25rem; }
	.bsod-error-msg { font-size: 0.8rem; opacity: 0.7; margin-bottom: 2rem; font-style: italic; }

	.bsod-home {
		display: inline-block;
		color: white;
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		opacity: 0.8;
		animation: blink 1.5s step-end infinite;
		text-decoration: none;
	}

	.bsod-home:hover { opacity: 1; color: white; }

	@keyframes blink {
		0%, 100% { opacity: 0.8; }
		50% { opacity: 0.3; }
	}

	.stars {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	@media (max-width: 640px) {
		.bsod-content { padding: 2rem 1.5rem; }
		.sad-face { font-size: 4rem; }
		.bsod-title { font-size: 1rem; }
	}
</style>
