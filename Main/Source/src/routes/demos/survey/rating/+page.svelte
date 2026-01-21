<script lang="ts">
	import type { RatingQuestion } from '$lib/types';

	import Rating from '$lib/components/survey/question/Rating.svelte';
	import { Button } from '$lib/components/ui/button';

	let interactiveAnswer = $state(0);
	let interactiveScore = $state<number | undefined>(undefined);
	let isValid = $state(true);

	// Sample rating questions for demos
	const basic: RatingQuestion = {
		id: 'ques_basic_rating',
		type: 'rating',
		title: 'Basic Rating Question',
		required: true,
		min: 0,
		max: 10,
	};

	const customRange: RatingQuestion = {
		id: 'ques_custom_range',
		type: 'rating',
		title: 'Custom Range Rating',
		required: true,
		min: 1,
		max: 5,
	};

	const negativeRange: RatingQuestion = {
		id: 'ques_negative_range',
		type: 'rating',
		title: 'Negative to Positive Range',
		required: true,
		min: -5,
		max: 5,
	};

	const optional: RatingQuestion = {
		id: 'ques_optional',
		type: 'rating',
		title: 'Optional Rating',
		required: false,
		min: 0,
		max: 10,
	};

	const withScoring: RatingQuestion = {
		id: 'ques_with_scoring',
		type: 'rating',
		title: 'Rating with Scoring System',
		required: true,
		min: 1,
		max: 5,
		weight: 2.5,
		scores: [
			{ value: 1, score: 0 },
			{ value: 2, score: 25 },
			{ value: 3, score: 50 },
			{ value: 4, score: 75 },
			{ value: 5, score: 100 },
		],
	};

	const largeRange: RatingQuestion = {
		id: 'ques_large_range',
		type: 'rating',
		title: 'Large Range Rating',
		required: true,
		min: 0,
		max: 100,
	};

	function handleUpdate(answer: number, score?: number) {
		interactiveAnswer = answer;
		interactiveScore = score;
		console.log('Answer updated:', answer, 'Score:', score);
	}

	function resetDemo() {
		interactiveAnswer = 0;
		interactiveScore = undefined;
		isValid = true;
	}
</script>

<div class="container mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-2xl font-bold">Rating Question Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Demo</h2>
			<Rating bind:isValid question={basic} onupdate={handleUpdate} />

			<div class="mt-4 flex gap-2">
				<Button variant="outline" onclick={resetDemo}>Reset</Button>
			</div>

			<div class="mt-4 space-y-2 text-sm text-muted-foreground">
				<p>Current answer: {interactiveAnswer}</p>
				<p>Current score: {interactiveScore ?? 'N/A'}</p>
				<p>Is valid: {isValid ? '✅ Yes' : '❌ No'}</p>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Component Variations</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Basic Rating (0-10)</h3>
				<Rating question={basic} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Custom Range (1-5)</h3>
				<Rating question={customRange} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Negative to Positive Range (-5 to 5)</h3>
				<Rating question={negativeRange} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Optional Rating</h3>
				<Rating question={optional} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Large Range (0-100)</h3>
				<Rating question={largeRange} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Advanced Features</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Rating with Scoring System</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					This rating includes a weighted scoring system. Each rating value has an associated score
					that gets multiplied by the weight (2.5).
				</p>
				<Rating question={withScoring} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Pre-filled Examples</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Rating with Pre-filled Value (7/10)</h3>
				<Rating
					question={{
						...basic,
						answer: 7,
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Custom Range with Pre-filled Value (4/5)</h3>
				<Rating
					question={{
						...customRange,
						answer: 4,
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Scoring System with Pre-filled Value</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Pre-filled with value 4, which has a score of 75. With weight 2.5, the final score is
					187.5.
				</p>
				<Rating
					question={{
						...withScoring,
						answer: 4,
					}}
				/>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Edge Cases</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Single Value Range (5-5)</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Both buttons should be disabled when min equals max.
				</p>
				<Rating
					question={{
						...basic,
						min: 5,
						max: 5,
						answer: 5,
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Default Range (no min/max specified)</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Should default to 0-10 range when min/max are not specified.
				</p>
				<Rating
					question={{
						id: 'ques_default_range',
						type: 'rating',
						title: 'Default Range',
						required: true,
					}}
				/>
			</div>
		</div>
	</div>
</div>
