import type { Answer, Respuesta, Survey } from '$lib/types.js';

import { DEFAULT_SURVEY, surveys } from '$lib/components/survey';
import type { SurveyState } from '$lib/components/survey/Survey.svelte';

// import { API } from '$lib/api/api.js';
import { getRespuesta, getRespuestaById, postRespuesta } from '$lib/api/respuesta';
import { BAD_REQUEST, INTERNAL_ERROR, NOT_FOUND } from '$lib/constants/http.js';

import { error } from '@sveltejs/kit';

export async function load({ params, url, fetch }) {
	const searchParams: Record<string, string> = Object.fromEntries(url.searchParams);

	const { callback, redirect, referencia, respuestaId, ...search } = searchParams;

	let respuesta: Respuesta | null = null;

	// get an existing respuesta by id
	if (respuestaId) {
		const res = await getRespuestaById(Number(respuestaId), { fetch });

		// const res = await API['respuestas/:id'].get(Number(respuestaId), { fetch });
		if (!res.ok) error(NOT_FOUND, `No se ha encontrado la respuesta con id '${respuestaId}'`);
		respuesta = res.data;
	}

	// check if there is an existing respuesta with the same referencia
	if (!respuesta && referencia) {
		const res = await getRespuesta({ referencia }, { fetch });

		// const res = await API['respuestas'].get({ referencia }, { fetch });
		if (res.ok) respuesta = res.data;
	}

	// create a new respuesta
	if (!respuesta) {
		const codigo = params.codigo || DEFAULT_SURVEY.code;

		const survey = surveys.find((e) => e.code === codigo) || null;
		if (!survey) error(BAD_REQUEST, `No existe una encuesta del tipo '${codigo}'`);

		const newRespuesta = {
			tipoEncuestaId: survey.id,
			referencia,
			encuesta: JSON.stringify(survey),
			estado: 'creado',
			respuestas: JSON.stringify([]),
		};

		// const res = await API['respuestas'].post(newRespuesta, { fetch });
		const res = await postRespuesta(newRespuesta, { fetch });
		if (!res.ok) {
			console.error(res.error);
			error(INTERNAL_ERROR, res.error.title);
		}

		respuesta = res.data;
	}

	if (!respuesta) error(INTERNAL_ERROR, 'No se pudo crear o recuperar la respuesta'); // should not reach here

	const survey = JSON.parse(respuesta.encuesta) as Survey;
	const { estado, respuestas, preguntaActiva, puntaje } = respuesta;
	const state = {
		status: estado,
		answers: respuestas ? (JSON.parse(respuestas) as Answer[]) : undefined,
		current: preguntaActiva,
		score: puntaje ?? undefined,
	} as SurveyState;

	const id = respuesta.respuestaId;
	return { respuestaId: id, referencia, survey, state, callback, redirect, params: search };
}
