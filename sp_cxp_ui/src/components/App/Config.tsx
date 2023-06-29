import { remote } from 'electron'
let sharedVariables = remote.getGlobal('shared');
export const username = "sigmaplotXV";
export const password = "sigmaplotXV@123";
export const tokensRedisKey = "accessTokens";
export const devUrl = `http://127.0.0.1:${sharedVariables.backendPort}`;
export const devUrl2 = "http://127.0.0.1:5000";
export const getToken = `${devUrl}/api/token/`;
export const refreshToken = `${devUrl}/api/token/refresh/`;
export const getFileSelectionInfo = `${devUrl}/files/read_headers`;
export const getRDataFileSelectionInfo = `${devUrl}/files/open_r_file`;   // R datafile reading api
export const queryFileSelectionInfo = `${devUrl}/files/retrieve_data`;
export const getImportTextInfo = `${devUrl}/files/open_delimiter_file`;
export const queryImportTextInfo = `${devUrl}/files/retrieve_delimiter_data`;
export const getSpreadSheetInfo = `${devUrl}/files/open_multisheet_file`;
export const querySpreadSheetInfo = `${devUrl}/files/read_multiplesheet_file`;
export const schemaList = `${devUrl}/import_database/get-all-dsn`;
export const dbConnection = `${devUrl}/import_database/db-connection`;
export const ODBCQuery = `${devUrl}/import_database/fetch-query-data`;
export const executeODBCDNSQuery = `${devUrl}/import_database/table-related-columns`;
export const disConnection = `${devUrl}/import_database/db-disconnection`;
export const getTableCols = `${devUrl}/import_database/table-related-columns`;
export const importData = `${devUrl}/import_database/fetch-data`;
export const ODBCConnPath = `${devUrl}/import_database/set-odbcinifilepath`;
export const getODBCPath = `${devUrl}/import_database/get-odbcinifilepath`;
export const getReportDataFromDB = `${devUrl}/tests/execute_unpaired_ttest`;
export const quickTransform = `${devUrl}/transformations/quick_transform`;
export const userDefined = `${devUrl}/transformations/user_defined`;
export const optionsUpdate = `${devUrl}/files/options`;


//API for Tests 
export const getdescriptiveStats =`${devUrl}/tests/execute_descriptive_statistics`;
export const getOneWayFrequencyTable =`${devUrl}/tests/execute_oneway_frequency`;
export const getSignedRankTest =`${devUrl}/tests/execute_signed_rank_test`;
export const getZTest =`${devUrl}/tests/execute_ztest`;
export const getMcNamersTest =`${devUrl}/tests/execute_mcnemars`;
export const getRelativeTest =`${devUrl}/tests/execute_relative_risk`;
export const getOddsRatioTest =`${devUrl}/tests/execute_odds_ratio`;
export const getLinearTest =`${devUrl}/regression/execute_linear_regression`;
export const getMultiple_Logistic_Test =`${devUrl}/regression/execute_multiple_logistic_regression`;
export const getMultiple_Linear_Test =`${devUrl}/regression/execute_multiple_linear_regression`;
export const getPolynomial =`${devUrl}/regression/execute_polynomial`;
export const getForward =`${devUrl}/regression/execute_forward_step`;
export const getBackward =`${devUrl}/regression/execute_backward_step`;
export const getBestSubset =`${devUrl}/regression/execute_best_subset`;
export const getDeming = `${devUrl}/regression/execute_deming`;
export const getPairedTest = `${devUrl}/tests/execute_paired_ttest`;
export const getOneWayRMAnova = `${devUrl}/tests/execute_one_way_rm_anova`;
export const getTwoWayRMAnova = `${devUrl}/tests/execute_two_way_rm_anova`;
export const getRMAnovaOnRanks = `${devUrl}/tests/execute_rm_anova_on_rank`;
export const RecomputeStratifiedData = `${devUrl}/tests/recompute_startified_data`;


//changes for dynamic urls
export const getOneSampleTest = `${devUrl}/tests/execute_one_sample_ttest`;
export const getOneSampleRanktest = `${devUrl}/tests/execute_one_sample_signed_rank_test`;
export const getUnpairedTest = `${devUrl}/tests/execute_unpaired_ttest`;
export const getRankSumTest = `${devUrl}/tests/execute_rank_sum_test`;
export const getOneWayAnova = `${devUrl}/tests/execute_one_way_anova`;
export const getTwoWayAnova = `${devUrl}/tests/execute_two_way_anova`;
export const getThreeWayAnova = `${devUrl}/tests/execute_three_way_anova`;
export const getAnovaOnRanks = `${devUrl}/tests/execute_anova_on_rank`;
export const getOneWayAncova = `${devUrl}/tests/execute_one_way_ancova`;
export const getChiSquare = `${devUrl}/tests/execute_chisquare`;
export const getFisherExact = `${devUrl}/tests/execute_fischerexact`;
export const getPrincipalComponents = `${devUrl}/tests/execute_principal_components`;
export const getPearson = `${devUrl}/tests/execute_pearson`;
export const getSpearman = `${devUrl}/tests/execute_spearman`;
export const getSingleGrpup = `${devUrl}/tests/execute_singlegroup`;
export const getLogRank = `${devUrl}/tests/execute_log_rank`;
export const getGehanBreslow = `${devUrl}/tests/execute_gehan_breslow`;
export const getCoxPhModel = `${devUrl}/tests/execute_cox_ph_model`;
export const getCoxStratifiedModel = `${devUrl}/tests/execute_cox_stratified_model`;
export const getNormality = `${devUrl}/tests/execute_normality_statistics`;
export const getHistogram = `${devUrl}/graphs/histogram`;



//API for sample and power tests/
export const getSampleTests =`${devUrl}/tests/sample_size`;
export const getPowerTests =`${devUrl}/tests/power`;

//API for Export Worksheet
export const worksheetExport = `${devUrl}/files/export_file`;

//API for importing to Document Loader
export const reportImport = `${devUrl}/files/report/import`;

// API for license
export const checkLicense = `${devUrl}/files/check_license_validity`;
export const fingerprint = `${devUrl}/files/get_mfp`;
export const applylicense = `${devUrl}/files/apply_license`;
export const getserialinfo = `${devUrl}/files/get_registration_info`;
export const setserialinfo = `${devUrl}/files/set_registration_info`;
export const getlogs = `${devUrl}/files/get_logs`;
export const getlicenseutility = `${devUrl}/files/check_license_utility`;
export const pairedttestutility = `${devUrl}/tests/recompute_paired_t_test_data`;
export const pairedttesthist = `${devUrl}/tests/recompute_histogram_paired_t_test_data`;







