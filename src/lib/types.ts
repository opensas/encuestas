export type Survey = {
	id: `enc_${string}`;
	code: string;
	title: string;
	description?: string;
	questions: Question[];
};

export type QuestionKind = Question['kind'];

export type Option = { title: string; description?: string; next?: Question['next'] };

export type SingleQuestion = Extract<Question, { kind: 'single' }>;
export type GridSingleQuestion = Extract<Question, { kind: 'grid-single' }>;
export type MultipleQuestion = Extract<Question, { kind: 'multiple' }>;
export type RatingQuestion = Extract<Question, { kind: 'rating' }>;
export type TextQuestion = Extract<Question, { kind: 'text' }>;
export type GridTextQuestion = Extract<Question, { kind: 'grid-text' }>;

export type TextItem = {
	title: string;
	description?: string;
	placeholder?: string;
	control?: 'textarea' | 'input';
	maxlength?: number;
	required?: boolean;
};

export type SingleItem = {
	title: string;
	required?: boolean;
};

export type Question = {
	id: `preg_${string}`;
	next?: Question['id'] | undefined | null; // null ends the survey
	title: string;
	code?: string;
	description?: string;
	// tipo: TipoPregunta; // 'unica' | 'multiple' | 'puntaje' | 'libre'
} & (
	| {
			kind: 'single';
			options: Array<Option | string>;
			allowOther?: boolean;
			placeholderOther?: string;
			control?: 'radio' | 'select';
			nextOther?: Question['next'];
			answer?: string;
			required?: boolean;
	  }
	| {
			kind: 'grid-single';
			items: Array<SingleItem | string>;
			options: Array<Option | string>;
			allowOther?: boolean;
			placeholderOther?: string;
			control?: 'radio' | 'select';
			nextOther?: Question['next'];
			answer?: Record<string, string>;
			required?: boolean;
	  }
	| {
			kind: 'multiple';
			options: Array<Option | string>;
			allowOther?: boolean;
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
	| {
			kind: 'text';
			title?: string;
			description?: string;
			placeholder?: string; // placeholder
			control?: 'textarea' | 'input';
			maxlength?: number;
			answer?: string;
			required?: boolean;
	  }
);
