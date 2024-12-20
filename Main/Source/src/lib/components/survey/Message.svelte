<script lang="ts">
	export let text: string;

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

	$: ({ header, body } = parseText(text));
</script>

<h3 class="text-xl font-medium">{header}</h3>
{#each body as paragraph}
	<p>{paragraph}</p>
{/each}
<slot name="footer"></slot>
