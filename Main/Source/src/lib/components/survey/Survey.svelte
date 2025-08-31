<script lang="ts" module>
	export type SurveyState = {
		status: RespuestaEstado;
		answers: Answer[];
		current: Question['id'];
		score: number | undefined;
	};
</script>

<script lang="ts">
	import type { Question, Survey } from '$lib/types';

	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	import type { RespuestaEstado } from '$lib/server/services/respuesta';
	import { cn } from '$lib/utils';
	import { round } from '$lib/utils/number';
	import { deepCopy } from '$lib/utils/object';

	import GridApi from './question/GridApi.svelte';
	import GridSingle from './question/GridSingle.svelte';
	import GridText from './question/GridText.svelte';
	import Multiple from './question/Multiple.svelte';
	import Rating from './question/Rating.svelte';
	import Single from './question/Single.svelte';
	import Text from './question/Text.svelte';
	import Message from './Message.svelte';
	import { DEFAULT_OUTRO, toOption } from '.';

	type Props = {
		survey: Survey;
		state?: Partial<SurveyState>;
		onsave?: (state: SurveyState) => void;
		onclose?: (state: SurveyState) => void;
		onskip?: (state: SurveyState) => void;
		class: string;
	};

	let {
		survey,
		state: _state,
		onsave = () => {},
		onclose = () => {},
		onskip = () => {},
		class: className,
	}: Props = $props();

	// current question
	const questions = $state(deepCopy(survey.questions)); // defensive copy
	let question: Question = $state(questions[0]); // questions being answered
	let next = $derived(calculateNext(question, questions));

	let status: RespuestaEstado = $state('creado');

	// history of already answered questions, this will be the question history path
	let answers: Question[] = $state([]);

	let confirmed = $state(false); // user pressed next on current question, used to display errors
	let finished = $state(false);
	let saved = $state(false); // current survey has been correctly saved
	let isValid = $state(false);
	let shake = $state(false);

	let isError = $derived(confirmed && !isValid);

	let intro = $state(!!survey.intro);
	let outro = survey.outro || DEFAULT_OUTRO;

	let required = $derived(!('required' in question) || question.required);

	if (_state) restoreState(_state);

	function restoreState(state: Partial<SurveyState>) {
		if (!state) return;

		if (state.status) status = state.status;

		// first update the answer of each question
		if (state.answers) {
			answers = [];
			for (const answer of state.answers) {
				const question = questions.find((q) => q.id === answer.id);
				if (question) {
					question.answer = answer.answer;
					if ('score' in answer) question.score = answer.score;
					answers.push(question);
				}
			}
		}
		if (state.current) {
			const currentQuestion = questions.find((q) => q.id === state.current);
			if (currentQuestion) question = currentQuestion;
			question = questions.find((q) => q.id === state.current)!;
		}
	}

	function goNext() {
		if (!validate()) return false;
		confirmed = false;
		status = 'en proceso';

		// contesté una nueva pregunta

		// verifico si la pregunta no existía en la historia
		if (answers.findIndex((a) => a.id === question.id) === -1) {
			answers = [...answers, question];
		}

		if (next === null) return true; // end of survey

		// la proxima pregunta ya está en la historia
		// volver atrás
		const historyIndex = answers.findIndex((q) => q.id === next);
		if (historyIndex !== -1) {
			// get index of current and next question
			const currentIndex = answers.findIndex((q) => q.id === question.id);
			const nextIndex = answers.findIndex((q) => q.id === next);

			// the next question is a previous questions, truncate history
			const isPrevious = nextIndex < currentIndex;
			if (isPrevious) answers = answers.slice(0, historyIndex);
		}

		question = questions.find((p) => p.id === next)!; // go to next question

		onskip(surveyState());

		return true;
	}

	function calculateNext(question: Question, questions: Question[]) {
		let next = customNextQuestion(question);

		// a next question has been explicitly set depending on current answer
		if (next !== undefined) return next;

		const index = questions.findIndex((p) => p.id === question.id);

		// reached end
		if (index >= questions.length - 1) return null;

		// return next question
		return questions[index + 1].id;
	}

	function customNextQuestion(question: Question) {
		if (!question) return undefined;

		const { type, answer, next } = question;

		if (!answer) return next;

		// single or multiple
		if ('options' in question) {
			// normalize options
			const options = question.options.map(toOption);
			for (const option of options) {
				let isSelected = false;
				if (type === 'single' && option.id === answer) isSelected = true;
				if (type === 'multiple' && answer.includes(option.id)) isSelected = true;

				if (isSelected) return option.next === undefined ? next : option.next;
			}
			// check for other selected, answer is not empty, but it doesn't match any option
			if (answer && typeof question.other === 'object' && question.other.next) {
				return question.other.next;
			}
		}

		// for other kind of questions return next
		return next;
	}

	function goPrev() {
		confirmed = false;

		const prev = calculatePrev(question, answers, questions);

		if (!prev) return;

		question = questions.find((p) => p.id === prev)!;

		// if (answers.length <= 0) return;
		// question = answers.at(-1)!;
		// answers = answers.slice(0, -1); // test do not remove answers!
		onskip(surveyState());
	}

	function calculatePrev(question: Question, answers: Question[], questions: Question[]) {
		// currently at first question, can't go back
		if (question.id === questions[0].id) return null;

		// no question has been answered yet, can't go back
		if (answers.length === 0) return null;

		const index = answers.findIndex((p) => p.id === question.id);
		// question has not been answered yet, go back to last answered question
		if (index === -1) return answers[answers.length - 1].id;

		// currently at the first answered question -> isFirst
		if (index === 0) return null;

		// return previous answered question
		return answers[index - 1].id;
	}

	function validate() {
		confirmed = true;
		if (!isValid) {
			shake = true;
			setTimeout(() => (shake = false), 1000);
		}
		return isValid;
	}

	function finish() {
		// check for required answer and update survey with the effectively answered questions (question history path)
		if (!goNext()) return;
		finished = true;
		status = 'finalizado';
		if (!outro) {
			save();
			close();
		}
	}

	function save() {
		onsave(surveyState());
		saved = true;
	}

	function close() {
		onclose(surveyState());
	}

	function onupdate(answer: Survey['questions'][number]['answer'], score?: number) {
		question.answer = answer;
		if (score !== undefined && 'weight' in question) question.score = score;
	}

	function answerNumber(question: Question) {
		const index = answers.findIndex((a) => a.id === question.id);
		return (index === -1 ? answers.length : index) + 1;
	}

	function isFirst(question: Question) {
		return answerNumber(question) === 1;
	}

	function surveyState(): SurveyState {
		return $state.snapshot({
			status,
			answers: answers.map(toAnswer),
			current: question.id,
			score: calculateScore(answers),
		});
	}

	export type Answer = Pick<Question, 'id' | 'code' | 'answer' | 'score'>;

	function toAnswer(q: Question) {
		let answer: Answer = { id: q.id, code: q.code, answer: q.answer };
		if ('score' in q) answer.score = q.score;
		return answer;
	}

	function calculateScore(questions: Question[]) {
		let score = 0;
		for (const question of questions) {
			if ('score' in question && question.score !== undefined) score += question.score;
		}
		return round(score, 4);
	}
</script>

<div
	class={cn('rounded-[0.5rem] bg-background sm:border sm:shadow-xl', className)}
	class:animate-shake={shake}
>
	<div class="space-y-6 p-6 sm:p-10 md:block">
		{#if status === 'creado' && intro && survey.intro}
			<Message text={survey.intro}>
				{#snippet footer()}
					<div class="flex justify-center pt-4">
						<Button onclick={() => (intro = false)}>Comenzar</Button>
					</div>
				{/snippet}
			</Message>
		{:else if finished && outro}
			<Message text={outro}>
				{#snippet footer()}
					<div class="flex justify-center pt-4">
						{#if !saved}
							<Button onclick={save}>Grabar respuesta</Button>
						{:else}
							<Button onclick={close}>Ok</Button>
						{/if}
					</div>
				{/snippet}
			</Message>
		{:else if status === 'finalizado'}
			<Message text="La encuesta ya ha sido completada">
				{#snippet footer()}
					<div class="flex justify-center pt-4">
						<Button onclick={close}>Ok</Button>
					</div>
				{/snippet}
			</Message>
		{:else}
			<div class="space-y-1">
				<h2 class="text-xl font-bold tracking-tight">{survey.title}</h2>
				{#if survey.description}
					<p class="text-muted-foreground">{survey.description}</p>
				{/if}
			</div>

			<Separator class="my-6" />

			<div class="space-y-0.5">
				<h3 class="text-lg font-medium" class:text-destructive={isError}>
					{question.code || answerNumber(question)}. {question.title}
					{#if required}
						<span class="text-destructive">*</span>
					{/if}
				</h3>
				{#if isError}
					<p class="text-sm text-destructive">Debe completar esta pregunta</p>
				{/if}
				{#if question.subtitle}
					<p class="text-sm text-muted-foreground">{question.subtitle}</p>
				{/if}
			</div>

			{#key question.id}
				{#if question.type === 'single'}
					<Single bind:isValid {question} {onupdate} />
				{:else if question.type === 'grid-single'}
					<GridSingle bind:isValid {confirmed} {question} {onupdate} />
				{:else if question.type === 'grid-api'}
					<GridApi bind:isValid {confirmed} {question} {onupdate} />
				{:else if question.type === 'multiple'}
					<Multiple bind:isValid {question} {onupdate} />
				{:else if question.type === 'rating'}
					<Rating bind:isValid {question} {onupdate} />
				{:else if question.type === 'text'}
					<Text bind:isValid {question} {onupdate} />
				{:else if question.type === 'grid-text'}
					<GridText bind:isValid {confirmed} {question} {onupdate} />
				{/if}
			{/key}

			<div class="flex justify-between pt-4">
				<Button class={isFirst(question) ? 'invisible' : ''} variant="outline" onclick={goPrev}>
					Anterior
				</Button>
				{#if next === null}
					<Button onclick={finish}>Finalizar</Button>
				{:else}
					<Button onclick={goNext}>Siguiente</Button>
				{/if}
			</div>
		{/if}
	</div>
</div>
