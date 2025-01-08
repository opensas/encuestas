<script lang="ts">
	import type { TextQuestion } from '$lib/types';

	import { isAllowedChar } from '$lib/components/survey/question';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	type Props = {
		question: TextQuestion;
		onupdate?: (answer: string) => void;
		isValid?: boolean;
	};

	let { question, onupdate = () => {}, isValid = $bindable(true) }: Props = $props();

	let { title, description, placeholder, control = 'textarea', maxlength } = $derived(question);
	let required = $derived(question.required ?? true); // required by default

	let answer = $state(question.answer || '');

	function onchange(answer: string) {
		isValid = !required || (required && answer.length > 0);
		onupdate(answer);
	}

	$effect(() => onchange(answer));

	function onkeypress(event: KeyboardEvent) {
		if (!isAllowedChar(event.key, question.allowedChars)) event.preventDefault();
	}
</script>

<div class="grid w-full gap-1.5">
	<Label for="text-question">{title}</Label>
	{#if control === 'textarea'}
		<Textarea id="text-question" bind:value={answer} {maxlength} {placeholder} {onkeypress} />
	{:else if control === 'input'}
		<Input id="text-question" bind:value={answer} {maxlength} {placeholder} {onkeypress} />
	{/if}
	{#if description}
		<p class="text-sm text-muted-foreground">{description}</p>
	{/if}
</div>
