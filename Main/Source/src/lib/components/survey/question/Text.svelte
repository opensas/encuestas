<script lang="ts">
	import type { TextQuestion } from '$lib/types';

	import { isAllowedChar } from '$lib/components/survey/question';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	export let question: TextQuestion;
	export let onupdate: (answer: string) => void = () => {};
	export let isValid = true;

	let answer = question.answer || '';

	$: ({ title, description, placeholder, control = 'textarea', maxlength } = question);

	$: required = question.required ?? true;
	$: isValid = !required || (required && !!answer);

	function keypress(event: KeyboardEvent) {
		if (!isAllowedChar(event.key, question.allowedChars)) event.preventDefault();
	}

	$: onupdate(answer);
</script>

<div class="grid w-full gap-1.5">
	<Label for="text-question">{title}</Label>
	{#if control === 'textarea'}
		<Textarea
			id="text-question"
			bind:value={answer}
			{maxlength}
			{placeholder}
			on:keypress={keypress}
		/>
	{:else if control === 'input'}
		<Input
			id="text-question"
			bind:value={answer}
			{maxlength}
			{placeholder}
			on:keypress={keypress}
		/>
	{/if}
	{#if description}
		<p class="text-sm text-muted-foreground">{description}</p>
	{/if}
</div>
