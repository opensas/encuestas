<script lang="ts">
	import type { PreguntaLibre } from '$lib/types';

	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	export let pregunta: PreguntaLibre;
	export let onupdate: (respuesta: string) => void = () => {};

	let respuesta = pregunta.respuesta || '';

	$: ({ titulo, descripcion } = pregunta);

	$: onupdate(respuesta);
</script>

<div class="grid w-full gap-1.5">
	<Label for="opcion-libre">{titulo}</Label>
	<Textarea bind:value={respuesta} placeholder="Type your message here." id="opcion-libre" />
	{#if descripcion}
		<p class="text-sm text-muted-foreground">{descripcion}</p>
	{/if}
</div>
