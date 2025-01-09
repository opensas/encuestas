<script lang="ts">
	import type { GridTextQuestion, TextItem } from '$lib/types';

	import { Input, Textarea } from '$lib/components';
	import { calculateRequired } from '$lib/components/survey';
	import { Label } from '$lib/components/ui/label';

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

	let _log = $state('logging...');

	// init checked from respuesta
	function initState() {
		answer = {};
		for (const { title } of items) answer[title] = question.answer?.[title] || '';
	}

	function toItem(value: string | TextItem): TextItem {
		return typeof value === 'string' ? { title: value } : value;
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
				<Label>{_log}</Label>
				<Label class={className} for={id}>
					{title}!!
					{#if required[title]}
						<span class="text-destructive">*</span>
					{/if}
				</Label>
				{#if control === 'textarea'}
					<Textarea {id} bind:value={answer[title]} {allowedChars} {maxlength} {placeholder} />
				{:else if control === 'input'}
					<Input {id} bind:value={answer[title]} {allowedChars} {maxlength} {placeholder} />
				{/if}
				{#if description}
					<p class="text-sm text-muted-foreground">{description}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
