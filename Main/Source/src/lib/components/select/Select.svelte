<script lang="ts">
	import { type SelectItem, toItem } from '$lib/components';
	import * as Select from '$lib/components/ui/select/index.js';

	type Props = {
		value?: string;
		options: Array<string | SelectItem>;
		placeholder?: string;
		label?: string;
		disabled?: boolean;
		onchange?: (value?: string) => void;
		class?: string;
	};

	let {
		value = $bindable(),
		options,
		placeholder = 'Elija una opción',
		label,
		disabled = false,
		onchange = () => {},
		class: className = '',
	}: Props = $props();

	// bug, should work ok with undefined
	let items = $derived(options.map(toItem));
	let selected = $derived(items.find((f) => f.value === value)?.label ?? placeholder);

	function onValueChange(newValue: SelectItem['value']) {
		value = newValue || undefined;
		onchange(value);
	}
</script>

<Select.Root value={selected} {disabled} type="single" {onValueChange}>
	<Select.Trigger class={className}>
		{selected}
	</Select.Trigger>
	<Select.Content preventScroll={true}>
		<Select.Group>
			{#if label}<Select.GroupHeading>{label}</Select.GroupHeading>{/if}
			{#each items as { value, label } (label)}
				<Select.Item {value} {label}>{label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
