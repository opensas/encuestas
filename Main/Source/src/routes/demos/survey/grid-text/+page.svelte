<script lang="ts">
	import type { GridTextQuestion } from '$lib/types';

	import GridText from '$lib/components/survey/question/GridText.svelte';
	import { Button } from '$lib/components/ui/button';

	let interactiveAnswer = $state<Record<string, string>>({});
	let isValid = $state(true);

	// Sample grid text questions for demos
	const basic: GridTextQuestion = {
		id: 'ques_basic_grid_text',
		type: 'grid-text',
		title: 'Basic Grid Text Question',
		items: [
			{ id: 'name', label: 'Full Name', placeholder: 'Enter your full name', required: true },
			{ id: 'email', label: 'Email', placeholder: 'Enter your email address', required: true },
			{ id: 'phone', label: 'Phone', placeholder: 'Enter your phone number', required: false },
		],
	};

	const mixed: GridTextQuestion = {
		id: 'ques_mixed_controls',
		type: 'grid-text',
		title: 'Mixed Input Controls',
		items: [
			{
				id: 'title',
				label: 'Job Title',
				placeholder: 'e.g., Software Developer',
				control: 'input',
				required: true,
			},
			{
				id: 'description',
				label: 'Job Description',
				placeholder: 'Describe your role and responsibilities...',
				control: 'textarea',
				maxlength: 500,
				required: true,
			},
			{
				id: 'skills',
				label: 'Key Skills',
				placeholder: 'List your main skills...',
				control: 'textarea',
				maxlength: 200,
				required: false,
			},
		],
	};

	const validated: GridTextQuestion = {
		id: 'ques_validated_inputs',
		type: 'grid-text',
		title: 'Validated Inputs',
		items: [
			{
				id: 'age',
				label: 'Age',
				placeholder: '25',
				control: 'input',
				allowedChars: 'numbers',
				maxlength: 3,
				required: true,
			},
			{
				id: 'city',
				label: 'City',
				placeholder: 'Buenos Aires',
				control: 'input',
				allowedChars: 'letters',
				required: true,
			},
			{
				id: 'postal_code',
				label: 'Postal Code',
				placeholder: '1234',
				control: 'input',
				allowedChars: 'numbers',
				maxlength: 4,
				required: false,
			},
		],
	};

	const manyItems: GridTextQuestion = {
		id: 'ques_many_items',
		type: 'grid-text',
		title: 'Many Items (Column Layout)',
		items: Array.from({ length: 15 }, (_, i) => ({
			id: `field${i + 1}`,
			label: `Field ${i + 1}`,
			placeholder: `Enter value for field ${i + 1}`,
			control: 'input' as const,
			required: i < 5, // First 5 are required
		})),
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
	<h1 class="mb-8 text-2xl font-bold">Grid Text Question Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Demo</h2>
			<GridText bind:isValid question={basic} onupdate={handleUpdate} />

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
				<h3 class="mb-4 font-medium">Basic Grid with Required Fields</h3>
				<GridText question={basic} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Mixed Input Controls (Input + Textarea)</h3>
				<GridText question={mixed} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Validated Inputs with Character Restrictions</h3>
				<GridText question={validated} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Many Items with Column Layout</h3>
				<GridText question={manyItems} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Pre-filled Examples</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Grid with Pre-filled Values</h3>
				<GridText
					question={{
						...basic,
						answer: {
							name: 'John Doe',
							email: 'john.doe@example.com',
							phone: '+1234567890',
						},
						title: 'Contact Information (pre-filled)',
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Mixed Controls with Pre-filled Values</h3>
				<GridText
					question={{
						...mixed,
						answer: {
							title: 'Senior Software Developer',
							description:
								'Lead development of web applications using modern frameworks and technologies.',
							skills: 'JavaScript, TypeScript, Svelte, Node.js',
						},
						title: 'Job Information (pre-filled)',
					}}
				/>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">String-based Items (Simplified)</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Simple String Items</h3>
				<GridText
					question={{
						id: 'ques_simple_strings',
						type: 'grid-text',
						title: 'Simple String Items',
						items: ['firstName', 'lastName', 'company', 'position'],
					}}
				/>
			</div>
		</div>
	</div>
</div>
