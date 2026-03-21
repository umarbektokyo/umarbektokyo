import { appendFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const LOG_FILE = process.env.LOG_FILE || join(process.cwd(), 'logs', 'wall-of-shame.txt');

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString() || '';
		const password = data.get('password')?.toString() || '';

		const ip =
			request.headers.get('cf-connecting-ip') ||
			request.headers.get('x-forwarded-for') ||
			'unknown';

		const entry = JSON.stringify({
			timestamp: new Date().toISOString(),
			ip,
			username,
			password
		});

		try {
			await mkdir(dirname(LOG_FILE), { recursive: true });
			await appendFile(LOG_FILE, entry + '\n');
		} catch (e) {
			console.error('Failed to write log:', e);
		}

		redirect(303, '/wall-of-shame');
	}
};
