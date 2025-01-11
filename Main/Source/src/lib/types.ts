import type { AllowedChars } from '$lib/components/survey';

export type Survey = {
	id: `surv_${string}`;
	code: string;
	title: string;
	intro?: string;
	outro?: string;
	description?: string;
	questions: Question[];
};

export type QuestionType = Question['type'];

export type Option = {
	id: string;
	label?: string;
	description?: string;
	next?: Question['next'];
};

export type SingleQuestion = Extract<Question, { type: 'single' }>;
export type GridSingleQuestion = Extract<Question, { type: 'grid-single' }>;
export type GridApiQuestion = Extract<Question, { type: 'grid-api' }>;
export type MultipleQuestion = Extract<Question, { type: 'multiple' }>;
export type RatingQuestion = Extract<Question, { type: 'rating' }>;
export type TextQuestion = Extract<Question, { type: 'text' }>;
export type GridTextQuestion = Extract<Question, { type: 'grid-text' }>;

export type TextItem = {
	id: string;
	label?: string;
	description?: string;
	placeholder?: string;
	control?: 'textarea' | 'input';
	allowedChars?: AllowedChars;
	maxlength?: number;
	required?: boolean;
};

type OtherTextItem = {
	allow?: boolean;
	next?: Question['next'];
	label?: string;
	description?: string;
	placeholder?: string;
	allowedChars?: AllowedChars;
	maxlength?: number;
};

export type SingleItem = {
	id: string;
	label?: string;
	required?: boolean;
};

export type ApiItem = {
	id: string;
	label?: string;
	control?: 'select' | 'combobox';
	required?: boolean;
	idField: string; // ej: id
	descriptionField?: string; // ej: nombre, same as idField by default
	endpoint: string; // ej /api/provincias/{parentTitle1}/departamentos/{parentTitle2}/localidades
};

export type Question = {
	id: `ques_${string}`;
	code?: string;
	title: string;
	subtitle?: string;
	next?: Question['id'] | undefined | null; // null ends the survey
} & (
	| {
			type: 'single';
			options: Array<Option | string>;
			other?: OtherTextItem | boolean;
			control?: 'radio' | 'select';
			answer?: string;
			required?: boolean;
	  }
	| {
			type: 'grid-single';
			items: Array<SingleItem | string>;
			options: Array<Option | string>;
			other?: OtherTextItem | boolean;
			control?: 'radio' | 'select';
			answer?: Record<string, string>;
			required?: boolean;
	  }
	| {
			type: 'grid-api';
			items: ApiItem[];
			control?: 'select' | 'combobox';
			answer?: Record<string, string>;
			required?: boolean;
	  }
	| {
			type: 'multiple';
			options: Array<Option | string>;
			other?: OtherTextItem | boolean;
			answer?: string[];
			required?: boolean;
	  }
	| {
			type: 'grid-text';
			items: Array<TextItem | string>;
			answer?: Record<string, string>;
			required?: boolean;
	  }
	| {
			type: 'rating';
			answer?: number;
			required?: boolean;
	  }
	| ({
			type: 'text';
			answer?: string;
	  } & TextItem)
);
