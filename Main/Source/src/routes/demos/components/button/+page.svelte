<script lang="ts">
	import { Button } from '$lib/components';

	import { Minus, Moon, Plus, QrCode, Sun } from '@lucide/svelte/icons';

	let count = 0;
</script>

<div class="container mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-2xl font-bold">Button Demo</h1>

	<div class="space-y-8">
		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Button Variants</h2>
			<div class="flex flex-wrap gap-4">
				<Button variant="default">Default</Button>
				<Button variant="destructive">Destructive</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="link">Link</Button>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Buttons with Icons</h2>
			<div class="flex flex-wrap gap-4">
				<Button variant="default">
					<Plus />
					Add Item
				</Button>
				<Button variant="outline">
					<Minus />
					Remove Item
				</Button>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Interactive Counter</h2>
			<div class="space-y-4">
				<div class="flex items-center gap-4">
					<Button variant="outline" onclick={() => count--}>
						<Minus />
						Decrease
					</Button>
					<span class="w-16 text-center font-mono text-xl">{count}</span>
					<Button variant="default" onclick={() => count++}>
						<Plus />
						Increase
					</Button>
				</div>
				<p class="text-sm text-muted-foreground">
					Current count: {count}
				</p>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Icon Buttons</h2>
			<div class="space-y-4">
				<div class="flex flex-wrap gap-4">
					<Button size="icon" variant="default">
						<Plus />
						<span class="sr-only">Add</span>
					</Button>
					<Button size="icon" variant="outline">
						<Minus />
						<span class="sr-only">Remove</span>
					</Button>
					<Button size="icon" variant="secondary">
						<QrCode />
						<span class="sr-only">QR Code</span>
					</Button>
				</div>
				<p class="text-sm text-muted-foreground">Square buttons designed specifically for icons</p>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Theme Toggle Example</h2>
			<div class="space-y-4">
				<Button size="icon" variant="outline">
					<Sun
						class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
				<p class="text-sm text-muted-foreground">Theme toggle button with animated icons</p>
			</div>
		</div>

		<div class="rounded-lg border p-6">
			<h2 class="mb-4 text-lg font-semibold">Button States</h2>
			<div class="flex flex-wrap gap-4">
				<Button disabled variant="default">Disabled Default</Button>
				<Button disabled variant="outline">Disabled Outline</Button>
				<Button disabled size="icon" variant="default">
					<Plus />
					<span class="sr-only">Disabled Icon</span>
				</Button>
			</div>
		</div>
	</div>
</div>
