<script lang="ts">
	import type { Encuesta, Pregunta } from '$lib/types';

	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	import { Libre, Multiple, Puntaje, Unica } from './preguntas';

	export let encuesta: Encuesta;
	export let onsave: (encuesta: Encuesta) => void = () => {};

	// pregunta actualmente siendo respondida
	let pregunta: Pregunta = encuesta.preguntas[0];
	$: proxima = calculateProxima(pregunta, encuesta);

	$: current = preguntas.length + 1; // numero de pregunta actual, respondidas + 1

	// las preguntas que fueron contestadas
	let preguntas: Pregunta[] = [];

	function next() {
		// contesté una pregunta
		preguntas = [...preguntas, pregunta];

		if (proxima === null) return;

		pregunta = encuesta.preguntas.find((p) => p.id === proxima)!;
	}

	function calculateProxima(pregunta: Pregunta, encuesta: Encuesta) {
		let proxima = _proxima(pregunta);

		// by default, jump to next pregunta
		if (proxima === undefined) {
			const index = encuesta.preguntas.findIndex((p) => p.id === pregunta.id);
			if (index >= encuesta.preguntas.length - 1) return null;
			else return encuesta.preguntas[index + 1].id;
		}

		// null (final) o proxima
		return proxima;
	}

	function _proxima(pregunta: Pregunta) {
		if (!pregunta) return undefined;

		const { tipo, respuesta, proxima } = pregunta;

		if (!respuesta) return proxima;

		// unica o multiple
		if ('opciones' in pregunta) {
			// normalize opciones
			const opciones = pregunta.opciones.map((o) => (typeof o === 'string' ? { titulo: o } : o));
			for (const opcion of opciones) {
				let isSelected = false;
				if (tipo === 'unica' && opcion.titulo === respuesta) isSelected = true;
				if (tipo === 'multiple' && respuesta.includes(opcion.titulo)) isSelected = true;

				if (isSelected) return opcion.proxima === undefined ? proxima : opcion.proxima;
			}
			// check for otros selected, respuesta is not empty, but it doesn't match any option
			if (respuesta && pregunta.proxima_otros) return pregunta.proxima_otros;
		}

		// para los otros tipos de pregunta retorno proxima
		return proxima;
	}

	function prev() {
		if (preguntas.length <= 0) return;
		pregunta = preguntas.at(-1)!;
		preguntas = preguntas.slice(0, -1);
	}

	function save() {
		// update encuesta con las preguntas efectivamente respondidas
		next();
		const saved = { ...encuesta, preguntas };
		onsave(saved);
	}

	function onupdate(respuesta: Encuesta['preguntas'][number]['respuesta']) {
		pregunta.respuesta = respuesta;
		encuesta = encuesta;
		// encuesta.preguntas[current].respuesta = respuesta;
	}

	$: console.log({ pregunta, respuesta: pregunta.respuesta, proxima });
	$: console.log({ preguntas, respondidas: preguntas.length });
</script>

<div class="rounded-[0.5rem] bg-background sm:border sm:shadow-xl">
	<div class="space-y-6 p-6 sm:p-10 md:block">
		<div class="space-y-1">
			<h2 class="text-2xl font-bold tracking-tight">{encuesta.titulo}</h2>
			{#if encuesta.descripcion}
				<p class="text-muted-foreground">{encuesta.descripcion}</p>
			{/if}
		</div>

		<Separator class="my-6" />

		<div class="space-y-0.5">
			<h3 class="text-lg font-medium">{current}. {pregunta.titulo}</h3>
			{#if pregunta.descripcion}
				<p class="text-sm text-muted-foreground">{pregunta.descripcion}</p>
			{/if}
		</div>

		{#key pregunta.id}
			{#if pregunta.tipo === 'unica'}
				<Unica {pregunta} {onupdate} />
			{:else if pregunta.tipo === 'multiple'}
				<Multiple {pregunta} {onupdate} />
			{:else if pregunta.tipo === 'puntaje'}
				<Puntaje {pregunta} {onupdate} />
			{:else if pregunta.tipo === 'libre'}
				<Libre {pregunta} {onupdate} />
			{/if}
		{/key}

		<div class="flex justify-between pt-4">
			<Button class={current <= 1 ? 'invisible' : ''} variant="outline" on:click={prev}>
				Anterior
			</Button>
			{#if proxima !== null}
				<Button on:click={next}>Siguiente</Button>
			{:else}
				<Button on:click={save}>Finalizar</Button>
			{/if}
		</div>
	</div>
</div>
