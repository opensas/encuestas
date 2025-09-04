import dotenv from 'dotenv';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'path';

// force loading .env file using dotenv
// node-adapter does NOT load .env files in production, see https://svelte.dev/docs/kit/adapter-node#Environment-variables
loadEnvFile('encuestas');

export const DATABASE_URL = process.env.DATABASE_URL || '';
export const APP_ENV = process.env.APP_ENV || '';

export function loadEnv() {
	const errors: string[] = [];

	// APP_ENV
	const VALID_APP_ENV = ['dev', 'test', 'preview', 'prod'];
	if (!APP_ENV) {
		errors.push(`❌ invalid APP_ENV: cannot be empty.`);
	} else if (!VALID_APP_ENV.includes(APP_ENV)) {
		errors.push(`❌ invalid APP_ENV: should be one of ${VALID_APP_ENV.join(', ')}.`);
	}

	// DATABASE_URL
	if (!DATABASE_URL) {
		errors.push(`❌ invalid DATABASE_URL: cannot be empty.`);
	} else if (!DATABASE_URL.startsWith('sqlserver://')) {
		errors.push(
			`❌ invalid DATABASE_URL: required format: sqlserver://HOST[:PORT];database=DB;user=USER;password=PASS;encrypt=true;[param1=value1][;param2=value2][;...].`
		);
	}
	const keys = DATABASE_URL.split(';').map((key) => key.split('=')[0]);
	const missing = ['user', 'password', 'database'].filter((key) => !keys.includes(key));
	if (missing.length > 0)
		errors.push(`❌ invalid DATABASE_URL: missing required keys ${missing.join(', ')}.`);

	if (errors.length === 0) return true;

	for (const error of errors) console.error(error);
	throw new Error('❌ Invalid environment variables.');
}

// safely looks upward for an .env file
function loadEnvFile(appName = 'encuestas', maxDepth = 10) {
	let currentDir = dirname(dirname(fileURLToPath(import.meta.url)));
	const workingDir = resolve(process.cwd()); // safeguard boundary

	let depth = 0;

	while (depth < maxDepth) {
		const envFile = join(currentDir, '.env');
		if (existsSync(envFile)) {
			const res = dotenv.config({ path: envFile, quiet: true });
			console.log();

			if (res.error) {
				console.warn(`⚠️ Could not read .env file at ${envFile}`, res.error);
			} else if (res.parsed) {
				const keys = Object.keys(res.parsed);
				console.info(`✅ Loaded ${keys.length} keys from ${envFile}`);
				console.info(`Keys loaded ${keys.join(', ')}\r\n`);
			}

			return envFile;
		}

		if (currentDir === workingDir) return null; // reached the working directory, STOP

		const parentDir = resolve(currentDir, '..'); // Move up one directory

		// Stop if we've reached filesystem root or the stop boundary
		if (parentDir === currentDir) return null; // we've reached filesystem, STOP

		if (isProjectRoot(appName, currentDir)) return null; // we've reached package.json, STOP

		currentDir = parentDir;
		depth++;
	}
	return null;
}

function isProjectRoot(appName: string, currentDir: string) {
	const jsonFile = join(currentDir, 'package.json');
	if (!existsSync(jsonFile)) return false;

	try {
		const json = JSON.parse(readFileSync(jsonFile, 'utf8'));
		if (json.name === appName) return true;
	} catch (error) {
		// Invalid JSON, continue searching
		if (error instanceof SyntaxError) {
			console.warn(`⚠️ Could not parse invalid package.json at ${jsonFile}`);
		} else {
			throw error;
		}
	}
	return false;
}
