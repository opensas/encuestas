# pnpm Link & Unlink Instructions

## Link directly from the consumer application

Step 1: In your SvelteKit project

```shell
#first check the relative folder is ok
ls -la ../../../sveltekit-adapter-node-iis/

# then link to your local version
pnpm link ../../../sveltekit-adapter-node-iis/
```

Step 2: Verify the link

```shell
$ pnpm list @opensas/sveltekit-adapter-node-iis
Legend: production dependency, optional only, dev only

encuestas@1.2.2 /home/sas/devel/apps/dgiit/proyectos/encuestas/Main/Source (PRIVATE)

devDependencies:
@opensas/sveltekit-adapter-node-iis link:../../../sveltekit-adapter-node-iis
```

## Another Way to Link Your Local Adapter

Step 1: In your adapter directory

```shell
cd path/to/sveltekit-adapter-node-iis
pnpm run build # not needed for @opensas/sveltekit-adapter-node-iis
pnpm link --global
```

> If volta gives this error: Volta error: pnpm global commands is not supported yet.
> use `pnpm link .` instead

Step 2: In your SvelteKit project

```shell
cd path/to/your-sveltekit-app
pnpm link --global @opensas/sveltekit-adapter-node-iis
```

Step 3: Verify the link

```shell
pnpm list @opensas/sveltekit-adapter-node-iis

# Should show: "linked from ../path/to/sveltekit-adapter-node-iis"
```

### Development Workflow

```
# 1. Make changes to your adapter
# 2. Build adapter: pnpm run build (in adapter dir)
# 3. Changes are automatically available in your app!
# 4. Test: pnpm run build (in app dir)
```

## Unlink When Done

Step 1: In your SvelteKit project

```shell
pnpm unlink --global @opensas/sveltekit-adapter-node-iis
```

Step 2: Reinstall published version (optional)

```shell
pnpm add -D @opensas/sveltekit-adapter-node-iis
```

Step 3: Clean up global link (optional)

```shell
# In adapter directory:
pnpm unlink --global
```

## Quick Verify Commands

```shell
# Check link status
pnpm list @opensas/sveltekit-adapter-node-iis

# Test build
pnpm run build
```

---

## quick setup, unlink and relink

```shell
# Unlink first
pnpm unlink @opensas/sveltekit-adapter-node-iis

# Clear node_modules to ensure clean state

rm -rf node_modules .svelte-kit

# Reinstall all dependencies

pnpm install

# Relink your adapter

pnpm link ../../../sveltekit-adapter-node-iis

# Verify link
pnpm list @opensas/sveltekit-adapter-node-iis
```
