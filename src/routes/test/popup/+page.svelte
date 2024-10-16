<script lang="ts">
	let popup: Window | null = null;

	function openSurvey() {
		popup = window.open('/encuestas/test?p1=param2&p2=param2', 'popup');
	}

	function onsave(event: MessageEvent) {
		console.log('event', event);
		if (event.origin === window.location.origin) {
			console.log('Received message from child:', event.data);
		}
		popup?.close();
	}
</script>

<svelte:window on:message={onsave} />

<div class="max-w- flex h-screen items-center justify-center">
	<div class="grid gap-4 rounded-md border bg-slate-50 p-6 shadow-lg">
		<h2>Ejemplo de integración de encuesta mediante popup</h2>

		Haga click en el siguiente botón para abrir un popup con la encuesta

		<button
			class="h-10 w-fit justify-self-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
			on:click={openSurvey}
		>
			Responder encuesta
		</button>
	</div>
</div>
