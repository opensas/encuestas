// buildWhere.test.ts
import type { ServiceFields } from '$lib/utils/service/service';

import { describe, expect, it } from 'vitest';

import { buildWhere } from '../prisma';

// Mock service fields for testing
const fields: ServiceFields = {
	name: { type: 'string', filter: true },
	age: { type: 'number', filter: true },
	category: { type: 'string', filter: true },
	email: { type: 'string', filter: false }, // Not allowed for filtering
	salary: { type: 'number', filter: true },
	isActive: { type: 'string', filter: true },
	createdAt: { type: 'string', filter: true },
};

// helper function to parse both syntax
// IN_VALUE_OPERATOR syntax (field=*aaa*) and SUFFIX_OPERATOR syntax (field_contains=aaa)
function testBothSyntaxes(
	inValueSyntaxCondition: Record<string, string>,
	suffixSyntaxCondition: Record<string, string> | undefined,
	expected: unknown
) {
	expect(buildWhere(inValueSyntaxCondition, fields)).toEqual(expected);

	if (suffixSyntaxCondition) expect(buildWhere(suffixSyntaxCondition, fields)).toEqual(expected);
}

describe('buildWhere', () => {
	it('should parse EQUAL conditions', () => {
		testBothSyntaxes(
			{ name: 'John' },
			{ name_eq: 'John' },
			{
				AND: [{ name: { equals: 'John' } }],
			}
		);
	});

	it('should parse NOT_EQUAL conditions with !=', () => {
		testBothSyntaxes(
			{ age: '!=30' },
			{ age_ne: '30' },
			{
				AND: [{ age: { not: 30 } }],
			}
		);
	});

	it('should parse NOT_EQUAL conditions with <>', () => {
		testBothSyntaxes(
			{ age: '<>30' },
			{ age_ne: '30' },
			{
				AND: [{ age: { not: 30 } }],
			}
		);
	});

	it('should parse BEGINS_WITH conditions', () => {
		testBothSyntaxes(
			{ name: 'Joh*' },
			{ name_begins: 'Joh' },
			{
				AND: [{ name: { startsWith: 'Joh' } }],
			}
		);
	});

	it('should parse ENDS_WITH conditions', () => {
		testBothSyntaxes(
			{ name: '*hn' },
			{ name_ends: 'hn' },
			{
				AND: [{ name: { endsWith: 'hn' } }],
			}
		);
	});

	it('should parse CONTAINS conditions', () => {
		testBothSyntaxes(
			{ name: '*oh*' },
			{ name_contains: 'oh' },
			{
				AND: [{ name: { contains: 'oh' } }],
			}
		);
	});

	it('should parse BETWEEN conditions', () => {
		testBothSyntaxes(
			{ age: '18..30' },
			{ age_between: '18,30' },
			{
				AND: [{ age: { gte: 18, lte: 30 } }],
			}
		);
	});

	it('should parse GREATER_THAN conditions', () => {
		testBothSyntaxes(
			{ age: '>30' },
			{ age_gt: '30' },
			{
				AND: [{ age: { gt: 30 } }],
			}
		);
	});

	it('should parse LESS_THAN conditions', () => {
		testBothSyntaxes(
			{ age: '<30' },
			{ age_lt: '30' },
			{
				AND: [{ age: { lt: 30 } }],
			}
		);
	});

	it('should parse GREATER_OR_EQUAL conditions', () => {
		testBothSyntaxes(
			{ age: '>=30' },
			{ age_gte: '30' },
			{
				AND: [{ age: { gte: 30 } }],
			}
		);
	});

	it('should parse LESS_OR_EQUAL conditions', () => {
		testBothSyntaxes(
			{ age: '<=30' },
			{ age_lte: '30' },
			{
				AND: [{ age: { lte: 30 } }],
			}
		);
	});

	it('should parse IN conditions', () => {
		testBothSyntaxes(
			{ category: 'books,electronics,clothing' },
			{ category_in: 'books,electronics,clothing' },
			{
				AND: [{ category: { in: ['books', 'electronics', 'clothing'] } }],
			}
		);
	});

	it('should handle multiple conditions', () => {
		testBothSyntaxes(
			{ name: 'John*', age: '>=30', category: 'books,electronics' },
			{ name_begins: 'John', age_gte: '30', category_in: 'books,electronics' },
			{
				AND: [
					{ name: { startsWith: 'John' } },
					{ age: { gte: 30 } },
					{ category: { in: ['books', 'electronics'] } },
				],
			}
		);
	});

	it('should handle empty IN values', () => {
		testBothSyntaxes(
			{ category: ',,' },
			{ category_in: ',,' },
			{ AND: [{ category: { in: [] } }] }
		);
	});

	it('should handle complex LIKE patterns', () => {
		testBothSyntaxes(
			{ name: '*john*doe*' },
			{ name_like: '*john*doe*' },
			{
				AND: [{ name: { contains: '%john%doe%' } }],
			}
		);
	});

	it('should throw error for fields with filter disabled', () => {
		expect(() => {
			buildWhere({ name: 'John', email: 'test@example.com' }, fields);
		}).toThrowError('Campos especificados inválidos');
		expect(() => {
			buildWhere({ name_eq: 'John', email_eq: 'test@example.com' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should throw error for fields not defined in serviceFields', () => {
		expect(() => {
			buildWhere({ name: 'John', unknownField: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
		expect(() => {
			buildWhere({ name_eq: 'John', unknownField_eq: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should return empty object when no valid conditions after filtering', () => {
		expect(() => {
			buildWhere({ email: 'test@example.com' }, fields);
		}).toThrowError('Campos especificados inválidos');
		expect(() => {
			buildWhere({ email_eq: 'test@example.com' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should return undefined when conditions is undefined', () => {
		const result = buildWhere(undefined, fields);
		expect(result).toBeUndefined();
	});

	it('should handle number conversion for numeric fields', () => {
		testBothSyntaxes(
			{ age: '25', salary: '>50000' },
			{ age_eq: '25', salary_gt: '50000' },
			{
				AND: [{ age: { equals: 25 } }, { salary: { gt: 50000 } }],
			}
		);
	});

	it('should handle invalid number conversion', () => {
		testBothSyntaxes(
			{ age: 'invalid', salary: '50000' },
			{ age_eq: 'invalid', salary_eq: '50000' },
			{
				AND: [{ salary: { equals: 50000 } }],
			}
		);
	});

	it('should throw error for invalid fields not allowed for filtering with correct message', () => {
		expect(() => {
			buildWhere({ invalidField: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
		expect(() => {
			buildWhere({ invalidField_eq: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should throw error for mixed valid and invalid fields with correct message', () => {
		expect(() => {
			buildWhere({ name: 'John', invalidField: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
		expect(() => {
			buildWhere({ name_eq: 'John', invalidField_eq: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should handle string fields with numeric values', () => {
		testBothSyntaxes(
			{ name: '123' },
			{ name_eq: '123' },
			{
				AND: [{ name: { equals: '123' } }],
			}
		);
	});

	it('should handle empty string values', () => {
		testBothSyntaxes(
			{ name: '' },
			{ name_eq: '' },
			{
				AND: [{ name: { equals: '' } }],
			}
		);
	});

	it('should throw error when all fields are invalid with correct message', () => {
		expect(() => {
			buildWhere({ invalidField1: 'value1', invalidField2: 'value2' }, fields);
		}).toThrowError('Campos especificados inválidos');
		expect(() => {
			buildWhere({ invalidField1_eq: 'value1', invalidField2_eq: 'value2' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should throw error for fields with filter disabled with correct message', () => {
		expect(() => {
			buildWhere({ email: 'test@example.com' }, fields);
		}).toThrowError('Campos especificados inválidos');
		expect(() => {
			buildWhere({ email_eq: 'test@example.com' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should throw error for mixed filter-disabled and undefined fields with correct message', () => {
		expect(() => {
			buildWhere({ email: 'test@example.com', unknownField: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
		expect(() => {
			buildWhere({ email_eq: 'test@example.com', unknownField_eq: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should work correctly with only valid, filter-enabled fields', () => {
		testBothSyntaxes(
			{ name: 'John', age: '25' },
			{ name_eq: 'John', age_eq: '25' },
			{
				AND: [{ name: { equals: 'John' } }, { age: { equals: 25 } }],
			}
		);
	});

	// LIKE operator tests
	it('should parse LIKE conditions with multiple wildcards', () => {
		testBothSyntaxes(
			{ name: 'a*b*c*d' },
			{ name_like: 'a*b*c*d' },
			{
				AND: [{ name: { contains: 'a%b%c%d' } }],
			}
		);
	});

	it('should parse LIKE conditions with wildcard at start and middle', () => {
		testBothSyntaxes(
			{ name: '*a*b' },
			{ name_like: '*a*b' },
			{
				AND: [{ name: { contains: '%a%b' } }],
			}
		);
	});

	it('should parse LIKE conditions with wildcard at end and middle', () => {
		testBothSyntaxes(
			{ name: 'a*b*' },
			{ name_like: 'a*b*' },
			{
				AND: [{ name: { contains: 'a%b%' } }],
			}
		);
	});

	it('should handle LIKE with mixed operators', () => {
		testBothSyntaxes(
			{ name: 'j*o*h*n', age: '>=30', category: 'books,electronics' },
			{ name_like: 'j*o*h*n', age_gte: '30', category_in: 'books,electronics' },
			{
				AND: [
					{ name: { contains: 'j%o%h%n' } },
					{ age: { gte: 30 } },
					{ category: { in: ['books', 'electronics'] } },
				],
			}
		);
	});

	it('should sanitize duplicate asterisks in LIKE', () => {
		testBothSyntaxes(
			{ name: '**a**b**' },
			{ name_like: '**a**b**' },
			{
				AND: [{ name: { contains: '%a%b%' } }],
			}
		);
	});

	it('should handle LIKE pattern with no wildcards (edge case)', () => {
		testBothSyntaxes({ name: 'john' }, undefined, {
			AND: [{ name: { equals: 'john' } }],
		});
	});

	it('should ignore LIKE pattern with only wildcards', () => {
		testBothSyntaxes({ name: '****' }, { name_like: '****' }, {});
	});
});
