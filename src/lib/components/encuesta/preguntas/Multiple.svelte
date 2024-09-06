<script lang="ts">
	import type { Opcion, PreguntaMultiple } from '$lib/types';

	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let pregunta: PreguntaMultiple;
	export let onupdate: (respuesta: string[]) => void = () => {};

	let opciones: Opcion[];
	let respuesta: string[];

	let checked: boolean[];
	let checkedOther: boolean;
	let other: string;

	// init checked from respuesta
	function initState() {
		respuesta = pregunta.respuesta || [];
		onupdate(respuesta);

		opciones = pregunta.opciones.map((op) => (typeof op === 'object' ? op : { titulo: op }));
		const titulos = opciones.map((opcion) => opcion.titulo);

		checked = titulos.map((titulo) => respuesta.includes(titulo));
		other = respuesta.find((r) => !titulos.includes(r)) || '';
		checkedOther = !!other;
	}

	function updateRespuesta(checked: boolean[], checkedOther: boolean, other: string) {
		respuesta = checked
			.map((check, index) => (check ? opciones[index].titulo : null))
			.filter((resp) => resp !== null); // remove unchecked items
		if (checkedOther && other) respuesta.push(other);
		onupdate(respuesta);
	}

	initState();

	$: updateRespuesta(checked, checkedOther, other);
</script>

<div class="space-y-4">
	<div
		class="gap-x-2 space-y-4"
		class:lg:columns-3={opciones.length >= 12}
		class:md:columns-2={opciones.length >= 8}
	>
		{#each opciones as { titulo, descripcion }, index}
			{@const id = `opcion_${index}`}
			<div class="flex items-center space-x-3">
				<!-- mt-1 compensates for the leading-snug, to have both aligned to the top -->
				<Checkbox {id} bind:checked={checked[index]} class="mt-1 self-start" />
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
			<Checkbox id="opcion_otra" bind:checked={checkedOther} class="--self-start" />
			<div class="w-full space-y-1">
				<Input bind:value={other} --disabled placeholder="otra opción" />
			</div>
		</div>
	{/if}
</div>
