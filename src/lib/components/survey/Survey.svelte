<script lang="ts">
	import type { Question, Survey } from '$lib/types';

	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	import { cn } from '$lib/utils';

	import { GridSingle, GridText, Multiple, Rating, Single, Text } from './question';
	import { toOption } from '.';

	export let survey: Survey;
	export let onsave: (survey: Survey) => void = () => {};

	let className = '';
	export { className as class };

	// current question
	let question: Question = survey.questions[0];
	$: next = calculateNext(question, survey);

	$: current = questions.length + 1; // index of the current question

	let saved = false;
	let isValid = false;
	let shake = false;
	$: isError = saved && !isValid;

	let intro = !!survey.intro;
	// let outro = false; // #TODO!

	// already answered question
	let questions: Question[] = [];

	$: required = !('required' in question) || question.required;

	function goNext() {
		if (!validate()) return;
		saved = false;

		// contesté una nueva pregunta
		questions = [...questions, question];

		if (next === null) return; // end of survey

		question = survey.questions.find((p) => p.id === next)!; // calculate next question

		// if the current question has already been answered, go back in history, yo avoid loops
		const index = questions.findIndex((p) => p.id === question.id);
		if (index !== -1) questions = questions.slice(0, index);
	}

	function calculateNext(pregunta: Question, survey: Survey) {
		let next = _next(pregunta);

		// a next question has been explicitly set depending on current answer
		if (next !== undefined) return next;

		const index = survey.questions.findIndex((p) => p.id === pregunta.id);

		// reached end
		if (index >= survey.questions.length - 1) return null;

		// return next question
		return survey.questions[index + 1].id;
	}

	function _next(question: Question) {
		if (!question) return undefined;

		const { kind, answer, next } = question;

		if (!answer) return next;

		// single or multiple
		if ('options' in question) {
			// normalize options
			const options = question.options.map(toOption);
			for (const option of options) {
				let isSelected = false;
				if (kind === 'single' && option.title === answer) isSelected = true;
				if (kind === 'multiple' && answer.includes(option.title)) isSelected = true;

				if (isSelected) return option.next === undefined ? next : option.next;
			}
			// check for other selected, answer is not empty, but it doesn't match any option
			if (answer && question.nextOther) return question.nextOther;
		}

		// for other kind of questions return next
		return next;
	}

	function goPrev() {
		saved = false;

		if (questions.length <= 0) return;
		question = questions.at(-1)!;
		questions = questions.slice(0, -1);
	}

	function validate() {
		saved = true;
		if (!isValid) {
			shake = true;
			setTimeout(() => (shake = false), 1000);
		}
		return isValid;
	}

	function parseText(text: string) {
		const CR = '\n';
		const TAB = '\t';

		let parsed = text
			.replaceAll(TAB, '') // cleanup
			.split(CR) // split
			.filter(Boolean); // remove empty lines

		const [header, ...body] = parsed;
		return { header, body };
	}

	function save() {
		// update survey with the effectively answered questions (the question history)
		goNext();
		const updated = { ...survey, preguntas: questions };
		onsave(updated);
	}

	function onupdate(answer: Survey['questions'][number]['answer']) {
		question.answer = answer;
		survey = survey;
		// survey.preguntas[current].respuesta = respuesta;
	}
</script>

<div
	class={cn('rounded-[0.5rem] bg-background sm:border sm:shadow-xl', className)}
	class:animate-shake={shake}
>
	<div class="space-y-6 p-6 sm:p-10 md:block">
		<div class="space-y-1">
			<h2 class="text-2xl font-bold tracking-tight">
				{survey.title}
			</h2>
			{#if survey.description}
				<p class="text-muted-foreground">{survey.description}</p>
			{/if}
		</div>

		<Separator class="my-6" />

		{#if intro && survey.intro}
			{@const { header, body } = parseText(survey.intro)}
			<div class="space-y-0.5">
				<h3 class="text-xl font-medium">{header}</h3>
			</div>
			{#each body as paragraph}
				<p class="--text-muted-foreground text-base">{paragraph}</p>
			{/each}
			<div class="flex justify-end pt-4">
				<Button on:click={() => (intro = false)}>Comenzar</Button>
			</div>
		{:else}
			<div class="space-y-0.5">
				<h3 class="text-lg font-medium" class:text-destructive={isError}>
					{question.code || current}. {question.title}
					{#if required}
						<span class="text-destructive">*</span>
					{/if}
				</h3>
				{#if isError}
					<p class="text-sm text-destructive">Debe completar esta pregunta</p>
				{/if}
				{#if question.description}
					<p class="text-sm text-muted-foreground">{question.description}</p>
				{/if}
			</div>

			{#key question.id}
				{#if question.kind === 'single'}
					<Single bind:isValid {question} {onupdate} />
				{:else if question.kind === 'grid-single'}
					<GridSingle bind:isValid {question} {saved} {onupdate} />
				{:else if question.kind === 'multiple'}
					<Multiple bind:isValid {question} {onupdate} />
				{:else if question.kind === 'rating'}
					<Rating bind:isValid {question} {onupdate} />
				{:else if question.kind === 'text'}
					<Text bind:isValid {question} {onupdate} />
				{:else if question.kind === 'grid-text'}
					<GridText bind:isValid {question} {saved} {onupdate} />
				{/if}
			{/key}

			<div class="flex justify-between pt-4">
				<Button class={current <= 1 ? 'invisible' : ''} variant="outline" on:click={goPrev}>
					Anterior
				</Button>
				{#if next !== null}
					<Button on:click={goNext}>Siguiente</Button>
				{:else}
					<Button on:click={save}>Finalizar</Button>
				{/if}
			</div>
		{/if}
	</div>
</div>
