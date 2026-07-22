<script lang="ts">
	import PageNav from '$lib/components/PageNav.svelte';
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO title="lukas" description="" />

<div class="page">
	<PageNav />
	<p1><a href="https://lukasreis.com/" target="_blank">He</a> uses arch btw</p1>
	<div class="photo">
    <img src="https://cultofthepartyparrot.com/parrots/hd/partyparrot.gif" alt="Ultrafast Parrot" />
    <img src="https://cultofthepartyparrot.com/parrots/hd/opensourceparrot.gif" alt="Ultrafast Parrot" />
    <img src="https://cultofthepartyparrot.com/parrots/hd/sleepingparrot.gif" alt="Ultrafast Parrot" />
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
    margin: 1.25rem;
  }

  .photo {
    border-radius: var(--radius);
    overflow: hidden;
    padding-top: 1rem;
    display: flex;
    gap: 1rem; /* Adjust space between parrots here */
    align-items: center;
  }

  .photo img {
    width: 50px; /* Adjust size of the parrots here */
    height: auto;
    display: block;
  }
</style>