<script lang="ts">
	let encuesta = {
		id: 'enc_001',
		titulo: 'Manos a la obra',
		descripcion: 'Encuesta de satisfacción del programa de Empleo manos a la obra',
		preguntas: [
			{
				id: 'preg_001',
				titulo: '¿Cómo mejoraría el curso?',
				descripcion: 'Indicanos qué cambios o mejoras sugerirías para el curso',
				tipo: 'unica',
				opciones: [
					{
						titulo: 'Más ejemplos prácticos',
						descripcion: 'Incluir más ejemplos prácticos en las lecciones'
					},
					{
						titulo: 'Más recursos adicionales',
						descripcion: 'Proporcionar más recursos adicionales, como videos o tutoriales en línea'
					},
					{
						titulo: 'Más ejercicios de práctica',
						descripcion: 'Brindar más ejercicios de práctica para reforzar los conceptos aprendidos'
					}
				],
				acepta_otros: true
			}
		]
	};
	let current = 0;
	let pregunta = encuesta.preguntas[current];
</script>

<!-- container -->
<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<!-- card -->
	<div class="rounded-[0.5rem] bg-background sm:border sm:shadow-xl">
		<!-- content -->
		<div class="space-y-6 p-6 sm:p-10 md:block">
			<!-- titulo encuesta -->
			<div class="space-y-1">
				<h2 class="text-2xl font-bold tracking-tight">{encuesta.titulo}</h2>
				{#if encuesta.descripcion}
					<p class="text-muted-foreground">{encuesta.descripcion}</p>
				{/if}
			</div>

			<!-- separator -->
			<div class="my-6 h-[1px] w-full shrink-0 bg-border"></div>

			<!-- titulo pregunta -->
			<div class="space-y-0.5">
				<h3 class="text-lg font-medium">{current + 1}. {pregunta.titulo}</h3>
				{#if pregunta.descripcion}
					<p class="text-sm text-muted-foreground">{pregunta.descripcion}</p>
				{/if}
			</div>

			<!-- opciones -->
			<div class="space-y-4">
				{#each pregunta.opciones as { titulo, descripcion }, index}
					{@const id = `opcion_${index}`}

					<!-- Checkbox -->
					<div class="flex items-center space-x-3">
						<button
							{id}
							class="box-content h-4 w-4 shrink-0 self-start rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary"
							type="button"
						>
						</button>

						<!-- Label -->
						<label class="flex flex-col space-y-1 text-sm font-medium leading-none" for={id}>
							<div>{titulo}</div>
							{#if descripcion}
								<div class="text-xs font-normal text-muted-foreground">{descripcion}</div>
							{/if}
						</label>
					</div>
				{/each}

				{#if pregunta.acepta_otros}
					<div class="flex items-center space-x-3">
						<!-- Checkbox -->
						<button
							id="opcion_otro"
							class="--self-start box-content h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary"
							type="button"
						>
						</button>
						<!-- Input -->
						<input
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							placeholder="otra opción"
						/>
					</div>
				{/if}
			</div>

			<div class="flex justify-between pt-4">
				<!-- Button variant = "outline" -->
				<button
					class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					Anterior
				</button>
				<!-- Button  -->
				<button
					class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					Siguiente
				</button>
			</div>
		</div>
	</div>
</div>
