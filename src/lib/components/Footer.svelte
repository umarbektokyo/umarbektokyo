<script lang="ts">
	import config from '$lib/config';
</script>

<footer class="footer-bar">
	<span>{config.title}</span>
</footer>

<style>
	.footer-bar {
		text-align: center;
		padding: 0.65rem;
		background: var(--bg-header);
		border-top: 1px solid var(--border);
		font-size: 0.85rem;
		color: var(--text-dim);
	}
</style>
