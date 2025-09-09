<script lang="ts">
	import { Survey, type SurveyState } from '$lib/components/survey';
	import { survey_short } from '$lib/components/survey/samples/test';

	import { log } from '$lib/utils/utils.svelte';

	const onsave = (surveyState: SurveyState) => console.log('onsave', { surveyState });
	const onskip = (surveyState: SurveyState) => log('onskip!', { surveyState });

	const survey = survey_short;

	const state = {
		status: 'en proceso',
		answers: [
			{
				id: 'ques_grid_text',
				answer: {
					nombre: 'state',
					apellido: 'state',
					direccion: 'state',
				},
			},
			{
				id: 'ques_text',
				answer: 'state!',
			},
		],
		current: 'ques_grid_single',
		score: 0,
	} satisfies SurveyState;
</script>

<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<Survey class="max-w-4xl" {state} {survey} {onsave} {onskip} />
</div>
