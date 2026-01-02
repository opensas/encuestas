<script lang="ts">
	import type { Snippet } from 'svelte';

	import { micromark } from 'micromark';

	type Props = { text: string; footer?: Snippet };
	let { text, footer }: Props = $props();

	let html = $derived(parse(text));

	function parse(text: string) {
		const TAB = '\t';
		return micromark(text.replaceAll(TAB, ''));
	}
</script>

<div class="markdown">
	<!-- eslint-disable svelte/no-at-html-tags -->
	{@html html}
</div>

{@render footer?.()}
