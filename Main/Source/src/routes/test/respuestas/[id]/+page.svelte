<script lang="ts">
	let { data } = $props();

	const { respuesta } = data;

	const { respuestaId, tipoEncuestaId, encuesta, estado, respuestas, fechaInsert } = respuesta!;

	console.log({ respuesta });
</script>

<div class="flex h-screen flex-col items-center justify-center px-2 sm:px-10">
	<div class="space-y-6 rounded-[0.5rem] bg-background p-6 sm:border sm:p-10 sm:shadow-xl md:block">
		<table class="table-auto">
			<tbody class="bg-white even:bg-gray-100">
				<tr class="border-b border-gray-200 bg-white even:bg-gray-100 hover:bg-gray-200">
					<td class="bg-gray-400 px-6 py-4 text-center text-2xl font-bold" colspan="2">
						Respuesta {respuestaId}
					</td>
				</tr>
				{@render row('Id', respuestaId)}
				{@render row('Tipo', tipoEncuestaId)}
				{@render row('Encuesta', encuesta)}
				{@render row('Estado', estado)}
				{@render row('Respuestas', respuestas)}
				{@render row('Creación', fechaInsert)}
			</tbody>
		</table>
	</div>
</div>

{#snippet row(title: string, text: number | string | Date | null)}
	<tr class="border-b border-gray-200 bg-white even:bg-gray-100 hover:bg-gray-200">
		<td class="px-6 py-4 font-semibold">{title}</td>
		<td class="px-6 py-4">{(text || '').toString()}</td>
	</tr>
{/snippet}
