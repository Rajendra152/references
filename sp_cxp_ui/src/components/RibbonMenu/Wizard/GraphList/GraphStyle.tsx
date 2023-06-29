import { BI_DIRECTIONAL_ERROR, MULTIPLE_ERROR_BARS, VERTICAL_ASYM_ERROR } from '../../../../services/graphPageServices/allGraphType/GraphTypeConstants';
import * as graphnameList from './GraphNameList';
import * as ConstantImage from '../../../Constant/ConstantImage'
export const SPGraphStyle = [
  {
    id: 'SP1',
    title: graphnameList.SimpleScatter,
    key: 'SiS',
    name: 'simpleScatter',
    previewImage: ConstantImage.SimplePlot,
    previewImageText: "Plots a single set of XY pairs.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'SP2',
    title: graphnameList.MultipleScatter,
    key: 'MltS',
    name: 'multipleScatter',
     previewImage: ConstantImage.MultipleSimplePlot,
    previewImageText: "Plots multiple sets of XY pairs.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  // {
  //   id: 'SP3',
  //   title: graphnameList.SimpleRegression,
  //   key: 'SiRe',
  //   name: 'simpleRegression',
  // //   previewImage: ConstantImage, 
  //   previewImageText: "Plot data as XY points using symbols2",
  //   previewImageTitle:"Select the style of graph you want to create"
  // },
  // {
  //   id: 'SP4',
  //   title: graphnameList.MultipleRegression,
  //   name:'multipleRegression',
  //   key: 'MltRe',
  // //   previewImage: ConstantImage,
  //   previewImageText: "Plot data as XY points using symbols2",
  //   previewImageTitle:"Select the style of graph you want to create"
  // },
  {
    id: 'SP5',
    name: 'simpleErrorBars',
    title: graphnameList.SimpleErrorBars,
    key: 'SiErB',
     previewImage: ConstantImage.SimpleErrorBarPlot,
    previewImageText:  "Plots a single set of XY pairs with error bars.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'SP6',
    name:'multipleErrorBars',
    title: graphnameList.MultipleErrorBars,
    key: 'MltErB',
     previewImage: ConstantImage.MultipleErrorBarPlot,
    previewImageText:  "Plots multiple sets of XY pairs with error bars.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  // {
  //   id: 'SP7',
  //   name:'simpleErrorRegression',
  //   title: graphnameList.SimpleErrorBarsandRegression,
  //   key: 'SiErBRe',
  // //   previewImage: ConstantImage,
  //   previewImageText: "Plot data as XY points using symbols2",
  //   previewImageTitle:"Select the style of graph you want to create"
  // },
  // {
  //   id: 'SP8',
  //   title: graphnameList.MultipleErrorBarsandRegression,
  //   name:'multipleErrorRegression',
  //   key: 'MltErBRe',
  // //   previewImage: ConstantImage,
  //   previewImageText: "Plot data as XY points using symbols2",
  //   previewImageTitle:"Select the style of graph you want to create"
  // },
  {
    id: 'SP9',
    name:'horizontalError',
    title: graphnameList.HorizontalErrorBars,
    key: 'HzErB',
     previewImage: ConstantImage.HorizontalAsyErrorBarPlot,
    previewImageText:  "Plots XY pairs with horizontal error bars.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'SP10',
    name:'biDirectionalError',
    title: graphnameList.Bi_DirectionalErrorBars,
    key: 'Bi-DrErB',
     previewImage: ConstantImage.BiDdirectionalAsyErrorBarPlot,
    previewImageText:  "Plots XY pairs with both horizontal and vertical error bars.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'SP11',
    name:'verticalAsymError',
    title: graphnameList.VerticalAsymmetricErrorBars,
    key: 'VerAsyErB',
    previewImage: ConstantImage.VerticalAsyErrorBarPlot,
    previewImageText:  "Plot XY pairs using two adjacent columns for error bar end values",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'SP12',
    title: graphnameList.HorizontalAsymmetricErrorBars,
    key: 'HzAsyErB',
    name:'horizontalAsymError',
     previewImage: ConstantImage.HorizontalAsyErrorBarPlot,
    previewImageText:  "Plot XY pairs using two adjacent columns for horizontal error bar end values",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'SP13',
    title: graphnameList.Bi_DirectionalAsymmetricErrorBars,
    key: 'Bi-DrAsyErB',
    name:'biDirectionalAsymError',
     previewImage: ConstantImage.BiDirectionalErrorBarPlot,
    previewImageText:  "Plot XY pairs using four columns for X and Y error bar end values",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'SP14',
    title: graphnameList.VerticalPointPlot,
    key: 'VtlPP',
    name:'verticalPoint',
    previewImage: ConstantImage.VerticalPointPlot,
    previewImageText:  "Plots columns of data as Y values.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'SP15',
    name:'horizontalPoint',
    title: graphnameList.HorizontalPointPlot,
    key: 'HzPP',
    previewImage: ConstantImage.HorizontalPointPlot,
    previewImageText:  "Plots columns of data as X values.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'SP16',
    name:'verticalDot',
    title: graphnameList.VerticalDotPlot,
    key: 'VtlDP',
    previewImage: ConstantImage.VerticalDotPlot,
    previewImageText:  "Plots a column of data as Y values.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'SP17',
    title: graphnameList.HorizontalDotPlot,
    key: 'HzDP',
    name:'horizontalDot',
     previewImage: ConstantImage.HorizontalDotPlot,
    previewImageText:  "Plots a column of data as X values.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  // {
  //   id: 'SP3',
  //   title: "Scatter Plot with Error bars",
  //   key: 'SPErb',
  // //   previewImage: ConstantImage,
  //   previewImageText: "Plot data as XY points using symbols3",
  //   previewImageTitle:"Select the style of graph you want to create"
  // }
]

export const LPGraphStyle = [
  {
    id: 'LP1',
    title: graphnameList.SimpleStraightLine,
    key: 'SiStrL',
    name: 'simpleStraight',
    previewImage: ConstantImage.SimpleStraightLine,
    previewImageText: "Plots a single set of XY pairs connecting the datapoints with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP2',
    title: graphnameList.MultipleStraightLine,
    key: 'MlStrtL',
    name: 'multipleStraight',
     previewImage: ConstantImage.MultipleStraightLine,
    previewImageText:  "Plots multiple sets of XY pairs connecting the datapoints with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP3',
    title: graphnameList.SimpleSplineCurve,
    key: '',
    name: 'simpleSpline',
     previewImage: ConstantImage.SimpleSplineCurve,
    previewImageText: "Plots a single set of XY pairs connecting the datapoints with spline curve.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP4',
    title: graphnameList.MultipleSplineCurve,
    key: '',
    name: 'multipleSpline',
     previewImage: ConstantImage.MultipleSplineCurve,
    previewImageText: "Plots multiple sets of XY pairs connecting the datapoints with spline curves.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP5',
    title: graphnameList.SimpleVerticalStepPlot,
    name: 'simpleVerticalStep',
    key: '',
     previewImage: ConstantImage.SimpleVerticalStepPlot,
    previewImageText: "Plots a single set of XY pairs connecting the datapoints with vertical and horizontal lines, starting with vertical.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP6',
    title: graphnameList.MultipleVerticalStepPlot,
    key: '',
    name: 'multipleVerticalStep',
     previewImage: ConstantImage.MultipleVertivalStepPlot,
    previewImageText: "Plots multiple sets of XY pairs connecting the datapoints with vertical and horizontal lines, starting with vertical.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP7',
    title: graphnameList.SimpleHorizontalStepPlot,
    key: '',
    name: 'simpleHorizontalStep',
     previewImage: ConstantImage.SimpleHorizontalStepPlot,
    previewImageText: "Plots a single set of XY pairs connecting the datapoints with vertical and horizontal lines, starting with horizontal.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP8',
    title: graphnameList.MultipleHorizontalStepPlot,
    key: '',
    name: 'multipleHorizontalStep',
     previewImage: ConstantImage.MultipleHorizontalStepPlot,
    previewImageText: "Plots multiple sets of XY pairs connecting the datapoints with vertical and horizontal lines, starting with horizontal.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP9',
    title: graphnameList.SimpleVerticalMidpointStepPlot,
    key: '',
    name: 'simpleVerticalMidpointStep',
     previewImage: ConstantImage.SimpleVerticalMidpointStepPlot,
    previewImageText: "Plots a single set of XY pairs connecting the datapoints with vertical, horizontal then vertical.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP10',
    title: graphnameList.MultipleVerticalMidpointStepPlot,
    key: '',
    name: 'multipleVerticalMidpointStep',
    previewImage: ConstantImage.MultipleVerticalMidpointStepPlot,
    previewImageText: "Plots multiple sets of XY pairs connecting the datapoints with three lines: vertical, horizontal then vertical.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP11',
    title: graphnameList.SimpleHorizontalMidpointStepPlot,
    key: '',
    name: 'simpleHorizontalMidpointStep',
     previewImage: ConstantImage.SimpleHorizontalMidpointStepPlot,
    previewImageText: "Plots a single set of XY pairs connecting the datapoints with three lines: horizontal, vertical then horizontal.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LP12',
    title: graphnameList.MultipleHorizontalMidpointStepPlot,
    key: '',
    name: 'multipleHorizontalMidpointStep',
     previewImage: ConstantImage.MultipleHorizontalMidpointStepPlot,
    previewImageText: "Plots multiple sets of XY pairs connecting the datapoints with three lines: horizontal, vertical then horizontal.",
    previewImageTitle:"Select the style of graph you want to create"
  },
];

export const LSPGraphStyle = [
  {
    id: 'LSP1',
    title: graphnameList.SimpleStraightLine,
    key: "SiLS",
    name:'simple_line_scatter',
    previewImage: ConstantImage.LineAndScatterPlot,
    previewImageText: "Plots a single set of XY pairs connecting symbols with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP2',
    title: graphnameList.MultipleStraightLine,
    key: "MltLS",
    name:'multiple_line_scatter',
    previewImage: ConstantImage.MultipleScatter,
    previewImageText:  "Plots multiple set of XY pairs connecting symbols with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP3',
    title: graphnameList.SimpleSplineCurve,
    key: "LSpS",
    name:'simple_spline_curve_line_scatter',
    previewImage: ConstantImage.SimpleScatterSpline,
    previewImageText: "Plots a single set of XY pairs connecting symbols with a spline curve.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP4',
    title: graphnameList.MultipleSplineCurve,
    key: "MltLS",
    name:'multiple_spline_curve_line_scatter',
    previewImage: ConstantImage.MultipleScatterSpline,
    previewImageText:  "Plots multiple sets of XY pairs connecting symbols with a spline curve.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP5',
    title: graphnameList.SimpleErrorBars,
    key: "MltLS",
    name:'simple_line_scatter_error_bar',
    previewImage: ConstantImage.SimpleScatterErrorBar,
    previewImageText:  "Plots a single set of XY pairs as symbols with error bars connected with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP6',
    title: graphnameList.MultipleErrorBars,
    key: "MltLS",
    name:'multiple_line_scatter_error_bar',
     previewImage: ConstantImage.MultipleScatterErrorBar,
    previewImageText:  "Plots multiple sets of XY pairs as symbols with error bars connected with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP7',
    title: graphnameList.HorizontalErrorBars,
    key: "MltLS",
    name:'horizontal_line_scatter_error_bar',
     previewImage: ConstantImage.HorizontalScatterErrorBar,
    previewImageText:  "Plots multiple sets of X columns or XY pairs as symbols with horizontal error bars connected with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP8',
    title: graphnameList.Bi_DirectionalErrorBars,
    key: "MltLS",
    name:'bidirectional_line_scatter_error_bar',
     previewImage: ConstantImage.BiDirectionalScatterErrorBar,
    previewImageText:  "Plots multiple sets of XY pairs as symbols with bi-directional error bars connected with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP9',
    title: graphnameList.SimpleVerticalStepPlot,
    key: "MltLS",
    name:'simple_vertical_line_scatter_step_plot',
     previewImage: ConstantImage.SVScatterStep,
    previewImageText:  "Plots a single set of XY pairs connecting symbols with vertical and horizontal lines, starting with vertical.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP10',
    title: graphnameList.MultipleVerticalStepPlot,
    key: "MltLS",
    name:'multiple_vertical_line_scatter_step_plot',
    previewImage: ConstantImage.MVScatterStep,
    previewImageText:  "Plots multiple sets of XY pairs connecting symbols with vertical and horizontal lines, starting with vertical.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP11',
    title: graphnameList.SimpleHorizontalStepPlot,
    key: "MltLS",
    name:'simple_horizontal_line_scatter_step_plot',
     previewImage: ConstantImage.SHScatterStep,
    previewImageText:  "Plots a single set of XY pairs connecting symbols with vertical and horizontal lines, starting with horizontal.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP12',
    title: graphnameList.MultipleHorizontalStepPlot,
    key: "MltLS",
    name:'multiple_horizontal_line_scatter_step_plot',
    previewImage: ConstantImage.MHScatterStep,
    previewImageText:  "Plots multiple sets of XY pairs connecting symbols with vertical and horizontal lines, starting with horizontal.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP13',
    title: graphnameList.SimpleVerticalMidpointStepPlot,
    key: "MltLS",
    name:'simple_vertical_line_scatter_midpoint_step_plot',
     previewImage: ConstantImage.SVScatterMidStep,
    previewImageText:  "Plots a single set of XY pairs connecting symbols with three lines: vertical, horizontal then vertical.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP14',
    title: graphnameList.MultipleVerticalMidpointStepPlot,
    key: "MltLS",
    name:'multiple_vertical_line_scatter_midpoint_step_plot',
    previewImage: ConstantImage.MVScatterMidStep,
    previewImageText:  "Plots multiple sets of XY pairs connecting symbols with three lines: vertical, horizontal then vertical.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP15',
    title: graphnameList.SimpleHorizontalMidpointStepPlot,
    key: "MltLS",
    name:'simple_horizontal_line_scatter_midpoint_step_plot',
    previewImage: ConstantImage.SHScatterMidStep,
    previewImageText:  "Plots a single set of XY pairs connecting symbols with three lines:  horizontal, vertical then horizontal.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'LSP16',
    title: graphnameList.MultipleHorizontalMidpointStepPlot,
    key: "MltLS",
    name:'multiple_horizontal_line_scatter_midpoint_step_plot',
     previewImage: ConstantImage.MHScatterMidStep,
    previewImageText:  "Plots multiple sets of XY pairs connecting symbols with three lines:  horizontal, vertical then horizontal.",
    previewImageTitle:"Select the style of graph you want to create"
  },
];

export const HMGraphStyle = [
  {
    id: 'HM1',
    title: graphnameList.HeatMap,
    key: "HM1",
    name:"heatMap",
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XYZMany points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  },
]

export const APGraphStyle = [
  {
    id: 'AP1',
    title: graphnameList.SimpleArea,
    key: "",
    name:'simple_area',
     previewImage: ConstantImage.AreaHS,
    previewImageText: "Plot a single line plot with a downward fill",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'AP2',
    title: graphnameList.MultipleArea,
    key: "",
    name:'multiple_area',
     previewImage: ConstantImage.AreaHM,
    previewImageText: "Plot multiple line plots with downward fills",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'AP3',
    title: graphnameList.VerticalArea,
    key: "",
    name:'vertical_area',
     previewImage: ConstantImage.AreaVS,
    previewImageText: "Plots a single YX line plot with a left direction fill",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'AP4',
    title: graphnameList.MultipleVerticalArea,
    key: "",
    name:'multiple_vertical_area',
     previewImage: ConstantImage.AreaVM,
    previewImageText: "Plots multiple YX line plots with left direction fills",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'AP5',
    title: graphnameList.ComplexArea,
    key: "",
    name:'complex_area',
     previewImage: ConstantImage.AreaComplex,
    previewImageText: "Plots multiple line plots with downward fills and intersections",
    previewImageTitle:"Select the style of graph you want to create"
  },
]

export const PPGraphStyle = [
  {
    id: 'PP1',
    title: graphnameList.Scatter,
    key: "",
    name:'polarScatter',
     previewImage: ConstantImage.Polar_Scatter,
    previewImageText: "Plots data as angle and distance using symbols",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'PP2',
    title: graphnameList.Lines,
    key: "",
    name:'polarLine',
     previewImage: ConstantImage.PolarLine,
    previewImageText: "Plots data as angle and distance data points connected with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'PP3',
    title: graphnameList.ScatterAndLines,
    key: "",
    name:'polarLineScatter',
    previewImage: ConstantImage.Polar_LineScatter,
    previewImageText: "Plots data as angle and distance data using symbols connected with straight lines",
    previewImageTitle:"Select the style of graph you want to create"
  }
]

export const RPGraphStyle = [
  {
    id: 'RP1',
    title: graphnameList.RadarScatter,
    key: "",
    name:'radarScatter',
     previewImage: ConstantImage.Radar_Scatter,
    previewImageText: "Plots data as distance from the origin using symbols distance.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'RP2',
    title: graphnameList.RadarLines,
    key: "",
    name:'radarLine',
     previewImage: ConstantImage.Radar_Line,
    previewImageText: "Plots data as distance data points connected with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'RP3',
    title: graphnameList.RadarScatterAndLines,
    key: "",
    name:'radarLineScatter',
     previewImage: ConstantImage.Radar_Line,
    previewImageText: "Plots data as distance data using symbols connected with straight lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'RP4',
    title: graphnameList.RadarVectorArrowLines,
    key: "",
     previewImage: ConstantImage.Radar_Vector,
    previewImageText: "Plots data as arrows emanating from the origin",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'RP5',
    title: graphnameList.RadarLineAndErrorBand,
    key: "",
     previewImage: ConstantImage.Radar_Error,
    previewImageText: "Plots an error area band from center and error value columns",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'RP6',
    title: graphnameList.RadarArea,
    key: "",
     previewImage: ConstantImage.Radar_Area,
    previewImageText: "Plots data as distance using connecting lines and area fill from line to origin",
    previewImageTitle:"Select the style of graph you want to create"
  }
]


export const VBCGraphStyle = [
  {
    id: 'VBCP1',
    title: graphnameList.SimpleBar,
    key: "",
    name:'simpleBar',
     previewImage: ConstantImage.Bar_VS,
    previewImageText: "Plots a single column of data as Y values.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'VBCP2',
    title: graphnameList.GroupedBar,
    key: "",
    name:'groupedBar',
     previewImage: ConstantImage.Bar_VGroup,
    previewImageText: "Plots multiple columns of data in a series of bars.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'VBCP3',
    title: graphnameList.SimpleErrorBars,
    key: "",
    name:'vertical_bar_error_bar',
    previewImage: ConstantImage.Bar_VError,
    previewImageText: "Plots data as Y values with error bars",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'VBCP4',
    title: graphnameList.GroupedErrorBars,
    key: "",
    name:"grouped_vertical_error_bar",
     previewImage: ConstantImage.Bar_VGroupError,
    previewImageText: "Plots data as multiple sets of Y values in a series of bars with error bars",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'VBCP5',
    title: graphnameList.StackedBars,
    key: "",
    name:'stackBar',
     previewImage: ConstantImage.Bar_VStacked,
    previewImageText: "Plots multiple columns of data as a series of stacks in bars",
    previewImageTitle:"Select the style of graph you want to create"
  },
]


export const HBCGraphStyle = [
  {
    id: 'HBCP1',
    title: graphnameList.HorizontalBarChart,
    key: "",
    name:'simple_horizontal_bar',
     previewImage: ConstantImage.Bar_HS,
    previewImageText: "Plots a single column of data as X values.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'HBCP2',
    name:'grouped_horizontal_bar',
       title: graphnameList.GroupedBar,
    key: "",
     previewImage: ConstantImage.Bar_HGroup,
    previewImageText: "Plots multiple columns of data in a series of bars.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'HBCP3',
    title: graphnameList.SimpleErrorBars,
    key: "",
    name: "horizontal_bar_error_bar",
     previewImage: ConstantImage.Bar_HError,
    previewImageText: "Plots data as X values with error bars.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'HBCP4',
    title: graphnameList.GroupedErrorBars,
    key: "",
    name: "grouped_horizontal_error_bar",
     previewImage: ConstantImage.Bar_HGroup,
    previewImageText: "Plots data as multiple sets of X values in a series of bars with error bars.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'HBCP5',
    title: graphnameList.StackedBars,
    name:'stacked_horizontal_bar',
    key: "",
     previewImage: ConstantImage.Bar_HStacked,
    previewImageText: "Plots multiple columns of data in a series of stacks in bars.",
    previewImageTitle:"Select the style of graph you want to create"
  },
]

//BOX PLOT
export const BPGraphStyle = [
  {
    id: 'BP1',
    title: graphnameList.VerticalBoxPlot,
    key: "",
    name:'verticalBox',
     previewImage: ConstantImage.Box_V,
    previewImageText: "Plots  the median, 10th, 25th, 75th and 90th percentiles as vertical boxes with error bars.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'BP2',
    title: graphnameList.HorizontalBoxPlot,
    key: "",
    name:'HorizontalBox',
    previewImage: ConstantImage.Box_H,
    previewImageText: "Plots  the median, 10th, 25th, 75th and 90th percentiles as horizontal boxes with error bars.",
    previewImageTitle:"Select the style of graph you want to create"
  }
]

// PIE PLOT
export const PCGraphStyle = [
  {
    id: 'PC1',
    title: graphnameList.SingleColumn,
    key: "",
    name:'pie',
  //   previewImage: ConstantImage,
    previewImageText: "Single data column. Corresponding data are assumed.",
    previewImageTitle:"Select the style of graph you want to create"
  }
]

//COUNTER PLOT
export const CPGraphStyle = [
  {
    id: 'CP1',
    title: graphnameList.ContourPlot,
    key: "",
    name:'simpleContour',
     previewImage: ConstantImage.ContourPlot,
    previewImageText: "Plots data XYZ values in 2D space.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'CP2',
    title: graphnameList.FilledContourPlot,
    key: "",
    name:'filledContour',
    previewImage: ConstantImage.Contour_Filled,
    previewImageText: "Plot data XYZ values in 2D space filling in the area between contour levels",
    previewImageTitle:"Select the style of graph you want to create"
  }
]

//3D SCATTERPLOT
export const _3DSPGraphStyle = [
  {
    id: '_3DSP1',
    title: graphnameList._3DScatterPlot,
    key: "",
    name:'scatter3D',
     previewImage: ConstantImage.Bar_3D,
    previewImageText: "Plot ",
    previewImageTitle:"Select the style of graph you want to create"
  }
]

//3D LINE
export const _3DLPGraphStyle = [
  {
    id: '_3DLP1',
    title: graphnameList._3DTrajectoryPlot,
    key: "",
    name:'line_3d_trajectory',
     previewImage: ConstantImage.Line_Traj_3D,
    previewImageText: "Plot data as XYZ data points connected with lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: '_3DLP2',
    title: graphnameList._3DWaterfallPlot,
    key: "",
    name:'line_3d_waterfall',
    previewImage: ConstantImage.Line_Water_3D,
    previewImageText: "Plots Z values on an XY grid as multiple lines",
    previewImageTitle:"Select the style of graph you want to create"
  }
]

export const _3DMPGraphStyle = [
  {
    id: '_3DMP1',
    title: graphnameList._3DMeshPlot,
    key: "",
    name:'mesh3D',
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  }
]

export const _3DBPGraphStyle = [
  {
    id: '_3DBP1',
    title: graphnameList._3DBarPlot,
    key: "",
    name:'bar3D',
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  }
]

// ternary graph
export const TPGraphStyle = [
  {
    id: 'TP1',
    title: graphnameList.Scatter,
    key: "",
    name:'ternaryScatter',
     previewImage: ConstantImage.Ternary_Scatter,
    previewImageText: "Plots the normalized proportions of three substances as symbols",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'TP2',
    title: graphnameList.Lines,
    key: "",
    name:'ternaryLine',
     previewImage: ConstantImage.TernaryLineGraph,
    previewImageText: "Plots the normalized propotions of three substances as lines.",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'TP3',
    title: graphnameList.ScatterAndLines,
    key: "",
    name:'ternary_line_scatter',
    previewImage: ConstantImage.Ternary_LineScatter,
    previewImageText: "Plots the normalized proportions of three substances as lines between symbols",
    previewImageTitle:"Select the style of graph you want to create"
  },
]


export const BubPGraphStyle = [
  {
    id: 'BubP1',
    title: graphnameList.BubblePlot,
    key: "",
    name:'bubble',
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  }
]

export const CMGraphStyle = [
  {
    id: 'CM1',
    title: graphnameList.ChoroplethMap,
    key: "",
    name:'choroplethMap',
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  }
]

export const GPGraphStyle = [
  {
    id: 'GP1',
    title: graphnameList.Semi_logSP,
    key: "",
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'GP2',
    title: graphnameList.BarChartwithWhiteGrid,
    key: "",
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'GP3',
    title: graphnameList.GroupedBarChatwithErrorBars,
    key: "",
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'GP4',
    title: graphnameList.RangeBars,
    key: "",
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'GP5',
    title: graphnameList.RangeFrameSP,
    key: "",
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  },
]

export const FPGraphStyle = [
  {
    id: 'FP1',
    title: graphnameList.DiffData,
    key: "",
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  },
  {
    id: 'FP2',
    title: graphnameList.RatiosData,
    key: "",
  //   previewImage: ConstantImage,
    previewImageText: "Plot data as XY points using symbols1",
    previewImageTitle:"Select the style of graph you want to create"
  }
]
