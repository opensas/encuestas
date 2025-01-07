<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Select from '$lib/components/ui/select/index.js';

	import type { Selected } from 'bits-ui';

	type Props = {
		value?: string;
		options: Array<string | Item>;
		placeholder?: string;
		id?: string;
		name?: string;
		label?: string;
		onchange?: (value?: string) => void;
		class?: string;
	};

	let {
		value = $bindable(),
		options,
		placeholder = 'Elija una opción',
		id,
		name,
		label,
		onchange = () => {},
		class: className = '',
	}: Props = $props();

	type Item = Selected<string>;

	function toItem(value: string | Item): Item {
		let option = typeof value === 'string' ? { value } : value;
		option.label = option.label || option.value;
		return option;
	}

	// bug, should work ok with undefined
	let items = $derived(options.map(toItem));
	const NONE = { value: '' };
	let selected = $derived(items.find((item) => item.value === value) || NONE);

	function onSelectedChange(item?: Item) {
		value = item?.value || undefined;
		onchange(value);
	}
</script>

<Select.Root portal={null} preventScroll={false} {selected} {onSelectedChange}>
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
</Select.Root>
