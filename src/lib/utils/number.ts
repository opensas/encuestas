export function round(value: string | number, decimals = 2) {
	const multiplier = 10 ** decimals;
	return Math.round((+value + Number.EPSILON) * multiplier) / multiplier;
}
