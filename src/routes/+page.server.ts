import { readFile } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let about = '';
	try {
		about = await readFile(join(process.cwd(), 'static', 'home.md'), 'utf-8');
	} catch {
		about = '';
	}
	return { about };
};
