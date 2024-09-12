# starting from scratch

```shell
pnpm create svelte@latest encuestas-v2

- Which Svelte app template?: Skeleton project
- Add type checking with TypeScript?: Yes, using TypeScript syntax
- Select additional options (use arrow keys/space bar)
- ◼ Add ESLint for code linting
- ◼ Add Prettier for code formatting
- ◼ Add Playwright for browser testing
- ◼ Add Vitest for unit testing
- ◼ Try the Svelte 5 preview (unstable!)

$ cd encuestas-v2/

$ pn install

$ pnpm lint && pnpm check && pnpm test:unit --run && pnpm test:integration

```

```
pnpm exec playwright install
```

add tailwind

```shell
px svelte-add@latest tailwindcss

```

add shadcn svelte

```
px shadcn-svelte@latest init

- Which style would you like to use?: Default
- Which base color would you like to use?: Zinc

```

copy template01/+page.svelte to routes/+page.svelte

add code i

```javascript
let encuesta = {
	id: 'enc_001',
	titulo: 'Manos a la obra',
	descripcion: 'Encuesta de satisfacción del programa de Empleo manos a la obra',
	preguntas: [
		{
			id: 'preg_001',
			titulo: '¿Cómo mejoraría el curso?',
			descripcion: 'Indicanos qué cambios o mejoras sugerirías para el curso',
			opciones: [
				{
					titulo: 'Más ejemplos prácticos',
					descripcion: 'Incluir más ejemplos prácticos en las lecciones',
				},
				{
					titulo: 'Más recursos adicionales',
					descripcion: 'Proporcionar más recursos adicionales, como videos o tutoriales en línea',
				},
				{
					titulo: 'Más ejercicios de práctica',
					descripcion: 'Brindar más ejercicios de práctica para reforzar los conceptos aprendidos',
				},
			],
		},
		{
			id: 'preg_002',
			titulo: '¿Qué opinión te merece el curso?',
			descripcion:
				'Cómo evaluarías tu experiencia durante la cursada y los conocimientos adquiridos',
			opciones: [
				{ titulo: 'Muy buena' },
				{ titulo: 'Normal' },
				{ titulo: 'Regular' },
				{ titulo: 'Mala' },
			],
		},
	],
};

let current = 0;
$: pregunta = encuesta.preguntas[current];
```

---

add required shadcn components

```shell
px shadcn-svelte@latest add button card checkbox input label radio-group separator slider textarea
```

---

testing tips

```shell
pn test:unit --run

pn test:integration --ui
pn test:integration --headed --browser=firefox
```
