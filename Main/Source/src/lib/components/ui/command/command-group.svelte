<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Command as CommandPrimitive, useId } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		children,
		heading,
		value,
		...restProps
	}: CommandPrimitive.GroupProps & {
		heading?: string;
	} = $props();
</script>

<CommandPrimitive.Group
	value={value ?? heading ?? `----${useId()}`}
	bind:ref
	class={cn('overflow-hidden p-1 text-foreground', className)}
	data-slot="command-group"
	{...restProps}
>
	{#if heading}
		<CommandPrimitive.GroupHeading class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
			{heading}
		</CommandPrimitive.GroupHeading>
	{/if}
	<CommandPrimitive.GroupItems {children} />
</CommandPrimitive.Group>
