<script lang="ts">
	import { Survey } from '$lib/components/survey/index.js';

	export let data;

	$: survey = data.survey;

	function onsave(survey: import('$lib/types').Survey) {
		const respuestas = survey.questions.map((p) => [p.title, p.answer]);
		console.log('!survey saved!', { survey, respuestas });
		const LF = '\r\n\r\n';
		const message = survey.questions
			.map((p) => `${p.title}: ${(p.answer || '').toString()}`)
			.join(LF);
		alert(`Felicitaciones! completaste la encuesta.${LF}${message}`);
	}
</script>

<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<Survey class="max-w-4xl" {survey} {onsave} />
</div>
