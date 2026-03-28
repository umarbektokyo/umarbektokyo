<script lang="ts">
	const SITE_URL = 'https://umarbek.dev';
	const SITE_NAME = 'umarbek.dev';
	const AUTHOR = 'Umarbek Bakhodirjonov';
	const TWITTER = '@umarbektokyo';

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
		image = '/banner.webp',
		url = '',
		type = 'website',
		publishedDate = '',
		noindex = false
	}: Props = $props();

	const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
	const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
	const ogType = type === 'article' ? 'article' : 'website';
	const robots = noindex ? 'noindex, nofollow' : 'index, follow';
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
</svelte:head>
