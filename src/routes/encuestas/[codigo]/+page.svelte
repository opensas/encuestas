<script lang="ts">
	import { Survey } from '$lib/components/survey/index.js';

	export let data;

	$: survey = data.survey;

	function onsave(survey: import('$lib/types').Survey) {
		console.log('!survey saved!', { survey });
		const LF = '\r\n\r\n';
		const respuestas = survey.questions
			.map((p) => `${p.title}: ${(p.answer || '').toString()}`)
			.join(LF);
		alert(`Felicitaciones! completaste la encuesta.${LF}${respuestas}`);
	}
</script>

<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<Survey class="max-w-4xl" {survey} {onsave} />
</div>
