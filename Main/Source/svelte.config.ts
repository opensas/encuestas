import exeAdapter from '@jesterkit/exe-sveltekit';
import iisAdapter from '@opensas/sveltekit-adapter-node-iis';
import type { Adapter, Config } from '@sveltejs/kit';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { platform } from 'node:os';

const buildAdapter: 'iis' | 'exe' = process.env.ADAPTER === 'exe' ? 'exe' : 'iis';

let adapter: Adapter | undefined = undefined;

if (buildAdapter === 'exe') {
	console.info(`running on ${platform()}, using '@jesterkit/exe-sveltekit'\r\n`);
	adapter = exeAdapter({ binaryName: 'encuestas' });
} else if (buildAdapter === 'iis') {
	console.info(`running on ${platform()}, using '@opensas/sveltekit-adapter-node-iis'\r\n`);
	adapter = iisAdapter({
		includePackage: true,
		buildNodeModules: true,
		packageManager: 'pnpm',
		copyFiles: ['.env', 'prisma/schema.prisma'],
	});
}

const config: Config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter,
	},
};

export default config;
