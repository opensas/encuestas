<script lang="ts">
	import Progress from '$lib/components/survey/Progress.svelte';
	import { Button } from '$lib/components/ui/button';

	let current = $state(0);
	let total = $state(5);
</script>

<div class="container mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-2xl font-bold">Progress Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Demos</h2>
			<Progress {current} {total} />

			<div class="mt-4 flex gap-2">
				<Button disabled={current === 0} onclick={() => current--}>Previous Question</Button>
				<Button disabled={current === total} onclick={() => current++}>Next Question</Button>
				<Button variant="outline" onclick={() => (current = 0)}>Reset</Button>
			</div>

			<p class="mt-2 text-sm text-muted-foreground">
				Current: {current} / {total} questions answered
			</p>
		</div>

		<div class="space-y-4">
			<h2 class="text-lg font-semibold">Static Demos</h2>

			<div class="rounded-lg border p-4">
				<h3 class="mb-2 font-medium">0% Complete (0/5)</h3>
				<Progress current={0} total={5} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-2 font-medium">40% Complete (2/5)</h3>
				<Progress current={2} total={5} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-2 font-medium">67% Complete (2/3)</h3>
				<Progress current={2} total={3} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-2 font-medium">100% Complete (5/5)</h3>
				<Progress current={5} total={5} />
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-2 font-medium">Edge Case: 0 Total Questions</h3>
				<Progress current={0} total={0} />
			</div>
		</div>
	</div>
</div>
