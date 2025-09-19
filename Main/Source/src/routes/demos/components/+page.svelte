<script lang="ts">
	import DemosCard from '../DemosCard.svelte';

	const demos = [
		{
			name: 'Button',
			href: '/demos/components/button',
			description:
				'Custom button wrapper with enhanced sizing - taller buttons for better usability',
		},
		{
			name: 'ComboBox',
			href: '/demos/components/combobox',
			description:
				'Interactive combobox component with search, filtering, and selection capabilities',
		},
		{
			name: 'Input',
			href: '/demos/components/input',
			description:
				'Enhanced input wrapper with character filtering and consistent height for better usability',
		},
		{
			name: 'Progress',
			href: '/demos/components/progress',
			description: 'Progress indicator component with customizable styles and animation options',
		},
		{
			name: 'Textarea',
			href: '/demos/components/textarea',
			description:
				'Enhanced textarea wrapper with character filtering and improved min-height for better usability',
		},
	] as const;
</script>

<div class="container mx-auto max-w-2xl p-8">
	<DemosCard
		{demos}
		description="Explore different UI components and their interactive demonstrations."
		title="Component Demos"
	/>
</div>
