// src/routes/api/system/+server.ts
import { NOT_FOUND } from '$lib/constants/http';
import prisma from '$lib/server/db';
import { APP_ENV } from '$lib/server/env';
import { formatDuration } from '$lib/utils/date';

import { error, json } from '@sveltejs/kit';

import { execSync } from 'child_process';
import os from 'os';

import pkg from '../../../../package.json';

export async function GET() {
	if (APP_ENV === 'prod') error(NOT_FOUND);

	// Versions
	const npmVersion = exec('npm -v');
	const pnpmVersion = exec('pnpm -v');
	const bunVersion = exec('bun -v');

	return json({
		app: {
			name: pkg.name,
			version: pkg.version,
			// sveltekit: pkg.dependencies['@sveltejs/kit'],
			project: {
				dependencies: pkg.dependencies,
				devDependencies: filterDependencies(
					pkg.devDependencies,
					'svelte,@sveltejs,typescript,vite,@jesterkit,@opensas'
				),
				// fullDependencies: pkg.devDependencies,
			},
			node: process.version,
			npm: npmVersion,
			pnpm: pnpmVersion,
			bun: bunVersion,
			uptime: formatDuration(process.uptime()),
		},
		server: {
			type: os.type(),
			platform: os.platform(),
			release: os.release(),
			arch: os.arch(),
			hostname: os.hostname(),
			memory: {
				totalMem: formatBytes(os.totalmem()),
				freeMem: formatBytes(os.freemem()),
				used: formatBytes(os.totalmem() - os.freemem()),
			},
			cpus: os.cpus().length,
			load: cpuLoad(),
			uptime: formatDuration(os.uptime()),
		},
		db: await dbInfo(),
		env: {
			APP_ENV: process.env.APP_ENV,
			DATABASE_URL: maskDatabaseUrl(process.env.DATABASE_URL),
		},
		environment: {
			user: process.env.USER || process.env.USERNAME || 'unknown',
			computerName: process.env.COMPUTERNAME,
			os: process.env.OS,
			arch: process.env.PROCESSOR_ARCHITECTURE,
			homeDir:
				process.env.USERPROFILE ||
				`${process.env.HOMEDRIVE || ''}${process.env.HOMEPATH || ''}` ||
				undefined,
			tempDir: process.env.TEMP || process.env.TMP,
		},
	});
}

async function dbInfo() {
	let version = '';
	let tables = 0;

	try {
		// Expecting [{ version: string }]
		const result = await prisma.$queryRaw<{ version: string }[]>`SELECT @@VERSION as version`;
		version = result[0]?.version ?? '';

		// Expecting [{ count: number }]
		const count = await prisma.$queryRaw<{ count: number }[]>`
		SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES
	`;
		tables = count[0]?.count ?? 0;
	} catch (e) {
		// safest way: assert to Error
		const err = e as Error;
		version = 'Error: ' + err.message;
	}

	return { version, tables };
}

function exec(cmd: string): string | null {
	try {
		return execSync(cmd).toString().trim();
	} catch {
		return null;
	}
}

function maskDatabaseUrl(url: string | undefined): string | undefined {
	if (!url) return undefined;
	// replace password=xxxxxx with password=********
	//# DATABASE_URL = "sqlserver://localhost:1433;database=encuestas;user=sa;password=Dev.1234!;encrypt=true;trustServerCertificate=true"
	return url.replace(/password=([^;]+)/i, 'password=********');
}

function filterDependencies<Deps extends Record<string, string>>(
	dependencies: Deps,
	filters: string[] | string = []
) {
	const filtered: Partial<Deps> = {};
	const keywords = typeof filters === 'string' ? filters.split(',') : filters;
	console.log({ keywords });

	for (const [key, value] of Object.entries(dependencies)) {
		if (keywords.some((keyword) => key.startsWith(keyword))) {
			filtered[key as keyof Deps] = value as Deps[keyof Deps];
		}
	}
	return filtered;
}

function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function cpuLoad() {
	const load = os.loadavg(); // [1min, 5min, 15min]
	const cpus = os.cpus().length;

	return {
		'1min': `${load[0].toFixed(2)} / ${cpus} cores (${((load[0] / cpus) * 100).toFixed(1)}%)`,
		'5min': `${load[1].toFixed(2)} / ${cpus} cores (${((load[1] / cpus) * 100).toFixed(1)}%)`,
		'15min': `${load[2].toFixed(2)} / ${cpus} cores (${((load[2] / cpus) * 100).toFixed(1)}%)`,
	};
}
