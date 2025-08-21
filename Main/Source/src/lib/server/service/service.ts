// Common service utilities and types
import { DEFAULT_PAGE_LIMIT } from '$lib/constants/app';
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
			type?: string;
			order?: boolean;
			filter?: boolean;
			read?: boolean;
			create?: boolean;
			update?: boolean;
		};
	};
};

type ServiceFields = ServiceDefinition['fields'];

export type ReadParams = {
	page?: number;
	limit?: number;
	order?: string;
	fields?: string;
	conditions?: Record<string, string>;
};

export function parseRead(
	{ page, limit, order, fields, conditions }: ReadParams = {},
	settings: ServiceDefinition
) {
	if (page && !limit) limit = DEFAULT_PAGE_LIMIT;

	const { fields: serviceFields, defaultOrder } = settings;

	const query = {
		...(page && limit && { skip: (page - 1) * limit, take: limit }),
		select: parseSelect(fields, serviceFields),
		where: parseWhere(conditions, serviceFields),
		orderBy: parseOrderBy(order, serviceFields, defaultOrder),
	};
	return query;
}

export function filterFields(fields: ServiceFields, prop: keyof ServiceFields[string]) {
	return Object.keys(fields).filter((field) => fields[field][prop] ?? true);
}

function checkInvalidFields(fields: string[], validFields?: string[]) {
	if (fields.length === 0 || !validFields || validFields.length === 0) return;
	const invalid = fields.filter((field) => !validFields?.includes(parseField(field)));
	if (invalid.length) {
		throw new Error(
			`Campos especificados inválidos: ${invalid.join(', ')}. Campos válidos: ${validFields.join(', ')}`
		);
	}
}

function parseSelect(fields: ReadParams['fields'], serviceFields: ServiceFields) {
	let keys = (fields || '')
		.split(',')
		.map((field) => field.trim())
		.filter(Boolean);

	const validFields = filterFields(serviceFields, 'read');
	if (keys.length === 0 && validFields && validFields.length > 0) keys = validFields;

	if (keys.length === 0) return undefined;

	checkInvalidFields(keys, validFields);

	return keys.reduce(
		(fields, field) => {
			fields[field] = true;
			return fields;
		},
		{} as Record<string, true>
	);
}

type ConditionType = string | number;

export function parseWhere(conditions: ReadParams['conditions'], serviceFields: ServiceFields) {
	if (!conditions) return undefined;

	const keys = filterFields(serviceFields, 'filter');
	checkInvalidFields(Object.keys(conditions), keys);

	return keys.reduce(
		(fields, field) => {
			let value: ConditionType | undefined = conditions?.[field];
			if (!value) return fields;

			if (serviceFields[field].type === 'number') value = Number(value);
			// add more conversions as needed

			fields[field] = value;
			return fields;
		},
		{} as Record<string, ConditionType>
	);
}

/**
 * Parses an order string into an array of Prisma orderBy objects
 * @template O - The Order type (extends Record<string, 'asc' | 'desc'>)
 * @param {string | null} orderString - Comma-separated string of fields to order by (prefix with + for asc or - for desc)
 * @param {string[]} [validFields] - Optional array of valid field names to validate against
 * @param {O[]} [defaultOrder=[]] - Default order to return if orderString is empty or invalid
 * @returns {O[]} Array of Prisma orderBy objects
 * @throws {Error} If an invalid field is provided and validFields is specified
 *
 * @example
 * parseOrder<Prisma.RespuestaOrderByWithRelationInput>('id,+name,-createdAt', ['id', 'name', 'createdAt'])
 * => [{ id: 'asc' }, { name: 'asc' }, { createdAt: 'desc' }]
 *
 * @example
 * parseOrder<Prisma.UserOrderByWithRelationInput>(null, undefined, [{ id: 'desc' }])
 * => [{ id: 'desc' }]
 */

type Order = Record<string, 'asc' | 'desc'>;
function parseOrderBy<O extends Order>(
	orderString: string | undefined,
	serviceFields: ServiceFields,
	defaultOrder: string = ''
): O[] {
	if (!orderString?.trim()) orderString = defaultOrder;

	// remove empty orders
	const orders = orderString.split(',').filter((order) => !!parseField(order));

	checkInvalidFields(orders, filterFields(serviceFields, 'order'));

	return orders.map((order) => {
		const field = parseField(order); // remove leading + or -
		return { [field]: parseDirection(order) } as O;
	});
}

const parseField = (field: string) => field.trim().replace(/^[-+]/, '');
const parseDirection = (order: string) => (order.trim().startsWith('-') ? 'desc' : 'asc');
