import type { Survey } from '$lib/types';

import { round } from '$lib/utils/number';

export const survey_autotest: Survey = {
	id: 'surv_autotest',
	code: 'autotest',
	title: 'Test del emprendedor',
	intro: `
		Bienvenido al test del emprendedor
		<Breve explicación del test el emprendedor>
		Te damos al bienvenida a esta encuesta
		Esperamos que te resulte útil
	`,
	outro: `
		Muchas gracias por tu participación
	`,
	questions: [
		// Formación
		{
			id: 'ques_educacion_formal',
			title: 'Formación - Educación formal',
			code: '1',
			subtitle: 'Marca el mayor grado educativo que conseguiste',
			type: 'single',
			weight: round(0.1 * 0.2, 8), // formación: 10% + educación formal: 20%
			options: [
				{ id: 'Primaria incompleta', score: 0 },
				{ id: 'Primaria completa', score: 20 },
				{ id: 'Secundaria incompleta', score: 40 },
				{ id: 'Secundaria completa', score: 60 },
				{ id: 'Terciaria / universitaria incompleta', score: 80 },
				{ id: 'Terciaria / universitaria completa', score: 100 },
			],
		},
		{
			id: 'ques_educacion_oficio',
			title: 'Formación - Educación en oficio',
			code: '2',
			subtitle:
				'¿Tomaste cursos en oficios que te brindaron herramientas para ejercer alguna actividad por tu cuenta?',
			type: 'single',
			weight: round(0.1 * 0.4, 8), // formación: 10% + educación oficio: 20%
			options: [
				{ id: 'Sí', score: 100 },
				{ id: 'No', score: 0 },
			],
		},
		{
			id: 'ques_educacion_continua',
			title: 'Formación - Formación continua / disposición a aprender',
			code: '3',
			subtitle:
				'¿Con qué frecuencia buscas incorporar nuevos conocimientos / aprender cosas nuevas?',
			type: 'single',
			weight: round(0.1 * 0.4, 8), // formación: 10% + educación continua: 40%
			options: [
				{ id: 'Siempre', score: 100 },
				{ id: 'Frecuentemente', score: 80 },
				{ id: 'Poco (una vez al año)', score: 30 },
				{ id: 'Nunca o casi nunca', score: 0 },
			],
		},

		// Experiencia
		{
			id: 'ques_experiencia_rubro',
			title: 'Experiencia - Experiencia previa en el rubro',
			code: '4',
			subtitle:
				'¿Trabajaste anteriormente en algún oficio / empleo que te gustaría poder ejercer  por tu cuenta?',
			type: 'single',
			weight: round(0.1 * 0.4, 8), // experiencia: 10% + experiencia rubro: 40%
			options: [
				{ id: 'Si trabajé y me veo haciéndolo por mi cuenta', score: 100 },
				{ id: 'Si trabaje, pero no me veo por mi cuenta', score: 20 },
				{ id: 'No Trabajé, pero me veo haciéndolo por mi cuenta', score: 40 },
				{ id: 'No trabajé y no me veo haciéndolo por mi cuenta', score: 0 },
			],
		},
		{
			id: 'ques_experiencia_emprendiendo',
			title: 'Experiencia - Experiencia previa emprendiendo',
			code: '5',
			subtitle:
				'¿Tuviste algún emprendimiento o empleo independiente anteriormente ? ¿lo mantenés actualmente ?',
			type: 'single',
			weight: round(0.1 * 0.4, 8), // experiencia: 10% + experiencia emprendiendo: 40%
			options: [
				{ id: 'Tuve y lo mantengo', score: 100 },
				{ id: 'Tuve pero ya no lo hago', score: 60 },
				{ id: 'No tuve', score: 0 },
			],
		},
		{
			id: 'ques_experiencia_familiar',
			title: 'Experiencia - Experiencia emprendedora intra familiar',
			code: '6',
			subtitle:
				'¿Algún familiar directo tiene o tuvo un emprendimiento propio o empleo independiente o trabaja por cuenta propia ? si es asi, ¿trabajaste con él ?',
			type: 'single',
			weight: round(0.1 * 0.2, 8), // experiencia: 10% + experiencia intra familiar: 20%
			options: [
				{ id: 'Si, y yo trabajé con él', score: 100 },
				{ id: 'Si, pero yo nunca trabaje con él', score: 40 },
				{ id: 'No', score: 0 },
			],
		},

		// Organización
		{
			id: 'ques_organizacion_cumplimiento',
			title: 'Organización - Organización personal: orden y cumplimiento',
			code: '7',
			subtitle:
				'En general, con respecto al orden y cumplimiento de plazos en tus compromisos, ¿Cómo te calificarías de 1 a 5, siendo 5 en muy ordenado y cumplidor / a con los plazos y compromisos y 1 muy poco ordenado y poco cumplidor/a Escala de 1 a 5',
			type: 'rating',
			min: 1,
			max: 5,
			weight: round(0.1 * 0.3, 8), // organización: 10% + cumplimiento: 30%
			scores: [
				{ value: 5, score: 100 },
				{ value: 4, score: 75 },
				{ value: 3, score: 50 },
				{ value: 2, score: 25 },
				{ value: 1, score: 0 },
			],
		},
		{
			id: 'ques_organizacion_planificacion',
			title: 'Organización - Organización personal: planificación',
			code: '8',
			subtitle:
				'¿Cómo calificarías en tu caso la siguiente expresión: "Planifico en detalle todo lo que tengo que hacer si quiero conseguir un resultado, organizo las acciones en el tiempo y preveo posibles cosas que puedan afectarlas"',
			type: 'single',
			weight: round(0.1 * 0.3, 8), // organización: 10% + planificación: 30%
			options: [
				{ id: 'Siempre', score: 100 },
				{ id: 'Casi siempre', score: 60 },
				{ id: 'A veces', score: 40 },
				{ id: 'Nunca', score: 0 },
			],
		},
		{
			id: 'ques_organizacion_trabajo_equipo',
			title: 'Organización - Organización y trabajo en equipos',
			code: '9',
			subtitle:
				'¿Cómo te calificarías respecto al trabajo en equipo en los distintos ámbitos de tu vida (deportes, actividades recreativas, educativas, laboral)?',
			type: 'single',
			weight: round(0.1 * 0.4, 8), // organización: 10% + trabajo en equipo: 40%
			options: [
				{ id: 'Raramente trabajo en equipo / trabajo mejor solo', score: 0 },
				{
					id: 'Me sumo en ocasiones a equipos para hacer una trabajo o una tarea sin problemas',
					score: 20,
				},
				{
					id: 'Los trabajos en equipo son mejores y me gusta hacer cosas con otras personas',
					score: 60,
				},
				{ id: 'Me gusta mucho integrar / organizar equipos de trabajo', score: 100 },
			],
		},

		// Orientación comercial
		{
			id: 'ques_comercial_perfil_ventas',
			title: 'Orientación comercial: experiencia en ventas',
			code: '10',
			subtitle: '¿Alguna vez trabajaste en ventas / fuiste vendedor ?',
			type: 'single',
			weight: round(0.15 * 0.5, 8), // comercial: 15% + experiencia en ventas: 50%
			options: [
				{ id: 'Sí, y actualmente soy vendedor', score: 100 },
				{ id: 'Sí y me gustaría volver a hacerlo', score: 60 },
				{ id: 'Sí, Pero no me gustó, prefiero hacer otras cosas', score: 20 },
				{ id: 'No, nunca fui vendedor pero creo que me gustaría', score: 40 },
				{
					id: 'No, nunca fui vendedor y creo que no me gustaría / no creo estar capacitado',
					score: 0,
				},
			],
		},
		{
			id: 'ques_comercial_tipo_vendedor',
			title: 'Orientación comercial: tipo de vendedor',
			code: '11',
			subtitle: '¿Qué tipo de vendedor/a te consideras?',
			type: 'single',
			weight: round(0.15 * 0.25, 8), // comercial: 15% + tipo de vendedor: 25%
			options: [
				{ id: 'Soy muy bueno/a vendiendo', score: 100 },
				{ id: 'Ni bueno/a ni malo/a', score: 40 },
				{ id: 'No soy un buen vendedor/a', score: 0 },
				{ id: 'Nunca fui vendedor/a', score: 0 },
			],
		},

		{
			id: 'ques_comercial_red_vinculacion',
			title: 'Orientación comercial: Red / vinculación / capacidad de relacionamiento',
			code: '12',
			subtitle:
				'¿Cómo dirías que es tu red cercana de personas amigas, allegadas y conocidas ? Indica la opción que más te represente',
			type: 'single',
			weight: round(0.15 * 0.25, 8), // comercial: 15% + red de vinculación: 25%
			options: [
				{
					id: 'Tengo una red amplia de personas conocidas, con gente de diversos grupos(por ej: familia, amigos, vecinos, colegas, compañeros de trabajos anteriores, conocidos de otros entornos(club, etc) y se suma frecuentemente gente nueva',
					score: 100,
				},
				{
					id: 'Tengo un grupo de allegados compuesto por familia, amigos y algunos conocidos',
					score: 40,
				},
				{
					id: 'Tengo una red de allegados pequeña / soy muy estricto antes de integrar personas a esta red / me resulta difícil hacer nuevos amigos',
					score: 0,
				},
			],
		},

		// Motivación e iniciativa
		{
			id: 'ques_motivacion_autonomia',
			title: 'Motivación e iniciativa: Autonomía / Proactividad',
			code: '13',
			subtitle:
				'¿Cómo te identificas a la hora de tomar decisiones ? Indica la opción que más te represente',
			type: 'single',
			weight: round(0.1 * 0.15, 8), // motivación: 10% + autonomía: 15%
			options: [
				{
					id: 'Tomo decisiones rápidamente cuando inicio actividades que me interesan',
					score: 100,
				},
				{
					id: 'Tomo decisiones rápidamente, pero me cuesta poco iniciar nuevas actividades si me interesan',
					score: 75,
				},
				{
					id: 'Analizo varias opciones antes de tomar decisiones o hacer cosas nuevas o diferentes, pero esto no me lleva mucho tiempo',
					score: 50,
				},
				{ id: 'Analizo demasiado las diferentes opciones antes de tomar decisiones', score: 25 },
				{
					id: 'Me cuesta mucho tomar decisiones, hacer cambios y / o iniciar nuevas actividades',
					score: 0,
				},
			],
		},
		{
			id: 'ques_motivacion_proactividad',
			title: 'Motivación e iniciativa: Autonomía / Proactividad',
			code: '14',
			subtitle:
				'Una vez que decidís hacer algo o querés iniciar una actividad o un proyecto, ¿Qué actitud tomas? Elegí la opción que más te representa',
			type: 'single',
			weight: round(0.1 * 0.15, 8), // motivación: 10% + proactividad: 15%
			options: [
				{ id: 'Busco la forma de hacerlo como sea', score: 100 },
				{
					id: 'Espero que se produzcan las circunstancias favorables para hacerlo y si en un tiempo no se dan lo hago igual',
					score: 40,
				},
				{
					id: 'Busco aliados con quien realizarlo para complementar lo que a mi me falta para desarrollarlo',
					score: 60,
				},
				{
					id: 'Espero que se produzcan las circunstancias favorables para hacerlo, y si no se dan toda las condiciones, no lo hago',
					score: 0,
				},
			],
		},
		{
			id: 'ques_motivacion_compromiso',
			title: 'Motivación e iniciativa: Compromiso',
			code: '15',
			subtitle:
				'Una vez que tomas una decisión o inicias una nueva actividad, ¿cómo indicarías que es tu comportamiento en el tiempo ? Indica la opción que más te represente',
			type: 'single',
			weight: round(0.1 * 0.2, 8), // motivación: 10% + compromiso: 20%
			options: [
				{ id: 'Suelo sostenerlas largamente en el tiempo', score: 100 },
				{ id: 'Trato de hacerla hasta que finaliza la propuesta', score: 70 },
				{
					id: 'Sostengo la decisión o la nueva actividad hasta que deja de hacerme feliz o deja de gustarme',
					score: 40,
				},
				{
					id: 'Suelo cambiar rápidamente de opinión / suelo iniciar otras actividades rápidamente y dejar las anteriores',
					score: 0,
				},
			],
		},
		{
			id: 'ques_motivacion_innovacion',
			title: 'Motivación e iniciativa: Innovación / actualización permanente',
			code: '16',
			subtitle:
				'Cuanto te representa la siguiente frase: "Siempre estoy actualizado sobre nuevas tecnologías herramientas digitales, redes sociales"',
			type: 'single',
			weight: round(0.1 * 0.2, 8), // motivación: 10% + innovación: 20%
			options: [
				{ id: 'Me representa totalmente, siempre estoy buscando lo más reciente', score: 100 },
				{
					id: 'Me representa en parte, a veces o cada cierto tiempo veo nuevas formas de hacer las cosas',
					score: 40,
				},
				{
					id: 'No me representa, si se cómo hacer algo y funciona bien, lo mantengo / para qué cambiar si algo funciona',
					score: 0,
				},
			],
		},
		{
			id: 'ques_motivacion_creatividad',
			title: 'Motivación e iniciativa: Creatividad',
			code: '17',
			subtitle:
				'¿Cuán creativo/a te considerás, en una escala de 1 a 5 siendo 5 muy creativo/a y 1 poco creativo/a?',
			type: 'rating',
			min: 1,
			max: 5,
			weight: round(0.1 * 0.15, 8), // organización: 10% + cumplimiento: 15%
			scores: [
				{ value: 5, score: 100 },
				{ value: 4, score: 75 },
				{ value: 3, score: 50 },
				{ value: 2, score: 25 },
				{ value: 1, score: 0 },
			],
		},
		{
			id: 'ques_motivacion_creatividad_2',
			title: 'Motivación e iniciativa: Creatividad',
			code: '18',
			subtitle:
				'Cuando tenés que tomar una decisión o resolver un problema .... Elegí la opción que más te representa',
			type: 'single',
			weight: round(0.1 * 0.15, 8), //  organización: 10% + creatividad: 15%
			options: [
				{ id: 'Se me ocurren ideas novedosas / distintas / únicas', score: 100 },
				{
					id: 'Consulto con personas cercanas con experiencia en el tema y avanzo con alguna solución propuesta',
					score: 60,
				},
				{
					id: 'Trato de tomar una opción que anteriormente ya me dio buenos resultados',
					score: 20,
				},
				{ id: 'Me cuesta mucho tomar decisiones', score: 0 },
			],
		},

		// Tolerancia a la frustración
		{
			id: 'ques_tolerancia_frustracion_persistencia',
			title: 'Tolerancia a la frustración: Persistencia',
			code: '19',
			subtitle:
				'¿Cómo calificarías tu actitud para lograr lo que querés? Elegí la opción que más te represente',
			type: 'single',
			weight: round(0.1 * 0.5, 8), // tolerancia a la frustración: 10% + persistencia: 50%
			options: [
				{
					id: 'Siempre logro lo que quiero, aunque al principio no pueda o me salga mal, insisto o busco la forma pero lo hago',
					score: 100,
				},
				{
					id: 'A veces puedo lograr lo que quiero, dedico esfuerzo y si las cosas salen bien, lo logro',
					score: 60,
				},
				{ id: 'A veces no puedo lograr lo que quiero', score: 40 },
				{
					id: 'Me resulta difícil lograr lo que quiero / es frecuente que me encuentre con obstáculo o problemas que no puedo superar',
					score: 0,
				},
			],
		},
		{
			id: 'ques_tolerancia_frustracion_actitud',
			title: 'Tolerancia a la frustración: Actitud frente a la frustración',
			code: '20',
			subtitle:
				'¿Cómo reaccionas cuando algo a lo que le dedicaste mucho esfuerzo o le tenias muchas esperanza, no sale como lo esperabas ? Elegí la opción que más te representa',
			type: 'single',
			weight: round(0.1 * 0.5, 8), // tolerancia a la frustración: 10% + actitud frente a la frustración: 50%
			options: [
				{ id: 'Me frustro / me paralizo / me deprimo', score: 0 },
				{
					id: 'Me enoja / me entristece pero pienso como puedo hacerlo diferente o mejor la próxima vez',
					score: 60,
				},
				{
					id: 'Lo tomo como un desafío y aprendizaje para intentarlo de nuevo de otra forma',
					score: 100,
				},
			],
		},

		// Liderazgo y dedicación
		{
			id: 'ques_liderazgo_rol_social',
			title: 'Liderazgo y Dedicación: Rol que ocupa en los grupos sociales que frecuenta',
			code: '21',
			subtitle: 'En tu grupo de amigos / as / en tu entorno, te calificarían como:',
			type: 'single',
			weight: round(0.2 * 0.1, 8), // liderazgo: 20% + rol social: 10%
			options: [
				{
					id: 'Quien organiza los encuentros o actividades y protagoniza las reuniones',
					score: 100,
				},
				{ id: 'Uno más del grupo que se suma a la mayoría de las actividades', score: 40 },
				{
					id: 'Alguien que participa poco en las actividades grupales / me vinculo poco en grupos sociales amplios',
					score: 0,
				},
			],
		},
		{
			id: 'ques_liderazgo_actitud_grupos_nuevos',
			title: 'Liderazgo y Dedicación: Actitud frente a grupos nuevos',
			code: '22',
			subtitle: '¿Cómo es tu actitud frente a grupos de personas que no conocés?',
			type: 'single',
			weight: round(0.2 * 0.05, 8), // liderazgo: 20% + actitud frente a grupos nuevos: 5%
			options: [
				{
					id: 'Me gusta conocer gente nueva, conecto rápidamente, me sirve para intercambiar ideas, y tener diferentes puntos de vista',
					score: 100,
				},
				{
					id: 'Me cuesta integrarme a grupos de personas que no conozco pero finalmente lo hago, aunque sin tomar un rol protagónico',
					score: 40,
				},
				{ id: 'No suelo integrarme o frecuentar grupos de desconocidos', score: 0 },
			],
		},
		{
			id: 'ques_liderazgo_lider',
			title: 'Liderazgo y Dedicación: ¿Te consideras un líder?',
			code: '23',
			subtitle:
				'¿Cómo te consideras en una escala de 1 a 5 cuando tienes que asumir un rol de liderazgo en cualquier ámbito de tu vida (deportivo, educativo, laboral, familiar)? Donde 5 es que te consideras un/a líder nato/a y 1 es que no crees que puedas ocupar un rol de líder',
			type: 'rating',
			min: 1,
			max: 5,
			weight: round(0.2 * 0.1, 8), // liderazgo: 20% + lider: 10%
			scores: [
				{ value: 5, score: 100 },
				{ value: 4, score: 75 },
				{ value: 3, score: 50 },
				{ value: 2, score: 25 },
				{ value: 1, score: 0 },
			],
		},
		{
			id: 'ques_liderazgo_ambicion',
			title: 'Liderazgo y Dedicación: Ambición',
			code: '24',
			subtitle:
				'¿Te consideras una persona ambiciosa? Alguien que desea fuertemente tener éxito económico/profesional, dedicando lo que tenga que dedicar a eso. Califica de 1 a 5, siendo 1 muy ambicioso y 5 para nada ambicioso',
			type: 'rating',
			min: 1,
			max: 5,
			weight: round(0.2 * 0.25, 8), // liderazgo: 20% + ambición: 25%
			scores: [
				{ value: 5, score: 100 },
				{ value: 4, score: 75 },
				{ value: 3, score: 50 },
				{ value: 2, score: 25 },
				{ value: 1, score: 0 },
			],
		},
		{
			id: 'ques_liderazgo_autoestima',
			title: 'Liderazgo y Dedicación: Autoestima',
			code: '25',
			subtitle: '¿Con cuál de las siguientes afirmaciones te identificas más?',
			type: 'single',
			weight: round(0.2 * 0.15, 8), // liderazgo: 20% + autoestima: 15%
			options: [
				{
					id: 'Soy una persona con alta confianza en sí mismo/a y en general me siento capacitado, creo que puedo enfrentar cualquier situación que se me presente',
					score: 100,
				},
				{
					id: 'Soy una persona que confía en sí misma, pero a veces no me siento totalmente capacitado y me falta seguridad para avanzar',
					score: 40,
				},
				{
					id: 'No siento tanta confianza en mí mismo y con frecuencia me siento inseguro',
					score: 0,
				},
			],
		},
		{
			id: 'ques_liderazgo_opinion_externa',
			title: 'Liderazgo y Dedicación: Opinión Externa',
			code: '26',
			subtitle:
				'¿Qué tan importante es para vos la opinión que los demás tienen sobre vos? Califica de 1 a 5 siendo 5 muy importante y 1 para nada importante',
			type: 'rating',
			min: 1,
			max: 5,
			weight: round(0.2 * 0.15, 8), // liderazgo: 20% + opinión externa: 15%
			scores: [
				{ value: 1, score: 0 },
				{ value: 2, score: 25 },
				{ value: 3, score: 50 },
				{ value: 4, score: 75 },
				{ value: 5, score: 100 },
			],
		},
		{
			id: 'ques_liderazgo_dedicacion',
			title: 'Liderazgo y Dedicación: Dedicación',
			code: '27',
			subtitle:
				'¿Cuándo te comprometes con algo, cuánto esfuerzo y tiempo dedicas para realizarlo?',
			type: 'single',
			weight: round(0.2 * 0.2, 8), // liderazgo: 20% + dedicación: 20%
			options: [
				{
					id: 'Pongo todo mi esfuerzo, me dedico lo que sea necesario incluso busco la forma de que otras personas con capacidades complementarias a mí me ayuden',
					score: 100,
				},
				{ id: 'Pongo todo mi esfuerzo, dedico lo que sea necesario', score: 60 },
				{
					id: 'Pongo mucho esfuerzo y dedicación, pero siempre trato de mantener un equilibrio con el resto de las actividades de mi vida (deporte, amigos, familia)',
					score: 40,
				},
				{ id: 'Ninguna de las anteriores me representa, a veces', score: 0 },
			],
		},

		// Propensión al Riesgo
		{
			id: 'ques_riesgo_actitud_incertidumbre',
			title: 'Propensión al Riesgo: Actitud frente a incertidumbre',
			code: '28',
			subtitle:
				'Ante una situación compleja, nueva, que tendrá impacto en tu vida cotidiana pero, donde no sabes lo que va a pasar o de qué forma te puede impactar',
			type: 'single',
			weight: round(0.15 * 0.3, 8), // riesgo: 15% + actitud frente a incertidumbre: 30%
			options: [
				{
					id: 'Puede ser algo bueno para crecer / para mejorar / me pongo a pensar como lo puedo aprovechar',
					score: 100,
				},
				{
					id: 'Intento buscar opiniones de personas conocidas o allegadas para entender mejor las consecuencias y pensar qué puedo hacer',
					score: 60,
				},
				{ id: 'No me molesta / espero a ver qué pasa', score: 40 },
				{
					id: 'Pienso las cosas malas que pueden traer aparejadas y busco la forma de ponerme a resguardo o de sacarle provecho / hacerlo algo positivo',
					score: 0,
				},
			],
		},
		{
			id: 'ques_riesgo_opinion_riesgo',
			title: 'Propensión al Riesgo: Opinión sobre el riesgo',
			code: '29',
			subtitle: '¿Con cuál de las dos afirmaciones siguientes te sientes más identificado?',
			type: 'single',
			weight: round(0.15 * 0.15, 8), // riesgo: 15% + opinión sobre el riesgo: 15%
			options: [
				{
					id: 'Las personas que toman riesgos tienen más posibilidades de salir adelante y progresar',
					score: 100,
				},
				{
					id: 'Las personas que toman riesgos tienen más posibilidades de que les vaya mal y empeorar su situación',
					score: 0,
				},
				{ id: 'Ninguna de las dos anteriores me representa', score: 20 },
			],
		},
		{
			id: 'ques_riesgo_predisposicion_accion',
			title: 'Propensión al Riesgo: Predisposición de acción',
			code: '30',
			subtitle: '¿Con cuál de las siguientes afirmaciones te sientes más identificado/a?',
			type: 'single',
			weight: round(0.15 * 0.25, 8), // riesgo: 15% + predisposición de acción: 25%
			options: [
				{
					id: 'Soy una persona que le gusta proponer cosas / estoy constantemente armado planes con gente',
					score: 100,
				},
				{ id: 'Soy una persona activa / me sumo en todos los planes que me proponen', score: 60 },
				{ id: 'Soy una persona que me cuesta activar para hacer cosas', score: 0 },
			],
		},
		{
			id: 'ques_riesgo_reaccion_imprevistos',
			title: 'Propensión al Riesgo: Reacción ante imprevistos',
			code: '31',
			subtitle:
				'¿Cómo reaccionas cuando estás haciendo algo y surge algún obstáculo no previsto o se presenta un problema de repente?',
			type: 'single',
			weight: round(0.15 * 0.3, 8), // riesgo: 15% + reacción ante imprevistos: 30%
			options: [
				{ id: 'Espero a ver qué pasa', score: 20 },
				{ id: 'Pido ayuda o busco a alguien que pueda resolver el tema', score: 40 },
				{ id: 'Tomo alguna acción y voy viendo si da resultado', score: 60 },
				{ id: 'Tomo una acción después de evaluar varias posibilidades', score: 100 },
				{ id: 'No hago nada al respecto', score: 0 },
			],
		},
	],
};
