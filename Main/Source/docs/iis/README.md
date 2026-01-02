# docs/iis folder

Keep this folder. These files will be copied by iisAdapter after building the app.

Check `svelte.config.ts` file:

```ts
	... if (adapterType === 'iis') {
		console.info(
			`[encuestas] running on ${platform()}, using '@opensas/sveltekit-adapter-node-iis'\r\n`
		);
		return iisAdapter({
			includePackage: true,
			buildNodeModules: true,
			packageManager: 'pnpm',
			copyFiles: ['.env', 'prisma/schema.prisma', { src: 'docs/iis', dest: '/' }],
		});
	}
```
