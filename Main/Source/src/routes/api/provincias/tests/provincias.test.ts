import { expect, test } from '@playwright/test';

const TOTAL_PROVINCIAS = 24;

test.describe('Provincias API Endpoint', () => {
	test('should return 200 status and correct response structure', async ({ request }) => {
		const response = await request.get('/api/provincias');

		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toContain('application/json');
	});

	test('should return array of provincias with correct structure', async ({ request }) => {
		const response = await request.get('/api/provincias');
		const provincias = await response.json();

		// Should be an array
		expect(Array.isArray(provincias)).toBe(true);
		expect(provincias.length).toBe(TOTAL_PROVINCIAS);

		// Each provincia should have required fields
		for (const provincia of provincias) {
			expect(provincia).toHaveProperty('id');
			expect(provincia).toHaveProperty('nombre');
			expect(typeof provincia.id).toBe('string');
			expect(typeof provincia.nombre).toBe('string');

			// Should NOT include departamentos (omitted in the response)
			expect(provincia).not.toHaveProperty('departamentos');
		}
	});

	test('should return expected number of provincias', async ({ request }) => {
		const response = await request.get('/api/provincias');
		const provincias = await response.json();

		// Argentina has 23 provinces + 1 autonomous city (CABA) = 24 total
		// But let's check the actual count from the data
		expect(provincias.length).toBe(TOTAL_PROVINCIAS);
	});

	test('should include Buenos Aires as first provincia', async ({ request }) => {
		const response = await request.get('/api/provincias');
		const provincias = await response.json();

		// Check that Buenos Aires is the first provincia in the array
		const firstProvincia = provincias[0];
		expect(firstProvincia.id).toBe('buenos-aires');
		expect(firstProvincia.nombre).toBe('BUENOS AIRES');

		// Also verify it exists in the list
		const buenosAires = provincias.find((p: { id: string }) => p.id === 'buenos-aires');
		expect(buenosAires).toBeDefined();
		expect(buenosAires.nombre).toBe('BUENOS AIRES');
	});

	test('should include Tucumán as last provincia', async ({ request }) => {
		const response = await request.get('/api/provincias');
		const provincias = await response.json();

		// Check that Tucumán is the last provincia in the array
		const lastProvincia = provincias[provincias.length - 1];
		expect(lastProvincia.id).toBe('tucuman');
		expect(lastProvincia.nombre).toBe('TUCUMAN');

		// Also verify it exists in the list
		const tucuman = provincias.find((p: { id: string }) => p.id === 'tucuman');
		expect(tucuman).toBeDefined();
		expect(tucuman.nombre).toBe('TUCUMAN');
	});
});
