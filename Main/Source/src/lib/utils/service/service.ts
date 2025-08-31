// Common service utilities and types
import { appError } from '$lib/utils/errors';
import { err } from '$lib/utils/result';

export function serviceError(message: string, error: unknown) {
	console.error(message, error);
	return err(appError(message));
}

export type ServiceDefinition = {
	defaultOrder: string;
	fields: {
		[key: string]: {
			type?: 'number' | 'string';
			order?: boolean;
			filter?: boolean;
			read?: boolean;
			create?: boolean;
			update?: boolean;
		};
	};
};

export type ServiceFields = ServiceDefinition['fields'];

export type ServiceFieldType = NonNullable<ServiceFields[string]['type']>;

export type ReadParams = {
	page?: number;
	limit?: number;
	order?: string;
	fields?: string;
	conditions?: Record<string, string>;
};

export function filterFields(fields: ServiceFields, prop: keyof ServiceFields[string]) {
	return Object.keys(fields).filter((field) => fields[field][prop] ?? true);
}

export function checkInvalidFields(fields: string[], validFields?: string[]) {
	if (fields.length === 0 || !validFields || validFields.length === 0) return;
	const invalid = fields.filter((field) => !validFields?.includes(field.trim()));
	if (invalid.length) {
		throw new Error(
			`Campos especificados inválidos: ${invalid.join(', ')}. Campos válidos: ${validFields.join(', ')}`
		);
	}
}
