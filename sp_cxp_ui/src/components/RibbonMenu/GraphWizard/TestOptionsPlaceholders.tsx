import {getdescriptiveStats,getOneWayFrequencyTable,getSignedRankTest,getZTest,getMcNamersTest,getRelativeTest,getOddsRatioTest,getLinearTest,getMultiple_Logistic_Test,getMultiple_Linear_Test,getPolynomial,getForward,getBackward,getBestSubset,getDeming} from '../../../App/Config'

var testOptions = [
  {
    name: 'Descriptive Statistics',
    wizardpreview: 'DATASELECTION',
    url: getdescriptiveStats,
    body:{
      "worksheet": "",
      "data_columns": [
        {
          "data_option":"Data",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        },
      ],

    },
  },
  {
    name: 'One Way Frequency Tables',
    wizardpreview: 'DATASELECTION',
    url: getOneWayFrequencyTable,
    body:{
      "worksheet": "",
      "data_columns": [
        {
          "data_option":"Data",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        },
      ],

    },
  },
  {
    name: 'One Sample t-test',
    wizardpreview: 'DATAFORMAT',
    url: 'https://localhost:/tests/execute_one_sample_ttest ',

    body: {
      raw: {
        data_format: 0,
        worksheet: 'sheet',
        data_columns: [
          {
            column: 2,
            start_row: 1,
            end_row: 8,
          },
        ],
        population_means: 'mean',
      },

      deviation: {
        data_format: 0,
        worksheet: 'sheet',
        data_columns: [
          {
            column: 2,
            start_row: 1,
            end_row: 8,
          },
        ],
        population_means: 'mean',
      },

      error: {
        data_format: 0,
        worksheet: 'sheet',
        data_columns: [
          {
            column: 2,
            start_row: 1,
            end_row: 8,
          },
        ],
        population_means: 'mean',
      },
    },
  },
  {
    name: 'One-Sample Signed Rank Test',
    wizardpreview: 'DATASELECTION',
    url: 'http://localhost:8000/tests/execute_one_sample_signed_rank_test ',
    body: {
      "worksheet": "",
      "data_columns": [
        {
        "data_option": "Data",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        }
      ],
      "population_median": 0
    }
  },
  {
    name: 't test',
    wizardpreview: 'DATAFORMAT',
    url: 'http://localhost:8000/tests/execute_unpaired_ttest ',
    body: {
      Raw:{
        "data_format": 0,
        "worksheet": "",
        "data_columns": [
          {
            "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
        {
          "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          }
        ]
      },

      Indexed: {
        "data_format": 3,
        "worksheet": "",
        "data_columns": [
          {
          "data_option": "Group",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
        {
          "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          }
        ]
      },

      Deviation: {
        "data_format": 1,
        "worksheet": "",
        "data_columns": [
          {
            "data_option": "Mean",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
          {
            "data_option": "Size",
            "column": 0,
            "start_row": 1,
            "end_row": 7
          },
          {
            "data_option": "Standard Deviation",
            "column": 0,
            "start_row": 1,
            "end_row": 7
          }
        ]

      },

      Error: {
        "data_format": 2,
        "worksheet": "",
        "data_columns": [
          {
            "data_option": "Mean",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
          {
            "data_option": "Size",
            "column": 0,
            "start_row": 1,
            "end_row": 7
          },
          {
            "data_option": "Standard Error",
            "column": 0,
            "start_row": 1,
            "end_row": 7
          }
        ]
      },
    },
  },
  {
    name: 'Rank Sum Test',
    wizardpreview: 'DATAFORMAT',
    url: 'http://localhost:8000/tests/execute_rank_sum_test',
    body: {
      raw: {
        "data_format": 0,
        "worksheet": "",
        "data_columns": [
          {
            "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
        {
          "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          }
        ]
      },

      Indexed: {
        "data_format": 3,
        "worksheet": "",
        "data_columns": [
          {
          "data_option": "Group",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
        {
          "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          }
        ]
      },
    },
  },
  {
    name: 'One Way ANOVA',
    wizardpreview: 'DATAFORMAT',
    url: 'http://localhost:8000/transformations/async',
    body: {
    Raw:{
      "worksheet": "",
      "data_format": 0,
      "data_columns": [
      {
      "data_option": "Data",
      "column": 0,
      "start_row": 1,
      "end_row": 8
     },
     {
      "data_option": "Data",
      "column": 0,
      "start_row": 1,
      "end_row": 7
     },
      {
      "data_option": "Data",
      "column": 0,
      "start_row": 1,
      "end_row": 8
      },
      {
      "data_option": "Data",
      "column": 0,
      "start_row": 1,
      "end_row": 7
      }


  ]
},
Indexed:{
  "worksheet": "",
  "data_format": 3,
  "data_columns": [
    {
      "data_option": "Group",
      "column": 0,
      "start_row": 1,
      "end_row": 8
    },
    {
      "data_option": "Data",
      "column": 0,
      "start_row": 1,
      "end_row": 8
    }
  ]
},
Deviation:{
  "data_format": 1,
   "worksheet": "",
   "data_columns": [
     {
       "data_option": "Mean",
       "column": 0,
       "start_row": 1,
       "end_row": 8
     },
     {
       "data_option": "Size",
       "column": 0,
       "start_row": 1,
       "end_row": 7
     },
     {
       "data_option": "Standard Deviation",
       "column": 0,
       "start_row": 1,
       "end_row": 7
     }
   ]
 },
 Error:{
  "data_format": 2,
  "worksheet": "",
  "data_columns": [
    {
      "data_option": "Mean",
      "column": 0,
      "start_row": 1,
      "end_row": 8
    },
    {
      "data_option": "Size",
      "column": 0,
      "start_row": 1,
      "end_row": 7
    },
    {
      "data_option": "Standard Error",
      "column": 0,
      "start_row": 1,
      "end_row": 7
    }
  ]
}
    }
  },
  {
    name: 'Two Way ANOVA',
    wizardpreview: 'DATASELECTION',
    url: 'http://localhost:8000/tests/execute_two_way_anova',
    body:{
      "worksheet": "",
      "data_columns": [
        {
          "data_option": "Factor A",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        },
        {
          "data_option": "Factor B",
          "column": 0,
          "start_row": 1,
          "end_row": 7
        },
        {
          "data_option": "Data",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        }
      ]
    }
  },
  {
    name: 'Three Way ANOVA',
    wizardpreview: 'DATASELECTION',
    url:'http://localhost:8000/tests/execute_three_way_anova',
    body:{
      "worksheet": "",
      "data_columns": [
        {
          "data_option": "Factor A",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        },
        {
          "data_option": "Factor B",
          "column": 0,
          "start_row": 1,
          "end_row": 7
        },
        {
          "data_option": "Factor C",
          "column": 0,
          "start_row": 1,
          "end_row": 7
        },
        {
          "data_option": "Data",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        }
      ]
    }
  },
  {
    name: 'ANOVA On Ranks',
    wizardpreview: 'DATAFORMAT',
    url:'http://localhost:8000/tests/execute_anova_on_rank',
    body:{
      Raw:{
        "worksheet": "",
        "data_format": 0,
        "data_columns": [
          {
            "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
          {
            "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 7
          },
          {
            "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
          {
            "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 7
          }
        ]
      },
      Indexed:{
        "worksheet": "",
        "data_format": 3,
        "data_columns": [
          {
            "data_option": "Factor",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
          {
            "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          }
        ]
      }
    }
  },
  {
    name: 'One Way ANCOVA',
    wizardpreview: 'DATASELECTION',
    url:'http://localhost:8000/tests/execute_one_way_ancova',
    body:{
      "worksheet": "",
      "data_columns": [
        {
          "data_option": "Factor",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        },
        {
          "data_option": "Dependent",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        },
        {
          "data_option": "Covariate",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        },
        {
          "data_option": "Covariate",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        }
      ]
    }
  },
  {
    name: 'Paired t-test',
    wizardpreview: 'DATAFORMAT',
  },
  {
    name: 'Signed Rank Test',
    wizardpreview: 'DATAFORMAT',
    url:getSignedRankTest,
    body:{
      Raw:{
          "worksheet": "",
          "data_format": 0,
          "data_columns": [
            {
              "data_option": "Data",
              "column": 0,
              "start_row": 1,
              "end_row": 8
            },
            {
              "data_option": "Data",
              "column": 0,
              "start_row": 1,
              "end_row": 8
            }
          ]

      },
      Indexed :{
        "worksheet": "",
        "data_format": 3,
        "data_columns": [
          {
            "data_option": "Subject",
            "column":0 ,
            "start_row": 1,
            "end_row": 8
          },
          {
            "data_option": "Treatment",
            "column":0 ,
            "start_row": 1,
            "end_row": 8
          },
          {
            "data_option": "Data",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          }
        ]
      }
    }
  },
  {
    name: 'One Way Repeated Measures ANOVA',
    wizardpreview: 'DATAFORMAT',
  },
  {
    name: 'Two Way Repeated Measures ANOVA',
    wizardpreview: 'DATASELECTION',
  },
  {
    name: 'Repeated Measures ANOVA On Ranks',
    wizardpreview: 'DATAFORMAT',
  },
  {
    name: 'Z-test',
    wizardpreview: 'DATASELECTION',
    url: getZTest,
    body:{
      "worksheet": "",
      "data_columns": [
    {
      "data_option": "Size",
      "column": 0,
      "start_row": 0,
      "end_row": 2
    },
    {
      "data_option": "Proportion",
      "column": 0,
      "start_row": 0,
      "end_row": 2
    }
  ]
    }
  },
  {
    name: 'Chi-square',
    wizardpreview: 'DATAFORMAT',
    url: 'https://localhost:/tests/execute_chisquare',
    body: {
      raw: {
        data_format: 1,
        worksheet: 'sheet',
        data_columns: [
          {
            data_option: 'Category-1',
            column: 2,
            start_row: 1,
            end_row: 8,
          },
          {
            data_option: 'Category-2',
            column: 2,
            start_row: 1,
            end_row: 8,
          },
        ],
      },
      tabulated: {
        data_format: 1,
        worksheet: 'sheet',
        data_columns: [
          {
            data_option: 'Category-1',
            column: 2,
            start_row: 1,
            end_row: 8,
          },
          {
            data_option: 'Category-2',
            column: 2,
            start_row: 1,
            end_row: 8,
          },
        ],
      },
    },
  },
  {
    name: 'Fisher Exact Test',
    wizardpreview: 'DATAFORMAT',
    url: 'https://localhost:/tests/execute_fischerexact',
    body: {
      raw: {
        data_format: 1,
        worksheet: 'sheet',
        data_columns: [
          {
            data_option: 'Category-1',
            column: 2,
            start_row: 1,
            end_row: 8,
          },
          {
            data_option: 'Category-2',
            column: 2,
            start_row: 1,
            end_row: 8,
          },
        ],
      },
      tabulated: {
        data_format: 0,
        worksheet: 'sheet',
        data_columns: [
          {
            data_option: 'Observations',
            column: 2,
            start_row: 1,
            end_row: 8,
          },
          {
            data_option: 'Observations',
            column: 2,
            start_row: 1,
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
    body:{
      Raw:{
        "data_format": 0,
         "worksheet": "",
         "data_columns": [
         {
           "data_option": "Category 1",
            "column":0,
          "start_row": 0,
          "end_row": 2
         },
        {
           "data_option": "Category 2",
            "column": 0,
           "start_row": 0,
            "end_row": 2
         }
       ]
      },
      Tabulated:{
        "data_format": 4,
        "worksheet": "",
        "data_columns": [
         {
          "data_option": "Observations",
         "column": 0,
          "start_row": 0,
          "end_row": 2
       }
       ]
      }
    }
  },
  {
    name: 'Relative Risk',
    wizardpreview: 'DATAFORMAT',
    url: getRelativeTest,
    body:{
      Raw:{
        "data_format": 0,
        "worksheet": "",
        "data_columns": [
    {
      "data_option": "Event",
      "column": 0,
      "start_row": 0,
      "end_row": 2
    },
    {
      "data_option": "Group",
      "column": 0,
      "start_row": 0,
      "end_row": 2
    },

  ]
      },
      Tabulated:{
        "data_format": 4,
        "worksheet": "",
        "data_columns": [
          {
            "data_option": "Event",
            "column": 0,
            "start_row": 0,
            "end_row": 2
          },
          {
            "data_option": "No Event",
            "column": 0,
            "start_row": 0,
            "end_row": 2
          }
        ]
      }

    }
  },
  {
    name: 'Odds Ratio',
    wizardpreview: 'DATAFORMAT',
    url: getOddsRatioTest,
    body:{
      Raw:{
        "data_format": 0,
        "worksheet": "",
        "data_columns": [
          {
            "data_option": "Event",
            "column": 0,
            "start_row": 0,
            "end_row": 2
          },
          {
            "data_option": "Group",
            "column": 0,
            "start_row": 0,
            "end_row": 2
          },

        ]
      },
      Tabulated:{
        "data_format": 4,
        "worksheet": "",
      "data_columns": [
    {
      "data_option": "Event",
      "column": 0,
      "start_row": 0,
      "end_row": 2
    },
    {
      "data_option": "No Event",
      "column": 0,
      "start_row": 0,
      "end_row": 2
    }
  ]
      }
    }
  },
  {
    name: 'Linear',
    wizardpreview: 'DATASELECTION',
    url: getLinearTest,
    wizardImageData: 'Select the independent variable column then click Finish.',
    body: {
      "worksheet": "",
       "data_columns": [
          {
            "data_option": "Dependent (y)",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
          {
            "data_option": "Independent (x)",
             "column": 0,
             "start_row": 1,
             "end_row": 8
          }
        ] },
  },
  {
    name: 'Multiple Logistic',
    wizardpreview: 'DATASELECTION',
    url: getMultiple_Logistic_Test,
    wizardImageData: "Select the dichotomous dependent variable column.This column must contain only 1's and 0's",
    body: {
        "worksheet": "",
        "data_columns":
         [
          {
            "data_option": "Dependent (y)",
            "column": 0,
            "start_row": 0,
            "end_row": 8
          },
          {
            "data_option": "Independent (x)",
            "column": 0,
            "start_row": 0,
            "end_row": 8
          }
        ]
    },
  },
  {
    name: 'Multiple Linear',
    wizardpreview: 'DATASELECTION',
    url: getMultiple_Linear_Test,
    wizardImageData: 'Select the independent variable column(s) then click Finish.',
    body: {
      "worksheet": "",
      "data_columns":
       [
         {
           "data_option": "Dependent (y)",
            "column": 0,
            "start_row": 1,
            "end_row": 8
          },
          {
           "data_option": "Independent (x)",
           "column": 3,
           "start_row": 1,
          "end_row": 8
          }
      ]
  },
  },
  {
    name: 'Polynomial',
    wizardpreview: 'DATASELECTION',
    url: getPolynomial,
    wizardImageData: 'Select the dependent variable column.',
    body: {
      "worksheet": "",
      "data_columns": [
        {
          "data_option": "Dependent (y)",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        },
        {
          "data_option": "Independent (x)",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        }
      ]
    },
  },
  {
    name: 'Forward',
    wizardpreview: 'DATASELECTION',
    wizardImageData: 'Select the dependent variable column.',
    url: getForward,
    wizardImageDataSecondStep: 'Pick the variables(s) to always use in the model.',
    body:{
        "worksheet": "",
        "data_columns": [
          {
            "data_option": "Dependent (y)",
            "column": 0,
            "start_row": 0,
            "end_row": 8
          },
          {
            "data_option": "Independent (x)",
            "column": 0,
            "start_row": 0,
            "end_row": 8
          }
        ],
        "forced_variables": [
        ]
    }
  },
  {
    name: 'Backward',
    wizardpreview: 'DATASELECTION',
    wizardImageData: 'Select the dependent variable column.',
    wizardImageDataSecondStep: 'Pick the variables(s) to always use in the model.',
    url: getBackward,
    body:{
      "worksheet": "",
      "data_columns": [
        {
          "data_option": "Dependent (y)",
          "column": 0,
          "start_row": 0,
          "end_row": 8
        },
        {
          "data_option": "Independent (x)",
          "column": 0,
          "start_row": 0,
          "end_row": 8
        }
      ],
      "forced_variables": [
      ]
  }
  },
  {
    name: 'Best Subset',
    wizardpreview: 'DATASELECTION',
    wizardImageData: 'Select the independent variable column(s) then click Finish.',
    url: getBestSubset,
    body:{
      "worksheet": "",
      "data_columns": [
        {
          "data_option": "Dependent (y)",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        },
        {
          "data_option": "Independent (x)",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        }
      ]
    }
  },
  {
    name: 'Regression Wizard',
    wizardpreview: 'CACULATION',
  },
  {
    name: 'Deming',
    wizardpreview: 'DATAFORMAT',
    wizardImageDataXYPair: 'Observations are selected from two columns.Enter here a standard deviation for all x-data and a standard deviation for all y-data.',
    wizardImageDataXYPairErrors: 'Observations are selected from two columns.Standard deviations for each observation are selected from the worksheet.',
    url: getDeming,
    body:{
      "data_format": 5,
      "worksheet": "",
      "sd_of_x": 0,
      "sd_of_y": 0,
      "data_columns": [
        {
          "data_option": "X",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        },
        {
          "data_option": "Y",
          "column": 0,
          "start_row": 1,
          "end_row": 8
        }
      ]
    }
  },
  {
    name: 'Principal Components',
    wizardpreview: 'DATASELECTION',
    url: 'http://localhost:8000/tests/execute_principal_components',
    body:{
      "worksheet": "",
      "data_columns": [
        {
          "data_option": "Variable",
          "column": 2,
          "start_row": 1,
          "end_row": 8
        }
      ],
      "label": []

    },
  },
  {
    name: 'Pearson Product Moment',
    wizardpreview: 'DATASELECTION',
    url: 'http://localhost:8000/tests/execute_pearson',
    body:{
      "worksheet": "",
      "data_columns": [
        {
                "data_option": "Variable",
                "column": 0,
               "start_row": 1,
               "end_row": 8
           }
      ],

    },
  },
  {
    name: 'Spearman Rank Order',
    wizardpreview: 'DATASELECTION',
    url: 'http://localhost:8000/tests/execute_spearman',
    body:{
      "worksheet": "",
      "data_columns": [
        {
          "data_option": "Variable",
          "column": 0,
         "start_row": 1,
         "end_row": 8
     }
      ],

    },
  },
  {
    name: 'Single Group',
    wizardpreview: 'DATASELECTION',
  },
  {
    name: 'LogRank',
    wizardpreview: 'DATAFORMAT',
  },
  {
    name: 'Gehan-Breslow',
    wizardpreview: 'DATAFORMAT',
  },
  {
    name: 'Proportional Hazards',
    wizardpreview: 'DATASELECTION',
  },
  {
    name: 'Stratified Model',
    wizardpreview: 'DATASELECTION',
  },

  {
    name: 'Normality',
    wizardpreview: 'DATASELECTION',
    url: 'http://localhost:8000/tests/execute_normality_statistics',
    body:{
      "worksheet": "",
      "data_columns": [
         {
                "data_option": "Data",
                "column": 0,
                "start_row": 1,
                "end_row": 8
              }
      ],

    },
  },
  {
    name: 'Normalize Ternary Data',
    wizardpreview: 'DATASELECTION',
    wizardImageData: 'Select the columns to normalize into ternary data by clicking the columns in the worksheet.'
  },
  {
    name: 'Histogram',
    wizardpreview: 'DATASELECTION',
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
  }
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

