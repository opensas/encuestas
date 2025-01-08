<script lang="ts">
	import { cn } from '$lib/utils.js';

	import type { HTMLAttributes } from 'svelte/elements';

	import type { WithElementRef } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		level = 3,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	} = $props();
</script>

<div
	bind:this={ref}
	class={cn('text-2xl font-semibold leading-none tracking-tight', className)}
	aria-level={level}
	role="heading"
	{...restProps}
>
	{@render children?.()}
</div>
