// run with `bun transform.ts `

import fs from 'fs';

import { data } from './data';

export type Data = [string, string?, string?][];

export const raw = [
	['Buenos Aires', '25 DE MAYO', '25 DE MAYO'],
	['Buenos Aires', '25 DE MAYO', 'VALDES'],
	['Buenos Aires', '9 DE JULIO', '12 DE OCTUBRE'],
	['Buenos Aires', '9 DE JULIO', 'VILLA GENERAL FOURNIER'],
	['Catamarca', 'ANDALGALÁ', 'CHOYA'],
	['Catamarca', 'ANDALGALÁ', 'LA MESADA'],
	['Catamarca', 'ANTOFAGASTA DE LA SIERRA', 'ANTOFAGASTA DE LA SIERRA'],
	['Catamarca', 'ANTOFAGASTA DE LA SIERRA', 'EL PEÑON'],
	['caba'],
	['Chubut', 'YERBA MALA'],
	['Chubut', 'YERBA PESIMA'],
	['Tucuman', 'YERBA BUENA'],
	['Tucuman', 'YERBA BUENA', 'MARCOS PAZ'],
] satisfies Data;

function main() {
	const upper = toUpper(data);
	const joined = join(upper);
	const transformed = provincias(joined);

	fs.writeFileSync(
		'./transformed.js',
		`export const data = ${JSON.stringify(transformed, null, 2)}`
	);
}

function toUpper(data: string[][]) {
	return data.map((row) => row.map((value) => (value || '').toUpperCase()));
}

function join(data: string[][]): Data {
	return data.map((row) => [
		row[PROVINCIAS],
		row[DEPARTAMENTOS],
		row.slice(LOCALIDADES).join(' - '),
	]);
}

const PROVINCIAS = 0;
const DEPARTAMENTOS = 1;
const LOCALIDADES = 2;

function provincias(data: Data) {
	const grouped = groupBy(data, PROVINCIAS);

	return Object.keys(grouped).map((provincia) => ({
		id: normalize(provincia),
		nombre: provincia,
		departamentos: departamentos(grouped[provincia]),
	}));
}

function departamentos(data: Data) {
	const grouped = groupBy(data, DEPARTAMENTOS);

	return Object.keys(grouped)
		.filter((depto) => !!depto)
		.map((depto) => ({
			id: normalize(depto),
			nombre: depto,
			localidades: localidades(grouped[depto]),
		}));
}

function localidades(data: Data) {
	return data
		.filter((item) => !!item[LOCALIDADES])
		.map((item) => ({
			id: normalize(item[LOCALIDADES]),
			nombre: item[LOCALIDADES],
		}));
}

main();

function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
	return arr.reduce((acc: Record<string, T[]>, obj: T) => {
		if (obj[key] === undefined || obj[key] === null) return acc;

		const keyValue = obj[key].toString();

		if (!acc[keyValue]) acc[keyValue] = [];
		acc[keyValue].push(obj);
		return acc;
	}, {});
}

function normalize(value?: string) {
	return (value || '')
		.toLowerCase()
		.replace(/\s+/g, '-') // replace spaces with '-'
		.normalize('NFD') // decompose accents and signs
		.replace(/[\u0300-\u036f]/g, '') // remove accents and signs
		.replace(/[^\w-]/g, ''); // remove non-word characters
}
