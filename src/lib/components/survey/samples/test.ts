import type { Survey } from '$lib/types';

export const survey_test: Survey = {
	id: 'surv_test',
	code: 'test',
	title: 'Encuesta de muestra de los distintos tipos de pregunta',
	// intro: `
	// 	Bienvenido a la encuesta de muestra
	// 	Te damos al bienvenida a esta encuesta de muestra
	// 	Esperamos que te resulte útil
	// `,
	outro: `
		Muchas gracias por tu participación
	`,
	questions: [
		{
			id: 'ques_grid_api',
			title: 'grid-api, obtengo las opciones de una api',
			code: 'p0',
			type: 'grid-api',
			items: [
				{
					id: 'provincia',
					label: 'Nombre provincia',
					required: true,
					idField: 'id',
					descriptionField: 'nombre',
					endpoint: '/api/provincias',
				},
				{
					id: 'departamento',
					label: 'Depto',
					required: false,
					idField: 'id',
					descriptionField: 'nombre',
					endpoint: '/api/provincias/{provincia}/departamentos',
				},
				{
					id: 'localidad',
					required: false,
					idField: 'id',
					descriptionField: 'nombre',
					endpoint: '/api/provincias/{provincia}/departamentos/{departamento}/localidades',
				},
			],
			answer: {
				provincia: 'tucuman',
				departamento: 'rio-chico',
				localidad: 'santa-ana',
			},
		},
		{
			id: 'ques_grid_single',
			title: 'grid-single - varias preguntas que aceptan un solo valor',
			code: 'p1',
			type: 'grid-single',
			// items: 'pregunta 1, pregunta 2, pregunta 3'.split(', '),
			items: [
				{ id: 'pregunta 1', label: 'Primer pregunta', required: true },
				{ id: 'pregunta 2', required: true },
				{ id: 'pregunta 3', required: undefined },
			],
			options: [
				{ id: '1', label: 'Opción 1' },
				{ id: '2', label: 'Opción 2' },
				{ id: '3', label: 'Opción 3' },
				'todas',
				'ninguna',
			],
			other: {
				label: 'otra',
				allowedChars: 'digits',
				maxlength: 3,
			},
			required: false,
		},
		{
			id: 'ques_grid_text',
			title: 'grid-text - pregunta que acepta múltiples inputs',
			code: 'p2',
			type: 'grid-text',
			// items: 'nombre, apellido, direccion'.split(', '),
			items: [
				{ id: 'nombre' },
				{ id: 'apellido', required: true },
				{ id: 'direccion', required: true, control: 'textarea' },
				{
					id: 'dni',
					label: 'número de DNI',
					description: '##.###.###',
					required: true,
					allowedChars: 'digits',
				},
			],
			answer: { nombre: 'nombre...' },
			required: false,
		},
		{
			id: 'ques_rating',
			title: 'rating - pregunta que acepta un puntaje',
			subtitle: 'Puntaje de 1 a 10',
			code: 'p3',
			type: 'rating',
			required: true,
		},
		{
			id: 'ques_text',
			title: 'text - pregunta que acepta un texto libre (title)',
			subtitle: 'Contanos un poco acerca de tí (subtitle)',
			label: 'Respuesta (label)',
			description: 'Máximo 200 caracteres (description)',
			code: 'p4',
			type: 'text',
			control: 'textarea',
			answer: 'ingrese su respuesta',
			required: true,
		},
		{
			id: 'ques_single',
			title: 'single - pregunta que acepta un solo valor',
			subtitle: 'elija una opción',
			code: 'p5',
			type: 'single',
			options: [
				...'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
				{ id: 'opcion 5', description: 'última opcion' },
			],
			other: {
				label: 'label other option',
				placeholder: 'ingrese otra opción',
				allowedChars: '0123456789-',
				description: 'ingrese solamente números y guiones',
			},
		},
		{
			id: 'ques_multiple',
			title: 'multiple - pregunta que acepta múltiples valores',
			subtitle: 'elija una o varias opciones',
			code: 'p6',
			type: 'multiple',
			options: [
				{ id: '0', label: 'opcion 0', description: 'primera opción' },
				{ id: '1', label: 'opción 1' },
				{ id: '2', label: 'opción 2' },
				{ id: '3', label: 'opción 3', description: 'última opción' },
				'ninguna',
			],
			answer: ['0', '2'],
			other: {
				label: 'cuit',
				placeholder: 'ingrese su cuit',
				allowedChars: '01234567890-',
				maxlength: 13,
				description: '##-#######-#',
			},
			required: false,
		},
		{
			id: 'ques_grid_single_select',
			title: 'grid-single, control: select',
			subtitle: 'varias preguntas que aceptan un solo valor',
			code: 'p7',
			type: 'grid-single',
			control: 'select',
			items: [
				...'pregunta 1, pregunta 2, pregunta 3'.split(', '),
				{ id: 'pregunta 4', label: 'última pregunta', required: true },
			],
			options: 'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
			answer: {
				'pregunta 1': 'opcion 2',
				'pregunta 2': 'opcion 3',
				'pregunta 3': 'opcion 2',
				'pregunta 4': 'otra opción',
			},
			other: {
				label: 'labelOther',
				placeholder: 'placeholderOther',
			},
		},
		{
			id: 'ques_single_combo',
			title: 'single, control: combo',
			subtitle: 'pregunta que acepta un solo valor',
			code: 'p8',
			type: 'single',
			control: 'select',
			options: [
				{
					id: '1',
					label: 'opcion 1',
					description: 'la descripción no es visible usando select como control',
				},
				{ id: '2', label: 'opcion 2' },
				'todas',
			],
			answer: 'opcion 2',
			other: {
				label: 'labelOther',
				placeholder: 'placeholderOther',
			},
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
			type: 'grid-text',
			// items: 'nombre, apellido, direccion'.split(', '),
			items: [
				{ id: 'nombre' },
				{ id: 'apellido', required: true },
				{ id: 'direccion', required: true },
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
			type: 'text',
			control: 'textarea',
			answer: 'ingrese su respuesta',
			required: true,
		},
		{
			id: 'ques_grid_single',
			title: 'grid-single - varias preguntas que aceptan un solo valor',
			type: 'grid-single',
			control: 'select',
			// items: 'pregunta 1, pregunta 2, pregunta 3'.split(', '),
			items: [
				{ id: 'pregunta 1', required: true },
				{ id: 'pregunta 2', required: true },
				{ id: 'pregunta 3', required: undefined },
			],
			options: 'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
			other: {
				label: 'labelOther',
				placeholder: 'placeholderOther',
			},
			required: false,
		},
	],
};

export const survey_ingles: Survey = {
	id: 'surv_ingles_experiencia',
	code: 'ingles',
	title: 'Evaluación de la experiencia en el curso de inglés',
	description:
		'por favor, responda a las siguientes preguntas para ayudarnos a mejorar nuestro curso de inglés',
	questions: [
		{
			id: 'ques_1',
			title: '¿Cómo te enteraste del curso?',
			type: 'single',
			options: [
				'Redes sociales',
				'Correo electrónico',
				'Búsqueda en internet',
				'Recomendación de un amigo',
				'Anuncio en línea',
			],
			answer: 'otra opción',
			other: true,
		},
		{
			id: 'ques_2',
			title: '¿Qué te pareció la calidad del contenido del curso?',
			type: 'rating',
			answer: 4,
		},
		{
			id: 'ques_3',
			title: '¿Cuánto tiempo dedicaste a estudiar cada semana?',
			type: 'single',
			options: ['Menos de 1 hora', '1-2 horas', '2-3 horas', '3-4 horas', 'Más de 4 horas'],
			answer: 'Más de 4 horas',
			other: false,
		},
		{
			id: 'ques_4',
			title: '¿Qué te gustaría ver incluido en futuras versiones del curso?',
			type: 'multiple',
			options: [
				'Más contenido de gramática',
				'Más contenido de vocabulario',
				'Más contenido de conversación',
				'Más contenido de lectura',
				'Más contenido de escritura',
			],
			answer: ['Más contenido de lectura', 'Más contenido de escritura', 'otra opción nueva'],
			other: true,
		},
		{
			id: 'ques_5',
			title: '¿Recomendarías este curso a otros?',
			type: 'single',
			options: ['Sí', 'No', 'No estoy seguro'],
			answer: 'No',
			other: false,
		},
		{
			id: 'ques_6',
			title: '¿Tienes alguna sugerencia para mejorar el curso?',
			type: 'text',
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
			subtitle: 'Algunos datos para conocerte mejor',
			type: 'grid-text',
			items: [
				'Nombre',
				'Apellido',
				{
					id: 'Bio',
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
			type: 'single',
			options: [
				'Sí',
				'más o menos',
				'Muy poco',
				{ id: 'Ir al final', next: 'ques_final' },
				{ id: 'Terminar esto ya', next: null },
			],
			other: false,
		},
		{
			id: 'ques_genero',
			code: '3',
			next: 'ques_final',
			title: '¿Qué género te gusta más?',
			type: 'single',
			options: [
				{ id: 'Ciencia ficción', next: 'ques_genero_ciencia' },
				{
					id: 'Acción',
					description: 'películas para ver tiros y piñas',
					next: 'ques_genero_accion',
				},
				{ id: 'Drama', description: 'películas para llorar' },
			],
			other: {
				label: 'labelOther',
				placeholder: 'Ingresa aquí el género de tu preferencia',
				next: 'ques_genero_otros',
			},
		},
		{
			id: 'ques_genero_ciencia',
			code: '3.1',
			next: 'ques_final',
			title: '¿Qué película de ciencia ficción es tu favorita?',
			type: 'single',
			options: [
				{ id: 'Star wars', next: 'ques_genero_ciencia_star' },
				'Blade runner',
				'2001',
				'Dune',
				'Mad max',
			],
			other: {
				label: 'labelOther',
				placeholder: 'Ingresa aquí tu película de ciencia ficción favorita',
				next: 'ques_feedback',
			},
		},
		{
			id: 'ques_genero_ciencia_star',
			code: '3.1.1',
			next: 'ques_feedback',
			title: '¿Qué película de la saga de Star wars es tu favorita?',
			type: 'single',
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
			type: 'single',
			options: ['Indiana Jones', 'James Bond', 'Duro de matar', 'Mad max'],
			other: true,
		},
		{
			id: 'ques_genero_otros',
			code: '3.3',
			title: '¿Qué película de ese género es tu favorita?',
			next: 'ques_feedback',
			type: 'text',
		},
		{
			id: 'ques_feedback',
			code: '4',
			title: '¿Qué mejorarías de esta entrevista?',
			type: 'multiple',
			options: [
				'preguntar por otros géneros',
				'Hacerla más larga',
				'Hacerla más corta',
				'No haría este tipo de entrevistas',
			],
			other: true,
		},
		{
			id: 'ques_final',
			code: '5',
			title: 'Gracias por completar la encuesta. ¿Querés hacer algún cambio?',
			subtitle: '',
			type: 'single',
			options: [
				'No, terminar la encuesta',
				{ id: 'Me equivoqué de género', next: 'ques_genero' },
				{ id: 'La quiero hacer de nuevo', next: 'ques_inicio' },
			],
		},
	],
};
