<script lang="ts">
	import type { ApiItem, GridApiQuestion } from '$lib/types';

	import { Select, type SelectItem } from '$lib/components';
	import { calculateRequired } from '$lib/components/survey';
	import { Label } from '$lib/components/ui/label';

	import { titleCase } from '$lib/utils/string';

	import { onMount } from 'svelte';

	type Answer = NonNullable<GridApiQuestion['answer']>;

	type Props = {
		question: GridApiQuestion;
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

	type Title = ApiItem['title'];

	let items = $derived(question.items);
	let required = $state({} as Record<Title, boolean>);
	let parents = $state({} as Record<Title, Title[]>);
	let options = $state({} as Record<Title, SelectItem[]>);

	let answer: Answer = $state({});

	// init checked from answer
	function initState() {
		required = calculateRequired(question, items);
		parents = calculateParents(items);

		for (const { title } of items) answer[title] = question?.answer?.[title] || '';

		for (const { title } of items) fetchOptions(answer, title);

		isValid = Object.keys(answer).every(isValidItem);
	}

	function isValidItem(title: string) {
		if (!required[title]) return true; // not required
		return !!answer[title];
	}

	function onchange(title: string, value?: string) {
		// no change
		if (answer[title] === value) return;

		answer[title] = value || '';

		// get items that depends on this one
		const children = Object.keys(parents).filter((key) => parents[key].includes(title));

		for (const child of children) answer[child] = ''; // clear all children
		for (const child of children) fetchOptions(answer, child); // reload all children

		isValid = Object.keys(answer).every(isValidItem);
		onupdate(answer);
	}

	function calculateParents(it: typeof items) {
		let ret: Record<Title, Title[]> = {};
		const regex = /{([^}]+)}/g;

		for (const { title, endpoint } of it) {
			const matches = endpoint.match(regex);
			ret[title] = matches ? matches.map((match) => match.replace(/{|}/g, '')) : [];
		}
		return ret;
	}

	async function fetchOptions(selected: Answer, title: Title) {
		const item = items.find((item) => item.title === title);
		if (!item) return;

		// if there's any parent empty, the select will be empty, and disabled
		if (parents[title].some((parent) => !selected[parent])) {
			options[title] = [];
			return;
		}

		const { idField, descriptionField, endpoint } = item;

		const url = fill(endpoint, selected);

		const response = await fetch(url);
		const data = await response.json();

		const opts = data.map((row: Record<string, string>) => ({
			value: row[idField],
			label: row[descriptionField || idField],
		}));

		options[title] = opts;
		return;
	}

	function fill(template: string, values: Record<string, string>): string {
		return Object.entries(values).reduce(
			(acc, [key, value]) => acc.replace(`{${key}}`, value),
			template
		);
	}

	onMount(initState);
</script>

<!-- title row -->
<div class="grid grid-cols-[1fr_2fr] gap-4 gap-y-6">
	<!-- pregunta -->
	<div></div>
	<div class="grid items-center gap-4">
		<!-- a single select with all the options -->
		<div></div>
	</div>

	{#each items as { title }}
		{@const className = confirmed && !isValidItem(title) ? 'text-destructive' : ''}
		{@const currentOptions = options[title] || []}
		<Label class="self-center text-base {className}">
			{titleCase(title)}
			{#if required[title]}
				<span class="text-destructive">*</span>
			{/if}
		</Label>
		<div class="grid items-center gap-4">
			<div class="w-full space-y-1">
				<Select
					value={answer[title]}
					disabled={currentOptions.length === 0}
					options={currentOptions}
					onchange={(value) => onchange(title, value)}
				/>
			</div>
		</div>
	{/each}
</div>
