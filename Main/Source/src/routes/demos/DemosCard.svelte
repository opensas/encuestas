<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator';

	import { resolve } from '$app/paths';
	import type { RouteId } from '$app/types';
	import { ExternalLink } from 'lucide-svelte';

	type DemoItem = {
		name: string;
		href: RouteId;
		description: string;
	};

	type SeparatorItem = {
		name: string;
		type: 'separator';
	};

	type Demo = DemoItem | SeparatorItem;

	type Props = {
		demos: readonly Demo[];
		title: string;
		description?: string;
	};

	let { demos, title, description }: Props = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-xl font-semibold">{title}</Card.Title>
		{#if description}
			<Card.Description>{description}</Card.Description>
		{/if}
	</Card.Header>
	<Card.Content>
		<div class="space-y-4">
			{#each demos as demo (demo.name)}
				{#if 'type' in demo && demo.type === 'separator'}
					<Separator />
				{:else if 'href' in demo}
					<div class="p-3">
						<div class="flex items-center gap-3">
							<!-- eslint-disable @typescript-eslint/no-explicit-any -->
							<!-- Reason: resolve cannot recognize demo.href as a valid RouteId type, we bypass the verification. -->
							<a
								class="font-medium text-foreground transition-colors hover:text-primary"
								href={resolve(demo.href as any)}
							>
								{demo.name}
							</a>
							<ExternalLink class="h-4 w-4 opacity-50" />
						</div>
						<p class="mt-1 text-sm text-muted-foreground">{demo.description}</p>
					</div>
				{/if}
			{/each}
		</div>
	</Card.Content>
</Card.Root>
