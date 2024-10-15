import { modelPrefix, setPrefixId } from './misc';

const modelToObject = (survey: any): any => {
	survey.questions = JSON.parse(survey.questions).map((q: any) => (q = setQuestionPrefixs(q)));
	return survey;
};
const findCode = async (survey: any, params: any): Promise<any> =>
	await (survey as any).findFirst({ ...params, orderBy: { version: 'desc' } });

const setQuestionPrefixs = (question: any): any => {
	question.id = setPrefixId(question.id, modelPrefix.question);

	if (question.next) question.next = setPrefixId(question.next, modelPrefix.question);

	return question;
};

export const handleSurvey = { modelToObject, findCode };
