import type { GridTextQuestion } from '$lib/types';

import { page } from '@vitest/browser/context';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import GridText from '../GridText.svelte';

// Sample grid text questions for tests
const q: GridTextQuestion = {
	id: 'ques_basic_grid_text',
	type: 'grid-text',
	title: 'Basic Grid Text Question',
	items: [
		{ id: 'name', label: 'Full Name', required: true },
		{ id: 'email', label: 'Email Address', required: true },
		{ id: 'phone', label: 'Phone Number', required: false },
	],
};

describe('GridText question component', () => {
	it('should render all text input fields correctly', async () => {
		render(GridText, { question: q });

		expect(page.getByLabelText('Full Name')).toBeInTheDocument();
		expect(page.getByLabelText('Email Address')).toBeInTheDocument();
		expect(page.getByLabelText('Phone Number')).toBeInTheDocument();
	});

	it('should initialize with provided answer values and trigger onupdate callback', async () => {
		const props = $state({
			question: {
				...q,
				answer: { name: 'John Doe', email: 'john@example.com' },
			},
			onupdate: vi.fn(),
		});
		render(GridText, props);

		const nameInput = page.getByLabelText('Full Name');
		const emailInput = page.getByLabelText('Email Address');

		expect(nameInput.element()).toHaveValue('John Doe');
		expect(emailInput.element()).toHaveValue('john@example.com');

		// onupdate should be called on start with initial values
		expect(props.onupdate).toHaveBeenCalledWith({
			name: 'John Doe',
			email: 'john@example.com',
			phone: '',
		});
	});

	it('should handle text input and trigger onupdate callback', async () => {
		const props = $state({ question: q, onupdate: vi.fn() });
		render(GridText, props);

		const nameInput = page.getByLabelText('Full Name');
		const emailInput = page.getByLabelText('Email Address');

		// Initial state - empty values
		expect(props.onupdate).toHaveBeenCalledWith({ name: '', email: '', phone: '' });

		// Type in name field
		await nameInput.fill('Jane Smith');
		expect(props.onupdate).toHaveBeenCalledWith({ name: 'Jane Smith', email: '', phone: '' });

		// Type in email field
		await emailInput.fill('jane@example.com');
		expect(props.onupdate).toHaveBeenCalledWith({
			name: 'Jane Smith',
			email: 'jane@example.com',
			phone: '',
		});
	});

	it('should validate required fields and update isValid prop', async () => {
		const props = $state({ question: q, isValid: true });
		render(GridText, props);

		const nameInput = page.getByLabelText('Full Name');
		const emailInput = page.getByLabelText('Email Address');

		// Initially invalid because required fields are empty
		expect(props.isValid).toBe(false);

		// Fill only name - still invalid
		await nameInput.fill('John Doe');
		expect(props.isValid).toBe(false);

		// Fill email too - now valid
		await emailInput.fill('john@example.com');
		expect(props.isValid).toBe(true);

		// Clear name - invalid again
		await nameInput.clear();
		expect(props.isValid).toBe(false);
	});

	it('should always mark non-required questions as valid regardless of input', async () => {
		const optionalQuestion: GridTextQuestion = {
			id: 'ques_optional_grid',
			type: 'grid-text',
			title: 'Optional Grid Question',
			items: [
				{ id: 'optional1', label: 'Optional Field 1', required: false },
				{ id: 'optional2', label: 'Optional Field 2', required: false },
			],
		};

		const props = $state({ question: optionalQuestion, isValid: false });
		render(GridText, props);

		// Should be valid even with empty fields since all are optional
		expect(props.isValid).toBe(true);
	});

	it('should render field descriptions when provided', async () => {
		const questionWithDescriptions: GridTextQuestion = {
			id: 'ques_with_descriptions',
			type: 'grid-text',
			title: 'Question with Descriptions',
			items: [
				{
					id: 'name',
					label: 'Full Name',
					description: 'Enter your first and last name',
					required: true,
				},
				{
					id: 'bio',
					label: 'Biography',
					description: 'Tell us about yourself',
					control: 'textarea',
					required: false,
				},
			],
		};

		render(GridText, { question: questionWithDescriptions });

		expect(page.getByText('Enter your first and last name')).toBeInTheDocument();
		expect(page.getByText('Tell us about yourself')).toBeInTheDocument();
	});

	it('should render textarea controls when specified', async () => {
		const questionWithTextarea: GridTextQuestion = {
			id: 'ques_with_textarea',
			type: 'grid-text',
			title: 'Question with Textarea',
			items: [
				{ id: 'input_field', label: 'Input Field', control: 'input', required: true },
				{ id: 'textarea_field', label: 'Textarea Field', control: 'textarea', required: true },
			],
		};

		render(GridText, { question: questionWithTextarea });

		const inputField = page.getByLabelText('Input Field');
		const textareaField = page.getByLabelText('Textarea Field');

		expect(inputField.element().tagName).toBe('INPUT');
		expect(textareaField.element().tagName).toBe('TEXTAREA');
	});

	it('should handle character restrictions correctly', async () => {
		const questionWithRestrictions: GridTextQuestion = {
			id: 'ques_with_restrictions',
			type: 'grid-text',
			title: 'Question with Character Restrictions',
			items: [
				{
					id: 'numbers_only',
					label: 'Numbers Only',
					allowedChars: 'numbers',
					maxlength: 5,
					required: true,
				},
				{
					id: 'digits_only',
					label: 'Digits Only',
					allowedChars: 'digits',
					maxlength: 5,
					required: true,
				},
				{ id: 'letters_only', label: 'Letters Only', allowedChars: 'letters', required: true },
			],
		};

		const props = $state({ question: questionWithRestrictions, onupdate: vi.fn() });
		render(GridText, props);

		const numbersField = page.getByLabelText('Numbers Only');
		const digitsField = page.getByLabelText('Digits Only');
		const lettersField = page.getByLabelText('Letters Only');

		// Test that fields are rendered with correct attributes
		expect(numbersField).toBeInTheDocument();
		expect(digitsField).toBeInTheDocument();
		expect(lettersField).toBeInTheDocument();

		// Test numbers only field - valid input
		await numbersField.fill('12345');
		expect(numbersField.element()).toHaveValue('12345');
		expect(numbersField.element()).toHaveAttribute('maxlength', '5'); // Test that maxlength attribute is applied

		// Test numbers only field - invalid input
		await numbersField.fill('123x!');
		expect(numbersField.element()).toHaveValue('123');

		// Test numbers only field - invalid input
		await numbersField.fill('-10.4');
		expect(numbersField.element()).toHaveValue('-10.4');

		// Test digits only field - valid input
		await digitsField.fill('12345');
		expect(digitsField.element()).toHaveValue('12345');
		expect(digitsField.element()).toHaveAttribute('maxlength', '5'); // Test that maxlength attribute is applied

		// Test digits only field - invalid input
		await digitsField.fill('-10.4');
		expect(digitsField.element()).toHaveValue('104');

		// Test that maxlength attribute is applied
		expect(numbersField.element()).toHaveAttribute('maxlength', '5');

		// Test letters only field - valid input
		await lettersField.fill('1t2e3st123');
		expect(lettersField.element()).toHaveValue('test');
	});

	it('should apply column layout for large number of items', async () => {
		const questionWithManyItems: GridTextQuestion = {
			id: 'ques_many_items',
			type: 'grid-text',
			title: 'Question with Many Items',
			items: Array.from({ length: 15 }, (_, i) => ({
				id: `item${i + 1}`,
				label: `Item ${i + 1}`,
				required: false,
			})),
		};

		const { container } = render(GridText, { question: questionWithManyItems });

		// Check if column layout classes are applied
		const gridContainer = container.querySelector('.lg\\:columns-3');
		expect(gridContainer).toBeInTheDocument();
	});

	it('should handle string items correctly', async () => {
		const questionWithStringItems: GridTextQuestion = {
			id: 'ques_string_items',
			type: 'grid-text',
			title: 'Question with String Items',
			items: ['firstName', 'lastName', 'email'],
		};

		render(GridText, { question: questionWithStringItems });

		// String items should be converted to proper labels
		expect(page.getByLabelText('FirstName')).toBeInTheDocument();
		expect(page.getByLabelText('LastName')).toBeInTheDocument();
		expect(page.getByLabelText('Email')).toBeInTheDocument();
	});

	it('should handle placeholders correctly', async () => {
		const questionWithPlaceholders: GridTextQuestion = {
			id: 'ques_with_placeholders',
			type: 'grid-text',
			title: 'Question with Placeholders',
			items: [
				{ id: 'name', label: 'Name', placeholder: 'Enter your name here', required: true },
				{ id: 'email', label: 'Email', placeholder: 'user@example.com', required: true },
			],
		};

		render(GridText, { question: questionWithPlaceholders });

		const nameField = page.getByLabelText('Name');
		const emailField = page.getByLabelText('Email');

		expect(nameField.element()).toHaveAttribute('placeholder', 'Enter your name here');
		expect(emailField.element()).toHaveAttribute('placeholder', 'user@example.com');
	});

	it('should handle maxlength restrictions', async () => {
		const questionWithMaxLength: GridTextQuestion = {
			id: 'ques_with_maxlength',
			type: 'grid-text',
			title: 'Question with Max Length',
			items: [
				{ id: 'short_text', label: 'Short Text', maxlength: 10, required: true },
				{
					id: 'long_text',
					label: 'Long Text',
					control: 'textarea',
					maxlength: 100,
					required: true,
				},
			],
		};

		render(GridText, { question: questionWithMaxLength });

		const shortField = page.getByLabelText('Short Text');
		const longField = page.getByLabelText('Long Text');

		expect(shortField.element()).toHaveAttribute('maxlength', '10');
		expect(longField.element()).toHaveAttribute('maxlength', '100');

		// await shortField.fill('1234567901234567890');
		// expect(shortField.element()).toHaveValue('1234567890'); // #TODO: BUG: it receives 12345678901!!!
	});

	it('should show required asterisk for required fields', async () => {
		render(GridText, { question: q });

		// Required fields should have asterisk
		const nameLabel = page.getByText('Full Name');
		const emailLabel = page.getByText('Email Address');
		const phoneLabel = page.getByText('Phone Number');

		// Check that required fields have asterisk in their parent elements
		expect(nameLabel.element().parentElement?.textContent).toContain('*');
		expect(emailLabel.element().parentElement?.textContent).toContain('*');
		expect(phoneLabel.element().parentElement?.textContent).not.toContain('*');
	});
});
