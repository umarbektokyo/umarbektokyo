import { readFile } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';

const CONTENT_DIR = process.env.CONTENT_DIR
	? join(process.env.CONTENT_DIR, '..')
	: join(process.cwd(), '..', '..', 'content');

export const load: PageServerLoad = async () => {
	let books = [];
	try {
		const raw = await readFile(join(CONTENT_DIR, 'reading.json'), 'utf-8');
		books = JSON.parse(raw);
		const order: Record<string, number> = { reading: 0, read: 1, want: 2 };
		books.sort((a: { status: string }, b: { status: string }) =>
			(order[a.status] ?? 3) - (order[b.status] ?? 3)
		);
	} catch {
		books = [];
	}
	return { books };
};
