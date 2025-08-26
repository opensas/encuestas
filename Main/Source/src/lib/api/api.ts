import { getRespuesta, getRespuestaById, postRespuesta, putRespuesta } from '$lib/api/respuesta';

export const API = {
	respuestas: {
		get: getRespuesta,
		post: postRespuesta,
	},
	'respuestas/:id': {
		get: getRespuestaById,
		put: putRespuesta,
	},
};
