import { readFile } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let projects = [];
	try {
		const raw = await readFile(join(process.cwd(), 'static', 'projects', 'projects.json'), 'utf-8');
		projects = JSON.parse(raw);
	} catch {
		projects = [];
	}
	return { projects };
};
