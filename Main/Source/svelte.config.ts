import exeAdapter from '@jesterkit/exe-sveltekit';
import iisAdapter from '@opensas/sveltekit-adapter-node-iis';
import autoAdapter from '@sveltejs/adapter-auto';
import type { Adapter, Config } from '@sveltejs/kit';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { platform } from 'node:os';

// Determine which adapter to use based on environment
function getAdapter(): Adapter {
	const adapterType = process.env.ADAPTER;

	if (adapterType === 'exe') {
		console.info(`[encuestas] running on ${platform()}, using '@jesterkit/exe-sveltekit'\r\n`);
		return exeAdapter({ binaryName: 'encuestas' });
	} else if (adapterType === 'iis') {
		console.info(
			`[encuestas] running on ${platform()}, using '@opensas/sveltekit-adapter-node-iis'\r\n`
		);
		return iisAdapter({
			includePackage: true,
			buildNodeModules: true,
			packageManager: 'pnpm',
			copyFiles: ['.env', 'prisma/schema.prisma', { src: 'docs/iis', dest: '/' }],
		});
	} else {
		console.info(`[encuestas] running on ${platform()}, using '@sveltejs/adapter-auto'\r\n`);
		return autoAdapter();
	}
}

const config: Config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: getAdapter(),
	},

	vitePlugin: {
		inspector: true, // see: https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/inspector.md
	},
};

export default config;
