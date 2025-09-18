import { surveys } from '$lib/components/survey/samples';

import { surveyNoIntro, surveyTestUI, surveyWithIntro, surveyWithProgressBar } from './extra';

export const samples = [
	...surveys,
	surveyWithIntro,
	surveyNoIntro,
	surveyWithProgressBar,
	surveyTestUI,
];
