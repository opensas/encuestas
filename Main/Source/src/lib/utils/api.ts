import { DEFAULT_PAGE_LIMIT } from '$lib/constants/app';
import { INTERNAL_ERROR, OK } from '$lib/constants/http';
import { type AppError, appError, toAppError, toError } from '$lib/utils/errors';
import { err, ok, type Result } from '$lib/utils/result';

import { json } from '@sveltejs/kit';

export type FetchFn = typeof fetch;

export type QueryResponse<Entity> = {
	data: Entity[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
};

/**
 * Creates a JSON API response from a service Result
 */
export function jsonApi<T>(
	result: Result<T, AppError>,
	options: { successStatus?: number; errorStatus?: number } | number = {}
) {
	if (typeof options === 'number') options = { successStatus: options };

	if (!result.ok) {
		const status = options.errorStatus ?? result.error.status ?? INTERNAL_ERROR;
		return json(result.error, { status });
	}

	return json(result.data, { status: options.successStatus ?? OK });
}

type JsonErrorOptions = {
	err?: unknown;
	status?: number;
};
export function jsonError(title: string, options: JsonErrorOptions | number) {
	if (typeof options === 'number') options = { status: options };
	const { err, status = INTERNAL_ERROR } = options;

	console.error(title, err);
	const e = appError(title);
	e.status = status;
	if (err) {
		const error = toError(err);
		e.detail = `${error.name}: ${error.message}`;
	}
	return json(e, { status });
}

export function jsonQuery<Data extends object>(
	query: ParsedUrlQuery,
	data: Data[],
	total?: number
) {
	const { page, limit } = query;
	const totalPages = total === undefined ? undefined : total === 0 ? 0 : Math.ceil(total / limit);

	return json({
		data,
		meta: { total, page, limit, totalPages },
	});
}

export function toQueryString(params: Record<string, string> = {}): string {
	return Object.entries(params)
		.filter(([, value]) => !!value)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');
}

export type ParsedUrlQuery = ReturnType<typeof parseUrlQuery>;

export function parseUrlQuery(url: URL) {
	const conditions: Record<string, string> = {};
	for (const key of Array.from(url.searchParams.keys())) {
		if (!key.startsWith('_')) conditions[key] = url.searchParams.get(key)!;
	}

	const parsed = {
		page: Number(url.searchParams.get('_page')) || 1,
		limit: Number(url.searchParams.get('_limit')) || DEFAULT_PAGE_LIMIT,
		order: url.searchParams.get('_order') || '',
		fields: url.searchParams.get('_fields') || '',
		conditions,
	};
	return parsed;
}

export type HttpOptions = RequestInit & { fetch?: FetchFn };

function toBody(body: unknown) {
	if (typeof body === 'string') return body;
	return JSON.stringify(body);
}

export const http = {
	get: <T>(url: string, options: HttpOptions = {}) =>
		jsonFetch<T>(url, { ...options, method: 'GET' }),
	post: <T>(url: string, body: unknown, options: HttpOptions = {}) =>
		jsonFetch<T>(url, { ...options, method: 'POST', body: toBody(body) }),
	put: <T>(url: string, body: unknown, options: HttpOptions = {}) =>
		jsonFetch<T>(url, { ...options, method: 'PUT', body: toBody(body) }),
	del: <T>(url: string, options: HttpOptions = {}) =>
		jsonFetch<T>(url, { ...options, method: 'DELETE' }),
};

export async function jsonFetch<T>(
	url: string,
	options: HttpOptions = {}
): Promise<Result<T, AppError>> {
	const fetchFn = options.fetch || fetch;
	delete options.fetch;

	options.headers = { 'content-type': 'application/json', ...options.headers };

	try {
		const response = await fetchFn(url, options);
		const text = await response.text();

		// Content-Type check
		const contentType = response.headers.get('content-type') || '';

		// Handle non-2xx responses
		if (!response.ok) {
			// check for json error
			if (contentType.includes('application/json')) {
				// try to Parse JSON error
				try {
					const data = JSON.parse(text) as unknown;
					return err(toAppError(data));
				} catch (parseError) {
					return err(toAppError(`Failed to parse JSON error: ${(parseError as Error).message}`));
				}
			}
			const message = text || response.statusText;
			return err(toAppError(`HTTP ${response.status}: ${message}`));
		}

		if (!contentType.includes('application/json')) {
			return err(toAppError(`Expected JSON response but got: ${contentType}`));
		}

		// Parse JSON
		try {
			const data = JSON.parse(text) as T;

			return ok(data);
		} catch (parseError) {
			return err(toAppError(`Failed to parse JSON: ${(parseError as Error).message}`));
		}
	} catch (fetchError) {
		return err(toAppError(`Fetch failed: ${(fetchError as Error).message}`));
	}
}

export async function getFirst<T>(
	url: string,
	conditions: Record<string, string> = {},
	opt: HttpOptions
) {
	const cond = { ...conditions, _limit: '1' }; // force to get a single record
	const result = await http.get<QueryResponse<T>>(`${url}?${toQueryString(cond)}`, opt);
	if (!result.ok) return result;

	const query = result.data;
	if (query.data.length === 0) return err(toAppError('No se ha encontrado el registro'));

	return ok(query.data[0]);
}
