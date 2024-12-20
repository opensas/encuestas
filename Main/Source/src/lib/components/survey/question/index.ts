import type { TextItem } from '$lib/types';

export { default as Single } from './Single.svelte';
export { default as Multiple } from './Multiple.svelte';
export { default as Rating } from './Rating.svelte';
export { default as Text } from './Text.svelte';
export { default as GridText } from './GridText.svelte';
export { default as GridSingle } from './GridSingle.svelte';

export function isAllowedChar(char: string, allowed: TextItem['allowedChars']) {
	if (!char || !allowed) return true;
	if (allowed === 'digits') allowed = /^\d$/;
	if (allowed === 'numbers') allowed = /^[0-9\-.]$/;

	if (typeof allowed === 'string') return allowed.includes(char);
	if (allowed instanceof RegExp) return allowed.test(char);
	return false;
}
