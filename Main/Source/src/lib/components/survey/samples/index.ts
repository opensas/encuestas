import { survey_aept } from './aept';
import { survey_fp, survey_fp_auto } from './fp';
import { survey_manos } from './manos';
import { survey_cine, survey_ingles, survey_short, survey_test } from './test';
import { survey_upep } from './upep';

export const surveys = [
	survey_aept,
	survey_upep,
	survey_fp,
	survey_fp_auto,
	survey_manos,
	survey_ingles,
	survey_cine,
	survey_test,
	survey_short,
];
export const DEFAULT_SURVEY = survey_upep;
