import type { Survey } from '$lib/types';

export const survey_fp: Survey = {
	id: 'surv_001',
	code: 'fp',
	title: 'Satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL',
	description:
		'Encuesta de satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL de Formación Profesional presencial y semi-presencial Fomentar/VAT (NO - Auto asistidos)',
	questions: [
		{
			id: 'ques_001',
			title:
				'¿El curso/taller de orientación laboral le pareció útil para aumentar sus posibilidades de encontrar empleo?',
			subtitle: 'Contanos que tan conforme estas con el desarrollo del programa',
			type: 'single',
			options: ['Sí', 'Medianamente útil', 'NO'],
		},
		{
			id: 'ques_002',
			title:
				'¿Los contenidos, actividades y materiales del curso le resultaron comprensibles y adecuados?',
			subtitle: '',
			type: 'single',
			options: ['Sí', 'Medianamente comprensibles y adecuados', 'NO'],
		},
		{
			id: 'ques_003',
			title:
				'¿El capacitador del curso/taller de orientación laboral respondió a sus dudas o consultas cuando Ud. lo requirió?',
			subtitle: '',
			type: 'single',
			options: ['Sí', 'A veces', 'NO', 'No había docente/capacitador'],
		},
		{
			id: 'ques_004',
			title:
				'En caso de que el curso/taller de orientación laboral haya sido virtual ¿pudo acceder al campus/plataforma y a los materiales fácilmente?',
			subtitle: '',
			type: 'single',
			options: ['Sí', 'Con algunas dificultades', 'NO', 'No corresponde'],
		},
		{
			id: 'ques_005',
			title:
				'En caso que el curso/taller de orientación laboral haya sido presencial ¿le facilitaron los insumos, herramientas o equipos necesarios para el desarrollo del mismo?',
			subtitle: '',
			type: 'single',
			options: ['Sí', 'Parcialmente', 'NO', 'No corresponde'],
		},
		{
			id: 'ques_006',
			title:
				'Percibe que luego del curso/taller de orientación laboral, ¿tiene mayor confianza sobre su propio trabajo y sus habilidades?',
			subtitle: '',
			type: 'single',
			options: ['Sí', 'Parcialmente', 'NO'],
		},
	],
};

export const survey_fp_auto: Survey = {
	id: 'surv_001',
	code: 'fp-autoasistido',
	title:
		'Satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL - Auto asistidos',
	description:
		'Encuesta de satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL de Formación Profesional presencial y semi-presencial Fomentar/VAT - Auto asistidos',
	questions: [
		{
			id: 'ques_001',
			title: '¿El curso le pareció útil para aumentar sus posibilidades de encontrar empleo?',
			subtitle: 'Contanos que tan conforme estas con el desarrollo del programa',
			type: 'single',
			options: ['Sí', 'Medianamente útil', 'NO'],
			other: false,
		},
		{
			id: 'ques_002',
			title:
				'¿Los contenidos, actividades y materiales del curso le resultaron comprensibles y adecuados?',
			subtitle: '',
			type: 'single',
			options: ['Sí', 'Medianamente comprensibles y adecuados', 'NO'],
			other: false,
		},
		{
			id: 'ques_003',
			title: '¿Pudo acceder al campus y a los materiales fácilmente?',
			subtitle: '',
			type: 'single',
			options: ['Sí', 'Con algunas dificultades', 'NO', 'No corresponde'],
			other: false,
		},
	],
};
