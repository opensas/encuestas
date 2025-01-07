export const places = [
	{
		provinciaId: '001',
		provincia: 'Buenos Aires',
		departamentos: [
			{
				departamentoId: '001-001',
				departamento: '25 de mayo',
				localidades: [
					{ localidadId: '001-001-001', localidad: '25 de mayo' },
					{ localidadId: '001-001-002', localidad: 'Agustin Mosconi' },
					{ localidadId: '001-001-003', localidad: 'Del Valle' },
					{ localidadId: '001-001-004', localidad: 'Ernestina' },
				],
			},
			{
				departamentoId: '001-002',
				departamento: '9 de julio',
				localidades: [
					{ localidadId: '001-002-001', localidad: '12 de octubre' },
					{ localidadId: '001-002-002', localidad: '9 de julio' },
					{ localidadId: '001-002-003', localidad: 'Alfredo Demarchi' },
					{ localidadId: '001-002-004', localidad: 'Ernestina' },
				],
			},
		],
	},
	{
		provinciaId: '002',
		provincia: 'Catamarca',
		departamentos: [
			{
				departamentoId: '002-001',
				departamento: 'Ambato',
				localidades: [
					{ localidadId: '002-001-001', localidad: 'Chuchucaruana' },
					{ localidadId: '002-001-002', localidad: 'Colpes' },
					{ localidadId: '002-001-003', localidad: 'El Bolson' },
				],
			},
			{
				departamentoId: '002-002',
				departamento: 'Ancasti',
				localidades: [
					{ localidadId: '002-002-001', localidad: 'Ancasti' },
					{ localidadId: '002-002-002', localidad: 'Anquincila' },
					{ localidadId: '002-002-003', localidad: 'La Candelaria' },
					{ localidadId: '002-002-004', localidad: 'La majada' },
				],
			},
		],
	},
];

export const places2 = [
	{
		provinciaId: '001',
		provincia: 'Buenos Aires',
		departamentos: [
			{
				departamentoId: '001-001',
				departamento: '25 de mayo',
				localidades: [
					{ localidadId: '001-001-001', localidad: '25 de mayo' },
					{ localidadId: '001-001-002', localidad: 'Agustin Mosconi' },
				],
			},
		],
	},
];

export const flat = [
	{
		provinciaId: '001',
		provincia: 'Buenos Aires',
		departamentoId: '001-001',
		departamento: '25 de mayo',
		localidadId: '001-001-001',
		localidad: '25 de mayo',
	},
	{
		provinciaId: '001',
		provincia: 'Buenos Aires',
		departamentoId: '001-001',
		departamento: '25 de mayo',
		localidadId: '001-001-002',
		localidad: 'Agustin Mosconi',
	},
];

export function flatten(items: typeof places) {
	// Flattening
	const flat = items.flatMap((provincia) =>
		flattenBy(provincia, 'departamentos').flatMap((departamento) =>
			flattenBy(departamento, 'localidades')
		)
	);
	return flat;
}

type Flatten<T extends object, K extends keyof T> = Omit<T, K> &
	(T[K] extends Array<infer U> ? U : never);

export function flattenBy<T extends object, K extends keyof T>(
	obj: T,
	arrayKey: K
): Flatten<T, K>[] {
	const children = obj[arrayKey] as unknown as Array<object>;
	const parent = { ...obj };
	delete parent[arrayKey]; // Remove the array property from the base object

	return children.map((item) => ({ ...parent, ...item })) as Flatten<T, K>[];
}
