<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';

	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
	bind:this={ref}
	class={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
	data-slot="command-shortcut"
	{...restProps}
>
	{@render children?.()}
</span>
