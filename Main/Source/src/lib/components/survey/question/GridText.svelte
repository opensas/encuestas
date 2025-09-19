<script lang="ts">
	import type { GridTextQuestion, TextItem } from '$lib/types';

	import { Input, Textarea } from '$lib/components';
	import { calculateRequired } from '$lib/components/survey/common';
	import { Label } from '$lib/components/ui/label';

	import { titleCase } from '$lib/utils/string';

	type Answer = NonNullable<GridTextQuestion['answer']>;

	type Props = {
		question: GridTextQuestion;
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

	let items = $derived(question.items.map(toItem));
	let required = $derived(calculateRequired(question, items));

	let answer: Answer = $state({});

	// init checked from respuesta
	function initState() {
		answer = {};
		for (const { id } of items) answer[id] = question.answer?.[id] || '';
	}

	function toItem(value: string | TextItem): TextItem {
		return typeof value === 'string' ? { id: value } : value;
	}

	function isValidItem(title: string) {
		if (!required[title]) return true; // not required
		return !!answer[title];
	}

	// reactive on answer
	// calculate answer from each radio button and update isValid prop
	$effect(() => {
		isValid = Object.keys(answer).every(isValidItem);

		onupdate(answer);
	});

	initState();
</script>

<div class="space-y-4">
	<div
		class="space-y-4 gap-x-2"
		class:lg:columns-3={items.length >= 12}
		class:md:columns-2={items.length >= 8}
	>
		{#each items as item, index (item.id)}
			{@const {
				id,
				label = id,
				description,
				placeholder,
				control = 'input',
				maxlength,
				allowedChars,
			} = item}
			{@const idx = `text_${index}`}
			{@const className = confirmed && !isValidItem(id) ? 'text-destructive' : ''}

			<div class="grid w-full gap-1.5">
				<Label class={className} for={idx}>
					{titleCase(label)}
					{#if required[id]}
						<span class="text-destructive">*</span>
					{/if}
				</Label>
				{#if control === 'textarea'}
					<Textarea id={idx} bind:value={answer[id]} {allowedChars} {maxlength} {placeholder} />
				{:else if control === 'input'}
					<Input id={idx} bind:value={answer[id]} {allowedChars} {maxlength} {placeholder} />
				{/if}
				{#if description}
					<p class="text-sm text-muted-foreground">{description}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
