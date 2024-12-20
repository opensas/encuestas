// import adapter from '@sveltejs/adapter-auto';
import adapter from 'sveltekit-adapter-node-iis';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// see https://github.com/Vuferen/sveltekit-adapter-node-iis for IIS adapter
		adapter: adapter({
			includePackage: false,
		}),
	},
};

export default config;
