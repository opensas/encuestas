<script lang="ts">
	import type { MultipleQuestion } from '$lib/types';

	import { toOption } from '$lib/components/survey';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	type Props = {
		question: MultipleQuestion;
		onupdate?: (answer: string[]) => void;
		isValid?: boolean;
	};

	let { question, onupdate = () => {}, isValid = $bindable(true) }: Props = $props();

	let options = $derived(question.options.map(toOption));
	let required = $derived(question.required ?? true); // required by default

	let checked: boolean[] = $state([]);
	let checkedOther = $state(false);
	let other = $state('');

	// init checked from respuesta
	function initState() {
		const answer = question.answer || [];

		const titles = options.map((option) => option.title);

		checked = titles.map((title) => answer.includes(title));
		other = answer.find((r) => !titles.includes(r)) || '';
		checkedOther = !!other;
	}

	initState();

	function onchange(checked: boolean[], checkedOther: boolean, other: string) {
		const answer = checked
			.map((check, index) => (check ? options[index].title : null))
			.filter((resp) => resp !== null); // remove unchecked items

		if (checkedOther && other) answer.push(other);

		isValid = !required || (required && answer.length > 0);

		onupdate(answer);
	}

	$effect(() => onchange(checked, checkedOther, other));
</script>

<div class="space-y-4">
	<div
		class="gap-x-2 space-y-4"
		class:lg:columns-3={options.length >= 12}
		class:md:columns-2={options.length >= 8}
	>
		{#each options as { title, description }, index}
			{@const id = `opcion_${index}`}
			<div class="flex items-center space-x-3">
				<!-- mt-1 compensates for the leading-snug, to have both aligned to the top -->
				<Checkbox {id} bind:checked={checked[index]} class="mt-1 self-start" />
				<Label class="flex flex-col space-y-1 leading-snug" for={id}>
					<div>{title}</div>
					{#if description}
						<div class="text-xs font-normal text-muted-foreground">{description}</div>
					{/if}
				</Label>
			</div>
		{/each}
	</div>

	{#if question.allowOther}
		{@const { titleOther: title, placeholderOther: placeholder = 'Otra opción' } = question}
		<div class="flex items-center space-x-3">
			<Checkbox id="opcion_otra" bind:checked={checkedOther} class="--self-start" />
			<div class="w-full space-y-1">
				{#if title}
					<Label for="text-other">{title}</Label>
				{/if}
				<Input bind:value={other} {placeholder} />
			</div>
		</div>
	{/if}
</div>
