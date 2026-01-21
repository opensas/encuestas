<script lang="ts">
	import type { MultipleQuestion } from '$lib/types';

	import Multiple from '$lib/components/survey/question/Multiple.svelte';
	import { Button } from '$lib/components/ui/button';

	let interactiveAnswer = $state<string[]>([]);
	let interactiveScore = $state<number | undefined>(undefined);
	let isValid = $state(true);

	// Sample multiple questions for demos
	const basic: MultipleQuestion = {
		id: 'ques_basic_multiple',
		type: 'multiple',
		title: 'Basic Multiple Choice Question',
		options: [
			{ id: 'javascript', label: 'JavaScript' },
			{ id: 'typescript', label: 'TypeScript' },
			{ id: 'python', label: 'Python' },
			{ id: 'java', label: 'Java' },
			{ id: 'c', label: 'C#' },
		],
		required: true,
	};

	const withDescriptions: MultipleQuestion = {
		id: 'ques_with_descriptions',
		type: 'multiple',
		title: 'Skills Assessment (Multiple Selection)',
		options: [
			{
				id: 'frontend',
				label: 'Frontend Development',
				description: 'HTML, CSS, JavaScript, React, Vue, Angular',
			},
			{
				id: 'backend',
				label: 'Backend Development',
				description: 'Server-side programming, APIs, databases',
			},
			{
				id: 'mobile',
				label: 'Mobile Development',
				description: 'iOS, Android, React Native, Flutter',
			},
			{
				id: 'devops',
				label: 'DevOps',
				description: 'CI/CD, Docker, Kubernetes, cloud platforms',
			},
			{
				id: 'design',
				label: 'UI/UX Design',
				description: 'User interface and user experience design',
			},
		],
		required: true,
	};

	const withOther: MultipleQuestion = {
		id: 'ques_with_other',
		type: 'multiple',
		title: 'Preferred Development Tools',
		options: [
			{ id: 'vscode', label: 'Visual Studio Code' },
			{ id: 'sublime', label: 'Sublime Text' },
			{ id: 'atom', label: 'Atom' },
		],
		other: true,
		required: true,
	};

	const customOther: MultipleQuestion = {
		id: 'ques_custom_other',
		type: 'multiple',
		title: 'Communication Preferences',
		options: [
			{ id: 'email', label: 'Email' },
			{ id: 'slack', label: 'Slack' },
			{ id: 'teams', label: 'Microsoft Teams' },
			{ id: 'discord', label: 'Discord' },
		],
		other: {
			label: 'Other platform',
			description: 'Please specify your preferred communication platform',
			placeholder: 'Enter platform name',
			maxlength: 100,
		},
		required: true,
	};

	const withScoring: MultipleQuestion = {
		id: 'ques_with_scoring',
		type: 'multiple',
		title: 'Technology Interests (Weighted Scoring)',
		options: [
			{ id: 'ai', label: 'Artificial Intelligence', score: 100 },
			{ id: 'blockchain', label: 'Blockchain', score: 75 },
			{ id: 'iot', label: 'Internet of Things', score: 50 },
			{ id: 'ar_vr', label: 'AR/VR', score: 60 },
			{ id: 'quantum', label: 'Quantum Computing', score: 90 },
		],
		weight: 1.2,
		required: true,
	};

	const optional: MultipleQuestion = {
		id: 'ques_optional',
		type: 'multiple',
		title: 'Optional Interests',
		options: [
			{ id: 'gaming', label: 'Gaming' },
			{ id: 'music', label: 'Music' },
			{ id: 'sports', label: 'Sports' },
			{ id: 'reading', label: 'Reading' },
		],
		required: false,
	};

	const manyOptions: MultipleQuestion = {
		id: 'ques_many_options',
		type: 'multiple',
		title: 'Programming Languages (Column Layout)',
		options: Array.from({ length: 15 }, (_, i) => ({
			id: `lang${i + 1}`,
			label: [
				'JavaScript',
				'TypeScript',
				'Python',
				'Java',
				'C#',
				'C++',
				'Go',
				'Rust',
				'PHP',
				'Ruby',
				'Swift',
				'Kotlin',
				'Dart',
				'Scala',
				'Clojure',
			][i],
		})),
		required: true,
	};

	const stringOptions: MultipleQuestion = {
		id: 'ques_string_options',
		type: 'multiple',
		title: 'Favorite Colors (Simple String Options)',
		options: ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange'],
		required: true,
	};

	function handleUpdate(answer: string[], score?: number) {
		interactiveAnswer = answer;
		interactiveScore = score;
		console.log('Answer updated:', answer, 'Score:', score);
	}

	function resetDemo() {
		interactiveAnswer = [];
		interactiveScore = undefined;
		isValid = true;
	}
</script>

<div class="container mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-2xl font-bold">Multiple Choice Question Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Demo</h2>
			<Multiple bind:isValid question={basic} onupdate={handleUpdate} />

			<div class="mt-4 flex gap-2">
				<Button variant="outline" onclick={resetDemo}>Reset</Button>
			</div>

			<div class="mt-4 space-y-2 text-sm text-muted-foreground">
				<p>Current answer: [{interactiveAnswer.join(', ')}]</p>
				<p>Current score: {interactiveScore ?? 'N/A'}</p>
				<p>Is valid: {isValid ? '✅ Yes' : '❌ No'}</p>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Component Variations</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Basic Multiple Choice</h3>
				<Multiple question={basic} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Options with Descriptions</h3>
				<Multiple question={withDescriptions} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">With Other Option</h3>
				<Multiple question={withOther} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Custom Other Configuration</h3>
				<Multiple question={customOther} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Optional Question</h3>
				<Multiple question={optional} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Simple String Options</h3>
				<Multiple question={stringOptions} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Many Options (Auto Column Layout)</h3>
				<Multiple question={manyOptions} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Advanced Features</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">With Scoring System</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Each option has a score value that gets multiplied by the weight (1.2) to calculate the
					final score. Multiple selections are combined.
				</p>
				<Multiple question={withScoring} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Pre-filled Examples</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Pre-selected Options</h3>
				<Multiple
					question={{
						...basic,
						answer: ['option2', 'option4'],
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Pre-filled Other Option</h3>
				<Multiple
					question={{
						...withOther,
						answer: ['vscode', 'Custom IDE'],
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Pre-selected with Scoring</h3>
				<p class="mb-4 text-sm text-muted-foreground">
					Pre-selected "AI" (score 100) and "Quantum Computing" (score 90). With weight 1.2, the
					combined score is 228.
				</p>
				<Multiple
					question={{
						...withScoring,
						answer: ['ai', 'quantum'],
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
				<Multiple
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
				<Multiple
					question={{
						...basic,
						options: [],
					}}
				/>
			</div>
		</div>
	</div>
</div>
