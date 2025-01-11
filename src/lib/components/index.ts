import type { Selected } from 'bits-ui';

export { default as Combobox } from './combobox/Combobox.svelte';
export { default as Input } from './input/Input.svelte';
export { default as Select } from './select/Select.svelte';
export { default as Textarea } from './textarea/Textarea.svelte';

// common types (shared by Select and Combobox)
export type SelectItem = Selected<string>;

export function toItem(value: string | SelectItem): SelectItem {
	const option = typeof value === 'string' ? { value } : { ...value };
	option.label = option.label || option.value;
	return option;
}
