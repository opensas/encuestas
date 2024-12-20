<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Select from '$lib/components/ui/select/index.js';

	import type { Selected } from 'bits-ui';

	export let value: string | undefined = undefined;
	export let options: Array<string | Item>;

	export let placeholder: string | undefined = 'Elija una opción';
	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let label: string | undefined = undefined;

	export let onchange: (value: string | undefined) => void = () => {};

	let className = '';
	export { className as class };

	type Item = Selected<string>;

	function toItem(value: string | Item): Item {
		let option = typeof value === 'string' ? { value } : value;
		option.label = option.label || option.value;
		return option;
	}

	// bug, should work ok with undefined
	const NONE = { value: '' };
	$: items = options.map(toItem);
	$: selected = items.find((item) => item.value === value) || NONE;

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
