<script lang="ts">
	import type { RatingQuestion } from '$lib/types';

	import { Button } from '$lib/components/ui/button';
	import { Slider } from '$lib/components/ui/slider';

	import { Minus, Plus } from 'lucide-svelte';

	export let question: RatingQuestion;
	export let onupdate: (respuesta: number) => void = () => {};
	export let isValid = true;

	let answer = question.answer || 0;
	let slider = [answer];

	$: required = question.required ?? true;
	$: isValid = !required || (required && answer !== undefined);

	$: answer = slider[0];
	$: onupdate(answer);

	function updateSlider(value: number) {
		slider = [answer + value];
	}
</script>

<div class="space-y-2 p-4 pb-0">
	<div class="flex items-center justify-center space-x-2">
		<Button
			class="h-8 w-8 shrink-0 rounded-full"
			disabled={answer <= 0}
			size="icon"
			variant="outline"
			on:click={() => updateSlider(-1)}
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
			disabled={answer >= 10}
			size="icon"
			variant="outline"
			on:click={() => updateSlider(1)}
		>
			<Plus class="h-4 w-4" />
			<span class="sr-only">Restar 1</span>
		</Button>
	</div>
	<Slider bind:value={slider} max={10} step={1} />
</div>
