<script lang="ts">
	import type { Answer } from '$lib/types.js';

	import Survey, { type SurveyState } from '$lib/components/survey/Survey.svelte';

	import { putRespuesta } from '$lib/api/respuesta.js';
	import type { RespuestaEstado } from '$lib/server/service/respuesta';
	import { round } from '$lib/utils/number.js';

	let { data } = $props();

	// let survey = $state(data.survey); // reactive variable
	let { survey, state } = data;

	async function saveState(state: SurveyState) {
		const { status: estado, answers: respuestas, current: preguntaActiva, score: puntaje } = state;

		await putRespuesta({
			respuestaId: data.respuestaId,
			estado,
			respuestas: JSON.stringify(respuestas),
			preguntaActiva,
			puntaje,
		});
	}

	async function onsave(state: SurveyState) {
		// update data
		await saveState(state);
		const { answers, score, status, current } = state;
		const { callback, survey, respuestaId, referencia, params } = data;
		let { redirect } = data;

		const response = {
			respuestaId,
			referencia,
			status,
			survey,
			answers,
			score,
			current,
			params,
		};

		if (callback) {
			const res = await fetch(callback, {
				method: 'POST',
				body: JSON.stringify(response),
			});

			const body = await res.json();

			// callback output can overwrite redirect
			if (body.redirect) redirect = body;
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

		message(answers, status); // debug
	}

	function message(answers: Answer[], estado: RespuestaEstado) {
		const respuestas = survey.questions.map((p) => [p.id, p.answer]);
		console.log('!encuesta finalizada!', { estado, respuestas });
		const LF = '\r\n\r\n';

		let score: undefined | number = undefined;
		let message = answers
			.map((answer) => {
				let text = `${answer.id}: ${toString(answer.answer)}`;
				if ('score' in answer) {
					score = (score ?? 0) + (answer.score || 0);
					text += ` (puntaje: ${answer.score})`;
				}
				return text;
			})
			.join(LF);

		if (score !== undefined) message += `${LF}puntaje: ${round(score, 4)}`;

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
	<Survey class="max-w-4xl" {state} {survey} {onsave} onskip={saveState} />
</div>
