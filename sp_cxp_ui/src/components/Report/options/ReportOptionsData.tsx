import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { getDataSetByKey, updatDatasetInRedis, createNewClient } from '../../../services/RedisServices';

const client = createNewClient();
const os = require('os');

export const udpateOptions = (options: any, key: string, event: any, index: number, option?: any) => {
    const reportOptions = JSON.parse(JSON.stringify(options));
    const optionsData = reportOptions[key];
    if(option && option.input) {
        optionsData[index].inputData = event.target.value;
    } else if(option && option.dropdown) {
        optionsData[index].selectedData = event.key;
    } else if(option && option.radio) {
        optionsData[index].radioData = event.key;
    } else {
        optionsData[index].checked = event.target.checked;
    }
    reportOptions[key] = optionsData;
    return reportOptions;
}

export const getOptionsData = async (testIdKey: string, tabKeys: string[]) => {
    let optionsData = await getDataSetByKey(os.userInfo().username, client);
    const redisData = optionsData[statOptionIds[testIdKey]];
    console.log(redisData);
    let statOptions: any = JSON.parse(JSON.stringify(eval(testIdKey)));
    tabKeys.forEach((key: any) => {
        statOptions[key].map((option: any) => {
            if(option.property) {
                option.checked = redisData[key][option.property];
            }
            if(option.input) {
                option.inputData = redisData[key][option.inputProperty]
            }
            if(option.dropdown) {
                option.selectedData = redisData[key][option.dropdownProperty]
            }
            if(option.radio) {
                option.radioData = (redisData[key][option.property] && redisData[key][option.property].toString()) || '0'
            }
            return option;
        })
    });
    return {optionsData, statOptions}
}

export const updateDataInRedis = async (optionsData: any, options: any, testIdKey: string, tabKeys: string[]) => {
    const data = optionsData[statOptionIds[testIdKey]];
    tabKeys.forEach((key: any) => {
        (options[key] || []).map((option: any) => {
            if(option.property) {
                data[key][option.property] = option.checked;
            }
            if(option.input) {
                data[key][option.inputProperty] = option.inputData;
            }
            if(option.dropdown) {
                data[key][option.dropdownProperty] = option.selectedData;
            }
            if(option.radio) {
                data[key][option.property] = option.radioData && parseInt(option.radioData);
            }
        });
    });
    await updatDatasetInRedis(client, optionsData, os.userInfo().username);
}

export const statOptionIds = {
    'descriptivestatistics': '1',
    'onewayfrequencytables': '2',
    'oneSampleTTest': '3',
    'oneSampleSignedRankedTest': '4',
    'TTest': '5',
    'rankedSumTest': '6',
    'oneWayAnova': '7',
    'twoWayAnova': '8',
    'threeWayAnova': '9',
    'anovaOnRanks': '10',
    'oneWayAncova': '11',
    'pairedTTest': '12',
    'signedRankedTest': '13',
    'oneWayRMAnova': '14',
    'twoWayRMAnova': '15',
    'RMAnovaOnRanks': '16',
    'ZTest': '17',
    'chiSquare': '18',
    'mcNemarsTest': '20',
    'relativeRisk': '21',
    'oddsRatio': '22',
    'linearRegression': '23',
    'multipleLinearRegression': '24',
    'multipleLogistics': '25',
    'polynomialRegression': '26',
    'forwardStepwiseRegression': '27',
    'backwardStepwiseRegression': '28',
    'bestSubsetRegression': '29',
    'nonlinearRegression': '30',
    'demingRegression': '31',
    'principalComponents': '32',
    'pearsonCorrelation': '33',
    'spearmanCorrelation': '34',
    'normality': '35',
    'survivalSingleGroup': '36',
    'survivalLogRank': '37',
    'survivalGehanBreslow': '38',
    'coxPHModel': '39',
    'coxStratifiedModel': '40'
}

export const descriptiveStatisticsOptions: any[] = [
    {label: 'N (size)', checked: true, property: 'Size'},
    {label: 'Median', checked: true, property: 'Median'},
    {label: 'Normality', checked: true, property: 'Normality'},
    {label: 'Missing', checked: true, property: 'Missing'},
    {label: 'Maximum', checked: true, property: 'Maximum'},
    {label: 'Confidence Interval Mean', property: 'ConfInterval', checked: true, input: true, inputData: 0, inputProperty: 'StrConfInterval'},
    {label: 'Mean', checked: true, property: 'Mean'},
    {label: 'Minimum', checked: true, property: 'Minimum'},
    {label: 'Percentiles', checked: true, property: 'Percentiles', dropdown: true, selectedData: '', dropdownProperty: 'PercentileSelect'},
    {label: 'Std Dev', checked: true, property: 'StdDev'},
    {label: 'Sum', checked: true, property: 'Sum'},
    {label: 'Sum Of Squares', checked: true, property: 'SumofSquares'},
    {label: 'Std Error', checked: true, property: 'StdErr'},
    {label: 'Skewness', checked: true, property: 'Skewness'},
    {label: 'Range', checked: true, property: 'Range'},
    {label: 'Kurtosis', checked: true, property: 'Kurtosis'},
]

export const percentileOptions: IDropdownOption[] = [
    { key: 0, text: '5 and 95' },
    { key: 1, text: '10 and 90' },
    { key: 2, text: '25 and 75' },
];

export const oneWayFrequencyTables: any = {
    tables: [
        {label: 'Frequencies', checked: true, property: 'Frequencies'},
        {label: 'Percents', checked: true, property: 'Percents'},
        {label: 'Ignore Missing Values', checked: true, property: 'IgnoreMissingValues'}
    ],
    proportions: [
        {label: 'Confidence', checked: true, property: 'ConfInterval', input: true, inputData: 95, inputProperty: 'StrConfInterval'},
        {label: 'Method', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'ConfMethodOption'},
        {label: 'Chi-square', checked: true, property: 'ChiSquare'},
        {label: 'Sig. Level', property: '', input: true, inputData: '0.050', inputProperty: 'StrPValue'}
    ],
    summaryStatistics: [
        {label: 'N (size)', checked: true, property: 'Size'},
        {label: 'Median', checked: true, property: 'Median'},
        {label: 'Missing', checked: true, property: 'Missing'},
        {label: 'Percentiles', checked: true, property: 'Percentiles', dropdown: true, selectedData: 0, dropdownProperty: 'PercentileSelect'},
        {label: 'Mean', checked: true, property: 'Mean'},
        {label: 'Mode', checked: true, property: 'Mode'},
        {label: 'Std Dev', checked: true, property: 'StdDev'},
        {label: 'Minimum', checked: true, property: 'Minimum'},
        {label: 'Maximum', checked: true, property: 'Maximum'},
    ]
}

export const methodOptions: IDropdownOption[] = [
    { key: 0, text: 'Wald' },
    { key: 1, text: 'Clopper Pearson' },
    { key: 2, text: 'Agresti-Coull' },
];

export const oneSampleTTest: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
    ],
    CResults: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Confidence Intervals', property: 'ConfInterval', checked: true, input: true, inputData: '95', inputProperty: 'StrConfInterval'},
        {label: 'Residuals in column', checked: 'true', property: '', dropdown: true, selectedData: 0, dropdownProperty: 'iResidualsSelect'}
    ],
    COtherTest: [
        {label: 'Power', checked: true, property: 'Power'},
        {label: 'Use Alpha Value', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
    ]
}

export const residualOptions: IDropdownOption[] = [
    { key: 0, text: '(none)' },
    { key: 1, text: 'First Available Column' },
];

export const oneSampleSignedRankedTest: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
    ],
    CResultsPercentConf: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Display', checked: true, property: '', input: true, inputData: '25', inputProperty: 'StrFromPercent'},
        {label: 'Display', checked: true, property: '', input: true, inputData: '75', inputProperty: 'StrToPercent'},
        {label: 'Confidence Intervals', property: 'ConfInterval', checked: true, input: true, inputData: '95', inputProperty: 'StrConfInterval'},
        {label: 'Yates Correction Factor', checked: 'true', property: 'YatesFactor'}
    ]
}

export const TTest: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
    ],
    CResultsTTest: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Confidence Intervals', property: 'ConfInterval', checked: true, input: true, inputData: '95', inputProperty: 'StrConfInterval'},
        {label: 'Tests for Equal Means', checked: true, radio: true, property: 'TestEqualMeanOption', radioData: '1'},
        {label: 'P-values', checked: true, property: 'PValueOption', radio: true, radioData: '0'},
        {label: 'Residuals in column', checked: 'true', property: '', dropdown: true, selectedData: 0, dropdownProperty: 'iResidualsSelect'}
    ],
    COtherTest: [
        {label: 'Power', checked: true, property: 'Power'},
        {label: 'Use Alpha Value', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
    ]
}

export const rankedSumTest: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
    ],
    CResultsPercentile: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Display', checked: true, property: '', input: true, inputData: '25', inputProperty: 'StrFromPercent'},
        {label: 'Display', checked: true, property: '', input: true, inputData: '75', inputProperty: 'StrToPercent'},
        {label: 'Yates Correction Factor', checked: 'true', property: 'YatesFactor'}
    ]
}

export const oneWayAnova: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
    ],
    CResults: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Residuals in column', checked: 'true', property: '', dropdown: true, selectedData: 0, dropdownProperty: 'iResidualsSelect'}
    ],
    COtherTest: [
        {label: 'Power', checked: true, property: 'Power'},
        {label: 'Use Alpha Value', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Multiple Comparison', checked: true, radio: true, property: 'MultiCompareRadOption', radioData: '1'},
    ]
}

export const twoWayAnova: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
    ],
    CResults: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Residuals in column', checked: 'true', property: '', dropdown: true, selectedData: 0, dropdownProperty: 'iResidualsSelect'}
    ],
    COtherTest: [
        {label: 'Power', checked: true, property: 'Power'},
        {label: 'Use Alpha Value', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Multiple Comparison', checked: true, radio: true, property: 'MultiCompareRadOption', radioData: '1'},
    ]
}

export const threeWayAnova: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
    ],
    CResults: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Residuals in column', checked: 'true', property: '', dropdown: true, selectedData: 0, dropdownProperty: 'iResidualsSelect'}
    ],
    COtherTest: [
        {label: 'Power', checked: true, property: 'Power'},
        {label: 'Use Alpha Value', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Multiple Comparison', checked: true, radio: true, property: 'MultiCompareRadOption', radioData: '1'},
    ]
}

export const anovaOnRanks: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
    ],
    CResultsPercentile: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Display', checked: true, property: '', input: true, inputData: '25', inputProperty: 'StrFromPercent'},
        {label: 'Display', checked: true, property: '', input: true, inputData: '75', inputProperty: 'StrToPercent'},
    ],
    COtherTest: [
        {label: 'Multiple Comparison', checked: true, property: 'MultiCompareRadOption', radioData: '1'},
    ]
}

export const oneWayAncova: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
        {label: 'Equality of Slopes', checked: true, property: 'EqualSlopes'},
        {label: 'Report Parameter Statistics', checked: true, property: 'ReportParamStats'},
    ],
    CResiduals: [
        {label: 'Predicted Values', checked: true, property: 'PredictedColumn', dropdown: true, selectedData: 0, dropdownProperty: 'PredictedColumnSelect'},
        {label: 'Raw', checked: true, property: 'RawColumn', dropdown: true, selectedData: 0, dropdownProperty: 'RawColumnSelect'},
        {label: 'Standardized', checked: true, property: 'Standardized', input: true, inputData: "2.500", inputProperty: 'StrStandardized'},
        {label: 'Studentized', checked: true, property: 'Studentized'},
        {label: 'Studentized Deleted', checked: true, property: 'StudentizedDeleted', input: true, inputData: "2.000", inputProperty: 'StrStudentizedDeleted'},
        {label: 'Report Flagged Values Only', checked: true, property: 'ReportFlaggedOnly'},
    ],
    CAncovaResults: [
        {label: 'Confidence', checked: true, property: 'ConfInt'},
        {label: 'Prediction', checked: true, property: 'PredInt'},
        {label: 'Starting in Column', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'StartInColumnSelect'}, // Missing Property
        {label: 'Confidence Level', checked: true, property: '', input: true, inputData: '95', inputProperty: 'StrConfLevel'},
        {label: 'Summary of Covariates', checked: true, property: 'CovSummary'},
        {label: 'Covariance Matrix', checked: true, property: 'CovMatrix'},
        {label: 'Parameter Statistics', checked: true, property: 'ParamStats'},
        {label: 'Variance Inflation Factor', checked: true, property: 'VIF', input: true, inputData: '4.000', inputProperty: 'StrVIFThreshold'},
        {label: 'Leverage', checked: true, property: 'Leverage'},
        {label: 'Flag Values', checked: true, property: '', input: true, inputData: '2.000', dropdownProperty: 'StrLeverageThreshold'},
        {label: 'Cooks Distance', checked: true, property: 'CooksDistance', input: true, inputData: '4.000', inputProperty: 'StrCooksDistanceThreshold'},
        {label: 'Report Flagged Values Only', checked: true, property: 'ReportFlaggedOnly'},
    ],
    COtherTest: [
        {label: 'Power', checked: true, property: 'Power'},
        {label: 'Use Alpha Value', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Multiple Comparison', checked: true, radio: true, property: 'MultiCompareRadOption', radioData: '1'},
    ]
}

export const pairedTTest: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
    ],
    CResults: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Confidence Intervals', property: 'ConfInterval', checked: true, input: true, inputData: '95', inputProperty: 'StrConfInterval'},
        {label: 'Residuals in column', checked: 'true', property: '', dropdown: true, selectedData: 0, dropdownProperty: 'iResidualsSelect'}
    ],
    COtherTest: [
        {label: 'Power', checked: true, property: 'Power'},
        {label: 'Use Alpha Value', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
    ]
}

export const signedRankedTest: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
    ],
    CResultsPercentile: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Display', checked: true, property: '', input: true, inputData: '25', inputProperty: 'StrFromPercent'},
        {label: 'Display', checked: true, property: '', input: true, inputData: '75', inputProperty: 'StrToPercent'},
        {label: 'Yates Correction Factor', checked: 'true', property: 'YatesFactor'}
    ]
}

export const oneWayRMAnova: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
    ],
    CResults: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Residuals in column', checked: 'true', property: '', dropdown: true, selectedData: 0, dropdownProperty: 'iResidualsSelect'}
    ],
    COtherTest: [
        {label: 'Power', checked: true, property: 'Power'},
        {label: 'Use Alpha Value', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Multiple Comparison', checked: true, radio: true, property: 'MultiCompareRadOption', radioData: '1'},
    ]
}

export const twoWayRMAnova: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
    ],
    CResults: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Residuals in column', checked: 'true', property: '', dropdown: true, selectedData: 0, dropdownProperty: 'iResidualsSelect'}
    ],
    COtherTest: [
        {label: 'Power', checked: true, property: 'Power'},
        {label: 'Use Alpha Value', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Multiple Comparison', checked: true, radio: true, property: 'MultiCompareRadOption', radioData: '1'},
    ]
}

export const RMAnovaOnRanks: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
    ],
    CResultsPercentile: [
        {label: 'Summary Table', checked: true, property: 'SummaryTable'},
        {label: 'Display', checked: true, property: '', input: true, inputData: '25', inputProperty: 'StrFromPercent'},
        {label: 'Display', checked: true, property: '', input: true, inputData: '75', inputProperty: 'StrToPercent'},
    ],
    COtherTest: [
        {label: 'Multiple Comparison', checked: true, radio: true, property: 'MultiCompareRadOption', radioData: '1'},
    ]
}

export const ZTest: any = {
    CZTest: [
        {label: 'Power, Use Alpha Value', checked: true, property: 'Power', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Yates Correction Factor', checked: true, property: 'Yates'},
        {label: 'Confidence Interval at', checked: true, property: 'Confidence', input: true, inputData: '95', inputProperty: 'StrConfidence'},
    ]
}

export const chiSquare: any = {
    CZTest: [
        {label: 'Power, Use Alpha Value', checked: true, property: 'Power', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Yates Correction Factor (Only for 2x2 contingency tables)', checked: true, property: 'Yates'},
        {label: 'Counts', checked: true, property: 'Counts'},
        {label: 'Percentages', checked: true, property: 'Percentages'},
        {label: 'Counts and Percentages', checked: true, property: 'CountsPercs'},
        {label: 'Residuals', checked: true, property: 'Residuals'},
        {label: 'Pearson Chi-Square', checked: true, property: 'ChiSquareTest'},
        {label: 'Log-Likelihood Ratio', checked: true, property: 'LogLikeRatioTest'},
        {label: 'Phi', checked: true, property: 'PhiCoefficient'},
        {label: "Cramer's V", checked: true, property: 'CramersV'},
    ]
}

export const mcNemarsTest: any = {
    CZTest: [
        {label: 'Yates Correction Factor', checked: true, property: 'Yates'},
    ]
}

export const relativeRisk: any = {
    CZTest: [
        {label: 'Power, Use Alpha Value', checked: true, property: 'Power', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Yates Correction Factor', checked: true, property: 'Yates'},
        {label: 'Confidence Interval at', checked: true, property: 'Confidence', input: true, inputData: '95', inputProperty: 'StrConfidence'},
        {label: 'Use the first row of the selected data as the treatment group', checked: true, property: 'FirstRowTreatmentGroup'}
    ]
}

export const oddsRatio: any = {
    CZTest: [
        {label: 'Power, Use Alpha Value', checked: true, property: 'Power', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Yates Correction Factor', checked: true, property: 'Yates'},
        {label: 'Confidence Interval at', checked: true, property: 'Confidence', input: true, inputData: '95', inputProperty: 'StrConfidence'},
        {label: 'Use the first row of the selected data as the treatment group', checked: true, property: 'FirstRowTreatmentGroup'}
    ]
}

export const linearRegression: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Constant Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
        {label: 'Durbin-Watson', checked: true, property: 'DurbinWatson'},
        {label: 'Difference from 2.0', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrDurbinWatson'},
    ],
    CResiduals: [
        {label: 'Predicted Values', checked: true, property: 'PredictedColumn', dropdown: true, selectedData: 0, dropdownProperty: 'PredictedColumnSelect'},
        {label: 'Raw', checked: true, property: 'RawColumn', dropdown: true, selectedData: 0, dropdownProperty: 'RawColumnSelect'},
        {label: 'Standardized', checked: true, property: 'Standardized', input: true, inputData: "2.500", inputProperty: 'StrStandardized'},
        {label: 'Studentized', checked: true, property: 'Studentized'},
        {label: 'Studentized Deleted', checked: true, property: 'StudentizedDeleted', input: true, inputData: "2.000", inputProperty: 'StrStudentizedDeleted'},
        {label: 'Report Flagged Values Only', checked: true, property: 'ReportFlaggedOnly'},
    ],
    COtherResults: [
        {label: 'Prediction', checked: true, property: 'Prediction'},
        {label: 'Confidence', checked: true, property: 'ConfInterval', input: true, inputData: "95", inputProperty: 'StrConfInterval'},
        {label: 'Starting in Column', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'StartInColumnSelect'},
        {label: 'PRESS Prediction Error', checked: true, property: 'PRESSPredError'},
        {label: 'Standardized Coeffiecients', checked: true, property: 'StandardizedCoeff'},
    ],
    COtherTestsInfluence: [
        {label: 'DFFITs', checked: true, property: 'DFFIT', input: true, inputData: '2.000', inputProperty: 'StrsDFFIT'},
        {label: 'Leverage', checked: true, property: 'Leverage', input: true, inputData: '2.000', inputProperty: 'StrLeverage'},
        {label: 'Cooks Distance', checked: true, property: 'CooksDistance', input: true, inputData: '4.000', inputProperty: 'StrCooksDist'},
        {label: 'Power', checked: true, property: 'Power', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Report flagged values only', checked: true, property: 'ReportFlaggedOnly'},
    ]
}

export const multipleLinearRegression: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Constant Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
        {label: 'Durbin-Watson', checked: true, property: 'DurbinWatson'},
        {label: 'Difference from 2.0', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrDurbinWatson'},
    ],
    CResiduals: [
        {label: 'Predicted Values', checked: true, property: 'PredictedColumn', dropdown: true, selectedData: 0, dropdownProperty: 'PredictedColumnSelect'},
        {label: 'Raw', checked: true, property: 'RawColumn', dropdown: true, selectedData: 0, dropdownProperty: 'RawColumnSelect'},
        {label: 'Standardized', checked: true, property: 'Standardized', input: true, inputData: "2.500", inputProperty: 'StrStandardized'},
        {label: 'Studentized', checked: true, property: 'Studentized'},
        {label: 'Studentized Deleted', checked: true, property: 'StudentizedDeleted', input: true, inputData: "2.000", inputProperty: 'StrStudentizedDeleted'},
        {label: 'Report Flagged Values Only', checked: true, property: 'ReportFlaggedOnly'},
    ],
    COtherResults: [
        {label: 'Prediction', checked: true, property: 'Prediction'},
        {label: 'Confidence', checked: true, property: 'ConfInterval', input: true, inputData: "95", inputProperty: 'StrConfInterval'},
        {label: 'Starting in Column', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'StartInColumnSelect'},
        {label: 'PRESS Prediction Error', checked: true, property: 'PRESSPredError'},
        {label: 'Standardized Coeffiecients', checked: true, property: 'StandardizedCoeff'},
    ],
    COtherTestsInfluence: [
        {label: 'DFFITs', checked: true, property: 'DFFIT', input: true, inputData: '2.000', inputProperty: 'StrsDFFIT'},
        {label: 'Leverage', checked: true, property: 'Leverage', input: true, inputData: '2.000', inputProperty: 'StrLeverage'},
        {label: 'Cooks Distance', checked: true, property: 'CooksDistance', input: true, inputData: '4.000', inputProperty: 'StrCooksDist'},
        {label: 'Variance Inflaction Factor', checked: true, property: 'VarianceInflation', input: true, inputData: '4.000', inputProperty: 'StrVarianceInflation'},
        {label: 'Power', checked: true, property: 'Power', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Report flagged values only', checked: true, property: 'ReportFlaggedOnly'},
    ]
}

export const multipleLogistics: any = {
    CFitLogistic: [
        {label: 'Hosmer-Lemeshow Test Statistic', checked: true, property: 'IsCheckedHosmer', input: true, inputData: "0.200", inputProperty: 'StrHosmerPVal'},
        {label: 'Pearson Chi square Test Statistic', checked: true, property: 'ChiSquare'},
        {label: 'Likelihood Ratio Test Statistic', checked: true, property: 'LikelihoodRatio'},
        {label: 'Classification Table', checked: true, property: 'ClassTable', input: true, inputData: "0.500", inputProperty: 'StrThresholdProbability'},
        {label: 'Number of Independent Variable Combinations', checked: true, property: 'AICc', input: true, inputData: "10", inputProperty: 'StrTimesNum'},
    ],
    CLogisticRegressionOptions: [
        {label: 'Standard Error Coeffiecients', checked: true, property: 'StdErrCoeff'},
        {label: 'Wald Statistic', checked: true, property: 'WaldStats'},
        {label: 'Coeffiecients P Values', checked: true, property: 'CoeffPValues'},
        {label: 'Odd Ratio', checked: true, property: 'OddsRatio1'},
        {label: 'Odd Confidence Interval', checked: true, property: 'OddsRatio2', input: true, inputData: "95", inputProperty: 'StrOddsConfidence'},
        {label: 'Predicted Values', checked: true, property: 'ShowPredictedValues', dropdown: true, selectedData: 0, dropdownProperty: 'PredValuesColumnSelection'},
        {label: 'Variance Inflation Factor', checked: true, property: 'VIF', input: true, inputData: '4.000', inputProperty: 'StrVIF'},
        {label: 'Report Flagged Values only', checked: true, property: 'ReportFlaggedValues'},
    ],
    CResidualsLogistic: [
        {label: 'Residual Type', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'ResidualSelect'},
        {label: 'Raw', checked: true, property: 'RawColumn', dropdown: true, selectedData: 0, dropdownProperty: 'RawColumnSelect'},
        {label: 'Studentized', checked: true, property: 'Studentized'},
        {label: 'Studentized Deleted', checked: true, property: 'StudentizedDeleted', input: true, inputData: '2.000', inputProperty: 'StrStudentizedDeleted'},
        {label: 'Leverage', checked: true, property: 'Leverage', input: true, inputData: '2.000', inputProperty: 'StrLeverage'},
        {label: 'Cooks Distance', checked: true, property: 'CooksDistance', input: true, inputData: '4.000', inputProperty: 'StrCooksDistance'},
        {label: 'Report Flagged Values only', checked: true, property: 'ReportFlaggedValues'}
    ]
}

export const logisticResidualOptions: IDropdownOption[] = [
    { key: 0, text: '(none)' },
    { key: 1, text: 'Pearson' },
    { key: 2, text: 'Deviance' }
];

export const polynomialRegression: any = {
    CCriterionPolyReg: [
        {label: 'Polynomial Order', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'LastPage'},
        {label: 'Regression Type', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'RegressionType'},
        {label: 'R-Square', checked: true, property: 'RSquared'},
        {label: 'Predicted R-Square', checked: true, property: 'PredRSquared'},
        {label: 'Adjusted R-Square', checked: true, property: 'AdjRSquared'},
        {label: 'AICc - Akaike Information Criterion', checked: true, property: 'AICc'},
    ],
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Constant Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
        {label: 'Durbin-Watson', checked: true, property: 'DurbinWatson'},
        {label: 'Difference from 2.0', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrDurbinWatson'},
    ],
    CResiduals: [
        {label: 'Predicted Values', checked: true, property: 'PredictedColumn', dropdown: true, selectedData: 0, dropdownProperty: 'PredictedColumnSelect'},
        {label: 'Raw', checked: true, property: 'RawColumn', dropdown: true, selectedData: 0, dropdownProperty: 'RawColumnSelect'},
        {label: 'Standardized', checked: true, property: 'Standardized', input: true, inputData: "2.500", inputProperty: 'StrStandardized'},
        {label: 'Report Flagged Values Only', checked: true, property: 'ReportFlaggedOnly'},
    ],
    COtherResults: [
        {label: 'Prediction', checked: true, property: 'Prediction'},
        {label: 'Confidence', checked: true, property: 'ConfInterval', input: true, inputData: "95", inputProperty: 'StrConfInterval'},
        {label: 'Starting in Column', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'StartInColumnSelect'},
        {label: 'PRESS Prediction Error', checked: true, property: 'PRESSPredError'},
        {label: 'Standardized Coeffiecients', checked: true, property: 'StandardizedCoeff'},
    ],
    COtherTest: [
        {label: 'Power', checked: true, property: 'Power'},
        {label: 'Use Alpha Value', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
    ]
}

export const regressionTypes: IDropdownOption[] = [
    { key: 0, text: 'Incremental Evaluation' },
    { key: 1, text: 'Order Only' },
];

export const bestSubsetRegression: any = {
    CCriterionBest: [
        {label: 'Best Criterion', checked: true, property: '', dropdown: true, selectedData: 2, dropdownProperty: 'CovSelection'},
        {label: 'Number of Subsets', checked: true, property: '', input: true, inputData: '1', inputProperty: 'StrNumberOfSubsets'},
        {label: 'Variance Inflation Factor', checked: true, property: 'VIF', input: true, inputData: '4.000', inputProperty: 'StrVIF'},
        {label: 'Report Flagged Values Only', checked: true, property: 'ReportFlagged'},
    ]
}

export const subsetCriterion: IDropdownOption[] = [
    { key: 0, text: 'R Squared' },
    { key: 1, text: 'Adjusted R Squared' },
    { key: 2, text: 'Mallow Cp' },
];

export const forwardStepwiseRegression: any = {
    CCriterionFtoEnter: [
        {label: 'F-to-Enter', checked: true, property: '', input: true, inputData: '4.000', inputProperty: 'StrFtoEnter'},
        {label: 'F-to-Remove', checked: true, property: '', input: true, inputData: '3.900', inputProperty: 'StrFtoRemove'},
        {label: 'Number of Steps', checked: true, property: '', input: true, inputData: '20', inputProperty: 'StrNumberOfSteps'},
    ],
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Constant Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
        {label: 'Durbin-Watson', checked: true, property: 'DurbinWatson'},
        {label: 'Difference from 2.0', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrDurbinWatson'},
    ],
    CResiduals: [
        {label: 'Predicted Values', checked: true, property: 'PredictedColumn', dropdown: true, selectedData: 0, dropdownProperty: 'PredictedColumnSelect'},
        {label: 'Raw', checked: true, property: 'RawColumn', dropdown: true, selectedData: 0, dropdownProperty: 'RawColumnSelect'},
        {label: 'Standardized', checked: true, property: 'Standardized', input: true, inputData: "2.500", inputProperty: 'StrStandardized'},
        {label: 'Studentized', checked: true, property: 'Studentized'},
        {label: 'Studentized Deleted', checked: true, property: 'StudentizedDeleted', input: true, inputData: "2.000", inputProperty: 'StrStudentizedDeleted'},
        {label: 'Report Flagged Values Only', checked: true, property: 'ReportFlaggedOnly'},
    ],
    COtherResults: [
        {label: 'Prediction', checked: true, property: 'Prediction'},
        {label: 'Confidence', checked: true, property: 'ConfInterval', input: true, inputData: "95", inputProperty: 'StrConfInterval'},
        {label: 'Starting in Column', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'StartInColumnSelect'},
        {label: 'PRESS Prediction Error', checked: true, property: 'PRESSPredError'},
        {label: 'Standardized Coeffiecients', checked: true, property: 'StandardizedCoeff'},
    ],
    COtherTestsInfluence: [
        {label: 'DFFITs', checked: true, property: 'DFFIT', input: true, inputData: '2.000', inputProperty: 'StrsDFFIT'},
        {label: 'Leverage', checked: true, property: 'Leverage', input: true, inputData: '2.000', inputProperty: 'StrLeverage'},
        {label: 'Cooks Distance', checked: true, property: 'CooksDistance', input: true, inputData: '4.000', inputProperty: 'StrCooksDist'},
        {label: 'Power', checked: true, property: 'Power', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Report flagged values only', checked: true, property: 'ReportFlaggedOnly'},
    ]
}

export const backwardStepwiseRegression: any = {
    CCriterionFtoEnter: [
        {label: 'F-to-Enter', checked: true, property: '', input: true, inputData: '4.000', inputProperty: 'StrFtoEnter'},
        {label: 'F-to-Remove', checked: true, property: '', input: true, inputData: '3.900', inputProperty: 'StrFtoRemove'},
        {label: 'Number of Steps', checked: true, property: '', input: true, inputData: '20', inputProperty: 'StrNumberOfSteps'},
    ],
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Constant Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
        {label: 'Durbin-Watson', checked: true, property: 'DurbinWatson'},
        {label: 'Difference from 2.0', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrDurbinWatson'},
    ],
    CResiduals: [
        {label: 'Predicted Values', checked: true, property: 'PredictedColumn', dropdown: true, selectedData: 0, dropdownProperty: 'PredictedColumnSelect'},
        {label: 'Raw', checked: true, property: 'RawColumn', dropdown: true, selectedData: 0, dropdownProperty: 'RawColumnSelect'},
        {label: 'Standardized', checked: true, property: 'Standardized', input: true, inputData: "2.500", inputProperty: 'StrStandardized'},
        {label: 'Studentized', checked: true, property: 'Studentized'},
        {label: 'Studentized Deleted', checked: true, property: 'StudentizedDeleted', input: true, inputData: "2.000", inputProperty: 'StrStudentizedDeleted'},
        {label: 'Report Flagged Values Only', checked: true, property: 'ReportFlaggedOnly'},
    ],
    COtherResults: [
        {label: 'Prediction', checked: true, property: 'Prediction'},
        {label: 'Confidence', checked: true, property: 'ConfInterval', input: true, inputData: "95", inputProperty: 'StrConfInterval'},
        {label: 'Starting in Column', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'StartInColumnSelect'},
        {label: 'PRESS Prediction Error', checked: true, property: 'PRESSPredError'},
        {label: 'Standardized Coeffiecients', checked: true, property: 'StandardizedCoeff'},
    ],
    COtherTestsInfluence: [
        {label: 'DFFITs', checked: true, property: 'DFFIT', input: true, inputData: '2.000', inputProperty: 'StrsDFFIT'},
        {label: 'Leverage', checked: true, property: 'Leverage', input: true, inputData: '2.000', inputProperty: 'StrLeverage'},
        {label: 'Cooks Distance', checked: true, property: 'CooksDistance', input: true, inputData: '4.000', inputProperty: 'StrCooksDist'},
        {label: 'Power', checked: true, property: 'Power', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Report flagged values only', checked: true, property: 'ReportFlaggedOnly'},
    ]
}

export const nonlinearRegression: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, radio: true, property: 'iRadionorm', radioData: '0'},
        {label: 'Durbin-Watson', checked: true, property: 'DurbinWatson'},
        {label: 'Difference from 2.0', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrDurbinWatson'},
        {label: 'Equal Variance', checked: true, property: 'EqualVariance'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrEqualVarianceReject'},
    ],
    CResiduals: [
        {label: 'Studentized', checked: true, property: 'Studentized'},
        {label: 'Studentized Deleted', checked: true, property: 'StudentizedDeleted', input: true, inputData: "2.0", inputProperty: 'StrStudentizedDeleted'},
        {label: 'Raw', checked: true, property: 'RawColumn'},
        {label: 'Predicted Values', checked: true, property: 'PredictedColumn'},
        {label: 'Standardized', checked: true, property: 'Standardized', input: true, inputData: "2.5", inputProperty: 'StrStandardized'},
        {label: 'Report Flagged Values Only', checked: true, property: 'ReportFlaggedOnly'},
    ],
    COtherResults: [
        {label: 'Prediction', checked: true, property: 'Prediction'},
        {label: 'Confidence', checked: true, property: 'ConfInterval', input: true, inputData: "95", inputProperty: 'StrConfInterval'},
        {label: 'Starting in Column', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'StartInColumnSelect'},
        {label: 'Confidence Intervals for Parameters', checked: true, property: 'ConfIntervalParam', input: true, inputData: "95", inputProperty: 'StrConfIntervalParam'},
        {label: 'Covariance Matrix', checked: true, property: 'CovarianceMatrix'},
        {label: 'PRESS Prediction Error', checked: true, property: 'PRESSPredError'},
        {label: 'AICc - Alkaike Information Criterion', checked: true, property: 'AICcInfoCriterion'},
        {label: 'F-tests for simple model comparisons', checked: true, property: 'FtestModelCompare'},
    ],
    COtherTestsInfluence: [
        {label: 'DFFITs', checked: true, property: 'DFFIT', input: true, inputData: '2.000', inputProperty: 'StrsDFFIT'},
        {label: 'Leverage', checked: true, property: 'Leverage', input: true, inputData: '2.000', inputProperty: 'StrLeverage'},
        {label: 'Cooks Distance', checked: true, property: 'CooksDistance', input: true, inputData: '4.000', inputProperty: 'StrCooksDist'},
        {label: 'Variance Inflation Factor', checked: true, property: 'VarianceInflation', input: true, inputData: '4.000', inputProperty: 'StrVarianceInflation'},
        {label: 'Power', checked: true, property: 'Power', input: true, inputData: '0.050', inputProperty: 'StrPowerAlpha'},
        {label: 'Report flagged values only', checked: true, property: 'ReportFlaggedOnly'},
    ]
}

export const demingRegression: any = {
    CDemingOptions: [
        {label: 'Apply correction factor estimated by the reduced chi-square', checked: true, property: 'ScaleErrors'},
        {label: 'Add table of the predicted means', checked: true, property: 'EstMeans'},
        {label: 'Add parameter covariance matrix', checked: true, property: 'Covariance'},
        {label: 'Confidence Level', checked: true, property: '', input: true, inputData: '95', inputProperty: 'StrConfInterval'},
        {label: 'Create new graph', checked: true, property: 'CreateGraph'},
        {label: 'Add scatter plot of predicted means', checked: true, property: 'EstMeansPlot'},
        {label: 'Add confidence bands', checked: true, property: 'ConfBands'},
    ]
}

export const principalComponents: any = {
    CPCACriterion: [
        {label: 'Correlation / Covariance', checked: true, property: 'MatrixRadOption', radio: true, radioData: '0'},
        {label: 'Significance level for hypothesis testing', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'HypothesisLevel'},
        {label: 'Confidence Level', checked: true, property: '', input: true, inputData: '95', inputProperty: 'ConfLevel'},
        {label: 'Selection Method for Components', checked: true, property: 'SelMethodComponentOption', radio: true, radioData: '0'},
        {label: 'Minimum eigenvalue', checked: true, property: '', input: true, inputData: '', inputProperty: 'MinEigenValue'},
        {label: 'Minimum percent of total variance', checked: true, property: '', input: true, inputData: '', inputProperty: 'MinTotalVariance'},
        {label: 'Number of components', checked: true, property: '', input: true, inputData: '', inputProperty: 'NumOfComponents'},
    ],
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: "Henze-Zirkler / Mardia's test for skewness and kurtosis", checked: true, property: 'iRadionorm', radio: true, radioData: '0'},
    ],
    CResiduals: [
        {label: 'Component Scores', checked: true, property: 'ComponentColumn', dropdown: true, selectedData: 0, dropdownProperty: 'ComponentColumnSelect'},
        {label: 'Residuals', checked: true, property: 'bResidualColumn', dropdown: true, selectedData: 0, dropdownProperty: 'ResidualColumnSelect'},
    ],
    CPCAResults: [
        {label: 'Correlation matrix', checked: true, property: 'DoCovMatrix', dropdown: true, selectedData: 0, dropdownProperty: 'DoCovMatrixSelect'},
        {label: 'Component loadings', checked: true, property: 'DoCompLoadings'},
        {label: 'Proportion of variance explained by in-model components', checked: true, property: 'bDoProportionalVar'},
        {label: 'Fitted correlation matrix', checked: true, property: 'DoFittedMatrix', dropdown: true, selectedData: 0, dropdownProperty: 'DoFittedMatrixSelect'},
        {label: 'Difference between origin and fitted correlation matrix', checked: true, property: 'DoDiffMatrix', dropdown: true, selectedData: 0, dropdownProperty: 'DoDiffMatrixSelect'},
    ]
}

export const pearsonCorrelation: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: "Henze-Zirkler / Mardia's test for skewness and kurtosis", checked: true, property: 'iRadionorm', radio: true, radioData: '0'},
    ],
    CCorrelationResultsPage: [
        {label: "Matrix / Table", checked: true, property: 'Format', radio: true, radioData: '0'},
    ]
}

export const spearmanCorrelation: any = {
    CAssumeCheck: [
        {label: 'Normality', checked: true, property: 'Normality'},
        {label: 'P Value to Reject', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrsNormalityReject'},
        {label: "Henze-Zirkler / Mardia's test for skewness and kurtosis", checked: true, property: 'iRadionorm', radio: true, radioData: '0'},
    ],
    CCorrelationResultsPage: [
        {label: "Matrix / Table", checked: true, property: 'Format', radio: true, radioData: '0'},
    ]
}

export const normality: any = {
    CAssumeCheck: [
        {label: 'Shapiro-Wilk / Kolmogorov-Smimov', checked: true, property: 'iRadionorm', radio: true, radioData: '0'},
    ]
}

export const survivalSingleGroup: any = {
    CSurvivalGraphOptsPage: [
        {label: 'Censored', checked: true, property: 'CensoredSym'},
        {label: 'Failures', checked: true, property: 'FailureSym'},
        {label: 'Additional Plot Statistics', checked: true, property: 'bAdditionalPlot'},
        {label: 'Type', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'AdditionalItems'},
        {label: 'Group Color', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'ColorScheme'},
        {label: 'Survival Scale', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'Scale'},
    ],
    CSurvivalResultsPage: [
        {label: 'Cumulative Probability Table', checked: true, property: 'bSummaryInReport'},
        {label: 'P values for multiple comparisons', checked: false, property: 'PValuesInComparisonTables'},
        {label: '95% Confidence Intervals', checked: true, property: 'IntervalsInWorksheet'},
        {label: 'Time Units', checked: true, property: '', dropdown: true, selectedData: 3, dropdownProperty: 'TimePos'},
    ]
}

export const plotStatTypes: IDropdownOption[] = [
    { key: 0, text: '95% Confidence Intervals' },
    { key: 1, text: 'Standard Error Bars' },
];

export const groupColors: IDropdownOption[] = [
    { key: 0, text: 'Black' },
    { key: 1, text: 'Grayscale' },
    { key: 2, text: 'Incrementing Colors' },
];

export const survivalScale: IDropdownOption[] = [
    { key: 0, text: 'Fraction' },
    { key: 1, text: 'Percent' },
];

export const timeUnits: IDropdownOption[] = [
    { key: 0, text: 'None' },
    { key: 1, text: 'Seconds' },
    { key: 2, text: 'Minutes' },
    { key: 3, text: 'Hours' },
    { key: 4, text: 'Days' },
    { key: 5, text: 'Weeks' },
    { key: 6, text: 'Months' },
    { key: 7, text: 'Quarters' },
    { key: 8, text: 'Years' },
    { key: 9, text: 'Decades' },
];

export const survivalLogRank: any = {
    CSurvivalGraphOptsPage: [
        {label: 'Censored', checked: true, property: 'CensoredSym'},
        {label: 'Failures', checked: true, property: 'FailureSym'},
        {label: 'Additional Plot Statistics', checked: true, property: 'bAdditionalPlot'},
        {label: 'Type', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'AdditionalItems'},
        {label: 'Group Color', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'ColorScheme'},
        {label: 'Survival Scale', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'Scale'},
    ],
    CSurvivalResultsPage: [
        {label: 'Cumulative Probability Table', checked: true, property: 'bSummaryInReport'},
        {label: 'P values for multiple comparisons', checked: false, property: 'PValuesInComparisonTables'},
        {label: '95% Confidence Intervals', checked: true, property: 'IntervalsInWorksheet'},
        {label: 'Time Units', checked: true, property: '', dropdown: true, selectedData: 3, dropdownProperty: 'TimePos'},
    ],
    COtherTest: [
        {label: 'Multiple Comparison', checked: true, property: 'MultiCompareRadOption', radio: true, radioData: '1'},
        {label: 'Comparison Test', checked: true, property: '', dropdown: true, selectedData: 1, dropdownProperty: 'CompTestToUse'},
    ]
}

export const comparisonTestOptions: IDropdownOption[] = [
    { key: 0, text: 'Bonferroni' },
    { key: 1, text: 'Holm Sidak' },
];

export const survivalGehanBreslow: any = {
    CSurvivalGraphOptsPage: [
        {label: 'Censored', checked: true, property: 'CensoredSym'},
        {label: 'Failures', checked: true, property: 'FailureSym'},
        {label: 'Additional Plot Statistics', checked: true, property: 'bAdditionalPlot'},
        {label: 'Type', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'AdditionalItems'},
        {label: 'Group Color', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'ColorScheme'},
        {label: 'Survival Scale', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'Scale'},
    ],
    CSurvivalResultsPage: [
        {label: 'Cumulative Probability Table', checked: true, property: 'bSummaryInReport'},
        {label: 'P values for multiple comparisons', checked: false, property: 'PValuesInComparisonTables'},
        {label: '95% Confidence Intervals', checked: true, property: 'IntervalsInWorksheet'},
        {label: 'Time Units', checked: true, property: '', dropdown: true, selectedData: 3, dropdownProperty: 'TimePos'},
    ],
    COtherTest: [
        {label: 'Multiple Comparison', checked: true, property: 'MultiCompareRadOption', radio: true, radioData: '1'},
        {label: 'Comparison Test', checked: true, property: '', dropdown: true, selectedData: 1, dropdownProperty: 'CompTestToUse'},
    ]
}

export const coxPHModel: any = {
    CCoxCriterion: [
        {label: "Complete / Stepwise", checked: true, property: 'SelectMethod', radio: true, radioData: '0'},
        {label: 'Report likelihood values of each iteration', checked: true, property: 'ListIterations'},
        {label: 'P-to-Enter', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPtoEnter'},
        {label: 'P-to-Remove', checked: true, property: '', input: true, inputData: '0.100', inputProperty: 'StrPtoRemove'},
        {label: 'Maximum Steps', checked: true, property: '', input: true, inputData: '20', inputProperty: 'StrMaxSteps'},
        {label: 'Tolerance', checked: true, property: '', input: true, inputData: '1e-08', inputProperty: 'StrTolerance'},
        {label: 'Step Length', checked: true, property: '', input: true, inputData: '1.000', inputProperty: 'StrStepLength'},
        {label: 'Maximum Iterations', checked: true, property: '', input: true, inputData: '20', inputProperty: 'StrsMaxIterations'},
    ],
    CCoxResults: [
        {label: 'Descriptive Statistics for Covariates', checked: true, property: 'DescriptiveStats'},
        {label: 'Covariance Matrix', checked: false, property: 'CoxMatrix'},
        {label: 'Survival Table', checked: true, property: 'SurvTable', dropdown: true, selectedData: 2, dropdownProperty: 'CovSelection'},
        {label: 'Confidence Level', checked: true, property: '', input: true, inputData: '95', inputProperty: 'StrConfLevel'}, 
        {label: 'Time Units', checked: true, property: '', dropdown: true, selectedData: 3, dropdownProperty: 'TimeUnits'},
    ],
    CSurvivalGraphOptsPage: [
        {label: 'Censored', checked: true, property: 'CensoredSym'},
        {label: 'Failures', checked: true, property: 'FailureSym'},
        {label: 'Group Color', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'ColorScheme'},
        {label: 'Survival Scale', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'Scale'},
    ]
}

export const covariateValues: IDropdownOption[] = [
    { key: 0, text: 'Baseline' },
    { key: 1, text: 'Mean' },
    { key: 2, text: 'Median' },
];

export const coxStratifiedModel: any = {
    CCoxCriterion: [
        {label: "Complete / Stepwise", checked: true, property: 'SelectMethod', radio: true, radioData: '0'},
        {label: 'Report likelihood values of each iteration', checked: true, property: 'ListIterations'},
        {label: 'P-to-Enter', checked: true, property: '', input: true, inputData: '0.050', inputProperty: 'StrPtoEnter'},
        {label: 'P-to-Remove', checked: true, property: '', input: true, inputData: '0.100', inputProperty: 'StrPtoRemove'},
        {label: 'Maximum Steps', checked: true, property: '', input: true, inputData: '20', inputProperty: 'StrMaxSteps'},
        {label: 'Tolerance', checked: true, property: '', input: true, inputData: '1e-08', inputProperty: 'StrTolerance'},
        {label: 'Step Length', checked: true, property: '', input: true, inputData: '1.000', inputProperty: 'StrStepLength'},
        {label: 'Maximum Iterations', checked: true, property: '', input: true, inputData: '20', inputProperty: 'StrsMaxIterations'},
    ],
    CCoxResults: [
        {label: 'Descriptive Statistics for Covariates', checked: true, property: 'DescriptiveStats'},
        {label: 'Covariance Matrix', checked: false, property: 'CoxMatrix'},
        {label: 'Survival Table', checked: true, property: 'SurvTable', dropdown: true, selectedData: 2, dropdownProperty: 'CovSelection'},
        {label: 'Confidence Level', checked: true, property: '', input: true, inputData: '95', inputProperty: 'StrConfLevel'}, 
        {label: 'Time Units', checked: true, property: '', dropdown: true, selectedData: 3, dropdownProperty: 'TimeUnits'},
    ],
    CSurvivalGraphOptsPage: [
        {label: 'Censored', checked: true, property: 'CensoredSym'},
        {label: 'Failures', checked: true, property: 'FailureSym'},
        {label: 'Group Color', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'ColorScheme'},
        {label: 'Survival Scale', checked: true, property: '', dropdown: true, selectedData: 0, dropdownProperty: 'Scale'},
    ]
}
