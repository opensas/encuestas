import type { TextQuestion } from '$lib/types';

import { page } from '@vitest/browser/context';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import Text from '../Text.svelte';

// Sample text questions for demos
const q: TextQuestion = {
	id: 'ques_basic_text',
	type: 'text',
	title: 'Basic Text Question',
	label: 'What is your name?',
	placeholder: 'Enter your full name',
	control: 'input',
	required: true,
};

describe('Text question component', () => {
	it('should render question label and placeholder text correctly', async () => {
		render(Text, { question: q });

		expect(page.getByText('What is your name?', { exact: true })).toBeInTheDocument();
		expect(page.getByLabelText('What is your name?', { exact: true })).toBeInTheDocument();
		expect(page.getByPlaceholder('Enter your full name', { exact: true })).toBeInTheDocument();
	});

	it('should initialize with provided answer value and trigger onupdate callback', async () => {
		const props = $state({ question: { ...q, answer: 'initial' }, onupdate: vi.fn() });
		render(Text, props);

		const input = page.getByRole('textbox');
		expect((input.element() as HTMLInputElement).value).toBe('initial');

		// onupdate should be call on start with initial value
		expect(props.onupdate).toHaveBeenNthCalledWith(1, 'initial');
	});

	it('should display optional description text when provided in question', async () => {
		render(Text, { question: { ...q, description: 'Helpful hint' } });
		expect(page.getByText('Helpful hint', { exact: true })).toBeInTheDocument();
	});

	it('should render an HTML input element by default', async () => {
		render(Text, { question: q });

		const inputEl = page.getByRole('textbox').element() as HTMLInputElement;
		expect(inputEl.tagName).toBe('INPUT');
	});

	it('should render an HTML textarea element when control type is textarea', async () => {
		render(Text, { question: { ...q, control: 'textarea' } });

		const inputEl = page.getByRole('textbox').element() as HTMLInputElement;
		expect(inputEl.tagName).toBe('TEXTAREA');
	});

	it('should validate required questions and update isValid prop based on input content', async () => {
		const props = $state({ question: q, isValid: false });

		render(Text, props);

		// required question should be invalid if it's empty
		expect(props.isValid).toBe(false);

		// required question should be valid if it's not empty anymore
		const input = page.getByRole('textbox');
		await input.fill('a');

		expect(props.isValid).toBe(true);

		// required question should be invalid if it's empty again
		await input.fill('');
		expect(props.isValid).toBe(false);
	});

	it('should always mark non-required questions as valid regardless of input content', async () => {
		const nonRequired = { ...q, required: false };

		const props = $state({ question: nonRequired, isValid: false });

		render(Text, props);

		// non required question should be valid even if it's empty
		expect(props.isValid).toBe(true);

		const input = page.getByRole('textbox');

		const inputEl = input.element() as HTMLInputElement;
		expect(inputEl).not.toBeNull();

		await input.fill('a');

		// non required question should still be valid if it's not empty anymore
		expect(inputEl.value).toBe('a');
		expect(props.isValid).toBe(true);

		// non required question should be valid if it's empty again
		await input.fill('');
		expect(inputEl.value).toBe('');
		expect(props.isValid).toBe(true);
	});

	it('should update input value when user types in the field', async () => {
		render(Text, { question: q });

		const input = page.getByRole('textbox');

		const inputEl = input.element() as HTMLInputElement;
		expect(inputEl).not.toBeNull();

		await input.fill('a');
		expect(inputEl.value).toBe('a');

		// non required question should be valid if it's empty again
		await input.fill('');
		expect(inputEl.value).toBe('');
	});

	it('should trigger onupdate callback on initialization and whenever input value changes', async () => {
		const props = $state({ question: q, onupdate: vi.fn() });

		render(Text, props);

		const input = page.getByRole('textbox');

		// onupdate should be call on start
		expect(props.onupdate).toHaveBeenNthCalledWith(1, '');

		// on update should be called when value changes
		await input.fill('a');
		expect(props.onupdate).toHaveBeenNthCalledWith(2, 'a');

		// on update should be called again when value changes
		await input.fill('');
		expect(props.onupdate).toHaveBeenNthCalledWith(3, '');
	});

	it('should enforce maxlength constraint and prevent input exceeding character limit', async () => {
		render(Text, { question: { ...q, maxlength: 5 } });

		const input = page.getByRole('textbox');

		const inputEl = input.element() as HTMLInputElement;
		expect(inputEl).not.toBeNull();

		await input.fill('12345');
		expect(inputEl.value).toBe('12345');

		await input.fill('123456');
		expect(inputEl.value).toBe('12345');

		await input.fill('1234567890');
		expect(inputEl.value).toBe('12345');
	});

	it('should prevent all input when maxlength is set to zero', async () => {
		render(Text, { question: { ...q, maxlength: 0 } });
		const textbox = page.getByRole('textbox');
		await textbox.fill('abc');
		expect((textbox.element() as HTMLInputElement).value).toBe('');
	});

	it.each([
		{ allowed: 'digits', input: 'ab12', expected: '12' },
		{ allowed: 'digits', input: '-123.45', expected: '12345' },
		{ allowed: 'aeiou', input: 'hello123', expected: 'eo' },
		{ allowed: 'aeiou', input: '-123.45', expected: '' },
		{ allowed: 'numbers', input: '-123.45', expected: '-123.45' },
		{ allowed: 'numbers', input: 's-1a2b3.45', expected: '-123.45' },
	])(
		'should respect allowedChars $allowed for $input accepting only $expected',
		async ({ allowed, input, expected }) => {
			render(Text, { question: { ...q, allowedChars: allowed } });
			const textbox = page.getByRole('textbox');
			await textbox.fill(input);
			expect((textbox.element() as HTMLInputElement).value).toBe(expected);
		}
	);
});
