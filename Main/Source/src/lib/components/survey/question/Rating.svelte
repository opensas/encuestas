<script lang="ts">
	import type { RatingQuestion } from '$lib/types';

	import { Button } from '$lib/components/ui/button';
	import { Slider } from '$lib/components/ui/slider';

	import { Minus, Plus } from 'lucide-svelte';

	type Props = {
		question: RatingQuestion;
		onupdate?: (answer: number) => void;
		isValid?: boolean;
	};

	let { question, onupdate = () => {}, isValid = $bindable(true) }: Props = $props();

	let answer = $state(question.answer || 0);

	$effect(() => {
		const required = question.required ?? true;
		isValid = !required || (required && answer !== undefined);
		onupdate(answer);
	});
</script>

<div class="space-y-2 p-4 pb-0">
	<div class="flex items-center justify-center space-x-2">
		<Button
			class="h-8 w-8 shrink-0 rounded-full"
			disabled={answer <= 0}
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
			disabled={answer >= 10}
			size="icon"
			variant="outline"
			onclick={() => answer++}
		>
			<Plus class="h-4 w-4" />
			<span class="sr-only">Restar 1</span>
		</Button>
	</div>
	<Slider bind:value={answer} max={10} step={1} type="single" />
</div>
