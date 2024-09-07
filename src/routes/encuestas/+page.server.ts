import { DEFAULT_SURVEY } from '$lib/components/survey';

import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(302, `encuestas/${DEFAULT_SURVEY.code}`);
}
