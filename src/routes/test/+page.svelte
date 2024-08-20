<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import Component from './Component.svelte';

	let component = Component;
	let value = 'val';
	let metadata = 'meta';
	let color = 'blue';

	let el: HTMLInputElement;
	let disable = false;
	let inputValue = '';
	let parameters = 'params';

	function action(node: HTMLInputElement, params: string) {
		console.log('action', { params, node });
	}

	function onchange(value: string) {
		console.log('onchange', { value });
	}
</script>

<h1>Hola!</h1>

<!-- ✓ GOOD -->
<svelte:component this={component} bind:value bind:metadata --style-props={color} {onchange} />
<input
	bind:this={el}
	id="foo"
	bind:value={inputValue}
	style="width: 150px;"
	style:color
	class="my-input"
	class:disable
	class:enable={!disable}
	use:action={parameters}
	transition:fade
/>

<input
	bind:this={el}
	id="foo"
	bind:value={inputValue}
	style="width: 150px;"
	style:color
	class="my-input"
	class:disable
	class:enable={!disable}
	use:action={parameters}
	in:fly
	out:fly
/>
