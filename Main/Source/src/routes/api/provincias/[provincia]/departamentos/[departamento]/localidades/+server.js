import { error, json } from '@sveltejs/kit';

import { getLocalidades } from '../../../../utils';

export function GET({ params }) {
	const departamento = getLocalidades(params.provincia, params.departamento);

	if (!departamento) return error(404, 'Not found');

	return json(departamento);
}
