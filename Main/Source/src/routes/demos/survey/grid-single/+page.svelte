<script lang="ts">
	import type { GridSingleQuestion } from '$lib/types';

	import GridSingle from '$lib/components/survey/question/GridSingle.svelte';
	import { Button } from '$lib/components/ui/button';

	let interactiveAnswer = $state<Record<string, string>>({});
	let isValid = $state(true);

	// Sample grid single questions for demos
	const basic: GridSingleQuestion = {
		id: 'ques_basic_grid_single',
		type: 'grid-single',
		title: 'Basic Grid Single Question',
		items: ['Service Quality', 'Response Time', 'Staff Friendliness'],
		options: ['Excellent', 'Good', 'Fair', 'Poor'],
	};

	const withObjects: GridSingleQuestion = {
		id: 'ques_object_items',
		type: 'grid-single',
		title: 'Grid with Object Items and Options',
		items: [
			{ id: 'quality', label: 'Product Quality', required: true },
			{ id: 'price', label: 'Price Value', required: true },
			{ id: 'delivery', label: 'Delivery Speed', required: false },
		],
		options: [
			{ id: 'very_satisfied', label: 'Very Satisfied' },
			{ id: 'satisfied', label: 'Satisfied' },
			{ id: 'neutral', label: 'Neutral' },
			{ id: 'dissatisfied', label: 'Dissatisfied' },
		],
	};

	const withOther: GridSingleQuestion = {
		id: 'ques_with_other',
		type: 'grid-single',
		title: 'Grid with Other Option',
		items: ['Communication Skills', 'Technical Knowledge', 'Problem Solving'],
		options: ['Excellent', 'Good', 'Average', 'Below Average'],
		other: {
			label: 'Other Rating',
			placeholder: 'Specify other rating...',
			maxlength: 50,
		},
	};

	const selectControl: GridSingleQuestion = {
		id: 'ques_select_control',
		type: 'grid-single',
		title: 'Grid with Select Control',
		control: 'select',
		items: [
			{ id: 'breakfast', label: 'Breakfast Quality', required: true },
			{ id: 'lunch', label: 'Lunch Quality', required: true },
			{ id: 'dinner', label: 'Dinner Quality', required: false },
		],
		options: ['Outstanding', 'Very Good', 'Good', 'Fair', 'Poor'],
		other: {
			label: 'Custom Rating',
			placeholder: 'Enter custom rating...',
		},
	};

	const aeptExample: GridSingleQuestion = {
		id: 'ques_aept_example',
		type: 'grid-single',
		title: 'AEPT Survey Example - Access Experience',
		items: [
			'Registro en el Portal Empleo',
			'Búsqueda de la oferta de EPT',
			'Postulación a la oferta de EPT',
		],
		options: ['Buena', 'Regular', 'Mala'],
	};

	const testExample: GridSingleQuestion = {
		id: 'ques_test_example',
		type: 'grid-single',
		title: 'Test Survey Example - Multiple Questions',
		items: [
			{ id: 'pregunta_1', label: 'Primera pregunta', required: true },
			{ id: 'pregunta_2', label: 'Segunda pregunta', required: true },
			{ id: 'pregunta_3', label: 'Tercera pregunta', required: false },
		],
		options: [
			{ id: '1', label: 'Opción 1' },
			{ id: '2', label: 'Opción 2' },
			{ id: '3', label: 'Opción 3' },
			'todas',
			'ninguna',
		],
		other: {
			label: 'otra',
			allowedChars: 'digits',
			maxlength: 3,
		},
	};

	function handleUpdate(answer: Record<string, string>) {
		interactiveAnswer = answer;
		console.log('Answer updated:', answer);
	}

	function resetDemo() {
		interactiveAnswer = {};
		isValid = true;
	}
</script>

<div class="container mx-auto max-w-4xl p-8">
	<h1 class="mb-8 text-2xl font-bold">Grid Single Question Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Demo</h2>
			<GridSingle bind:isValid question={basic} onupdate={handleUpdate} />

			<div class="mt-4 flex gap-2">
				<Button variant="outline" onclick={resetDemo}>Reset</Button>
			</div>

			<div class="mt-4 space-y-2 text-sm text-muted-foreground">
				<p>Current answer: {JSON.stringify(interactiveAnswer, null, 2)}</p>
				<p>Is valid: {isValid ? '✅ Yes' : '❌ No'}</p>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Component Variations</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Basic Grid with String Items</h3>
				<GridSingle question={basic} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Grid with Object Items and Options</h3>
				<GridSingle question={withObjects} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Grid with Other Option</h3>
				<GridSingle question={withOther} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Grid with Select Control</h3>
				<GridSingle question={selectControl} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Real Survey Examples</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">AEPT Survey Example</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Example from the AEPT survey asking about access experience
				</p>
				<GridSingle question={aeptExample} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Test Survey Example</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Example from the test survey with mixed item types and other option
				</p>
				<GridSingle question={testExample} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Pre-filled Examples</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Grid with Pre-filled Values</h3>
				<GridSingle
					question={{
						...basic,
						answer: {
							'Service Quality': 'Excellent',
							'Response Time': 'Good',
							'Staff Friendliness': 'Excellent',
						},
						title: 'Service Evaluation (pre-filled)',
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Grid with Other Option Pre-filled</h3>
				<GridSingle
					question={{
						...withOther,
						answer: {
							'Communication Skills': 'Excellent',
							'Technical Knowledge': 'Custom Rating Value',
							'Problem Solving': 'Good',
						},
						title: 'Skills Assessment (pre-filled with other)',
					}}
				/>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Validation Examples</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Required Fields Validation</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Try submitting without filling required fields to see validation
				</p>
				<GridSingle
					confirmed={true}
					question={{
						...withObjects,
						title: 'Product Evaluation (required fields)',
					}}
				/>
			</div>
		</div>
	</div>
</div>
