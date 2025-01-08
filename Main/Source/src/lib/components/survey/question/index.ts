import type { TextItem } from '$lib/types';

export { default as Single } from './Single.svelte';
export { default as Multiple } from './Multiple.svelte';
export { default as Rating } from './Rating.svelte';
export { default as Text } from './Text.svelte';
export { default as GridText } from './GridText.svelte';
export { default as GridSingle } from './GridSingle.svelte';
export { default as GridApi } from './GridApi.svelte';

export function isAllowedChar(char: string, allowed: TextItem['allowedChars']) {
	if (!char || !allowed) return true;
	if (allowed === 'digits') allowed = /^\d$/;
	if (allowed === 'numbers') allowed = /^[0-9\-.]$/;

	if (typeof allowed === 'string') return allowed.includes(char);
	if (allowed instanceof RegExp) return allowed.test(char);
	return false;
}

type Question = { required?: boolean };

type Item = {
	title: string;
	required?: boolean;
};

export function calculateRequired(question: Question, items: Item[]) {
	const ret: Record<Item['title'], boolean> = {};
	// take item.required, then question.required, then default to false (not required)
	for (const { title, required } of items) ret[title] = required ?? question.required ?? false;
	return ret;
}
