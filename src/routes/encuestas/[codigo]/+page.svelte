<script lang="ts">
	import { Survey } from '$lib/components/survey';

	import { round } from '$lib/utils/number.js';

	let { data } = $props();

	let survey = $state(data.survey); // reactive variable

	async function onsave(survey: import('$lib/types').Survey) {
		const { callback, redirect, reference, params } = data;

		const response = { survey, reference, params };

		if (callback) {
			const res = await fetch(callback, {
				method: 'POST',
				body: JSON.stringify(response),
			});
			const body = await res.json();
			console.log(`test !!! returned body from ${callback}:`, { body });
		}

		// called from a popup
		if (window.opener) {
			window.opener.postMessage(response, '*');
			window.close();
			return;
		}

		// called from a redirect
		// #TODO: send via querystring the reference, params, and the id of the new answer
		if (redirect) {
			window.location.href = redirect;
			return;
		}

		const answers = survey.questions.map((p) => [p.id, p.answer]);
		console.log('!survey saved!', { survey, respuestas: answers });
		const LF = '\r\n\r\n';

		let score: undefined | number = undefined;
		let message = survey.questions
			.map((question) => {
				let text = `${question.id}: ${toString(question.answer)}`;
				if ('score' in question) {
					score = (score ?? 0) + (question.score || 0);
					text += ` (puntaje: ${question.score})`;
				}
				return text;
			})
			.join(LF);
		if (score !== undefined) {
			message += `${LF}puntaje: ${round(score, 8)}`;
		}

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
</script>

<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<Survey class="max-w-4xl" {survey} {onsave} />
</div>
