import { Prisma, PrismaClient } from '@prisma/client';
import { commonFields } from '$lib/api/common_fields';
import { handleAnswer } from './answer';
import { handleSurvey } from './survey';
import { cleanPrefixId, modelPrefix, setPrefixId } from './misc';

export type Models = keyof Omit<
	PrismaClient,
	'disconnect' | 'connect' | 'executeRaw' | 'queryRaw' | 'transaction' | 'on'
>;

const prismaService = new PrismaClient().$extends({
	model: {
		// Extend all models
		$allModels: {
			async record<Model, Args>(strId: string): Promise<Prisma.Result<Model, Args, 'findUnique'>> {
				let id = cleanPrefixId(strId);
				let params: any = { where: { id } };

				let rec: any = await (this as any).findUnique(params);

				rec.id = setPrefixId(rec.id, modelPrefix[(this as any).name.toLowerCase()]);

				if ((this as any).modelToObject) {
					rec = (this as any).modelToObject(rec, this);
				}

				return commonFields.record(rec);
			},

			async recordByCode<Model, Args>(
				code: string
			): Promise<Prisma.Result<Model, Args, 'findUnique'>> {
				let params: any = { where: { code } };
				let rec: any;

				if ((this as any).findCode) {
					rec = await (this as any).findCode(this, params);
				} else {
					rec = await (this as any).findUnique(params);
				}

				rec.id = setPrefixId(rec.id, modelPrefix[(this as any).name.toLowerCase()]);

				if ((this as any).modelToObject) {
					rec = (this as any).modelToObject(rec, this);
				}

				return commonFields.record(rec);
			},
			async add<Model, Args>(
				this: Model,
				data: any
			): Promise<Prisma.Result<Model, Args, 'create'>> {
				const { createdAt, updatedAt, createdBy, updatedBy } = commonFields.create();

				if ((this as any).objectToModel) {
					data = (this as any).objectToModel(data);
				}

				let rec = await (this as any).create({
					data: { ...data, createdAt, updatedAt, createdBy, updatedBy },
				});

				rec.id = setPrefixId(rec.id, modelPrefix[(this as any).name.toLowerCase()]);

				if ((this as any).modelToObject) {
					rec = (this as any).modelToObject(rec, this);
				}

				return rec;
			},
		},
		survey: {
			...handleSurvey,
		},
		answer: {
			...handleAnswer,
		},
	},
});

export { prismaService };
