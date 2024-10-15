const selCommon = (select: boolean = false) => {
	return {
		createdAt: select,
		updatedAt: select,
		createdBy: select,
		updatedBy: select,
	};
};

const create = () => {
	return {
		createdAt: new Date(),
		updatedAt: new Date(),
		createdBy: 1,
		updatedBy: 1,
	};
};

const update = () => {
	return {
		updatedAt: new Date(),
		updatedBy: 1,
	};
};

const record = (obj: any) => {
	const o = { ...obj };

	delete o['createdAt'];
	delete o['updatedAt'];
	delete o['createdBy'];
	delete o['updatedBy'];

	return o;
};

const select = (fields: any, select?: any): any => {
	const sel: any = select || {};

	if (select === undefined) {
		for (const [key, value] of Object.entries(fields)) {
			sel[key] = true;
		}
	}

	return { ...sel, ...selCommon(false) };
};

export const commonFields = { create, update, record, select };
