<script lang="ts">
	import { Input } from '$lib/components';
	import { Button } from '$lib/components/ui/button';

	let basicValue = '';
	let numbersOnlyValue = '';
	let lettersOnlyValue = '';
	let alphanumericValue = '';
	let emailValue = '';
	let passwordValue = '';
</script>

<div class="container mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-2xl font-bold">Input Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Basic Input</h2>
			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium" for="basic-input">Standard Input</label>
					<Input id="basic-input" bind:value={basicValue} placeholder="Type your text here..." />
					{#if basicValue}
						<p class="mt-1 text-sm text-muted-foreground">Current value: "{basicValue}"</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Input Types</h2>
			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium" for="email-input">Email Input</label>
					<Input
						id="email-input"
						bind:value={emailValue}
						placeholder="user@example.com"
						type="email"
					/>
				</div>
				<div>
					<label class="mb-2 block text-sm font-medium" for="password-input">Password Input</label>
					<Input
						id="password-input"
						bind:value={passwordValue}
						placeholder="Enter password"
						type="password"
					/>
				</div>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Character Filtering</h2>
			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium" for="numbers-input">Numbers Only</label>
					<Input
						id="numbers-input"
						bind:value={numbersOnlyValue}
						allowedChars="numbers"
						placeholder="123456"
					/>
					{#if numbersOnlyValue}
						<p class="mt-1 text-sm text-muted-foreground">Value: "{numbersOnlyValue}"</p>
					{/if}
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium" for="letters-input">Letters Only</label>
					<Input
						id="letters-input"
						bind:value={lettersOnlyValue}
						allowedChars="letters"
						placeholder="abcdef"
					/>
					{#if lettersOnlyValue}
						<p class="mt-1 text-sm text-muted-foreground">Value: "{lettersOnlyValue}"</p>
					{/if}
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium" for="alphanumeric-input">Alphanumeric</label
					>
					<Input
						id="alphanumeric-input"
						bind:value={alphanumericValue}
						allowedChars="alphanumeric"
						placeholder="abc123"
					/>
					{#if alphanumericValue}
						<p class="mt-1 text-sm text-muted-foreground">Value: "{alphanumericValue}"</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Input States</h2>
			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium" for="disabled-input">Disabled Input</label>
					<Input id="disabled-input" disabled placeholder="This input is disabled" />
				</div>
				<div>
					<label class="mb-2 block text-sm font-medium" for="readonly-input">Readonly Input</label>
					<Input id="readonly-input" value="This input is readonly" readonly />
				</div>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Demo</h2>
			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium" for="interactive-input">
						Interactive Input with Actions
					</label>
					<Input id="interactive-input" bind:value={basicValue} placeholder="Type something..." />
				</div>
				<div class="flex gap-2">
					<Button variant="outline" onclick={() => (basicValue = '')}>Clear</Button>
					<Button variant="outline" onclick={() => (basicValue = 'Sample text')}>Fill Sample</Button
					>
					<Button variant="outline" onclick={() => (basicValue = basicValue.toUpperCase())}>
						Uppercase
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
