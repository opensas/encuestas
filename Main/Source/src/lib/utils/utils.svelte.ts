export function log(...args: unknown[]) {
	const snapshotArgs = args.map((arg) => $state.snapshot(arg));
	console.log(...snapshotArgs);
}
