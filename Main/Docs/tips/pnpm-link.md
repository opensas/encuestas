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

If an error occurs, try removing and adding it again

```shell
$ # Remove the broken link (ignores EINVAL errors)
pnpm remove @opensas/sveltekit-adapter-node-iis

# Reinstall fresh from npm
pnpm add @opensas/sveltekit-adapter-node-iis
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

# add new version

1. create a feature branch

```shell
# Make sure you're on the main branch and have latest changes
git checkout main
git pull origin main

# Create and switch to a new feature branch
git checkout -b feature-xyz/v1.0.0  # replace with your version number

# Push the branch to GitHub
git push -u origin feature-xyz/v1.0.0
```

2. use npm commands to update the version:

```shell
# For patch version (1.0.1)
npm version patch

# For minor version (1.1.0)
npm version minor

# For major version (2.0.0)
npm version major

# Or specify exact version
npm version 1.0.0 -m "Release version %s"
```

> `npm version` will also commit the changes to your package.json file and create a new git tag with the updated version number

3. update the change log file

4. Push and merge to GitHub

```shell
# Add all changes
git add .

# Commit with a descriptive message
git commit -m "chore: release version 1.0.0"

# Push to your feature branch
git push origin release/v1.0.0
```

Then go to GitHub:

- Navigate to your repository
- Create a Pull Request from your feature branch to main
- Review and merge the PR
- Delete the feature branch after merging

After merging, update your local main branch:

```shell
git checkout main
git pull origin main
```

5. Update on npm

First, make sure you're logged in to npm:

```shell
npm login
```

Then publish the new version:

```shell
# From the main branch with the updated version
npm publish

# If you want to publish as public (if it was previously private)
npm publish --access public
```

6. Update apps using the npm module

For each application using your package:

```shell
# Update to latest version
npm update @opensas/sveltekit-adapter-node-iis

# Or update to specific version
npm install @opensas/sveltekit-adapter-node-iis@1.0.0

# Or update package.json and run
npm install
```
