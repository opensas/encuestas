import type { Survey } from '$lib/types';

export const surveyNoIntro: Survey = {
	id: 'surv_no_intro',
	code: 'no-intro',
	title: 'Encuesta Directa (Sin Introducción)',
	// No intro property - survey starts directly
	questions: [
		{
			id: 'ques_1',
			code: 'Q1',
			title:
				'Esta encuesta comienza directamente sin una pantalla de introducción. ¿Qué te parece este enfoque?',
			type: 'single',
			options: ['Prefiero que sea así', 'Me gustaría una introducción', 'No tengo preferencia'],
		},
		{
			id: 'ques_2',
			code: 'Q2',
			title: 'Califica la directness de comenzar inmediatamente',
			type: 'rating',
			min: 1,
			max: 5,
		},
		{
			id: 'ques_3',
			code: 'Q3',
			title: '¿Qué tipo de encuestas funcionan mejor sin introducciones?',
			type: 'multiple',
			options: [
				'Encuestas rápidas',
				'Formularios de comentarios',
				'Encuestas cortas',
				'Encuestas familiares',
			],
		},
	],
};

export const surveyWithProgressBar: Survey = {
	id: 'surv_progress_bar',
	code: 'progress-bar',
	title: 'Encuesta con Barra de Progreso',
	intro: `
			## Esta encuesta demuestra la funcionalidad de la barra de progreso.
			
			Verás un indicador de progreso en la parte superior que muestra tu estado de finalización.
			Esto es especialmente útil para encuestas más largas para ayudar a los usuarios a entender 
			cuánto les queda por completar.
		`,
	progressBar: true, // Enable progress bar
	questions: [
		{
			id: 'ques_1',
			code: 'Q1',
			title: '¿Puedes ver la barra de progreso en la parte superior?',
			type: 'single',
			options: ['Sí, puedo verla', 'No, no puedo verla'],
		},
		{
			id: 'ques_2',
			code: 'Q2',
			title: '¿Qué tan útil es la barra de progreso para ti?',
			type: 'rating',
			min: 1,
			max: 5,
		},
		{
			id: 'ques_3',
			code: 'Q3',
			title: '¿Qué información te gustaría ver en un indicador de progreso?',
			type: 'multiple',
			options: [
				'Porcentaje completado',
				'Preguntas restantes',
				'Tiempo estimado restante',
				'Número de pregunta actual',
			],
		},
		{
			id: 'ques_4',
			code: 'Q4',
			title: '¿En qué tipos de encuestas es más importante una barra de progreso?',
			type: 'single',
			options: [
				'Encuestas largas (10+ preguntas)',
				'Encuestas complejas con lógica condicional',
				'Todas las encuestas deberían tener una',
				'Las encuestas cortas no las necesitan',
			],
		},
		{
			id: 'ques_5',
			code: 'Q5',
			title: '¿Algún comentario final sobre los indicadores de progreso?',
			type: 'text',
			control: 'textarea',
			required: false,
		},
	],
};

export const surveyWithIntro: Survey = {
	id: 'surv_with_intro',
	code: 'with-intro',
	title: 'Encuesta con Introducción',
	intro: `
			# ¡Bienvenido a esta encuesta de demostración!
			
			Esta encuesta demuestra la funcionalidad de pantalla de introducción. 
			Verás esta pantalla de introducción antes de que comiencen las preguntas reales.
			
			La introducción puede contener:
			- Mensajes de bienvenida
			- Instrucciones
			- Información importante
			- Contexto sobre la encuesta
			
			Haz clic en **Comenzar** para empezar a responder preguntas.
		`,
	questions: [
		{
			id: 'ques_1',
			code: 'Q1',
			title: '¿Cómo calificarías la pantalla de introducción?',
			type: 'rating',
			min: 1,
			max: 5,
		},
		{
			id: 'ques_2',
			code: 'Q2',
			title: '¿Qué te pareció el contenido de la introducción?',
			type: 'single',
			options: ['Muy útil', 'Algo útil', 'No útil', 'Demasiado largo'],
		},
		{
			id: 'ques_3',
			code: 'Q3',
			title: '¿Algún comentario adicional sobre la introducción?',
			type: 'text',
			control: 'textarea',
			required: false,
		},
	],
};

// Custom survey with two text questions for testing
export const surveyTestUI: Survey = {
	id: 'surv_test',
	code: 'ui-test',
	title: 'Test Survey',
	description: 'A test survey with two text questions used for test:ui tests',
	questions: [
		{
			id: 'ques_first',
			code: 'Q1',
			title: 'First Question',
			type: 'text',
			control: 'input',
			placeholder: 'Enter your first answer',
			required: true,
		},
		{
			id: 'ques_second',
			code: 'Q2',
			title: 'Second Question',
			type: 'text',
			control: 'textarea',
			placeholder: 'Enter your second answer',
			required: true,
		},
	],
};

// Custom survey with conditional jumps

export const surveyWithConditionalJumps: Survey = {
	id: 'surv_test_with_jumps',
	code: 'ui-test-with-jumps',
	title: 'Test Survey with jump',
	description: 'A test survey with two text questions used for test:ui tests',
	questions: [
		{
			id: 'ques_first',
			code: 'Q1',
			title: 'First Question',
			type: 'text',
			control: 'input',
			placeholder: 'Enter your first answer',
			required: true,
		},
		{
			id: 'ques_second',
			code: 'Q2',
			title: 'Second Question',
			type: 'text',
			control: 'textarea',
			placeholder: 'Enter your second answer',
			required: false,
		},
		{
			id: 'ques_third',
			code: 'Q3',
			title: 'Third Question, conditional jump',
			subtitle: '',
			type: 'single',
			options: [
				'Move on (implicit next)',
				{ id: 'Go to first question', next: 'ques_first' },
				{ id: 'Go to second question', next: 'ques_second' },
				{ id: 'Go to fourth question (explicit next)', next: 'ques_fourth' },
				{ id: 'Go to last question (jump forward)', next: 'ques_fifth' },
			],
			required: false,
		},
		{
			id: 'ques_fourth',
			code: 'Q4',
			title: 'Fourth Question',
			type: 'text',
			control: 'textarea',
			placeholder: 'Enter your fourth answer',
			required: false,
		},
		{
			id: 'ques_fifth',
			code: 'Q5',
			title: 'Last Question',
			type: 'text',
			control: 'textarea',
			placeholder: 'Enter your last answer',
			required: false,
		},
	],
};
