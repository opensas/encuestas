import type { Answer, Respuesta, Survey } from '$lib/types.js';

import { DEFAULT_SURVEY, surveys } from '$lib/components/survey';
import type { SurveyState } from '$lib/components/survey/Survey.svelte';

import { getRespuesta, getRespuestaById, postRespuesta } from '$lib/api/respuesta';
import { BAD_REQUEST, INTERNAL_ERROR, NOT_FOUND } from '$lib/constants/http.js';

import { error } from '@sveltejs/kit';

export async function load({ params, url, fetch }) {
	const searchParams: Record<string, string> = Object.fromEntries(url.searchParams);

	const { callback, redirect, referencia, respuestaId, ...search } = searchParams;

	let respuesta: Respuesta | null = null;

	// get an existing respuesta by id
	if (respuestaId) {
		const res = await getRespuestaById(Number(respuestaId), fetch);
		if (!res.ok)
			return error(NOT_FOUND, `No se ha encontrado la respuesta con respuestaId '${respuestaId}'`);
		respuesta = res.data;
	}

	// check if there is an existing respuesta with the same referencia
	if (!respuesta && referencia) {
		const res = await getRespuesta({ referencia }, fetch);
		if (res.ok) respuesta = res.data;
	}

	// create a new respuesta
	if (!respuesta) {
		const codigo = params.codigo || DEFAULT_SURVEY.code;

		const survey = surveys.find((e) => e.code === codigo) || null;
		if (!survey) throw error(BAD_REQUEST, `Imposible crear una encuesta del tipo '${codigo}'`);

		const newRespuesta = {
			tipoEncuestaId: survey.id,
			referencia,
			encuesta: JSON.stringify(survey),
			estado: 'creado',
			respuestas: JSON.stringify([]),
		};

		const res = await postRespuesta(newRespuesta, fetch);
		if (!res.ok) {
			console.error(res.error);
			throw error(INTERNAL_ERROR, res.error.title);
		}

		respuesta = res.data;
	}

	if (!respuesta) throw error(INTERNAL_ERROR, 'No se pudo crear o recuperar la respuesta'); // should not reach here

	const survey = JSON.parse(respuesta.encuesta) as Survey;
	const {
		estado: status,
		respuestas: answers,
		preguntaActiva: current,
		puntaje: score,
	} = respuesta;
	const state = {
		status,
		answers: answers ? (JSON.parse(answers) as Answer[]) : undefined,
		current,
		score: score ?? undefined,
	} as SurveyState;

	return {
		respuestaId: respuesta.respuestaId,
		referencia,
		survey,
		state,
		callback,
		redirect,
		params: search,
	};
}
