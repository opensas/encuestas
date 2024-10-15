import { type Configuration, configuration } from '$lib/configuration';

import { DATABASE_URL } from '$env/static/private';

export type ServerConfiguration = Configuration & {
	databaseUrl: string;
};

export const serverConfigration: ServerConfiguration = {
	...configuration,
	databaseUrl: DATABASE_URL,
};
