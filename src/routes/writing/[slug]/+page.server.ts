import { getPostBySlug } from '$lib/server/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPostBySlug(params.slug);
	if (!post) {
		error(404, 'Post not found');
	}
	return { meta: post.meta, body: post.body };
};
