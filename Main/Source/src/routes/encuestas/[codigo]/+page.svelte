<script lang="ts">
	import type { Answer } from '$lib/types.js';

	import { Survey, type SurveyState } from '$lib/components/survey';

	import { putRespuesta } from '$lib/api/respuesta.js';
	import type { RespuestaEstado } from '$lib/server/services/respuesta';
	import { round } from '$lib/utils/number.js';

	let { data } = $props();

	// let survey = $state(data.survey); // reactive variable
	let { survey, state } = data;

	async function saveState(state: SurveyState) {
		const { status: estado, answers: respuestas, current: preguntaActiva, score: puntaje } = state;

		const result = await putRespuesta({
			respuestaId: data.respuestaId,
			estado,
			respuestas: JSON.stringify(respuestas),
			preguntaActiva,
			puntaje,
		});

		if (!result.ok) console.error(result.error);
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
			survey: updateSurvey(survey, answers),
			answers,
			score,
			current,
			params,
		};

		if (callback) {
			const res = await fetch(callback, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(response),
			});

			// Si el servidor respondió con JSON válido:
			let body: unknown = null;
			const text = await res.text();
			try {
				body = text ? JSON.parse(text) : null;
			} catch {
				body = text;
			}

			// callback output can overwrite redirect
			// Permitir que el callback reemplace el redirect
			if (body && typeof body === 'object' && (body as any).redirect) {
				redirect = (body as any).redirect;
			} else if (typeof body === 'string' && body.startsWith('http')) {
				redirect = body;
			}
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
			// redirect = objeto
			if (typeof redirect === 'object' && (redirect as any).redirect) {
				redirect = (redirect as any).redirect;
			}
			if (typeof redirect === 'string') {
				window.location.href = redirect;
				return;
			}
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

	// actualiza la encuesta con las respuestas
	function updateSurvey(encuesta: typeof survey, answers: Answer[]) {
		for (const answer of answers) {
			const question = encuesta.questions.find((q) => q.id === answer.id);
			if (question) question.answer = answer.answer;
		}
		return encuesta;
	}
</script>

<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<Survey class="max-w-4xl" {state} {survey} {onsave} onskip={saveState} />
</div>
