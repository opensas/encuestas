// import { Prisma } from '@prisma/client'
import { prismaService } from '../src/lib/server/prisma/prisma.service';
import { Survey as SurveyModel } from '@prisma/client';

let dateAdd = new Date();

const surveyData: SurveyModel[] = [
	{
		id: 1,
		code: 'fp',
		version: 1,
		title: 'Satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL',
		description:
			'Encuesta de satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL de Formación Profesional presencial y semi-presencial Fomentar/VAT (NO - Auto asistidos)',
		questions: JSON.stringify([
			{
				id: 1,
				title:
					'¿El curso/taller de orientación laboral le pareció útil para aumentar sus posibilidades de encontrar empleo?',
				description: 'Contanos que tan conforme estas con el desarrollo del programa',
				kind: 'single',
				options: ['Sí', 'Medianamente útil', 'NO'],
			},
			{
				id: 2,
				title:
					'¿Los contenidos, actividades y materiales del curso le resultaron comprensibles y adecuados?',
				description: '',
				kind: 'single',
				options: ['Sí', 'Medianamente comprensibles y adecuados', 'NO'],
			},
			{
				id: 3,
				title:
					'¿El capacitador del curso/taller de orientación laboral respondió a sus dudas o consultas cuando Ud. lo requirió?',
				description: '',
				kind: 'single',
				options: ['Sí', 'A veces', 'NO', 'No había docente/capacitador'],
			},
			{
				id: 4,
				title:
					'n caso de que el curso/taller de orientación laboral haya sido virtual ¿pudo acceder al campus/plataforma y a los materiales fácilmente?',
				description: '',
				kind: 'single',
				options: ['Sí', 'Con algunas dificultades', 'NO', 'No corresponde'],
			},
			{
				id: 5,
				title:
					'En caso que el curso/taller de orientación laboral haya sido presencial ¿le facilitaron los insumos, herramientas o equipos necesarios para el desarrollo del mismo?',
				description: '',
				kind: 'single',
				options: ['Sí', 'Parcialmente', 'NO', 'No corresponde'],
			},
			{
				id: 6,
				title:
					'Percibe que luego del curso/taller de orientación laboral, ¿tiene mayor confianza sobre su propio trabajo y sus habilidades?',
				description: '',
				kind: 'single',
				options: ['Sí', 'Parcialmente', 'NO'],
			},
		]),
		createdBy: 1,
		updatedBy: 1,
		createdAt: dateAdd,
		updatedAt: dateAdd,
	},

	{
		id: 2,
		code: 'aept',
		version: 1,
		title: 'Evaluación de participantes de Acciones de Entrenamiento para el Trabajo (AEPT)',
		description:
			'Encuesta online para evaluar la satisfacción y experiencia de los participantes en el Programa de Entrenamiento para el Trabajo brindado por la Secretaría de Trabajo, Empleo y Seguridad Social (STEySS) / Subsecretarías de Empleo y Formación Laboral(SSEyFL).',
		questions: JSON.stringify([
			{
				id: 10,
				code: 'P1',
				title:
					'¿Cuán satisfecho estás con el Programa de Entrenamiento para el Trabajo brindado por la STEySS/SSEyFL?',
				kind: 'single',
				options: ['Muy satisfecho', 'Satisfecho', 'Indistinto', 'Insatisfecho', 'Muy insatisfecho'],
			},
			{
				id: 20,
				code: 'P2',
				title:
					'¿Cómo fue tu experiencia en relación a los siguientes aspectos de la gestión para acceder al Entrenamiento para el Trabajo?',
				kind: 'grid-single',
				items: [
					'Registro en el Portal Empleo',
					'Búsqueda de la oferta de EPT',
					'Postulación a la oferta de EPT',
				],
				options: ['Buena', 'Regular', 'Mala'],
			},

			{
				id: 30,
				code: 'P3',
				title:
					'¿En qué medida acordás con las siguientes afirmaciones sobre la participación en la práctica de Entrenamiento para el Trabajo?',
				kind: 'grid-single',
				items: [
					'Me permitió adquirir nuevos conocimientos y habilidades',
					'Mejora mis posibilidades de conseguir empleo',
				],
				options: [
					'Muy de acuerdo',
					'De acuerdo',
					'Ni de acuerdo ni en desacuerdo',
					'En desacuerdo',
					'Muy en desacuerdo',
				],
			},

			{
				id: 40,
				code: 'P4',
				title:
					'¿La empresa cumplió con los siguientes compromisos establecidos en el Acuerdo de Entrenamiento para el Trabajo?',
				kind: 'multiple',
				options: [
					'Cantidad de horas',
					'Días y horarios',
					'Tareas del puesto',
					'Acompañamiento de un tutor',
				],
			},

			{
				id: 50,
				code: 'P5',
				next: 60,
				title: '¿Participaste en algún otro programa de la STEySS/SSEyFL?',
				kind: 'single',
				options: [{ title: 'Sí', next: 51 }, 'No'],
			},

			{
				id: 51,
				code: 'P5.1',
				next: 52,
				title: '¿En cuál programa de la STEySS/SSEyFL participaste?',
				kind: 'single',
				options: ['Cursos', 'Programa de Inserción Laboral', 'Programa de Empleo Independiente'],
				allowOther: true,
				placeholderOther: 'En qué otros programas participaste?',
			},

			{
				id: 52,
				code: 'P5.2',
				next: 60,
				title: '¿Considerás que la experiencia en esos programas...?',
				kind: 'multiple',
				options: [
					'Resultó una buena preparación para participar del entrenamiento',
					'Complementa la formación obtenida durante el entrenamiento',
				],
			},

			{
				id: 60,
				code: 'P6',
				title:
					'Para acceder al Entrenamiento para el trabajo ¿contaste con la asistencia de alguna Oficina de Empleo o Agencia Territorial?',
				kind: 'single',
				options: ['Si', 'No'],
			},
		]),
		createdBy: 1,
		updatedBy: 1,
		createdAt: dateAdd,
		updatedAt: dateAdd,
	},
];

async function main() {
	console.log(`Start seeding ...`);

	for (const sd of surveyData) {
		let data: any = { ...sd };
		delete data.id;

		const d = await prismaService.survey.create({ data });
		console.log(`Created Survey with id: ${d.id}`);
	}

	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prismaService.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prismaService.$disconnect();
		process.exit(1);
	});
