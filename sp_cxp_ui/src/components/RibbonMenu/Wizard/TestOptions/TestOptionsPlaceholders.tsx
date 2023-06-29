import {
  getdescriptiveStats,
  getOneWayFrequencyTable,
  getSignedRankTest,
  getZTest,
  getMcNamersTest,
  getRelativeTest,
  getOddsRatioTest,
  getLinearTest,
  getMultiple_Logistic_Test,
  getMultiple_Linear_Test,
  getPolynomial,
  getForward,
  getBackward,
  getBestSubset,
  getDeming,
  getPairedTest,
  getOneWayRMAnova,
  getTwoWayRMAnova,
  getRMAnovaOnRanks,
  getOneSampleTest,
  getOneSampleRanktest,
  getUnpairedTest,
  getRankSumTest,
  getOneWayAnova,
  getTwoWayAnova,
  getThreeWayAnova,
  getAnovaOnRanks,
  getOneWayAncova,
  getChiSquare,
  getFisherExact,
  getPrincipalComponents,
  getPearson,
  getSpearman,
  getSingleGrpup,
  getLogRank,
  getGehanBreslow,
  getCoxPhModel,
  getCoxStratifiedModel,
  getNormality,
  getHistogram
} from '../../../App/Config';

var testOptions = [
  {
    name: 'Descriptive Statistics',
    wizardpreview: 'DATASELECTION',
    url: getdescriptiveStats,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Data',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
      ],
    },
  },
  {
    name: 'One Way Frequency Tables',
    wizardpreview: 'DATASELECTION',
    url: getOneWayFrequencyTable,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Data',
          column: 0,
          start_row: 0,
          end_row: 8,
        },
      ],
    },
  },
  {
    name: 'One Sample t-test',
    wizardpreview: 'DATAFORMAT',
    url: getOneSampleTest,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      raw: {
        data_format: 0,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Data',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
        ],
        population_mean: 'mean',
      },

      deviation: {
        data_format: 1,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Mean',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Size',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Standard Deviation',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
        ],
        population_mean: 'mean',
      },

      error: {
        data_format: 2,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Mean',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Size',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Standard Error',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
        ],
        population_mean: 'mean',
      },
    },
  },
  {
    name: 'One-Sample Signed Rank Test',
    wizardpreview: 'DATASELECTION',
    url: getOneSampleRanktest,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Data',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
      ],
      population_median: 0,
    },
  },
  {
    name: 't test',
    wizardpreview: 'DATAFORMAT',
    url: getUnpairedTest,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      Raw: {
        data_format: 0,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },

      Indexed: {
        data_format: 3,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Group',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },

      Deviation: {
        data_format: 1,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Mean',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Size',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Standard Deviation',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },

      Error: {
        data_format: 2,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Mean',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Size',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Standard Error',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
    },
  },
  {
    name: 'Rank Sum Test',
    wizardpreview: 'DATAFORMAT',
    url: getRankSumTest,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      raw: {
        data_format: 0,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },

      Indexed: {
        data_format: 3,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Group',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
    },
  },
  {
    name: 'One Way ANOVA',
    wizardpreview: 'DATAFORMAT',
    url: getOneWayAnova,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      Raw: {
        worksheet: '',
        data_format: 0,
        data_columns: [
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
      Indexed: {
        worksheet: '',
        data_format: 3,
        data_columns: [
          {
            data_option: 'Group',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
      Deviation: {
        data_format: 1,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Mean',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Size',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Standard Deviation',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
      Error: {
        data_format: 2,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Mean',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Size',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Standard Error',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
    },
  },
  {
    name: 'Two Way ANOVA',
    wizardpreview: 'DATASELECTION',
    url: getTwoWayAnova,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Factor A',
          column: 0,
          start_row: 0,
          end_row: 11,
        },
        {
          data_option: 'Factor B',
          column: 0,
          start_row: 0,
          end_row: 11,
        },
        {
          data_option: 'Data',
          column: 0,
          start_row: 0,
          end_row: 11,
        },
      ],
    },
  },
  {
    name: 'Three Way ANOVA',
    wizardpreview: 'DATASELECTION',
    url: getThreeWayAnova,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Factor A',
          column: 0,
          start_row: 0,
          end_row: 33,
        },
        {
          data_option: 'Factor B',
          column: 0,
          start_row: 0,
          end_row: 33,
        },
        {
          data_option: 'Factor C',
          column: 0,
          start_row: 0,
          end_row: 33,
        },
        {
          data_option: 'Data',
          column: 0,
          start_row: 0,
          end_row: 33,
        },
      ],
    },
  },
  {
    name: 'ANOVA On Ranks',
    wizardpreview: 'DATAFORMAT',
    url: getAnovaOnRanks,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      Raw: {
        worksheet: '',
        data_format: 0,
        data_columns: [
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
      Indexed: {
        worksheet: '',
        data_format: 3,
        data_columns: [
          {
            data_option: 'Factor',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
    },
  },
  {
    name: 'One Way ANCOVA',
    wizardpreview: 'DATASELECTION',
    url: getOneWayAncova,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Factor',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
        {
          data_option: 'Dependent',
          column: 0,
          start_row: 0,
          end_row:0,
        },
        {
          data_option: 'Covariate',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
        // {
        //   data_option: 'Covariate',
        //   column: 0,
        //   start_row: 0,
        //   end_row: 1000,
        // },
      ],
    },
  },
  {
    name: 'Paired t-test',
    wizardpreview: 'DATAFORMAT',
    testFlow: 'Interactive test-MultiComparsion',
    url: getPairedTest,
    body: {
      raw: {
        data_format: 0,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Data',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Data',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
        ],
      },

      indexed: {
        data_format: 3,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Subject',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Treatment',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Data',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
    },
  },
  {
    name: 'Signed Rank Test',
    wizardpreview: 'DATAFORMAT',
    url: getSignedRankTest,
    testFlow: 'Interactive test',
    body: {
      Raw: {
        worksheet: '',
        data_format: 0,
        data_columns: [
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
        ],
      },
      Indexed: {
        worksheet: '',
        data_format: 3,
        data_columns: [
          {
            data_option: 'Subject',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
          {
            data_option: 'Treatment',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
        ],
      },
    },
  },
  {
    name: 'One Way Repeated Measures ANOVA',
    wizardpreview: 'DATAFORMAT',
    testFlow: 'Interactive test-MultiComparsion',
    url: getOneWayRMAnova,
    body: {
      Raw: {
        worksheet: '',
        data_format: 0,
        data_columns: [
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
          
        ],
      },
      Indexed: {
        worksheet: '',
        data_format: 3,
        data_columns: [
          {
            data_option: 'Subject',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
          {
            data_option: 'Level',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
        ],
      },
    },
  },
  {
    name: 'Two Way Repeated Measures ANOVA',
    wizardpreview: 'DATASELECTION',
    testFlow: 'Interactive test-MultiComparsion',
    url: getTwoWayRMAnova,
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Subject',
          column: 0,
          start_row: 0,
          end_row: 8,
        },
        {
          data_option: 'Factor A',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
        {
          data_option: 'Factor B',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
        {
          data_option: 'Data',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
      ],
    },
  },
  {
    name: 'Repeated Measures ANOVA On Ranks',
    wizardpreview: 'DATAFORMAT',
    testFlow: 'Interactive test-MultiComparsion',
    url: getRMAnovaOnRanks,
    body: {
      Raw: {
        worksheet: '',
        data_format: 0,
        data_columns: [
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 0,
          }
        ],
      },
      Indexed: {
        worksheet: '',
        data_format: 3,
        data_columns: [
          {
            data_option: 'Subject',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
          {
            data_option: 'Level',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
          {
            data_option: 'Data',
            column: 0,
            start_row: 0,
            end_row: 8,
          },
        ],
      },
    },
  },
  {
    name: 'Z-test',
    wizardpreview: 'DATASELECTION',
    url: getZTest,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Size',
          column: 0,
          start_row: 0,
          end_row: 2,
        },
        {
          data_option: 'Proportion',
          column: 0,
          start_row: 0,
          end_row: 2,
        },
      ],
    },
  },
  {
    name: 'Chi-square',
    wizardpreview: 'DATAFORMAT',
    url: getChiSquare,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      raw: {
        data_format: 0,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Category_1',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
          {
            data_option: 'Category_2',
            column: 2,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
      tabulated: {
        data_format: 4,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Observations',
            column: 1,
            start_row: 0,
            end_row: 0,
          },
        ],
      },
    },
  },
  {
    name: 'Fisher Exact Test',
    wizardpreview: 'DATAFORMAT',
    url: getFisherExact,
    testFlow: 'Interactive test-MultiComparsion',
    body: {
      raw: {
        data_format: 0,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Category 1',
            column: 2,
            start_row: 0,
            end_row: 8,
          },
          {
            data_option: 'Category 2',
            column: 2,
            start_row: 0,
            end_row: 8,
          },
        ],
      },
      tabulated: {
        data_format: 4,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Observations',
            column: 2,
            start_row: 0,
            end_row: 8,
          },
          {
            data_option: 'Observations',
            column: 2,
            start_row: 0,
            end_row: 8,
          },
        ],
      },
    },
  },
  {
    name: "McNemar's test",
    wizardpreview: 'DATAFORMAT',
    url: getMcNamersTest,
    testFlow: 'Interactive test',
    body: {
      Raw: {
        data_format: 0,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Category 1',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
          {
            data_option: 'Category 2',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
        ],
      },
      Tabulated: {
        data_format: 4,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Observations',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
        ],
      },
    },
  },
  {
    name: 'Relative Risk',
    wizardpreview: 'DATAFORMAT',
    url: getRelativeTest,
    testFlow: 'Interactive test',
    body: {
      Raw: {
        data_format: 0,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Event',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
          {
            data_option: 'Group',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
        ],
      },
      Tabulated: {
        data_format: 4,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Event',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
          {
            data_option: 'No Event',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
        ],
      },
    },
  },
  {
    name: 'Odds Ratio',
    wizardpreview: 'DATAFORMAT',
    url: getOddsRatioTest,
    testFlow: 'Interactive test',
    body: {
      Raw: {
        data_format: 0,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Event',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
          {
            data_option: 'Group',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
        ],
      },
      Tabulated: {
        data_format: 4,
        worksheet: '',
        data_columns: [
          {
            data_option: 'Event',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
          {
            data_option: 'No Event',
            column: 0,
            start_row: 0,
            end_row: 2,
          },
        ],
      },
    },
  },
  {
    name: 'Linear',
    wizardpreview: 'DATASELECTION',
    url: getLinearTest,
    testFlow: 'Interactive test',
    wizardImageData:
      'Select the independent variable column then click Finish.',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Dependent (y)',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
        {
          data_option: 'Independent (x)',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
      ],
    },
  },
  {
    name: 'Multiple Logistic',
    wizardpreview: 'DATASELECTION',
    url: getMultiple_Logistic_Test,
    testFlow: 'Interactive test',
    wizardImageData:
      "Select the dichotomous dependent variable column.This column must contain only 1's and 0's",
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Dependent (y)',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
        {
          data_option: 'Independent (x)',
          column: 0,
          start_row:0,
          end_row: 0,
        },
      ],
    },
  },
  {
    name: 'Multiple Linear',
    wizardpreview: 'DATASELECTION',
    url: getMultiple_Linear_Test,
    testFlow: 'Interactive test',
    wizardImageData:
      'Select the independent variable column(s) then click Finish.',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Dependent (y)',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
        {
          data_option: 'Independent (x)',
          column: 3,
          start_row: 0,
          end_row: 0,
        },
      ],
    },
  },
  {
    name: 'Polynomial',
    wizardpreview: 'DATASELECTION',
    url: getPolynomial,
    wizardImageData: 'Select the dependent variable column.',
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Dependent (y)',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
        {
          data_option: 'Independent (x)',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
      ],
    },
  },
  {
    name: 'Forward',
    wizardpreview: 'DATASELECTION',
    wizardImageData: 'Select the dependent variable column.',
    url: getForward,
    testFlow: 'Interactive test',
    wizardImageDataSecondStep:
      'Pick the variables(s) to always use in the model.',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Dependent (y)',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
        {
          data_option: 'Independent (x)',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
      ],
      forced_variables: [],
    },
  },
  {
    name: 'Backward',
    wizardpreview: 'DATASELECTION',
    testFlow: 'Interactive test',
    wizardImageData: 'Select the dependent variable column.',
    wizardImageDataSecondStep:
      'Pick the variables(s) to always use in the model.',
    url: getBackward,
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Dependent (y)',
          column: 0,
          start_row: 0,
          end_row: 8,
        },
        {
          data_option: 'Independent (x)',
          column: 0,
          start_row: 0,
          end_row: 8,
        },
      ],
      forced_variables: [],
    },
  },
  {
    name: 'Best Subset',
    wizardpreview: 'DATASELECTION',
    wizardImageData:
      'Select the independent variable column(s) then click Finish.',
    url: getBestSubset,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Dependent (y)',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
        {
          data_option: 'Independent (x)',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
      ],
    },
  },
  {
    name: 'Regression Wizard',
    wizardpreview: 'CACULATION',
  },
  {
    name: 'Deming',
    wizardpreview: 'DATAFORMAT',
    wizardImageDataXYPair:
      'Observations are selected from two columns.Enter here a standard deviation for all x-data and a standard deviation for all y-data.',
    wizardImageDataXYPairErrors:
      'Observations are selected from two columns.Standard deviations for each observation are selected from the worksheet.',
    url: getDeming,
    testFlow: 'Interactive test',
    body: {
      data_format: 5,
      worksheet: '',
      sd_of_x: 0,
      sd_of_y: 0,
      data_columns: [
        {
          data_option: 'X',
          column: 0,
          start_row: 0,
          end_row: 8,
        },
        {
          data_option: 'Y',
          column: 0,
          start_row: 0,
          end_row: 8,
        },
      ],
    },
  },
  {
    name: 'Principal Components',
    wizardpreview: 'DATASELECTION',
    url: getPrincipalComponents,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Variable',
          column: 2,
          start_row: 0,
          end_row: 8,
        },
      ],
      label: [],
    },
  },
  {
    name: 'Pearson Product Moment',
    wizardpreview: 'DATASELECTION',
    url: getPearson,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Variable',
          column: 0,
          start_row: 0,
          end_row: 8,
        },
      ],
    },
  },
  {
    name: 'Spearman Rank Order',
    wizardpreview: 'DATASELECTION',
    testFlow: 'Interactive test',
    url: getSpearman,
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Variable',
          column: 0,
          start_row: 0,
          end_row: 0,
        },
      ],
    },
  },
  {
    name: 'Single Group',
    wizardpreview: 'DATASELECTION',
    url: getSingleGrpup,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Time',
          column: '',
          start_row: 0,
          end_row: 2,
        },
        {
          data_option: 'Status',
          column: '',
          start_row: 0,
          end_row: 2,
        },
      ],
      event_labels: [],
      censor_labels: [],
      status_labels: [],
    },
  },
  {
    name: 'LogRank',
    wizardpreview: 'DATAFORMAT',
    url: getLogRank,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_format: 0,
      data_columns: [],
      event_labels: [],
      censor_labels: [],
      status_labels: [],
    },
  },
  {
    name: 'Gehan-Breslow',
    wizardpreview: 'DATAFORMAT',
    url: getGehanBreslow,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_format: 0,
      data_columns: [],
      event_labels: [],
      censor_labels: [],
      status_labels: [],
    },
  },
  {
    name: 'Proportional Hazards',
    wizardpreview: 'DATASELECTION',
    url: getCoxPhModel,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [],
      event_labels: [],
      censor_labels: [],
      status_labels: [],
      covariates: [],
    },
  },
  {
    name: 'Stratified Model',
    wizardpreview: 'DATASELECTION',
    url: getCoxStratifiedModel,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [],
      event_labels: [],
      censor_labels: [],
      status_labels: [],
      covariates: [],
    },
  },

  {
    name: 'Normality',
    wizardpreview: 'DATASELECTION',
    url: getNormality,
    testFlow: 'Interactive test',
    body: {
      worksheet: '',
      data_columns: [
        {
          data_option: 'Data',
          column: 0,
          start_row: 0,
          end_row: 8,
        },
      ],
    },
  },
  {
    name: 'Normalize Ternary Data',
    wizardpreview: 'DATASELECTION',
    wizardImageData:
      'Select the columns to normalize into ternary data by clicking the columns in the worksheet.',
  },
  {
    name: 'Histogram',
    wizardpreview: 'DATASELECTION',
    url: getHistogram,
    body: {
      worksheet: '',
      normalization: '',
      no_of_bins: 0,
      auto_binning: false,
      bin_edge: 'Left',
      graph_style: 'Vertical Bar',
      data_columns: [
        {
          data_option: 'Source',
          column: 2,
          start_row: 0,
          end_row: 2,
        },
      ],
    },
  },
  {
    name: 'Smoothers2D',
    wizardpreview: 'DATASELECTION',
  },
  {
    name: 'Smoothers3D',
    wizardpreview: 'DATASELECTION',
  },
  {
    name: 'Chi-square...',
    wizardpreview: 'DATASELECTION',
  },
];

export function accessTestOptions(options) {
  let data;
  if (options) {
    for (let i = 0; i < testOptions.length; i++) {
      const element = testOptions[i];
      if (element.name.toLowerCase() == options.toLowerCase()) {
        data = element;
        break;
      }
    }
    return data;
  }
  return 'DATASELECTION';
}
