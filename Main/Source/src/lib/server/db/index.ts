import { DATABASE_URL } from '$lib/server/env';

// import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

import { PrismaClient } from './generated/client';

const SQL_LOG_LEVEL = 'NONE' as 'NONE' | 'QUERY' | 'INFO';

const prisma = new PrismaClient({
	adapter: new PrismaMssql(DATABASE_URL),
	log:
		SQL_LOG_LEVEL === 'QUERY'
			? [
					{ emit: 'event', level: 'query' },
					{ emit: 'stdout', level: 'error' },
				]
			: SQL_LOG_LEVEL === 'INFO'
				? [
						{ emit: 'event', level: 'query' },
						{ emit: 'stdout', level: 'error' },
						{ emit: 'stdout', level: 'info' },
						{ emit: 'stdout', level: 'warn' },
					]
				: [], // NONE or default, // configure logging
});

export default prisma;

// configure logging event listeners
if (SQL_LOG_LEVEL === 'QUERY' || SQL_LOG_LEVEL === 'INFO') {
	prisma.$on('query', (e) => {
		console.log('[encuestas] 🔍 SQL Query:', e.query);
		console.log('[encuestas] 📋 Params:', e.params);
		console.log('[encuestas] ⏱️  Duration:', e.duration, 'ms');
		console.log();
	});
}

if (SQL_LOG_LEVEL === 'INFO') {
	prisma.$on('info', (e) => console.log('[encuestas] ℹ️ ', e.message));
	prisma.$on('warn', (e) => console.log('[encuestas] ⚠️ ', e.message));
	prisma.$on('error', (e) => console.log('[encuestas] ❌ ', e.message));
}
