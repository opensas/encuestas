<script lang="ts">
	import type { ApiItem, GridApiQuestion } from '$lib/types';

	import { Select, type SelectItem } from '$lib/components';
	import Combobox from '$lib/components/combobox/Combobox.svelte';
	import { calculateRequired } from '$lib/components/survey/common';
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

	type Id = ApiItem['id'];

	let items = $derived(question.items);
	let required = $state({} as Record<Id, boolean>);
	let parents = $state({} as Record<Id, Id[]>);
	let options = $state({} as Record<Id, SelectItem[]>);

	let answer: Answer = $state({});

	// init checked from answer
	function initState() {
		required = calculateRequired(question, items);
		parents = calculateParents(items);

		for (const { id } of items) answer[id] = question?.answer?.[id] || '';

		for (const { id } of items) fetchOptions(answer, id);

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
		let ret: Record<Id, Id[]> = {};
		const regex = /{([^}]+)}/g;

		for (const { id, endpoint } of it) {
			const matches = endpoint.match(regex);
			ret[id] = matches ? matches.map((match) => match.replace(/{|}/g, '')) : [];
		}
		return ret;
	}

	async function fetchOptions(selected: Answer, title: Id) {
		const item = items.find((item) => item.id === title);
		if (!item) return;

		// if there's any parent empty, the select will be empty, and disabled
		if (parents[title].some((parent) => !selected[parent])) {
			options[title] = [];
			return;
		}

		const { idField, descriptionField, endpoint } = item;

		const url = fill(endpoint, selected);

		try {
			const response = await fetch(url);
			const data = await response.json();

			const opts = data.map((row: Record<string, string>) => ({
				value: row[idField],
				label: row[descriptionField || idField],
			}));

			options[title] = opts;
		} catch (error) {
			// Handle API errors gracefully by setting empty options
			console.error(`Failed to fetch options for ${title}:`, error);
			options[title] = [];
		}
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

	{#each items as { id, label = id, control: _control } (id)}
		{@const className = confirmed && !isValidItem(id) ? 'text-destructive' : ''}
		{@const currentOptions = options[id] || []}
		{@const control = _control || question.control || 'select'}
		<Label class="self-center text-base {className}">
			{titleCase(label)}
			{#if required[id]}
				<span class="text-destructive">*</span>
			{/if}
		</Label>
		<div class="grid items-center gap-4">
			<div class="w-full space-y-1">
				{#if control === 'select'}
					<Select
						value={answer[id]}
						disabled={currentOptions.length === 0}
						options={currentOptions}
						onchange={(value) => onchange(id, value)}
					/>
				{:else if control === 'combobox'}
					<Combobox
						value={answer[id]}
						disabled={currentOptions.length === 0}
						options={currentOptions}
						onchange={(value) => onchange(id, value)}
					/>
				{/if}
			</div>
		</div>
	{/each}
</div>
