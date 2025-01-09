<script lang="ts">
	import { type AllowedChars, isAllowedChar } from '$lib/components/survey';
	import { Textarea } from '$lib/components/ui/textarea';

	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof Textarea> & {
		allowedChars?: AllowedChars;
	};

	let {
		ref = $bindable(null),
		value = $bindable(),
		allowedChars,
		onkeydown,
		onbeforeinput,
		...restProps
	}: Props = $props();

	type OnkeydownEvent = Parameters<NonNullable<Props['onkeydown']>>[0];
	type OnbeforeinputEvent = Parameters<NonNullable<Props['onbeforeinput']>>[0];

	function _onkeydown(event: OnkeydownEvent) {
		if (allowedChars && !isAllowedChar(event.key, allowedChars)) event.preventDefault();
		if (onkeydown) return onkeydown(event);
	}

	function _onbeforeinput(event: OnbeforeinputEvent) {
		if (allowedChars && event.data && !isAllowedChar(event.data, allowedChars))
			event.preventDefault();
		if (onbeforeinput) return onbeforeinput(event);
	}
</script>

<Textarea
	bind:ref
	bind:value
	{...restProps}
	onbeforeinput={_onbeforeinput}
	onkeydown={_onkeydown}
/>
