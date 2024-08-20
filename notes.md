sample:

svelte 4 version: https://svelte.dev/repl/9434bac592644b5ba306a5c6ed0e79c4?version=4.2.18

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
			tipo: 'unica',
			opciones: ['mucho', 'bastante', 'normal', 'poco', 'nada conforme']
		},
		{
			id: 'preg_002',
			titulo: '¿Cómo mejoraría la gestión del programa?',
			tipo: 'multiple',
			opciones: ['más opciones de cursos', 'mejores docentes', 'mejor equipamiento', 'más difusión']
		},
		{
			id: 'preg_002',
			titulo: '¿Qué puntaje le daría a la gestión del programa?',
			tipo: 'unica',
			opciones: [1, 2, 3, 4, 5]
		}
	]
};
```

---

svelte 5

https://svelte-5-preview.vercel.app/#H4sIAAAAAAAAA51WzW4bNxB-lYlsYCVYuytZdQ8bSUVQJEAPBdqzZcTULleiwiUZkqvY3ezD5NhDT3mAAtWLdbj_hhUjLWTL5Mzwm4_D-XExShmnZhTdFiNBMjqKRm-UGk1H9lG5jTlSbinujcx17CTLV74PaBPUKvD99UYsTayZsrjaWJYpqS0UQEWcU2PJbA4lpFpm4AUhfSCZ4jQ4GA-N0ZxT21nCCi7xj6Xj_uykNYpzramwvc2sUylNd7mozydUsyNNOoSgVZrbBuFuUnu-ZMIoGttx0dqWk6fy9ugUNDWqMok6Z0EnKxvANBexZVKAIUc6nkDhhBsbS2Fsj2CQ5XNyQUbUWMFqDfeXhQosszmXZQRu0zu6nwQHycTY22z0BtGrb29S-yGcaju-f0c5i5klMTKh5hXE0gUcXeBjcdK7HkJcFj09dOLwSnzVsH9WsUzYEWJOjFltRhlhYjOqntv9PtHFRCetzi731-s-E5prQbkMUd5YqKFBQiuXjruzUh2MhrBbL9ZF85RX8zLATOueZIC_GOJ3BufwK7PigqVDHCVhtVqBlwsWEw8-fz6nzHKOG069sgZBbzlft-vigpJ435-Tqn4SwBSo190xPMjZut_hngmVW3BliDHVJGFyM4ItE0m00zJXq-JMHsKR8Jyuiga9C1nD57nTcOC1CB3d_iZhd5UiZGkrr2OK792dW25zazGcUsSYeB9WBWY-pnHzQr5frt8Ii0Up9TKsTQcRwqC3db08VxWcip3d-_Mh6Rf9XV2V69-k-ZbDiHJDXwJzpVuu3zFBOPuDnEHoY7EM2zB0KzFYGfvIaaVGUeAqpm0ICTOKk8cIUk4fXteyPWW7vY1gPpsd96_bgmY74TNLMxNBTF0UG80hN5aljz62FovyJ9qKXeCqsPYHkDHhf2KJ3Ufw42ymapcAiiQJE7sIrnvZVmpsoL7Lt9w4NgPNg2_2JJGfIpjhx6lA77ZkPJtC8xPcTFprEn9weSoS5MiljuBisVg0ylaSpmnPGCu8CU9G9I4JdB7caJrBrLfhrL0SZ8b6VYR9VyIRCKys1hD7VhV7HFuZTFjKaDKKrM5pOe2mXDOH-kl3MMMpF4bQT6qNoA_VTKs7-WCurWo-LInAQ_H72WzuTZ2kbkQo_ZUIiRXvOq_calJrB10ITd620y-hODksMymJY3b6KlDAsX3InSZZpX3rCEnIzmF2NRPBbVO2bc5W9Jy-5-c-Hcd__v49P_0Jlgh3w1TqjAISOn1xW-dlh7tnhH7qkZ7e5xeRYM90FD_m9BkqNj-HikB4imgtOTbsIe6QoHL06hbcSds2ivfEBhzvpTcFb4vjjWAJuLVAV4S7lZJxpRUkIR0J766DIjFVlryXVkuESwn2hlpVTl8I4fXZEP58-prh09CD1ESf_iLfE7fmgt0YOXfHvld52elLOzlwimA-YM8z0vTHnI0j4LSyaglnlEA_5kyRjKFePlU7fKyX3DjSXqv5VrxcRf3vcFUZp1zCHvDfEgpJHbT_ErZv58V8CtdTWEzhhyncfPdz321EiS3kede4K_8FW_iD7CcLAAA=

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

		{#if pregunta.tipo === 'unica' || pregunta.tipo === 'multiple'}
			<ul>
				{#each pregunta.opciones as opcion}
					<li>
						<input type="radio" bind:group={pregunta.respuesta} value={opcion} />
						{opcion}
					</li>
				{/each}
			</ul>
		{/if}

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
