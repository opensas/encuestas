<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	import { cn } from '$lib/utils.js';

	import { tick } from 'svelte';

	import type { Selected } from 'bits-ui';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';

	type Props = {
		options: Selected<string>[];
	};

	let { options }: Props = $props();

	// const options = [
	// 	{ value: 'sveltekit', label: 'SvelteKit' },
	// 	{ value: 'next.js', label: 'Next.js' },
	// 	{ value: 'nuxt.js', label: 'Nuxt.js' },
	// 	{ value: 'remix', label: 'Remix' },
	// 	{ value: 'astro', label: 'Astro' },
	// 	{ value: 'astro1', label: 'Astro1' },
	// 	{ value: 'astro2', label: 'Astro2' },
	// 	{ value: 'astro3', label: 'Astro3' },
	// 	{ value: 'astro4', label: 'Astro4' },
	// 	{ value: 'astro5', label: 'Astro5' },
	// ];

	let open = $state(false);
	let value = $state('');
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(options.find((f) => f.value === value)?.label);

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

<div class="mt-20">
	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<Button
					class="w-[200px] justify-between"
					variant="outline"
					{...props}
					aria-expanded={open}
					role="combobox"
				>
					{selectedValue || 'Select a framework...'}
					<ChevronsUpDown class="opacity-50" />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<Command.Input placeholder="Search framework..." />
				<Command.List>
					<Command.Empty>No framework found.</Command.Empty>
					<Command.Group>
						{#each options as framework}
							<Command.Item
								value={framework.value}
								onSelect={() => {
									value = framework.value;
									closeAndFocusTrigger();
								}}
							>
								<Check class={cn(value !== framework.value && 'text-transparent')} />
								{framework.label}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</div>
