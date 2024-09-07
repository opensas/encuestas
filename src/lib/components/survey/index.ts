import type { Option } from '$lib/types';

export * from './samples';
export { default as Survey } from './Survey.svelte';

export function toOption(value: string | Option): Option {
	return typeof value === 'string' ? { title: value } : value;
}
