import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';

import { defineConfig } from 'vitest/config';

import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
	define: {
		__APP_NAME__: JSON.stringify(pkg.name),
		__APP_VERSION__: JSON.stringify(pkg.version),
	},
	plugins: [tailwindcss(), sveltekit()],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'ui-tests',
					browser: {
						enabled: true,
						provider: playwright(),
						screenshotFailures: false,
						instances: [{ browser: 'chromium', headless: true }],
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**', 'src/routes/api/**/tests/**'],
				},
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'unit-tests',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}', 'src/routes/api/**/tests/**'],
				},
			},
		],
	},
});
