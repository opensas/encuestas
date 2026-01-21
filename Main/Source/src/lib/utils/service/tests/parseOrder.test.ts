import type { ServiceFields } from '$lib/utils/service/service';

import { describe, expect, it } from 'vitest';

import { parseOrder } from '../order';

// Mock service fields for testing
const fields: ServiceFields = {
	id: { type: 'number', order: true },
	name: { type: 'string', order: true },
	surname: { type: 'string', order: true },
	date: { type: 'string', order: true },
	salary: { type: 'number', order: true },
	email: { type: 'string', order: false }, // Not allowed for ordering
	createdAt: { type: 'string', order: true },
	updatedAt: { type: 'string', order: true },
} as const;

describe('parseOrder', () => {
	it('should parse basic order string with explicit directions', () => {
		const result = parseOrder('+id,+name,-date', fields);

		expect(result).toEqual([
			{ field: 'id', direction: 'asc' },
			{ field: 'name', direction: 'asc' },
			{ field: 'date', direction: 'desc' },
		]);
	});

	it('should parse order string with implicit ascending direction', () => {
		const result = parseOrder('name,surname,-salary', fields);

		expect(result).toEqual([
			{ field: 'name', direction: 'asc' },
			{ field: 'surname', direction: 'asc' },
			{ field: 'salary', direction: 'desc' },
		]);
	});

	it('should use default order when orderString is empty', () => {
		const result = parseOrder('', fields, 'name,-id');

		expect(result).toEqual([
			{ field: 'name', direction: 'asc' },
			{ field: 'id', direction: 'desc' },
		]);
	});

	it('should use default order when orderString is undefined', () => {
		const result = parseOrder(undefined, fields, '-date,name');

		expect(result).toEqual([
			{ field: 'date', direction: 'desc' },
			{ field: 'name', direction: 'asc' },
		]);
	});

	it('should use default order when orderString is only whitespace', () => {
		const result = parseOrder('   ', fields, 'id');

		expect(result).toEqual([{ field: 'id', direction: 'asc' }]);
	});

	it('should handle single field order', () => {
		const result = parseOrder('-name', fields);

		expect(result).toEqual([{ field: 'name', direction: 'desc' }]);
	});

	it('should trim whitespace from fields', () => {
		const result = parseOrder('  name  ,  -id  ,  +date  ', fields);

		expect(result).toEqual([
			{ field: 'name', direction: 'asc' },
			{ field: 'id', direction: 'desc' },
			{ field: 'date', direction: 'asc' },
		]);
	});

	it('should filter out empty fields', () => {
		const result = parseOrder('name,, -id, ,+date', fields);

		expect(result).toEqual([
			{ field: 'name', direction: 'asc' },
			{ field: 'id', direction: 'desc' },
			{ field: 'date', direction: 'asc' },
		]);
	});

	it('should throw error for invalid fields not allowed for ordering', () => {
		expect(() => {
			parseOrder('email,-name', fields);
		}).toThrowError(); // Assuming checkInvalidFields throws an error
	});

	it('should throw error when all fields are invalid', () => {
		expect(() => {
			parseOrder('invalidField,anotherInvalid', fields);
		}).toThrowError();
	});

	it('should handle mixed valid and invalid fields (valid ones should be parsed before error)', () => {
		// This test assumes checkInvalidFields is called after parsing all fields
		expect(() => {
			parseOrder('name,invalidField,id', fields);
		}).toThrowError();
	});

	it('should handle complex order strings with various patterns', () => {
		const result = parseOrder('+id,-name,createdAt,-updatedAt', fields);

		expect(result).toEqual([
			{ field: 'id', direction: 'asc' },
			{ field: 'name', direction: 'desc' },
			{ field: 'createdAt', direction: 'asc' },
			{ field: 'updatedAt', direction: 'desc' },
		]);
	});

	it('should handle complex order strings with various patterns', () => {
		const result = parseOrder('+id,-name,createdAt,-updatedAt', fields);

		expect(result).toEqual([
			{ field: 'id', direction: 'asc' },
			{ field: 'name', direction: 'desc' },
			{ field: 'createdAt', direction: 'asc' },
			{ field: 'updatedAt', direction: 'desc' },
		]);
	});

	it('should handle fields with special characters (if allowed by service)', () => {
		// This would depend on your service fields definition
		const specialFields = {
			...fields,
			'user.name': { type: 'string', order: true },
			'user-age': { type: 'number', order: true },
		} as const;

		const result = parseOrder('+user.name,-user-age', specialFields);

		expect(result).toEqual([
			{ field: 'user.name', direction: 'asc' },
			{ field: 'user-age', direction: 'desc' },
		]);
	});

	it('should return empty array when both orderString and defaultOrder are empty', () => {
		const result = parseOrder('', fields, '');

		expect(result).toEqual([]);
	});

	it('should handle default order with complex patterns', () => {
		const result = parseOrder('', fields, '+id,-name,createdAt');

		expect(result).toEqual([
			{ field: 'id', direction: 'asc' },
			{ field: 'name', direction: 'desc' },
			{ field: 'createdAt', direction: 'asc' },
		]);
	});
});

// Additional tests for edge cases
describe('parseOrder edge cases', () => {
	it('should handle fields that start with + or - in their name', () => {
		const specialFields = {
			...fields,
			'+special': { type: 'string', order: true },
			'-special': { type: 'string', order: true },
		} as const;

		const result = parseOrder('++special,--special', specialFields);

		expect(result).toEqual([
			{ field: '+special', direction: 'asc' },
			{ field: '-special', direction: 'desc' },
		]);
	});

	it('should handle very long order strings', () => {
		const longOrder = 'id,name,date,salary,createdAt,updatedAt';
		const result = parseOrder(longOrder, fields);

		expect(result).toHaveLength(6);
		expect(result.every((order) => order.direction === 'asc')).toBe(true);
	});
});
