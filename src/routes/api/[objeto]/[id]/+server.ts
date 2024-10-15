import { http, ResponseErrorStatus } from '$lib/server/http';
import { modelPrefix } from '$lib/server/prisma/misc.js';
import { prismaService } from '$lib/server/prisma/prisma.service';

import type { RequestEvent } from './$types.js';

export async function GET(event: RequestEvent) {
	const strId = event.params.id;
	const objeto: string = event.params.objeto;
	const method = 'GET';
	const url = event.url.toString();

	try {
		const model: any = (prismaService as any)[objeto];

		if (!model)
			return http.error('Model not found', ResponseErrorStatus.AppError, { method, url, strId });

		let data: any;

		if (isKeyId(objeto, strId)) {
			data = await model.record(strId);
		} else {
			data = await model.recordByCode(strId);
		}

		return new Response(JSON.stringify(data));
	} catch (error: any) {
		return http.error(error.toString(), ResponseErrorStatus.AppError, { method, url, strId });
	}
}

const isKeyId = (objeto: string, id: string): boolean => id.startsWith(modelPrefix[objeto] + '_');
