import { expect, test } from '@playwright/test';

test.describe('Health API Endpoint', () => {
	test('should return 200 status and correct health data structure', async ({ request }) => {
		const response = await request.get('/api/health');

		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toContain('application/json');
	});

	test('should return expected health data fields', async ({ request }) => {
		const response = await request.get('/api/health');
		const data = await response.json();

		// Check required fields exist
		expect(data).toHaveProperty('status');
		expect(data).toHaveProperty('time');
		expect(data).toHaveProperty('uptime');
		expect(data).toHaveProperty('version');
		expect(data).toHaveProperty('hostname');
		expect(data).toHaveProperty('db');

		// Check field types and values
		expect(typeof data.status).toBe('string');
		expect(['ok', 'error']).toContain(data.status);

		expect(typeof data.time).toBe('string');
		expect(new Date(data.time)).toBeInstanceOf(Date);

		expect(typeof data.uptime).toBe('string');
		expect(typeof data.version).toBe('string');
		expect(typeof data.hostname).toBe('string');

		// Check database status
		expect(data.db).toHaveProperty('status');
		expect(typeof data.db.status).toBe('string');
		expect(['ok', 'error']).toContain(data.db.status);
	});

	test('should return version from package.json', async ({ request }) => {
		const response = await request.get('/api/health');
		const data = await response.json();

		// Version should match semver pattern
		expect(data.version).toMatch(/^\d+\.\d+\.\d+$/);
	});
});
