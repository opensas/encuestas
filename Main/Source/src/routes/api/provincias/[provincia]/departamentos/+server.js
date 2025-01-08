import { error, json } from '@sveltejs/kit';

import { getDepartamentos } from '../../utils';

export function GET({ params }) {
	const departamentos = getDepartamentos(params.provincia);

	if (!departamentos) return error(404, 'Not found');

	return json(departamentos);
}
