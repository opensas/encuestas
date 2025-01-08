export type Survey = {
	id: `surv_${string}`;
	code: string;
	title: string;
	intro?: string;
	outro?: string;
	description?: string;
	questions: Question[];
};

export type QuestionKind = Question['kind'];

export type Option = {
	title: string;
	description?: string;
	next?: Question['next'];
};

export type SingleQuestion = Extract<Question, { kind: 'single' }>;
export type GridSingleQuestion = Extract<Question, { kind: 'grid-single' }>;
export type GridApiQuestion = Extract<Question, { kind: 'grid-api' }>;
export type MultipleQuestion = Extract<Question, { kind: 'multiple' }>;
export type RatingQuestion = Extract<Question, { kind: 'rating' }>;
export type TextQuestion = Extract<Question, { kind: 'text' }>;
export type GridTextQuestion = Extract<Question, { kind: 'grid-text' }>;

export type TextItem = {
	title: string;
	description?: string;
	placeholder?: string;
	control?: 'textarea' | 'input';
	allowedChars?: 'digits' | 'numbers' | string | RegExp;
	maxlength?: number;
	required?: boolean;
};

export type SingleItem = {
	title: string;
	required?: boolean;
};

export type ApiItem = {
	title: string;
	required?: boolean;
	idField: string; // ej: id
	descriptionField?: string; // ej: nombre, same as idField by default
	endpoint: string; // ej /api/provincias/{01}/departamentos/{02}/localidades
};

export type Question = {
	id: `ques_${string}`;
	code?: string;
	title: string;
	next?: Question['id'] | undefined | null; // null ends the survey
	description?: string;
} & (
	| {
			kind: 'single';
			options: Array<Option | string>;
			allowOther?: boolean;
			titleOther?: string;
			placeholderOther?: string;
			nextOther?: Question['next'];
			control?: 'radio' | 'select';
			answer?: string;
			required?: boolean;
	  }
	| {
			kind: 'grid-single';
			items: Array<SingleItem | string>;
			options: Array<Option | string>;
			allowOther?: boolean;
			titleOther?: string;
			placeholderOther?: string;
			nextOther?: Question['next'];
			control?: 'radio' | 'select';
			answer?: Record<string, string>;
			required?: boolean;
	  }
	| {
			kind: 'grid-api';
			items: ApiItem[];
			answer?: Record<string, string>;
			required?: boolean;
	  }
	| {
			kind: 'multiple';
			options: Array<Option | string>;
			allowOther?: boolean;
			titleOther?: string;
			placeholderOther?: string;
			nextOther?: Question['next'];
			answer?: string[];
			required?: boolean;
	  }
	| {
			kind: 'grid-text';
			items: Array<TextItem | string>;
			answer?: Record<string, string>;
			required?: boolean;
	  }
	| {
			kind: 'rating';
			answer?: number;
			required?: boolean;
	  }
	| ({
			kind: 'text';
			answer?: string;
	  } & TextItem)
);
