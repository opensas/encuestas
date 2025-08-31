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

describe('buildWhere', () => {
	it('should parse EQUAL conditions', () => {
		const result = buildWhere({ name: 'John' }, fields);
		expect(result).toEqual({
			AND: [{ name: { equals: 'John' } }],
		});
	});

	it('should parse NOT_EQUAL conditions with !=', () => {
		const result = buildWhere({ age: '!=30' }, fields);
		expect(result).toEqual({
			AND: [{ age: { not: 30 } }],
		});
	});

	it('should parse NOT_EQUAL conditions with <>', () => {
		const result = buildWhere({ age: '<>30' }, fields);
		expect(result).toEqual({
			AND: [{ age: { not: 30 } }],
		});
	});

	it('should parse BEGINS_WITH conditions', () => {
		const result = buildWhere({ name: 'Joh*' }, fields);
		expect(result).toEqual({
			AND: [{ name: { startsWith: 'Joh' } }],
		});
	});

	it('should parse ENDS_WITH conditions', () => {
		const result = buildWhere({ name: '*hn' }, fields);
		expect(result).toEqual({
			AND: [{ name: { endsWith: 'hn' } }],
		});
	});

	it('should parse CONTAINS conditions', () => {
		const result = buildWhere({ name: '*oh*' }, fields);
		expect(result).toEqual({
			AND: [{ name: { contains: 'oh' } }],
		});
	});

	it('should parse BETWEEN conditions', () => {
		const result = buildWhere({ age: '18..30' }, fields);
		expect(result).toEqual({
			AND: [{ age: { gte: 18, lte: 30 } }],
		});
	});

	it('should parse GREATER_THAN conditions', () => {
		const result = buildWhere({ age: '>30' }, fields);
		expect(result).toEqual({
			AND: [{ age: { gt: 30 } }],
		});
	});

	it('should parse LESS_THAN conditions', () => {
		const result = buildWhere({ age: '<30' }, fields);
		expect(result).toEqual({
			AND: [{ age: { lt: 30 } }],
		});
	});

	it('should parse GREATER_OR_EQUAL conditions', () => {
		const result = buildWhere({ age: '>=30' }, fields);
		expect(result).toEqual({
			AND: [{ age: { gte: 30 } }],
		});
	});

	it('should parse LESS_OR_EQUAL conditions', () => {
		const result = buildWhere({ age: '<=30' }, fields);
		expect(result).toEqual({
			AND: [{ age: { lte: 30 } }],
		});
	});

	it('should parse IN conditions', () => {
		const result = buildWhere({ category: 'books;electronics;clothing' }, fields);
		expect(result).toEqual({
			AND: [{ category: { in: ['books', 'electronics', 'clothing'] } }],
		});
	});

	it('should handle multiple conditions', () => {
		const result = buildWhere(
			{
				name: 'John*',
				age: '>=30',
				category: 'books;electronics',
			},
			fields
		);

		expect(result).toEqual({
			AND: [
				{ name: { startsWith: 'John' } },
				{ age: { gte: 30 } },
				{ category: { in: ['books', 'electronics'] } },
			],
		});
	});

	it('should handle empty IN values', () => {
		const result = buildWhere({ category: ';;' }, fields);
		expect(result).toEqual({
			AND: [{ category: { in: [] } }],
		});
	});

	it('should handle complex CONTAINS patterns', () => {
		const result = buildWhere({ name: '*john*doe*' }, fields);
		expect(result).toEqual({
			AND: [{ name: { contains: 'john*doe' } }],
		});
	});

	it('should throw error for fields with filter disabled', () => {
		expect(() => {
			buildWhere({ name: 'John', email: 'test@example.com' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should throw error for fields not defined in serviceFields', () => {
		expect(() => {
			buildWhere({ name: 'John', unknownField: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should return empty object when no valid conditions after filtering', () => {
		// This should never happen now since invalid fields throw errors
		// But if somehow only filter-disabled fields are provided, it should throw
		expect(() => {
			buildWhere({ email: 'test@example.com' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should return undefined when conditions is undefined', () => {
		const result = buildWhere(undefined, fields);
		expect(result).toBeUndefined();
	});

	it('should handle number conversion for numeric fields', () => {
		const result = buildWhere({ age: '25', salary: '>50000' }, fields);
		expect(result).toEqual({
			AND: [{ age: { equals: 25 } }, { salary: { gt: 50000 } }],
		});
	});

	it('should handle invalid number conversion', () => {
		const result = buildWhere({ age: 'invalid', salary: '50000' }, fields);
		expect(result).toEqual({
			AND: [{ salary: { equals: 50000 } }],
		});
	});

	it('should throw error for invalid fields not allowed for filtering with correct message', () => {
		expect(() => {
			buildWhere({ invalidField: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should throw error for mixed valid and invalid fields with correct message', () => {
		expect(() => {
			buildWhere({ name: 'John', invalidField: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should handle string fields with numeric values', () => {
		const result = buildWhere({ name: '123' }, fields);
		expect(result).toEqual({
			AND: [{ name: { equals: '123' } }],
		});
	});

	it('should handle empty string values', () => {
		const result = buildWhere({ name: '' }, fields);
		expect(result).toEqual({
			AND: [{ name: { equals: '' } }],
		});
	});

	it('should throw error when all fields are invalid with correct message', () => {
		expect(() => {
			buildWhere({ invalidField1: 'value1', invalidField2: 'value2' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should throw error for fields with filter disabled with correct message', () => {
		expect(() => {
			buildWhere({ email: 'test@example.com' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should throw error for mixed filter-disabled and undefined fields with correct message', () => {
		expect(() => {
			buildWhere({ email: 'test@example.com', unknownField: 'value' }, fields);
		}).toThrowError('Campos especificados inválidos');
	});

	it('should work correctly with only valid, filter-enabled fields', () => {
		const result = buildWhere({ name: 'John', age: '25' }, fields);
		expect(result).toEqual({
			AND: [{ name: { equals: 'John' } }, { age: { equals: 25 } }],
		});
	});
});
