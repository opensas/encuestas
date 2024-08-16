export function fib() {
	let a = 1;
	let b = 1;
	return function () {
		const c = a + b;
		a = b;
		b = c;
		return a;
	};
}
