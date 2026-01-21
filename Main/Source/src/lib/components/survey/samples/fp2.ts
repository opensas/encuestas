import type { Survey } from '$lib/types';

const intro = `
# ¡Gracias por participar en nuestro curso / taller!

Tu opinión es muy importante y nos ayudará a mejorar nuestras ofertas de formación y orientación laboral.
Esta encuesta es corta y sencilla de responder, solo te tomará unos pocos minutos completarla.

## ¿Cómo responder a las preguntas?

Te pediremos que marques una opción de acuerdo a la siguiente escala:

- Totalmente de acuerdo / muy satisfecho.
- De acuerdo / satisfecho.
- Indiferente
- En desacuerdo / insatisfecho.
- Totalmente en desacuerdo / muy insatisfecho.

Elegí la opción que más se ajuste a tu experiencia.

Tu respuesta será confidencial.
Una vez completa podrás descargar el CERTIFICADO.

¡Empecemos!
`;

export const survey_fp2: Survey = {
	id: 'surv_fp2',
	code: 'fp2',
	title:
		'Satisfacción de cursos de Formación Profesional y Talleres de Orientación Laboral (FP-TOL)',
	description: 'Modalidad presencial',
	intro,
	questions: [
		{
			id: 'ques_001',
			title: 'El curso / taller resultó útil para incorporar nuevos conocimientos y habilidades',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_002',
			title: 'Los contenidos, actividades y materiales del curso resultaron comprensibles',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_003',
			title:
				'El capacitador del curso / taller respondió las dudas o consultas cuando Ud. lo requirió',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_004',
			title:
				'Le facilitaron los insumos, herramientas o equipos necesarios para el desarrollo del mismo',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_005',
			title:
				'Luego de haber realizado el curso percibe que han aumentado sus posibilidades de encontrar empleo o mejorarlo',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
	],
};

export const survey_fp860: Survey = {
	id: 'surv_fp860',
	code: 'fp860',
	title: 'Satisfacción de cursos de Formación Profesional (FP)',
	description: 'Modalidad a distancia',
	intro,
	questions: [
		{
			id: 'ques_001',
			title: 'El curso /taller resultó útil para incorporar nuevos conocimientos y habilidades',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_002',
			title: 'Los contenidos, actividades y materiales del curso resultaron comprensibles',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_003',
			title:
				'El capacitador del curso / taller respondió las dudas o consultas cuando Ud. lo requirió',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_004',
			title: 'Pudo acceder al campus / plataforma y a los materiales fácilmente',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_005',
			title:
				'Luego de haber realizado el curso percibe que han aumentado sus posibilidades de encontrar empleo o mejorarlo',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
	],
};

export const survey_fp_autoasistido2: Survey = {
	id: 'surv_fp_autoasistido2',
	code: 'fp-autoasistido2',
	title: 'Satisfacción de cursos de Formación Profesional auto-asistidos (FP)',
	description: '',
	intro,
	questions: [
		{
			id: 'ques_001',
			title: 'El curso resultó útil para incorporar nuevos conocimientos y habilidades',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_002',
			title: 'Los contenidos, actividades y materiales del curso resultaron comprensibles',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_003',
			title: 'Pudo acceder al campus / plataforma y a los materiales fácilmente',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
		{
			id: 'ques_004',
			title:
				'Luego de haber realizado el curso percibe que han aumentado sus posibilidades de encontrar empleo o mejorarlo.',
			type: 'single',
			options: [
				'Muy de acuerdo',
				'De acuerdo',
				'Indiferente',
				'En desacuerdo',
				'Muy en desacuerdo',
			],
		},
	],
};
