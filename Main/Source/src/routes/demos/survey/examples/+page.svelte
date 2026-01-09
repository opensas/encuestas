<script lang="ts">
	import { resolve } from '$app/paths';

	// Agrupar encuestas lógicamente
	const surveyGroups = [
		{
			title: 'Encuestas en producción',
			description: 'Encuestas actualmente en uso',
			surveys: [
				{
					name: 'Autotest - Perfil Emprendedor',
					description:
						'Autoevaluación integral de emprendedor con sistema de puntuación, introducción/conclusión y barra de progreso',
					code: 'autotest',
				},
				{
					name: 'FP2 - Cursos de Formación Profesional y Talleres de Orientación Laboral (FP-TOL)',
					description:
						'Satisfacción de cursos de Formación Profesional y Talleres de Orientación Laboral (modalidad presencial)',
					code: 'fp2',
				},
				{
					name: 'FP-AUTOASISTIDO2 - Cursos auto asistidos (FP) (FP-AUTOASISTIDO2)',
					description: 'Satisfacción de cursos de auto asistidos',
					code: 'fp-autoasistido2',
				},
				{
					name: 'FP860 - cursos de Formación Profesional (FP)',
					description: 'Satisfacción de cursos de Formación Profesional (modalidad a distancia)',
					code: 'fp860',
				},
				{
					name: 'TOI - Taller de orientación individual (TOI)',
					description: 'Cuestionario de taller de orientación individual',
					code: 'toi',
				},
			],
		},
		{
			title: 'Encuestas de Evaluación definidas',
			description: 'Otras encuestas de evaluación definidas por el usuario',
			surveys: [
				{
					name: 'AEPT - Satisfacción de Capacitación',
					description:
						'Encuesta de satisfacción para participantes en Acciones de Entrenamiento para el Trabajo (AEPT)',
					code: 'aept',
				},
				{
					name: 'AEPT2 - Satisfacción de Capacitación',
					description:
						'Encuesta de satisfacción para participantes en Acciones de Entrenamiento para el Trabajo (AEPT2)',
					code: 'aept2',
				},
				{
					name: 'UPEP - Unidades de Economía Popular',
					description:
						'Encuesta para registro y evaluación de Unidades Productivas de Economía Popular',
					code: 'upep',
				},
				{
					name: 'FP - Formación Profesional (legacy)',
					description: 'Evaluación de formación profesional con flujo estándar',
					code: 'fp-legacy',
				},
				{
					name: 'FP Auto - Formación Profesional (Automática)',
					description: 'Evaluación de formación profesional con progresión automatizada',
					code: 'fp-autoasistido',
				},
				{
					name: 'Manos - Capacitación Práctica',
					description: 'Encuesta de evaluación de capacitación en habilidades prácticas',
					code: 'manos',
				},
			],
		},
		{
			title: 'Encuestas de Prueba y Demostración',
			description:
				'Encuestas de muestra para probar diferentes tipos de preguntas y características',
			surveys: [
				{
					name: 'Inglés - Encuesta de aprendizaje de inglés',
					description: 'Demuestra preguntas con varias opciones',
					code: 'ingles',
				},
				{
					name: 'Cine - Encuesta Cinematográfica',
					description:
						'Encuesta de preferencias de películas con preguntas de calificación y opción múltiple',
					code: 'cine',
				},
				{
					name: 'Test - Encuesta de Prueba General',
					description: 'Encuesta de prueba de propósito general con tipos de preguntas mixtas',
					code: 'test',
				},
				{
					name: 'Corta - Demostración Rápida',
					description: 'Encuesta corta para prueba rápida de funcionalidad básica',
					code: 'short',
				},
			],
		},
		{
			title: 'Ejemplos Personalizados',
			description: 'Encuestas personalizadas que muestran características específicas',
			surveys: [
				{
					name: 'Con Introducción - Encuesta con Introducción',
					description: 'Encuesta que demuestra la funcionalidad de pantalla de introducción',
					code: 'with-intro',
				},
				{
					name: 'Sin Introducción - Encuesta Directa',
					description: 'Encuesta que comienza directamente sin pantalla de introducción',
					code: 'no-intro',
				},
				{
					name: 'Demo de Barra de Progreso',
					description: 'Encuesta que muestra la funcionalidad de barra de progreso',
					code: 'progress-bar',
				},
				{
					name: 'Encuesta simple usada para test:ui',
					description: `Encuesta con dos preguntas utilizada para pruebas unitarias con 'bun test:ui "Survey.svelte.test.ts" --run'`,
					code: 'ui-test',
				},
			],
		},
	] as const;
</script>

<div class="container mx-auto max-w-4xl p-8">
	<div class="mb-8">
		<h1 class="mb-4 text-3xl font-bold">Ejemplos de Encuestas</h1>
		<p class="text-muted-foreground">
			Explora y prueba diferentes implementaciones de encuestas. Cada ejemplo demuestra
			características específicas y casos de uso del sistema de encuestas.
		</p>
	</div>

	{#each surveyGroups as { title, description, surveys } (title)}
		<div class="mb-12">
			<div class="mb-6">
				<h2 class="mb-2 text-2xl font-semibold">{title}</h2>
				<p class="text-muted-foreground">{description}</p>
			</div>

			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each surveys as { name, description, code } (code)}
					<a
						class="block rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
						href={resolve(`/demos/encuestas/${code}`)}
					>
						<h3 class="mb-2 font-semibold">{name}</h3>
						<p class="text-sm text-muted-foreground">{description}</p>
						<div class="mt-3">
							<span class="inline-block rounded bg-muted px-2 py-1 text-xs">{code}</span>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>
