import { IContextualMenuProps } from "office-ui-fabric-react";

export const tests: IContextualMenuProps = {
        className: "analysisDropDrown",
        items: [
          {
            key: 'describeData',
            text: 'Describe Data',
            iconProps: {},
            subMenuProps: {
              items: [
                {
                  key: 'descriptivestatistics',
                  text: 'Descriptive Statistics',
                  iconProps: {},
                  onClick: (ev)=>{alert(ev)}
                },
                {
                  key: 'onewayfrequencytables',
                  text: 'One Way Frequency Tables',
                  iconProps: {},
                },
              ]
            }
          },
          {
            key: 'singleGroup',
            text: 'Single Group',
            iconProps: {},
            subMenuProps: {
              items: [
                {
                  key: 'onesamplettest',
                  text: 'One Sample t-test',
                  iconProps: {},
                },
                {
                  key: 'onesamplesignedrankedtest',
                  text: 'One-Sample Signed Rank Test',
                  iconProps: {},
                }
              ]
            }
          },
          {
            key: 'comparetwogroups',
            text: 'Compare Two Groups',
            iconProps: {},
            subMenuProps: {
              items: [
                {
                  key: 'ttest',
                  text: 't test',
                  iconProps: {},
                },
                {
                  key: 'rankedSumTest',
                  text: 'Rank Sum Test',
                  iconProps: {},
                }
              ]
            }
          },
          {
            key: 'compareManyGroups',
            text: 'Compare Many Groups',
            iconProps: {},
            subMenuProps: {
              items: [
                {
                  key: 'oneWayAnova',
                  text: 'One Way ANOVA',
                  iconProps: {},
                },
                {
                  key: 'twoWayAnova',
                  text: 'Two Way ANOVA',
                  iconProps: {},
                },
                {
                  key: 'ThreeWayAnova',
                  text: 'Three Way ANOVA',
                  iconProps: {},
                },
                {
                  key: 'AnovaOnRanks',
                  text: 'ANOVA On Ranks',
                  iconProps: {},
                },
                {
                  key: 'oneWayAnCova',
                  text: 'One Way ANCOVA',
                  iconProps: {},
                },
              ]
            }
          },
          {
            key: 'beforeAndAfter',
            text: 'Before And After',
            iconProps: {},
            subMenuProps: {
              items: [
                {
                  key: 'pairedttest',
                  text: 'Paired T-test',
                  iconProps: {},
                },
                {
                  key: 'signedRankTest',
                  text: 'Signed Rank Test',
                  iconProps: {},
                },
              ]
            }
          },
          {

            key: 'repeatedMeasures',
            text: 'Repeated Measures',
            iconProps: {},
            subMenuProps: {
              items: [
                {
                  key: 'OneWayRepeatedMeasuresAnova',
                  text: 'One Way Repeated Measures ANOVA',
                  iconProps: {},
                },
                {
                  key: 'OtwoWayRepeatedMeasuresAnova',
                  text: 'Two Way Repeated Measures ANOVA',
                  iconProps: {},
                },
                {
                  key: 'RepeatedMeasuresAnovaOnRanks',
                  text: ' Repeated Measures ANOVA On Ranks',
                  iconProps: {},
                },
              ]
            }
          },
          {
            key: 'ratesAndProprtions',
            text: 'Rates And Proportions',
            iconProps: {},
            subMenuProps: {
              items: [
                {
                  key: 'ztest',
                  text: 'z-test',
                  iconProps: {},
                },
                {
                  key: 'chisquare',
                  text: 'Chi-square',
                  iconProps: {},
                },
                {
                  key: 'fisherExactTest',
                  text: 'Fisher Exact Test',
                  iconProps: {},
                },
                {
                  key: 'mcnemarstest',
                  text: "McNemar's Test",
                  iconProps: {},
                },
                {
                  key: 'relativeRisk',
                  text: 'Relative Risk',
                  iconProps: {},
                },
                {
                  key: 'oddsRatio',
                  text: 'Odds Ratio',
                  iconProps: {},
                },
              ]
            }
          },
          {
            key: 'regression',
            text: 'Regression',
            iconProps: {},
            subMenuProps: {
              items: [
                {
                  key: 'linear',
                  text: 'Linear',
                  iconProps: {},
                },
                {
                  key: 'multipleLogistic',
                  text: 'Multiple Logistic',
                  iconProps: {},
                },
                {
                  key: 'multipleLinear',
                  text: 'Multiple Linear',
                  iconProps: {},
                },
                {
                  key: 'polynomial',
                  text: 'Polynomial',
                  iconProps: {},
                },
                {
                  key: 'stepwise',
                  text: 'Stepwise',
                  subMenuProps: {
                    items: [
                      {
                        key: 'forward',
                        text: 'Forward',
                        iconProps: {},
                      },
                      {
                        key: 'backword',
                        text: 'Backward',
                        iconProps: {},
                      },
                    ]
                  }
                },
                {
                  key: 'bestsubsets',
                  text: 'Best Subset',
                  iconProps: {},
                },
                // {
                //   key: 'regressionWizard',
                //   text: 'Regression Wizard',
                //   iconProps: {},
                // },
                {
                  key: 'deming',
                  text: 'Deming',
                  iconProps: {},
                },
              ]
            }
          },
          {
            key: 'prinicipalComponents',
            text: 'Principal Components',
            iconProps: {},

          },
          {
            key: 'correlation',
            text: 'Correlation',
            iconProps: {},
            subMenuProps: {
              items: [
                {
                  key: 'pearsonProductMoment',
                  text: 'Pearson Product Moment',
                  iconProps: {},
                },
                {
                  key: 'spearmanRankOrder',
                  text: 'Spearman Rank Order',
                  iconProps: {},
                },
              ]
            }
          },
          {
            key: 'survival',
            text: 'Survival',
            iconProps: {},
            subMenuProps: {
              items: [
                {
                  key: 'kaplanMeier',
                  text: 'Kaplan-Meier',
                  iconProps: {},
                  subMenuProps: {
                    items: [
                      {
                        key: 'singlegroup',
                        text: 'Single Group',
                        iconProps: {},
                      },
                      {
                        key: 'logRank',
                        text: 'LogRank',
                        iconProps: {},
                      },
                      {
                        key: 'gehanbreslow',
                        text: 'Gehan-Breslow',
                        iconProps: {},
                      },
                    ]
                  },
                },
                {
                  key: 'coxRegression',
                  text: 'Cox Regression',
                  iconProps: {},
                  subMenuProps: {
                    items: [
                      {
                        key: 'proportionalhazards',
                        text: 'Proportional Hazards',
                        iconProps: {},
                      },
                      {
                        key: 'stratifiedModel',
                        text: 'Stratified Model',
                        iconProps: {},
                      },
                    ]
                  },
                },
              ]
            }
          },
          {
            key: 'normality',
            text: 'Normality',
            iconProps: {},
          },


        ],
      }

     export const statistical: IContextualMenuProps = {
      className: "analysisDropDrown",
        items: [
          {
            key: 'stack',
            text: 'Stack',
            iconProps: { },
          },
          {
            key: 'index',
            text: 'Index',
            iconProps: { },
            subMenuProps: {
              className: "dropdownList analysisDropDrown statistical",
              items: [
                  {
                    key: 'oneway',
                    text: 'One Way',
                    iconProps: {  },
                  },
                  {
                    key: 'twoway',
                    text: 'Two Way',
                    iconProps: {  },
                  },
                ]
              },
          },
          {
            key: 'unindex',
            text: 'Unindex',
            iconProps: { },
            subMenuProps: {
              className: "dropdownList analysisDropDrown statistical",
              items: [
                  {
                    key: 'oneway',
                    text: 'One Way',
                    iconProps: {  },
                  },
                  {
                    key: 'twoway',
                    text: 'Two Way',
                    iconProps: {  },
                  },
                ]
              },
          },
          {
            key: 'simpletransforms',
            text: 'Simple Transforms',
            iconProps: {  },
            subMenuProps: {
              className: "dropdownList analysisDropDrown statistical",
              items: [
                  {
                    key: 'add',
                    text: 'Add',
                    iconProps: {  },
                  },
                  {
                    key: 'subtract',
                    text: 'Subtract',
                    iconProps: {  },
                  },
                  {
                    key: 'divide',
                    text: 'Divide',
                    iconProps: {  },
                  },
                  {
                    key: 'square',
                    text: 'Square',
                    iconProps: {  },
                  },
                  {
                    key: 'absolute',
                    text: 'Absolute Value',
                    iconProps: {  },
                  },
                  {
                    key: 'ln',
                    text: 'Ln',
                    iconProps: {  },
                  },
                  {
                    key: 'log10',
                    text: 'Log 10',
                    iconProps: {  },
                  },
                  {
                    key: 'reciprocal',
                    text: 'Reciprocal',
                    iconProps: {  },
                  },
                  {
                    key: 'exponential',
                    text: 'Exponential',
                    iconProps: {  },
                  },
                  {
                    key: 'squareroot',
                    text: 'Square Root',
                    iconProps: {  },
                  },
                  {
                    key: 'arcsinsquareroot',
                    text: 'Arcsin Square Root',
                    iconProps: {  },
                  },

                ]
              },

          },
          {
            key: 'center',
            text: 'Center',
            iconProps: {  },
          },
          {
            key: 'standardize',
            text: 'Standardize',
            iconProps: {  },
          },
          {
            key: 'rank',
            text: 'Rank',
            iconProps: {  },
          },
          {
            key: 'interactions',
            text: 'Interactions',
            iconProps: {  },
          },

          {
            key:'dummyvariable',
            text:'Dummy Variables',
            iconProps:{},
            subMenuProps: {
              className: "dropdownList analysisDropDrown statistical",
              items: [
                  {
                    key: 'referenceCoding',
                    text: 'Reference Coding',
                    iconProps: {  },
                  },
                  {
                    key: 'effectsCoding',
                    text: 'Effects Coding',
                    iconProps: {  },
                  },
                ]
              },
          },
          {
            key: 'laggedvariables',
            text: 'Lagged Variables',
            iconProps: {  },
          },
          {
            key: 'filter',
            text: 'Filter',
            iconProps: {  },
          },
          {
            key: 'randomNumbers',
            text: 'Random Numbers',
            iconProps: {  },
            subMenuProps: {
              className: "dropdownList analysisDropDrown statistical",
              items: [
                  {
                    key: 'uniform',
                    text: 'Uniform',
                    iconProps: {  },
                  },
                  {
                    key: 'normal',
                    text: 'Normal',
                    iconProps: {  },
                  },
                ]
              },
          },
          {
            key: 'missingValues',
            text: 'Missing Values',
            iconProps: {  },
          },

        ],
      };

