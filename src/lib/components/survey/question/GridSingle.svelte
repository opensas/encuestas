<script lang="ts">
	import type { GridSingleQuestion, Option } from '$lib/types';

	import { Select } from '$lib/components/select';
	import { toOption } from '$lib/components/survey';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Radio from '$lib/components/ui/radio-group';

	export let question: GridSingleQuestion;
	export let onupdate: (answer: Answer) => void = () => {};

	type Answer = GridSingleQuestion['answer'];

	let options: Option[];
	let checked: NonNullable<Answer>;
	let answer: Answer;

	const OTHER_VALUE = '__OTHER__';
	let other: NonNullable<Answer>;
	let control = question.control || 'radio';

	let templateCols = '';

	// init checked from answer
	function initState() {
		checked = {};
		other = {};
		options = question.options.map(toOption);

		for (const item of question.items) {
			const answer = question?.answer?.[item] || '';
			other[item] = '';
			if (!answer) {
				checked[item] = '';
			} else if (options.find((option) => option.title === answer)) {
				checked[item] = answer;
			} else {
				checked[item] = OTHER_VALUE;
				other[item] = answer;
			}
		}

		const cols = control === 'radio' ? options.length : 1;
		const otherCol = question.allowOther ? ' 2fr' : '';
		templateCols = `grid-template-columns: repeat(${cols},1fr) ${otherCol}`;
	}

	function updateAnswer(_checked: typeof checked) {
		let answer: Answer = {};
		for (const [key, value] of Object.entries(_checked)) {
			answer[key] = value === OTHER_VALUE ? other[key] : value;
		}
		return answer;
	}

	initState();
	$: answer = updateAnswer(checked);
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
			<Label class="w-full pl-4 text-center">Otra opción</Label>
		{/if}
	</div>

	{#each question.items as item}
		<Label class="self-center text-base">{item}</Label>
		<Radio.Root
			bind:value={checked[item]}
			style={templateCols}
			class="grid items-center gap-4 "
			orientation="horizontal"
		>
			{#if control === 'radio'}
				{#each options as { title }}
					<Radio.Item value={title} class="justify-self-center" />
				{/each}
			{:else}
				{@const items = options.map((o) => ({ value: o.title }))}
				<div class="w-full space-y-1">
					<Select bind:value={checked[item]} options={items} />
				</div>
			{/if}
			{#if question.allowOther}
				<div class="flex w-full items-center space-x-2 pl-4">
					<Radio.Item id="option-other" value={OTHER_VALUE} class="--self-start" />
					<Input bind:value={other[item]} placeholder="Otra opción" />
				</div>
			{/if}
		</Radio.Root>
	{/each}
</div>
