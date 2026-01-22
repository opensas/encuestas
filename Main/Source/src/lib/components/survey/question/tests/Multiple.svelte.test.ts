import type { MultipleQuestion } from '$lib/types';

import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';

import Multiple from '../Multiple.svelte';

// Sample multiple questions for demos
const q: MultipleQuestion = {
	id: 'ques_basic_multiple',
	type: 'multiple',
	title: 'Basic Multiple Question',
	options: [
		{ id: 'option1', label: 'Option 1' },
		{ id: 'option2', label: 'Option 2' },
		{ id: 'option3', label: 'Option 3' },
	],
	required: true,
};

describe('Multiple question component', () => {
	it('should render all checkbox options correctly', async () => {
		render(Multiple, { question: q });

		expect(page.getByLabelText('Option 1')).toBeInTheDocument();
		expect(page.getByLabelText('Option 2')).toBeInTheDocument();
		expect(page.getByLabelText('Option 3')).toBeInTheDocument();
	});

	it('should initialize with provided answer values and trigger onupdate callback', async () => {
		const props = $state({ question: { ...q, answer: ['option1', 'option3'] }, onupdate: vi.fn() });
		render(Multiple, props);

		const option1 = page.getByLabelText('Option 1');
		const option2 = page.getByLabelText('Option 2');
		const option3 = page.getByLabelText('Option 3');

		expect(option1.element()).toBeChecked();
		expect(option2.element()).not.toBeChecked();
		expect(option3.element()).toBeChecked();

		// onupdate should be called on start with initial values (no score when no weight)
		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'option3'], undefined);
	});

	it('should render as checkboxes', async () => {
		render(Multiple, { question: q });

		const option1 = page.getByLabelText('Option 1');
		expect(option1.element()).toHaveAttribute('role', 'checkbox');
	});

	it('should handle multiple option selection and trigger onupdate callback', async () => {
		const props = $state({ question: q, onupdate: vi.fn() });
		render(Multiple, props);

		const option1 = page.getByLabelText('Option 1');
		const option2 = page.getByLabelText('Option 2');

		// onupdate should be called on initialization with empty array (no score when no weight)
		expect(props.onupdate).toHaveBeenCalledWith([], undefined);

		// Select first option
		await option1.click();
		expect(props.onupdate).toHaveBeenCalledWith(['option1'], undefined);
		expect(option1.element()).toBeChecked();

		// Select second option (should add to array)
		await option2.click();
		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'option2'], undefined);
		expect(option1.element()).toBeChecked();
		expect(option2.element()).toBeChecked();

		// Deselect first option (should remove from array)
		await option1.click();
		expect(props.onupdate).toHaveBeenCalledWith(['option2'], undefined);
		expect(option1.element()).not.toBeChecked();
		expect(option2.element()).toBeChecked();
	});

	it('should validate required questions and update isValid prop based on selection', async () => {
		const props = $state({ question: q, isValid: false });
		render(Multiple, props);

		// Required question should be invalid when no options are selected
		expect(props.isValid).toBe(false);

		const option1 = page.getByLabelText('Option 1');
		await option1.click();

		// Required question should be valid when at least one option is selected
		expect(props.isValid).toBe(true);

		// Deselect the option
		await option1.click();

		// Required question should be invalid again when no options are selected
		expect(props.isValid).toBe(false);
	});

	it('should always mark non-required questions as valid regardless of selection', async () => {
		const nonRequired = { ...q, required: false };
		const props = $state({ question: nonRequired, isValid: false });
		render(Multiple, props);

		// Non-required question should be valid even without selection
		expect(props.isValid).toBe(true);

		const option1 = page.getByLabelText('Option 1');
		await option1.click();

		// Non-required question should still be valid with selection
		expect(props.isValid).toBe(true);

		// Deselect option
		await option1.click();

		// Non-required question should still be valid without selection
		expect(props.isValid).toBe(true);
	});

	it('should render option descriptions when provided', async () => {
		const questionWithDescriptions: MultipleQuestion = {
			...q,
			options: [
				{ id: 'opt1', label: 'Option 1', description: 'First option description' },
				{ id: 'opt2', label: 'Option 2', description: 'Second option description' },
			],
		};

		render(Multiple, { question: questionWithDescriptions });

		expect(page.getByText('First option description')).toBeInTheDocument();
		expect(page.getByText('Second option description')).toBeInTheDocument();
	});

	it('should calculate and return combined score when weight and option scores are provided', async () => {
		const questionWithScores: MultipleQuestion = {
			...q,
			weight: 2.0,
			options: [
				{ id: 'low', label: 'Low', score: 10 },
				{ id: 'medium', label: 'Medium', score: 50 },
				{ id: 'high', label: 'High', score: 100 },
			],
		};

		const props = $state({ question: questionWithScores, onupdate: vi.fn() });
		render(Multiple, props);

		const lowOption = page.getByLabelText('Low');
		const highOption = page.getByLabelText('High');

		// Select low option (10 * 2.0 = 20)
		await lowOption.click();
		expect(props.onupdate).toHaveBeenCalledWith(['low'], 20);

		// Select high option as well (10 + 100) * 2.0 = 220
		await highOption.click();
		expect(props.onupdate).toHaveBeenCalledWith(['low', 'high'], 220);
	});

	it('should render other option input when other is enabled', async () => {
		const questionWithOther: MultipleQuestion = {
			...q,
			other: true,
		};

		render(Multiple, { question: questionWithOther });

		const otherCheckbox = page.getByRole('checkbox').last();
		const otherInput = page.getByRole('textbox');

		expect(otherCheckbox).toBeInTheDocument();
		expect(otherInput).toBeInTheDocument();
	});

	it('should handle other option selection and text input', async () => {
		const questionWithOther: MultipleQuestion = {
			...q,
			other: true,
		};

		const props = $state({ question: questionWithOther, onupdate: vi.fn() });
		render(Multiple, props);

		const option1 = page.getByLabelText('Option 1');
		const otherCheckbox = page.getByRole('checkbox').last();
		const otherInput = page.getByRole('textbox');

		// Select regular option first
		await option1.click();
		expect(props.onupdate).toHaveBeenCalledWith(['option1'], undefined);

		// Select other option
		await otherCheckbox.click();
		expect(otherCheckbox.element()).toBeChecked();

		// Type in other input
		await otherInput.fill('Custom answer');

		// Should call onupdate with both regular option and custom text
		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'Custom answer'], undefined);
	});

	it('should handle custom other option configuration', async () => {
		const questionWithCustomOther: MultipleQuestion = {
			...q,
			other: {
				label: 'Custom Other Label',
				description: 'Custom other description',
				placeholder: 'Enter custom value',
				maxlength: 50,
			},
		};

		render(Multiple, { question: questionWithCustomOther });

		expect(page.getByText('Custom Other Label')).toBeInTheDocument();
		expect(page.getByText('Custom other description')).toBeInTheDocument();
		expect(page.getByRole('textbox')).toBeInTheDocument();
	});

	it('should initialize with other option when answer contains non-predefined options', async () => {
		const props = $state({
			question: { ...q, answer: ['option1', 'custom answer'], other: true },
			onupdate: vi.fn(),
		});
		render(Multiple, props);

		const option1 = page.getByLabelText('Option 1');
		const otherCheckbox = page.getByRole('checkbox').last();
		const otherInput = page.getByRole('textbox');

		expect(option1.element()).toBeChecked();
		expect(otherCheckbox.element()).toBeChecked();
		expect((otherInput.element() as HTMLInputElement).value).toBe('custom answer');
		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'custom answer'], undefined);
	});

	it('should handle string options correctly', async () => {
		const questionWithStringOptions: MultipleQuestion = {
			...q,
			options: ['Simple Option 1', 'Simple Option 2', 'Simple Option 3'],
		};

		render(Multiple, { question: questionWithStringOptions });

		expect(page.getByLabelText('Simple Option 1')).toBeInTheDocument();
		expect(page.getByLabelText('Simple Option 2')).toBeInTheDocument();
		expect(page.getByLabelText('Simple Option 3')).toBeInTheDocument();
	});

	it('should apply column layout for large number of options', async () => {
		const questionWithManyOptions: MultipleQuestion = {
			...q,
			options: Array.from({ length: 15 }, (_, i) => ({
				id: `option${i + 1}`,
				label: `Option ${i + 1}`,
			})),
		};

		render(Multiple, { question: questionWithManyOptions });

		// Should render all 15 checkbox options
		const checkboxElements = page.getByRole('checkbox').all();
		expect(checkboxElements).toHaveLength(15);
	});

	it('should handle complete flow of multiple option selection and deselection', async () => {
		const props = $state({ question: q, onupdate: vi.fn(), isValid: false });
		render(Multiple, props);

		const option1 = page.getByLabelText('Option 1');
		const option2 = page.getByLabelText('Option 2');
		const option3 = page.getByLabelText('Option 3');

		// Initial state - no selection
		expect(props.onupdate).toHaveBeenCalledWith([], undefined);
		expect(props.isValid).toBe(false);

		// Select option 1
		await option1.click();
		expect(option1.element()).toBeChecked();
		expect(props.onupdate).toHaveBeenCalledWith(['option1'], undefined);
		expect(props.isValid).toBe(true);

		// Add option 2
		await option2.click();
		expect(option1.element()).toBeChecked();
		expect(option2.element()).toBeChecked();
		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'option2'], undefined);
		expect(props.isValid).toBe(true);

		// Add option 3
		await option3.click();
		expect(option1.element()).toBeChecked();
		expect(option2.element()).toBeChecked();
		expect(option3.element()).toBeChecked();
		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'option2', 'option3'], undefined);
		expect(props.isValid).toBe(true);

		// Deselect option 2
		await option2.click();
		expect(option1.element()).toBeChecked();
		expect(option2.element()).not.toBeChecked();
		expect(option3.element()).toBeChecked();
		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'option3'], undefined);
		expect(props.isValid).toBe(true);

		// Deselect all remaining options
		await option1.click();
		await option3.click();
		expect(option1.element()).not.toBeChecked();
		expect(option2.element()).not.toBeChecked();
		expect(option3.element()).not.toBeChecked();
		expect(props.onupdate).toHaveBeenCalledWith([], undefined);
		expect(props.isValid).toBe(false);

		// Verify total callback calls (1 initial + 6 interactions)
		expect(props.onupdate).toHaveBeenCalledTimes(7);
	});

	it('should handle other option deselection correctly', async () => {
		const questionWithOther: MultipleQuestion = {
			...q,
			other: true,
		};

		const props = $state({ question: questionWithOther, onupdate: vi.fn() });
		render(Multiple, props);

		const option1 = page.getByLabelText('Option 1');
		const otherCheckbox = page.getByRole('checkbox').last();
		const otherInput = page.getByRole('textbox');

		// Select regular option and other option with text
		await option1.click();
		await otherCheckbox.click();
		await otherInput.fill('Custom text');

		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'Custom text'], undefined);

		// Deselect other option
		await otherCheckbox.click();
		expect(props.onupdate).toHaveBeenCalledWith(['option1'], undefined);

		// Select other option again (should include text if still present)
		await otherCheckbox.click();
		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'Custom text'], undefined);
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
			const testQuestion: MultipleQuestion = {
				...q,
				options,
			};

			render(Multiple, { question: testQuestion });

			// Count checkbox buttons by checking how many checkbox elements exist
			const checkboxElements = page.getByRole('checkbox').all();
			expect(checkboxElements).toHaveLength(expected);
		}
	);

	it('should handle empty answer array initialization', async () => {
		const props = $state({ question: { ...q, answer: [] }, onupdate: vi.fn() });
		render(Multiple, props);

		const option1 = page.getByLabelText('Option 1');
		const option2 = page.getByLabelText('Option 2');
		const option3 = page.getByLabelText('Option 3');

		expect(option1.element()).not.toBeChecked();
		expect(option2.element()).not.toBeChecked();
		expect(option3.element()).not.toBeChecked();

		// onupdate should be called with empty array
		expect(props.onupdate).toHaveBeenCalledWith([], undefined);
	});

	it('should maintain options order in answer array regardless of selection order', async () => {
		const props = $state({ question: q, onupdate: vi.fn() });
		render(Multiple, props);

		const option1 = page.getByLabelText('Option 1');
		const option2 = page.getByLabelText('Option 2');
		const option3 = page.getByLabelText('Option 3');

		// Select in specific order: 3, 1, 2 - but answer should be in options order: 1, 2, 3
		await option3.click();
		expect(props.onupdate).toHaveBeenCalledWith(['option3'], undefined);

		await option1.click();
		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'option3'], undefined); // Options order maintained

		await option2.click();
		expect(props.onupdate).toHaveBeenCalledWith(['option1', 'option2', 'option3'], undefined); // Options order maintained

		// Deselect middle option
		await option1.click();
		expect(props.onupdate).toHaveBeenCalledWith(['option2', 'option3'], undefined); // Options order maintained
	});

	it('should work completely without score information (backward compatibility)', async () => {
		// Question with no weight or option scores - pure backward compatibility
		const basicQuestion: MultipleQuestion = {
			id: 'ques_basic_no_scores',
			type: 'multiple',
			title: 'Basic Question Without Scores',
			options: [
				{ id: 'yes', label: 'Yes' },
				{ id: 'no', label: 'No' },
				{ id: 'maybe', label: 'Maybe' },
			],
			required: false,
		};

		// Callback that only expects answer array (old signature)
		const legacyCallback = vi.fn((answer: string[]) => {
			// This simulates old code that only expects the answer parameter
			expect(Array.isArray(answer)).toBe(true);
		});

		const props = $state({
			question: basicQuestion,
			onupdate: legacyCallback,
		});

		render(Multiple, props);

		const yesOption = page.getByLabelText('Yes');
		const noOption = page.getByLabelText('No');

		// Initial state - should call with empty array and undefined score
		expect(legacyCallback).toHaveBeenCalledWith([], undefined);

		// Select an option
		await yesOption.click();
		expect(yesOption.element()).toBeChecked();
		expect(legacyCallback).toHaveBeenCalledWith(['yes'], undefined);

		// Select another option
		await noOption.click();
		expect(noOption.element()).toBeChecked();
		expect(legacyCallback).toHaveBeenCalledWith(['yes', 'no'], undefined);

		// Deselect first option
		await yesOption.click();
		expect(yesOption.element()).not.toBeChecked();
		expect(legacyCallback).toHaveBeenCalledWith(['no'], undefined);

		// Component should work perfectly without any score-related properties
		expect(legacyCallback).toHaveBeenCalledTimes(4);
	});
});
