// compile time configuration options

// load environment variables from .env file in production
// node-adapter does NOT load .env files in production, see https://svelte.dev/docs/kit/adapter-node#Environment-variables
export const LOAD_DOTENV_IN_PROD = true;
