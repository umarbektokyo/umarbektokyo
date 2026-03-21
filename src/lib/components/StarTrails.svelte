<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		let W = (canvas.width = window.innerWidth);
		let H = (canvas.height = window.innerHeight);

		const cx = W * 0.75;
		const cy = H * -0.1;

		interface Star {
			angle: number;
			radius: number;
			speed: number;
			opacity: number;
			size: number;
		}

		const stars: Star[] = Array.from({ length: 200 }, () => {
			const radius = 100 + Math.random() * Math.max(W, H) * 0.9;
			return {
				angle: Math.random() * Math.PI * 2,
				radius,
				speed: (0.00002 + Math.random() * 0.00004) * (800 / radius),
				opacity: 0.08 + Math.random() * 0.2,
				size: 0.3 + Math.random() * 0.8
			};
		});

		ctx.fillStyle = '#1d1d1d';
		ctx.fillRect(0, 0, W, H);

		let animId: number;

		function draw() {
			ctx.fillStyle = 'rgba(29, 29, 29, 0.015)';
			ctx.fillRect(0, 0, W, H);

			stars.forEach((star) => {
				const prevAngle = star.angle;
				star.angle += star.speed;

				const x = cx + Math.cos(star.angle) * star.radius;
				const y = cy + Math.sin(star.angle) * star.radius;
				const px = cx + Math.cos(prevAngle) * star.radius;
				const py = cy + Math.sin(prevAngle) * star.radius;

				ctx.beginPath();
				ctx.moveTo(px, py);
				ctx.lineTo(x, y);
				ctx.strokeStyle = `rgba(160, 160, 160, ${star.opacity})`;
				ctx.lineWidth = star.size;
				ctx.stroke();

				ctx.beginPath();
				ctx.arc(x, y, star.size * 0.6, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(180, 180, 180, ${star.opacity * 1.2})`;
				ctx.fill();
			});

			animId = requestAnimationFrame(draw);
		}

		draw();

		function handleResize() {
			W = canvas.width = window.innerWidth;
			H = canvas.height = window.innerHeight;
			ctx.fillStyle = '#1d1d1d';
			ctx.fillRect(0, 0, W, H);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<canvas bind:this={canvas} class="star-trails"></canvas>

<style>
	.star-trails {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		pointer-events: none;
		opacity: 0.5;
	}
</style>
