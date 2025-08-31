import { readRespuestaById } from '$lib/server/services/respuesta';

import { fail } from '@sveltejs/kit';

export async function load({ params }) {
	if (!params.id) return fail(400, { message: 'missing respuesta id' });

	const id = parseFloat(params.id);

	if (isNaN(id)) return fail(400, { message: 'incorrect respuesta id' });

	const respuesta = await readRespuestaById(id);

	if (!respuesta) return fail(404, { message: 'respuesta not found' });

	return { respuesta };
}
