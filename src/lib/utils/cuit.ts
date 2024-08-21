const VALID_CUIT_REGEX = /^\d{2}-?\d{8}-?\d$/;

export function validCuit(cuit: string): boolean {
	// Elimina los guiones, espacios y puntos
	cuit = cuit.replace(/_|-|\s|\./g, '');

	// Verifica el formato del cuit: 11 dígitos numéricos
	if (!VALID_CUIT_REGEX.test(cuit)) return false;

	const [checkDigit, ...rest] = cuit.split('').map(Number).reverse();

	const total = rest.reduce((acc, cur, index) => acc + cur * (2 + (index % 6)), 0);

	const mod11 = 11 - (total % 11);

	if (mod11 === 11) return checkDigit === 0;

	if (mod11 === 10) return false;

	return checkDigit === mod11;
}
