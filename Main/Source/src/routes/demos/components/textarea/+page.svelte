<script lang="ts">
	import { Textarea } from '$lib/components';
	import { Button } from '$lib/components/ui/button';

	let basicValue = '';
	let numbersOnlyValue = '';
	let lettersOnlyValue = '';
	let alphanumericValue = '';
</script>

<div class="container mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-2xl font-bold">Textarea Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Basic Textarea</h2>
			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium" for="basic-textarea"
						>Standard Textarea</label
					>
					<Textarea
						id="basic-textarea"
						bind:value={basicValue}
						placeholder="Type your message here..."
					/>
					{#if basicValue}
						<p class="mt-1 text-sm text-muted-foreground">Current value: "{basicValue}"</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Character Filtering</h2>
			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium" for="numbers-textarea">Numbers Only</label>
					<Textarea
						id="numbers-textarea"
						bind:value={numbersOnlyValue}
						allowedChars="numbers"
						placeholder="Type numbers only..."
					/>
					{#if numbersOnlyValue}
						<p class="mt-1 text-sm text-muted-foreground">Value: "{numbersOnlyValue}"</p>
					{/if}
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium" for="letters-textarea">Letters Only</label>
					<Textarea
						id="letters-textarea"
						bind:value={lettersOnlyValue}
						allowedChars="letters"
						placeholder="Type letters only..."
					/>
					{#if lettersOnlyValue}
						<p class="mt-1 text-sm text-muted-foreground">Value: "{lettersOnlyValue}"</p>
					{/if}
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium" for="alphanumeric-textarea"
						>Alphanumeric</label
					>
					<Textarea
						id="alphanumeric-textarea"
						bind:value={alphanumericValue}
						allowedChars="alphanumeric"
						placeholder="Type letters and numbers..."
					/>
					{#if alphanumericValue}
						<p class="mt-1 text-sm text-muted-foreground">Value: "{alphanumericValue}"</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Size Variations</h2>
			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium" for="small-textarea">Small (min-h-16)</label
					>
					<Textarea id="small-textarea" class="min-h-16" placeholder="Small textarea..." />
				</div>
				<div>
					<label class="mb-2 block text-sm font-medium" for="default-textarea"
						>Default (min-h-20)</label
					>
					<Textarea id="default-textarea" placeholder="Default enhanced textarea..." />
				</div>
				<div>
					<label class="mb-2 block text-sm font-medium" for="large-textarea">Large (min-h-32)</label
					>
					<Textarea id="large-textarea" class="min-h-32" placeholder="Large textarea..." />
				</div>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Demo</h2>
			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium" for="interactive-textarea">
						Interactive Textarea with Actions
					</label>
					<Textarea
						id="interactive-textarea"
						bind:value={basicValue}
						placeholder="Type something..."
					/>
				</div>
				<div class="flex gap-2">
					<Button variant="outline" onclick={() => (basicValue = '')}>Clear</Button>
					<Button variant="outline" onclick={() => (basicValue = 'Sample text content')}
						>Fill Sample</Button
					>
					<Button variant="outline" onclick={() => (basicValue = basicValue.toUpperCase())}>
						Uppercase
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
