<script lang="ts">
	import type { GridApiQuestion } from '$lib/types';

	import GridApi from '$lib/components/survey/question/GridApi.svelte';
	import { Button } from '$lib/components/ui/button';

	let interactiveAnswer = $state<Record<string, string>>({});
	let isValid = $state(true);

	// Sample grid API questions for demos
	const basic: GridApiQuestion = {
		id: 'ques_basic_grid_api',
		type: 'grid-api',
		title: 'Basic Grid API Question - Location Selection',
		control: 'select',
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

	const comboboxExample: GridApiQuestion = {
		id: 'ques_combobox_grid_api',
		type: 'grid-api',
		title: 'Grid API with Combobox Controls',
		control: 'combobox',
		items: [
			{
				id: 'provincia',
				label: 'Province (Searchable)',
				control: 'combobox',
				required: true,
				idField: 'id',
				descriptionField: 'nombre',
				endpoint: '/api/provincias',
			},
			{
				id: 'departamento',
				label: 'Department (Searchable)',
				control: 'combobox',
				required: true,
				idField: 'id',
				descriptionField: 'nombre',
				endpoint: '/api/provincias/{provincia}/departamentos',
			},
		],
	};

	const mixedControls: GridApiQuestion = {
		id: 'ques_mixed_controls_api',
		type: 'grid-api',
		title: 'Mixed Controls - Select and Combobox',
		items: [
			{
				id: 'provincia',
				label: 'Province (Select)',
				control: 'select',
				required: true,
				idField: 'id',
				descriptionField: 'nombre',
				endpoint: '/api/provincias',
			},
			{
				id: 'departamento',
				label: 'Department (Combobox)',
				control: 'combobox',
				required: false,
				idField: 'id',
				descriptionField: 'nombre',
				endpoint: '/api/provincias/{provincia}/departamentos',
			},
		],
	};

	function handleUpdate(answer: Record<string, string>) {
		interactiveAnswer = answer;
		console.log('Answer updated:', answer);
	}

	function resetDemo() {
		interactiveAnswer = {};
		isValid = true;
	}
</script>

<div class="container mx-auto max-w-4xl p-8">
	<h1 class="mb-8 text-2xl font-bold">Grid API Question Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Demo</h2>
			<GridApi bind:isValid question={basic} onupdate={handleUpdate} />

			<div class="mt-4 flex gap-2">
				<Button variant="outline" onclick={resetDemo}>Reset</Button>
			</div>

			<div class="mt-4 space-y-2 text-sm text-muted-foreground">
				<p>Current answer: {JSON.stringify(interactiveAnswer, null, 2)}</p>
				<p>Is valid: {isValid ? '✅ Yes' : '❌ No'}</p>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Component Variations</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Basic Location Selection (Select Controls)</h3>
				<GridApi question={basic} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Searchable Combobox Controls</h3>
				<GridApi question={comboboxExample} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Mixed Controls (Select + Combobox)</h3>
				<GridApi question={mixedControls} />
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Pre-filled Examples</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Grid with Pre-filled Values</h3>
				<GridApi
					question={{
						...basic,
						answer: {
							provincia: 'tucuman',
							departamento: 'capital',
							localidad: 'san-miguel-de-tucuman',
						},
						title: 'Location Selection (pre-filled)',
					}}
				/>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">Partial Pre-filled Values</h3>
				<GridApi
					question={{
						...comboboxExample,
						answer: {
							provincia: 'buenos-aires',
							departamento: '',
						},
						title: 'Combobox Selection (partially pre-filled)',
					}}
				/>
			</div>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">API Information</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-4 font-medium">How GridApi Works</h3>
				<div class="space-y-2 text-sm text-muted-foreground">
					<p>
						<strong>Dynamic Loading:</strong> Options are loaded from API endpoints based on parent selections.
					</p>
					<p>
						<strong>Dependency Chain:</strong> Each field can depend on previous selections using
						template variables like
						<code class="rounded bg-muted px-1">{`{provincia}`}</code>.
					</p>
					<p>
						<strong>Endpoints Used:</strong>
					</p>
					<ul class="ml-4 list-disc space-y-1">
						<li>
							<code class="rounded bg-muted px-1">/api/provincias</code> - Returns list of provinces
						</li>
						<li>
							<code class="rounded bg-muted px-1"
								>/api/provincias/{`{provincia}`}/departamentos</code
							> - Returns departments for selected province
						</li>
						<li>
							<code class="rounded bg-muted px-1"
								>/api/provincias/{`{provincia}`}/departamentos/{`{departamento}`}/localidades</code
							> - Returns localities for selected department
						</li>
					</ul>
					<p>
						<strong>Response Format:</strong> Each endpoint returns an array of objects with
						<code class="rounded bg-muted px-1">id</code> and
						<code class="rounded bg-muted px-1">nombre</code> fields.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
