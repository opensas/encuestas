https://bun.sh/guides/ecosystem/sveltekit

https://bun.sh/docs/bundler/executables

```shell
$ bunx sv create sveltekit-bun-app

┌  Welcome to the Svelte CLI! (v0.6.7)
│
◇  Which template would you like?
│  SvelteKit demo
│
◇  Add type checking with Typescript?
│  Yes, using Typescript syntax
│
◆  Project created
│
◇  What would you like to add to your project? (use arrow keys / space bar)
│  none
│
◇  Which package manager do you want to install dependencies with?
│  bun

$ cd sveltekit-bun-app

$ bun dev --open
```

this works ok, then

```shell
$ bun add -D svelte-adapter-bun
```

update svelte.config.js

```typescript
// import adapter from "@sveltejs/adapter-auto";
import adapter from 'svelte-adapter-bun';
```

create build

```shell
$ bun --bun run build
```

test build

```shell
$ bun --bun build/index.js
```

works ok

compile app

```shell
$ bun build build/index.js --compile --outfile bun-server
  [34ms]  bundle  32 modules
  [99ms] compile  bun-server

$ ll -h bun-server
-rwxrwxrwx 1 sas sas 93M Dec 12 12:43 bun-server*
```

execute it

```shell
$ ./bun-server
Listening on 0.0.0.0:3000
```

```shell
bun build ./cli.ts --compile --outfile mycli
```

```shell
bun build build/index.js --compile --outfile bun-server
```
