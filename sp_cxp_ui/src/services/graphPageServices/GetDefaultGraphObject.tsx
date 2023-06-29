

import { GraphObjProps, PlotData} from "./GraphPageInterfaces";

export const getDefaultGraphObject = (
  gId: string,
  name: string,
  worksheetId: string,
  grPgId: string,
) => {
  const graphObject: GraphObjProps = {
    id: grPgId+gId+'-',
    name: name,
    layout: {},
    plotData: [],
    activeWorksheet: worksheetId,
    allPlotDataId: [],
    graphPageId:grPgId,
    plotLength:1,
    isResultGraphPage : false,
    isHistogram : false,
  };

  return graphObject
};


export const getDefaultPlotDataObject = (
  id: string,
  name: string,
  graphType: string,
  subGraphType: string,
  format: string,
  worksheetId: string,
  graphId:string,
  graphPageId:string
) => {
  const plotDataObject: PlotData = {
    id: graphId+id,
    name,
    graphId,
    graphPageId,
    graphType,
    subGraphType,
    format,
    activeWorksheet: worksheetId,
    data: [],
    properties:{},
    isChecked:true,

  };

  return plotDataObject
};

export const Rectangle = () =>{
  
}