<script lang="ts" module>
	export type SelectItem = Selected<string>;
</script>

<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

	import type { Selected } from 'bits-ui';

	type Props = {
		value?: string;
		options: Array<string | SelectItem>;
		placeholder?: string;
		id?: string;
		name?: string;
		label?: string;
		disabled?: boolean;
		onchange?: (value?: string) => void;
		class?: string;
	};

	let {
		value = $bindable(),
		options,
		placeholder = 'Elija una opción',
		// id,
		// name,
		label,
		disabled = false,
		onchange = () => {},
		class: className = '',
	}: Props = $props();

	function toItem(value: string | SelectItem): SelectItem {
		let option = typeof value === 'string' ? { value } : { ...value };
		option.label = option.label || option.value;
		return option;
	}

	// bug, should work ok with undefined
	let items = $derived(options.map(toItem));
	let selected = $derived(items.find((f) => f.value === value)?.label ?? placeholder);

	function onValueChange(newValue: SelectItem['value']) {
		value = newValue || undefined;
		onchange(value);
	}
</script>

<!-- <Select.Root {disabled} portal={null} preventScroll={false} {selected} {onSelectedChange}>
	<Select.Trigger class={className}>
		<Select.Value {placeholder} />
	</Select.Trigger>
	<Select.Content side="bottom">
		<ScrollArea class="h-60">
			<Select.Group>
				{#if label}<Select.Label>{label}</Select.Label>{/if}
				{#each items as item}
					{@const { value, label } = item}
					<Select.Item {value} {label}>{label}</Select.Item>
				{/each}
			</Select.Group>
		</ScrollArea>
	</Select.Content>
	<Select.Input {id} {name} />
</Select.Root> -->

<Select.Root value={selected} {disabled} type="single" {onValueChange}>
	<Select.Trigger class={className}>
		{selected}
	</Select.Trigger>
	<Select.Content preventScroll={true}>
		<Select.Group>
			{#if label}<Select.GroupHeading>{label}</Select.GroupHeading>{/if}
			{#each items as item}
				{@const { value, label } = item}
				<Select.Item {value} {label}>{label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
