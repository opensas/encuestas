<script lang="ts">
	import type { TextQuestion } from '$lib/types';

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

	$: onupdate(answer);
</script>

<div class="grid w-full gap-1.5">
	<Label for="text-question">{title}</Label>
	{#if control === 'textarea'}
		<Textarea id="text-question" bind:value={answer} {maxlength} {placeholder} />
	{:else if control === 'input'}
		<Input id="text-question" bind:value={answer} {maxlength} {placeholder} />
	{/if}
	{#if description}
		<p class="text-sm text-muted-foreground">{description}</p>
	{/if}
</div>
