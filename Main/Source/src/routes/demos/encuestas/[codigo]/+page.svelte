<script lang="ts">
	import { Survey, type SurveyState } from '$lib/components/survey';

	let { data } = $props();

	let { survey } = $derived(data);

	const onsave = (state: SurveyState) => console.log(`${survey.code} onsave called:`, { state });
	const onskip = (state: SurveyState) => console.log(`${survey.code} onskip called:`, { state });
</script>

<div class="flex min-h-screen items-center justify-center px-2 sm:px-10">
	<Survey class="max-w-4xl" {survey} {onsave} {onskip} />
</div>
