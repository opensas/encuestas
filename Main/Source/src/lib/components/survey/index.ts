import type { Option } from '$lib/types';

export * from './samples';
export { default as Survey } from './Survey.svelte';
export { default as Message } from './Message.svelte';

// questions types
export { default as Single } from './question/Single.svelte';
export { default as Multiple } from './question/Multiple.svelte';
export { default as Rating } from './question/Rating.svelte';
export { default as Text } from './question/Text.svelte';
export { default as GridText } from './question/GridText.svelte';
export { default as GridSingle } from './question/GridSingle.svelte';
export { default as GridApi } from './question/GridApi.svelte';

export function toOption(value: string | Option): Option {
	return typeof value === 'string' ? { title: value } : value;
}

export const DEFAULT_OUTRO = `
	Fin de la encuesta
	Muchas gracias por tu participación
`;

export type AllowedChars = 'digits' | 'numbers' | RegExp | (string & {});

export function isAllowedChar(char: string, allowed?: AllowedChars) {
	if (char.length > 1) return true; // control key, arrow, backspace, delete, etc.
	if (!char || !allowed) return true;
	if (allowed === 'digits') allowed = /^\d$/;
	if (allowed === 'numbers') allowed = /^[0-9\-.]$/;

	if (typeof allowed === 'string') return allowed.includes(char);
	if (allowed instanceof RegExp) return allowed.test(char);
	return false;
}

export function onlyAllowedChars(text: string, allowed?: AllowedChars) {
	if (!text || !allowed) return text;
	return text
		.split('')
		.filter((char) => isAllowedChar(char, allowed))
		.join('');
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
