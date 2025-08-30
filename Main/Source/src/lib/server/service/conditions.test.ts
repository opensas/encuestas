// conditionParser.test.ts
import { describe, expect, it } from 'vitest';

import { parseConditions } from './conditions';

describe('conditionParser', () => {
	it('should parse EQUAL conditions', () => {
		const result = parseConditions({ name: 'John' });
		expect(result).toEqual([{ field: 'name', operator: 'EQUAL', value: 'John' }]);
	});

	it('should parse NOT_EQUAL conditions with !=', () => {
		const result = parseConditions({ age: '!=30' });
		expect(result).toEqual([{ field: 'age', operator: 'NOT_EQUAL', value: '30' }]);
	});

	it('should parse NOT_EQUAL conditions with <>', () => {
		const result = parseConditions({ age: '<>30' });
		expect(result).toEqual([{ field: 'age', operator: 'NOT_EQUAL', value: '30' }]);
	});

	it('should parse BEGINS_WITH conditions', () => {
		const result = parseConditions({ name: 'Joh*' });
		expect(result).toEqual([{ field: 'name', operator: 'BEGINS_WITH', value: 'Joh' }]);
	});

	it('should parse ENDS_WITH conditions', () => {
		const result = parseConditions({ name: '*hn' });
		expect(result).toEqual([{ field: 'name', operator: 'ENDS_WITH', value: 'hn' }]);
	});

	it('should parse CONTAINS conditions', () => {
		const result = parseConditions({ name: '*oh*' });
		expect(result).toEqual([{ field: 'name', operator: 'CONTAINS', value: 'oh' }]);
	});

	it('should parse BETWEEN conditions', () => {
		const result = parseConditions({ age: '18..30' });
		expect(result).toEqual([{ field: 'age', operator: 'BETWEEN', min: '18', max: '30' }]);
	});

	it('should parse GREATER_THAN conditions', () => {
		const result = parseConditions({ age: '>30' });
		expect(result).toEqual([{ field: 'age', operator: 'GREATER_THAN', value: '30' }]);
	});

	it('should parse LESS_THAN conditions', () => {
		const result = parseConditions({ age: '<30' });
		expect(result).toEqual([{ field: 'age', operator: 'LESS_THAN', value: '30' }]);
	});

	it('should parse GREATER_OR_EQUAL conditions', () => {
		const result = parseConditions({ age: '>=30' });
		expect(result).toEqual([{ field: 'age', operator: 'GREATER_OR_EQUAL', value: '30' }]);
	});

	it('should parse LESS_OR_EQUAL conditions', () => {
		const result = parseConditions({ age: '<=30' });
		expect(result).toEqual([{ field: 'age', operator: 'LESS_OR_EQUAL', value: '30' }]);
	});

	it('should parse IN conditions', () => {
		const result = parseConditions({ category: 'books;electronics;clothing' });
		expect(result).toEqual([
			{
				field: 'category',
				operator: 'IN',
				values: ['books', 'electronics', 'clothing'],
			},
		]);
	});

	it('should handle multiple conditions', () => {
		const result = parseConditions({
			name: 'John*',
			age: '>=30',
			category: 'books;electronics',
		});

		expect(result).toEqual([
			{ field: 'name', operator: 'BEGINS_WITH', value: 'John' },
			{ field: 'age', operator: 'GREATER_OR_EQUAL', value: '30' },
			{ field: 'category', operator: 'IN', values: ['books', 'electronics'] },
		]);
	});

	it('should handle empty IN values', () => {
		const result = parseConditions({ category: ';;' });
		expect(result).toEqual([{ field: 'category', operator: 'IN', values: [] }]);
	});

	it('should handle complex CONTAINS patterns', () => {
		const result = parseConditions({ name: '*john*doe*' });
		expect(result).toEqual([{ field: 'name', operator: 'CONTAINS', value: 'john*doe' }]);
	});
});
