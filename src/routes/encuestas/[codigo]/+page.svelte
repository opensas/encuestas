<script lang="ts">
	import { Survey } from '$lib/components/survey/index.js';

	export let data;

	$: survey = data.survey;

	function onsave(survey: import('$lib/types').Survey) {
		const respuestas = survey.questions.map((p) => [p.title, p.answer]);
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
</script>

<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<Survey class="max-w-4xl" {survey} {onsave} />
</div>
