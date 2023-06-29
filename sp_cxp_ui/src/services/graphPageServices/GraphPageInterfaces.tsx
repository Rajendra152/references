

export interface GraphObjProps {
  id: string;
  name: string;
  graphPageId: string;
  layout: Object;
  plotData: Object[];
  activeWorksheet: string;
  allPlotDataId: string[];
  plotLength: number;
  isResultGraphPage : boolean,
  isHistogram :boolean,
}

export interface  PlotData {
    id: string;
    name: string;
    graphId: string;
    graphPageId: string;
    graphType: string;
    subGraphType: string;
    format: string;
    activeWorksheet: string;
    data: Object[];
    properties:Object;
    isChecked:boolean;
  }
  