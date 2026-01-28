<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { data } = $props();

	let { respuestas, page, limit } = $derived(data);

	function goToPage(page: number) {
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(`?page=${page}&limit=${limit}`);
	}

	$effect(() => console.log({ respuestas, page, limit }));
</script>

<div class="flex h-screen flex-col items-center justify-center px-2 sm:px-10">
	<div class="space-y-6 rounded-xl bg-background p-6 sm:border sm:p-10 sm:shadow-xl md:block">
		<h2 class="mb-4 w-full text-center text-2xl font-bold">Respuestas</h2>
		<table class="table-auto">
			<thead>
				<tr class="bg-gray-400">
					<th class="px-6 py-3">ID</th>
					<th class="px-6 py-3">Código</th>
					<th class="px-6 py-3">Estado</th>
				</tr>
			</thead>
			<tbody class="bg-white">
				{#each respuestas as { respuestaId, tipoEncuestaId, estado } (respuestaId)}
					<tr
						class="cursor-pointer border-b border-gray-200 bg-white even:bg-gray-100 hover:bg-gray-200"
						onclick={() => goto(resolve('/demos/respuestas/[id]', { id: respuestaId.toString() }))}
					>
						<td class="px-6 py-4">{respuestaId}</td>
						<td class="px-6 py-4">{tipoEncuestaId}</td>
						<td class="px-6 py-4">{estado}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="mt-6 flex items-center justify-between gap-4">
		<button
			class="rounded-lg border px-4 py-2 text-sm font-medium transition enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
			disabled={page <= 1}
			onclick={() => goToPage(page - 1)}
		>
			← Prev
		</button>

		<span class="text-sm text-gray-600">
			Page <strong>{page}</strong>
		</span>

		<button
			class="rounded-lg border px-4 py-2 text-sm font-medium transition enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
			disabled={respuestas.length < limit}
			onclick={() => goToPage(page + 1)}
		>
			Next →
		</button>
	</div>
</div>
