import { survey_aept, survey_aept2 } from './aept';
import { survey_autotest } from './autotest';
import { survey_fp, survey_fp_autoasistido } from './fp';
import { survey_fp_autoasistido2, survey_fp2, survey_fp860 } from './fp2';
import { survey_manos } from './manos';
import { survey_cine, survey_ingles, survey_short, survey_test } from './test';
import { survey_toi } from './toi';
import { surveyTestUI, surveyWithConditionalJumps } from './ui-test';
import { survey_upep } from './upep';

export const surveys = [
	survey_aept,
	survey_aept2,
	survey_upep,
	survey_fp,
	survey_fp_autoasistido,
	survey_fp2,
	survey_fp860,
	survey_fp_autoasistido2,
	survey_toi,
	survey_manos,
	survey_ingles,
	survey_cine,
	survey_test,
	survey_short,
	survey_autotest,
	surveyTestUI,
	surveyWithConditionalJumps,
];
export const DEFAULT_SURVEY = survey_autotest;

export const SURVEY_IDS = surveys.map((e) => e.id);
