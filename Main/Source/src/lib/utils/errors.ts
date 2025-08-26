// Error handling types

import { BAD_REQUEST, type HTTP_STATUS, INTERNAL_ERROR, NOT_FOUND } from '$lib/constants/http';
import { includes } from '$lib/utils/object';

export const APP_ERROR_CODES = ['VALIDATION_ERROR', 'BAD_REQUEST', 'INTERNAL_ERROR', 'NOT_FOUND'];

type APP_ERROR_CODE = (typeof APP_ERROR_CODES)[number];

// inspired on https://www.rfc-editor.org/rfc/rfc9457
export type AppError = {
	code: APP_ERROR_CODE;
	title: string;
	detail?: string;
	status: HTTP_STATUS;
	errors?: AppErrorItem[];
};

type AppErrorItem = { field: string; reason: string; value?: unknown };
export type AppErrors = AppErrorItem[];

/**
 * Maps AppError codes to appropriate HTTP status codes
 */
function defaultStatus(code: AppError['code']): HTTP_STATUS {
	switch (code) {
		case 'VALIDATION_ERROR':
		case 'BAD_REQUEST':
			return BAD_REQUEST;
		case 'NOT_FOUND':
			return NOT_FOUND;
		case 'INTERNAL_ERROR':
		default:
			return INTERNAL_ERROR;
	}
}

type AppErrorOptions = {
	code?: AppError['code'];
	title: string;
	detail?: string;
	status?: number;
	errors?: AppErrors;
};

export function appError(
	options?: AppErrorOptions | string,
	code?: string,
	errors?: AppErrors
): AppError {
	if (!options) options = 'Error desconocido';
	if (typeof options === 'string') options = { title: options };
	if (code) options.code = code;
	if (errors) options.errors = errors;

	const { title, detail, status } = options;
	code = options.code || 'INTERNAL_ERROR';
	errors = options.errors;

	return { code, title, detail, status: status ?? defaultStatus(code), errors: errors };
}

/**
 * Type guard for AppProblem
 */
export function isAppError(value: unknown): value is AppError {
	return (
		!!value &&
		typeof value === 'object' && // required
		'title' in value &&
		typeof value.title === 'string' && // required
		'code' in value &&
		typeof value.code === 'string' && // required
		'status' in value &&
		typeof value.status === 'number' && // not required
		'errors' in value &&
		Array.isArray(value.errors) // not required
	);
}

/**
 * Universal normalizer: takes anything and produces an AppProblem
 */
export function toAppError(input: unknown): AppError {
	// Case 1: already an AppProblem
	if (isAppError(input)) return input;

	// Case 2: Error instance
	if (input instanceof Error) return appError(input.message || input.name, 'INTERNAL_ERROR');

	// Case 3: String
	if (typeof input === 'string') return appError(input, 'INTERNAL_ERROR');

	// Case 4: Plain object
	if (input && typeof input === 'object') {
		if (isAppError(input)) return input;

		const obj = input as Record<string, unknown>;

		const title =
			(typeof obj.name === 'string' && obj.name) ||
			(typeof obj.message === 'string' && obj.message) ||
			(typeof obj.title === 'string' && obj.title) ||
			'Error desconocido';

		const code: AppError['code'] =
			typeof obj.code === 'string' && includes(APP_ERROR_CODES, obj.code)
				? obj.code
				: 'INTERNAL_ERROR';

		const status = typeof obj.status === 'number' ? obj.status : undefined;

		const errors =
			typeof obj.errors === 'object' && Array.isArray(obj.errors) ? obj.errors : undefined;

		return appError({ title, code, status, errors });
	}

	// Case 5: everything else (number, boolean, null, undefined, symbol…)
	return appError(String(input), 'INTERNAL_ERROR');
}

export function toError(err: unknown): Error {
	// Case 1: already an Error
	if (err instanceof Error) return err;

	// Case 2: a string
	if (typeof err === 'string') return new Error(err);

	// Case 3: custom object with error-like properties
	if (typeof err === 'object' && err !== null) {
		const e = err as Record<string, unknown>;

		const name = typeof e.name === 'string' ? e.name : 'Error';
		const message = typeof e.message === 'string' ? e.message : 'Unknown error';

		const cause = e.cause instanceof Error ? e.cause : undefined;

		const error = new Error(message, { cause });

		// assign extra fields if they exist
		error.name = name;
		if (typeof e.stack === 'string') error.stack = e.stack;

		return error;
	}

	// Case 4: anything else
	return new Error('Error desconocido');
}
