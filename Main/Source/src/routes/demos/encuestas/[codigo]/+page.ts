import { DEFAULT_SURVEY, surveys } from '$lib/components/survey';

import { BAD_REQUEST } from '$lib/constants/http.js';

import { error } from '@sveltejs/kit';

import { surveyNoIntro, surveyTestUI, surveyWithIntro, surveyWithProgressBar } from '../extra';

const samples = [...surveys, surveyWithIntro, surveyNoIntro, surveyWithProgressBar, surveyTestUI];

export async function load({ params }) {
	const codigo = params.codigo || DEFAULT_SURVEY.code;

	const survey = samples.find((e) => e.code === codigo) || null;
	if (!survey) error(BAD_REQUEST, `No existe una encuesta del tipo '${codigo}'`);

	return { survey };
}
