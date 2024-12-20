import { describe, expect, it } from 'vitest';

import { validCuit } from './cuit';

describe('Validación de CUIT', () => {
	it('debe validar el formato y el dígito verificador del CUIT', () => {
		expect(validCuit('20-24963205-9')).toBe(true);
	});

	it('debe ignorar guiones, espacios y puntos', () => {
		expect(validCuit('  2  0-24_9  63 205.9 -_')).toBe(true);
	});

	it('debe validar varios CUIT correctos', () => {
		const cuits = ['20-12801863-9', '20-36344934-5', '23-31301847-4', '20-13957091-0'];
		expect(cuits.every(validCuit)).toBe(true);
	});

	it('debe validar CUIT con guiones opcionales', () => {
		expect(validCuit('20249632059')).toBe(true);
	});

	it('debe invalidar CUIT con menos o más de 11 caracteres', () => {
		expect(validCuit('2024963205')).toBe(false);
		expect(validCuit('20-24963205')).toBe(false);
		expect(validCuit('202496320599')).toBe(false);
		expect(validCuit('20-24963205-99')).toBe(false);
	});

	it('debe invalidar CUIT con dígito verificador incorrecto', () => {
		const cuit = '20-24963205-8';
		expect(validCuit(cuit)).toBe(false);
	});

	it('debe invalidar CUIT con caracteres inválidos', () => {
		const cuit = '20-12345678-a';
		expect(validCuit(cuit)).toBe(false);
	});
});
