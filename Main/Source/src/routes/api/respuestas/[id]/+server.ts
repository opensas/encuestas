import { BAD_REQUEST, NOT_FOUND } from '$lib/constants/http.js';
import {
	readRespuestaById,
	type UpdateRespuesta,
	updateRespuesta,
} from '$lib/server/services/respuesta';
import { jsonApi, jsonError } from '$lib/utils/api';

import { json, type RequestHandler } from '@sveltejs/kit';

export async function GET({ params }) {
	const id = Number(params.id);
	if (isNaN(id)) return jsonError('El campo respuestaId debe ser un número', BAD_REQUEST);

	const respuesta = await readRespuestaById(id);
	if (!respuesta) return jsonError('Respuesta no encontrada', NOT_FOUND);

	return json(respuesta);
}

export const PUT: RequestHandler = async ({ params, request }) => {
	try {
		const id = Number(params.id);
		if (isNaN(id)) return jsonError('El campo respuestaId debe ser un número', BAD_REQUEST);

		const data = (await request.json()) as UpdateRespuesta;
		const result = await updateRespuesta(id, data);

		return jsonApi(result);
	} catch (err) {
		return jsonError('Error actualizando la respuesta:', { err });
	}
};
