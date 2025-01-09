import type { Survey } from '$lib/types';

export const survey_manos: Survey = {
	id: 'surv_001',
	code: 'manos',
	title: 'Manos a la obra',
	description: 'Encuesta de satisfacción del programa de Empleo manos a la obra',
	questions: [
		{
			id: 'ques_001',
			title: '¿Qué tan conforme está con la gestión del programa?',
			subtitle: 'Indicanos que tan conforme estas con el desarrollo del programa',
			kind: 'single',
			options: ['mucho', 'bastante', 'normal', 'poco', 'nada conforme'],
			allowOther: false,
		},
		{
			id: 'ques_002',
			title: '¿Cómo mejoraría la gestión del programa?',
			kind: 'multiple',
			options: [
				'más opciones de cursos',
				'mejores docentes',
				'mejor equipamiento',
				{
					title: 'más difusión',
					description: 'darle mas difusión a través de medios de comunicación y redes sociales',
				},
			],
			allowOther: true,
		},
		{
			id: 'ques_002',
			title: '¿Qué puntaje le daría a la gestión del programa?',
			kind: 'rating',
		},
		{
			id: 'ques_002',
			title: '¿Alguna otro comentario que quiera hacernos llegar?',
			kind: 'text',
		},
	],
};
