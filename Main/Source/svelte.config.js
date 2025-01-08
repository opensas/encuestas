// import adapter from '@sveltejs/adapter-auto'; // uncomment for running pnpm test:e2e, adapter-node-iis won't work with playwright
import adapter from 'sveltekit-adapter-node-iis';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter: adapter(), // uncomment for running pnpm test:e2e,
		// see https://github.com/Vuferen/sveltekit-adapter-node-iis for IIS adapter
		adapter: adapter({
			includePackage: true,
			buildNodeModules: true,
		}),
	},
};

export default config;
