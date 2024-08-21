sample:

svelte 4 version:

[encuesta tutorial - 00](https://svelte.dev/repl/b0f98f3a6d664112a62b583238f0d8ba?version=4.2.18)

[encuesta tutorial - 02](https://svelte.dev/repl/135fd2f280da482f9b937598aafaa484?version=4.2.18)

[encuesta tutorial - final](https://svelte.dev/repl/9434bac592644b5ba306a5c6ed0e79c4?version=4.2.18)

```svelte
<!-- App.svelte -->
<script>
	import { encuesta01 as encuesta } from './example.js';

	let current = 0;

	function save() {
		const respuestas = encuesta.preguntas
			.map((p) => `${p.titulo}: ${p.respuesta}`)
			.join('\r\n\r\n');
		alert(`Felicitaciones! completaste la encuesta.\r\n\r\n${respuestas}`);
	}

	$: pregunta = encuesta.preguntas[current];
</script>

<div class="main">
	<div class="card">
		<h2>{encuesta.titulo}</h2>
		<p>{encuesta.descripcion}</p>
		<hr />
		<h3>{current + 1}. {pregunta.titulo}</h3>
		<p>{pregunta.descripcion}</p>

		{#if pregunta.tipo === 'unica' || pregunta.tipo === 'multiple'}
			<ul>
				{#each pregunta.opciones as opcion (opcion)}
					<li>
						<input type="radio" bind:group={pregunta.respuesta} value={opcion} />
						{opcion}
					</li>
				{/each}
			</ul>
		{/if}

		<div>
			<button on:click={() => current--}>Anterior</button>
			{#if current < encuesta.preguntas.length - 1}
				<button on:click={() => current++}>Posterior</button>
			{:else}
				<button on:click={save}>Finalizar</button>
			{/if}
		</div>
	</div>
</div>

<style>
	div.main {
		display: flex;
		height: 100vh;
		align-items: center;
		justify-content: center;
	}
	.card {
		min-width: 600px;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		background-color: #333;
		color: #fff;
	}
	hr {
		margin: 1.5rem 0;
	}
</style>
```

```javascript
// example.js
export const encuesta01 = {
	id: 'enc_001',
	titulo: 'Manos a la obra',
	descripcion: 'Encuesta de satisfacción del programa de Empleo manos a la obra',
	preguntas: [
		{
			id: 'preg_001',
			titulo: '¿Qué tan conforme está con la gestión del programa?',
			descripcion: 'Indicanos que tan conforme estas con el desarrollo del programa',
			opciones: ['mucho', 'bastante', 'normal', 'poco', 'nada conforme']
		},
		{
			id: 'preg_002',
			titulo: '¿Cómo mejoraría la gestión del programa?',
			opciones: ['más opciones de cursos', 'mejores docentes', 'mejor equipamiento', 'más difusión']
		},
		{
			id: 'preg_002',
			titulo: '¿Qué puntaje le daría a la gestión del programa?',
			opciones: [1, 2, 3, 4, 5]
		}
	]
};
```

---

svelte 5

https://svelte-5-preview.vercel.app/#H4sIAAAAAAAAA51WX2_bNhD_Klc1gGxEku143YNqeyiGFtjDgO05ChJaomy6FKmSlJtM0Ifp4x721A8wYP5iO-q_ETfoBicOeffj7453vLuUTso41U54WzqCZNQJnXd57niOecrtRh8pNxT3WhYqtpLVK98HxASNCnx_E4mVjhXLDa4iw7JcKgMlUBEXVBsyX0AFqZIZuMGMPpIs5zQ4aBfBCOfU9EhYwxX-MXQynJ12oLhQigozYOa9Kld0V4jmfEIVO9KkZwg6pb5tGe6mjeUrJnROYzMpO2w1PZd3Rz1QVOc1JOyNBb2sagnTQsSGSQGaHOlkCqUVRiaWQpuBQaOXz50LMpJPclhv4OGqzAPDTMFlFYLdDIYepsFBMjFxo0hFyF5_u9PGDuFUmcnDB8pZzAyJ0ROqX0EsbcDRBCaLk8H0mOKqHNxDI5avwqzOhrSKVcKOEHOi9TpyMsJE5NTptr9nupiopNOZ1f5mM7yE9lpQrWYobxH5GJDQ2qT13aLynkbBrF8vN2WbyutFFeBL61My4l-O-XvAJf4GVvD2QGTK15TE--GQzJtYAuauWXvAREIfq-4EnucMNsPWCsiWckilwpg0p-7L9pRzhkQsE3lhwNYcghVJmIwc2CI63ClZ5OvywqODI-EFXZcNdwUsuWCoj1r36eBnrs5qX0dIlLAhHDMbjvbEajYEqhFg7nvoalsYg6GVIsZH-HFdYhXgk26z5fvV5p0wWKBSrWYNdBR0lvY1vrpUIZyKndn7i3HUX7R3fV1tfpP6WwZDyjV9icyWcbX5wATh7A9ygWHG0j4sXRj6lRittHnitFajKLDV0zWHhOmck6cQUk4f3zayPWW7vQlhMZ8f92-74mY74TNDMx1CTG0UW82h0IalTz62GYPyM23tXWArsrEHkDHhf2aJ2Yfw43yeNyYBcpIkTOxCuBlkW6mwmfr2ORbaejPSPPp6TxL5OYQ5fqwK1G5LJnMP2p_gzbRDk_ijfcYiQR-5VCG8Xi6XrbKTpGk6eIzV3oYnI2rHBBoP3iiawXzAYL21V-JMG7-OsG8rKASBxdoBsYfVsccRlsmEpYwmTmhUQSuvn3jtTBqm3kGPJ95sBsPUigR9rOdb09VHM27d-MOSEFwU38_nC9ezkqYpofRXIiQ2EduF5VaRRjvqSAh5303ChOIUMUynJI7Z6atAAceOJHeKZLX2vXVIQnaJs6-ZEG6bOJbdm63ds_rBP_vpffzn79-L059giLA3xO6VUUCHTl_s1lrZ4e6ZQz8NTOf3-UUkLK5d_FTQZ6zYTy0rEuEpopTk2LzHvANt14PxRm5WxHvpeuBucagRfOx2LZCUcLvKZVxrBUlIb86966lITHND7qVREulSgl2gUVXeC8G6uRisn09fM0wCPUhF1Okv8j0RGl1laD5udvrSTRecNJhgbGJa6uGYxVg7VivrGr-gBPqpYDnJGOrludryYwEU2vrmdppvhcWWyP-OSv2EcvsCD_g_B4Wkic1_jc7CgxsPlh784MGb787fXSQqrP7nBX9X_Qu-_r1J7goAAA==

```svelte
<!-- App.svelte -->
<script>
	import { encuesta01 } from './example.js';

	let encuesta = $state(encuesta01);
	let current = $state(0);
	let pregunta = $derived(encuesta.preguntas[current]);

	$inspect({ encuesta });
	$inspect({ pregunta, respuesta: pregunta.respuesta });

	function save() {
		const respuestas = encuesta.preguntas
			.map((p) => `${p.titulo}: ${p.respuesta}`)
			.join('\r\n\r\n');
		alert(`Felicitaciones! completaste la encuesta.\r\n\r\n${respuestas}`);
	}
</script>

<div class="main">
	<div class="card">
		<h2>{encuesta.titulo}</h2>
		<p>{encuesta.descripcion}</p>
		<hr />
		<h3>{current + 1}. {pregunta.titulo}</h3>
		<p>{pregunta.descripcion}</p>

		<ul>
			{#each pregunta.opciones as opcion, index}
				<li>
					<label for="opcion_{index}">
						<input
							type="radio"
							bind:group={pregunta.respuesta}
							value={opcion}
							id="opcion_{index}"
						/>
						{opcion}
					</label>
				</li>
			{/each}
		</ul>

		<div>
			<button onclick={() => current--}>Anterior</button>
			{#if current < encuesta.preguntas.length - 1}
				<button onclick={() => current++}>Posterior</button>
			{:else}
				<button onclick={save}>Finalizar</button>
			{/if}
		</div>
	</div>
</div>

<style>
	div.main {
		display: flex;
		height: 100vh;
		align-items: center;
		justify-content: center;
	}
	.card {
		min-width: 600px;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		background-color: #333;
		color: #fff;
	}
	hr {
		margin: 1.5rem 0;
	}
	li {
		list-style-type: none;
	}
</style>
```

---

qr-code generator: https://app.flowcode.com/codes/R3uAs
