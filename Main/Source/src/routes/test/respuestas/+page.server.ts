import { readRespuestas } from '$lib/server/service/respuesta';

export async function load() {
	const respuestas = await readRespuestas();
	// console.log({ respuestas }, 'server');

	// const respuestas = RESPUESTAS
	return { id: 4, respuestas };
}
