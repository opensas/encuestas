# start encuestas from scratch

[X] create project
[X] shadcn components
[X] eslint configuration
[X] .github actions (copy)
[X] .vscode settings (copy)
[X] .gitignore (copy)
[X] .gitattributes (copy) to avoid issues with windows LF
[x] prettier configuration
[X] prisma configuration
[ ] build tools and configuration
[ ] source code
[ ] vitest tests
[ ] playwright tests
[ ] test everything

## create project

```sh
pnpx sv create encuestas
```

What would you like to add to your project? (use arrow keys / space bar)
│ ◼ prettier (formatter - https://prettier.io)
│ ◼ eslint (linter - https://eslint.org)
│ ◼ vitest (unit testing - https://vitest.dev)
│ ◼ playwright (browser testing - https://playwright.dev)
│ ◼ tailwindcss (css framework - https://tailwindcss.com)

## shadcn

```sh
pnpm dlx shadcn-svelte@latest init

pnpm dlx shadcn-svelte@latest add button card checkbox command dialog input label popover progress radio-group select separator slider textarea
```

troubleshoot error

```
/home/sas/devel/apps/dgiit/proyectos/tmp/encuestas-new/encuestas/src/lib/components/ui/button/button.svelte
  61:8  error  Found a link with a url that isn't resolved  svelte/no-navigation-without-resolve
```

add

```js
	{
		/* location of your components where you would like to apply these rules  */
		// see: https://www.shadcn-svelte.com/docs/installation#eslint-configuration
		files: ['**/components/ui/button/button.svelte'],
		rules: { 'svelte/no-navigation-without-resolve': 'off' }
	}
```

to `eslint.config.js`

## eslint

## prisma

copy:
.env
.env.example
docker folder
prisma folder (with migrations and everything)

copy prisma.config.ts

```sh
pnpm install tsx --save-dev
# prisma is needed as a runtime dependency!
pnpm install prisma @prisma/client
```

```sh
# see https://www.prisma.io/docs/guides/sveltekit
# see https://www.prisma.io/docs/orm/overview/databases/sql-server#using-the-node-mssql-driver
# see: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sql-server
pnpm install prisma tsx --save-dev
pnpm install @prisma/client @prisma/adapter-mssql
```

```sh
pnpm install -D dotenv mode-watcher micromark cross-env
```

copy all scripts from package .json

start db server and run migrations

```sh
pnpm db:purge
pnpm db:start
pnpm db:migrate
# generate client code
pnpm db:generate
pnpm db:seed
```

## build tools and configuration

```
pnpm i -D @jesterkit/exe-sveltekit @opensas/sveltekit-adapter-node-iis

pnpm i -D cross-env
```

copy svelte.config.ts, delete svelte.config.js

## code

```sh
pnpm i -D mode-watcher
```

## test everything

with pnpm

```sh
pnpm store prune --force

rm -fr node_modules/

time (pnpm i && pnpm check:all && pnpm test:all && pnpm run build && pnpm run build:exe)
```

with bun

```sh
rm -fr node_modules/

time (bun i && bun check:all && bun test:all && bun run build && bun run build:exe)
```

```

```
