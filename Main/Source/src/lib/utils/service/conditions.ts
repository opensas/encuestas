const SUFFIX_OP = true; // operator as a suffix, ie field_ne=xxx, field_between=xxx,yyy
const IN_VALUE_OP = true; // operator in value, ie field=<>xxx, field=xxx..yyy

export type ParsedCondition =
	| { field: string; operator: 'EQUAL'; value: string } // field=value
	| { field: string; operator: 'NOT_EQUAL'; value: string } // field=!=value or field=<>value
	| { field: string; operator: 'BEGINS_WITH'; value: string } // field=Joh*
	| { field: string; operator: 'ENDS_WITH'; value: string } // field=*hn
	| { field: string; operator: 'CONTAINS'; value: string } // field=*oh*
	| { field: string; operator: 'LIKE'; value: string } // field=o*h (custom patterns) => field like 'o%h'
	| { field: string; operator: 'BETWEEN'; min: string; max: string } // field=min..max
	| { field: string; operator: 'GREATER_THAN'; value: string } // field=>value
	| { field: string; operator: 'LESS_THAN'; value: string } // field=<value
	| { field: string; operator: 'GREATER_OR_EQUAL'; value: string } // field=>=value
	| { field: string; operator: 'LESS_OR_EQUAL'; value: string } // field=<=value
	| { field: string; operator: 'IN'; values: string[] }; // field=books,electronics,movies

const REGEX = {
	BETWEEN: /^(.+)\.\.(.+)$/,
	BETWEEN_SUFFIX_VALUES: /^(.+),(.+)$/,
	IN: /^(.*,)+.*$/, // Matches patterns with one or more colons
	CONTAINS: /^\*(.+)\*$/,
	BEGINS_WITH: /^(.+)\*$/,
	ENDS_WITH: /^\*(.+)$/,
	LIKE: /(?<=.)\*(?=.)/, // Matches any value containing at least one asterisk (but not at edges)
	NOT_EQUAL: /^(!=|<>)()(.+)$/, // FIXED: Removed space requirement, added empty capture group
	LESS_OR_EQUAL: /^<=(.+)$/,
	GREATER_OR_EQUAL: /^>=(.+)$/,
	LESS_THAN: /^<(.+)$/,
	GREATER_THAN: /^>(.+)$/,
	EQUAL: /^(.+)$/,
} as const;

const SUFFIX_OPS = {
	EQUAL: '_eq', // field_eq=xxx
	NOT_EQUAL: '_ne', // field_ne=xxx
	BEGINS_WITH: '_begins', // field_begins=xxx
	ENDS_WITH: '_ends', // field_ends=xxx
	CONTAINS: '_contains', // field_contains=xxx
	LIKE: '_like', // field_like=xxx
	BETWEEN: '_between', // field_between=xxx,yyy
	GREATER_THAN: '_gt', // field_gt=xxx
	LESS_THAN: '_lt', // field_lt=xxx
	GREATER_OR_EQUAL: '_gte', // field_gte=xxx
	LESS_OR_EQUAL: '_lte', // field_lte=xxx
	IN: '_in', // field_in=xxx,yyy,zzz
} as const satisfies Record<ParsedCondition['operator'], string>;

function parseSuffixCondition(fieldName: string, value: string): ParsedCondition | null {
	for (const [operator, suffix] of Object.entries(SUFFIX_OPS)) {
		if (fieldName.endsWith(suffix)) {
			const field = fieldName.slice(0, -suffix.length);

			if (operator === 'BETWEEN' && REGEX.BETWEEN_SUFFIX_VALUES.test(value)) {
				const [, min, max] = value.match(REGEX.BETWEEN_SUFFIX_VALUES)!;
				return { field, operator, min, max };
			}

			if (operator === 'IN' && REGEX.IN.test(value)) {
				return { field, operator, values: value.split(',').filter(Boolean) };
			}

			if (operator === 'LIKE') {
				const sanitized = sanitizeValue(value);
				if (sanitized === '*') return null;
				return { field, operator, value: sanitized.replaceAll('*', '%') };
			}

			return { field, operator, value } as ParsedCondition;
		}
	}
	return null;
}

export function parseConditions(condition: Record<string, string>) {
	return Object.entries(condition)
		.map(([field, rawValue]) => {
			const value = sanitizeValue(rawValue); // sanitize duplicate WILDCARD chars

			// check suffix operators
			if (SUFFIX_OP) {
				const condition = parseSuffixCondition(field, value);
				if (condition) return condition;
			}

			if (IN_VALUE_OP) {
				// Check each operator pattern in order of specificity
				if (REGEX.BETWEEN.test(value)) {
					const [, min, max] = value.match(REGEX.BETWEEN)!;
					return { field, operator: 'BETWEEN', min, max };
				}

				if (REGEX.IN.test(value)) {
					const values = value.split(',').filter(Boolean);
					return { field, operator: 'IN', values };
				}

				// LIKE operator: must check before BEGINS_WITH/ENDS_WITH/CONTAINS
				// Contains * but not at the edges (those are handled by other operators)
				if (REGEX.LIKE.test(value)) {
					return { field, operator: 'LIKE', value: value.replaceAll('*', '%') };
				}

				if (REGEX.CONTAINS.test(value)) {
					const [, val] = value.match(REGEX.CONTAINS)!;
					return { field, operator: 'CONTAINS', value: val };
				}

				if (REGEX.BEGINS_WITH.test(value)) {
					const [, val] = value.match(REGEX.BEGINS_WITH)!;
					return { field, operator: 'BEGINS_WITH', value: val };
				}

				if (REGEX.ENDS_WITH.test(value)) {
					const [, val] = value.match(REGEX.ENDS_WITH)!;
					return { field, operator: 'ENDS_WITH', value: val };
				}

				// NOT_EQUAL must be checked before LESS_THAN/GREATER_THAN
				if (REGEX.NOT_EQUAL.test(value)) {
					const [, , , val] = value.match(REGEX.NOT_EQUAL)!;
					if (val === '*') return null;
					return { field, operator: 'NOT_EQUAL', value: val };
				}

				if (REGEX.LESS_OR_EQUAL.test(value)) {
					const [, val] = value.match(REGEX.LESS_OR_EQUAL)!;
					return { field, operator: 'LESS_OR_EQUAL', value: val };
				}

				if (REGEX.GREATER_OR_EQUAL.test(value)) {
					const [, val] = value.match(REGEX.GREATER_OR_EQUAL)!;
					return { field, operator: 'GREATER_OR_EQUAL', value: val };
				}

				if (REGEX.LESS_THAN.test(value)) {
					const [, val] = value.match(REGEX.LESS_THAN)!;
					return { field, operator: 'LESS_THAN', value: val };
				}

				if (REGEX.GREATER_THAN.test(value)) {
					const [, val] = value.match(REGEX.GREATER_THAN)!;
					return { field, operator: 'GREATER_THAN', value: val };
				}
			}
			// Default to EQUAL
			if (value === '*') return null;
			return { field, operator: 'EQUAL', value };
		})
		.filter(Boolean) as ParsedCondition[];
}

// helper function to sanitize value
// it replaces duplicate WILDCARD with a single one
function sanitizeValue(value: string): string {
	// Replace multiple consecutive asterisks with a single one
	return value.replace(/\*+/g, '*');
}
