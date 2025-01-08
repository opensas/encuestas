import { json } from '@sveltejs/kit';

import { getProvincias } from './utils';

export function GET() {
	return json(getProvincias());
}
