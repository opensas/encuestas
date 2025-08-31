import type { Respuesta } from '$lib/types';

import { SURVEY_IDS } from '$lib/components/survey';

import prisma from '$lib/server/db';
import { appError, type AppErrors } from '$lib/utils/errors';
import { err, ok } from '$lib/utils/result';
import { buildQuery, buildWhere } from '$lib/utils/service/prisma/prisma';
import type { ReadParams, ServiceDefinition } from '$lib/utils/service/service';
import { filterFields, serviceError } from '$lib/utils/service/service';
import { validDate, validIsOneOf, validProps } from '$lib/utils/valid';

// types
export const RESPUESTA_ESTADOS = ['creado', 'en proceso', 'finalizado'] as const;

export type RespuestaEstado = (typeof RESPUESTA_ESTADOS)[number];

const DEF: ServiceDefinition = {
	defaultOrder: '-respuestaId',
	fields: {
		respuestaId: { type: 'number', create: false, update: false },
		tipoEncuestaId: {},
		referencia: {},
		encuesta: { order: false, filter: false },
		estado: {},
		respuestas: { order: false, filter: false },
		preguntaActiva: { order: false, filter: false },
		puntaje: {},
		fin: {},
	},
};

export async function readRespuestaById(id: Respuesta['respuestaId']): Promise<Respuesta | null> {
	return await prisma.respuesta.findUnique({ where: { respuestaId: id } });
}

export async function readRespuestas(params: ReadParams = {}) {
	const query = buildQuery(params, DEF);
	return await prisma.respuesta.findMany(query);
}

export async function countRespuestas({ conditions }: ReadParams = {}) {
	const where = buildWhere(conditions, DEF.fields);
	return await prisma.respuesta.count({ where });
}

// Create and Update types
export type CreateRespuesta = Partial<
	Omit<Respuesta, 'respuestaId' | 'inicio' | 'fechaInsert' | 'fechaUpdate'>
> &
	Pick<Respuesta, 'tipoEncuestaId'>; // mandatory on creation

export type UpdateRespuesta = Partial<
	Omit<Respuesta, 'respuestaId' | 'inicio' | 'fechaInsert' | 'fechaUpdate'>
>;

// Funciones de servicio
export async function createRespuesta(data: CreateRespuesta) {
	try {
		const validation = await validCreate(data);
		if (!validation.ok) return validation;

		const created = await prisma.respuesta.create({ data });
		return ok(created);
	} catch (error) {
		return serviceError('No se pudo crear la respuesta', error);
	}
}

export async function updateRespuesta(respuestaId: number, data: UpdateRespuesta) {
	try {
		const validation = await validUpdate(respuestaId, data);
		if (!validation.ok) return validation;

		// Get current respuesta from validation for merging data
		const current = validation.data;

		if (!current) return err(appError('Respuesta no encontrada', 'NOT_FOUND'));

		// Update respuesta
		const updated = await prisma.respuesta.update({
			where: { respuestaId },
			data: {
				tipoEncuestaId: data.tipoEncuestaId ?? current.tipoEncuestaId,
				referencia: data.referencia ?? current.referencia,
				encuesta: data.encuesta ?? current.encuesta,
				estado: data.estado ?? current.estado,
				respuestas: data.respuestas ?? current.respuestas,
				preguntaActiva: data.preguntaActiva ?? current.preguntaActiva,
				puntaje: data.puntaje ?? current.puntaje,
				fin: data.fin !== undefined ? (data.fin ? new Date(data.fin) : null) : current.fin,
				fechaUpdate: new Date(), // Always update the timestamp
			},
		});

		return ok(updated);
	} catch (error) {
		return serviceError('No se pudo actualizar la respuesta', error);
	}
}

// Validation functions
async function validCreate(data: CreateRespuesta) {
	const errors: AppErrors = [];

	// propiedades adicionales
	validProps(errors, filterFields(DEF.fields, 'create'), data);

	validIsOneOf(errors, 'tipoEncuestaId', data.tipoEncuestaId, SURVEY_IDS, { required: true });

	// ya existe una respuesta con esa referencia
	await validReferencia(errors, data.referencia);

	validIsOneOf(errors, 'estado', data.estado, RESPUESTA_ESTADOS);

	validDate(errors, 'fin', data.fin);

	if (!errors.length) return ok(true); // no error

	return err(appError('Error de validación', 'VALIDATION_ERROR', errors));
}

async function validUpdate(respuestaId: Respuesta['respuestaId'], data: UpdateRespuesta) {
	const errors: AppErrors = [];

	// propiedades adicionales
	validProps(errors, filterFields(DEF.fields, 'update'), data);

	// Verificar si la respuesta existe
	const current = await prisma.respuesta.findUnique({
		where: { respuestaId },
	});

	if (!current) {
		errors.push({ field: 'respuestaId', reason: 'respuestaId no encontrado' });
	} else if (data.referencia && data.referencia !== current?.referencia) {
		// verificar si referencia ha sido actualizada y ya hay otra respuesta con la misma referencia
		await validReferencia(errors, data.referencia, respuestaId);
	}

	validIsOneOf(errors, 'tipoEncuestaId', data.tipoEncuestaId, SURVEY_IDS);

	validIsOneOf(errors, 'estado', data.estado, RESPUESTA_ESTADOS);

	validDate(errors, 'fin', data.fin);

	if (!errors.length && current) return ok(current);

	return err(appError('Error de validación', 'VALIDATION_ERROR', errors));
}

async function validReferencia(
	errors: AppErrors,
	referencia?: Respuesta['referencia'],
	respuestaId?: Respuesta['respuestaId']
) {
	if (!referencia) return;

	const where = {
		referencia,
		...(respuestaId ? { NOT: { respuestaId } } : {}),
	};

	const exists =
		(await prisma.respuesta.findFirst({
			// Busco otra respuesta con la misma referencia
			where,
			select: { respuestaId: true },
		})) !== null;

	if (exists)
		errors.push({ field: 'referencia', reason: 'Ya existe una respuesta con esa referencia' });
}
