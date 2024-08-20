<script lang="ts">
	import { Encuesta, encuesta02 } from '$lib/components/encuesta';

	function onsave(encuesta: import('$lib/types').Encuesta) {
		console.log('!encuesta saved!!!', { encuesta });
		const LF = '\r\n\r\n';
		const respuestas = encuesta.preguntas
			.map((p) => `${p.titulo}: ${(p.respuesta || '').toString()}`)
			.join(LF);
		alert(`Felicitaciones! completaste la encuesta.${LF}${respuestas}`);
	}
</script>

<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<Encuesta encuesta={encuesta02} {onsave} />
</div>
