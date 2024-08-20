<script lang="ts">
	import type { PreguntaLibre } from '$lib/types';

	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	type Props = {
		pregunta: PreguntaLibre;
		onupdate: (respuesta: PreguntaLibre['respuesta']) => void;
	};

	let { pregunta, onupdate = () => {} }: Props = $props();

	let respuesta = $state(pregunta.respuesta || '');

	let { titulo, descripcion } = $derived(pregunta);

	$effect(() => onupdate(respuesta));
</script>

<div class="grid w-full gap-1.5">
	<Label for="opcion-libre">{titulo}</Label>
	<Textarea id="opcion-libre" bind:value={respuesta} placeholder="Type your message here." />
	{#if descripcion}
		<p class="text-sm text-muted-foreground">{descripcion}</p>
	{/if}
</div>
