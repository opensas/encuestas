import type { SingleQuestion } from '$lib/types';

import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';

import Single from '../Single.svelte';

// Sample single questions for demos
const q: SingleQuestion = {
	id: 'ques_basic_single',
	type: 'single',
	title: 'Basic Single Question',
	options: [
		{ id: 'option1', label: 'Option 1' },
		{ id: 'option2', label: 'Option 2' },
		{ id: 'option3', label: 'Option 3' },
	],
	required: true,
};

describe('Single question component', () => {
	it('should render all radio options correctly', async () => {
		render(Single, { question: q });

		expect(page.getByLabelText('Option 1')).toBeInTheDocument();
		expect(page.getByLabelText('Option 2')).toBeInTheDocument();
		expect(page.getByLabelText('Option 3')).toBeInTheDocument();
	});

	it('should initialize with provided answer value and trigger onupdate callback', async () => {
		const props = $state({ question: { ...q, answer: 'option2' }, onupdate: vi.fn() });
		render(Single, props);

		const option2 = page.getByLabelText('Option 2');
		expect(option2.element()).toBeChecked();

		// onupdate should be called on start with initial value (score is 0 when no weight/scores)
		expect(props.onupdate).toHaveBeenCalledWith('option2', 0);
	});

	it('should render as radio buttons by default', async () => {
		render(Single, { question: q });

		const option1 = page.getByLabelText('Option 1');
		expect(option1.element()).toHaveAttribute('role', 'radio');
	});

	it('should render as select dropdown when control is set to select', async () => {
		render(Single, { question: { ...q, control: 'select' } });

		const select = page.getByRole('button', { name: /elija una opción/i });
		expect(select).toBeInTheDocument();
	});

	it('should handle option selection and trigger onupdate callback', async () => {
		const props = $state({ question: q, onupdate: vi.fn() });
		render(Single, props);

		const option2 = page.getByLabelText('Option 2');

		// onupdate should be called on initialization with empty value (score is 0 when no weight/scores)
		expect(props.onupdate).toHaveBeenCalledWith('', 0);

		await option2.click();

		// onupdate should be called when option is selected (score is 0 when no weight/scores)
		expect(props.onupdate).toHaveBeenCalledWith('option2', 0);
		expect(option2.element()).toBeChecked();
	});

	it('should validate required questions and update isValid prop based on selection', async () => {
		const props = $state({ question: q, isValid: false });
		render(Single, props);

		// Required question should be invalid when no option is selected
		expect(props.isValid).toBe(false);

		const option1 = page.getByLabelText('Option 1');
		await option1.click();

		// Required question should be valid when an option is selected
		expect(props.isValid).toBe(true);
	});

	it('should always mark non-required questions as valid regardless of selection', async () => {
		const nonRequired = { ...q, required: false };
		const props = $state({ question: nonRequired, isValid: false });
		render(Single, props);

		// Non-required question should be valid even without selection
		expect(props.isValid).toBe(true);

		const option1 = page.getByLabelText('Option 1');
		await option1.click();

		// Non-required question should still be valid with selection
		expect(props.isValid).toBe(true);
	});

	it('should render option descriptions when provided', async () => {
		const questionWithDescriptions: SingleQuestion = {
			...q,
			options: [
				{ id: 'opt1', label: 'Option 1', description: 'First option description' },
				{ id: 'opt2', label: 'Option 2', description: 'Second option description' },
			],
		};

		render(Single, { question: questionWithDescriptions });

		expect(page.getByText('First option description')).toBeInTheDocument();
		expect(page.getByText('Second option description')).toBeInTheDocument();
	});

	it('should calculate and return score when weight and option scores are provided', async () => {
		const questionWithScores: SingleQuestion = {
			...q,
			weight: 2.5,
			options: [
				{ id: 'low', label: 'Low', score: 10 },
				{ id: 'medium', label: 'Medium', score: 50 },
				{ id: 'high', label: 'High', score: 100 },
			],
		};

		const props = $state({ question: questionWithScores, onupdate: vi.fn() });
		render(Single, props);

		const mediumOption = page.getByLabelText('Medium');
		await mediumOption.click();

		// Score should be 50 * 2.5 = 125
		expect(props.onupdate).toHaveBeenCalledWith('medium', 125);
	});

	it('should render other option input when other is enabled', async () => {
		const questionWithOther: SingleQuestion = {
			...q,
			other: true,
		};

		render(Single, { question: questionWithOther });

		const otherRadio = page.getByRole('radio').last();
		const otherInput = page.getByRole('textbox');

		expect(otherRadio).toBeInTheDocument();
		expect(otherInput).toBeInTheDocument();
	});

	it('should handle other option selection and text input', async () => {
		const questionWithOther: SingleQuestion = {
			...q,
			other: true,
		};

		const props = $state({ question: questionWithOther, onupdate: vi.fn() });
		render(Single, props);

		const otherRadio = page.getByRole('radio').last();
		const otherInput = page.getByRole('textbox');

		// Select other option
		await otherRadio.click();
		expect(otherRadio.element()).toBeChecked();

		// Type in other input
		await otherInput.fill('Custom answer');

		// Should call onupdate with the custom text (score is 0 when no weight/scores)
		expect(props.onupdate).toHaveBeenCalledWith('Custom answer', 0);
	});

	it('should handle custom other option configuration', async () => {
		const questionWithCustomOther: SingleQuestion = {
			...q,
			other: {
				label: 'Custom Other Label',
				description: 'Custom other description',
				placeholder: 'Enter custom value',
				maxlength: 50,
			},
		};

		render(Single, { question: questionWithCustomOther });

		expect(page.getByText('Custom Other Label')).toBeInTheDocument();
		expect(page.getByText('Custom other description')).toBeInTheDocument();
		expect(page.getByRole('textbox')).toBeInTheDocument();
	});

	it('should initialize with other option when answer is not in predefined options', async () => {
		const props = $state({
			question: { ...q, answer: 'custom answer', other: true },
			onupdate: vi.fn(),
		});
		render(Single, props);

		const otherRadio = page.getByRole('radio').last();
		const otherInput = page.getByRole('textbox');

		expect(otherRadio.element()).toBeChecked();
		expect((otherInput.element() as HTMLInputElement).value).toBe('custom answer');
		expect(props.onupdate).toHaveBeenCalledWith('custom answer', 0);
	});

	it('should handle string options correctly', async () => {
		const questionWithStringOptions: SingleQuestion = {
			...q,
			options: ['Simple Option 1', 'Simple Option 2', 'Simple Option 3'],
		};

		render(Single, { question: questionWithStringOptions });

		expect(page.getByLabelText('Simple Option 1')).toBeInTheDocument();
		expect(page.getByLabelText('Simple Option 2')).toBeInTheDocument();
		expect(page.getByLabelText('Simple Option 3')).toBeInTheDocument();
	});

	it('should apply column layout for large number of options', async () => {
		const questionWithManyOptions: SingleQuestion = {
			...q,
			options: Array.from({ length: 15 }, (_, i) => ({
				id: `option${i + 1}`,
				label: `Option ${i + 1}`,
			})),
		};

		render(Single, { question: questionWithManyOptions });

		// Should render all 15 radio options
		const radioElements = page.getByRole('radio').all();
		expect(radioElements).toHaveLength(15);
	});

	it('should handle select dropdown option selection', async () => {
		const question: SingleQuestion = { ...q, control: 'select' };
		const props = $state({ question, onupdate: vi.fn() });
		render(Single, props);

		const select = page.getByRole('button', { name: /elija una opción/i });

		// Initial state should be empty (score is 0 when no weight/scores)
		expect(props.onupdate).toHaveBeenCalledWith('', 0);

		// Click to open dropdown and select option
		await select.click();
		const option2 = page.getByRole('option', { name: 'Option 2' });
		await option2.click();

		expect(props.onupdate).toHaveBeenCalledWith('option2', 0);
	});

	it('should handle complete flow of option selection and deselection', async () => {
		const props = $state({ question: q, onupdate: vi.fn(), isValid: false });
		render(Single, props);

		const option1 = page.getByLabelText('Option 1');
		const option2 = page.getByLabelText('Option 2');
		const option3 = page.getByLabelText('Option 3');

		// Initial state - no selection (score is 0 when no weight/scores)
		expect(props.onupdate).toHaveBeenCalledWith('', 0);
		expect(props.isValid).toBe(false);

		// Select option 1
		await option1.click();
		expect(option1.element()).toBeChecked();
		expect(option2.element()).not.toBeChecked();
		expect(option3.element()).not.toBeChecked();
		expect(props.onupdate).toHaveBeenCalledWith('option1', 0);
		expect(props.isValid).toBe(true);

		// Switch to option 2
		await option2.click();
		expect(option1.element()).not.toBeChecked();
		expect(option2.element()).toBeChecked();
		expect(option3.element()).not.toBeChecked();
		expect(props.onupdate).toHaveBeenCalledWith('option2', 0);
		expect(props.isValid).toBe(true);

		// Switch to option 3
		await option3.click();
		expect(option1.element()).not.toBeChecked();
		expect(option2.element()).not.toBeChecked();
		expect(option3.element()).toBeChecked();
		expect(props.onupdate).toHaveBeenCalledWith('option3', 0);
		expect(props.isValid).toBe(true);

		// Verify total callback calls (1 initial + 3 selections)
		expect(props.onupdate).toHaveBeenCalledTimes(4);
	});

	it.each([
		{ options: ['A', 'B'], expected: 2 },
		{
			options: [
				{ id: 'x', label: 'X' },
				{ id: 'y', label: 'Y' },
			],
			expected: 2,
		},
		{ options: Array.from({ length: 5 }, (_, i) => `Option ${i + 1}`), expected: 5 },
	])(
		'should render $expected options correctly for different option formats',
		async ({ options, expected }) => {
			const testQuestion: SingleQuestion = {
				...q,
				options,
			};

			render(Single, { question: testQuestion });

			// Count radio buttons by checking how many radio elements exist
			const radioElements = page.getByRole('radio').all();
			expect(radioElements).toHaveLength(expected);
		}
	);
});
