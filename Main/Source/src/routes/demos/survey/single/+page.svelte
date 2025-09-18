<script lang="ts">
	import type { SingleQuestion } from '$lib/types';

	import Single from '$lib/components/survey/question/Single.svelte';
	import { Button } from '$lib/components/ui/button';

	let interactiveAnswer = $state('');
	let interactiveScore = $state<number | undefined>(undefined);
	let isValid = $state(true);

	// Sample single questions for demos
	const basic: SingleQuestion = {
		id: 'ques_basic_single',
		type: 'single',
		title: 'Basic Single Question',
		options: [
			{ id: 'option1', label: 'Strongly Disagree' },
			{ id: 'option2', label: 'Disagree' },
			{ id: 'option3', label: 'Neutral' },
			{ id: 'option4', label: 'Agree' },
			{ id: 'option5', label: 'Strongly Agree' },
		],
		required: true,
	};

	const withDescriptions: SingleQuestion = {
		id: 'ques_with_descriptions',
		type: 'single',
		title: 'Options with Descriptions',
		options: [
			{
				id: 'beginner',
				label: 'Beginner',
				description: 'Just starting out, learning the basics',
			},
			{
				id: 'intermediate',
				label: 'Intermediate',
				description: 'Some experience, comfortable with common tasks',
			},
			{
				id: 'advanced',
				label: 'Advanced',
				description: 'Extensive experience, can handle complex scenarios',
			},
			{
				id: 'expert',
				label: 'Expert',
				description: 'Deep expertise, can teach and mentor others',
			},
		],
		required: true,
	};

	const selectDropdown: SingleQuestion = {
		id: 'ques_select',
		type: 'single',
		title: 'Select Dropdown',
		control: 'select',
		options: [
			{ id: 'argentina', label: 'Argentina' },
			{ id: 'brazil', label: 'Brazil' },
			{ id: 'chile', label: 'Chile' },
			{ id: 'ecuador', label: 'Ecuador' },
			{ id: 'peru', label: 'Peru' },
		],
		required: true,
	};

	const withOther: SingleQuestion = {
		id: 'ques_with_other',
		type: 'single',
		title: 'With Other Option',
		options: [
			{ id: 'web', label: 'Web Development' },
			{ id: 'mobile', label: 'Mobile Development' },
			{ id: 'desktop', label: 'Desktop Applications' },
			{ id: 'data', label: 'Data Science' },
		],
		other: true,
		required: true,
	};

	const customOther: SingleQuestion = {
		id: 'ques_custom_other',
		type: 'single',
		title: 'Custom Other Configuration',
		options: [
			{ id: 'email', label: 'Email' },
			{ id: 'phone', label: 'Phone' },
			{ id: 'sms', label: 'SMS' },
		],
		other: {
			label: 'Other method',
			description: 'Please specify your preferred contact method',
			placeholder: 'Enter contact method',
			maxlength: 100,
		},
		required: true,
	};

	const withScoring: SingleQuestion = {
		id: 'ques_with_scoring',
		type: 'single',
		title: 'With Scoring System',
		options: [
			{ id: 'poor', label: 'Poor', score: 0 },
			{ id: 'fair', label: 'Fair', score: 25 },
			{ id: 'good', label: 'Good', score: 50 },
			{ id: 'very_good', label: 'Very Good', score: 75 },
			{ id: 'excellent', label: 'Excellent', score: 100 },
		],
		weight: 1.5,
		required: true,
	};

	const optional: SingleQuestion = {
		id: 'ques_optional',
		type: 'single',
		title: 'Optional Question',
		options: [
			{ id: 'yes', label: 'Yes' },
			{ id: 'no', label: 'No' },
			{ id: 'maybe', label: 'Maybe' },
		],
		required: false,
	};

	const manyOptions: SingleQuestion = {
		id: 'ques_many_options',
		type: 'single',
		title: 'Many Options (Column Layout)',
		options: Array.from({ length: 15 }, (_, i) => ({
			id: `option${i + 1}`,
			label: `Option ${i + 1}`,
		})),
		required: true,
	};

	const stringOptions: SingleQuestion = {
		id: 'ques_string_options',
		type: 'single',
		title: 'Simple String Options',
		options: ['Red', 'Green', 'Blue', 'Yellow', 'Purple'],
		required: true,
	};

	function handleUpdate(answer: string, score?: number) {
		interactiveAnswer = answer;
		interactiveScore = score;
		console.log('Answer updated:', answer, 'Score:', score);
	}

	function resetDemo() {
		interactiveAnswer = '';
		interactiveScore = undefined;
		isValid = true;
	}
</script>

<div class="container mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-2xl font-bold">Single Question Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Demo</h2>
			<Single bind:isValid question={basic} onupdate={handleUpdate} />

			<div class="mt-4 flex gap-2">
				<Button variant="outline" onclick={resetDemo}>Reset</Button>
			</div>

			<div class="mt-4 space-y-2 text-sm text-muted-foreground">
				<p>Current answer: "{interactiveAnswer}"</p>
				<p>Current score: {interactiveScore ?? 'N/A'}</p>
				<p>Is valid: {isValid ? '✅ Yes' : '❌ No'}</p>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Component Variations</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Basic Radio Buttons</h3>
				<Single question={basic} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Options with Descriptions</h3>
				<Single question={withDescriptions} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Select Dropdown</h3>
				<Single question={selectDropdown} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">With Other Option</h3>
				<Single question={withOther} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Custom Other Configuration</h3>
				<Single question={customOther} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Optional Question</h3>
				<Single question={optional} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Simple String Options</h3>
				<Single question={stringOptions} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Many Options (Auto Column Layout)</h3>
				<Single question={manyOptions} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Advanced Features</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">With Scoring System</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Each option has a score value that gets multiplied by the weight (1.5) to calculate the
					final score.
				</p>
				<Single question={withScoring} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Pre-filled Examples</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Pre-selected Option</h3>
				<Single
					question={{
						...basic,
						answer: 'option4',
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Pre-filled Other Option</h3>
				<Single
					question={{
						...withOther,
						answer: 'Game Development',
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Pre-selected with Scoring</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Pre-selected "Very Good" option with score 75. With weight 1.5, the final score is 112.5.
				</p>
				<Single
					question={{
						...withScoring,
						answer: 'very_good',
					}}
				/>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Edge Cases</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Single Option</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Component behavior with only one option available.
				</p>
				<Single
					question={{
						...basic,
						options: [{ id: 'only', label: 'Only Option' }],
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Empty Options Array</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Component behavior with no options (should handle gracefully).
				</p>
				<Single
					question={{
						...basic,
						options: [],
					}}
				/>
			</div>
		</div>
	</div>
</div>
