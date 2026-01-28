import type { Survey } from '$lib/types';

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
