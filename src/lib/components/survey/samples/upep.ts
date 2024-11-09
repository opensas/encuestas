import type { Survey } from '$lib/types';

export const survey_upep_v1: Survey = {
	id: 'surv_upep_v1',
	code: 'upep_v1',
	title: 'Relevamiento de Unidades Productivas de la Economía Popular - Prueba piloto',
	intro: `

	Bienvenido al Registro de Unidades Productivas de la Economía Popular

	Las Unidades Productivas de la Economía Popular (UPEPs) son clave para la producción y generación de ingresos, pero su informalidad dificulta su identificación.

	Por tal motivo, nos proponemos crear un registro público para impulsar la productividad y formalidad de estas unidades, comenzando con las que participan en el Programa Volver al Trabajo.

	Por favor, completa el formulario adjunto para ayudarnos a conocer más sobre tu unidad productiva y contribuir al desarrollo de la economía popular.
	`,
	questions: [
		{
			id: 'ques_0',
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
			id: 'ques_1',
			code: 'P1',
			title:
				'¿Hacés alguna actividad laboral en una organización comunitaria, barrial, social, familiar o cooperativa?',
			kind: 'single',
			options: ['Sí', 'No'],
		},
		{
			id: 'ques_2',
			code: 'P2',
			title: '¿Cuál es el nombre de la unidad productiva/emprendimiento donde trabajas?',
			kind: 'text',
			control: 'input',
		},
		{
			id: 'ques_3',
			code: 'P3',
			title: 'Esa actividad, la realizás de manera…',
			kind: 'single',
			options: ['Colectiva, con otras personas', 'Individual'],
		},
		{
			id: 'ques_4',
			code: 'P4',
			title:
				'En la unidad productiva, ¿Quién toma las decisiones? Marque todas las opciones que correspondan',
			kind: 'multiple',
			options: ['Un referente', 'Un patrón o patrona', 'Un coordinador/a', 'Una asamblea'],
			allowOther: true,
			placeholderOther: 'Otro referente con poder de decisión',
		},
		{
			id: 'ques_5',
			code: 'P5',
			title: '¿Cuántas personas trabajan en la unidad productiva/emprendimiento, aproximadamente?',
			kind: 'text',
			control: 'input',
			maxlength: 4,
		},
		{
			id: 'ques_6',
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
			id: 'ques_7_1',
			code: 'P7.1',
			title: 'La unidad productiva/emprendimiento, ¿tiene relación con alguna organización social?',
			kind: 'single',
			options: ['No'],
			allowOther: true,
			placeholderOther: 'En caso afirmativo especifique el nombre de la organización social',
		},
		{
			id: 'ques_7_2',
			code: 'P7.2',
			title: 'La unidad productiva/emprendimiento, ¿tiene relación con una organización religiosa?',
			kind: 'single',
			options: ['No'],
			allowOther: true,
			placeholderOther: 'En caso afirmativo especifique el nombre de la organización religiosa',
		},
		{
			id: 'ques_7_3',
			code: 'P7.3',
			title: 'La unidad productiva/emprendimiento, ¿tiene relación con un gobierno municipal?',
			kind: 'single',
			options: ['No'],
			allowOther: true,
			placeholderOther: 'En caso afirmativo especifique el nombre del Municipio',
		},
		{
			id: 'ques_8',
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
			id: 'ques_8_1',
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
			id: 'ques_9',
			code: 'P9',
			title: '¿A qué se dedica o qué produce la unidad productiva/emprendimiento ?',
			kind: 'single',
			options: [
				{
					title: '1. Comercio popular y trabajos en espacios públicos',
					description: 'Ferias, venta ambulante, cuidado de coches, etc.',
					next: 'ques_9_1',
				},
				{
					title: '2. Recuperación, Reciclado y Servicios ambientales',
					description: 'Recolección de cartones y otros materiales, reciclado de residuos, etc.',
					next: 'ques_9_2',
				},
				{
					title: '3. Construcción e infraestructura social y Mejoramiento ambiental',
					next: 'ques_9_3',
				},
				{
					title: '4. Industria manufacturera',
					description: 'Elaboración de productos',
					next: 'ques_9_4',
				},
				{
					title: '5. Servicios socio comunitarios',
					description:
						'Comedores, merenderos, clubes barriales, salud comunitaria, cuidado de personas, apoyo escolar, medios comunitarios, espacios culturales, etc.',
					next: 'ques_9_5',
				},
				{ title: '6. Agricultura familiar y campesina', next: 'ques_9_6' },
				{ title: '7. Transporte', next: 'ques_9_7' },
			],
		},
		{
			id: 'ques_9_1',
			code: 'P9.1',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
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
				'Mensajería / Delivery',
				'Vendedor/a ambulante',
				'Venta directa',
			],
			allowOther: true,
		},

		{
			id: 'ques_9_2',
			code: 'P9.2',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
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
			id: 'ques_9_3',
			code: 'P9.3',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
			kind: 'single',
			options: [
				'Albañil / Durlero',
				'Ayudante / Auxiliar en obras de construcción',
				'Electricista',
				'Gasista',
				'Herrería',
				'Pintor/a',
				'Plomero/a / Fontanero/a / Instalador/a de redes de agua potable y tuberías',
				'Soldador/a',
				'Techista / Zinguero / Zanjero',
				'Vidriero/a',
			],
			allowOther: true,
		},
		{
			id: 'ques_9_4',
			code: 'P9.4',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
			kind: 'single',
			options: [
				'Producción de alimentos',
				'Fabricación de calzados',
				'Extracción y manufactura de minerales',
				'Indumentaria y Textil',
				'Producción de productos de tocador y limpieza',
				'Fabricante de Bloques / Ladrillero',
				'Carpintería y Zinguería',
				'Producción de productos sanitarios',
			],
			allowOther: true,
		},

		{
			id: 'ques_9_5',
			code: 'P9.5',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
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
			id: 'ques_9_6',
			code: 'P9.6',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
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
			id: 'ques_9_7',
			code: 'P9.7',
			next: null,
			title: 'En la unidad productiva/emprendimiento, ¿Cuál es tu ocupación?',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
			kind: 'single',
			options: ['Carga de mercadería', 'Flete', 'Mensajería / Delivery', 'Transporte de pasajeros'],
			allowOther: true,
		},
	],
};

export const survey_upep: Survey = {
	id: 'surv_upep',
	code: 'upep',
	title: 'Relevamiento de Unidades Productivas de la Economía Popular - Prueba piloto',
	intro: `

	Bienvenido al Registro de Unidades Productivas de la Economía Popular

	Las Unidades Productivas de la Economía Popular (UPEPs) son clave para la producción y generación de ingresos, pero su informalidad dificulta su identificación.

	Por tal motivo, nos proponemos crear un registro público para impulsar la productividad y formalidad de estas unidades, comenzando con las que participan en el Programa Volver al Trabajo.

	Por favor, completa el formulario adjunto para ayudarnos a conocer más sobre tu unidad productiva y contribuir al desarrollo de la economía popular.

	(formulario fuente: https://forms.gle/iQpbSzGAioPUdTHu7)
	`,
	questions: [
		{
			id: 'ques_0',
			code: 'P0',
			title: 'Ingresá tus datos de contacto: nombre, apellido y celular',
			kind: 'grid-text',
			items: [
				{ title: 'Email', maxlength: 50 },
				{ title: 'Nombre', maxlength: 50 },
				{ title: 'Apellido', maxlength: 50 },
				{ title: 'Celular', maxlength: 50 },
			],
			required: true,
		},
		{
			id: 'ques_1',
			code: 'P1',
			title:
				'¿Hacés alguna actividad laboral en una organización comunitaria, barrial, social, familiar o cooperativa?',
			kind: 'single',
			options: ['Sí', { title: 'No (fin del cuestionario)', next: null }],
		},
		{
			id: 'ques_2',
			code: 'P2',
			title: '¿Cuál es el nombre de la unidad productiva/emprendimiento donde trabajas?',
			kind: 'text',
			control: 'input',
		},
		{
			id: 'ques_3',
			code: 'P3',
			title: 'Esa actividad, la realizás de manera…',
			kind: 'single',
			options: ['Colectiva, con otras personas', 'Individual'],
		},
		{
			id: 'ques_4',
			code: 'P4',
			title: '¿Cuántas personas trabajan en la unidad productiva/emprendimiento, aproximadamente?',
			kind: 'text',
			control: 'input',
			maxlength: 4,
			allowedChars: 'digits',
			required: false,
		},
		{
			id: 'ques_5',
			code: 'P5',
			title:
				'En la unidad productiva, ¿Quién toma las decisiones? Marque todas las opciones que correspondan',
			kind: 'multiple',
			options: ['Un referente', 'Un patrón o patrona', 'Un coordinador/a', 'Una asamblea'],
			allowOther: true,
			placeholderOther: 'Otro referente con poder de decisión',
		},
		{
			id: 'ques_6',
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
			id: 'ques_7_1',
			code: 'P7.1',
			title: 'La unidad productiva/emprendimiento, ¿tiene relación con alguna organización social?',
			kind: 'single',
			options: ['Sí', { title: 'No', next: 'ques_7_2' }],
		},
		{
			id: 'ques_7_1_1',
			code: 'P7.1.1',
			title: '¿Cuál es el nombre de la organización social?',
			kind: 'text',
			control: 'input',
		},
		{
			id: 'ques_7_2',
			code: 'P7.2',
			title: 'La unidad productiva/emprendimiento, ¿tiene relación con una organización religiosa?',
			kind: 'single',
			options: ['Sí', { title: 'No', next: 'ques_7_3' }],
		},
		{
			id: 'ques_7_2_1',
			code: 'P7.2.1',
			title: '¿Cuál es el nombre de la organización religiosa?',
			kind: 'text',
			control: 'input',
		},
		{
			id: 'ques_7_3',
			code: 'P7.3',
			title: 'La unidad productiva/emprendimiento, ¿tiene relación con un gobierno municipal?',
			kind: 'single',
			options: ['Sí', { title: 'No', next: 'ques_8' }],
		},
		{
			id: 'ques_7_3_1',
			code: 'P7.3.1',
			title: 'Indique el nombre del municipio ',
			kind: 'text',
			control: 'input',
		},
		{
			id: 'ques_8',
			code: 'P8a',
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
			id: 'ques_8a.1',
			code: 'P8a.1',
			title: 'Indique el nombre del departamento/localidad',
			kind: 'text',
			control: 'input',
		},
		{
			id: 'ques_8b',
			code: 'P8b',
			title: '¿Cuál es el domicilio de la unidad productiva/emprendimiento?',
			description:
				'Complete los que correspondan. Si la unidad tiene más de un domicilio, por favor indique el más importante.',
			kind: 'grid-text',
			items: [
				'Calle',
				'Número',
				'Manzana',
				'Piso / departamento',
				'Entre calles',
				'Comunidad (completar únicamente si pertenece a una comunidad de un pueblo originario)',
				'Código Postal',
			],
		},
		{
			id: 'ques_9',
			code: 'P9',
			title: '¿A qué se dedica o qué produce la unidad productiva/emprendimiento ?',
			kind: 'single',
			options: [
				{
					title: '1. Comercio popular y trabajos en espacios públicos',
					description: 'Ferias, venta ambulante, cuidado de coches, etc.',
					next: 'ques_9_1',
				},
				{
					title: '2. Recuperación, Reciclado y Servicios ambientales',
					description: 'Recolección de cartones y otros materiales, reciclado de residuos, etc.',
					next: 'ques_9_2',
				},
				{
					title: '3. Construcción e infraestructura social y Mejoramiento ambiental',
					next: 'ques_9_3',
				},
				{
					title: '4. Industria manufacturera',
					description: 'Elaboración de productos',
					next: 'ques_9_4',
				},
				{
					title: '5. Servicios socio comunitarios',
					description:
						'Comedores, merenderos, clubes barriales, salud comunitaria, cuidado de personas, apoyo escolar, medios comunitarios, espacios culturales, etc.',
					next: 'ques_9_5',
				},
				{ title: '6. Agricultura familiar y campesina', next: 'ques_9_6' },
				{ title: '7. Transporte', next: 'ques_9_7' },
			],
		},
		{
			id: 'ques_9_1',
			code: 'P9.1',
			next: null,
			title: 'Ocupación Comercio popular y trabajos en espacios públicos',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
			kind: 'multiple',
			options: [
				'Feriante',
				'Artesano/a',
				{
					title: 'Intermediación solidaria',
					description: 'Ferias, mercado, Almacenes, Nodos, Galpones, Logística, etc.',
				},
				'Venta directa',
				'Vendedor/a ambulante',
				'Mensajería / delivery',
				'Cuida Coche / limpia vidrio',
			],
		},

		{
			id: 'ques_9_2',
			code: 'P9.2',
			next: null,
			title: 'Recuperación, reciclado y servicios ambientales',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
			kind: 'single',
			options: [
				'Cartonero/reciclador/a',
				'Carrero/a',
				'Promotor/a ambiental',
				'Chofer de camión',
				'Limpieza de terrenos y espacios verdes',
				'Reciclador/a de basura/residuos',
				'Operario/a de plantas recicladora',
				'Recolección de residuos en villas/barrios',
				'Forestación',
			],
		},

		{
			id: 'ques_9_3',
			code: 'P9.3',
			next: null,
			title: 'Construcción e infraestructura social y Mejoramiento ambiental',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
			kind: 'single',
			options: [
				'Electricista',
				'Gasista',
				'Herrero / soldador',
				'Pintor/a',
				'Albañil / durlero',
				'Ayudante / auxiliar en obra',
				'Techista',
				'Plomero/a / Instalador/a de redes de agua y tuberías',
				'Carpintero/a',
				'Jefe de cuadrilla / capataz',
			],
		},
		{
			id: 'ques_9_4',
			code: 'P9.4',
			next: null,
			title: 'Industria manufacturera',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
			kind: 'single',
			options: [
				'Producción de alimentos',
				'Fabricación de indumentaria / tejidos / hilados',
				'Fabricación de calzados',
				'Producción de productos de tocador y limpieza',
				'Producción de productos sanitarios',
				'Fabricante de bloques / ladrillero',
				'Extracción y manufactura de minerales',
				'Carpintería y zinguería',
			],
			allowOther: true,
		},

		{
			id: 'ques_9_5',
			code: 'P9.5',
			next: null,
			title: 'Servicios socio comunitarios',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
			kind: 'single',
			options: [
				'Atención de Comedores y Merenderos Comunitarios',
				{
					title: 'Cuidados',
					description: 'Niños/as, enfermos/as, personas con discapacidad, ancianos/as',
				},
				{
					title: 'Asistente socio educativo',
					description: 'Bachillerato popular, jardín comunitario, clases de apoyo escolar',
				},
				'Trabajador/a de deportes y recreación',
				'Promotor/a de salud',
				{
					title: 'Trabajador/a de cultura comunitaria',
					description: 'Talleres, Orquestas, Espacios Culturales',
				},
				'Trabajador/a de medio de comunicación comunitaria',
				'Acompañamiento en situaciones de consumo',
				'Atención de personas en situación de calle',
				'Promotores de género',
				'Peluquero / manicura',
			],
		},

		{
			id: 'ques_9_6',
			code: 'P9.6',
			next: null,
			title: 'Agricultura familiar y campesina',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
			kind: 'single',
			options: [
				'Agricultor / horticultor / floricultor / fruticultor',
				'Cría de animales',
				{
					title: 'Elaboración de alimentos',
					description: 'Conservas, quesos, dulces, chacinados',
				},
				'Pescadores / cazadores / recolectores / leñeros',
				'Promotor / guía de turismo rural',
			],
		},

		{
			id: 'ques_9_7',
			code: 'P9.7',
			next: null,
			title: 'Transporte',
			description:
				'En la unidad productiva, ¿cuál es tu ocupación? Seleccione las opciones que más se aproximen a las tareas que realizás',
			kind: 'single',
			options: ['Mensajería / delivery', 'Fletero', 'Chofer / remisero', 'Changarín'],
		},
	],
};