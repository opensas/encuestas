<script lang="ts">
	export let value = 'sas';
	export let onchange: (value: string) => void = () => {};
	export let metadata = '';

	$: onchange(value);

	$: console.log({ value });
</script>

<input bind:value data-metadata={metadata} />
