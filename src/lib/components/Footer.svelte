<script lang="ts">
	import config from '$lib/config';
	import { browser } from '$app/environment';

	const KONAMI_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
	const ARROWS = ['▲', '▲', '▼', '▼', '◀', '▶', '◀', '▶'];

	let progress = $state(0);
	let completed = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (completed) return;
		if (e.key === KONAMI_SEQUENCE[progress]) {
			progress++;
			if (progress === KONAMI_SEQUENCE.length) {
				completed = true;
			}
		} else {
			progress = e.key === KONAMI_SEQUENCE[0] ? 1 : 0;
		}
	}

	$effect(() => {
		if (!browser) return;
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<footer class="footer-bar">
	<span class="konami">
		{#each ARROWS as arrow, i}
			<span class="arrow" class:lit={i < progress || completed}>{arrow}</span>
		{/each}
	</span>
	<span class="title">{config.title}</span>
</footer>

<style>
	.footer-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.65rem 1rem;
		background: var(--bg-base);
		border-top: 1px solid var(--border);
		font-size: 0.85rem;
		color: var(--text-dim);
		position: relative;
	}

	.konami {
		position: absolute;
		left: 1rem;
		display: flex;
		gap: 0.3rem;
		align-items: center;
	}

	@media (max-width: 640px) {
		.konami {
			display: none;
		}
	}

	.arrow {
		opacity: 0.4;
		font-size: 0.6rem;
		transition: opacity 0.2s, color 0.2s;
	}

	.arrow.lit {
		opacity: 1;
		color: var(--accent-light);
	}

	.title {
		text-align: center;
	}
</style>
