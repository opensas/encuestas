import { DEFAULT_SURVEY, surveys } from '$lib/components/survey';
import { configuration } from '$lib/configuration.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	// const survey = surveys.find((e) => e.code === params.codigo);
	// const survey = await getSurveys(fetch, `/api/survey/enc_00000008`)
	const survey = await getSurveys(fetch, `/api/survey/${params.codigo}`);

	if (!survey) throw redirect(302, `/surveys/${DEFAULT_SURVEY.code}`);

	return { survey };
}

const getSurveys = async (fetch: any, path: string): Promise<any> => {
	const url = new URL(configuration.apiUrl);
	url.pathname = path;

	let opt: RequestInit = {
		method: 'GET',
		headers: new Headers({ 'content-type': 'application/json' }),
	};

	const response = await fetch(url, opt);

	if (response.status >= 400) {
		const err = await response.json();
		console.log(`POST - ${path}: `, err.error);
		throw err.error;
	}

	const json = await response.json();

	if (json.error) throw json;

	return json;
};
