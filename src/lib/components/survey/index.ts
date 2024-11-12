import type { Option } from '$lib/types';

export * from './samples';
export { default as Survey } from './Survey.svelte';
export { default as Message } from './Message.svelte';

export function toOption(value: string | Option): Option {
	return typeof value === 'string' ? { title: value } : value;
}

export const DEFAULT_OUTRO = `
	Fin de la encuesta
	Muchas gracias por tu participación
`;
