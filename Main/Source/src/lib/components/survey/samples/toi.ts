import type { Survey } from '$lib/types';

export const survey_toi: Survey = {
	id: 'surv_toi',
	code: 'toi',
	title: 'Trayecto de Orientación Individual (TOI)',
	outro: 'Muchas gracias',
	questions: [
		{
			id: 'ques_001',
			title: 'Currículum Vitae (CV)',
			subtitle:
				'¿La información del perfil laboral registrada en el CV fue confirmada en la entrevista?',
			type: 'grid-single',
			items: [
				'Experiencia Laboral',
				'Educación',
				'Cursos',
				'Otros (idiomas, habilidades, disponibilidad, etc.)',
			],
			options: ['SI', 'NO'],
			class: 'grid-cols-[1fr_1fr]',
		},
		{
			id: 'ques_002',
			title: 'Acceso digital',
			subtitle: '¿La persona dispone de equipamiento y/o acceso a Internet?',
			type: 'grid-single',
			items: ['1. ¿Tiene acceso a internet?', '2. ¿Tiene PC / computadora?', '3. ¿Tiene tablet?'],
			options: ['SI', 'NO'],
			class: 'grid-cols-[1fr_1fr]',
		},
		{
			id: 'ques_003',
			title: 'La persona sabe / puede...',
			type: 'grid-single',
			items: [
				'1. Trabajar con computadora',
				'2. Obtener información en Internet',
				'3. Analizar y evaluar datos, información y contenidos en entornos digitales ',
				'4. Organizar, almacenar, etiquetar y recuperar archivos digitales',
				'5. Comunicarse por correo electrónico o mensajería por plataformas digitales(meet, zoom, whatsapp, entre otras)',
				'6. Comunicarse por videollamadas',
				'7. Crear y editar contenidos digitales',
			],
			options: ['SI', 'NO'],
			class: 'grid-cols-[1fr_1fr]',
		},
		{
			id: 'ques_004',
			title: '¿Considera que la persona tiene un perfil digital autónomo?',
			type: 'single',
			options: ['SI', { id: 'NO (requiere asistencia)', next: 'ques_005' }],
		},
		{
			id: 'ques_005',
			title: 'Perfilamiento',
			subtitle: 'Clasifique la experiencia laboral de la persona:',
			type: 'single',
			options: [
				'1. Experiencia laboral amplia/ consolidada',
				'2. Experiencia intermedia',
				'3. Experiencia básica o sin experiencia',
			],
		},
		{
			id: 'ques_006',
			title: 'El perfil laboral de la persona se corresponde con (marque lo que corresponde):',
			type: 'single',
			options: [
				'1. Empleo asalariado',
				'2. Empleo independiente',
				'3. Ambos',
				'4. Sin experiencia',
			],
		},
		{
			id: 'ques_007',
			title:
				'Para el segmento sin experiencia laboral: ¿Realizó tareas en la vida social asimilables al mundo laboral? ¿Cuáles?',
			type: 'text',
			required: false,
		},
		{
			id: 'ques_008',
			title:
				'¿Existe una correspondencia entre los sectores de interés laboral de la persona y las oportunidades de empleo disponibles en el mercado local?',
			type: 'single',
			options: ['SI', 'NO'],
		},

		{
			id: 'ques_009',
			title:
				'Si no tiene experiencia o no es la adecuada al ámbito local ¿Cuál es el sector  recomendado de acuerdo al perfil? listado de sectores',
			type: 'single',
			control: 'select',
			required: true,
			options: [
				'1. Comercio - venta',
				'2. Trabajo doméstico (limpieza, cuidado de personas, jardinería y otras tareas)',
				'3. Limpieza de edificios, locales, calles y espacios verdes (NO casas particulares). Recolección de residuos. Seguridad',
				'4. Construcción',
				'5. Gastronomía, elaboración alimentos, panificados, restaurante, turismo, hotelería',
				'6. Fabricación/industria. Suministro de electricidad, gas, agua y cloacas',
				'7. Educación, docencia',
				'8. Servicios sociales y Salud (comedores, cuidados y atención de personas en instituciones, etc.)',
				'9. Servicios personales (peluquería, tratamientos de belleza, estética, cuidado de mascotas, astrología, fúnebres, otros)',
				'10. Agricultura, ganadería, forestal, pesca, minería (incluye apicultura y viveros)',
				'11. Informática, medios de comunicación, publicidad',
				'12. Transporte, correo, mensajería, almacenamiento y logística',
				'13. Administración y atención al cliente. Contabilidad, jurídicos, RRHH. Servicios profesionales, científicos y técnicos',
				'14. Reparación/arreglos: ropa, calzado, celulares, equipos informáticos, electrodomésticos',
				'15. Reparación y mantenimiento de automotores (incluye lavado) y de maquinaria y equipos industriales, agropecuarios, médicos y otros NO domésticos',
				'16. Artes, entretenimiento, recreación, clubes',
			],
		},
		{
			id: 'ques_010',
			title:
				'¿Los intereses formativos de la persona están alineados con su perfil laboral actual y las oportunidades de inserción locales?',
			subtitle: 'Formación laboral',
			type: 'single',
			options: ['SI', 'NO'],
		},
		{
			id: 'ques_011',
			title: 'Clasifique la situación de la persona con respecto a la búsqueda de empleo:',
			subtitle: 'Búsqueda de empleo ',
			type: 'single',
			options: [
				'1.  Puede realizar acciones autónomas de búsqueda de empleo',
				'2. Requiere mejorar sus habilidades y conocimientos para la búsqueda laboral',
				'3. No posee experiencia en búsqueda laboral',
			],
		},
		{
			id: 'ques_012',
			title:
				'¿Califica para rendir la evaluación de Certificación de Competencias Socio laborales básica?',
			type: 'single',
			options: ['SI', 'NO'],
		},
		{
			id: 'ques_013',
			title:
				'¿La persona está interesada en rendir la evaluación de Certificación de Competencias Socio laborales básica?',
			type: 'single',
			options: ['SI', 'NO'],
		},
		{
			id: 'ques_014',
			title: 'Marque las opciones que correspondan',
			subtitle: 'Orientación Laboral',
			type: 'single',
			options: [
				'1. El perfil requiere una instancia de orientación integral ',
				'2. Se trabajará sobre temas puntuales',
				'3. No requiere instancias posteriores',
			],
		},
		{
			id: 'ques_015',
			title: 'Observaciones, recomendaciones, temas a tratar en la entrevista de seguimiento:',
			type: 'text',
			required: false,
		},
	],
};
