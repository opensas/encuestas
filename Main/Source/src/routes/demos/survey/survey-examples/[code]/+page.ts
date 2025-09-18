import { NOT_FOUND } from '$lib/constants/http.js';

import { error } from '@sveltejs/kit';

import { samples } from '../index.js';

export async function load({ params }) {
	const code = params.code;

	const survey = samples.find((survey) => survey.code === code) || null;

	if (!survey) error(NOT_FOUND, `No se ha encontrado la encuesta con código '${code}'`);

	return { survey };
}
