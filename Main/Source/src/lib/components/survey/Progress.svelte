<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';

	type Props = { current: number; total: number };

	let { total, current }: Props = $props();

	let percentage = $derived(total > 0 ? Math.round((current / total) * 100) : 0);
</script>

<div class="w-full">
	<!-- Progress bar with question counter -->
	<div class="mb-2 flex items-center justify-between">
		<div class="flex-1">
			<Progress value={percentage} class="--bg-gray-200 h-2 dark:bg-inherit" />
		</div>
		<div class="ml-4 min-w-fit text-sm font-medium text-gray-500">
			{current} / {total}
		</div>
	</div>

	<!-- Centered percentage -->
	<div class="text-center">
		<span class="text-sm font-medium text-gray-500">
			{percentage}% completado
		</span>
	</div>
</div>
