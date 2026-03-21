import { readFile } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';

const LOG_FILE = process.env.LOG_FILE || join(process.cwd(), 'logs', 'wall-of-shame.txt');

interface LogEntry {
	timestamp: string;
	ip: string;
	username: string;
	password: string;
}

export const load: PageServerLoad = async () => {
	let entries: LogEntry[] = [];
	try {
		const raw = await readFile(LOG_FILE, 'utf-8');
		entries = raw
			.trim()
			.split('\n')
			.filter(Boolean)
			.map((line) => JSON.parse(line))
			.reverse();
	} catch {
		entries = [];
	}
	return { entries };
};
