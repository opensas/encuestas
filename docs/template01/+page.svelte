<!-- container -->
<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<!-- card -->
	<div class="rounded-[0.5rem] bg-background sm:border sm:shadow-xl">
		<!-- content -->
		<div class="space-y-6 p-6 sm:p-10 md:block">
			<!-- titulo encuesta -->
			<div class="space-y-1">
				<h2 class="text-2xl font-bold tracking-tight">Manos a la obra</h2>
				<p class="text-muted-foreground">
					Encuesta de satisfacción del programa de Empleo manos a la obra
				</p>
			</div>

			<!-- separator -->
			<div class="my-6 h-[1px] w-full shrink-0 bg-border"></div>

			<!-- titulo pregunta -->
			<div class="space-y-0.5">
				<h3 class="text-lg font-medium">1. ¿Cómo mejoraría el curso?</h3>
				<p class="text-sm text-muted-foreground">
					Contanos qué cambios o mejoras sugerirías para el curso
				</p>
			</div>

			<!-- opciones -->
			<div class="space-y-4">
				<!-- pregunta -->
				<!-- Checkbox -->
				<div class="flex items-center space-x-3">
					<button
						id="opcion_0"
						class="box-content h-4 w-4 shrink-0 self-start rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary"
						type="button"
					>
					</button>
					<!-- Label -->
					<label class="flex flex-col space-y-1 text-sm font-medium leading-none" for="opcion_0">
						<div>Más ejemplos prácticos</div>
						<div class="text-xs font-normal text-muted-foreground">
							Incluir más ejemplos prácticos en las lecciones
						</div>
					</label>
				</div>

				<!-- pregunta -->
				<!-- Checkbox -->
				<div class="flex items-center space-x-3">
					<button
						id="opcion_1"
						class="box-content h-4 w-4 shrink-0 self-start rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary"
						type="button"
					>
					</button>
					<!-- Label -->
					<label class="flex flex-col space-y-1 text-sm font-medium leading-none" for="opcion_1">
						<div>Más recursos adicionales</div>
						<div class="text-xs font-normal text-muted-foreground">
							Proporcionar más recursos adicionales, como videos o tutoriales en línea
						</div>
					</label>
				</div>

				<!-- pregunta -->
				<!-- Checkbox -->
				<div class="flex items-center space-x-3">
					<button
						id="opcion_2"
						class="box-content h-4 w-4 shrink-0 self-start rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary"
						type="button"
					>
					</button>
					<!-- Label -->
					<label class="flex flex-col space-y-1 text-sm font-medium leading-none" for="opcion_2">
						<div>Más ejercicios de práctica</div>
						<div class="text-xs font-normal text-muted-foreground">
							Brindar más ejercicios de práctica para reforzar los conceptos aprendidos
						</div>
					</label>
				</div>

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
