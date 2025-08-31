import { DEFAULT_PAGE_LIMIT } from '$lib/constants/app';
import { parseConditions, type ParsedCondition } from '$lib/utils/service/conditions';
import { parseOrder } from '$lib/utils/service/order';
import type {
	ReadParams,
	ServiceDefinition,
	ServiceFields,
	ServiceFieldType,
} from '$lib/utils/service/service';
import { checkInvalidFields, filterFields } from '$lib/utils/service/service';

export function buildQuery(
	{ page, limit, order, fields, conditions }: ReadParams = {},
	settings: ServiceDefinition
) {
	if (page && !limit) limit = DEFAULT_PAGE_LIMIT;

	const { fields: serviceFields, defaultOrder } = settings;

	const query = {
		...(page && limit && { skip: (page - 1) * limit, take: limit }),
		select: buildSelect(fields, serviceFields),
		where: buildWhere(conditions, serviceFields),
		orderBy: buildOrderBy(order, serviceFields, defaultOrder),
	};
	return query;
}

type ConditionType = string | number;

export function buildWhere(conditions: ReadParams['conditions'], serviceFields: ServiceFields) {
	if (!conditions) return undefined;

	const keys = filterFields(serviceFields, 'filter');
	checkInvalidFields(Object.keys(conditions), keys);

	const parsed = parseConditions(conditions);
	const where = [];

	for (const condition of parsed) {
		const config = serviceFields[condition.field];

		// Skip if field doesn't exist or filtering is disabled
		if (!config || config.filter === false) continue;

		const fieldCondition = buildFieldCondition(condition, config.type);
		if (fieldCondition) where.push({ [condition.field]: fieldCondition });
	}

	// If no conditions were added, return empty object
	if (where.length === 0) return {};
	return { AND: where };
}

type PrismaCondition =
	| { equals: ConditionType } // EQUAL
	| { not: ConditionType } // NOT_EQUAL
	| { startsWith: ConditionType } // BEGINS_WITH
	| { endsWith: ConditionType } // ENDS_WITH
	| { contains: ConditionType } // CONTAINS
	| { gt: ConditionType } // GREATER_THAN
	| { lt: ConditionType } // LESS_THAN
	| { gte: ConditionType; lte: ConditionType } // BETWEEN
	| { gte: ConditionType } // GREATER_OR_EQUAL
	| { lte: ConditionType } // LESS_OR_EQUAL
	| { in: ConditionType[] }; // IN

function buildFieldCondition(
	condition: ParsedCondition,
	type?: ServiceFieldType
): PrismaCondition | null {
	const op = condition.operator;

	if ('value' in condition) {
		const value = convert(condition.value.trim(), type);
		if (value === null) return null;

		if (op === 'EQUAL') return { equals: value };
		if (op === 'NOT_EQUAL') return { not: value };

		if (op === 'GREATER_THAN') return { gt: value };
		if (op === 'LESS_THAN') return { lt: value };
		if (op === 'GREATER_OR_EQUAL') return { gte: value };
		if (op === 'LESS_OR_EQUAL') return { lte: value };

		if (op === 'BEGINS_WITH') return { startsWith: value };
		if (op === 'ENDS_WITH') return { endsWith: value };
		if (op === 'CONTAINS') return { contains: value };
	}

	if (op === 'BETWEEN') {
		const min = convert(condition.min, type);
		const max = convert(condition.max, type);
		if (min === null || max === null) return null;
		return { gte: min, lte: max };
	}

	if (op === 'IN') {
		const values = condition.values
			.map((val) => convert(val, type))
			.filter(Boolean) as ConditionType[];
		return { in: values };
	}
	return null;
}

function convert(value: string, fieldType?: ServiceFieldType): string | number | null {
	if (!fieldType) return value;

	if (fieldType === 'string') return value;
	if (fieldType === 'number') {
		const num = Number(value);
		return isNaN(num) ? null : num;
	}
	return value;
}

function buildSelect(fields: ReadParams['fields'], serviceFields: ServiceFields) {
	let keys = (fields || '')
		.split(',')
		.map((field) => field.trim())
		.filter(Boolean);

	const validFields = filterFields(serviceFields, 'read');
	if (keys.length === 0 && validFields.length > 0) keys = validFields;

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
function buildOrderBy<O extends Order>(
	orderString: string | undefined,
	serviceFields: ServiceFields,
	defaultOrder: string = ''
): O[] {
	const parsed = parseOrder(orderString, serviceFields, defaultOrder);

	return parsed.map((order) => ({ [order.field]: order.direction }) as O);
}
