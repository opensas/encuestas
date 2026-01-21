// conditionParser.test.ts with fields with suffix
import { describe, expect, it } from 'vitest';

import { parseConditions } from '../conditions';

// helper function to parse both syntax
// IN_VALUE_OPERATOR syntax (field=*aaa*) and SUFFIX_OPERATOR syntax (field_contains=aaa)
function testBothSyntaxes(
	inValueSyntaxCondition: Record<string, string>,
	suffixSyntaxCondition: Record<string, string>,
	expected: unknown[]
) {
	expect(parseConditions(inValueSyntaxCondition)).toEqual(expected);

	if (suffixSyntaxCondition) expect(parseConditions(suffixSyntaxCondition)).toEqual(expected);
}

describe('conditionParser', () => {
	it('should parse EQUAL conditions', () => {
		testBothSyntaxes({ name: 'John' }, { name_eq: 'John' }, [
			{ field: 'name', operator: 'EQUAL', value: 'John' },
		]);
	});

	it('should parse NOT_EQUAL conditions with !=', () => {
		testBothSyntaxes({ age: '!=30' }, { age_ne: '30' }, [
			{ field: 'age', operator: 'NOT_EQUAL', value: '30' },
		]);
	});

	it('should parse NOT_EQUAL conditions with <>', () => {
		testBothSyntaxes({ age: '<>30' }, { age_ne: '30' }, [
			{ field: 'age', operator: 'NOT_EQUAL', value: '30' },
		]);
	});

	it('should parse BEGINS_WITH conditions', () => {
		testBothSyntaxes({ name: 'Joh*' }, { name_begins: 'Joh' }, [
			{ field: 'name', operator: 'BEGINS_WITH', value: 'Joh' },
		]);
	});

	it('should parse ENDS_WITH conditions', () => {
		testBothSyntaxes({ name: '*hn' }, { name_ends: 'hn' }, [
			{ field: 'name', operator: 'ENDS_WITH', value: 'hn' },
		]);
	});

	it('should parse CONTAINS conditions', () => {
		testBothSyntaxes({ name: '*oh*' }, { name_contains: 'oh' }, [
			{ field: 'name', operator: 'CONTAINS', value: 'oh' },
		]);
	});

	it('should parse BETWEEN conditions', () => {
		testBothSyntaxes({ age: '18..30' }, { age_between: '18,30' }, [
			{ field: 'age', operator: 'BETWEEN', min: '18', max: '30' },
		]);
	});

	it('should parse GREATER_THAN conditions', () => {
		testBothSyntaxes({ age: '>30' }, { age_gt: '30' }, [
			{ field: 'age', operator: 'GREATER_THAN', value: '30' },
		]);
	});

	it('should parse LESS_THAN conditions', () => {
		testBothSyntaxes({ age: '<30' }, { age_lt: '30' }, [
			{ field: 'age', operator: 'LESS_THAN', value: '30' },
		]);
	});

	it('should parse GREATER_OR_EQUAL conditions', () => {
		testBothSyntaxes({ age: '>=30' }, { age_gte: '30' }, [
			{ field: 'age', operator: 'GREATER_OR_EQUAL', value: '30' },
		]);
	});

	it('should parse LESS_OR_EQUAL conditions', () => {
		testBothSyntaxes({ age: '<=30' }, { age_lte: '30' }, [
			{ field: 'age', operator: 'LESS_OR_EQUAL', value: '30' },
		]);
	});

	it('should parse IN conditions', () => {
		testBothSyntaxes(
			{ category: 'books,electronics,clothing' },
			{ category_in: 'books,electronics,clothing' },
			[{ field: 'category', operator: 'IN', values: ['books', 'electronics', 'clothing'] }]
		);
	});

	it('should handle multiple conditions', () => {
		testBothSyntaxes(
			{ name: 'John*', age: '>=30', category: 'books,electronics' },
			{ name_begins: 'John', age_gte: '30', category_in: 'books,electronics' },
			[
				{ field: 'name', operator: 'BEGINS_WITH', value: 'John' },
				{ field: 'age', operator: 'GREATER_OR_EQUAL', value: '30' },
				{ field: 'category', operator: 'IN', values: ['books', 'electronics'] },
			]
		);
	});

	it('should handle empty IN values', () => {
		testBothSyntaxes({ category: ',,' }, { category_in: ',,' }, [
			{ field: 'category', operator: 'IN', values: [] },
		]);
	});

	it('should handle complex LIKE patterns', () => {
		testBothSyntaxes({ name: '*john*doe*' }, { name_like: '*john*doe*' }, [
			{ field: 'name', operator: 'LIKE', value: '%john%doe%' },
		]);
	});

	// LIKE operator tests
	it('should parse LIKE conditions with wildcard in middle', () => {
		testBothSyntaxes({ name: 'j*h*n' }, { name_like: 'j*h*n' }, [
			{ field: 'name', operator: 'LIKE', value: 'j%h%n' },
		]);
	});

	it('should parse LIKE conditions with multiple wildcards', () => {
		testBothSyntaxes({ code: 'a*b*c*d' }, { code_like: 'a*b*c*d' }, [
			{ field: 'code', operator: 'LIKE', value: 'a%b%c%d' },
		]);
	});

	it('should parse LIKE conditions with wildcard at start but not end', () => {
		testBothSyntaxes({ name: '*john' }, { name_ends: 'john' }, [
			{ field: 'name', operator: 'ENDS_WITH', value: 'john' },
		]);
	});

	it('should parse LIKE conditions with wildcard at end but not start as BEGINS_WITH', () => {
		testBothSyntaxes({ name: 'john*' }, { name_begins: 'john' }, [
			{ field: 'name', operator: 'BEGINS_WITH', value: 'john' },
		]);
	});

	it('should parse LIKE conditions with wildcards at both ends as CONTAINS', () => {
		testBothSyntaxes({ name: '*john*' }, { name_contains: 'john' }, [
			{ field: 'name', operator: 'CONTAINS', value: 'john' },
		]);
	});

	it('should parse LIKE conditions with complex pattern', () => {
		testBothSyntaxes({ pattern: 'start*middle*end' }, { pattern_like: 'start*middle*end' }, [
			{ field: 'pattern', operator: 'LIKE', value: 'start%middle%end' },
		]);
	});

	it('should handle mixed LIKE and other operators', () => {
		testBothSyntaxes(
			{ name: 'j%h*n', age: '>=30', category: 'books,electronics' },
			{ name_like: 'j%h*n', age_gte: '30', category_in: 'books,electronics' },
			[
				{ field: 'name', operator: 'LIKE', value: 'j%h%n' },
				{ field: 'age', operator: 'GREATER_OR_EQUAL', value: '30' },
				{ field: 'category', operator: 'IN', values: ['books', 'electronics'] },
			]
		);
	});

	it('should ignore single wildcard as LIKE', () => {
		testBothSyntaxes({ empty: '*' }, { empty_like: '*' }, []);
	});

	it('should ignore empty string with wildcard as LIKE', () => {
		testBothSyntaxes({ empty: '**' }, { empty_like: '**' }, []);
	});

	// sanitize wildcards
	it('should sanitize multiple wildcards in BEGINS_WITH', () => {
		testBothSyntaxes({ name: 'John**' }, { name_begins: 'John' }, [
			{ field: 'name', operator: 'BEGINS_WITH', value: 'John' },
		]);
	});

	it('should sanitize multiple wildcards in ENDS_WITH', () => {
		testBothSyntaxes({ name: '**John' }, { name_ends: 'John' }, [
			{ field: 'name', operator: 'ENDS_WITH', value: 'John' },
		]);
	});

	it('should sanitize multiple wildcards in CONTAINS', () => {
		testBothSyntaxes({ name: '**John**' }, { name_contains: 'John' }, [
			{ field: 'name', operator: 'CONTAINS', value: 'John' },
		]);
	});

	it('should sanitize multiple wildcards in LIKE', () => {
		testBothSyntaxes({ name: 'Jo**hn*' }, { name_like: 'Jo**hn*' }, [
			{ field: 'name', operator: 'LIKE', value: 'Jo%hn%' },
		]);
	});

	it('should handle values that become LIKE after sanitization', () => {
		testBothSyntaxes({ name: 'Jo**hn' }, { name_like: 'Jo**hn' }, [
			{ field: 'name', operator: 'LIKE', value: 'Jo%hn' },
		]);
	});

	it('should ignore empty conditions', () => {
		testBothSyntaxes({ name: '****' }, { name_like: '****' }, []);
	});
});
