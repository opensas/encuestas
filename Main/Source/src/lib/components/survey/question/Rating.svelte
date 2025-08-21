<script lang="ts">
	import type { RatingQuestion } from '$lib/types';

	import { Button } from '$lib/components/ui/button';
	import { Slider } from '$lib/components/ui/slider';

	import { round } from '$lib/utils/number';

	import { Minus, Plus } from 'lucide-svelte';

	type Props = {
		question: RatingQuestion;
		onupdate?: (answer: number, score?: number) => void;
		isValid?: boolean;
	};

	let { question, onupdate = () => {}, isValid = $bindable(true) }: Props = $props();

	const min = question.min ?? 0;
	const max = question.max ?? min + 10;
	let weight = $derived(question.weight || 0);
	let answer = $state(question.answer || min);

	$effect(() => {
		const required = question.required ?? true;
		isValid = !required || (required && answer !== undefined);

		let score = undefined;
		if (weight !== undefined && 'scores' in question && question.scores) {
			const s = question.scores.find((score) => score.value === answer)?.score ?? 0; // question score
			score = round(s * weight, 4); // survey score, rounded to 4 decimals
		}

		onupdate(answer, score);
	});
</script>

<div class="space-y-2 p-4 pb-0">
	<div class="flex items-center justify-center space-x-2">
		<Button
			class="h-8 w-8 shrink-0 rounded-full"
			disabled={answer <= min}
			size="icon"
			variant="outline"
			onclick={() => answer--}
		>
			<Minus class="h-4 w-4" />
			<span class="sr-only">Sumar 1</span>
		</Button>
		<div class="flex-1 text-center">
			<div class="text-7xl font-bold tracking-tighter">
				{answer}
			</div>
			<div class="text-[0.70rem] uppercase text-muted-foreground">Puntaje</div>
		</div>
		<Button
			class="h-8 w-8 shrink-0 rounded-full"
			disabled={answer >= max}
			size="icon"
			variant="outline"
			onclick={() => answer++}
		>
			<Plus class="h-4 w-4" />
			<span class="sr-only">Restar 1</span>
		</Button>
	</div>
	<Slider bind:value={answer} {max} {min} step={1} type="single" />
</div>
