import { http, ResponseErrorStatus } from '$lib/server/http';
import { prismaService } from '$lib/server/prisma/prisma.service';

import type { RequestEvent } from './$types.js';

export async function POST(event: RequestEvent) {
	const dataobject: any = await event.request.json();
	const method = 'POST';
	const url = event.url.toString();
	const objeto: string = event.params.objeto;

	try {
		const model: any = (prismaService as any)[objeto];

		if (!model)
			return http.error('Model not found', ResponseErrorStatus.AppError, { method, url, objeto });

		const data: any = await model.add(dataobject);

		return new Response(JSON.stringify(data));
	} catch (error: any) {
		return http.error(error.toString(), ResponseErrorStatus.AppError, {
			method,
			url,
			dataobject,
		});
	}
}
