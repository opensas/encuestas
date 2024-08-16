import type { Encuesta } from '$lib/types';

export const encuesta01: Encuesta = {
	id: 'enc_001',
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

export const encuesta02: Encuesta = {
	id: 'enc_ingles_experiencia',
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
