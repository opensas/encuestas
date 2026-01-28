import type { Survey } from '$lib/types';

import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';

import { surveyTestUI, surveyWithConditionalJumps } from '../samples/ui-test';
import SurveyComponent from '../Survey.svelte';

describe('Survey.svelte component', () => {
	it('should render survey correctly without intro', async () => {
		const props = $state({ survey: surveyTestUI });

		render(SurveyComponent, props);

		// Check that survey title and description are rendered
		expect(page.getByRole('heading', { name: 'Test Survey' })).toBeInTheDocument();
		expect(page.getByText('A test survey with two text questions')).toBeInTheDocument();

		// Check that first question is rendered
		expect(page.getByText('Q1. First Question')).toBeInTheDocument();
		expect(page.getByPlaceholder('Enter your first answer')).toBeInTheDocument();

		// Check that no intro is shown (survey should start directly)
		const comenzarButtons = page.getByRole('button', { name: 'Comenzar' }).all();
		expect(comenzarButtons).toHaveLength(0);
	});

	it('should not show previous button on first question', async () => {
		const props = $state({ survey: surveyTestUI });

		render(SurveyComponent, props);

		// Previous button should be invisible on first question
		const prevButton = page.getByRole('button', { name: 'Anterior' });
		expect(prevButton.element()).toHaveClass('invisible');
	});

	it('should show next button on first question', async () => {
		const props = $state({ survey: surveyTestUI });

		render(SurveyComponent, props);

		// Next button should be present
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		expect(nextButton).toBeInTheDocument();
		expect(nextButton.element()).not.toHaveClass('invisible');
	});

	it('should navigate to next question when clicking next with valid answer', async () => {
		const props = $state({ survey: surveyTestUI, onskip: vi.fn() });

		render(SurveyComponent, props);

		// Fill in the first question
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('First answer');

		// Click next button
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		// Should now be on second question
		expect(page.getByText('Q2. Second Question')).toBeInTheDocument();
		expect(page.getByPlaceholder('Enter your second answer')).toBeInTheDocument();

		// First question should no longer be visible
		const firstQuestions = page.getByText('Q1. First Question').all();
		expect(firstQuestions).toHaveLength(0);
		const firstInputs = page.getByPlaceholder('Enter your first answer').all();
		expect(firstInputs).toHaveLength(0);

		// onskip should be called with correct survey state when navigating forward
		expect(props.onskip).toHaveBeenCalledWith({
			status: 'en proceso',
			current: 'ques_second',
			score: 0,
			answers: [{ id: 'ques_first', code: 'Q1', answer: 'First answer' }],
		});
	});

	it('should call onskip callback when navigating between questions', async () => {
		const props = $state({ survey: surveyTestUI, onskip: vi.fn() });

		render(SurveyComponent, props);

		// Fill in the first question
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('First answer');

		// Click next button
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		// onskip should be called with survey state
		expect(props.onskip).toHaveBeenCalledWith({
			status: 'en proceso',
			current: 'ques_second',
			score: 0,
			answers: [{ id: 'ques_first', code: 'Q1', answer: 'First answer' }],
		});
	});

	it('should show previous button on second question', async () => {
		const props = $state({ survey: surveyTestUI });

		render(SurveyComponent, props);

		// Navigate to second question
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('First answer');
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		// Previous button should now be visible
		const prevButton = page.getByRole('button', { name: 'Anterior' });
		expect(prevButton.element()).not.toHaveClass('invisible');
	});

	it('should navigate back to previous question when clicking previous', async () => {
		const props = $state({ survey: surveyTestUI, onskip: vi.fn() });

		render(SurveyComponent, props);

		// Navigate to second question
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('First answer');
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		// Clear the mock to focus on the previous navigation call
		props.onskip.mockClear();

		// Click previous button
		const prevButton = page.getByRole('button', { name: 'Anterior' });
		await prevButton.click();

		// Should be back on first question
		expect(page.getByText('Q1. First Question')).toBeInTheDocument();
		expect(page.getByPlaceholder('Enter your first answer')).toBeInTheDocument();

		// The input should still have the previous value
		const firstInputAgain = page.getByPlaceholder('Enter your first answer');
		expect((firstInputAgain.element() as HTMLInputElement).value).toBe('First answer');

		// Second question should no longer be visible
		const secondQuestions = page.getByText('Q2. Second Question').all();
		expect(secondQuestions).toHaveLength(0);

		// onskip should be called with correct survey state when navigating backward
		expect(props.onskip).toHaveBeenCalledWith({
			status: 'en proceso',
			current: 'ques_first',
			score: 0,
			answers: [{ id: 'ques_first', code: 'Q1', answer: 'First answer' }],
		});
	});

	it('should update text value in first question', async () => {
		const props = $state({ survey: surveyTestUI });

		render(SurveyComponent, props);

		// Fill in the first question
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('Updated first answer');

		// Check that the value was updated
		expect((firstInput.element() as HTMLInputElement).value).toBe('Updated first answer');
	});

	it('should navigate to next question again after updating first question', async () => {
		const props = $state({ survey: surveyTestUI });

		render(SurveyComponent, props);

		// Fill in the first question
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('Updated first answer');

		// Click next button
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		// Should be on second question
		expect(page.getByText('Q2. Second Question')).toBeInTheDocument();
		expect(page.getByPlaceholder('Enter your second answer')).toBeInTheDocument();
	});

	it('should show Finalizar button instead of next on last question', async () => {
		const props = $state({ survey: surveyTestUI });

		render(SurveyComponent, props);

		// Navigate to second (last) question
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('First answer');
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		// Should show Finalizar button instead of Siguiente
		expect(page.getByRole('button', { name: 'Finalizar' })).toBeInTheDocument();
		const siguienteButtons = page.getByRole('button', { name: 'Siguiente' }).all();
		expect(siguienteButtons).toHaveLength(0);
	});

	it('should fill text box in second question', async () => {
		const props = $state({ survey: surveyTestUI });

		render(SurveyComponent, props);

		// Navigate to second question
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('First answer');
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		// Fill in the second question (textarea)
		const secondInput = page.getByPlaceholder('Enter your second answer');
		await secondInput.fill('Second answer in textarea');

		// Check that the value was updated
		expect((secondInput.element() as HTMLTextAreaElement).value).toBe('Second answer in textarea');
	});

	it('should display ending panel when clicking Finalizar and call callbacks with correct values', async () => {
		const props = $state({ survey: surveyTestUI, onsave: vi.fn(), onclose: vi.fn() });

		render(SurveyComponent, props);

		// Navigate through the survey
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('First answer');
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		// Fill second question
		const secondInput = page.getByPlaceholder('Enter your second answer');
		await secondInput.fill('Second answer');

		// Click Finalizar
		const finalizarButton = page.getByRole('button', { name: 'Finalizar' });
		await finalizarButton.click();

		// Should show ending panel with default outro message
		expect(page.getByText('Muchas gracias por tu participación')).toBeInTheDocument();
		expect(page.getByRole('button', { name: 'Grabar respuesta' })).toBeInTheDocument();

		// Questions should no longer be visible
		const firstQuestions = page.getByText('Q1. First Question').all();
		expect(firstQuestions).toHaveLength(0);
		const secondQuestions = page.getByText('Q2. Second Question').all();
		expect(secondQuestions).toHaveLength(0);

		// Click save button
		const saveButton = page.getByRole('button', { name: 'Grabar respuesta' });
		await saveButton.click();

		// onsave should be called with correct survey state
		expect(props.onsave).toHaveBeenCalledWith(
			expect.objectContaining({
				status: 'finalizado',
				answers: expect.arrayContaining([
					expect.objectContaining({
						id: 'ques_first',
						code: 'Q1',
						answer: 'First answer',
					}),
					expect.objectContaining({
						id: 'ques_second',
						code: 'Q2',
						answer: 'Second answer',
					}),
				]),
			})
		);

		// After saving, should show OK button
		expect(page.getByRole('button', { name: 'Ok' })).toBeInTheDocument();
		const saveButtons = page.getByRole('button', { name: 'Grabar respuesta' }).all();
		expect(saveButtons).toHaveLength(0);

		// Click OK button
		const okButton = page.getByRole('button', { name: 'Ok' });
		await okButton.click();

		// onclose should be called with correct survey state
		expect(props.onclose).toHaveBeenCalledWith(
			expect.objectContaining({
				status: 'finalizado',
				answers: expect.arrayContaining([
					expect.objectContaining({
						id: 'ques_first',
						code: 'Q1',
						answer: 'First answer',
					}),
					expect.objectContaining({
						id: 'ques_second',
						code: 'Q2',
						answer: 'Second answer',
					}),
				]),
			})
		);
	});

	it('should show validation error when trying to proceed with empty required field', async () => {
		const props = $state({ survey: surveyTestUI });

		render(SurveyComponent, props);

		// Try to click next without filling the required field
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		// Should show validation error
		expect(page.getByText('Debe completar esta pregunta')).toBeInTheDocument();

		// Should still be on first question
		expect(page.getByText('Q1. First Question')).toBeInTheDocument();
		const secondQuestions = page.getByText('Q2. Second Question').all();
		expect(secondQuestions).toHaveLength(0);
	});

	it('should handle survey with custom outro message', async () => {
		const surveyWithOutro: Survey = {
			...surveyTestUI,
			outro: 'Custom ending message for this survey',
		};

		const props = $state({
			survey: surveyWithOutro,
			onsave: vi.fn(),
			onclose: vi.fn(),
			onskip: vi.fn(),
		});

		render(SurveyComponent, props);

		// Complete the survey
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('First answer');
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		const secondInput = page.getByPlaceholder('Enter your second answer');
		await secondInput.fill('Second answer');
		const finalizarButton = page.getByRole('button', { name: 'Finalizar' });
		await finalizarButton.click();

		// Should show custom outro message
		expect(page.getByText('Custom ending message for this survey')).toBeInTheDocument();
	});

	it('should handle survey with progress bar', async () => {
		const props = $state({ survey: { ...surveyTestUI, progressBar: true } });

		render(SurveyComponent, props);

		// Should show progress bar on first question
		expect(page.getByText('1 / 2')).toBeInTheDocument();
		expect(page.getByText('50% completado')).toBeInTheDocument();

		// Navigate to second question
		const firstInput = page.getByPlaceholder('Enter your first answer');
		await firstInput.fill('First answer');
		const nextButton = page.getByRole('button', { name: 'Siguiente' });
		await nextButton.click();

		// Progress should update
		expect(page.getByText('2 / 2')).toBeInTheDocument();
		expect(page.getByText('100% completado')).toBeInTheDocument();
	});
});

describe('Survey.svelte component with conditional next', () => {
	it('should correctly jump to next question depending on the answer provided', async () => {
		const props = $state({ survey: surveyWithConditionalJumps, onsave: vi.fn(), onclose: vi.fn() });

		render(SurveyComponent, props);

		// Navigate through the survey
		const input1 = page.getByPlaceholder('Enter your first answer');
		await expect.element(input1).toHaveDisplayValue('');
		await input1.fill('First answer');
		await expect.element(input1).toHaveDisplayValue('First answer');
		await page.getByRole('button', { name: 'Siguiente' }).click();

		// Fill second question
		const input2 = page.getByPlaceholder('Enter your second answer');
		await input2.fill('Second answer');
		await page.getByRole('button', { name: 'Siguiente' }).click();

		// option: Move on (implicit next), should go to fourth question
		expect(page.getByText('Third Question')).toBeInTheDocument();
		await page.getByRole('button', { name: 'Siguiente' }).click();

		expect(page.getByText('Fourth Question')).toBeInTheDocument();
		await page.getByRole('button', { name: 'Anterior' }).click();

		// option: Go to first question, should go to first question
		expect(page.getByText('Third Question')).toBeInTheDocument();
		await page.getByLabelText('Go to first question').click();
		await page.getByRole('button', { name: 'Siguiente' }).click();

		expect(page.getByText('First Question')).toBeInTheDocument();
		await expect.element(input1).toHaveDisplayValue('First answer');
		await page.getByRole('button', { name: 'Siguiente' }).click();

		expect(page.getByText('Second Question')).toBeInTheDocument();
		await expect.element(input2).toHaveDisplayValue('Second answer');
		await page.getByRole('button', { name: 'Siguiente' }).click();

		// option: Go to second question, should go to second question
		expect(page.getByText('Third Question')).toBeInTheDocument();
		await page.getByLabelText('Go to second question').click();
		await page.getByRole('button', { name: 'Siguiente' }).click();

		expect(page.getByText('Second Question')).toBeInTheDocument();
		await expect.element(input2).toHaveDisplayValue('Second answer');
		await page.getByRole('button', { name: 'Siguiente' }).click();

		// option: Go to fourth question, should go to fourth question
		expect(page.getByText('Third Question')).toBeInTheDocument();
		await page.getByLabelText('Go to fourth question (explicit next)').click();
		await page.getByRole('button', { name: 'Siguiente' }).click();

		expect(page.getByText('Fourth Question')).toBeInTheDocument();
		const input4 = page.getByPlaceholder('Enter your fourth answer');
		await expect.element(input4).toHaveDisplayValue('');
		await input4.fill('Fourth answer');
		await expect.element(input4).toHaveDisplayValue('Fourth answer');
		await page.getByRole('button', { name: 'Siguiente' }).click();
		await page.getByRole('button', { name: 'Anterior' }).click();
		await page.getByRole('button', { name: 'Anterior' }).click();

		// option: Go to last question, should go to fourth question
		expect(page.getByText('Third Question')).toBeInTheDocument();
		await page.getByLabelText('Go to last question (jump forward)').click();
		await page.getByRole('button', { name: 'Siguiente' }).click();

		expect(page.getByText('Last Question')).toBeInTheDocument();
		const input5 = page.getByPlaceholder('Enter your last answer');
		await expect.element(input5).toHaveDisplayValue('');
		await input5.fill('Fifth answer');
		await expect.element(input5).toHaveDisplayValue('Fifth answer');

		// await page.getByRole('button', { name: 'Anterior' }).click();
		const finalizarButton = page.getByRole('button', { name: 'Finalizar' });
		await finalizarButton.click();

		expect(page.getByText('Muchas gracias por tu participación')).toBeInTheDocument();

		const grabarButton = page.getByRole('button', { name: 'Grabar respuesta' });
		expect(grabarButton).toBeInTheDocument();
		await grabarButton.click();

		// onsave should be called with correct survey state
		expect(props.onsave).toHaveBeenCalledWith(
			expect.objectContaining({
				status: 'finalizado',
				answers: expect.arrayContaining([
					expect.objectContaining({
						id: 'ques_first',
						code: 'Q1',
						answer: 'First answer',
					}),
					expect.objectContaining({
						id: 'ques_second',
						code: 'Q2',
						answer: 'Second answer',
					}),
					expect.objectContaining({
						id: 'ques_third',
						code: 'Q3',
						answer: 'Go to last question (jump forward)',
					}),
					expect.objectContaining({
						id: 'ques_fourth',
						code: 'Q4',
						answer: 'Fourth answer',
					}),
				]),
			})
		);

		return;
	});
});
