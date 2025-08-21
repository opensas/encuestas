import type { Respuesta } from '$lib/types';

import type { CreateRespuesta, UpdateRespuesta } from '$lib/server/service/respuesta';
import { type FetchFn, type QueryResponse, toQueryString } from '$lib/utils/api';
import { toAppError } from '$lib/utils/errors';
import { omit } from '$lib/utils/object';
import { err, ok } from '$lib/utils/result';

export async function getRespuestaById(id: number, fetchFn: FetchFn = fetch) {
	const res = await fetchFn(`/api/respuestas/${id}`);
	if (!res.ok) return err(`No se ha encontrado la respuesta con id '${id}'`);

	return ok((await res.json()) as Respuesta);
}

export async function getRespuesta(
	condition: Record<string, string> = {},
	fetchFn: FetchFn = fetch
) {
	const res = await fetchFn(`/api/respuestas?${toQueryString(condition)}`);
	if (!res.ok) return err(`No se ha encontrado el registro: ${res.statusText}`);

	const query = (await res.json()) as QueryResponse<Respuesta>;
	if (query.data.length === 0) return err('No se ha encontrado el registro');

	return ok(query.data[0]);
}

export async function postRespuesta(respuesta: CreateRespuesta, fetchFn: FetchFn = fetch) {
	const response = await fetchFn('/api/respuestas', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(respuesta),
	});
	const result = await response.json();
	if (!response.ok) return err(toAppError(result));
	return ok(result as Respuesta);
	// const result = await api.post<Respuesta>('/api/respuestas', respuesta, { fetchFN: fetchFn });
	// if (!result.ok) return err(toAppError(result.error));

	// return result
}

type UpdateRespuestaWithId = Pick<Respuesta, 'respuestaId'> & UpdateRespuesta;

export async function putRespuesta(
	respuesta: UpdateRespuestaWithId,
	fetchFn: typeof fetch = fetch
) {
	const data = omit(respuesta, 'respuestaId');
	const res = await fetchFn(`/api/respuestas/${respuesta.respuestaId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	const result = await res.json();

	if (!res.ok) return err(toAppError(result));

	return ok(result as Respuesta);
}
