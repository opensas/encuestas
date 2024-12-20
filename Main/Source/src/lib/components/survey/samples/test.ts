import type { Survey } from '$lib/types';

export const survey_ingles: Survey = {
	id: 'surv_ingles_experiencia',
	code: 'ingles',
	title: 'Evaluación de la experiencia en el curso de inglés',
	description:
		'Por favor, responda a las siguientes preguntas para ayudarnos a mejorar nuestro curso de inglés',
	questions: [
		{
			id: 'ques_1',
			title: '¿Cómo te enteraste del curso?',
			kind: 'single',
			options: [
				'Redes sociales',
				'Correo electrónico',
				'Búsqueda en internet',
				'Recomendación de un amigo',
				'Anuncio en línea',
			],
			answer: 'otra opcion',
			allowOther: true,
		},
		{
			id: 'ques_2',
			title: '¿Qué te pareció la calidad del contenido del curso?',
			kind: 'rating',
			answer: 4,
		},
		{
			id: 'ques_3',
			title: '¿Cuánto tiempo dedicaste a estudiar cada semana?',
			kind: 'single',
			options: ['Menos de 1 hora', '1-2 horas', '2-3 horas', '3-4 horas', 'Más de 4 horas'],
			answer: 'Más de 4 horas',
			allowOther: false,
		},
		{
			id: 'ques_4',
			title: '¿Qué te gustaría ver incluido en futuras versiones del curso?',
			kind: 'multiple',
			options: [
				'Más contenido de gramática',
				'Más contenido de vocabulario',
				'Más contenido de conversación',
				'Más contenido de lectura',
				'Más contenido de escritura',
			],
			answer: ['Más contenido de lectura', 'Más contenido de escritura', 'otra opcion nueva'],
			allowOther: true,
		},
		{
			id: 'ques_5',
			title: '¿Recomendarías este curso a otros?',
			kind: 'single',
			options: ['Sí', 'No', 'No estoy seguro'],
			answer: 'No',
			allowOther: false,
		},
		{
			id: 'ques_6',
			title: '¿Tienes alguna sugerencia para mejorar el curso?',
			kind: 'text',
			answer: 'agregar mas horarios',
		},
	],
};

export const survey_cine: Survey = {
	id: 'surv_condicional',
	code: 'cine',
	title: 'Encuesta cinéfila',
	description: 'Encuesta de prueba para probar caminos condicionales',
	questions: [
		{
			id: 'ques_inicio',
			code: '1',
			title: 'Contanos un poco acerca de tí',
			description: 'Algunos datos para conocerte mejor',
			kind: 'grid-text',
			items: [
				'Nombre',
				'Apellido',
				{
					title: 'Bio',
					description: 'Contanos quién sos',
					control: 'textarea',
					placeholder: 'a short bio',
				},
			],
		},
		{
			id: 'ques_te_gusta_el_cine',
			code: '2',
			title: '¿Te gusta el cine?',
			kind: 'single',
			options: [
				'Sí',
				'más o menos',
				'Muy poco',
				{ title: 'Ir al final', next: 'ques_final' },
				{ title: 'Terminar esto ya', next: null },
			],
			allowOther: false,
		},

		{
			id: 'ques_genero',
			code: '3',
			next: 'ques_final',
			title: '¿Qué género te gusta más?',
			kind: 'single',
			options: [
				{ title: 'Ciencia ficción', next: 'ques_genero_ciencia' },
				{
					title: 'Acción',
					description: 'Películas para ver tiros y piñas',
					next: 'ques_genero_accion',
				},
				{ title: 'Drama', description: 'Películas para llorar' },
			],
			allowOther: true,
			placeholderOther: 'Ingresa aquí el género de tu preferencia',
			nextOther: 'ques_genero_otros',
		},

		{
			id: 'ques_genero_ciencia',
			code: '3.1',
			next: 'ques_final',
			title: '¿Qué película de ciencia ficción es tu favorita?',
			kind: 'single',
			options: [
				{ title: 'Star wars', next: 'ques_genero_ciencia_star' },
				'Blade runner',
				'2001',
				'Dune',
				'Mad max',
			],
			allowOther: true,
			placeholderOther: 'Ingresa aquí tu película de ciencia ficción favorita',
			nextOther: 'ques_feedback',
		},

		{
			id: 'ques_genero_ciencia_star',
			code: '3.1.1',
			next: 'ques_feedback',
			title: '¿Qué película de la saga de Star wars es tu favorita?',
			kind: 'single',
			options: [
				'Una nueva esperanza (IV)',
				'El imperio contra-ataca (V)',
				'El retorno del Jedi (VI)',
			],
		},

		{
			id: 'ques_genero_accion',
			code: '3.2',
			next: 'ques_feedback',
			title: '¿Qué película de acción es tu favorita?',
			kind: 'single',
			options: ['Indiana Jones', 'James Bond', 'Duro de matar', 'Mad max'],
			allowOther: true,
		},

		{
			id: 'ques_genero_otros',
			code: '3.3',
			next: 'ques_feedback',
			title: '¿Qué película de ese género es tu favorita?',
			kind: 'text',
		},

		{
			id: 'ques_feedback',
			code: '4',
			title: '¿Qué mejorarías de esta entrevista?',
			kind: 'multiple',
			options: [
				'Preguntar por otros géneros',
				'Hacerla más larga',
				'Hacerla más corta',
				'No haría este tipo de entrevistas',
			],
			allowOther: true,
		},

		{
			id: 'ques_final',
			code: '5',
			title: 'Gracias por completar la encuesta. ¿Querés hacer algún cambio?',
			description: '',
			kind: 'single',
			options: [
				'No, terminar la encuesta',
				{ title: 'Me equivoqué de género', next: 'ques_genero' },
				{ title: 'La quiero hacer de nuevo', next: 'ques_inicio' },
			],
		},
	],
};

export const survey_test: Survey = {
	id: 'surv_test',
	code: 'test',
	title: 'Encuesta de muestra de los distintos tipos de pregunta',
	intro: `
	Bienvenido a la encuesta de muestra
	Te damos al bienvenida a esta encuesta de muestra
	Esperamos que te resulte útil
	`,
	questions: [
		{
			id: 'ques_grid_single',
			title: 'grid-single - varias preguntas que aceptan un solo valor',
			code: 'P1',
			kind: 'grid-single',
			// items: 'pregunta 1, pregunta 2, pregunta 3'.split(', '),
			items: [
				{ title: 'pregunta 1', required: true },
				{ title: 'pregunta 2', required: true },
				{ title: 'pregunta 3', required: undefined },
			],
			options: 'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
			allowOther: true,
			titleOther: 'titleOther',
			placeholderOther: 'placeholderOther',
			required: false,
		},
		{
			id: 'ques_grid_text',
			title: 'grid-text - pregunta que acepta múltiples inputs',
			code: 'P2',
			kind: 'grid-text',
			// items: 'nombre, apellido, direccion'.split(', '),
			items: [
				{ title: 'nombre' },
				{ title: 'apellido', required: true },
				{ title: 'direccion', required: true },
			],
			answer: { nombre: 'nombre...' },
			required: false,
		},
		{
			id: 'ques_rating',
			title: 'rating - pregunta que acepta un puntaje',
			code: 'P3',
			kind: 'rating',
			required: true,
		},
		{
			id: 'ques_text',
			title: 'text - pregunta que acepta un texto libre',
			code: 'P4',
			kind: 'text',
			control: 'textarea',
			answer: 'ingrese su respuesta',
			required: true,
		},
		{
			id: 'ques_single',
			title: 'single - pregunta que acepta un solo valor',
			code: 'P5',
			kind: 'single',
			options: 'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
			allowOther: true,
			titleOther: 'titleOther',
			placeholderOther: 'placeholderOther',
		},
		{
			id: 'ques_multiple',
			title: 'multiple - pregunta que acepta múltiples valores',
			code: 'P6',
			kind: 'multiple',
			options: 'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
			answer: ['opcion 2', 'opcion 3'],
			allowOther: true,
			titleOther: 'titleOther',
			placeholderOther: 'placeholderOther',
			required: false,
		},

		{
			id: 'ques_grid_single_select',
			title: 'grid-single, control: select - varias preguntas que aceptan un solo valor',
			code: 'P7',
			kind: 'grid-single',
			control: 'select',
			items: 'pregunta 1, pregunta 2, pregunta 3'.split(', '),
			options: 'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
			answer: {
				'pregunta 1': 'opcion 2',
				'pregunta 2': 'opcion 3',
				'pregunta 3': 'opcion 2',
			},
			allowOther: true,
			titleOther: 'titleOther',
			placeholderOther: 'placeholderOther',
		},

		{
			id: 'ques_single_combo',
			title: 'single, control: combo - pregunta que acepta un solo valor',
			code: 'P8',
			kind: 'single',
			control: 'select',
			options: 'opcion 1, opcion 2, opcion 3, opcion 4, opcion 5, opcion 6'.split(', '),
			answer: 'opcion 2',
			allowOther: true,
			titleOther: 'titleOther',
			placeholderOther: 'placeholderOther',
		},
	],
};

export const survey_short: Survey = {
	id: 'surv_short',
	code: 'short',
	title: 'Encuesta breve',
	outro: `
		FIN DEL CUESTIONARIO
		Muchas gracias por tu participación
	`,
	questions: [
		{
			id: 'ques_grid_text',
			title: 'grid-text - pregunta que acepta múltiples inputs',
			kind: 'grid-text',
			// items: 'nombre, apellido, direccion'.split(', '),
			items: [
				{ title: 'nombre' },
				{ title: 'apellido', required: true },
				{ title: 'direccion', required: true },
			],
			answer: {
				nombre: 'nombre...',
				apellido: 'apellido...',
				direccion: 'direccion...',
			},
			required: false,
		},
		{
			id: 'ques_text',
			title: 'text - pregunta que acepta un texto libre',
			kind: 'text',
			control: 'textarea',
			answer: 'ingrese su respuesta',
			required: true,
		},
		{
			id: 'ques_grid_single',
			title: 'grid-single - varias preguntas que aceptan un solo valor',
			kind: 'grid-single',
			// items: 'pregunta 1, pregunta 2, pregunta 3'.split(', '),
			items: [
				{ title: 'pregunta 1', required: true },
				{ title: 'pregunta 2', required: true },
				{ title: 'pregunta 3', required: undefined },
			],
			options: 'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
			allowOther: true,
			titleOther: 'titleOther',
			required: false,
		},
	],
};
