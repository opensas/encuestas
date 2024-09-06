import type { Encuesta } from '$lib/types';

export const encuesta_fp: Encuesta = {
	id: 'enc_001',
	codigo: 'fp',
	titulo: 'Satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL',
	descripcion:
		'Encuesta de satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL de Formación Profesional presencial y semi-presencial Fomentar/VAT (NO - Auto asistidos)',
	preguntas: [
		{
			id: 'preg_001',
			titulo: '¿El curso/taller de orientación laboral le pareció útil para aumentar sus posibilidades de encontrar empleo?',
			descripcion: 'Contanos que tan conforme estas con el desarrollo del programa',
			tipo: 'unica',
			opciones: ['Sí', 'Medianamente útil', 'NO']
		},
		{
			id: 'preg_002',
			titulo:
				'¿Los contenidos, actividades y materiales del curso le resultaron comprensibles y adecuados?',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'Medianamente comprensibles y adecuados', 'NO']
		},
		{
			id: 'preg_003',
			titulo:
				'¿El capacitador del curso/taller de orientación laboral respondió a sus dudas o consultas cuando Ud. lo requirió?',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'A veces', 'NO', 'No había docente/capacitador']
		},
		{
			id: 'preg_004',
			titulo:
				'n caso de que el curso/taller de orientación laboral haya sido virtual ¿pudo acceder al campus/plataforma y a los materiales fácilmente?',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'Con algunas dificultades', 'NO', 'No corresponde']
		},
		{
			id: 'preg_005',
			titulo:
				'En caso que el curso/taller de orientación laboral haya sido presencial ¿le facilitaron los insumos, herramientas o equipos necesarios para el desarrollo del mismo?',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'Parcialmente', 'NO', 'No corresponde']
		},
		{
			id: 'preg_006',
			titulo:
				'Percibe que luego del curso/taller de orientación laboral, ¿tiene mayor confianza sobre su propio trabajo y sus habilidades?',
			descripcion: '',
			tipo: 'unica',
			opciones: ['Sí', 'Parcialmente', 'NO']
		}
	]
};

export const encuesta_fp_auto: Encuesta = {
	id: 'enc_001',
	codigo: 'fp-autoasistido',
	titulo:
		'Satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL - Auto asistidos',
	descripcion:
		'Encuesta de satisfacción de participantes de cursos y TALLERES DE ORIENTACIÓN LABORAL de Formación Profesional presencial y semi-presencial Fomentar/VAT - Auto asistidos',
	preguntas: [
		{
			id: 'preg_001',
			titulo: '¿El curso le pareció útil para aumentar sus posibilidades de encontrar empleo?',
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
			titulo: '¿Pudo acceder al campus y a los materiales fácilmente?',
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

export const encuesta_cine: Encuesta = {
	id: 'enc_condicional',
	codigo: 'cine',
	titulo: 'Encuesta cinéfila',
	descripcion: 'Encuesta de prueba para probar caminos condicionales',
	preguntas: [
		{
			id: 'preg_inicio',
			titulo: '¿Te gusta el cine?',
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
				'en fin...',
				{ titulo: 'Me equivoqué de género', proxima: 'preg_genero' },
				{ titulo: 'La quiero hacer de nuevo', proxima: 'preg_inicio' }
			],
			acepta_otros: true,
			texto_otros: 'Ingresa aquí tu opinión'
		}
	]
};

export const encuesta_aept: Encuesta = {
	id: 'enc_aept',
	codigo: 'aept',
	titulo: 'Evaluación de participantes de Acciones de Entrenamiento para el Trabajo (AEPT)',
	descripcion:
		'Encuesta online para evaluar la satisfacción y experiencia de los participantes en el Programa de Entrenamiento para el Trabajo brindado por la Secretaría de Trabajo, Empleo y Seguridad Social (STEySS) / Subsecretarías de Empleo y Formación Laboral(SSEyFL).',
	preguntas: [
		{
			id: 'preg_1',
			codigo: 'P1',
			titulo:
				'¿Cuán satisfecho estás con el Programa de Entrenamiento para el Trabajo brindado por la STEySS/SSEyFL?',
			tipo: 'unica',
			opciones: ['Muy satisfecho', 'Satisfecho', 'Indistinto', 'Insatisfecho', 'Muy insatisfecho']
		},
		{
			id: 'preg_2_1',
			codigo: 'P2.1',
			titulo:
				'¿Cómo fue tu experiencia en relación al "Registro en el Portal Empleo" para acceder al Entrenamiento para el Trabajo?',
			tipo: 'unica',
			opciones: ['Buena', 'Regular', 'Mala']
		},
		{
			id: 'preg_2_2',
			codigo: 'P2.2',
			titulo:
				'¿Cómo fue tu experiencia en relación a la "Búsqueda de la oferta de EPT" para acceder al Entrenamiento para el Trabajo?',
			tipo: 'unica',
			opciones: ['Buena', 'Regular', 'Mala']
		},
		{
			id: 'preg_2_3',
			codigo: 'P2.3',
			titulo:
				'¿Cómo fue tu experiencia en relación a la "Postulación a la oferta de EPT" para acceder al Entrenamiento para el Trabajo?',
			tipo: 'unica',
			opciones: ['Buena', 'Regular', 'Mala']
		},

		{
			id: 'preg_3_1',
			codigo: 'P3.1',
			titulo:
				'¿En qué medida acordás con que "Me permitió adquirir nuevos conocimientos y habilidades" sobre la participación en la práctica de Entrenamiento para el Trabajo?',
			tipo: 'unica',
			opciones: [
				'Muy de acuerdo',
				'De acuerdo',
				'Ni de acuerdo ni en desacuerdo',
				'En desacuerdo',
				'Muy en desacuerdo'
			]
		},
		{
			id: 'preg_3_2',
			codigo: 'P3.2',
			titulo:
				'¿En qué medida acordás con que "Mejora mis posibilidades de conseguir trabajo" sobre la participación en la práctica de Entrenamiento para el Trabajo?',
			tipo: 'unica',
			opciones: [
				'Muy de acuerdo',
				'De acuerdo',
				'Ni de acuerdo ni en desacuerdo',
				'En desacuerdo',
				'Muy en desacuerdo'
			]
		},

		{
			id: 'preg_4',
			codigo: 'P4',
			titulo:
				'¿La empresa cumplió con los siguientes compromisos establecidos en el Acuerdo de Entrenamiento para el Trabajo?',
			tipo: 'multiple',
			opciones: [
				'Cantidad de horas',
				'Días y horarios',
				'Tareas del puesto',
				'Acompañamiento de un tutor'
			]
		},

		{
			id: 'preg_5',
			codigo: 'P5',
			proxima: 'preg_6',
			titulo: '¿Participaste en algún otro programa de la STEySS/SSEyFL?',
			tipo: 'unica',
			opciones: [{ titulo: 'Sí', proxima: 'preg_5_1' }, 'No']
		},

		{
			id: 'preg_5_1',
			codigo: 'P5.1',
			proxima: 'preg_5_2',
			titulo: '¿En cuál programa de la STEySS/SSEyFL participaste?',
			tipo: 'unica',
			opciones: ['Cursos', 'Programa de Inserción Laboral', 'Programa de Empleo Independiente'],
			acepta_otros: true,
			texto_otros: 'En qué otros programas participaste?'
		},

		{
			id: 'preg_5_2',
			codigo: 'P5.2',
			proxima: 'preg_6',
			titulo: '¿Considerás que la experiencia en esos programas...?',
			tipo: 'multiple',
			opciones: [
				'Resultó una buena preparación para participar del entrenamiento',
				'Complementa la formación obtenida durante el entrenamiento'
			]
		},

		{
			id: 'preg_6',
			codigo: 'P6',
			titulo:
				'Para acceder al Entrenamiento para el trabajo ¿contaste con la asistencia de alguna Oficina de Empleo o Agencia Territorial?',
			tipo: 'unica',
			opciones: ['Si', 'No']
		}
	]
};

const CRLF = '\n';

export const encuesta_upep: Encuesta = {
	id: 'enc_upep',
	codigo: 'upep',
	titulo: 'Relevamiento de Unidades Productivas de la Economía Popular - Prueba piloto',
	preguntas: [
		{
			id: 'preg_0',
			codigo: 'P0',
			titulo: 'Ingresá tus datos de contacto: nombre, apellido y celular',
			tipo: 'libre',
			respuesta: `Nombre: ${CRLF}Apellido: ${CRLF}Celular: `
		},
		{
			id: 'preg_1',
			codigo: 'P1',
			titulo:
				'¿Hacés alguna actividad laboral en una organización comunitaria, barrial, social, familiar o cooperativa?',
			tipo: 'unica',
			opciones: ['Si', 'No']
		},
		{
			id: 'preg_2',
			codigo: 'P2',
			titulo: '¿Cuál es el nombre de la unidad productiva/emprendimiento donde trabajas?',
			tipo: 'libre'
		},
		{
			id: 'preg_3',
			codigo: 'P3',
			titulo: 'Esa actividad, la realizás de manera…',
			tipo: 'unica',
			opciones: ['Colectiva, con otras personas', 'Individual']
		},
		{
			id: 'preg_4',
			codigo: 'P4',
			titulo:
				'En la unidad productiva, ¿Quién toma las decisiones? Marque todas las opciones que correspondan',
			tipo: 'multiple',
			opciones: ['Un referente', 'Un patrón o patrona', 'Un coordinador/a', 'Una asamblea'],
			acepta_otros: true,
			texto_otros: 'Otro referente con poder de decisión'
		},
		{
			id: 'preg_5',
			codigo: 'P5',
			titulo: '¿Cuántas personas trabajan en la unidad productiva/emprendimiento, aproximadamente?',
			tipo: 'libre',
			control: 'input',
			maxlength: 4
		},
		{
			id: 'preg_6',
			codigo: 'P6',
			titulo: '¿Cuál es la forma de organización de la unidad productiva / emprendimiento ?',
			tipo: 'unica',
			opciones: [
				'Cooperativa',
				'Cooperativa - Empresa recuperada',
				'Polo - Cooperativa de Liberados',
				'Pequeño emprendimiento familiar',
				'Pequeño emprendimiento no familiar',
				'Organización comunitaria / social',
				'Cuadrilla municipal'
			],
			acepta_otros: true
		},
		{
			id: 'preg_7_1',
			codigo: 'P7.1',
			titulo:
				'La unidad productiva/emprendimiento, ¿tiene relación con alguna organización social?',
			tipo: 'unica',
			opciones: ['No'],
			acepta_otros: true,
			texto_otros: 'En caso afirmativo especifique el nombre de la organización social'
		},
		{
			id: 'preg_7_2',
			codigo: 'P7.2',
			titulo:
				'La unidad productiva/emprendimiento, ¿tiene relación con una organización religiosa?',
			tipo: 'unica',
			opciones: ['No'],
			acepta_otros: true,
			texto_otros: 'En caso afirmativo especifique el nombre de la organización religiosa'
		},
		{
			id: 'preg_7_3',
			codigo: 'P7.3',
			titulo: 'La unidad productiva/emprendimiento, ¿tiene relación con un gobierno municipal?',
			tipo: 'unica',
			opciones: ['No'],
			acepta_otros: true,
			texto_otros: 'En caso afirmativo especifique el nombre del Municipio'
		},
		{
			id: 'preg_8',
			codigo: 'P8',
			titulo: '¿En qué provincia se encuentra localizada la unidad productiva?',
			tipo: 'unica',
			opciones: [
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
				'Tucuman'
			]
		},
		{
			id: 'preg_8_1',
			codigo: 'P8_1',
			titulo: '¿Cuál es el domicilio de la unidad productiva/emprendimiento?',
			descripcion:
				'Dirección completa (calle, nro, piso/depto, manzana, lote) cp, localidad, departamento/partido. Si la unidad tiene más de un domicilio, por favor indique el más importante.',
			tipo: 'libre'
		},
		{
			id: 'preg_9',
			codigo: 'P9',
			titulo: '¿A qué se dedica o qué produce la unidad productiva/emprendimiento ?',
			tipo: 'unica',
			opciones: [
				{
					titulo: '1. Comercio popular y trabajos en espacios públicos',
					descripcion: 'Ferias, venta ambulante, cuidado de coches, etc.',
					proxima: 'preg_9_1'
				},
				{
					titulo: '2. Recuperación, Reciclado y Servicios ambientales',
					descripcion: 'Recolección de cartones y otros materiales, reciclado de residuos, etc.',
					proxima: 'preg_9_2'
				},
				{
					titulo: '3. Construcción e infraestructura social y Mejoramiento ambiental',
					proxima: 'preg_9_3'
				},
				{
					titulo: '4. Industria manufacturera',
					descripcion: 'Elaboración de productos',
					proxima: 'preg_9_4'
				},
				{
					titulo: '5. Servicios socio comunitarios',
					descripcion:
						'Comedores, merenderos, clubes barriales, salud comunitaria, cuidado de personas, apoyo escolar, medios comunitarios, espacios culturales, etc.',
					proxima: 'preg_9_5'
				},
				{ titulo: '6. Agricultura familiar y campesina', proxima: 'preg_9_6' },
				{ titulo: '7. Transporte', proxima: 'preg_9_7' }
			]
		},
		{
			id: 'preg_9_1',
			codigo: 'P9.1',
			proxima: null,
			titulo: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			descripcion:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			tipo: 'unica',
			opciones: [
				'Artesano/a',
				'Artista Callejero',
				'Cuida Coche',
				'Feriante',
				{
					titulo: 'Intermediación solidaria',
					descripcion: 'Ferias, mercado, Almacenes, Nodos, Galpones, Logística, etc.'
				},
				'Limpia vidrio //vehículos',
				'Mensajería // Delivery',
				'Vendedor/a ambulante',
				'Venta directa'
			],
			acepta_otros: true
		},

		{
			id: 'preg_9_2',
			codigo: 'P9.2',
			proxima: null,
			titulo: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			descripcion:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			tipo: 'unica',
			opciones: [
				'Carrero/a',
				'Cartonero/reciclador/a',
				'Chofer de camión',
				'Forestación',
				'Operario/a de plantas recicladora',
				'Promotor/a ambiental',
				'Reciclador/a de basura',
				'Recolectores/as de residuos en villas',
				'Trabajador/a de limpieza de terrenos y espacios verdes'
			],
			acepta_otros: true
		},

		{
			id: 'preg_9_3',
			codigo: 'P9.3',
			proxima: null,
			titulo: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			descripcion:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			tipo: 'unica',
			opciones: [
				'Albañil // Durlero',
				'Ayudante // Auxiliar en obras de construcción',
				'Electricista',
				'Gasista',
				'Herrería',
				'Pintor/a',
				'Plomero/a // Fontanero/a // Instalador/a de redes de agua potable y tuberías',
				'Soldador/a',
				'Techista // Zinguero // Zanjero',
				'Vidriero/a'
			],
			acepta_otros: true
		},
		{
			id: 'preg_9_4',
			codigo: 'P9.4',
			proxima: null,
			titulo: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			descripcion:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			tipo: 'unica',
			opciones: [
				'Producción de alimentos',
				'Fabricación de calzados',
				'Extracción y manufactura de minerales',
				'Indumentaria y Textil',
				'Producción de productos de tocador y limpieza',
				'Fabricante de Bloques // Ladrillero',
				'Carpintería y Zinguería',
				'Producción de productos sanitarios'
			],
			acepta_otros: true
		},

		{
			id: 'preg_9_5',
			codigo: 'P9.5',
			proxima: null,
			titulo: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			descripcion:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			tipo: 'unica',
			opciones: [
				'Acompañamiento de reinserción de liberados/as y recuperados/as',
				{
					titulo: 'Asistente Socio Educativo',
					descripcion: 'Bachillerato Popular, Jardín Comunitario, Clases de apoyo escolar'
				},
				'Atención de Comedores y Merenderos Comunitarios',
				{
					titulo: 'Cuidados',
					descripcion: 'Niños/as, enfermos/as, personas con discapacidad, ancianos/as'
				},
				'Promotor/a contra la violencia de género',
				'Promotor/a de salud',
				{
					titulo: 'Trabajador/a de Cultura Comunitaria',
					descripcion: 'Talleres, Orquestas, Espacios Culturales'
				},
				'Trabajador/a de Medio de Comunicación Comunitaria',
				'Trabajador/a de deportes y recreación'
			],
			acepta_otros: true
		},

		{
			id: 'preg_9_6',
			codigo: 'P9.6',
			proxima: null,
			titulo: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			descripcion:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			tipo: 'unica',
			opciones: [
				'Agroindustria',
				'Agricultura',
				'Ganadería',
				'Pesca y Acuicultura',
				'Turismo rural',
				'Viveros y Huertas Urbanas'
			],
			acepta_otros: true
		},

		{
			id: 'preg_9_7',
			codigo: 'P9.7',
			proxima: null,
			titulo: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			descripcion:
				'Elija una opción de la rama de actividad de la unidad productiva/emprendimiento',
			tipo: 'unica',
			opciones: [
				'Carga de mercadería',
				'Flete',
				'Mensajería // Delivery',
				'Transporte de pasajeros'
			],
			acepta_otros: true
		}
	]
};

export const encuestas = [
	encuesta_aept,
	encuesta_upep,
	encuesta_fp,
	encuesta_fp_auto,
	encuesta_manos,
	encuesta_ingles,
	encuesta_cine
];
export const DEFAULT_ENCUESTA = encuesta_aept;
