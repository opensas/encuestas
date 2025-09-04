import { loadEnv } from '$lib/server/env';

import type { Handle } from '@sveltejs/kit';

loadEnv();

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		filterSerializedResponseHeaders: (name) => name.toLowerCase() === 'content-type',
	});

	return response;
};
