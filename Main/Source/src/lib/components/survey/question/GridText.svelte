<script lang="ts">
	import type { GridTextQuestion, TextItem } from '$lib/types';

	import { isAllowedChar } from '$lib/components/survey/question';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	export let question: GridTextQuestion;
	export let onupdate: (answer: Answer) => void = () => {};
	export let isValid = true;
	export let confirmed = false;

	let items: TextItem[];

	type Answer = GridTextQuestion['answer'];

	let answer: NonNullable<Answer> = {};
	let valid: Record<string, boolean> = {};
	let required: Record<string, boolean> = {};

	// init checked from respuesta
	function initState() {
		items = question.items.map((item) => (typeof item === 'string' ? { title: item } : item));

		answer = {};
		for (const { title } of items) answer[title] = question.answer?.[title] || '';

		onupdate(answer);
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
			ret[title] = !required || (required && !!ans[title]);
		}
		return ret;
	}

	function keypress(event: KeyboardEvent, allowedChars: TextItem['allowedChars']) {
		if (!isAllowedChar(event.key, allowedChars)) event.preventDefault();
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
		{#each items as { title, description, placeholder, control = 'input', maxlength, allowedChars }, index}
			{@const id = `text_${index}`}
			{@const className = confirmed && !valid[title] ? 'text-destructive' : ''}

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
						on:keypress={(e) => keypress(e, allowedChars)}
					/>
				{:else if control === 'input'}
					<Input
						{id}
						bind:value={answer[title]}
						{maxlength}
						{placeholder}
						on:keypress={(e) => keypress(e, allowedChars)}
					/>
				{/if}
				{#if description}
					<p class="text-sm text-muted-foreground">{description}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
