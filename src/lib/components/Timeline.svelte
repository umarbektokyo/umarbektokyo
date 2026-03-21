<script lang="ts">
	import { onMount } from 'svelte';

	interface Marker { position: number; label: string; }

	let scrollPct = $state(0);
	let frame = $state(0);
	let endFrame = $state(250);
	let markers = $state<Marker[]>([]);
	let rulerEl: HTMLDivElement;
	let isDragging = $state(false);
	let autoScrolling = $state(false);
	let autoScrollId = 0;

	onMount(() => {
		function measure() {
			const article = document.querySelector('article');
			if (!article) return;
			const dh = document.documentElement.scrollHeight - window.innerHeight;
			if (dh <= 0) return;
			endFrame = Math.ceil(dh / 4);
			const headings = article.querySelectorAll('h2');
			markers = Array.from(headings).map((h) => ({
				position: (h.getBoundingClientRect().top + window.scrollY) / document.documentElement.scrollHeight,
				label: h.textContent || ''
			}));
		}

		function onScroll() {
			const dh = document.documentElement.scrollHeight - window.innerHeight;
			if (dh <= 0) return;
			scrollPct = window.scrollY / dh;
			frame = Math.round(scrollPct * endFrame);
		}

		measure();
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', () => { measure(); onScroll(); });
		return () => {
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(autoScrollId);
		};
	});

	function goTo(pct: number) {
		const dh = document.documentElement.scrollHeight - window.innerHeight;
		window.scrollTo({ top: Math.max(0, Math.min(1, pct)) * dh, behavior: 'smooth' });
	}

	function goToInstant(pct: number) {
		const dh = document.documentElement.scrollHeight - window.innerHeight;
		window.scrollTo({ top: Math.max(0, Math.min(1, pct)) * dh });
	}

	function scrubAt(e: MouseEvent) {
		if (!rulerEl) return;
		const r = rulerEl.getBoundingClientRect();
		goToInstant(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
	}

	function drag(e: MouseEvent) {
		if (!isDragging || !rulerEl) return;
		const r = rulerEl.getBoundingClientRect();
		goToInstant(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
	}

	function prevSection() {
		const p = [...markers].reverse().find((m) => m.position < scrollPct - 0.01);
		goTo(p ? p.position : 0);
	}

	function nextSection() {
		const n = markers.find((m) => m.position > scrollPct + 0.01);
		goTo(n ? n.position : 1);
	}

	function stepBack() { goTo(Math.max(0, scrollPct - 5 / endFrame)); }
	function stepFwd() { goTo(Math.min(1, scrollPct + 5 / endFrame)); }

	function toggleAutoScroll() {
		if (autoScrolling) {
			cancelAnimationFrame(autoScrollId);
			autoScrolling = false;
			return;
		}
		autoScrolling = true;
		(function step() {
			if (!autoScrolling) return;
			window.scrollBy(0, 1.5);
			const dh = document.documentElement.scrollHeight - window.innerHeight;
			if (window.scrollY >= dh) { autoScrolling = false; return; }
			autoScrollId = requestAnimationFrame(step);
		})();
	}

	// Compute tick positions — fixed number of ticks across ruler
	function computeTicks(end: number): number[] {
		const step = Math.max(1, Math.round(end / 20));
		const result: number[] = [];
		for (let i = 0; i <= end; i += step) result.push(i);
		return result;
	}

	let ticks = $derived(computeTicks(endFrame));
</script>

<svelte:window onmouseup={() => (isDragging = false)} onmousemove={drag} />

<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
<div class="tl">
	<!-- Header bar — matches Blender's toolbar row -->
	<div class="tl-head">
		<div class="transport">
			<button class="tb" onclick={() => goTo(0)} title="Jump to Start">
				<svg viewBox="0 0 12 10" width="11" height="9"><rect x="0" y="1" width="2" height="8" fill="currentColor"/><polygon points="11,1 11,9 3,5" fill="currentColor"/></svg>
			</button>
			<button class="tb" onclick={prevSection} title="Previous Section">
				<svg viewBox="0 0 12 10" width="11" height="9"><polygon points="6,1 6,9 0,5" fill="currentColor"/><polygon points="12,1 12,9 6,5" fill="currentColor"/></svg>
			</button>
			<button class="tb" onclick={stepBack} title="Frame Back">
				<svg viewBox="0 0 10 10" width="9" height="9"><polygon points="6,1 6,9 1,5" fill="currentColor"/><rect x="6" y="1" width="2" height="8" fill="currentColor"/></svg>
			</button>
			<button class="tb" class:playing={autoScrolling} onclick={toggleAutoScroll} title={autoScrolling ? 'Pause' : 'Play'}>
				{#if autoScrolling}
					<svg viewBox="0 0 10 10" width="9" height="9"><rect x="1" y="1" width="3" height="8" fill="currentColor"/><rect x="6" y="1" width="3" height="8" fill="currentColor"/></svg>
				{:else}
					<svg viewBox="0 0 10 10" width="9" height="9"><polygon points="2,1 9,5 2,9" fill="currentColor"/></svg>
				{/if}
			</button>
			<button class="tb" onclick={stepFwd} title="Frame Forward">
				<svg viewBox="0 0 10 10" width="9" height="9"><rect x="2" y="1" width="2" height="8" fill="currentColor"/><polygon points="4,1 9,5 4,9" fill="currentColor"/></svg>
			</button>
			<button class="tb" onclick={nextSection} title="Next Section">
				<svg viewBox="0 0 12 10" width="11" height="9"><polygon points="0,1 0,9 6,5" fill="currentColor"/><polygon points="6,1 6,9 12,5" fill="currentColor"/></svg>
			</button>
			<button class="tb" onclick={() => goTo(1)} title="Jump to End">
				<svg viewBox="0 0 12 10" width="11" height="9"><polygon points="1,1 1,9 9,5" fill="currentColor"/><rect x="10" y="1" width="2" height="8" fill="currentColor"/></svg>
			</button>
		</div>

		<div class="flex-spacer"></div>

		<!-- Current frame display -->
		<div class="frame-box">{frame}</div>

		<!-- Range -->
		<div class="range-info">
			<span class="rl">Start</span>
			<span class="rv">1</span>
			<span class="rl">End</span>
			<span class="rv">{endFrame}</span>
		</div>
	</div>

	<!-- Ruler — frame numbers row -->
	<div
		class="ruler"
		bind:this={rulerEl}
		onclick={scrubAt}
		onmousedown={() => (isDragging = true)}
	>
		{#each ticks as t}
			<div class="tick" style="left:{(t / endFrame) * 100}%">
				<span class="tick-num">{t}</span>
			</div>
		{/each}

		<!-- Playhead badge on ruler -->
		<div class="ph-ruler" style="left:{scrollPct * 100}%">
			<div class="ph-pill">{frame}</div>
		</div>
	</div>

	<!-- Track area — darker, with grid lines and playhead line -->
	<div
		class="track"
		onclick={scrubAt}
		onmousedown={() => (isDragging = true)}
	>
		{#each ticks as t}
			<div class="grid-line" style="left:{(t / endFrame) * 100}%"></div>
		{/each}

		<!-- Section markers -->
		{#each markers as m}
			<div class="marker" style="left:{m.position * 100}%" title={m.label}></div>
		{/each}

		<!-- Playhead line -->
		<div class="ph-line" style="left:{scrollPct * 100}%"></div>
	</div>
</div>

<style>
	.tl {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 150;
		user-select: none;
	}

	/* Header bar */
	.tl-head {
		height: 26px;
		background: #343434;
		border-top: 1px solid #4a4a4a;
		border-bottom: 1px solid #1e1e1e;
		display: flex;
		align-items: center;
		padding: 0 8px;
	}

	.transport {
		display: flex;
		align-items: center;
		gap: 0;
	}

	.tb {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		background: none;
		border: none;
		color: #aaa;
		cursor: pointer;
		border-radius: 3px;
	}

	.tb:hover {
		color: #fff;
		background: #505050;
	}

	.tb.playing {
		color: var(--accent-light);
	}

	.flex-spacer { flex: 1; }

	.frame-box {
		background: #1e1e1e;
		border: 1px solid #505050;
		border-radius: 4px;
		padding: 2px 10px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: #e0e0e0;
		margin: 0 8px;
		min-width: 44px;
		text-align: center;
	}

	.range-info {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.rl {
		font-size: 10px;
		color: #777;
		font-family: var(--font-sans);
	}

	.rv {
		font-size: 11px;
		color: #aaa;
		font-family: var(--font-mono);
	}

	/* Ruler — frame numbers */
	.ruler {
		height: 22px;
		background: #2c2c2c;
		position: relative;
		cursor: pointer;
		border-bottom: 1px solid #1e1e1e;
		overflow: hidden;
	}

	.tick {
		position: absolute;
		top: 0;
		height: 100%;
		transform: translateX(-50%);
	}

	.tick-num {
		position: absolute;
		top: 4px;
		left: 50%;
		transform: translateX(-50%);
		font-family: var(--font-mono);
		font-size: 10px;
		color: #888;
		white-space: nowrap;
	}

	/* Playhead pill on ruler */
	.ph-ruler {
		position: absolute;
		top: 2px;
		transform: translateX(-50%);
		z-index: 5;
		pointer-events: none;
	}

	.ph-pill {
		background: var(--accent);
		color: #fff;
		font-family: var(--font-mono);
		font-size: 10px;
		padding: 1px 6px;
		border-radius: 3px;
		line-height: 1.4;
		white-space: nowrap;
	}

	/* Track — main dark area below ruler */
	.track {
		height: 50px;
		background: #232323;
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}

	.grid-line {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		background: #2c2c2c;
	}

	.marker {
		position: absolute;
		top: 4px;
		width: 7px;
		height: 7px;
		background: var(--accent);
		transform: translateX(-50%) rotate(45deg);
		border-radius: 1px;
		z-index: 2;
		opacity: 0.85;
	}

	.ph-line {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2px;
		background: var(--accent-light);
		transform: translateX(-50%);
		pointer-events: none;
		z-index: 3;
	}

	@media (max-width: 640px) {
		.range-info { display: none; }
		.track { height: 32px; }
	}
</style>
