<script lang="ts">
	import { Survey, type SurveyState } from '$lib/components/survey';

	let { data } = $props();

	let { survey } = data;

	const onsave = (state: SurveyState) => console.log(`${survey.code} saved:`, { state });
	const onskip = (state: SurveyState) => console.log(`${survey.code} skipped:`, { state });
</script>

<div class="flex min-h-screen items-center justify-center px-2 sm:px-10">
	<Survey class="max-w-4xl" {survey} {onsave} {onskip} />
</div>
