import { DEFAULT_CODIGO_ENCUESTA } from '$lib/components/encuesta';

import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(302, `encuestas/${DEFAULT_CODIGO_ENCUESTA}`);
}