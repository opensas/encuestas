import { data } from './data';

export type Provincia = {
	id: string;
	nombre: string;
	departamentos?: Departamento[];
};

type Departamento = {
	id: string;
	nombre: string;
	localidades?: Localidad[];
};
type Localidad = {
	id: string;
	nombre: string;
};

function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	const copy = { ...obj };
	for (const key of keys) delete copy[key];
	return copy;
}

export function getProvincias() {
	return data.map((provincia) => omit(provincia, ['departamentos']));
}

export function getProvincia(provinciaId: Provincia['id']) {
	const provincia = data.find((provincia) => provincia.id === provinciaId);
	if (!provincia) return undefined;
	return { ...provincia, departamentos: getDepartamentos(provinciaId) };
}

export function getDepartamentos(provinciaId: Provincia['id']) {
	const provincia = data.find((provincia) => provincia.id === provinciaId);
	if (!provincia) return undefined;
	if (!provincia.departamentos) return [];
	return provincia.departamentos.map((departamento) => omit(departamento, ['localidades']));
}
export function getDepartamento(provinciaId: Provincia['id'], departamentoId: Departamento['id']) {
	const provincia = data.find((provincia) => provincia.id === provinciaId);
	if (!provincia) return undefined;

	const departamento = provincia.departamentos.find(
		(departamento) => departamento.id === departamentoId
	);

	return departamento || undefined;
}
export function getLocalidades(provinciaId: Provincia['id'], departamentoId: Departamento['id']) {
	const departamento = getDepartamento(provinciaId, departamentoId);
	if (!departamento) return undefined;

	return departamento.localidades || [];
}
