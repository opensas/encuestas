import iisAdapter from '@opensas/sveltekit-adapter-node-iis';
import type { Config } from '@sveltejs/kit';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { platform } from 'node:os';

console.info(`running on ${platform()}, using '@opensas/sveltekit-adapter-node-iis'\r`);

const config: Config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: iisAdapter({
			includePackage: true,
			buildNodeModules: true,
			packageManager: 'pnpm',
			copyFiles: ['.env', 'prisma/schema.prisma'],
		}),
	},
};

export default config;
