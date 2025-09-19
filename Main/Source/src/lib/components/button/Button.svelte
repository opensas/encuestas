<script lang="ts">
	import { Button, type ButtonProps } from '$lib/components/ui/button';

	import { cn } from '$lib/utils';

	let { size = 'default', class: className, ...rest }: ButtonProps = $props();

	// Reactive computation for enhanced sizing
	const customClass = $derived(
		cn(className, size === 'default' && 'h-10', size === 'icon' && 'size-10')
	);
</script>

<Button {...rest} class={customClass} {size} />
