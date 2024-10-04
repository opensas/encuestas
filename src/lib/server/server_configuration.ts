import { DATABASE_URL } from '$env/static/private';
import { configuration, type Configuration } from '$lib/configuration';

export type ServerConfiguration = Configuration & {
	databaseUrl: string;
};

export const serverConfigration: ServerConfiguration = {
	...configuration,
	databaseUrl: DATABASE_URL,
};
