<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';

	let code = 'short';

	let callback = '/test/callback/api';

	let reference = '';

	let params: Param[] = [];
	let newParam: Param = { key: '', value: '' };

	type Param = { key: string; value: string };

	const SURVEY_URL = '/encuestas/';

	$: url = buildUrl(code, callback, reference, params);

	function addParam() {
		params = [...params, newParam];
		newParam = { key: '', value: '' };
	}

	function removeParam(index: number) {
		params = params.filter((_, i) => i !== index);
	}

	function buildUrl(code: string, callback: string, reference: string, params: Param[]) {
		const query = [...params];
		if (callback) query.push({ key: 'callback', value: callback });
		if (reference) query.push({ key: 'reference', value: reference });

		let queryParams = query
			.map(({ key, value }) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
			.join('&');

		if (queryParams) queryParams = `?${queryParams}`;

		return `${SURVEY_URL}${code}${queryParams}`;
	}
</script>

<div class="flex h-screen items-center justify-center px-2 sm:px-10">
	<div class="grid min-w-[640px] gap-4 rounded-sm bg-background p-4 sm:border sm:shadow-xl">
		<h2 class="text-xl font-bold tracking-tight">Encuesta callback demo page</h2>

		<p class="grid gap-2 text-sm text-muted-foreground">
			CODE:
			<Input bind:value={code} />
		</p>

		<p class="grid gap-2 text-sm text-muted-foreground">
			REFERENCE:
			<Input bind:value={reference} />
		</p>

		<p class="grid gap-2 text-sm text-muted-foreground">
			CALLBACK:
			<Input bind:value={callback} />
		</p>

		<div class="grid gap-2 text-sm text-muted-foreground">
			<p>NEW PARAM:</p>
			<div class="flex gap-2">
				<Input bind:value={newParam.key} placeholder="new key" />
				<span class="self-center font-bold">:</span>
				<Input bind:value={newParam.value} placeholder="new value" />
				<Button class="w-32" on:click={addParam}>Add</Button>
			</div>
			{#each params as param, index}
				<div class="flex gap-2">
					<Input bind:value={param.key} placeholder="key" />
					<span class="self-center font-bold">:</span>
					<Input bind:value={param.value} placeholder="value" />
					<Button class="w-32" on:click={() => removeParam(index)}>Del</Button>
				</div>
			{/each}
		</div>

		<Separator />

		<p class="flex items-center gap-2 align-middle text-sm text-muted-foreground">
			URL:
			<a
				class="font-medium transition-colors hover:text-accent-foreground hover:underline"
				href={url}
			>
				{url}
			</a>
			<Button href={url}>Go!</Button>
		</p>
	</div>
</div>
