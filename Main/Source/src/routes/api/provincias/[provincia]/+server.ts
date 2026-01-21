import { error, json } from '@sveltejs/kit';

import { getProvincia } from '../utils';

export function GET({ params }) {
	const provincia = getProvincia(params.provincia);

	if (!provincia) return error(404, 'Not found');

	return json(provincia);
}
