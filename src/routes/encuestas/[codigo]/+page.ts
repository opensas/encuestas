import { DEFAULT_SURVEY, surveys } from '$lib/components/survey';

import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const survey = surveys.find((e) => e.code === params.codigo);

	if (!survey) throw redirect(302, `/surveys/${DEFAULT_SURVEY.code}`);

	return { survey };
}
