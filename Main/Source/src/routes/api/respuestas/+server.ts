// src/routes/api/respuestas/+server.ts
import { CREATED } from '$lib/constants/http';
import {
	countRespuestas,
	type CreateRespuesta,
	createRespuesta,
	readRespuestas,
} from '$lib/server/services/respuesta';
import { jsonApi, jsonError, jsonQuery, parseUrlQuery } from '$lib/utils/api';

export const GET = async ({ url }) => {
	try {
		const query = parseUrlQuery(url);
		const [data, total] = await Promise.all([readRespuestas(query), countRespuestas(query)]);

		return jsonQuery(query, data, total);
	} catch (err) {
		return jsonError('No se pudieron obtener las respuestas', { err });
	}
};

export const POST = async ({ request }) => {
	try {
		const data = (await request.json()) as CreateRespuesta;
		const result = await createRespuesta(data);

		return jsonApi(result, CREATED);
	} catch (err) {
		return jsonError('No se pudo crear la respuesta', { err });
	}
};
