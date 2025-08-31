import type { SqlLogLevel } from '$lib/server/db';

import type { PrismaClient } from '@prisma/client';

export function prismaLog(logLevel: SqlLogLevel = 'NONE') {
	if (logLevel === 'QUERY') {
		return [
			{ emit: 'event', level: 'query' } as const,
			{ emit: 'stdout', level: 'error' } as const,
		];
	}

	if (logLevel === 'INFO') {
		return [
			{ emit: 'event', level: 'query' } as const,
			{ emit: 'stdout', level: 'error' } as const,
			{ emit: 'stdout', level: 'info' } as const,
			{ emit: 'stdout', level: 'warn' } as const,
		];
	}

	return []; // default and NONE
}

type QueryEvent = {
	timestamp: Date;
	query: string;
	params: string;
	duration: number;
	target: string;
};

type LogEvent = {
	timestamp: Date;
	message: string;
	target: string;
};

export function prismaLogEvent(prisma: PrismaClient, logLevel: SqlLogLevel = 'NONE') {
	if (logLevel === 'QUERY' || logLevel === 'INFO') {
		prisma.$on('query', (e: QueryEvent) => {
			console.log('🔍 SQL Query:', e.query);
			console.log('📋 Params:', e.params);
			console.log('⏱️  Duration:', e.duration, 'ms');
			console.log('---');
		});
	}

	if (logLevel === 'INFO') {
		prisma.$on('info', (e: LogEvent) => console.log('ℹ️ ', e.message));
		prisma.$on('warn', (e: LogEvent) => console.log('⚠️ ', e.message));
	}
}
