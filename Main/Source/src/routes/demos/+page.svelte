<script lang="ts">
	import DemosCard from './DemosCard.svelte';

	const demos = [
		{
			name: 'Components',
			href: '/demos/components',
			description:
				'UI components including combobox, progress indicators, and other interactive elements',
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
