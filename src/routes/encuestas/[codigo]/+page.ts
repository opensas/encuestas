import { DEFAULT_SURVEY, surveys } from '$lib/components/survey';

import { redirect as redirectFn } from '@sveltejs/kit';

export async function load({ params, url }) {
	const survey = surveys.find((e) => e.code === params.codigo);

	if (!survey) {
		url.pathname = `/encuestas/${DEFAULT_SURVEY.code}`;
		throw redirectFn(302, url);
	}

	const searchParams: Record<string, string> = Object.fromEntries(url.searchParams);

	const { callback, redirect, reference, ...search } = searchParams;

	return { survey, callback, redirect, reference, params: search };
}
