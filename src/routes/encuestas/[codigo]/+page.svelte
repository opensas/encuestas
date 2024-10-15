<script lang="ts">
	import { Survey } from '$lib/components/survey/index.js';

	import { configuration } from '$lib/configuration.js';

	export let data;

	$: survey = data.survey;

	function onsave(survey: import('$lib/types').Survey) {
		const respuestas = survey.questions.map((p) => [p.title, p.answer]);
		save(survey.id, respuestas);
		console.log('!survey saved!', { survey, respuestas });
		const LF = '\r\n\r\n';
		const message = survey.questions.map((p) => `${p.title}: ${toString(p.answer)}`).join(LF);
		alert(`Felicitaciones! completaste la encuesta.${LF}${message}`);
	}

	function toString(value: unknown) {
		if (value === null || value == undefined) return '';
		if (Array.isArray(value)) return value.map((item) => item.toString()).join(', ');
		if (typeof value === 'object') {
			return Object.entries(value)
				.map(([key, value]) => `${key}: ${value.toString()}`)
				.join(', ');
		}
		return value.toString();
	}

	const save = async (surveyId: string, answers: any): Promise<any> => {
		// const _post = async (path: string, body?: BodyParams, options?: RequestInit): Promise<any> => {
		const body = { surveyId, answers: JSON.stringify(answers) };

		const url = new URL(configuration.apiUrl);
		url.pathname = '/api/answer';

		let opt: RequestInit = {
			method: 'POST',
			credentials: 'include',
			headers: new Headers({ 'content-type': 'application/json' }),
			body: JSON.stringify(body || {}),
		};

		const response = await fetch(url, opt);

		if (response.status >= 400) {
			const err = await response.json();
			console.log(`POST - ${url.href}: `, err.error);
			throw err.error;
		}

		const json = await response.json();

		if (json.error) throw json;

		return json;
	};
</script>

<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<Survey class="max-w-4xl" {survey} {onsave} />
</div>
