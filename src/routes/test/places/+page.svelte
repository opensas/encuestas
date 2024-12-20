<script lang="ts">
	import { flatten, flattenBy, places } from '$lib/places';

	const depto = {
		departamentoId: '001-001',
		departamento: '25 de mayo',
		localidades: [
			{ localidadId: '001-001-001', localidad: '25 de mayo' },
			{ localidadId: '001-001-002', localidad: 'Agustin Mosconi' },
			{ localidadId: '001-001-003', localidad: 'Del Valle' },
			{ localidadId: '001-001-004', localidad: 'Ernestina' },
		],
	};

	const deptos = flattenBy(depto, 'localidades');

	const flat = flatten(places);

	console.log('!!!', { depto, deptos });
	console.log('!!!', { places, flat });
</script>
