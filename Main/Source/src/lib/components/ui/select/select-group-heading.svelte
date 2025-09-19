<script lang="ts">
	import { cn } from '$lib/utils.js';

	import type { ComponentProps } from 'svelte';

	import { Select as SelectPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof SelectPrimitive.GroupHeading> = $props();
</script>

<SelectPrimitive.GroupHeading
	bind:ref
	class={cn('px-2 py-1.5 text-xs text-muted-foreground', className)}
	data-slot="select-group-heading"
	{...restProps}
>
	{@render children?.()}
</SelectPrimitive.GroupHeading>
