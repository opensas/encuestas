import { PrismaClient } from '@prisma/client';

import { DATABASE_URL } from '$env/static/private';

const SQL_LOG_LEVEL = 'QUERY' as 'NONE' | 'QUERY' | 'INFO';

const prisma = new PrismaClient({
	datasourceUrl: DATABASE_URL,
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
		console.log('🔍 SQL Query:', e.query);
		console.log('📋 Params:', e.params);
		console.log('⏱️  Duration:', e.duration, 'ms');
		console.log('---');
	});
}

if (SQL_LOG_LEVEL === 'INFO') {
	prisma.$on('info', (e) => console.log('ℹ️ ', e.message));
	prisma.$on('warn', (e) => console.log('⚠️ ', e.message));
	prisma.$on('error', (e) => console.log('❌ ', e.message));
}
