<script lang="ts">
	import {
		type AllowedChars,
		isAllowedChar,
		onlyAllowedChars,
	} from '$lib/components/survey/common';
	import { Input } from '$lib/components/ui/input';

	import { cn } from '$lib/utils';

	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof Input> & {
		allowedChars?: AllowedChars;
	};

	let {
		ref = $bindable(null),
		value = $bindable(),
		allowedChars,
		class: className,
		onkeydown: _onkeydown, // allow caller to set its own handler
		onbeforeinput: _onbeforeinput,
		oninput: _oninput,
		...restProps
	}: Props = $props();

	// Reactive computation for enhanced sizing
	const customClass = $derived(cn(className, 'h-10'));

	const onkeydown: Props['onkeydown'] = (e) => {
		if (allowedChars && !isAllowedChar(e.key, allowedChars)) e.preventDefault();
		_onkeydown?.(e);
	};

	const onbeforeinput: Props['onbeforeinput'] = (e) => {
		if (allowedChars && e.data && !isAllowedChar(e.data, allowedChars)) e.preventDefault();
		_onbeforeinput?.(e);
	};
	const oninput: Props['oninput'] = (e) => {
		const target = e.currentTarget;
		if (target.value) {
			const clean = onlyAllowedChars(target.value, allowedChars);
			if (clean !== target.value) {
				const position = target.selectionStart;
				target.value = value = clean; // we need to also update value to restore selectionRage
				if (position) target.setSelectionRange(position - 1, position - 1);
			}
		}
		_oninput?.(e);
	};
</script>

<Input
	bind:ref
	bind:value
	class={customClass}
	{...restProps}
	{onbeforeinput}
	{oninput}
	{onkeydown}
/>
