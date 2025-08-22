<script lang="ts">
	import { type SelectItem, toItem } from '$lib/components';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	import { cn } from '$lib/utils.js';

	import { tick } from 'svelte';

	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';

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
		onchange,
		class: className = '',
	}: Props = $props();

	let items = $derived(options.map(toItem));
	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selected = $derived(items.find((f) => f.value === value)?.label || placeholder);

	function onSelect(newItem: SelectItem) {
		value = newItem?.value || undefined;
		onchange?.(value);
		closeAndFocusTrigger();
	}

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef} class={cn('w-full justify-between', className)} {disabled}>
		{#snippet child({ props })}
			<Button
				class="--w-[200px] --justify-between"
				variant="outline"
				{...props}
				aria-expanded={open}
				role="combobox"
			>
				{selected}
				<ChevronsUpDown class="opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="--w-[200px] --w-full p-0">
		<Command.Root>
			<Command.Input placeholder="Buscar..." />
			<Command.List>
				<Command.Empty>No se han encontrado opciones.</Command.Empty>
				<Command.Group heading={label}>
					{#each items as item (item.label)}
						<Command.Item value={item.value} onSelect={() => onSelect(item)}>
							<Check class={cn(value !== item.value && 'text-transparent')} />
							{item.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
