import { default as iisAdapter } from 'sveltekit-adapter-node-iis';

import { default as autoAdapter } from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { platform } from 'node:os';

const os = platform();
const isWindows = os === 'win32';

console.info(
	`running on ${os}, using ${isWindows ? 'sveltekit-adapter-node-iis' : '@sveltejs/adapter-auto'}`
);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// use autoAdapter for running pnpm test:e2e, adapter-node-iis won't work with playwright
		// see https://github.com/Vuferen/sveltekit-adapter-node-iis for IIS adapter
		adapter: isWindows
			? iisAdapter({ includePackage: true, buildNodeModules: true, transferEnv: true })
			: autoAdapter(),
	},
};

export default config;
