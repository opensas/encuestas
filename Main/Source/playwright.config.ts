/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	projects: [
		{
			name: 'api-tests',
			testMatch: '**/api/**/*.test.ts',
			use: {
				baseURL: 'http://localhost:3000',
			},
		},
		{
			name: 'e2e-tests',
			testMatch: '**/e2e/**/*.test.ts',
			use: {
				...devices['Desktop Chrome'],
				baseURL: 'http://localhost:4173',
			},
		},
	],
	webServer: [
		{
			command: 'npm run dev',
			port: 3000,
			reuseExistingServer: !process.env.CI,
			timeout: 120 * 1000,
		},
		{
			command: 'npm run build && npm run preview',
			port: 4173,
			reuseExistingServer: !process.env.CI,
			timeout: 120 * 1000,
		},
	],
});
