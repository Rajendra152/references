import { SPGraphStyle, LPGraphStyle, LSPGraphStyle, HMGraphStyle,
  APGraphStyle, PPGraphStyle, RPGraphStyle, VBCGraphStyle, HBCGraphStyle,
  BPGraphStyle, PCGraphStyle, CPGraphStyle, _3DSPGraphStyle,_3DLPGraphStyle,
  _3DMPGraphStyle, _3DBPGraphStyle, TPGraphStyle, BubPGraphStyle, CMGraphStyle,
  FPGraphStyle
 } from './GraphStyle';
 import * as graphnameList from './GraphNameList'
 import * as ConstantImage from '../../../Constant/ConstantImage'
export const graphTypes = [
  {
    id: '1',
    title: graphnameList.ScatterPlot,
    key: 'SP',
    name: 'scatter',
    previewImage: ConstantImage.SimplePlot,
    previewImageText: "Plot data as XY points using symbols.", 
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '2',
    title: graphnameList.LinePlot,
    key: 'LP',
    name: 'line',
    previewImage: ConstantImage.LinePlot,
    previewImageText:  "Plot data as XY points connected by lines.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '3',
    title: graphnameList.LineandScatterPlot,
    key: 'LSP', 
    name:'lineScatter',
    previewImage: ConstantImage.LineAndScatterPlot,
    previewImageText: "Plot data as XY points using symbols connected with lines.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '4',
    title: graphnameList.HeatMap,
    key: 'HM',
    name:'heatMap',
     previewImage: ConstantImage.HeatMap,
    previewImageText: "Plot data as Heat Map",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '5',
    title: graphnameList.AreaPlot,
    key: 'AP',
    name:'area',
     previewImage: ConstantImage.AreaPlot,
    previewImageText: "Plot data as line plots with fill colors",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '6',
    title: graphnameList.PolarPlot,
    key: 'PP',
    name:'polar',
     previewImage: ConstantImage.PolarPlot,
    previewImageText: "Plots data using angles and distance from center.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '7',
    title: graphnameList.RadarPlot,
    key: 'RP',
    name:'radar',
     previewImage: ConstantImage.RadarPlot,
    previewImageText: "Plots multiple variables using distance from the origin",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '8',
    title: graphnameList.VerticalBarChart,
    key: 'VBC',
    name:'vertical_bar_plot',
     previewImage: ConstantImage.VerticalBarChart,
    previewImageText: "Plots data as Y points with vertical bars.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '9',
    title: graphnameList.HorizontalBarChart,
    key: 'HBC',
    name:'horizontal_bar_plot',
    previewImage: ConstantImage.HorizontalBarChart,
    previewImageText: "Plots data as X points with horizontal bars.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '10',
    title: graphnameList.BoxPlot,
    key: 'BP',
    name:'box',
     previewImage: ConstantImage.BoxPlot,
    previewImageText: "Plot data as the median and percentiles.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '11',
    title: graphnameList.PieChart,
    key: 'PC',
    name:'pie',
    previewImage: ConstantImage.PieChart,
    previewImageText: "Plot data as a percent of the total.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '12',
    title: graphnameList.ContourPlot,
    key: 'CP',
    name:'contour',
    previewImage: ConstantImage.ContourPlot,
    previewImageText: "Plot data data XYZ values in 2D space.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '13',
    title: graphnameList._3DScatterPlot,
    key: '_3DSP',
    name:'scatter3D',
    previewImage: ConstantImage.Scatter3DPlot,
    previewImageText: "Plot data as XYZ data points in 3D space.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '14',
    title: graphnameList._3DLinePlot,
    key: '_3DLP',
    name:'line3D',
     previewImage: ConstantImage.Line3DPlot,
    previewImageText: "Plot data as XYZ data points connected with lines.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '15',
    title: graphnameList._3DMeshPlot,
    key: '_3DMP',
    name:'mesh3D',
    previewImage: ConstantImage.Mesh3DPlot,
    previewImageText: "Plot data as a 3D surface.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  // {
  //   id: '16',
  //   title: graphnameList._3DBarPlot,
  //   key: '_3DBP',
  //   name:'bar3D',
  // //   previewImage: ConstantImage.CreateResultGraph,
  //   previewImageText: "Plot data as Z values on an XY grid.",
  //   previewImageTitle:"Select the type of graph you want to create"
  // },
  {
    id: '17',
    title: graphnameList.TernaryPlot,
    key: 'TP',
    name:'ternary',
     previewImage: ConstantImage.TernaryPlot,
    previewImageText: "Plots the normalized proportions of three substances in a triangle. Each corner is full saturation.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '18',
    title: graphnameList.BubblePlot,
    name:'bubble',
    key: 'BubP',
     previewImage: ConstantImage.BubblePlot,
    previewImageText: "Plots bubbles of variable size on an xy plane.",
    previewImageTitle:"Select the type of graph you want to create"
  },
  {
    id: '19',
    name:'choroplethMap',
    title: graphnameList.ChoroplethMap,
    key: 'CM',
     previewImage: ConstantImage.ChoroplethPlot,
    previewImageText: "Plot data using angles and distance from center",
    previewImageTitle:"Select the type of graph you want to create"
  },
  // {
  //   id: '20',
  //   title: graphnameList.ForestPlot,
  //   name:'forest',
  //   key: 'FP',
  //   previewImage: ConstantImage.CreateResultGraph,
  //   previewImageText: "Plot data using angles and distance from center",
  //   previewImageTitle:"Select the type of graph you want to create"
  // },
  // {
  //   id: '21',
  //   title: "Statistics Graph",
  //   key: 'StisP',
  // //   previewImage: ConstantImage.CreateResultGraph,
  //   previewImageText: "Plot data using angles and distance from center",
  //   previewImageTitle:"Select the type of graph you want to create"
  // },
];


export const graphStyle = {
    '1' : SPGraphStyle,
    '2' : LPGraphStyle,
    '3' : LSPGraphStyle,
    '4' : HMGraphStyle,
    '5' : APGraphStyle,
    '6' : PPGraphStyle,
    '7' : RPGraphStyle,
    '8' : VBCGraphStyle,
    '9' : HBCGraphStyle,
    '10' : BPGraphStyle,
    '11' : PCGraphStyle,
    '12' : CPGraphStyle,
    '13' : _3DSPGraphStyle,
    '14' : _3DLPGraphStyle,
    '15' : _3DMPGraphStyle,
    '16' : _3DBPGraphStyle,
    '17' : TPGraphStyle,
    '18' : BubPGraphStyle,
    '19' : CMGraphStyle
    // '20' : FPGraphStyle,
}

export const dataFormatList =  {
  '5' : [
        { id:'11', title:  'XY'},
        { id:'12', title:  'Single X'},
        { id:'13', title:  'Single Y'}
  ],
  '6' : [
      { id:'14', title:  'XY Pairs'},
      { id:'15', title:  'XManyY'},
      { id:'16', title:  'ManyXY'}
  ],
  '7' : [
      { id:'17', title:  'XY Pairs'},
      { id:'18', title:  'XManyY'},
      { id:'19', title:  'ManyXY'}
  ],
  '8' : [
      { id:'17', title:  'XY Pairs'},
      { id:'18', title:  'XManyY'},
      { id:'19', title:  'ManyXY'}
  ],
  '9' : [
      { id:'17', title:  'XY Pairs'},
      { id:'18', title:  'XManyY'},
      { id:'19', title:  'ManyXY'}
  ],
  '10' : [
      { id:'17', title:  'XY Pairs'},
      { id:'18', title:  'XManyY'},
      { id:'19', title:  'ManyXY'}
  ]
}
