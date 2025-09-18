<script lang="ts">
	import DemosCard from './DemosCard.svelte';

	const demos = [
		{
			name: 'Combobox',
			href: '/demos/combobox',
			description: 'Searchable dropdown with autocomplete functionality and API integration',
		},
		{
			name: 'Progress',
			href: '/demos/progress',
			description: 'Visual progress indicators and loading states for user feedback',
		},
		{
			name: 'Respuestas',
			href: '/demos/respuestas',
			description: 'Response management system for survey data collection and analysis',
		},
		{ name: 'separator_1', type: 'separator' },
		{
			name: 'Survey',
			href: '/demos/survey',
			description:
				'Survey components including complete forms, text inputs, single choice, and rating questions',
		},
	] as const;
</script>

<div class="container mx-auto max-w-2xl p-8">
	<DemosCard {demos} title="Demos" />
</div>
