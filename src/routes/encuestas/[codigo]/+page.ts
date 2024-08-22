import { DEFAULT_CODIGO_ENCUESTA, encuestas } from '$lib/components/encuesta';

import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const codigo = encuestas.find((e) => e.codigo === params.codigo)?.codigo;

	if (!codigo) throw redirect(302, `/encuestas/${DEFAULT_CODIGO_ENCUESTA}`);

	return { codigo };
}
