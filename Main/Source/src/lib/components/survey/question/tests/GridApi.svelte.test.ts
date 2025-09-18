import type { GridApiQuestion } from '$lib/types';

import { page } from '@vitest/browser/context';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import GridApi from '../GridApi.svelte';

const mockData = {
	['/api/provincias']: [
		{ id: 'buenos-aires', nombre: 'Buenos Aires' },
		{ id: 'cordoba', nombre: 'Córdoba' },
	],
	// buenos aires
	['/api/provincias/buenos-aires/departamentos']: [
		{ id: '25-de-mayo', nombre: '25 DE MAYO' },
		{ id: '9-de-julio', nombre: '9 DE JULIO' },
	],
	['/api/provincias/buenos-aires/departamentos/25-de-mayo/localidades']: [
		{ id: 'pedernales', nombre: 'PEDERNALES' },
		{ id: 'del-valle', nombre: 'DEL VALLE' },
		{ id: 'san-enrique', nombre: 'SAN ENRIQUE' },
	],
	['/api/provincias/buenos-aires/departamentos/9-de-julio/localidades']: [
		{ id: '12-de-octubre', nombre: '12 DE OCTUBRE' },
		{ id: 'la-aurora', nombre: 'LA AURORA' },
		{ id: 'patricios', nombre: 'PATRICIOS' },
	],
	// cordoba
	['/api/provincias/cordoba/departamentos']: [
		{ id: 'general-roca', nombre: 'GENERAL ROCA' },
		{ id: 'colon', nombre: 'COLÓN' },
	],
	['/api/provincias/cordoba/departamentos/general-roca/localidades']: [
		{ id: 'del-campillo', nombre: 'DEL CAMPILLO' },
		{ id: 'ranqueles', nombre: 'RANQUELES' },
		{ id: 'villa-sarmiento', nombre: 'VILLA SARMIENTO' },
	],
	['/api/provincias/cordoba/departamentos/colon/localidades']: [
		{ id: '1-de-agosto', nombre: '1 DE AGOSTO' },
		{ id: 'agua-de-oro', nombre: 'AGUA DE ORO' },
		{ id: 'almirante-brown', nombre: 'ALMIRANTE BROWN' },
	],
};

// Sample grid API question for tests
const q: GridApiQuestion = {
	id: 'ques_basic_grid_api',
	type: 'grid-api',
	title: 'Basic Grid API Question',
	items: [
		{
			id: 'provincia',
			label: 'Province',
			control: 'select',
			required: true,
			idField: 'id',
			descriptionField: 'nombre',
			endpoint: '/api/provincias',
		},
		{
			id: 'departamento',
			label: 'Department',
			required: false,
			idField: 'id',
			descriptionField: 'nombre',
			endpoint: '/api/provincias/{provincia}/departamentos',
		},
		{
			id: 'localidad',
			label: 'Locality',
			required: false,
			idField: 'id',
			descriptionField: 'nombre',
			endpoint: '/api/provincias/{provincia}/departamentos/{departamento}/localidades',
		},
	],
};

async function mockApi(url: string) {
	const data = mockData[url as keyof typeof mockData];
	if (!data) throw new Error('Unknown URL');
	return { json: async () => data };
}

describe('GridApi question component', () => {
	// Mock fetch before each test
	beforeEach(() => {
		globalThis.fetch = vi.fn().mockImplementation(mockApi);
	});

	it('should render all field labels correctly', async () => {
		render(GridApi, { question: q });

		// Wait for component to render
		await vi.waitFor(() => {
			expect(page.getByText('Province')).toBeInTheDocument();
			expect(page.getByText('Department')).toBeInTheDocument();
			expect(page.getByText('Locality')).toBeInTheDocument();
		});
	});

	it('should call API for initial data load', async () => {
		render(GridApi, { question: q });

		// Wait for initial API call
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias');
		});
	});

	it('should show required asterisk for required fields', async () => {
		render(GridApi, { question: q });

		// Wait for component to render
		await vi.waitFor(() => {
			expect(page.getByText('Province')).toBeInTheDocument();
		});

		// Required field should have asterisk
		const provinciaLabel = page.getByText('Province');
		expect(provinciaLabel.element().parentElement?.textContent).toContain('*');

		// Non-required fields should not have asterisk in their own label
		const departamentoLabel = page.getByText('Department');
		expect(departamentoLabel.element().textContent).not.toContain('*');
	});

	it('should initialize with provided answer values', async () => {
		const props = $state({
			question: {
				...q,
				answer: { provincia: 'tucuman', departamento: 'monteros' },
			},
			onupdate: vi.fn(),
		});
		render(GridApi, props);

		// Should call fetch for all dependent fields based on initial values
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias');
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias/tucuman/departamentos');
			expect(globalThis.fetch).toHaveBeenCalledWith(
				'/api/provincias/tucuman/departamentos/monteros/localidades'
			);
		});
	});

	it('should validate required fields correctly', async () => {
		const props = $state({ question: q, isValid: true });
		render(GridApi, props);

		// Wait for initial load and validation
		await vi.waitFor(() => {
			// Initially invalid because required field is empty
			expect(props.isValid).toBe(false);
		});
	});

	it('should handle API errors gracefully', async () => {
		// Mock fetch to return HTTP error response
		globalThis.fetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 500,
			json: () => Promise.reject(new Error('Server Error')),
		});

		// Suppress console errors for this test
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		render(GridApi, { question: q });

		// Should not crash on API error and still render the component
		await vi.waitFor(() => {
			expect(page.getByText('Province')).toBeInTheDocument();
		});

		consoleSpy.mockRestore();
	});

	it('should use custom idField and descriptionField', async () => {
		const customFieldQuestion: GridApiQuestion = {
			id: 'ques_custom_question',
			type: 'grid-api',
			title: 'Custom Field Question',
			items: [
				{
					id: 'custom',
					label: 'Custom Field',
					required: true,
					idField: 'code',
					descriptionField: 'title',
					endpoint: '/api/custom',
				},
			],
		};

		const customData = [
			{ code: 'item1', title: 'Item One' },
			{ code: 'item2', title: 'Item Two' },
		];

		globalThis.fetch = vi.fn().mockResolvedValue({
			json: () => Promise.resolve(customData),
		});

		render(GridApi, { question: customFieldQuestion });

		// Wait for API call
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/custom');
		});
	});

	it('should handle combobox control type', async () => {
		const comboboxQuestion: GridApiQuestion = {
			...q,
			control: 'combobox',
			items: [{ ...q.items[0], control: 'combobox' }],
		};

		render(GridApi, { question: comboboxQuestion });

		// Wait for initial load
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias');
		});

		// Component should render without errors
		expect(page.getByText('Province')).toBeInTheDocument();
	});

	it('should handle dependency chain through UI interactions', async () => {
		// Test the dependency chain by actually clicking through the UI
		const props = $state({ question: { ...q, answer: {} }, onupdate: vi.fn() });
		render(GridApi, props);

		// Wait for initial load
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias');
		});

		// Step 1: Select provincia through UI
		const provinciaSelect = page.getByRole('button').first();
		await provinciaSelect.click();

		await vi.waitFor(() => {
			const buenosAiresOption = page.getByText('Buenos Aires');
			expect(buenosAiresOption).toBeInTheDocument();
		});

		const buenosAiresOption = page.getByText('Buenos Aires');
		await buenosAiresOption.click();

		// Verify departamentos API call was made
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias/buenos-aires/departamentos');
		});

		// Step 2: Select departamento through UI
		const departamentoSelect = page.getByRole('button').nth(1);
		await departamentoSelect.click();

		await vi.waitFor(() => {
			const mayoOption = page.getByText('25 DE MAYO');
			expect(mayoOption).toBeInTheDocument();
		});

		const mayoOption = page.getByText('25 DE MAYO');
		await mayoOption.click();

		// Verify localidades API call was made
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith(
				'/api/provincias/buenos-aires/departamentos/25-de-mayo/localidades'
			);
		});

		// Verify the complete chain worked - should have made 3 API calls total
		expect(globalThis.fetch).toHaveBeenCalledTimes(3);
		expect(globalThis.fetch).toHaveBeenNthCalledWith(1, '/api/provincias');
		expect(globalThis.fetch).toHaveBeenNthCalledWith(
			2,
			'/api/provincias/buenos-aires/departamentos'
		);
		expect(globalThis.fetch).toHaveBeenNthCalledWith(
			3,
			'/api/provincias/buenos-aires/departamentos/25-de-mayo/localidades'
		);
	});

	it('should verify dependency chain by checking API calls are made in sequence', async () => {
		// This is a simpler test that focuses on the API call sequence without UI interaction
		const props = $state({
			question: {
				...q,
				answer: { provincia: 'tucuman', departamento: 'monteros', localidad: '' },
			},
			onupdate: vi.fn(),
		});

		render(GridApi, props);

		// Should make all three API calls based on initial values
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias');
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias/tucuman/departamentos');
			expect(globalThis.fetch).toHaveBeenCalledWith(
				'/api/provincias/tucuman/departamentos/monteros/localidades'
			);
		});

		// Verify the dependency chain works with pre-filled values
		expect(globalThis.fetch).toHaveBeenCalledTimes(3);
	});

	it('should handle empty API responses', async () => {
		// Mock fetch to return empty array
		globalThis.fetch = vi.fn().mockResolvedValue({
			json: () => Promise.resolve([]),
		});

		render(GridApi, { question: q });

		// Wait for initial load
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias');
		});

		// Component should render without errors even with empty data
		expect(page.getByText('Province')).toBeInTheDocument();
	});

	it('should select a value and check that dependent values are correctly filtered', async () => {
		// Create reactive props using $state
		const props = $state({
			question: { ...q, answer: {} },
			onupdate: vi.fn(),
			isValid: true,
		});

		render(GridApi, props);

		// Wait for initial provincia options to load
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias');
		});

		// Check that the three available provincias are present
		const provinciaSelect = page.getByRole('button').first();
		await provinciaSelect.click();

		await vi.waitFor(() => {
			expect(page.getByText('Buenos Aires')).toBeInTheDocument();
			expect(page.getByText('Córdoba')).toBeInTheDocument();
		});

		// Test Buenos Aires flow
		const buenosAiresOption = page.getByText('Buenos Aires');
		await buenosAiresOption.click();

		// Verify that selecting provincia triggers departamento API call
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias/buenos-aires/departamentos');
		});

		// Check the combo has the two departamentos from Buenos Aires
		const departamentoSelect = page.getByRole('button').nth(1);
		await departamentoSelect.click();

		await vi.waitFor(() => {
			expect(page.getByText('25 DE MAYO')).toBeInTheDocument();
			expect(page.getByText('9 DE JULIO')).toBeInTheDocument();
		});

		// Select the first departamento (25 DE MAYO)
		const mayoOption = page.getByText('25 DE MAYO');
		await mayoOption.click();

		// Verify that selecting departamento triggers localidad API call
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith(
				'/api/provincias/buenos-aires/departamentos/25-de-mayo/localidades'
			);
		});

		// Check the combo has the three localidades for that departamento
		const localidadSelect = page.getByRole('button').nth(2);
		await localidadSelect.click();

		await vi.waitFor(() => {
			expect(page.getByText('PEDERNALES')).toBeInTheDocument();
			expect(page.getByText('DEL VALLE')).toBeInTheDocument();
			expect(page.getByText('SAN ENRIQUE')).toBeInTheDocument();
		});

		// Select one of the localidades to close the dropdown
		const pedernalesOption = page.getByText('PEDERNALES');
		await pedernalesOption.click();

		// Now select the second departamento (9 DE JULIO)
		await departamentoSelect.click();

		await vi.waitFor(() => {
			expect(page.getByText('9 DE JULIO')).toBeInTheDocument();
		});

		const julioOption = page.getByText('9 DE JULIO');
		await julioOption.click();

		// Verify that selecting the second departamento triggers localidad API call
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith(
				'/api/provincias/buenos-aires/departamentos/9-de-julio/localidades'
			);
		});

		// The localidades combo should change to reflect the localidades of 9 de julio departamento
		await localidadSelect.click();

		await vi.waitFor(() => {
			expect(page.getByText('12 DE OCTUBRE')).toBeInTheDocument();
			expect(page.getByText('LA AURORA')).toBeInTheDocument();
			expect(page.getByText('PATRICIOS')).toBeInTheDocument();
		});

		// Select one of the localidades to close the dropdown
		const octubreOption = page.getByText('12 DE OCTUBRE');
		await octubreOption.click();

		// Then change from Buenos Aires to Córdoba provincia
		await provinciaSelect.click();

		await vi.waitFor(() => {
			const cordobaOption = page.getByText('Córdoba');
			expect(cordobaOption).toBeInTheDocument();
		});

		const cordobaOption = page.getByText('Córdoba');
		await cordobaOption.click();

		// Verify that changing to Córdoba triggers departamento API call
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias/cordoba/departamentos');
		});

		// The departamentos combo should change to the departamentos of Córdoba provincia
		await departamentoSelect.click();

		await vi.waitFor(() => {
			expect(page.getByText('GENERAL ROCA')).toBeInTheDocument();
			expect(page.getByText('COLÓN')).toBeInTheDocument();
		});

		// The localidades combo should be blank and disabled
		expect(localidadSelect).toBeDisabled();

		// Choose the first departamento of Córdoba (GENERAL ROCA)
		const rocaOption = page.getByText('GENERAL ROCA');
		await rocaOption.click();

		// Verify that selecting Córdoba departamento triggers localidad API call
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith(
				'/api/provincias/cordoba/departamentos/general-roca/localidades'
			);
		});

		// Localidades combo should become enabled and filled with the localidades of the first departamento of Córdoba
		await vi.waitFor(() => {
			expect(localidadSelect).not.toBeDisabled();
		});

		await localidadSelect.click();

		await vi.waitFor(() => {
			expect(page.getByText('DEL CAMPILLO')).toBeInTheDocument();
			expect(page.getByText('RANQUELES')).toBeInTheDocument();
			expect(page.getByText('VILLA SARMIENTO')).toBeInTheDocument();
		});
	});

	it('should clear dependent fields when parent selection changes', async () => {
		// Start with pre-filled values
		const props = $state({
			question: {
				...q,
				answer: {
					provincia: 'tucuman',
					departamento: 'monteros',
					localidad: 'pueblo-independencia',
				},
			},
			onupdate: vi.fn(),
			isValid: true,
		});

		render(GridApi, props);

		// Wait for all initial API calls
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias');
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias/tucuman/departamentos');
			expect(globalThis.fetch).toHaveBeenCalledWith(
				'/api/provincias/tucuman/departamentos/monteros/localidades'
			);
		});

		// Clear the mock to track new calls
		vi.clearAllMocks();
		globalThis.fetch = vi.fn().mockImplementation(mockApi);

		// Change provincia selection - this should clear departamento and localidad
		const provinciaSelect = page.getByRole('button').first();
		await provinciaSelect.click();

		await vi.waitFor(() => {
			const cordobaOption = page.getByText('Córdoba');
			expect(cordobaOption).toBeInTheDocument();
		});

		const cordobaOption = page.getByText('Córdoba');
		await cordobaOption.click();

		// Verify that changing provincia clears dependent fields and triggers new API call
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias/cordoba/departamentos');
		});

		// Verify onupdate was called with cleared dependent values
		expect(props.onupdate).toHaveBeenCalledWith({
			provincia: 'cordoba',
			departamento: '',
			localidad: '',
		});
	});

	it('should disable dependent fields when parent is not selected', async () => {
		const props = $state({
			question: { ...q, answer: {} },
			onupdate: vi.fn(),
			isValid: true,
		});

		render(GridApi, props);

		// Wait for initial load
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias');
		});

		// Get all select buttons
		const selectButtons = page.getByRole('button');

		// Departamento and localidad selects should be disabled initially
		const departamentoSelect = selectButtons.nth(1);
		const localidadSelect = selectButtons.nth(2);

		expect(departamentoSelect).toBeDisabled();
		expect(localidadSelect).toBeDisabled();

		// Select a provincia
		const provinciaSelect = selectButtons.first();
		await provinciaSelect.click();

		await vi.waitFor(() => {
			const buenosAiresOption = page.getByText('Buenos Aires');
			expect(buenosAiresOption).toBeInTheDocument();
		});

		const buenosAiresOption = page.getByText('Buenos Aires');
		await buenosAiresOption.click();

		// Wait for departamento options to load
		await vi.waitFor(() => {
			expect(globalThis.fetch).toHaveBeenCalledWith('/api/provincias/buenos-aires/departamentos');
		});

		// Now departamento should be enabled, but localidad still disabled
		await vi.waitFor(() => {
			expect(departamentoSelect).not.toBeDisabled();
		});
		expect(localidadSelect).toBeDisabled();
	});
});
