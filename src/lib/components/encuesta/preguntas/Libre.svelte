<script lang="ts">
	import type { PreguntaLibre } from '$lib/types';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	export let pregunta: PreguntaLibre;
	export let onupdate: (respuesta: string) => void = () => {};

	let respuesta = pregunta.respuesta || '';

	$: ({ opcion, texto, control = 'textarea', maxlength } = pregunta);
	$: titulo = typeof opcion === 'object' ? opcion.titulo : '';
	$: descripcion = typeof opcion === 'object' ? opcion.descripcion : '';

	$: onupdate(respuesta);
</script>

<div class="grid w-full gap-1.5">
	<Label for="opcion-libre">{titulo}</Label>
	{#if control === 'textarea'}
		<Textarea id="opcion-libre" bind:value={respuesta} {maxlength} placeholder={texto} />
	{:else if control === 'input'}
		<Input id="opcion-libre" bind:value={respuesta} {maxlength} placeholder={texto} />
	{/if}
	{#if descripcion}
		<p class="text-sm text-muted-foreground">{descripcion}</p>
	{/if}
</div>
