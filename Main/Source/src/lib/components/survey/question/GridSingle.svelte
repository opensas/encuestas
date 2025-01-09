<script lang="ts">
	import type { GridSingleQuestion, SingleItem } from '$lib/types';

	import { Select } from '$lib/components';
	import { calculateRequired, toOption } from '$lib/components/survey';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Radio from '$lib/components/ui/radio-group';

	import { titleCase } from '$lib/utils/string';

	type Answer = NonNullable<GridSingleQuestion['answer']>;

	type Props = {
		question: GridSingleQuestion;
		onupdate?: (answer: Answer) => void;
		isValid?: boolean;
		confirmed?: boolean;
	};

	let {
		question,
		onupdate = () => {},
		isValid = $bindable(true),
		confirmed = false,
	}: Props = $props();

	let options = $derived(question.options.map(toOption));
	let items = $derived(question.items.map(toItem));
	let required = $derived(calculateRequired(question, items));

	let checked: Answer = $state({});

	const OTHER_VALUE = '__OTHER__';
	let other: Answer = $state({});
	let control = $derived(question.control || 'radio');

	let templateCols = $state('');

	// init checked from answer
	function initState() {
		for (const { id } of items) {
			const answer = question?.answer?.[id] || '';
			other[id] = '';
			if (!answer) {
				checked[id] = '';
			} else if (options.find((option) => option.title === answer)) {
				checked[id] = answer;
			} else {
				checked[id] = OTHER_VALUE;
				other[id] = answer;
			}
		}

		const cols = control === 'radio' ? options.length : 1;
		const otherCol = question.allowOther ? ' 2fr' : '';
		templateCols = `grid-template-columns: repeat(${cols},1fr) ${otherCol}`;
	}

	function toItem(value: string | SingleItem): SingleItem {
		return typeof value === 'string' ? { id: value } : value;
	}

	function isValidItem(title: string) {
		if (!required[title]) return true; // not required
		if (checked[title] === OTHER_VALUE && !other[title]) return false; // other value checked, but empty
		return !!checked[title];
	}

	// reactive on checked, other
	// calculate answer from each radio button and update isValid prop
	$effect(() => {
		let answer: Answer = {};
		for (const [key, value] of Object.entries(checked))
			answer[key] = value === OTHER_VALUE ? other[key] : value;

		isValid = Object.keys(checked).every(isValidItem);

		onupdate(answer);
	});

	initState();
</script>

<!-- title row -->
<div class="grid grid-cols-[1fr_2fr] gap-4 gap-y-6">
	<!-- pregunta -->
	<div></div>
	<div style={templateCols} class="grid items-center gap-4">
		{#if control === 'radio'}
			<!-- each option as a radio -->
			{#each question.options as option}
				<Label class="justify-self-center text-center">{option}</Label>
			{/each}
		{:else}
			<!-- a single select with all the options -->
			<div></div>
		{/if}
		{#if question.allowOther}
			<Label class="w-full pl-4 text-center">{question.titleOther || 'Otra opción'}</Label>
		{/if}
	</div>

	{#each items as { id, label = id }}
		{@const className = confirmed && !isValidItem(id) ? 'text-destructive' : ''}
		<Label class="self-center text-base {className}">
			{titleCase(label)}
			{#if required[id]}
				<span class="text-destructive">*</span>
			{/if}
		</Label>
		<Radio.Root
			bind:value={checked[id]}
			style={templateCols}
			class="grid items-center gap-4"
			orientation="horizontal"
		>
			{#if control === 'radio'}
				{#each options as { title }}
					<Radio.Item value={title} class="justify-self-center" />
				{/each}
			{:else}
				{@const items = options.map((o) => ({ value: o.title }))}
				<div class="w-full space-y-1">
					<Select bind:value={checked[id]} options={items} />
				</div>
			{/if}
			{#if question.allowOther}
				{@const placeholder = question.placeholderOther || 'Otra opcion'}
				<div class="flex w-full items-center space-x-2 pl-4">
					<Radio.Item id="option-other" value={OTHER_VALUE} class="--self-start" />
					<Input bind:value={other[id]} {placeholder} />
				</div>
			{/if}
		</Radio.Root>
	{/each}
</div>
