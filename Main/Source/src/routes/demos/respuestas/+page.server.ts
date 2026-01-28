import { DEFAULT_PAGE_LIMIT } from '$lib/constants/app.js';
import { readRespuestas } from '$lib/server/services/respuesta';

export async function load({ url }) {
	const page = parse(url, 'page');
	const limit = parse(url, 'limit', DEFAULT_PAGE_LIMIT);

	const respuestas = await readRespuestas({ page, limit, order: 'respuestaId' });

	return { respuestas, page, limit };
}

function parse(url: URL, key: string, def = 1) {
	const value = url.searchParams.get(key);
	return value ? Number(value) : def;
}
