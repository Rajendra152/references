import { remote } from 'electron'
let sharedVariables = remote.getGlobal('shared');

export const worksheetExport = `http://localhost:${sharedVariables.backendPort}/files/export_file`;


//API Names for Test Items
export const descriptiveStatistics = `http://localhost:${sharedVariables.backendPort}/tests/execute_descriptive_statistics`;
export const oneWayFrequency = `https://localhost:${sharedVariables.backendPort}/tests/execute_oneway_frequency`;
export const oneSampleTTest = `https://localhost:${sharedVariables.backendPort}/tests/execute_one_sample_ttest `;
export const oneSampleSignedRankedTest = `http://localhost:${sharedVariables.backendPort}/tests/execute_one_sample_signed_rank_test `;