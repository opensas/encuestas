<script lang="ts">
	import type { GridTextQuestion, TextItem } from '$lib/types';

	import { isAllowedChar } from '$lib/components/survey/question';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	// export let question: GridTextQuestion;
	// export let onupdate: (answer: Answer) => void = () => {};
	// export let isValid = true;
	// export let confirmed = false;

	// let items: TextItem[];

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
		for (const { title } of items) answer[title] = question.answer?.[title] || '';
	}

	function toItem(value: string | TextItem): TextItem {
		return typeof value === 'string' ? { title: value } : value;
	}

	function calculateRequired(q: typeof question, it: typeof items) {
		let ret: Record<string, boolean> = {};
		// take item.required, then question.required, then default to false (not required)
		for (const { title, required } of it) ret[title] = required ?? q.required ?? false;
		return ret;
	}

	function keypress(event: KeyboardEvent, allowedChars: TextItem['allowedChars']) {
		if (!isAllowedChar(event.key, allowedChars)) event.preventDefault();
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
		class="gap-x-2 space-y-4"
		class:lg:columns-3={items.length >= 12}
		class:md:columns-2={items.length >= 8}
	>
		{#each items as item, index}
			{@const {
				title,
				description,
				placeholder,
				control = 'input',
				maxlength,
				allowedChars,
			} = item}
			{@const id = `text_${index}`}
			{@const className = confirmed && !isValidItem(title) ? 'text-destructive' : ''}

			<div class="grid w-full gap-1.5">
				<Label class={className} for={id}>
					{title}
					{#if required[title]}
						<span class="text-destructive">*</span>
					{/if}
				</Label>
				{#if control === 'textarea'}
					<Textarea
						{id}
						bind:value={answer[title]}
						{maxlength}
						{placeholder}
						onkeypress={(e) => keypress(e, allowedChars)}
					/>
				{:else if control === 'input'}
					<Input
						{id}
						bind:value={answer[title]}
						{maxlength}
						{placeholder}
						onkeypress={(e) => keypress(e, allowedChars)}
					/>
				{/if}
				{#if description}
					<p class="text-sm text-muted-foreground">{description}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
