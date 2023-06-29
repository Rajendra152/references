
import { PlotDialogList } from './graphDialogInterface';
import {
  DATA, SYMBOLS, LINES, AREA_FILLS, FILLS, PIE_SLICES, BAR_WIDTHS,
  REFERENCE_LINES, DROP_LINES, BOX_OPTIONS, MESH,_3D_LINES, CONTOUR_FILLS, CONTOUR_SCALE, CONTOUR_LABELS, CONTOUR_DETAILS,LOCATION
} from "../../components/Constant/GraphDialog";


import {
  getLinesJSON, getDataJSON, getAreaFillsJSON,
  getSymbolJSON, getBarWidthJSON, getPieSlicesJSON, getFillsJSON,getBoxOptionsJSON,getMESHJSON,getContourLinesJSON,
  getLocationJSON, getReferenceLinesJSON, getDropLinesJSON
} from './plotSubListJSON/getPlotInsetsJSON'
export const getPlotObject = (properties: any, layout:any) => {



  if (properties.type === 'pie') {
    return getPiePlotObj(properties)
  }
  else if (properties.type === 'bar') {
    return getBarPlotObj(properties,layout)
  }
  else if (properties.type === 'heatmap') {
    return getHeapMapObj(properties,layout)
  }
  else if (properties.type === "scatterternary") {
    return getTernaryPlotObj(properties)
  }
  else if (properties.type === "box") {
    return getBoxPlotObj(properties, layout)
  }
  else if (properties.type === "contour") {
    return getCountorPlotObj(properties)
  }
  else if (properties.type === 'mesh3d') {
    return get3dMeshPlotObj(properties)
  }
  else if (properties.type === "scatter3d") {
    return get3dLineScatterPlotObj(properties)
  }
  else if(layout.graphType==='polarPlot'){
    return getPolarPlotObj(properties)
  }
  else if(layout.graphType==='radarPlot'){
    return getRadarPlotObj(properties)
  }
  else if(properties.type==='choropleth'){
    return getChoroplethPlotObj(properties)
  }
  else {
    return get2dPlotObj(properties,layout)
  }

}

export const get2dPlotObj = (properties: any, layout?:any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),
    [SYMBOLS]: getSymbolJSON(properties),
    [LINES]: getLinesJSON(properties).line,
    [AREA_FILLS]: getAreaFillsJSON(properties).areaFills,
    [REFERENCE_LINES]: getReferenceLinesJSON(properties).refLines,
    [DROP_LINES]: getDropLinesJSON(layout).dropLines,
  }
  //[ERROR_BARS] :{}
  return plotObj
}

export const getBarPlotObj = (properties: any, layout:any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),
    [FILLS]: getSymbolJSON(properties),
    [BAR_WIDTHS]: getBarWidthJSON(properties, layout),
    [REFERENCE_LINES]: getReferenceLinesJSON(properties).refLines,
  }

  //[ERROR_BARS] :{}
  return plotObj;
}

export const getRadarPlotObj = (properties: any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),
    [SYMBOLS]: getSymbolJSON(properties),
    [LINES]: getLinesJSON(properties).line,
    [AREA_FILLS]:  getAreaFillsJSON(properties).areaFills,
  }
  //[ERROR_BARS] :{}
  return plotObj
}


export const getPolarPlotObj = (properties: any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),
    [SYMBOLS]: getSymbolJSON(properties),
    [LINES]: getLinesJSON(properties).line,
  }
  //[ERROR_BARS] :{}
  return plotObj
}

export const getTernaryPlotObj = (properties: any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),
    [SYMBOLS]: getSymbolJSON(properties),
    [LINES]: getLinesJSON(properties).line,
  }
  //[ERROR_BARS] :{}
  return plotObj
}

export const getBoxPlotObj = (properties: any, layout:any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),
    [FILLS]: getFillsJSON(properties),
    [BAR_WIDTHS]: getBarWidthJSON(properties, layout),
    [SYMBOLS]: getSymbolJSON(properties),
    [BOX_OPTIONS]: getBoxOptionsJSON(properties)
  }
  //[ERROR_BARS] :{}
  return plotObj
}

export const getPiePlotObj = (properties: any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),
    [FILLS]: getSymbolJSON(properties),
    [PIE_SLICES]: getPieSlicesJSON(properties)

  }
  //[ERROR_BARS] :{}
  return plotObj
}

export const get3dMeshPlotObj = (properties: any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties), 
    // [MESH]: getMESHJSON(properties).line,
  }
  //[ERROR_BARS] :{}
  return plotObj
}

export const get3dLineScatterPlotObj = (properties: any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),
    [SYMBOLS]: getSymbolJSON(properties),
    [_3D_LINES]: getLinesJSON(properties).line,
    // [DROP_LINES]: {},

  }
  //[ERROR_BARS] :{}
  return plotObj
}

export const getCountorPlotObj = (properties: any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),
    [CONTOUR_FILLS]: getContourLinesJSON(properties).line,
    // [CONTOUR_SCALE]: {},
    // [CONTOUR_LABELS]: {},
    // [CONTOUR_DETAILS]: {},

  }
  //[ERROR_BARS] :{}
  return plotObj
}

export const getHeapMapObj = (properties: any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),

  }
  //[ERROR_BARS] :{}
  return plotObj
}

export const getChoroplethPlotObj = (properties: any) => {
  const plotObj: PlotDialogList = {
    [DATA]: getDataJSON(properties),
    [LOCATION]: getLocationJSON(properties)

  }
  return plotObj
}