import type { Respuesta } from '$lib/types';

import type { CreateRespuesta, UpdateRespuesta } from '$lib/server/service/respuesta';
import { getFirst, http, type HttpOptions } from '$lib/utils/api';

export async function getRespuestaById(id: Respuesta['respuestaId'], opt: HttpOptions) {
	return await http.get<Respuesta>(`/api/respuestas/${id}`, opt);
}

export async function getRespuesta(condition: Record<string, string> = {}, opt: HttpOptions) {
	return await getFirst<Respuesta>('/api/respuestas', condition, opt);
}

export async function postRespuesta(newRespuesta: CreateRespuesta, opt: HttpOptions) {
	return await http.post<Respuesta>(`/api/respuestas`, newRespuesta, opt);
}

type UpdateRespuestaWithId = Pick<Respuesta, 'respuestaId'> & UpdateRespuesta;

export async function putRespuesta(respuesta: UpdateRespuestaWithId, opt: HttpOptions = {}) {
	const { respuestaId: id, ...body } = respuesta;
	return await http.put<Respuesta>(`/api/respuestas/${id}`, body, opt);
}
