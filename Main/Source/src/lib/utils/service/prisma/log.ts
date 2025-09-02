import type { SqlLogLevel } from '$lib/server/db';

import type { Prisma, PrismaClient } from '@prisma/client';

export function prismaLog(logLevel: SqlLogLevel = 'NONE'): Prisma.LogDefinition[] {
	if (logLevel === 'QUERY') {
		return [
			{ emit: 'event', level: 'query' },
			{ emit: 'stdout', level: 'error' },
		];
	}

	if (logLevel === 'INFO') {
		return [
			{ emit: 'event', level: 'query' },
			{ emit: 'stdout', level: 'error' },
			{ emit: 'stdout', level: 'info' },
			{ emit: 'stdout', level: 'warn' },
		];
	}

	return []; // default and NONE
}

// Create a type that allows all events regardless of config
// prisma statically infers the allowed events from the config
// but since the config is dynamic, it infers never (NONE) as prisma.$on(e: eventType never)
// we define a type for a widened version of prisma.$on that accept all possible events
export function prismaLogEvent(prisma: PrismaClient, logLevel: SqlLogLevel = 'NONE') {
	if (logLevel === 'QUERY' || logLevel === 'INFO') {
		type $onQuery = (e: 'query', callback: (e: Prisma.QueryEvent) => void) => void;
		(prisma.$on as $onQuery)('query', (e) => {
			console.log('🔍 SQL Query:', e.query);
			console.log('📋 Params:', e.params);
			console.log('⏱️  Duration:', e.duration, 'ms');
			console.log('---');
		});
	}

	if (logLevel === 'INFO') {
		type $onLog = (e: 'info' | 'warn' | 'error', callback: (e: Prisma.LogEvent) => void) => void;
		(prisma.$on as $onLog)('info', (e) => console.log('ℹ️ ', e.message));
		(prisma.$on as $onLog)('warn', (e) => console.log('⚠️ ', e.message));
		(prisma.$on as $onLog)('error', (e) => console.log('❌ ', e.message));
	}
}
