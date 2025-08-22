<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { text: string; footer?: Snippet };
	let { text, footer }: Props = $props();

	let { header, body } = $derived(parseText(text));

	function parseText(text: string) {
		const CR = '\n';
		const TAB = '\t';

		let parsed = text
			.replaceAll(TAB, '') // cleanup
			.split(CR) // split
			.filter(Boolean); // remove empty lines

		const [header, ...body] = parsed;
		return { header, body };
	}
</script>

<h3 class="text-xl font-medium">{header}</h3>
{#each body as paragraph, index (index)}
	<p>{paragraph}</p>
{/each}
{@render footer?.()}
