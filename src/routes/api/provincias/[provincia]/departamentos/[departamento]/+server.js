import { error, json } from '@sveltejs/kit';

import { getDepartamento } from '../../../utils';

export function GET({ params }) {
	const departamento = getDepartamento(params.provincia, params.departamento);

	if (!departamento) return error(404, 'Not found');

	return json(departamento);
}
