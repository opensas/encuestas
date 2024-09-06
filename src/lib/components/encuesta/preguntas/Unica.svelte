<script lang="ts">
	import type { Opcion, PreguntaUnica } from '$lib/types';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Radio from '$lib/components/ui/radio-group';

	export let pregunta: PreguntaUnica;
	export let onupdate: (respuesta: string) => void = () => {};

	let opciones: Opcion[];
	let checked: string;

	const OTHER_VALUE = '__OTHER__';
	let other = '';

	// init checked from respuesta
	function initState() {
		checked = pregunta.respuesta || '';
		opciones = pregunta.opciones.map((op) => (typeof op === 'object' ? op : { titulo: op }));

		// check is it's an other option
		const respuesta = pregunta.respuesta || '';
		if (!respuesta) {
			checked = '';
		} else if (opciones.find((opcion) => opcion.titulo === respuesta)) {
			checked = respuesta;
		} else {
			checked = OTHER_VALUE;
			other = respuesta;
		}
	}

	initState();

	$: respuesta = checked === OTHER_VALUE ? other : checked;
	$: onupdate(respuesta);
</script>

<Radio.Root bind:value={checked} class="gap-0 space-y-4">
	<div
		class="gap-x-2 space-y-4"
		class:lg:columns-3={opciones.length >= 12}
		class:md:columns-2={opciones.length >= 8}
	>
		{#each opciones as { titulo, descripcion }, index}
			{@const id = `opcion_${index}`}
			<div class="flex items-center space-x-3">
				<!-- mt-1 compensates for the leading-snug, to have both aligned to the top -->
				<Radio.Item {id} value={titulo} class="mt-1 self-start" />
				<Label class="flex flex-col space-y-1 leading-snug" for={id}>
					<div>{titulo}</div>
					{#if descripcion}
						<div class="text-xs font-normal text-muted-foreground">{descripcion}</div>
					{/if}
				</Label>
			</div>
		{/each}
	</div>

	{#if pregunta.acepta_otros}
		<div class="flex items-center space-x-3">
			<Radio.Item id="option-other" value={OTHER_VALUE} class="--self-start" />
			<div class="w-full space-y-1">
				<Input bind:value={other} placeholder="Otra opción" />
			</div>
		</div>
	{/if}
</Radio.Root>
