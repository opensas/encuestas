<script lang="ts">
	import type { TextQuestion } from '$lib/types';

	import Text from '$lib/components/survey/question/Text.svelte';
	import { Button } from '$lib/components/ui/button';

	let interactiveAnswer = $state('');
	let isValid = $state(true);

	// Sample text questions for demos
	const basic: TextQuestion = {
		id: 'ques_basic_text',
		type: 'text',
		title: 'Basic Text Question',
		label: 'What is your name?',
		placeholder: 'Enter your full name',
		control: 'input',
		required: true,
	};

	const textarea: TextQuestion = {
		id: 'ques_textarea',
		type: 'text',
		title: 'Textarea Question',
		label: 'Tell us about yourself',
		description: 'Please provide a brief description about your background and interests.',
		placeholder: 'Write your response here...',
		control: 'textarea',
		maxlength: 500,
		required: true,
	};

	const optional: TextQuestion = {
		id: 'ques_optional',
		type: 'text',
		title: 'Optional Question',
		label: 'Additional comments (optional)',
		placeholder: 'Any additional feedback?',
		control: 'textarea',
		required: false,
	};

	const numbersOnly: TextQuestion = {
		id: 'ques_numbers',
		type: 'text',
		title: 'Numbers Only',
		label: 'Enter your phone number',
		placeholder: '1234567890',
		control: 'input',
		allowedChars: 'numbers',
		maxlength: 10,
		required: true,
	};

	const lettersOnly: TextQuestion = {
		id: 'ques_letters',
		type: 'text',
		title: 'Letters Only',
		label: 'Enter your city name',
		placeholder: 'Buenos Aires',
		control: 'input',
		allowedChars: 'letters',
		required: true,
	};

	function handleUpdate(answer: string) {
		interactiveAnswer = answer;
		console.log('Answer updated:', answer);
	}

	function resetDemo() {
		interactiveAnswer = '';
		isValid = true;
	}
</script>

<div class="container mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-2xl font-bold">Text Question Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Demo</h2>
			<Text bind:isValid question={basic} onupdate={handleUpdate} />

			<div class="mt-4 flex gap-2">
				<Button variant="outline" onclick={resetDemo}>Reset</Button>
			</div>

			<div class="mt-4 space-y-2 text-sm text-muted-foreground">
				<p>Current answer: "{interactiveAnswer}"</p>
				<p>Is valid: {isValid ? '✅ Yes' : '❌ No'}</p>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Component Variations</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Basic Input Field</h3>
				<Text question={basic} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Textarea with Description and Max Length</h3>
				<Text question={textarea} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Optional Field</h3>
				<Text question={optional} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Numbers Only Input</h3>
				<Text question={numbersOnly} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Letters Only Input</h3>
				<Text question={lettersOnly} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Pre-filled Examples</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Input with Pre-filled Value</h3>
				<Text
					question={{
						...basic,
						answer: 'John Doe',
						label: 'Your name (pre-filled)',
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Textarea with Pre-filled Value</h3>
				<Text
					question={{
						...textarea,
						answer: 'I am a software developer with 5 years of experience in web development.',
						label: 'About you (pre-filled)',
					}}
				/>
			</div>
		</div>
	</div>
</div>
