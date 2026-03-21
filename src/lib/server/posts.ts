import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const CONTENT_DIR = join(process.cwd(), 'static', 'writing');

export interface PostMeta {
	title: string;
	description: string;
	date: string;
	slug: string;
	filename: string;
}

function getSlug(filename: string): string {
	return filename.replace(/\.md$/, '');
}

function parseFrontmatter(content: string): { meta: Record<string, string>; body: string } {
	const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return { meta: {}, body: content };

	const meta: Record<string, string> = {};
	for (const line of match[1].split('\n')) {
		const idx = line.indexOf(':');
		if (idx > 0) {
			const key = line.slice(0, idx).trim();
			const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
			meta[key] = val;
		}
	}
	return { meta, body: match[2] };
}

export async function getAllPosts(): Promise<PostMeta[]> {
	let files: string[];
	try {
		files = await readdir(CONTENT_DIR);
	} catch {
		return [];
	}

	const posts: PostMeta[] = [];
	for (const file of files) {
		if (!file.endsWith('.md')) continue;
		const content = await readFile(join(CONTENT_DIR, file), 'utf-8');
		const { meta } = parseFrontmatter(content);
		posts.push({
			title: meta.title || file,
			description: meta.description || '',
			date: meta.date || '',
			slug: getSlug(file),
			filename: file
		});
	}

	return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<{ meta: PostMeta; body: string } | null> {
	const posts = await getAllPosts();
	const post = posts.find((p) => p.slug === slug);
	if (!post) return null;

	const content = await readFile(join(CONTENT_DIR, post.filename), 'utf-8');
	const { body } = parseFrontmatter(content);
	return { meta: post, body };
}
