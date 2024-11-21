import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const body = await request.json();

	console.log('!!! POST', { body: JSON.stringify(body, null, 2) });
	return json(body);
}
