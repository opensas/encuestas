<script lang="ts">
	import type { GridSingleQuestion, Option, SingleItem } from '$lib/types';

	import { Select } from '$lib/components/select';
	import { toOption } from '$lib/components/survey';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Radio from '$lib/components/ui/radio-group';

	export let question: GridSingleQuestion;
	export let onupdate: (answer: Answer) => void = () => {};
	export let isValid = true;
	export let confirmed = false;

	let items: SingleItem[];

	type Answer = GridSingleQuestion['answer'];

	let options: Option[];
	let checked: NonNullable<Answer>;
	let answer: Answer;

	let valid: Record<string, boolean> = {};
	let required: Record<string, boolean> = {};

	const OTHER_VALUE = '__OTHER__';
	let other: NonNullable<Answer>;
	let control = question.control || 'radio';

	let templateCols = '';

	// init checked from answer
	function initState() {
		checked = {};
		other = {};
		options = question.options.map(toOption);
		items = question.items.map((item) => (typeof item === 'string' ? { title: item } : item));

		for (const { title } of items) {
			const answer = question?.answer?.[title] || '';
			other[title] = '';
			if (!answer) {
				checked[title] = '';
			} else if (options.find((option) => option.title === answer)) {
				checked[title] = answer;
			} else {
				checked[title] = OTHER_VALUE;
				other[title] = answer;
			}
		}

		const cols = control === 'radio' ? options.length : 1;
		const otherCol = question.allowOther ? ' 2fr' : '';
		templateCols = `grid-template-columns: repeat(${cols},1fr) ${otherCol}`;
	}

	function updateAnswer(_checked: typeof checked, _other: typeof other) {
		let answer: Answer = {};
		for (const [key, value] of Object.entries(_checked)) {
			answer[key] = value === OTHER_VALUE ? _other[key] : value;
		}
		return answer;
	}

	$: required = _required(question, items);
	$: valid = _valid(required, answer);
	$: isValid = Object.values(valid).every(Boolean);

	function _required(q: typeof question, it: typeof items) {
		let ret: typeof required = {};
		for (const { title, required } of it) {
			ret[title] = required ?? q.required ?? false; // by default, it's not required
		}
		return ret;
	}

	function _valid(req: typeof required, ans: typeof answer) {
		let ret: typeof valid = {};
		for (const [title, required] of Object.entries(req)) {
			ret[title] = !required || (required && !!ans && !!ans[title]);
		}
		return ret;
	}

	initState();
	$: answer = updateAnswer(checked, other);
	$: onupdate(answer);
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

	{#each items as { title }}
		{@const className = confirmed && !valid[title] ? 'text-destructive' : ''}
		<Label class="self-center text-base {className}">
			{title}
			{#if required[title]}
				<span class="text-destructive">*</span>
			{/if}
		</Label>
		<Radio.Root
			bind:value={checked[title]}
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
					<Select bind:value={checked[title]} options={items} />
				</div>
			{/if}
			{#if question.allowOther}
				{@const placeholder = question.placeholderOther || 'Otra opcion'}
				<div class="flex w-full items-center space-x-2 pl-4">
					<Radio.Item id="option-other" value={OTHER_VALUE} class="--self-start" />
					<Input bind:value={other[title]} {placeholder} />
				</div>
			{/if}
		</Radio.Root>
	{/each}
</div>
