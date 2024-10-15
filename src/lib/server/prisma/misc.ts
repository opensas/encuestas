export const modelPrefix: Record<string, string> = {
	survey: 'enc',
	answer: 'resp',
	question: 'preg',
};

const cleanPrefixId = (id: string): number => {
	const a = id.split('_');
	return a.length === 1 ? parseInt(a[0]) : parseInt(a[1]);
};

const setPrefixId = (id: number, prefixId: string): string =>
	prefixId + '_' + id.toString().padStart(8, '0');

export { cleanPrefixId, setPrefixId };
