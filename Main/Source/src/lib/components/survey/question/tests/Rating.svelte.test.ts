import type { RatingQuestion } from '$lib/types';

import { page } from '@vitest/browser/context';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import Rating from '../Rating.svelte';

// Sample rating questions for demos
const q: RatingQuestion = {
	id: 'ques_basic_rating',
	type: 'rating',
	title: 'Basic Rating Question',
	min: 0,
	max: 10,
	required: true,
};

describe('Rating question component', () => {
	it('should render rating component with default min value displayed', async () => {
		render(Rating, { question: q });

		expect(page.getByText('0', { exact: true })).toBeInTheDocument();
		expect(page.getByText('Puntaje', { exact: true })).toBeInTheDocument();
	});

	it('should initialize with provided answer value and trigger onupdate callback', async () => {
		const props = $state({ question: { ...q, answer: 5 }, onupdate: vi.fn() });
		render(Rating, props);

		expect(page.getByText('5', { exact: true })).toBeInTheDocument();

		// onupdate should be called on start with initial value
		expect(props.onupdate).toHaveBeenCalledWith(5, undefined);
	});

	it('should use default min and max values when not provided', async () => {
		const questionWithoutMinMax = { ...q };
		delete questionWithoutMinMax.min;
		delete questionWithoutMinMax.max;

		render(Rating, { question: questionWithoutMinMax });

		// Should default to min: 0, max: 10
		expect(page.getByText('0', { exact: true })).toBeInTheDocument();
	});

	it('should render plus and minus buttons for value adjustment', async () => {
		render(Rating, { question: q });

		const minusButton = page.getByRole('button', { name: /restar 1/i });
		const plusButton = page.getByRole('button', { name: /sumar 1/i });

		expect(minusButton).toBeInTheDocument();
		expect(plusButton).toBeInTheDocument();
	});

	it('should increment value when plus button is clicked', async () => {
		const props = $state({ question: q, onupdate: vi.fn() });
		render(Rating, props);

		const plusButton = page.getByRole('button', { name: /sumar 1/i });

		// Initial value should be 0
		expect(page.getByText('0', { exact: true })).toBeInTheDocument();

		await plusButton.click();

		// Value should increment to 1
		expect(page.getByText('1', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenCalledWith(1, undefined);
	});

	it('should decrement value when minus button is clicked', async () => {
		const props = $state({ question: { ...q, answer: 5 }, onupdate: vi.fn() });
		render(Rating, props);

		const minusButton = page.getByRole('button', { name: /restar 1/i });

		// Initial value should be 5
		expect(page.getByText('5', { exact: true })).toBeInTheDocument();

		await minusButton.click();

		// Value should decrement to 4
		expect(page.getByText('4', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenCalledWith(4, undefined);
	});

	it('should disable minus button when value is at minimum', async () => {
		render(Rating, { question: q });

		const minusButton = page.getByRole('button', { name: /restar 1/i });

		// At min value (0), minus button should be disabled
		expect(minusButton.element()).toBeDisabled();
	});

	it('should disable plus button when value is at maximum', async () => {
		const props = $state({ question: { ...q, answer: 10 } });
		render(Rating, props);

		const plusButton = page.getByRole('button', { name: /sumar 1/i });

		// At max value (10), plus button should be disabled
		expect(plusButton.element()).toBeDisabled();
	});

	it('should validate required questions and update isValid prop based on answer', async () => {
		const props = $state({ question: q, isValid: false });

		render(Rating, props);

		// Required question should be valid since it has a default value (min)
		expect(props.isValid).toBe(true);
	});

	it('should always mark non-required questions as valid regardless of value', async () => {
		const nonRequired = { ...q, required: false };
		const props = $state({ question: nonRequired, isValid: false });

		render(Rating, props);

		// Non-required question should be valid
		expect(props.isValid).toBe(true);
	});

	it('should trigger onupdate callback when value changes via buttons', async () => {
		const props = $state({ question: q, onupdate: vi.fn() });

		render(Rating, props);

		const plusButton = page.getByRole('button', { name: /sumar 1/i });

		// onupdate should be called on initialization
		expect(props.onupdate).toHaveBeenCalledWith(0, undefined);

		// onupdate should be called when value changes
		await plusButton.click();
		expect(props.onupdate).toHaveBeenCalledWith(1, undefined);

		await plusButton.click();
		expect(props.onupdate).toHaveBeenCalledWith(2, undefined);
	});

	it('should calculate and return score when weight and scores are provided', async () => {
		const questionWithScores: RatingQuestion = {
			...q,
			weight: 2,
			scores: [
				{ value: 0, score: 0 },
				{ value: 1, score: 10 },
				{ value: 2, score: 20 },
			],
		};

		const props = $state({ question: questionWithScores, onupdate: vi.fn() });
		render(Rating, props);

		const plusButton = page.getByRole('button', { name: /sumar 1/i });

		// Initial call with value 0, score should be 0 * 2 = 0
		expect(props.onupdate).toHaveBeenCalledWith(0, 0);

		await plusButton.click();
		// Value 1, score should be 10 * 2 = 20
		expect(props.onupdate).toHaveBeenCalledWith(1, 20);

		await plusButton.click();
		// Value 2, score should be 20 * 2 = 40
		expect(props.onupdate).toHaveBeenCalledWith(2, 40);
	});

	it('should handle custom min and max values correctly', async () => {
		const customRange: RatingQuestion = {
			...q,
			min: 5,
			max: 15,
			answer: 8,
		};

		const props = $state({ question: customRange, onupdate: vi.fn() });
		render(Rating, props);

		expect(page.getByText('8', { exact: true })).toBeInTheDocument();

		const minusButton = page.getByRole('button', { name: /restar 1/i });
		const plusButton = page.getByRole('button', { name: /sumar 1/i });

		// Should be able to decrement from 8
		expect(minusButton.element()).not.toBeDisabled();
		// Should be able to increment from 8
		expect(plusButton.element()).not.toBeDisabled();
	});

	it('should render slider component for value selection', async () => {
		render(Rating, { question: q });

		// Slider should be present (checking for slider role or input type range)
		const slider = page.getByRole('slider');
		expect(slider).toBeInTheDocument();
	});

	it('should handle missing scores gracefully when weight is provided', async () => {
		const questionWithWeightOnly: RatingQuestion = {
			...q,
			weight: 2,
			// No scores array provided
		};

		const props = $state({ question: questionWithWeightOnly, onupdate: vi.fn() });
		render(Rating, props);

		// Should not throw error and should call onupdate with undefined score
		expect(props.onupdate).toHaveBeenCalledWith(0, undefined);
	});

	it.each([
		{ min: 1, max: 5, expected: 1 },
		{ min: -5, max: 5, expected: -5 },
		{ min: 10, max: 20, expected: 10 },
	])(
		'should initialize with min value $expected when min is $min and max is $max',
		async ({ min, max, expected }) => {
			const customQuestion: RatingQuestion = {
				...q,
				min,
				max,
			};

			render(Rating, { question: customQuestion });
			expect(page.getByText(expected.toString(), { exact: true })).toBeInTheDocument();
		}
	);

	it('should handle complete flow from min to max and back with proper button states and callbacks', async () => {
		const flowQuestion: RatingQuestion = {
			...q,
			min: 10,
			max: 15,
		};

		const props = $state({ question: flowQuestion, onupdate: vi.fn() });
		render(Rating, props);

		const minusButton = page.getByRole('button', { name: /restar 1/i });
		const plusButton = page.getByRole('button', { name: /sumar 1/i });

		// Should start at min value (10)
		expect(page.getByText('10', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenCalledWith(10, undefined);

		// Minus button should be disabled at min
		expect(minusButton.element()).toBeDisabled();
		expect(plusButton.element()).not.toBeDisabled();

		// Click plus repeatedly until max (15)
		let expectedCallCount = 1; // Initial call

		// 10 -> 11
		await plusButton.click();
		expectedCallCount++;
		expect(page.getByText('11', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenNthCalledWith(expectedCallCount, 11, undefined);
		expect(minusButton.element()).not.toBeDisabled();
		expect(plusButton.element()).not.toBeDisabled();

		// 11 -> 12
		await plusButton.click();
		expectedCallCount++;
		expect(page.getByText('12', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenNthCalledWith(expectedCallCount, 12, undefined);
		expect(minusButton.element()).not.toBeDisabled();
		expect(plusButton.element()).not.toBeDisabled();

		// 12 -> 13
		await plusButton.click();
		expectedCallCount++;
		expect(page.getByText('13', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenNthCalledWith(expectedCallCount, 13, undefined);
		expect(minusButton.element()).not.toBeDisabled();
		expect(plusButton.element()).not.toBeDisabled();

		// 13 -> 14
		await plusButton.click();
		expectedCallCount++;
		expect(page.getByText('14', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenNthCalledWith(expectedCallCount, 14, undefined);
		expect(minusButton.element()).not.toBeDisabled();
		expect(plusButton.element()).not.toBeDisabled();

		// 14 -> 15 (max)
		await plusButton.click();
		expectedCallCount++;
		expect(page.getByText('15', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenNthCalledWith(expectedCallCount, 15, undefined);
		expect(minusButton.element()).not.toBeDisabled();
		expect(plusButton.element()).toBeDisabled(); // Plus should be disabled at max

		// Now click minus repeatedly back to min (10)

		// 15 -> 14
		await minusButton.click();
		expectedCallCount++;
		expect(page.getByText('14', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenNthCalledWith(expectedCallCount, 14, undefined);
		expect(minusButton.element()).not.toBeDisabled();
		expect(plusButton.element()).not.toBeDisabled();

		// 14 -> 13
		await minusButton.click();
		expectedCallCount++;
		expect(page.getByText('13', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenNthCalledWith(expectedCallCount, 13, undefined);
		expect(minusButton.element()).not.toBeDisabled();
		expect(plusButton.element()).not.toBeDisabled();

		// 13 -> 12
		await minusButton.click();
		expectedCallCount++;
		expect(page.getByText('12', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenNthCalledWith(expectedCallCount, 12, undefined);
		expect(minusButton.element()).not.toBeDisabled();
		expect(plusButton.element()).not.toBeDisabled();

		// 12 -> 11
		await minusButton.click();
		expectedCallCount++;
		expect(page.getByText('11', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenNthCalledWith(expectedCallCount, 11, undefined);
		expect(minusButton.element()).not.toBeDisabled();
		expect(plusButton.element()).not.toBeDisabled();

		// 11 -> 10 (min)
		await minusButton.click();
		expectedCallCount++;
		expect(page.getByText('10', { exact: true })).toBeInTheDocument();
		expect(props.onupdate).toHaveBeenNthCalledWith(expectedCallCount, 10, undefined);
		expect(minusButton.element()).toBeDisabled(); // Minus should be disabled at min
		expect(plusButton.element()).not.toBeDisabled();

		// Verify total number of onupdate calls (1 initial + 10 button clicks)
		expect(props.onupdate).toHaveBeenCalledTimes(11);
	});
});
