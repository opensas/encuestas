<script lang="ts">
	import type { TextQuestion } from '$lib/types';

	import { Input, Textarea } from '$lib/components';
	import { Label } from '$lib/components/ui/label';

	type Props = {
		question: TextQuestion;
		onupdate?: (answer: string) => void;
		isValid?: boolean;
	};

	let { question, onupdate = () => {}, isValid = $bindable(true) }: Props = $props();

	let {
		title,
		description,
		placeholder,
		control = 'textarea',
		maxlength,
		allowedChars,
	} = $derived(question);
	let required = $derived(question.required ?? true); // required by default

	let answer = $state(question.answer || '');

	function onchange(answer: string) {
		isValid = !required || (required && answer.length > 0);
		onupdate(answer);
	}

	$effect(() => onchange(answer));
</script>

<div class="grid w-full gap-1.5">
	<Label for="text-question">{title}</Label>
	{#if control === 'textarea'}
		<Textarea id="text-question" bind:value={answer} {allowedChars} {maxlength} {placeholder} />
	{:else if control === 'input'}
		<Input id="text-question" bind:value={answer} {allowedChars} {maxlength} {placeholder} />
	{/if}
	{#if description}
		<p class="text-sm text-muted-foreground">{description}</p>
	{/if}
</div>
