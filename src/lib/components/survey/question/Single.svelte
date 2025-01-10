<script lang="ts">
	import type { SingleQuestion } from '$lib/types';

	import { Input, Select } from '$lib/components';
	import { toOption } from '$lib/components/survey';
	import { Label } from '$lib/components/ui/label';
	import * as Radio from '$lib/components/ui/radio-group';

	type Props = {
		question: SingleQuestion;
		onupdate?: (answer: string) => void;
		isValid?: boolean;
	};

	let { question, onupdate = () => {}, isValid = $bindable(true) }: Props = $props();

	let options = $derived(question.options.map(toOption));
	let required = $derived(question.required ?? true); // required by default

	let checked = $state('');

	const OTHER_VALUE = '__OTHER__';
	let other = $state('');

	// init checked from answer
	function initState() {
		checked = question.answer || '';

		// check is it's an other option
		const answer = question.answer || '';
		if (!answer) {
			checked = '';
		} else if (options.find((option) => option.id === answer)) {
			checked = answer;
		} else {
			checked = OTHER_VALUE;
			other = answer;
		}
	}

	initState();

	function onchange(checked: string) {
		const answer = checked === OTHER_VALUE ? other : checked;

		isValid = !required || (required && answer.length > 0);

		onupdate(answer);
	}

	$effect(() => onchange(checked));
</script>

<Radio.Root bind:value={checked} class="gap-0 space-y-4">
	{#if (question?.control || 'radio') === 'radio'}
		<div
			class="grid gap-x-2 gap-y-4"
			class:lg:columns-3={options.length >= 12}
			class:md:columns-2={options.length >= 8}
		>
			{#each options as { id, label, description }, index}
				{@const idx = `opcion_${index}`}
				<div class="flex items-center space-x-3">
					<!-- mt-1 compensates for the leading-snug, to have both aligned to the top -->
					<Radio.Item id={idx} value={id} class="mt-1 self-start" />
					<Label class="flex flex-col space-y-1 leading-snug" for={idx}>
						<div>{label}</div>
						{#if description}
							<div class="text-xs font-normal text-muted-foreground">{description}</div>
						{/if}
					</Label>
				</div>
			{/each}
		</div>
	{:else}
		{@const items = options.map(({ id, label }) => ({ value: id, label }))}
		<div class="space-y-1">
			<Select bind:value={checked} options={items} />
		</div>
	{/if}
	{#if question.other}
		{@const _other = question.other === true ? {} : question.other}
		{@const { label, description, placeholder = 'Otra opción', allowedChars, maxlength } = _other}
		<div class="flex items-center space-x-3">
			<Radio.Item id="option-other" value={OTHER_VALUE} class="--self-start" />
			<div class="w-full space-y-1">
				{#if label}
					<Label for="text-other">{label}</Label>
				{/if}
				<Input id="text-other" bind:value={other} {allowedChars} {maxlength} {placeholder} />
				{#if description}
					<p class="text-sm text-muted-foreground">{description}</p>
				{/if}
			</div>
		</div>
	{/if}
</Radio.Root>
