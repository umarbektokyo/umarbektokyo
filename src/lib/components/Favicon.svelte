<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.src = '/crest.png';
		img.onload = () => {
			const size = 128;
			const canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d')!;

			// Circular clip
			ctx.beginPath();
			ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
			ctx.closePath();
			ctx.clip();

			// Draw the crest centered
			ctx.drawImage(img, 0, 0, size, size);

			// Get the image data and recolor to bright purple
			const imageData = ctx.getImageData(0, 0, size, size);
			const data = imageData.data;
			for (let i = 0; i < data.length; i += 4) {
				const alpha = data[i + 3];
				if (alpha > 10) {
					// Accent: #383AB8 -> lighter for favicon #6366d6
					data[i] = 99;      // R
					data[i + 1] = 102; // G
					data[i + 2] = 214; // B
				}
			}
			ctx.putImageData(imageData, 0, 0);

			// Set as favicon
			const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
			if (link) {
				link.href = canvas.toDataURL('image/png');
			}
		};
	});
</script>
