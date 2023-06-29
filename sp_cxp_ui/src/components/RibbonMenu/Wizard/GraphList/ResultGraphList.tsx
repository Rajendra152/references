import * as TestTypes from '../GraphList/TestGraphsList';
// export const resultGraphTypes = [

//  {
//     testType : [
//       TestTypes.DecriptiveStatistics
//     ],
//     resultGraphType : 'Bar Chart Column Means',
//     format: 'ManyY',
//     graphType: 'vertical_bar_plot',
//     subGraphType: 'vertical_bar_error_bar',
//     data: {
//       error1: [],
//       lower: undefined,
//       symbol_values: 'columnmeans',
//       upper: undefined,
//       y: [],
//     },
//   },
//   {
//     testType : [
//       TestTypes.ANOVAonRanks
//     ],
//     resultGraphType :'Scatter Plot Column Means',
//     format: 'ManyY',
//     graphType: 'scatter',
//     subGraphType: 'multipleErrorBars',
//     data: {
//       error1: [],
//       lower: undefined,
//       symbol_values: 'columnmeans',
//       upper: undefined,
//       y: [],
//     },
//   },
//    {
//     testType : [
//       TestTypes.BestSubsetRegression
//     ],
//     resultGraphType : 'Point Plot',
//     format: 'ManyY',
//     graphType: 'scatter',
//     subGraphType: 'verticalPoint',
//     data: {
//       error1: [],
//       y: [],
//     },
//   },
//    {
//     testType : [
//       TestTypes.ChiSquare
//     ],
//     resultGraphTyp : 'Point and Column Means',
//     graphType: 'need clarity on this',
//     subGraphType: 'Vertical Point',
//     format: '',
//     data: '',
//   },
// {
//     testType : [
//       TestTypes.DecriptiveStatistics
//     ],
//     resultGraphType : 'Box Plot',
//     format: 'ManyY',
//     graphType: 'box',
//     subGraphType: 'verticalBox',
//     data: {
//       error1: [],
//       y: [],
//     },
//   },
//   //Oneway Frequency Table
//   {
//     testType : [
//       TestTypes.OnewayFrequencyTable
//     ],
//     format: 'ManyY',
//     graphType: 'box',
//     subGraphType: 'verticalBox',
//     resultGraphType :  'Frequency Bar Chart',
//     data: {
//       error1: [],
//       y: [],
//     },
//   },
//   //One Sample t Test &  //One Sample Signed Rank Test
//  {
//    resultGraphType :'Scatter Plot Column Means',
//     format: 'ManyY',
//     graphType: 'scatter',
//     subGraphType: 'multipleErrorBars',
//     testType : [
//       TestTypes.OneSampleSignedRankTest, TestTypes.OneSampletTest
//     ],
//     data: {
//       error1: [],
//       lower: undefined,
//       symbol_values: 'columnmeans',
//       upper: undefined,
//       y: [],
//     },
//   },
//   {
//     data: { x: [], y: [] },
//     resultGraphType : 'Histogram',
//     format: 'XYpair',
//     graphType: 'vertical_bar_plot',
//     subGraphType: 'simpleBar',
//     testType : [
//       TestTypes.OneSampleSignedRankTest, TestTypes.OneSampletTest
//     ],
//   },
//   {
//     testType : [
//       TestTypes.OneSampleSignedRankTest, TestTypes.OneSampletTest
//     ],
//     data: {x:[], y: []},
//     resultGraphType : 'Normal Probability Plot',
//     format: "XYpair",
//     graphType: "scatter",
//     subGraphType: "simpleRegression",
//   },
//   //t- Test
// {
//   testType : [
//     TestTypes.tTest
//   ],
//     format: 'ManyY',
//     resultGraphType :   'Bar Chart Column Means1',
//     graphType: 'vertical_bar_plot',
//     subGraphType: 'vertical_bar_error_bar',
//     data: {
//       error1: [],
//       lower: undefined,
//       symbol_values: 'columnmeans',
//       upper: undefined,
//       y: [],
//     },
//   },
//   // 'Scatter Plot Column Means1': {
//   //   format: 'ManyY',
//   //   graphType: 'scatter',
//   //   subGraphType: 'multipleErrorBars',
//   //   data: {
//   //     error1: [],
//   //     lower: undefined,
//   //     symbol_values: 'columnmeans',
//   //     upper: undefined,
//   //     y: [],
//   //   },
//   // },
//   // 'Point Plot1': {
//   //   format: 'ManyY',
//   //   graphType: 'scatter',
//   //   subGraphType: 'verticalPoint',
//   //   data: {
//   //     error1: [],
//   //     y: [],
//   //   },
//   // },
//   // 'Histogram1': {
//   //   data: { x: [], y: [] },
//   //   format: 'XYpair',
//   //   graphType: 'vertical_bar_plot',
//   //   subGraphType: 'simpleBar',
//   // },
//   // 'Normal Probability Plot1': {
//   //   data: {x:[], y: []},
//   //   format: "XYpair",
//   //   graphType: "scatter",
//   //   subGraphType: "simpleRegression",
//   // },
//   // //Rank Sum Test
//   // 'Point Plot1': {
//   //   format: 'ManyY',
//   //   graphType: 'scatter',
//   //   subGraphType: 'verticalPoint',
//   //   data: {
//   //     error1: [],
//   //     y: [],
//   //   },
//   // },

// ]

// export const resultGraphTypes = {
//   'Bar Chart Column Means': {
//     format: 'ManyY',
//     graphType: 'vertical_bar_plot',
//     subGraphType: 'vertical_bar_error_bar',
//     data: {
//       error1: [],
//       lower: undefined,
//       symbol_values: 'columnmeans',
//       upper: undefined,
//       y: [],
//     },
//   },
//   'Scatter Plot Column Means': {
//     format: 'ManyY',
//     graphType: 'scatter',
//     subGraphType: 'multipleErrorBars',
//     data: {
//       error1: [],
//       lower: undefined,
//       symbol_values: 'columnmeans',
//       upper: undefined,
//       y: [],
//     },
//   },
//   'Point Plot': {
//     format: 'ManyY',
//     graphType: 'scatter',
//     subGraphType: 'verticalPoint',
//     data: {
//       error1: [],
//       y: [],
//     },
//   },
//   'Point and Column Means': {
//     graphType: 'need clarity on this',
//     subGraphType: 'Vertical Point',
//     format: '',
//     data: '',
//   },
//   'Box Plot': {
//     format: 'ManyY',
//     graphType: 'box',
//     subGraphType: 'verticalBox',
//     data: {
//       error1: [],
//       y: [],
//     },
//   },
//   'Box Plot': {
//     format: 'ManyY',
//     graphType: 'box',
//     subGraphType: 'verticalBox',
//     data: {
//       error1: [],
//       y: [],
//     },
//   },
//   'Box Plot': {
//     format: 'ManyY',
//     graphType: 'box',
//     subGraphType: 'verticalBox',
//     data: {
//       error1: [],
//       y: [],
//     },
//   },
//   //Oneway Frequency Table
//   'Frequency Bar Chart': {
//     data: { x: [], y: [] },
//     format: 'XYpair',
//     graphType: 'vertical_bar_plot',
//     subGraphType: 'simpleBar',
//   },
//   //One Sample t Test
//   'Scatter Plot Column Means': {
//     format: 'ManyY',
//     graphType: 'scatter',
//     subGraphType: 'multipleErrorBars',
//     data: {
//       error1: [],
//       lower: undefined,
//       symbol_values: 'columnmeans',
//       upper: undefined,
//       y: [],
//     },
//   },
//   'Histogram': {
//     data: { x: [], y: [] },
//     format: 'XYpair',
//     graphType: 'vertical_bar_plot',
//     subGraphType: 'simpleBar',
//   },
//   'Normal Probability Plot': {
//     format: 'ManyY',
//     graphType: 'box',
//     subGraphType: 'verticalBox',
//     data: {
//       error1: [],
//       y: [],
//     },
//   },
//   //One Sample Signed Rank Test
//   'Scatter Plot Column Means': {
//     format: 'ManyY',
//     graphType: 'scatter',
//     subGraphType: 'multipleErrorBars',
//     data: {
//       error1: [],
//       lower: undefined,
//       symbol_values: 'columnmeans',
//       upper: undefined,
//       y: [],
//     },
//   },
//   'Histogram': {
//     data: { x: [], y: [] },
//     format: 'XYpair',
//     graphType: 'vertical_bar_plot',
//     subGraphType: 'simpleBar',
//   },
//   'Normal Probability Plot': {
//     format: 'ManyY',
//     graphType: 'box',
//     subGraphType: 'verticalBox',
//     data: {
//       error1: [],
//       y: [],
//     },
//   },
//   'Bar Chart Column Means' :{

//   }

// };
export const Bar_Char_Column = '../assets/img/resultGraph/Bar_VError.svg';
export const Mutiple_Error_Bars = '../assets/img/resultGraph/Scatter_MError.svg';
export const Vertical_Point = '../assets/img/resultGraph/Scatter_VPoint.svg';
export const Vertical_Box = '../assets/img/resultGraph/Box_V.svg';
export const Simple_Bar = '../assets/img/resultGraph/Bar_VS.svg';
export const Simple_Regression = '../assets/img/resultGraph/Scatter_S_Reg.svg';
export const Scatter_3D = '../assets/img/resultGraph/3D_Scatter.svg';
export const Grouped_Vertical_Error_Bar = '../assets/img/resultGraph/Bar_VGroupError.svg';
export const Scatter_Plot_Simple_Scatter_Plot = '../assets/img/resultGraph/Scatter_S.svg';
export const Line_and_Scatter_Plot_Multiple_Straight_Lines = '../assets/img/resultGraph/LineScatter_M.svg';
export const Line_and_Scatter_Plot_Simple_Straight_Lines = '../assets/img/resultGraph/LineScatter_S.svg';
export const Line_Plot_Simple_Horizontal_Step_Plot = '../assets/img/resultGraph/Step_HS.svg';
export const Point_Column_Means = '../assets/img/resultGraph/Point_Column_Means.svg';
export const Compare_VPoint_result = '../assets/img/resultGraph/Compare_VPoint_result.svg';
export const Main_Effect_result = '../assets/img/resultGraph/Main_Effect_result.svg';
export const LineScatter_2Way_result = '../assets/img/resultGraph/LineScatter_2Way_result.svg';
export const Histogram_Result = '../assets/img/resultGraph/Histogram_Result.svg';
export const Bar_Residuals_result = '../assets/img/resultGraph/Bar_Residuals_result.svg';
export const Scatter_Residuals_result = '../assets/img/resultGraph/Scatter_Residuals_result.svg';

export const resultGraphTypes = {
  'Bar Chart Column Means': {
    format: 'ManyY',
    graphType: 'vertical_bar_plot',
    subGraphType: 'vertical_bar_error_bar',
    image:Bar_Char_Column,
    data: {
      error1: [],
      lower: 'mean',
      symbol_values: 'columnmeans',
      upper: 'mean',
      y: [],
    },
  },
  'Scatter Plot Column Means': {
    format: 'ManyY',
    graphType: 'scatter',
    subGraphType: 'multipleErrorBars',
    image:Mutiple_Error_Bars,
    data: {
      error1: [],
      lower: 'mean',
      symbol_values: 'columnmeans',
      upper: 'mean',
      y: [],
    },
  },
  //Multiple Comparison Graph
  'Point Plot': {
    format: 'ManyY',
    graphType: 'scatter',
    subGraphType: 'verticalPoint',
    image:Vertical_Point,
    data: {
      y: [],
    },
  },
  "Multiple Comparison Graph" : {
    format: 'ManyY',
    graphType: 'scatter',
    subGraphType: 'verticalPoint',
    image:Compare_VPoint_result,
    data: {
      y: [],
    },
  },
  'Point and Column Means': {
    format: 'ManyY',
    graphType: 'scatter',
    subGraphType: 'verticalPoint',
    image:Point_Column_Means,
    data: {
      x: [],
      y: [],
    },
  },
  'Box Plot': {
    format: 'ManyY',
    graphType: 'box',
    subGraphType: 'verticalBox',
    image:Vertical_Box,
    data: {
      error1: [],
      y: [],
    },
  },
  //Histogram
  'Frequency Bar Chart': {
    // format: 'ManyY',
    // graphType: 'box',
    // subGraphType: 'verticalBox',
    // resultGraphType: 'Frequency Bar Chart',
    // data: {
    //   error1: [],
    //   y: [],
    // },

    format: 'XYpair',
    graphType: 'vertical_bar_plot',
    subGraphType: 'simpleBar',
    resultGraphType: 'Frequency Bar Chart',
    image:Simple_Bar,
    data: {
      x: [],
      y: [],
    },
  },
  'Normal Probability Plot': {
    data: { x: [], y: [] },
    resultGraphType: 'Normal Probability Plot',
    format: 'XYpair',
    graphType: 'scatter',
    subGraphType: 'simpleRegression',
    image:Simple_Regression
  },
  '3D Residual Scatter': {
    data: { x: [], y: [], z: [] },
    format: "XYZTriplet",
    graphType: "scatter3D",
    subGraphType: "scatter3D",
    image:Scatter_3D
  },
  'Grouped Bar Chart': {
    data: {
      error1: [],
      lower: undefined,
      symbol_values: 'worksheet',
      upper: undefined,
      y: [0],
    },
    format: 'ManyYError1',
    graphType: 'vertical_bar_plot',
    subGraphType: 'grouped_vertical_error_bar',
    image:Grouped_Vertical_Error_Bar,
  },
  '3D Category Scatter': {
    data: { x: [], y: [], z: [] },
    format: 'XYZTriplet',
    graphType: 'scatter3D',
    subGraphType: 'scatter3D',
    image:Scatter_3D
  },
  'Main Effects': {
    data: { x: [], y: [] },
    format: 'XYpair',
    graphType: 'lineScatter',
    subGraphType: 'simple_line_scatter',
    image:Main_Effect_result
  },
  '2Way Effects': {
    data: { y: []},
    format: 'ManyY',
    graphType: 'lineScatter',
    subGraphType: 'multiple_line_scatter',
    image:LineScatter_2Way_result
  },
  'Histogram': {
    data: { x: [], y: [] },
    format: 'XYpair',
    graphType: 'vertical_bar_plot',
    subGraphType: 'simpleBar',
    image:Histogram_Result
  },
  'Before & After Line Plot' : {
    data: { y: [], error1 : []},
    format: 'ManyY',
    graphType: "line",
    subGraphType: 'multipleStraight',
    image:Line_and_Scatter_Plot_Multiple_Straight_Lines
  },
  "Scatter Plot Residuals" : {
    data: { x: [], y: [] },
    format: 'XYpair',
    graphType: 'vertical_bar_plot',
    subGraphType: 'simpleScatter',
    image:Scatter_Residuals_result
  },
  'Bar Chart Std Residuals' : {
    format: 'XYpair',
    graphType: 'vertical_bar_plot',
    subGraphType: 'simpleBar',
    resultGraphType: 'Frequency Bar Chart',
    image:Bar_Residuals_result,
    data: {
      x: [],
      y: [],
    },
  },
  'Regression, Conf. & Pred.' : {
    data: { y: [], x: [] },
    format: 'XManyY',
    graphType: "line",
    subGraphType: 'multipleStraight',
    image:Line_and_Scatter_Plot_Multiple_Straight_Lines
  },
  '3D Scatter & Mesh' : {
    data: { x: [], y: [], z: [] },
    format: 'XYZTriplet',
    graphType: 'scatter3D',
    subGraphType: 'scatter3D',
    image:Scatter_3D
  },
  'Scree Plot' : {
    data: { y: [] },
    format: 'SingleY',
    graphType: 'lineScatter',
    subGraphType: 'simple_line_scatter',
    image:Scatter_3D
  },
  'Component Loadings' : {
    data: { x: [], y: [] },
    format: 'XYpair',
    graphType: 'lineScatter',
    subGraphType: 'simple_line_scatter',
    image:Scatter_3D
  },
  'Component Scores' : {
    data: { x: [], y: [] },
    format: 'XYpair',
    graphType: 'scatter',
    subGraphType: 'simpleScatter',
    image:Scatter_Plot_Simple_Scatter_Plot
  },
  'Scatter Matrix' : {
    data: { x: [], y: [] },
    format: 'XYpair',
    graphType: 'scatter',
    subGraphType: 'simpleScatter',
    image:Scatter_Plot_Simple_Scatter_Plot
  },
  'Histogram' : {
    format: 'XYpair',
    graphType: 'vertical_bar_plot',
    subGraphType: 'simpleBar',
    resultGraphType: 'Frequency Bar Chart',
    image:Simple_Bar,
    data: {
      x: [],
      y: [],
    },
  },
  'Adjusted Survival Curves' : {
    data: { x: [], y: [] },
    format: 'XYpair',
    graphType: 'lineScatter',
    subGraphType: 'simple_line_scatter',
    image:Line_and_Scatter_Plot_Simple_Straight_Lines
    },
    'Cumulative Hazard Curves' : {
      data: {x: [], y: []},
format: "XYpair",
graphType: "line",
subGraphType: "simpleHorizontalStep",
image:Line_Plot_Simple_Horizontal_Step_Plot
    },
    'Log-Log Survival Curves' : {
      data: {x: [], y: []},
      format: "XYpair",
      graphType: "line",
      subGraphType: "simpleHorizontalStep",
      image:Line_Plot_Simple_Horizontal_Step_Plot
    },
    'Adjusted Survival Curves' : {
      data: { x: [], y: [] },
      format: 'XYpair',
      graphType: 'lineScatter',
      subGraphType: 'simple_line_scatter',
      image:Line_and_Scatter_Plot_Simple_Straight_Lines
    }
};
