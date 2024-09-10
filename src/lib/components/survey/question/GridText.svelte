<script lang="ts">
	import type { GridTextQuestion, TextItem } from '$lib/types';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	export let question: GridTextQuestion;
	export let onupdate: (answer: Answer) => void = () => {};

	let items: TextItem[];

	type Answer = GridTextQuestion['answer'];

	let answer: NonNullable<Answer> = {};

	// init checked from respuesta
	function initState() {
		items = question.items.map((item) => (typeof item === 'string' ? { title: item } : item));

		answer = {};
		for (const { title } of items) answer[title] = question.answer?.[title] || '';

		onupdate(answer);
	}

	initState();

	$: onupdate(answer);
</script>

<div class="space-y-4">
	<div
		class="gap-x-2 space-y-4"
		class:lg:columns-3={items.length >= 12}
		class:md:columns-2={items.length >= 8}
	>
		{#each items as { title, description, placeholder, control = 'input', maxlength }, index}
			{@const id = `text_${index}`}
			<div class="grid w-full gap-1.5">
				<Label for={id}>{title}</Label>
				{#if control === 'textarea'}
					<Textarea {id} bind:value={answer[title]} {maxlength} {placeholder} />
				{:else if control === 'input'}
					<Input {id} bind:value={answer[title]} {maxlength} {placeholder} />
				{/if}
				{#if description}
					<p class="text-sm text-muted-foreground">{description}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
