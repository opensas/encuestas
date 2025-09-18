<script lang="ts">
	import DemosCard from '../DemosCard.svelte';

	const demos = [
		{
			name: 'Survey Examples',
			href: '/demos/survey/survey-examples',
			description:
				'Complete survey examples organized by type - test real surveys, custom demos, and feature showcases',
		},
		{
			name: 'Text Questions',
			href: '/demos/survey/text',
			description: 'Text input components with validation, character filtering, and formatting',
		},
		{
			name: 'Single Choice',
			href: '/demos/survey/single',
			description: 'Single-choice question component with radio buttons and dropdown options',
		},
		{
			name: 'Multiple Choice',
			href: '/demos/survey/multiple',
			description: 'Multiple-choice question component with checkboxes and multi-selection options',
		},
		{
			name: 'Rating Questions',
			href: '/demos/survey/rating',
			description: 'Interactive rating component with customizable scales and scoring systems',
		},
		{
			name: 'Grid Text Questions',
			href: '/demos/survey/grid-text',
			description: 'Grid-based text input component for collecting multiple related text fields',
		},
		{
			name: 'Grid API Questions',
			href: '/demos/survey/grid-api',
			description:
				'Dynamic grid component that loads options from API endpoints with dependency chains',
		},
	] as const;
</script>

<div class="container mx-auto max-w-2xl p-8">
	<DemosCard
		{demos}
		description="Explore different survey components and question types used in the survey system."
		title="Survey Demos"
	/>
</div>
