import { OK, SERVICE_UNAVAILABLE } from '$lib/constants/http';
import prisma from '$lib/server/db';
import { formatDuration, gmtDate } from '$lib/utils/date';
import { toAppError } from '$lib/utils/errors';
import { err, ok } from '$lib/utils/result';

import { json } from '@sveltejs/kit';

import os from 'os';

import pkg from '../../../../package.json';

export async function GET() {
	const res = await checkDatabase();
	const dbStatus = res.ok ? 'ok' : 'error';

	// calculate general status based on status of all the dependencies
	const status = dbStatus === 'ok' ? 'ok' : 'error';

	return json(
		{
			status,
			time: gmtDate(new Date(), 'GMT-3').toISOString(),
			uptime: formatDuration(process.uptime()), // process.uptime() -> seconds
			version: pkg.version,
			hostname: os.hostname(),
			db: {
				status: dbStatus,
			},
		},
		{ status: status === 'ok' ? OK : SERVICE_UNAVAILABLE }
	);
}

async function checkDatabase() {
	try {
		await prisma.$queryRaw`SELECT 1`;
		return ok(true);
	} catch (error) {
		console.error('[encuestas] Database health check failed:', error);
		return err(toAppError(error));
	}
}
