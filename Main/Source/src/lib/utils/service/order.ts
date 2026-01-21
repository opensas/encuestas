import { checkInvalidFields, filterFields, type ServiceFields } from '$lib/utils/service/service';

export type ParsedOrderField = { field: string; direction: 'asc' | 'desc' };

export function parseOrder(
	orderString: string | undefined,
	serviceFields: ServiceFields,
	defaultOrder: string = ''
) {
	if (!orderString?.trim()) orderString = defaultOrder;

	const parsedOrder = orderString
		.split(',')
		.map((field) => ({
			field: parseField(field),
			direction: parseDirection(field),
		}))
		.filter((order) => !!order.field); // remove empty orders

	const fields = parsedOrder.map((order) => order.field);

	checkInvalidFields(fields, filterFields(serviceFields, 'order'));

	return parsedOrder;
}

const parseField = (field: string) => field.trim().replace(/^[-+]/, '');
const parseDirection = (order: string) => (order.trim().startsWith('-') ? 'desc' : 'asc');
