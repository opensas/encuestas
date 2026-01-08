import type { Survey } from '$lib/types';

export const survey_toi: Survey = {
	id: 'surv_toi',
	code: 'toi',
	title: 'Cuestionario de taller de orientación individual (TOI)',
	questions: [
		{
			id: 'ques_001',
			title:
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
			title:
				'¿Califica para rendir la evaluación de Certificación de Competencias Socio laborales básica?',
			type: 'single',
			options: ['SI', 'NO'],
		},
		{
			id: 'ques_003',
			title:
				'¿La persona está interesada en rendir la evaluación de Certificación de Competencias Socio laborales básica?',
			type: 'single',
			options: ['SI', 'NO'],
		},
		{
			id: 'ques_004',
			title: '¿Considera que la persona tiene un perfil digital autónomo?',
			subtitle: 'La persona sabe / puede...',
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
			options: ['SI', 'NO (requiere asistencia)'],
			class: 'grid-cols-[1fr_1fr]',
		},
		{
			id: 'ques_005',
			title: '¿La persona dispone de equipamiento y/o acceso a Internet?',
			type: 'grid-single',
			items: [
				'1. ¿Tiene acceso a internet ?',
				'2. ¿Tiene PC / computadora ?',
				'3. ¿Tiene tablet ?',
			],
			options: ['SI', 'NO'],
			class: 'grid-cols-[1fr_1fr]',
		},
		{
			id: 'ques_006',
			title: '¿Considera que corresponde un refuerzo en Acciones de Búsqueda de empleo?',
			type: 'single',
			options: ['SI', 'NO'],
		},
		{
			id: 'ques_007',
			title:
				'¿Existe una correspondencia entre los sectores de interés laboral de la persona y las oportunidades de empleo disponibles en el mercado local?',
			type: 'single',
			options: ['SI', 'NO'],
		},
		{
			id: 'ques_008',
			title:
				'¿Los intereses formativos de la persona están alineados con su perfil laboral actual y las oportunidades de inserción locales?',
			type: 'single',
			options: ['SI', 'NO'],
		},
		{
			id: 'ques_009',
			title: '¿Considera que corresponde un refuerzo de Orientación laboral?',
			type: 'single',
			options: ['SI', 'NO'],
		},
		{
			id: 'ques_010',
			title: 'El perfil laboral de la persona se corresponde con (marque lo que corresponde):',
			type: 'single',
			options: ['1. Empleo asalariado', '2. Empleo independiente', '3. Ambos'],
		},
		{
			id: 'ques_011',
			title: 'Clasifique la experiencia laboral de la persona:',
			type: 'single',
			options: [
				'1. Experiencia laboral amplia/ consolidada',
				'2. Experiencia intermedia',
				'3. Experiencia acotada o sin experiencia',
			],
		},
		{
			id: 'ques_012',
			title:
				'Si no tiene experiencia o no es la adecuada al ámbito local:  ¿Cuál sería el campo de formación y búsqueda de trabajo recomendado?',
			type: 'text',
			required: false,
		},
		{
			id: 'ques_013',
			title: 'Indique las habilidades fueron que identificadas en la entrevista',
			type: 'multiple',
			required: false,
			options: [
				'a. Resolución de problemas',
				'b. Organización del trabajo',
				'c. Trabajo en equipo',
				'd. Comunicación verbal y escrita',
				'e. Manejo de datos',
				'f. Autonomía y proactividad',
				'g. Capacidad de liderazgo',
				'h. Orientación comercial',
				'i. Motivación e iniciativa',
				'j. Aprendizaje activo',
				'k. Resiliencia / Flexibilidad',
				'l. Uso de Tecnología/ IA',
				'm. Otras habilidades(campo abierto)',
			],
			other: { placeholder: 'otras habilidades' },
		},
		{
			id: 'ques_014',
			title:
				'Para el segmento sin experiencia laboral: ¿Realizó tareas en la vida social asimilables al mundo laboral? ¿Cuáles?',
			type: 'text',
			required: false,
		},
		{
			id: 'ques_015',
			title: 'Observaciones, recomendaciones, temas a tratar en la entrevista de seguimiento:',
			type: 'text',
			required: false,
		},
	],
};
