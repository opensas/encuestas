<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';

	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
	bind:this={ref}
	class={cn('text-sm text-muted-foreground', className)}
	data-slot="card-description"
	{...restProps}
>
	{@render children?.()}
</p>
