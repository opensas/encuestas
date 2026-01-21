import type { AppErrors } from '$lib/utils/errors';
import { includes } from '$lib/utils/object';

export function isValidDate(value: string) {
	// ISO 8601 UTC format: 2024-01-15T09:00:00Z
	const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

	if (!isoRegex.test(value)) return false;

	const date = new Date(value);
	return !isNaN(date.getTime()) && date.toISOString() === value;
}

function invalidProps(data: Record<string, unknown>, fields: readonly string[]) {
	return Object.keys(data)
		.filter((field) => !fields.includes(field))
		.join(', ');
}

export function validProps(
	errors: AppErrors,
	props: readonly string[],
	value: Record<string, unknown>
) {
	const invalid = invalidProps(value, props);
	if (invalid)
		errors.push({
			field: 'propiedades inválidas',
			reason: `Las propiedades ${invalid} son inválidas. Propiedades válidas: ${props.join(', ')}`,
			value: invalid,
		});
}

export function validDate(
	errors: AppErrors,
	field: string,
	value?: string | Date | null | undefined,
	{ required = false } = {}
) {
	if (!required && !value) return;

	// Validar campos requeridos
	if (required && !value) {
		errors.push({ field, reason: `El campo ${field} es obligatorio`, value: value });
	}

	if (value && !isValidDate(value.toString())) {
		errors.push({
			field,
			reason: 'Fecha inválida. Formato válido: AAAA-MM-DDTHH:MM:SS (ISO 8601 UTC)',
			value,
		});
	}
}

export function validIsOneOf(
	errors: AppErrors,
	field: string,
	value: string | undefined,
	list: readonly string[],
	{ required = false } = {}
) {
	if (!required && !value) return;

	// Validar campos requeridos
	if (required && !value) {
		errors.push({ field, reason: `${field} es obligatorio`, value });
	}

	if (value && !includes(list, value)) {
		errors.push({
			field,
			reason: `Valor inválido, valores válidos: ${list.join(', ')}`,
			value,
		});
	}
}
