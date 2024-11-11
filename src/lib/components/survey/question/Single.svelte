<script lang="ts">
	import type { Option, SingleQuestion } from '$lib/types';

	import { Select } from '$lib/components/select';
	import { toOption } from '$lib/components/survey';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Radio from '$lib/components/ui/radio-group';

	export let question: SingleQuestion;
	export let onupdate: (answer: string) => void = () => {};
	export let isValid = true;

	let options: Option[];
	let checked: string;

	const OTHER_VALUE = '__OTHER__';
	let other = '';

	// init checked from answer
	function initState() {
		checked = question.answer || '';
		options = question.options.map(toOption);

		// check is it's an other option
		const answer = question.answer || '';
		if (!answer) {
			checked = '';
		} else if (options.find((option) => option.title === answer)) {
			checked = answer;
		} else {
			checked = OTHER_VALUE;
			other = answer;
		}
	}

	initState();

	$: required = question.required ?? true;
	$: isValid = !required || (required && !!answer);

	$: answer = checked === OTHER_VALUE ? other : checked;
	$: onupdate(answer);
</script>

<Radio.Root bind:value={checked} class="gap-0 space-y-4">
	{#if (question?.control || 'radio') === 'radio'}
		<div
			class="grid gap-x-2 gap-y-4"
			class:lg:columns-3={options.length >= 12}
			class:md:columns-2={options.length >= 8}
		>
			{#each options as { title, description }, index}
				{@const id = `opcion_${index}`}
				<div class="flex items-center space-x-3">
					<!-- mt-1 compensates for the leading-snug, to have both aligned to the top -->
					<Radio.Item {id} value={title} class="mt-1 self-start" />
					<Label class="flex flex-col space-y-1 leading-snug" for={id}>
						<div>{title}</div>
						{#if description}
							<div class="text-xs font-normal text-muted-foreground">{description}</div>
						{/if}
					</Label>
				</div>
			{/each}
		</div>
	{:else}
		{@const items = options.map((o) => ({ value: o.title }))}
		<div class="space-y-1">
			<Select bind:value={checked} options={items} />
		</div>
	{/if}
	{#if question.allowOther}
		{@const { titleOther: title, placeholderOther: placeholder = 'Otra opción' } = question}
		<div class="flex items-center space-x-3">
			<Radio.Item id="option-other" value={OTHER_VALUE} class="--self-start" />
			<div class="w-full space-y-1">
				{#if title}
					<Label for="text-other">{title}</Label>
				{/if}
				<Input id="text-other" bind:value={other} {placeholder} />
			</div>
		</div>
	{/if}
</Radio.Root>
