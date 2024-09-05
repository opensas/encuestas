import type { Encuesta } from '$lib/types';

export const encuesta_fp: Encuesta = {
	id: 'enc_001',
	codigo: 'fp',
	titulo: 'Satisfacción de participantes de cursos de Formación Profesional ',
	descripcion:
		'¿Cómo fue tu experiencia en los cursos de Formación Profesional presencial y semi-presencial Fomentar/VAT?',
	preguntas: [
		{
			id: 'preg_001',
			titulo: '¿El curso le pareció útil para aumentar sus posibilidades de encontrar empleo? ',
			descripcion: 'Contanos que tan conforme estas con el desarrollo del programa',
			tipo: 'unica',
			opciones: ['Sí', 'Medianamente útil', 'NO'],
			acepta_otros: false
		},
		{
			id: 'preg_002',
			titulo:
				'¿Los contenidos, actividades y materiales del curso le resultaron comprensibles y adecuados?',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'Medianamente comprensibles y adecuados', 'NO'],
			acepta_otros: false
		},
		{
			id: 'preg_003',
			titulo: '¿El docente del curso respondió a sus dudas o consultas cuando Ud. lo requirió?',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'A veces', 'NO', 'No había docente'],
			acepta_otros: false
		},
		{
			id: 'preg_004',
			titulo:
				'En caso de que el curso haya sido virtual ¿pudo acceder al campus y a los materiales fácilmente? ',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'Con algunas dificultades', 'NO', 'No corresponde'],
			acepta_otros: false
		},
		{
			id: 'preg_005',
			titulo:
				'En caso que el curso haya sido presencial ¿le facilitaron los insumos, herramientas o equipos necesarios para el desarrollo del mismo?',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'Parcialmente', 'NO', 'No corresponde'],
			acepta_otros: false
		}
	]
};

export const encuesta_fp_auto: Encuesta = {
	id: 'enc_001',
	codigo: 'fp-autoasistido',
	titulo: 'Satisfacción de participantes de cursos de Formación Profesional ',
	descripcion:
		'¿Cómo fue tu experiencia en los cursos de Formación Profesional auto-asistida Fomentar/VAT?',
	preguntas: [
		{
			id: 'preg_001',
			titulo: '¿El curso le pareció útil para aumentar sus posibilidades de encontrar empleo? ',
			descripcion: 'Contanos que tan conforme estas con el desarrollo del programa',
			tipo: 'unica',
			opciones: ['Sí', 'Medianamente útil', 'NO'],
			acepta_otros: false
		},
		{
			id: 'preg_002',
			titulo:
				'¿Los contenidos, actividades y materiales del curso le resultaron comprensibles y adecuados?',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'Medianamente comprensibles y adecuados', 'NO'],
			acepta_otros: false
		},
		{
			id: 'preg_003',
			titulo: '¿Pudo acceder al campus y a los materiales fácilmente? ',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'Con algunas dificultades', 'NO', 'No corresponde'],
			acepta_otros: false
		}
	]
};

export const encuesta_manos: Encuesta = {
	id: 'enc_001',
	codigo: 'manos',
	titulo: 'Manos a la obra',
	descripcion: 'Encuesta de satisfacción del programa de Empleo manos a la obra',
	preguntas: [
		{
			id: 'preg_001',
			titulo: '¿Qué tan conforme está con la gestión del programa?',
			descripcion: 'Indicanos que tan conforme estas con el desarrollo del programa',
			tipo: 'unica',
			opciones: ['mucho', 'bastante', 'normal', 'poco', 'nada conforme'],
			acepta_otros: false
		},
		{
			id: 'preg_002',
			titulo: '¿Cómo mejoraría la gestión del programa?',
			tipo: 'multiple',
			opciones: [
				'más opciones de cursos',
				'mejores docentes',
				'mejor equipamiento',
				{
					titulo: 'más difusión',
					descripcion: 'darle mas difusión a través de medios de comunicación y redes sociales'
				}
			],
			acepta_otros: true
		},
		{
			id: 'preg_002',
			titulo: '¿Qué puntaje le daría a la gestión del programa?',
			tipo: 'puntaje'
		},
		{
			id: 'preg_002',
			titulo: '¿Alguna otro comentario que quiera hacernos llegar?',
			tipo: 'libre'
		}
	]
};

export const encuesta_ingles: Encuesta = {
	id: 'enc_ingles_experiencia',
	codigo: 'ingles',
	titulo: 'Evaluación de la experiencia en el curso de inglés',
	descripcion:
		'Por favor, responda a las siguientes preguntas para ayudarnos a mejorar nuestro curso de inglés',
	preguntas: [
		{
			id: 'preg_1',
			titulo: '¿Cómo te enteraste del curso?',
			tipo: 'unica',
			opciones: [
				'Redes sociales',
				'Correo electrónico',
				'Búsqueda en internet',
				'Recomendación de un amigo',
				'Anuncio en línea'
			],
			respuesta: 'otra opcion',
			acepta_otros: true
		},
		{
			id: 'preg_2',
			titulo: '¿Qué te pareció la calidad del contenido del curso?',
			tipo: 'puntaje',
			respuesta: 4
		},
		{
			id: 'preg_3',
			titulo: '¿Cuánto tiempo dedicaste a estudiar cada semana?',
			tipo: 'unica',
			opciones: ['Menos de 1 hora', '1-2 horas', '2-3 horas', '3-4 horas', 'Más de 4 horas'],
			respuesta: 'Más de 4 horas',
			acepta_otros: false
		},
		{
			id: 'preg_4',
			titulo: '¿Qué te gustaría ver incluido en futuras versiones del curso?',
			tipo: 'multiple',
			opciones: [
				'Más contenido de gramática',
				'Más contenido de vocabulario',
				'Más contenido de conversación',
				'Más contenido de lectura',
				'Más contenido de escritura'
			],
			respuesta: ['Más contenido de lectura', 'Más contenido de escritura', 'otra opcion nueva'],
			acepta_otros: true
		},
		{
			id: 'preg_5',
			titulo: '¿Recomendarías este curso a otros?',
			tipo: 'unica',
			opciones: ['Sí', 'No', 'No estoy seguro'],
			respuesta: 'No',
			acepta_otros: false
		},
		{
			id: 'preg_6',
			titulo: '¿Tienes alguna sugerencia para mejorar el curso?',
			tipo: 'libre',
			respuesta: 'agregar mas horarios'
		}
	]
};

export const encuesta_cinefila: Encuesta = {
	id: 'enc_condicional',
	codigo: 'cinefila',
	titulo: 'Encuesta cinéfila',
	descripcion: 'Encuesta de prueba para probar caminos condicionales',
	preguntas: [
		{
			id: 'preg_inicio',
			titulo: 'Te gusta el cine? ',
			tipo: 'unica',
			opciones: [
				'Sí',
				'más o menos',
				'Muy poco',
				{ titulo: 'Ir al final', proxima: 'preg_final' },
				{ titulo: 'Terminar esto ya', proxima: null }
			],
			acepta_otros: false
		},

		{
			id: 'preg_genero',
			proxima: 'preg_final',
			titulo: '¿Qué género te gusta más?',
			tipo: 'unica',
			opciones: [
				{ titulo: 'Ciencia ficción', proxima: 'preg_genero_ciencia' },
				{
					titulo: 'Acción',
					descripcion: 'Películas para ver tiros y piñas',
					proxima: 'preg_genero_accion'
				},
				{ titulo: 'Drama', descripcion: 'Películas para llorar' }
			],
			acepta_otros: true,
			texto_otros: 'Ingresa aquí el género de tu preferencia',
			proxima_otros: 'preg_genero_otros'
		},

		{
			id: 'preg_genero_ciencia',
			proxima: 'preg_final',
			titulo: '¿Qué película de ciencia ficción es tu favorita?',
			tipo: 'unica',
			opciones: [
				{ titulo: 'Star wars', proxima: 'preg_genero_ciencia_star' },
				'Blade runner',
				'2001',
				'Dune',
				'Mad max'
			],
			acepta_otros: true,
			texto_otros: 'Ingresa aquí tu película de ciencia ficción favorita',
			proxima_otros: 'preg_final'
		},

		{
			id: 'preg_genero_ciencia_star',
			proxima: 'preg_final',
			titulo: '¿Qué película de la saga de Star wars es tu favorita?',
			tipo: 'unica',
			opciones: [
				'Una nueva esperanza (IV)',
				'El imperio contra-ataca (V)',
				'El retorno del Jedi (VI)'
			]
		},

		{
			id: 'preg_genero_accion',
			proxima: 'preg_final',
			titulo: '¿Qué película de acción es tu favorita?',
			tipo: 'unica',
			opciones: ['Indiana Jones', 'James Bond', 'Duro de matar', 'Mad max'],
			acepta_otros: true
		},

		{
			id: 'preg_genero_otros',
			proxima: 'preg_final',
			titulo: '¿Qué película de ese género es tu favorita?',
			tipo: 'libre'
		},

		{
			id: 'preg_final',
			titulo: '¿Qué te pareció esta encuesta?',
			descripcion: '',
			tipo: 'unica',
			opciones: [
				'Me encantó',
				'Muy bueno',
				'bueh...',
				{ titulo: 'Me equivoqué de género', proxima: 'preg_genero' },
				{ titulo: 'La quiero hacer de nuevo', proxima: 'preg_inicio' }
			],
			acepta_otros: true,
			texto_otros: 'Ingresa aquí tu opinión'
		}
	]
};

export const encuestas = [
	encuesta_fp,
	encuesta_fp_auto,
	encuesta_manos,
	encuesta_ingles,
	encuesta_cinefila
];
export const DEFAULT_ENCUESTA = encuesta_ingles;
