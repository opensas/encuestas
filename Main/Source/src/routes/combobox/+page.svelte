<script lang="ts">
	import { Combobox, Select } from '$lib/components';

	const options = [
		{ value: 'sveltekit', label: 'SvelteKit' },
		{ value: 'next.js', label: 'Next.js' },
		{ value: 'remix1', label: 'Remix1' },
		{ value: 'remix2', label: 'Remix2' },
		{ value: 'remix3', label: 'Remix3' },
		{ value: 'remix4', label: 'Remix4' },
		{ value: 'astro', label: 'Astro' },
		{ value: 'astro1', label: 'Astro1' },
		{ value: 'astro2', label: 'Astro2' },
		{ value: 'astro3', label: 'Astro3' },
		{ value: 'astro4', label: 'Astro4' },
		{ value: 'astro5', label: 'Astro5' },
	];
</script>

<div class="--items-center mt-[20%] grid h-screen w-full justify-center">
	<div class="space-y-4">
		<Combobox {options} />
		<hr />
		<Select {options} />
	</div>
</div>
