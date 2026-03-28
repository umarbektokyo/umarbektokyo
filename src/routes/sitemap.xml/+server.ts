import { getAllPosts } from '$lib/server/posts';
import siteConfig from '$lib/config';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const posts = await getAllPosts();
	const siteUrl = siteConfig.siteUrl;

	// Static pages from site.json
	const staticPages = Object.keys(siteConfig.pages).map((path) => ({
		url: path === '/' ? '' : path,
		priority: path === '/' ? '1.0' : '0.8'
	}));

	// Dynamic blog posts
	const blogPages = posts.map((post) => ({
		url: `/writing/${post.slug}`,
		lastmod: post.date,
		priority: '0.6'
	}));

	const urls = [...staticPages, ...blogPages];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>${
			'lastmod' in page && page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''
		}
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
