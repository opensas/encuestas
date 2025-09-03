import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const records: Prisma.RespuestaCreateInput[] = [
	{
		tipoEncuestaId: 'surv_short',
		estado: 'en proceso',
		encuesta: 'Respuesta 1',
		fechaInsert: new Date(),
		fechaUpdate: new Date(),
	},
	{
		tipoEncuestaId: 'surv_short',
		estado: 'en proceso',
		encuesta: 'Respuesta 2',
		fechaInsert: new Date(),
		fechaUpdate: new Date(),
	},
];

export async function main() {
	for (const data of records) await prisma.respuesta.create({ data });
}

main();
