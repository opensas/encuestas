<script lang="ts">
	import type { MultipleQuestion, Option } from '$lib/types';

	import { toOption } from '$lib/components/survey';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let question: MultipleQuestion;
	export let onupdate: (answer: string[]) => void = () => {};
	export let isValid = true;

	let options: Option[];
	let answer: string[];

	let checked: boolean[];
	let checkedOther: boolean;
	let other: string;

	// init checked from respuesta
	function initState() {
		answer = question.answer || [];
		onupdate(answer);

		options = question.options.map(toOption);
		const titulos = options.map((option) => option.title);

		checked = titulos.map((titulo) => answer.includes(titulo));
		other = answer.find((r) => !titulos.includes(r)) || '';
		checkedOther = !!other;
	}

	function updateAnswer(checked: boolean[], checkedOther: boolean, other: string) {
		answer = checked
			.map((check, index) => (check ? options[index].title : null))
			.filter((resp) => resp !== null); // remove unchecked items
		if (checkedOther && other) answer.push(other);
		onupdate(answer);
	}

	initState();

	$: required = question.required ?? true;
	$: isValid = !required || (required && answer.length > 0);

	$: updateAnswer(checked, checkedOther, other);
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
