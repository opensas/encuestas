export function deepCopy<T>(value: T): T {
	// Handle primitive types directly (they are immutable)
	if (value === null || typeof value !== 'object') return value;

	try {
		if (typeof structuredClone === 'function') return structuredClone(value);
	} catch {
		return jsonDeepCopy(value);
	}
	return jsonDeepCopy(value);
}

function jsonDeepCopy<T>(value: T): T {
	return JSON.parse(JSON.stringify(value));
}

// type aware version of includes, no need to use as
// const items = ['a', 'b', 'c'] as const
// const item = 'd'

// if (items.includes(item)) console.log('yes!')
// Argument of type '"d"' is not assignable to parameter of type '"a" | "b" | "c"'.
//
// if (includes(items, item)) console.log('yes!') // ok!
//
export function includes<Item>(items: readonly Item[], item: unknown): item is Item {
	return items.includes(item as Item);
}

/**
 * Omits one or more properties from an object.
 *
 * @param obj The object to omit properties from.
 * @param keys The properties to omit.
 * @returns A new object with the specified properties omitted.
 */
export function omit<T, Key extends keyof T>(obj: T, ...keys: Key[]): Omit<T, Key> {
	const result = { ...obj };
	keys.forEach((key) => delete result[key]);
	return result;
}

/**
 * Checks if an object has all the given properties (own or inherited).
 */
export function hasProps<Obj extends object, Key extends string>(
	obj: unknown,
	...props: Key[]
): obj is Obj & Record<Key, unknown> {
	if (typeof obj !== 'object' || obj === null) return false;
	return props.every((prop) => prop in obj);
}
