<script lang="ts">
	import { survey_short, surveys } from '$lib/components/survey';

	let popup: Window | null = null;

	let code = survey_short.code;

	let status: 'init' | 'success' = 'init';

	let data: unknown;

	function openSurvey() {
		popup = window.open(
			`/encuestas/${code}?p1=param2&p2=param2`,
			'_blank',
			'modal=yes,width=1000,height=600,menubar=no,toolbar=no,location=no'
		);
		popup?.focus();
	}

	function onsave(event: MessageEvent) {
		console.log('event', event);
		if (event.origin === window.location.origin) {
			console.log('Received message from child:', event.data);
			data = event.data;
			status = 'success';
		}
		popup?.close();
	}
</script>

<svelte:window on:message={onsave} />

<div class="max-w- mx-4 flex h-screen items-center justify-center">
	<div class="grid gap-4 rounded-md border bg-slate-50 p-6 shadow-lg">
		{#if status === 'init'}
			<h2 class="text-2xl">Ejemplo de integración de encuesta mediante popup</h2>
		{:else if status === 'success'}
			<h2 class="text-2xl">Felicitaciones, has respondido la encuesta</h2>
			<textarea rows="20">{JSON.stringify(data, null, 2)}</textarea>
			<hr />
		{/if}
		<select bind:value={code} class="h-10 rounded-lg px-4">
			{#each surveys as option}
				<option value={option.code}>option.code}</option>
			{/each}
		</select>

		Haga click en el siguiente botón para abrir un popup con la encuesta

		<button
			class="h-10 w-fit justify-self-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
			on:click={openSurvey}
		>
			Responder encuesta
		</button>
	</div>
</div>
