import { sveltekit } from '@sveltejs/kit/vite';

import { defineConfig } from 'vitest/config';

export default defineConfig({
	// @ts-expect-error - see https://github.com/sveltejs/kit/issues/13102#issuecomment-2515203461
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
