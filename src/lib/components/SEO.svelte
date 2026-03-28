<script lang="ts">
	import config from '$lib/config';

	const SITE_URL = config.siteUrl;
	const SITE_NAME = config.title;
	const AUTHOR = config.name;
	const TWITTER = config.twitter;

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		url?: string;
		type?: 'website' | 'article';
		publishedDate?: string;
		noindex?: boolean;
	}

	let {
		title = SITE_NAME,
		description = '',
		image = config.image,
		url = '',
		type = 'website',
		publishedDate = '',
		noindex = false
	}: Props = $props();

	const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
	const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
	const ogType = type === 'article' ? 'article' : 'website';
	const robots = noindex ? 'noindex, nofollow' : 'index, follow';

	const socials = config.author.socials;
	const personJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: config.name,
		alternateName: config.alternateName,
		url: SITE_URL,
		image: `${SITE_URL}${config.image}`,
		jobTitle: config.author.jobTitle,
		affiliation: {
			'@type': 'Organization',
			name: config.author.organization
		},
		sameAs: Object.values(socials)
	});

	const websiteJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: config.title,
		alternateName: config.alternateName,
		url: SITE_URL
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={AUTHOR} />
	<meta name="robots" content={robots} />
	<link rel="canonical" href={fullUrl} />

	<meta property="og:type" content={ogType} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImage} />
	<meta name="twitter:creator" content={TWITTER} />
	<meta name="twitter:site" content={TWITTER} />

	{@html `<script type="application/ld+json">${personJsonLd}</script>`}
	{@html `<script type="application/ld+json">${websiteJsonLd}</script>`}
</svelte:head>
