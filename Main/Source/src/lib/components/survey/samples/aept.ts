import type { Survey } from '$lib/types';

export const survey_aept: Survey = {
	id: 'surv_aept',
	code: 'aept',
	title: 'Evaluación de participantes de Acciones de Entrenamiento para el Trabajo (AEPT)',
	description:
		'Encuesta online para evaluar la satisfacción y experiencia de los participantes en el Programa de Entrenamiento para el Trabajo brindado por la Secretaría de Trabajo, Empleo y Seguridad Social (STEySS) / Subsecretarías de Empleo y Formación Laboral(SSEyFL).',
	questions: [
		{
			id: 'ques_1',
			code: 'P1',
			title:
				'¿Cuán satisfecho estás con el Programa de Entrenamiento para el Trabajo brindado por la STEySS/SSEyFL?',
			type: 'single',
			options: ['Muy satisfecho', 'Satisfecho', 'Indistinto', 'Insatisfecho', 'Muy insatisfecho'],
		},
		{
			id: 'ques_2',
			code: 'P2',
			title:
				'¿Cómo fue tu experiencia en relación a los siguientes aspectos de la gestión para acceder al Entrenamiento para el Trabajo?',
			type: 'grid-single',
			items: [
				'Registro en el Portal Empleo',
				'Búsqueda de la oferta de EPT',
				'Postulación a la oferta de EPT',
			],
			options: ['Buena', 'Regular', 'Mala'],
		},

		{
			id: 'ques_3',
			code: 'P3',
			title:
				'¿En qué medida acordás con las siguientes afirmaciones sobre la participación en la práctica de Entrenamiento para el Trabajo?',
			type: 'grid-single',
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
			id: 'ques_4',
			code: 'P4',
			title:
				'¿La empresa cumplió con los siguientes compromisos establecidos en el Acuerdo de Entrenamiento para el Trabajo?',
			type: 'multiple',
			options: [
				'Cantidad de horas',
				'Días y horarios',
				'Tareas del puesto',
				'Acompañamiento de un tutor',
			],
		},

		{
			id: 'ques_5',
			code: 'P5',
			next: 'ques_6',
			title: '¿Participaste en algún otro programa de la STEySS/SSEyFL?',
			type: 'single',
			options: [{ id: 'Sí', next: 'ques_5_1' }, 'No'],
		},

		{
			id: 'ques_5_1',
			code: 'P5.1',
			next: 'ques_5_2',
			title: '¿En cuál programa de la STEySS/SSEyFL participaste?',
			type: 'single',
			options: ['Cursos', 'Programa de Inserción Laboral', 'Programa de Empleo Independiente'],
			other: {
				placeholder: 'En qué otros programas participaste?',
			},
		},

		{
			id: 'ques_5_2',
			code: 'P5.2',
			next: 'ques_6',
			title: '¿Considerás que la experiencia en esos programas...?',
			type: 'multiple',
			options: [
				'Resultó una buena preparación para participar del entrenamiento',
				'Complementa la formación obtenida durante el entrenamiento',
			],
		},

		{
			id: 'ques_6',
			code: 'P6',
			title:
				'Para acceder al Entrenamiento para el trabajo ¿contaste con la asistencia de alguna Oficina de Empleo o Agencia Territorial?',
			type: 'single',
			options: ['Sí', 'No'],
		},
	],
};
