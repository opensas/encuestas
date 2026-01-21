# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Testing

This project uses **two different testing approaches**, each one targeting a different level of the application.

- Vitest: Unit and component tests (test:unit and test:ui)
- Playwright: API and End-to-End (E2E) tests (test:api and test:e2e)

### Available tests

#### Vitest tests

Vitest is used for fast, isolated tests that run close to your code:

- `npm run test:unit`: Server tests (Node environment): business logic, utilities, server-side code
  - tests to run `src/**/*.test.ts`

- `npm run test:ui`: Client/UI tests (Browser environment): Svelte components and UI logic
  - tests to run `src/**/*.svelte.test.ts`

- `npm run test:vite` or just `npm run test`: all Vitest tests

Filter by pathname: `npm run test:unit tests/parse`

Filter by test name or description: `npm run test:ui --testNamePattern="render all field labels"`

#### Playwright tests

Playwright test the app as a whole, ensuring everything works together.

- `npm run test:api`: validate backend endpoints as real HTTP consumers
  - tests to run `**/api/**/*.test.ts`

- `npm run test:e2e`: simulate real user interactions in a browser
  - tests to run `**/e2e/**/*.test.ts`

- `npm run test:play`: run all Playwright tests

- `npm run test:all`: run all Vitest and Playwright tests

Filter by pathname: `npm run test:api api/health`

Filter by test name or description: `npm run test:api --grep="should return expected health data fields"`
