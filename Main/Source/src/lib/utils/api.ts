import { DEFAULT_PAGE_LIMIT } from '$lib/constants/app';
import { INTERNAL_ERROR, OK } from '$lib/constants/http';
import { appError, type AppProblem, toError } from '$lib/utils/errors';
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
	result: Result<T, AppProblem>,
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

type Options = RequestInit & { fetchFn?: FetchFn };

// ### TODO: usar Result<Ok | Error>
export async function jsonFetch1<T>(url: string, options: Options = {}) {
	const fetchFn = options.fetchFn || fetch;
	delete options.fetchFn;
	options.headers = { 'Content-Type': 'application/json', ...options.headers };

	const response = await fetchFn(url, options);
	const result = await response.json();
	return result as T;
}

function toBody(body: unknown) {
	if (typeof body === 'string') return body;
	return JSON.stringify(body);
}

export const api = {
	get: <T>(url: string, options: Options = {}) => jsonFetch<T>(url, { ...options, method: 'GET' }),
	post: <T>(url: string, body: unknown, options: Options = {}) =>
		jsonFetch<T>(url, { ...options, method: 'POST', body: toBody(body) }),
	put: <T>(url: string, body: unknown, options: Options = {}) =>
		jsonFetch<T>(url, { ...options, method: 'PUT', body: toBody(body) }),
	del: <T>(url: string, options: Options = {}) =>
		jsonFetch<T>(url, { ...options, method: 'DELETE' }),
};

export async function jsonFetch<T>(url: string, options: Options = {}): Promise<Result<T, string>> {
	const fetchFn = options.fetchFn || fetch;
	delete options.fetchFn;

	options.headers = { 'Content-Type': 'application/json', ...options.headers };

	try {
		const response = await fetchFn(url, options);
		const text = await response.text();

		// Handle non-2xx responses
		if (!response.ok) {
			const message = text || response.statusText;
			return err(`HTTP ${response.status}: ${message}`);
		}

		// Empty body handling
		if (!text) {
			if (options.method?.toUpperCase() === 'DELETE') {
				return ok<T>(null as unknown as T); // only DELETE can return null
			} else {
				return err('Empty response body, expected JSON');
			}
		}

		// Content-Type check
		const contentType = response.headers.get('content-type') || '';
		if (!contentType.includes('application/json')) {
			return err(`Expected JSON response but got: ${contentType}`);
		}

		// Parse JSON
		try {
			const data = JSON.parse(text) as T;
			return ok(data);
		} catch (parseError) {
			return err(`Failed to parse JSON: ${(parseError as Error).message}`);
		}
	} catch (fetchError) {
		return err(`Fetch failed: ${(fetchError as Error).message}`);
	}
}
