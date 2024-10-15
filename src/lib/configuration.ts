import { PUBLIC_API_URL } from '$env/static/public';

export type Configuration = {
	apiUrl: string;
};

export const configuration: Configuration = {
	apiUrl: PUBLIC_API_URL,
};
