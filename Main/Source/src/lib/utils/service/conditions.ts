export type ParsedCondition =
	| { field: string; operator: 'EQUAL'; value: string } // field=value
	| { field: string; operator: 'NOT_EQUAL'; value: string } // field=!=value or field<>value
	| { field: string; operator: 'BEGINS_WITH'; value: string } // field=Joh*
	| { field: string; operator: 'ENDS_WITH'; value: string } // field=*hn
	| { field: string; operator: 'CONTAINS'; value: string } // field=*oh*
	| { field: string; operator: 'BETWEEN'; min: string; max: string } // field=min..max
	| { field: string; operator: 'GREATER_THAN'; value: string } // field>value
	| { field: string; operator: 'LESS_THAN'; value: string } // field<value
	| { field: string; operator: 'GREATER_OR_EQUAL'; value: string } // field>=value
	| { field: string; operator: 'LESS_OR_EQUAL'; value: string } // field<=value
	| { field: string; operator: 'IN'; values: string[] }; // field=books;electronics

const REGEX = {
	BETWEEN: /^(.+)\.\.(.+)$/,
	IN: /^(.*;)+.*$/, // Matches patterns with one or more semicolons
	CONTAINS: /^\*(.+)\*$/,
	BEGINS_WITH: /^(.+)\*$/,
	ENDS_WITH: /^\*(.+)$/,
	NOT_EQUAL: /^(!=|<>)()(.+)$/, // FIXED: Removed space requirement, added empty capture group
	LESS_OR_EQUAL: /^<=(.+)$/,
	GREATER_OR_EQUAL: /^>=(.+)$/,
	LESS_THAN: /^<(.+)$/,
	GREATER_THAN: /^>(.+)$/,
	EQUAL: /^(.+)$/,
} as const;

export function parseConditions(condition: Record<string, string>) {
	return Object.entries(condition).map(([field, value]): ParsedCondition => {
		// Check each operator pattern in order of specificity
		if (REGEX.BETWEEN.test(value)) {
			const [, min, max] = value.match(REGEX.BETWEEN)!;
			return { field, operator: 'BETWEEN', min, max };
		}

		if (REGEX.IN.test(value)) {
			const values = value.split(';').filter(Boolean);
			return { field, operator: 'IN', values };
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

		// Default to EQUAL
		return { field, operator: 'EQUAL', value };
	});
}
