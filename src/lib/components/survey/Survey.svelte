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

	// already answered question
	let questions: Question[] = [];

	function goNext() {
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
		if (questions.length <= 0) return;
		question = questions.at(-1)!;
		questions = questions.slice(0, -1);
	}

	function save() {
		// update survey with the effectively answered questions (the question history)
		goNext();
		const saved = { ...survey, preguntas: questions };
		onsave(saved);
	}

	function onupdate(answer: Survey['questions'][number]['answer']) {
		question.answer = answer;
		survey = survey;
		// survey.preguntas[current].respuesta = respuesta;
	}
</script>

<div class={cn('rounded-[0.5rem] bg-background sm:border sm:shadow-xl', className)}>
	<div class="space-y-6 p-6 sm:p-10 md:block">
		<div class="space-y-1">
			<h2 class="text-2xl font-bold tracking-tight">{survey.title}</h2>
			{#if survey.description}
				<p class="text-muted-foreground">{survey.description}</p>
			{/if}
		</div>

		<Separator class="my-6" />

		<div class="space-y-0.5">
			<h3 class="text-lg font-medium">{question.code || current}. {question.title}</h3>
			{#if question.description}
				<p class="text-sm text-muted-foreground">{question.description}</p>
			{/if}
		</div>

		{#key question.id}
			{#if question.kind === 'single'}
				<Single {question} {onupdate} />
			{:else if question.kind === 'grid-single'}
				<GridSingle {question} {onupdate} />
			{:else if question.kind === 'multiple'}
				<Multiple {question} {onupdate} />
			{:else if question.kind === 'rating'}
				<Rating {question} {onupdate} />
			{:else if question.kind === 'text'}
				<Text {question} {onupdate} />
			{:else if question.kind === 'grid-text'}
				<GridText {question} {onupdate} />
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
	</div>
</div>
