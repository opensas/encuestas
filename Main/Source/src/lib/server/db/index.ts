import { prismaLog, prismaLogEvent } from '$lib/utils/service/prisma/log';

import { PrismaClient } from '@prisma/client';

import { DATABASE_URL } from '$env/static/private';

export type SqlLogLevel = 'NONE' | 'QUERY' | 'INFO';
const SQL_LOG_LEVEL = 'QUERY' as SqlLogLevel;

const prisma = new PrismaClient({
	datasourceUrl: DATABASE_URL,
	log: prismaLog(SQL_LOG_LEVEL),
});

export default prisma;

prismaLogEvent(prisma, SQL_LOG_LEVEL);
