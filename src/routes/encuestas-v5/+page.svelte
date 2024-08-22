<script lang="ts">
	import { encuesta_ingles } from '$lib/components/encuesta';
	import { Encuesta } from '$lib/components/encuesta_v5';

	let encuesta = $state(encuesta_ingles);

	function onsave(encuesta: import('$lib/types').Encuesta) {
		console.log('!encuesta saved!!!', { encuesta });
		const LF = '\r\n\r\n';
		const respuestas = encuesta.preguntas
			.map((p) => `${p.titulo}: ${(p.respuesta || '').toString()}`)
			.join(LF);
		alert(`Felicitaciones! completaste la encuesta.${LF}${respuestas}`);
	}

	$inspect(encuesta);
</script>

<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<Encuesta {encuesta} {onsave} />
</div>
