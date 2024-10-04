import { cleanPrefixId, setPrefixId, modelPrefix } from './misc';

const objectToModel = (answer: any): any => {
	answer.surveyId = cleanPrefixId(answer.surveyId);
	return answer;
};

const modelToObject = (answer: any) => {
	answer.surveyId = setPrefixId(answer.surveyId, modelPrefix.survey);
	answer.answers = JSON.parse(answer.answers);
	return answer;
};

export const handleAnswer = { objectToModel, modelToObject };
