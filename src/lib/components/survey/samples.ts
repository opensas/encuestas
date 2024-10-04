import type { Survey } from '$lib/types';

export const survey_fp: Survey = {
	id: 'enc_001',
	code: 'fp',
	title: 'Satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL',
	description:
		'Encuesta de satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL de Formación Profesional presencial y semi-presencial Fomentar/VAT (NO - Auto asistidos)',
	questions: [
		{
			id: 'preg_001',
			title:
				'¿El curso/taller de orientación laboral le pareció útil para aumentar sus posibilidades de encontrar empleo?',
			description: 'Contanos que tan conforme estas con el desarrollo del programa',
			kind: 'single',
			options: ['Sí', 'Medianamente útil', 'NO'],
		},
		{
			id: 'preg_002',
			title:
				'¿Los contenidos, actividades y materiales del curso le resultaron comprensibles y adecuados?',
			description: '',
			kind: 'single',
			options: ['Sí', 'Medianamente comprensibles y adecuados', 'NO'],
		},
		{
			id: 'preg_003',
			title:
				'¿El capacitador del curso/taller de orientación laboral respondió a sus dudas o consultas cuando Ud. lo requirió?',
			description: '',
			kind: 'single',
			options: ['Sí', 'A veces', 'NO', 'No había docente/capacitador'],
		},
		{
			id: 'preg_004',
			title:
				'n caso de que el curso/taller de orientación laboral haya sido virtual ¿pudo acceder al campus/plataforma y a los materiales fácilmente?',
			description: '',
			kind: 'single',
			options: ['Sí', 'Con algunas dificultades', 'NO', 'No corresponde'],
		},
		{
			id: 'preg_005',
			title:
				'En caso que el curso/taller de orientación laboral haya sido presencial ¿le facilitaron los insumos, herramientas o equipos necesarios para el desarrollo del mismo?',
			description: '',
			kind: 'single',
			options: ['Sí', 'Parcialmente', 'NO', 'No corresponde'],
		},
		{
			id: 'preg_006',
			title:
				'Percibe que luego del curso/taller de orientación laboral, ¿tiene mayor confianza sobre su propio trabajo y sus habilidades?',
			description: '',
			kind: 'single',
			options: ['Sí', 'Parcialmente', 'NO'],
		},
	],
};

export const survey_fp_auto: Survey = {
	id: 'enc_001',
	code: 'fp-autoasistido',
	title:
		'Satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL - Auto asistidos',
	description:
		'Encuesta de satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL de Formación Profesional presencial y semi-presencial Fomentar/VAT - Auto asistidos',
	questions: [
		{
			id: 'preg_001',
			title: '¿El curso le pareció útil para aumentar sus posibilidades de encontrar empleo?',
			description: 'Contanos que tan conforme estas con el desarrollo del programa',
			kind: 'single',
			options: ['Sí', 'Medianamente útil', 'NO'],
			allowOther: false,
		},
		{
			id: 'preg_002',
			title:
				'¿Los contenidos, actividades y materiales del curso le resultaron comprensibles y adecuados?',
			description: '',
			kind: 'single',
			options: ['Sí', 'Medianamente comprensibles y adecuados', 'NO'],
			allowOther: false,
		},
		{
			id: 'preg_003',
			title: '¿Pudo acceder al campus y a los materiales fácilmente?',
			description: '',
			kind: 'single',
			options: ['Sí', 'Con algunas dificultades', 'NO', 'No corresponde'],
			allowOther: false,
		},
	],
};

export const survey_manos: Survey = {
	id: 'enc_001',
	code: 'manos',
	title: 'Manos a la obra',
	description: 'Encuesta de satisfacción del programa de Empleo manos a la obra',
	questions: [
		{
			id: 'preg_001',
			title: '¿Qué tan conforme está con la gestión del programa?',
			description: 'Indicanos que tan conforme estas con el desarrollo del programa',
			kind: 'single',
			options: ['mucho', 'bastante', 'normal', 'poco', 'nada conforme'],
			allowOther: false,
		},
		{
			id: 'preg_002',
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
			id: 'preg_002',
			title: '¿Qué puntaje le daría a la gestión del programa?',
			kind: 'rating',
		},
		{
			id: 'preg_002',
			title: '¿Alguna otro comentario que quiera hacernos llegar?',
			kind: 'text',
		},
	],
};

export const survey_aept: Survey = {
	id: 'enc_aept',
	code: 'aept',
	title: 'Evaluación de participantes de Acciones de Entrenamiento para el Trabajo (AEPT)',
	description:
		'Encuesta online para evaluar la satisfacción y experiencia de los participantes en el Programa de Entrenamiento para el Trabajo brindado por la Secretaría de Trabajo, Empleo y Seguridad Social (STEySS) / Subsecretarías de Empleo y Formación Laboral(SSEyFL).',
	questions: [
		{
			id: 'preg_1',
			code: 'P1',
			title:
				'¿Cuán satisfecho estás con el Programa de Entrenamiento para el Trabajo brindado por la STEySS/SSEyFL?',
			kind: 'single',
			options: ['Muy satisfecho', 'Satisfecho', 'Indistinto', 'Insatisfecho', 'Muy insatisfecho'],
		},
		{
			id: 'preg_2',
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
			id: 'preg_3',
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
			id: 'preg_4',
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
			id: 'preg_5',
			code: 'P5',
			next: 'preg_6',
			title: '¿Participaste en algún otro programa de la STEySS/SSEyFL?',
			kind: 'single',
			options: [{ title: 'Sí', next: 'preg_5_1' }, 'No'],
		},

		{
			id: 'preg_5_1',
			code: 'P5.1',
			next: 'preg_5_2',
			title: '¿En cuál programa de la STEySS/SSEyFL participaste?',
			kind: 'single',
			options: ['Cursos', 'Programa de Inserción Laboral', 'Programa de Empleo Independiente'],
			allowOther: true,
			placeholderOther: 'En qué otros programas participaste?',
		},

		{
			id: 'preg_5_2',
			code: 'P5.2',
			next: 'preg_6',
			title: '¿Considerás que la experiencia en esos programas...?',
			kind: 'multiple',
			options: [
				'Resultó una buena preparación para participar del entrenamiento',
				'Complementa la formación obtenida durante el entrenamiento',
			],
		},

		{
			id: 'preg_6',
			code: 'P6',
			title:
				'Para acceder al Entrenamiento para el trabajo ¿contaste con la asistencia de alguna Oficina de Empleo o Agencia Territorial?',
			kind: 'single',
			options: ['Si', 'No'],
		},
	],
};

export const survey_upep: Survey = {
	id: 'enc_upep',
	code: 'upep',
	title: 'Relevamiento de Unidades Productivas de la Economía Popular - Prueba piloto',
	intro: `

	Bienvenido al Registro de Unidades Productivas de la Economía Popular

	Las Unidades Productivas de la Economía Popular (UPEPs) son clave para la producción y generación de ingresos, pero su informalidad dificulta su identificación.

	Por tal motivo, nos proponemos crear un registro público para impulsar la productividad y formalidad de estas unidades, comenzando con las que participan en el Programa Volver al Trabajo.

	Por favor, completa el formulario adjunto para ayudarnos a conocer más sobre tu unidad productiva y contribuir al desarrollo de la economía popular.
	`,
	questions: [
		{
			id: 'preg_0',
			code: 'P0',
			title: 'Ingresá tus datos de contacto: nombre, apellido y celular',
			kind: 'grid-text',
			items: [
				{ title: 'Nombre', maxlength: 50, required: true },
				{ title: 'Apellido', maxlength: 50, required: true },
				{ title: 'Celular', maxlength: 50 },
			],
		},
		{
			id: 'preg_1',
			code: 'P1',
			title:
				'¿Hacés alguna actividad laboral en una organización comunitaria, barrial, social, familiar o cooperativa?',
			kind: 'single',
			options: ['Si', 'No'],
		},
		{
			id: 'preg_2',
			code: 'P2',
			title: '¿Cuál es el nombre de la unidad productiva/emprendimiento donde trabajas?',
			kind: 'text',
		},
		{
			id: 'preg_3',
			code: 'P3',
			title: 'Esa actividad, la realizás de manera…',
			kind: 'single',
			options: ['Colectiva, con otras personas', 'Individual'],
		},
		{
			id: 'preg_4',
			code: 'P4',
			title:
				'En la unidad productiva, ¿Quién toma las decisiones? Marque todas las opciones que correspondan',
			kind: 'multiple',
			options: ['Un referente', 'Un patrón o patrona', 'Un coordinador/a', 'Una asamblea'],
			allowOther: true,
			placeholderOther: 'Otro referente con poder de decisión',
		},
		{
			id: 'preg_5',
			code: 'P5',
			title: '¿Cuántas personas trabajan en la unidad productiva/emprendimiento, aproximadamente?',
			kind: 'text',
			control: 'input',
			maxlength: 4,
		},
		{
			id: 'preg_6',
			code: 'P6',
			title: '¿Cuál es la forma de organización de la unidad productiva / emprendimiento ?',
			kind: 'single',
			options: [
				'Cooperativa',
				'Cooperativa - Empresa recuperada',
				'Polo - Cooperativa de Liberados',
				'Pequeño emprendimiento familiar',
				'Pequeño emprendimiento no familiar',
				'Organización comunitaria / social',
				'Cuadrilla municipal',
			],
			allowOther: true,
		},
		{
			id: 'preg_7_1',
			code: 'P7.1',
			title: 'La unidad productiva/emprendimiento, ¿tiene relación con alguna organización social?',
			kind: 'single',
			options: ['No'],
			allowOther: true,
			placeholderOther: 'En caso afirmativo especifique el nombre de la organización social',
		},
		{
			id: 'preg_7_2',
			code: 'P7.2',
			title: 'La unidad productiva/emprendimiento, ¿tiene relación con una organización religiosa?',
			kind: 'single',
			options: ['No'],
			allowOther: true,
			placeholderOther: 'En caso afirmativo especifique el nombre de la organización religiosa',
		},
		{
			id: 'preg_7_3',
			code: 'P7.3',
			title: 'La unidad productiva/emprendimiento, ¿tiene relación con un gobierno municipal?',
			kind: 'single',
			options: ['No'],
			allowOther: true,
			placeholderOther: 'En caso afirmativo especifique el nombre del Municipio',
		},
		{
			id: 'preg_8',
			code: 'P8',
			title: '¿En qué provincia se encuentra localizada la unidad productiva?',
			kind: 'single',
			control: 'select',
			options: [
				'Buenos Aires',
				'CABA',
				'Catamarca',
				'Chaco',
				'Chubut',
				'Corrientes',
				'Entre Rios',
				'Formosa',
				'Jujuy',
				'La Pampa',
				'La Rioja',
				'Mendoza',
				'Misiones',
				'Neuquen',
				'Rio Negro',
				'Salta',
				'San Juan',
				'San Luis',
				'Santa Cruz',
				'Santa Fe',
				'Santiago del Estero',
				'Tierra del Fuego',
				'Tucuman',
			],
		},
		{
			id: 'preg_8_1',
			code: 'P8_1',
			title: '¿Cuál es el domicilio de la unidad productiva/emprendimiento?',
			description:
				'Complete los que correspondan. Si la unidad tiene más de un domicilio, por favor indique el más importante.',
			kind: 'grid-text',
			items: [
				'Calle',
				'Manzana',
				'Torre',
				'Lote',
				'Código Postal',
				'Departamento/ Partido',
				'Número',
				'Monoblock',
				'Piso / Depto',
				'Entre calles',
				'Localidad',
				'Comunidad',
			],
		},
		{
			id: 'preg_9',
			code: 'P9',
			title: '¿A qué se dedica o qué produce la unidad productiva/emprendimiento ?',
			kind: 'single',
			options: [
				{
					title: '1. Comercio popular y trabajos en espacios públicos',
					description: 'Ferias, venta ambulante, cuidado de coches, etc.',
					next: 'preg_9_1',
				},
				{
					title: '2. Recuperación, Reciclado y Servicios ambientales',
					description: 'Recolección de cartones y otros materiales, reciclado de residuos, etc.',
					next: 'preg_9_2',
				},
				{
					title: '3. Construcción e infraestructura social y Mejoramiento ambiental',
					next: 'preg_9_3',
				},
				{
					title: '4. Industria manufacturera',
					description: 'Elaboración de productos',
					next: 'preg_9_4',
				},
				{
					title: '5. Servicios socio comunitarios',
					description:
						'Comedores, merenderos, clubes barriales, salud comunitaria, cuidado de personas, apoyo escolar, medios comunitarios, espacios culturales, etc.',
					next: 'preg_9_5',
				},
				{ title: '6. Agricultura familiar y campesina', next: 'preg_9_6' },
				{ title: '7. Transporte', next: 'preg_9_7' },
			],
		},
		{
			id: 'preg_9_1',
			code: 'P9.1',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			kind: 'single',
			options: [
				'Artesano/a',
				'Artista Callejero',
				'Cuida Coche',
				'Feriante',
				{
					title: 'Intermediación solidaria',
					description: 'Ferias, mercado, Almacenes, Nodos, Galpones, Logística, etc.',
				},
				'Limpia vidrio //vehículos',
				'Mensajería // Delivery',
				'Vendedor/a ambulante',
				'Venta directa',
			],
			allowOther: true,
		},

		{
			id: 'preg_9_2',
			code: 'P9.2',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			kind: 'single',
			options: [
				'Carrero/a',
				'Cartonero/reciclador/a',
				'Chofer de camión',
				'Forestación',
				'Operario/a de plantas recicladora',
				'Promotor/a ambiental',
				'Reciclador/a de basura',
				'Recolectores/as de residuos en villas',
				'Trabajador/a de limpieza de terrenos y espacios verdes',
			],
			allowOther: true,
		},

		{
			id: 'preg_9_3',
			code: 'P9.3',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			kind: 'single',
			options: [
				'Albañil // Durlero',
				'Ayudante // Auxiliar en obras de construcción',
				'Electricista',
				'Gasista',
				'Herrería',
				'Pintor/a',
				'Plomero/a // Fontanero/a // Instalador/a de redes de agua potable y tuberías',
				'Soldador/a',
				'Techista // Zinguero // Zanjero',
				'Vidriero/a',
			],
			allowOther: true,
		},
		{
			id: 'preg_9_4',
			code: 'P9.4',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			kind: 'single',
			options: [
				'Producción de alimentos',
				'Fabricación de calzados',
				'Extracción y manufactura de minerales',
				'Indumentaria y Textil',
				'Producción de productos de tocador y limpieza',
				'Fabricante de Bloques // Ladrillero',
				'Carpintería y Zinguería',
				'Producción de productos sanitarios',
			],
			allowOther: true,
		},

		{
			id: 'preg_9_5',
			code: 'P9.5',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			kind: 'single',
			options: [
				'Acompañamiento de reinserción de liberados/as y recuperados/as',
				{
					title: 'Asistente Socio Educativo',
					description: 'Bachillerato Popular, Jardín Comunitario, Clases de apoyo escolar',
				},
				'Atención de Comedores y Merenderos Comunitarios',
				{
					title: 'Cuidados',
					description: 'Niños/as, enfermos/as, personas con discapacidad, ancianos/as',
				},
				'Promotor/a contra la violencia de género',
				'Promotor/a de salud',
				{
					title: 'Trabajador/a de Cultura Comunitaria',
					description: 'Talleres, Orquestas, Espacios Culturales',
				},
				'Trabajador/a de Medio de Comunicación Comunitaria',
				'Trabajador/a de deportes y recreación',
			],
			allowOther: true,
		},

		{
			id: 'preg_9_6',
			code: 'P9.6',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			kind: 'single',
			options: [
				'Agroindustria',
				'Agricultura',
				'Ganadería',
				'Pesca y Acuicultura',
				'Turismo rural',
				'Viveros y Huertas Urbanas',
			],
			allowOther: true,
		},

		{
			id: 'preg_9_7',
			code: 'P9.7',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			kind: 'single',
			options: [
				'Carga de mercadería',
				'Flete',
				'Mensajería // Delivery',
				'Transporte de pasajeros',
			],
			allowOther: true,
		},
	],
};

export const survey_ingles: Survey = {
	id: 'enc_ingles_experiencia',
	code: 'ingles',
	title: 'Evaluación de la experiencia en el curso de inglés',
	description:
		'Por favor, responda a las siguientes preguntas para ayudarnos a mejorar nuestro curso de inglés',
	questions: [
		{
			id: 'preg_1',
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
			id: 'preg_2',
			title: '¿Qué te pareció la calidad del contenido del curso?',
			kind: 'rating',
			answer: 4,
		},
		{
			id: 'preg_3',
			title: '¿Cuánto tiempo dedicaste a estudiar cada semana?',
			kind: 'single',
			options: ['Menos de 1 hora', '1-2 horas', '2-3 horas', '3-4 horas', 'Más de 4 horas'],
			answer: 'Más de 4 horas',
			allowOther: false,
		},
		{
			id: 'preg_4',
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
			id: 'preg_5',
			title: '¿Recomendarías este curso a otros?',
			kind: 'single',
			options: ['Sí', 'No', 'No estoy seguro'],
			answer: 'No',
			allowOther: false,
		},
		{
			id: 'preg_6',
			title: '¿Tienes alguna sugerencia para mejorar el curso?',
			kind: 'text',
			answer: 'agregar mas horarios',
		},
	],
};

export const survey_cine: Survey = {
	id: 'enc_condicional',
	code: 'cine',
	title: 'Encuesta cinéfila',
	description: 'Encuesta de prueba para probar caminos condicionales',
	questions: [
		{
			id: 'preg_inicio',
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
			id: 'preg_te_gusta_el_cine',
			title: '¿Te gusta el cine?',
			kind: 'single',
			options: [
				'Sí',
				'más o menos',
				'Muy poco',
				{ title: 'Ir al final', next: 'preg_final' },
				{ title: 'Terminar esto ya', next: null },
			],
			allowOther: false,
		},

		{
			id: 'preg_genero',
			next: 'preg_final',
			title: '¿Qué género te gusta más?',
			kind: 'single',
			options: [
				{ title: 'Ciencia ficción', next: 'preg_genero_ciencia' },
				{
					title: 'Acción',
					description: 'Películas para ver tiros y piñas',
					next: 'preg_genero_accion',
				},
				{ title: 'Drama', description: 'Películas para llorar' },
			],
			allowOther: true,
			placeholderOther: 'Ingresa aquí el género de tu preferencia',
			nextOther: 'preg_genero_otros',
		},

		{
			id: 'preg_genero_ciencia',
			next: 'preg_final',
			title: '¿Qué película de ciencia ficción es tu favorita?',
			kind: 'single',
			options: [
				{ title: 'Star wars', next: 'preg_genero_ciencia_star' },
				'Blade runner',
				'2001',
				'Dune',
				'Mad max',
			],
			allowOther: true,
			placeholderOther: 'Ingresa aquí tu película de ciencia ficción favorita',
			nextOther: 'preg_feedback',
		},

		{
			id: 'preg_genero_ciencia_star',
			next: 'preg_feedback',
			title: '¿Qué película de la saga de Star wars es tu favorita?',
			kind: 'single',
			options: [
				'Una nueva esperanza (IV)',
				'El imperio contra-ataca (V)',
				'El retorno del Jedi (VI)',
			],
		},

		{
			id: 'preg_genero_accion',
			next: 'preg_feedback',
			title: '¿Qué película de acción es tu favorita?',
			kind: 'single',
			options: ['Indiana Jones', 'James Bond', 'Duro de matar', 'Mad max'],
			allowOther: true,
		},

		{
			id: 'preg_genero_otros',
			next: 'preg_feedback',
			title: '¿Qué película de ese género es tu favorita?',
			kind: 'text',
		},

		{
			id: 'preg_feedback',
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
			id: 'preg_final',
			title: 'Gracias por completar la encuesta. ¿Querés hacer algún cambio?',
			description: '',
			kind: 'single',
			options: [
				'No, terminar la encuesta',
				{ title: 'Me equivoqué de género', next: 'preg_genero' },
				{ title: 'La quiero hacer de nuevo', next: 'preg_inicio' },
			],
		},
	],
};

export const survey_test: Survey = {
	id: 'enc_test',
	code: 'test',
	title: 'Encuesta de muestra de los distintos tipos de pregunta',
	intro: `
	Bienvenido a la encuesta de muestra
	Te damos al bienvenida a esta encuesta de muestra
	Esperamos que te resulte útil
	`,
	questions: [
		{
			id: 'preg_grid_single',
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
			required: false,
		},
		{
			id: 'preg_grid_text',
			title: 'grid-text - pregunta que acepta múltiples inputs',
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
			id: 'preg_rating',
			title: 'rating - pregunta que acepta un puntaje',
			kind: 'rating',
			required: true,
		},
		{
			id: 'preg_text',
			title: 'text - pregunta que acepta un texto libre',
			kind: 'text',
			control: 'textarea',
			answer: 'ingrese su respuesta',
			required: true,
		},
		{
			id: 'preg_single',
			title: 'single - pregunta que acepta un solo valor',
			kind: 'single',
			options: 'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
			allowOther: true,
		},
		{
			id: 'preg_multiple',
			title: 'multiple - pregunta que acepta múltiples valores',
			kind: 'multiple',
			options: 'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
			answer: ['opcion 2', 'opcion 3'],
			allowOther: true,
			required: false,
		},

		{
			id: 'preg_grid_single_select',
			title: 'grid-single, control: select - varias preguntas que aceptan un solo valor',
			kind: 'grid-single',
			control: 'select',
			items: 'pregunta 1, pregunta 2, pregunta 3'.split(', '),
			options: 'opcion 1, opcion 2, opcion 3, opcion 4'.split(', '),
			answer: { 'pregunta 1': 'opcion 2', 'pregunta 2': 'opcion 3', 'pregunta 3': 'opcion 2' },
			allowOther: true,
		},

		{
			id: 'preg_single_combo',
			title: 'single, control: combo - pregunta que acepta un solo valor',
			kind: 'single',
			control: 'select',
			options: 'opcion 1, opcion 2, opcion 3, opcion 4, opcion 5, opcion 6'.split(', '),
			answer: 'opcion 2',
			allowOther: true,
		},
	],
};

export const surveys = [
	survey_aept,
	survey_upep,
	survey_fp,
	survey_fp_auto,
	survey_manos,
	survey_ingles,
	survey_cine,
	survey_test,
];
export const DEFAULT_SURVEY = survey_upep;
