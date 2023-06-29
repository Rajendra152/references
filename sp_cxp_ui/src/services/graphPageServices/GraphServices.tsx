import {
  getDefaultGraphObject,
  getDefaultPlotDataObject,
} from './GetDefaultGraphObject';

import { getDataSetByKey } from '../RedisServices';
import * as math from "mathjs";
import { getPropertiesByGraphType } from "./allGraphType/GetAllTypeProperties";
import { getLayoutByGraphType, getLayoutTitleByGraphType } from "./allGraphType/GetLayoutOnGraphType";
import * as TYPES from "./allGraphType/GraphTypeConstants";
import * as ERRORTYPES from "./../../components/Constant/ErrorCalculationTypes";

import {
  getModifiedPlotProperties, getModifiedData, getRadarErrorTrace, setLegendNameforTernary, setLegendNamefor3D,
  setLegendNameforXY,
  setLegendNameforPolar
} from './getModifiedObject';
import { getErrorCalculations } from './getErrorCalculations';
import { isTemplateDisplay } from "../../store/MainWindow";
import { getRegressionData } from "../graphPageServices/getRegressionData";
// import math, { cos } from "mathjs";
import { Properties } from "../../components/Constant/ConstantImage";
import { get2dAdditionalXAxis, get2dAdditionalYAxis } from './DefaultGraphProperties';

import { colorScheme, lineSchemeType, symbolSchemeType } from '../../utils/SchemeConstant'
import { addNewGraphState, setGraphReload } from '../UndoRedoServices';
import { convert_To_Pixel } from '../../utils/conversion';
import { cos } from 'mathjs';
// import { setGraphReload } from 
export const createGraph = (worksheetId: string, graphPage: any, graphObj: any, defaultProperty?: any, resultGraphWorksheetID?: any, keyName?: any,props?:any) => {
  console.log("CHECK", props,keyName)
  let NormalProbabilit = graphPage.name.includes("Normal Probability");
  let HistogramGraph = graphPage.name.includes("Histogram");

  console.log("check me", NormalProbabilit)
  const graphLength = graphPage.graphLength + 1
  const graphObject = getDefaultGraphObject(`Gr${graphLength}`, `Graph${graphLength}`, worksheetId, graphPage.id);
  graphObject.layout = getLayoutByGraphType(graphObj.graphType, graphObj.subGraphType);

  graphObject.layout = getDefaultLayoutOptions(graphObject.layout, defaultProperty, graphObj.data)
  console.log("graphPage", graphObject.layout, defaultProperty, graphObj.data)
  
  const plotObject = getDefaultPlotDataObject(
    `Plt1`,
    `Plot1`,
    graphObj.graphType,
    graphObj.subGraphType,
    graphObj.format,
    worksheetId,
    graphObject.id,
    graphPage.id
  );

  plotObject.properties = getPlotProperties(graphObj.graphType, graphObj.subGraphType);
  plotObject.properties = getDefaultOptions(plotObject.properties, defaultProperty, graphObj.data);
  // plotObject.properties.xaxis = "x2";
  plotObject.data = graphObj.data;
  let titleName = getLayoutTitleByGraphType(graphObject.layout, plotObject.properties, graphPage, resultGraphWorksheetID, keyName);
  graphObject.layout.title.text = titleName;
  if(NormalProbabilit == true){
    graphObject.layout.yaxis.title.text = "Cumulative Frequency";
    graphObject.layout.xaxis.title.text = "Residual Value";

  }
  else  if(HistogramGraph == true){
    graphObject.layout.yaxis.title.text = "Count";
    graphObject.layout.xaxis.title.text = "Residuals";

  }
  else if(keyName == "Frequency Bar Chart"){
    if(props.dataSelColumnsfre.yaxis == "freq"){
      graphObject.layout.yaxis.title.text = "Frequency";
      graphObject.layout.xaxis.title.text = props.dataSelColumnsfre.xaxis;
    }
    else{
      graphObject.layout.yaxis.title.text = "Percent";
      graphObject.layout.xaxis.title.text = props.dataSelColumnsfre.xaxis;
    }
  }
  
  graphObject.plotData.push(plotObject)
  graphObject.allPlotDataId.push(plotObject.id)
  console.log("hrph_object", graphObject, plotObject)
  return graphObject;
};

export const getPlotProperties = (graphType: string, subGraphType: string) => {
  return getPropertiesByGraphType(graphType, subGraphType);
};

// const transposeRowsToColumns = (grid) => {
//   const transposedData = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
//   return transposedData
// }

export const transposeRowsToColumns = (grid) => {
  // console.log(grid, 'grid===>data');
  // let totalColumn = 0;
  // let totalLength = [];

  // grid.map((item) => {
  //   if (item.length > totalColumn) {
  //     totalColumn = item.length;
  //   }
  // });
  // totalLength.length = totalColumn;
  // totalLength.fill(1);
  // const transposedData = totalLength.map((_, colIndex) => {
  //   return grid.map((row) => {
  //     let ad = row[colIndex];
  //     return ad;
  //   });
  // });
  // return transposedData;



  const maxLen = grid.reduce((max, { length }) => Math.max(max, length), 0);

  // make a new set of arrays
  const resultTransposed = Array.from({ length: maxLen }, (_, i) => grid.map(col => col[i]));
  // let resultTransposed = math.transpose(result)

  console.log(resultTransposed, "resultTransposed")
  return resultTransposed
};

export const getDataFromGrid = (column) => {
  console.log('column', column);
  if (column == undefined) {
    console.log("hello")
    return []
  }
  return column
    .filter((item) => {
      return item && item.value !== '' && item.value != undefined;
    })
    .map((item) => {
      return item.value;
    });
};

export const getgraphicCellFromGrid = (col: any, type: any, isentirerange: boolean) => {
  console.log("column", col)
  if (!col) {
    return []
  }
  let column = col;

  if (type === 'color') {
    if (!isentirerange)
      column = col.filter(item => item && item.value)

    return column.map(item => {
      if (item && item.value && typeof item.value == 'string') {
        return item.value.startsWith('@') ? item.value : '#ffffffff'
      }
      return '#ffffffff'
    })
  }
  else if (type === 'line') {

    return column.map(item => {
      if (item && item.formula && typeof item.formula == 'string') {
        return item.formula.slice(7, -2)
      }
      return 'none'
    })
  }
  else if (type == 'shape') {
    return column.map(item => {
      if (item && item.formula && typeof item.formula == 'string') {
        return item.formula.slice(8, -2)
      }
      return 'none'
    })
  }
  else if (type == 'patt') {
    return column.map(item => {
      if (item && item.formula && typeof item.formula == 'string') {
        return item.formula.slice(7, -2)
      }
      return 'none'
    })
  }

}

//  export async function getDataFromWorksheet(activeWorksheetId:string, activeClient:any, plotData:any, format: string, graphType:string){
export async function getDataFromWorksheet(
  activeWorksheetId: string,
  activeClient: any,
  plotDataObject: any,
  layout?: any,
  gridData?: any
) {
  const plotData = plotDataObject.data;
  const graphType = plotDataObject.graphType;
  const subGraphType = plotDataObject.subGraphType;
  const format = plotDataObject.format;
  const plotProperties = plotDataObject.properties;
  // let gridData = await getDataSetByKey(activeWorksheetId, activeClient);

  // gridData = transposeRowsToColumns(gridData);

  const allPlots = getAllPlots(
    gridData,
    plotData,
    graphType,
    subGraphType,
    format,
    plotProperties,
    layout
  );
  console.log(
    plotDataObject,
    activeClient,
    activeWorksheetId,
    gridData,
    allPlots
  );

  return allPlots;
}

export const getLayoutOnGraphType = (
  graphType: string,
  subGraphType: string
) => {
  return getLayoutByGraphType(graphType, subGraphType);
};

export const getAllPlots = (gridData: [[]], plotData: any, graphType: string, subGraphType: string, format: string, plotProperties: any, layout: any) => {
  let allPlots = []
  console.log(plotData, graphType, subGraphType, format, plotProperties, layout, "GET ALL PLOTS")
  if (graphType === TYPES.PIE_PLOT) {
    for (let index = 0; index < plotData.pie.length; index++) {
      let plotObj = {
        values: [],
        labels: [],
      }
      plotObj.values = getDataFromGrid(gridData[plotData.pie[index]])
      plotObj.labels = getDataFromGrid(gridData[plotData.pie[index]]).map((value) => {
        return `Col ${plotData.pie[index]} : ${value}`
      })

      // let changedProperties = manipulatePorperties(plotData,plotProperties,graphType,subGraphType,plotObj)
      plotProperties.name = 'Pie'
      let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
      plotObj = getModifiedData(plotObj, eachPlotProperties)
      let newProperties = getModifiedPlotProperties(plotObj, gridData, eachPlotProperties, graphType, plotProperties)
      allPlots.push({ ...plotObj, ...newProperties })

    }
  }
  else if (graphType === TYPES.HEATMAP) {
    for (let index = 0; index < plotData.x.length; index++) {
      let plotObj = {
        x: [],
        y: [],
      }
      plotObj.x = getDataFromGrid(gridData[plotData.x[index]])
      plotObj.y = getDataFromGrid(gridData[plotData.y[index]])

      // let changedProperties = manipulatePorperties(plotData,plotProperties,graphType,subGraphType,plotObj)
      plotProperties.name = `Col ${plotData.x[index]} vs Col ${plotData.y[index]}`

      let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
      plotObj = getModifiedData(plotObj, eachPlotProperties)
      let newProperties = getModifiedPlotProperties(plotObj, gridData, eachPlotProperties, graphType, plotProperties)
      let largestIndex = -1;

      if (plotData.z) {
        let allZvalues = plotData.z.map((item, index) => {
          let data = getDataFromGrid(gridData[plotData.z[index]]);
          if (data.length > largestIndex) {
            largestIndex = data.length;
          }
          return data
        })
        let tran = transposeRowsToColumns(allZvalues)
        plotObj.z = tran
      }



      allPlots.push({ ...plotObj, ...newProperties })

    }
  }

  else if (graphType === TYPES.CHOROPLETH_MAP) {
    for (let index = 0; index < plotData.x.length; index++) {
      let plotObj = {
        locations: [],
        z: [],
      }
      plotObj.locations = getDataFromGrid(gridData[plotData.x[index]])
      plotObj.z = getDataFromGrid(gridData[plotData.y[index]])

      // let changedProperties = manipulatePorperties(plotData,plotProperties,graphType,subGraphType,plotObj)
      plotProperties.name = `Col ${plotData.x[index]} vs Col ${plotData.y[index]}`

      let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
      plotObj = getModifiedData(plotObj, eachPlotProperties)
      let newProperties = getModifiedPlotProperties(plotObj, gridData, eachPlotProperties, graphType, plotProperties)

      allPlots.push({ ...plotObj, ...newProperties })

    }
  }

  //Box plots
  else if (graphType === TYPES.BOX_PLOT) {
    if (subGraphType === TYPES.VERTICAL_BOX) {
      for (let index = 0; index < plotData.y.length; index++) {
        let x_index = null;
        let y_index = null;
        const plotObj = {
          y: [],
        }
        plotObj.y = getDataFromGrid(gridData[plotData.y[index]])
        y_index = plotData.y[index]
        if (plotData.x) {
          let x_value = getDataFromGrid(gridData[plotData.x[0]])[index]
          plotObj.x = Array(plotObj.y.length).fill(Number(x_value))
          x_index = plotData.x[0]
        }
        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        eachPlotProperties = setLegendNameforXY(layout, eachPlotProperties, x_index, y_index)
        plotObj = getModifiedData(plotObj, eachPlotProperties)
        allPlots.push({ ...plotObj, ...eachPlotProperties })

      }
    }
    else if (subGraphType === TYPES.HORIZONTAL_BOX) {
      for (let index = 0; index < plotData.x.length; index++) {
        let x_index = null;
        let y_index = null;
        const plotObj = {
          x: [],
        }
        plotObj.x = getDataFromGrid(gridData[plotData.x[index]])
        x_index = plotData.x[index]
        if (plotData.y) {
          let y_value = getDataFromGrid(gridData[plotData.y[0]])[index]
          plotObj.y = Array(plotObj.x.length).fill(Number(y_value))
          y_index = plotData.y[0]
        }

        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        plotObj = getModifiedData(plotObj, eachPlotProperties)
        eachPlotProperties = setLegendNameforXY(layout, eachPlotProperties, x_index, y_index)
        allPlots.push({ ...plotObj, ...eachPlotProperties })
        // allPlots.push({...plotObj,...plotProperties})

      }
    }
  }
  //Point plots
  else if (subGraphType == TYPES.VERTICAL_POINT && (format == 'XManyY' || format == 'ManyY')) {
    for (let index = 0; index < plotData.y.length; index++) {
      let x_index = null;
      let y_index = null;
      const plotObj = {
        x: [],
        y: [],
      }
      plotObj.y = getDataFromGrid(gridData[plotData.y[index]])
      y_index = plotData.y[index]
      if (format == 'XManyY') {
        let x_value = getDataFromGrid(gridData[plotData.x[0]])[index]
        plotObj.x = Array(plotObj.y.length).fill(Number(x_value))
        x_index = plotData.x[0]
      }
      else if (format == 'ManyY') {
        plotObj.x = Array(plotObj.y.length).fill(index + 1)
      }

      let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
      plotObj = getModifiedData(plotObj, eachPlotProperties)

      eachPlotProperties = setLegendNameforXY(layout, eachPlotProperties, x_index, y_index)

      let maxLeng = plotObj.x.length > plotObj.y.length ? plotObj.x.length : plotObj.y.length
      eachPlotProperties = modifyColorScale(eachPlotProperties, maxLeng, plotProperties, gridData)
      allPlots.push({ ...plotObj, ...eachPlotProperties })
    }
  }
  else if (subGraphType == TYPES.HORIZONTAL_POINT) {
    if (format == 'YManyX' || format == 'ManyX') {
      for (let index = 0; index < plotData.x.length; index++) {
        let x_index = null;
        let y_index = null;
        const plotObj = {
          x: [],
          y: [],
        }
        plotObj.x = getDataFromGrid(gridData[plotData.x[index]])
        x_index = plotData.x[index]
        if (format == 'YManyX') {
          let y_value = getDataFromGrid(gridData[plotData.y[0]])[index]
          plotObj.y = Array(plotObj.x.length).fill(Number(y_value))
          y_index = plotData.y[0]
        }
        else if (format == 'ManyX') {
          plotObj.y = Array(plotObj.x.length).fill(index + 1)
        }

        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        plotObj = getModifiedData(plotObj, eachPlotProperties)

        eachPlotProperties = setLegendNameforXY(layout, eachPlotProperties, x_index, y_index)
        let maxLeng = plotObj.x.length > plotObj.y.length ? plotObj.x.length : plotObj.y.length
        eachPlotProperties = modifyColorScale(eachPlotProperties, maxLeng, plotProperties, gridData)
        allPlots.push({ ...plotObj, ...eachPlotProperties })
      }
    } else if (format == 'YManyXReplicate' || format == 'ManyXReplicate') {
      const loopLength = plotData.endset.length
      for (let index = 0; index < loopLength; index++) {
        let plotObj = {
          x: [],
          y: [],
        }

        const nSets = Math.abs(plotData.endset[index]-plotData.startset[index])+1;
        const startIdx = Math.min(plotData.startset[index],plotData.endset[index])    
        const nRows = getDataFromGrid(gridData[startIdx]).length
        
        let yData = plotData.y && getDataFromGrid(gridData[plotData.y[0]])
        for (let j=0; j<nRows; j++){
          for (let i=0; i<nSets; i++ ) {
            let xData = getDataFromGrid(gridData[i+startIdx])
            plotObj.x.push(xData[j])
            if (plotData.y){
              plotObj.y.push(yData[j])
            } else {
              plotObj.y.push(j+1)
            }
          }  
        }

        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        plotObj = getModifiedData(plotObj, eachPlotProperties)
        allPlots.push({ ...plotObj, ...eachPlotProperties })
      }
    }
  }
  //Radar and Polar plots
  else if (graphType == TYPES.RADAR_PLOT || graphType == TYPES.POLAR_PLOT) {
    if (plotData.x && plotData.y) {
      plotData.r = plotData.x
      plotData.theta = plotData.y
    }
    let plotDataVAlues = plotData.r ? plotData.r : plotData.theta
    console.log(plotDataVAlues, "helloooo")
    console.log(plotData, "plotDAraaa")
    for (let index = 0; index < plotDataVAlues.length; index++) {
      let t_index = null;
      let r_index = null;
      const plotObj = {
        r: [],
        theta: [],
        error: [],
      }


      if (plotData.theta) {
        plotObj.theta = getDataFromGrid(gridData[plotData.theta[0]])
        t_index = plotData.theta[index]
      }
      if (plotData.r) {
        plotObj.r = getDataFromGrid(gridData[plotData.r[index]])
        r_index = plotData.r[index]
      } else {
        plotObj.r = Array.from({ length: plotObj.theta.length }, (v, i) => i + 1);
      }
      if (plotData.error) {
        plotObj.error = getDataFromGrid(gridData[plotData.error[index]])
      }

      let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
      plotObj = getModifiedData(plotObj, eachPlotProperties)

      eachPlotProperties = setLegendNameforPolar(layout, eachPlotProperties, r_index, t_index)

      let maxLeng = plotObj.r.length > plotObj.theta.length ? plotObj.r.length : plotObj.theta.length
      eachPlotProperties = modifyColorScale(eachPlotProperties, maxLeng, plotProperties, gridData)
      if (plotData.error) {
        let radarObj = {
          r: plotObj.r,
          theta: plotObj.theta
        }
        allPlots.push({ ...radarObj, ...eachPlotProperties, fill: 'none' })
        radarObj = {
          ...radarObj,
          r: getRadarErrorTrace(plotObj.r, plotObj.error, 0)
        }
        allPlots.push({ ...radarObj, ...eachPlotProperties, fill: 'tonext' });
        radarObj = {
          ...radarObj,
          r: getRadarErrorTrace(plotObj.r, plotObj.error, 1)
        }
        allPlots.push({ ...radarObj, ...eachPlotProperties, fill: 'tonext' });
      }
      else {
        allPlots.push({ ...plotObj, ...eachPlotProperties })
      }



    }

  }
  //Ternary plots
  else if (graphType == TYPES.TERNARY_PLOT) {
    console.log("inside ternary")
    console.log(plotData, "plotData.a.length")
    if (plotData.x && plotData.y && plotData.z) {
      for (let index = 0; index < plotData.x.length; index++) {
        let plotObj = {

        }
        plotObj.a = getDataFromGrid(gridData[plotData.x[index]])
        plotObj.b = getDataFromGrid(gridData[plotData.y[index]])
        plotObj.c = getDataFromGrid(gridData[plotData.z[index]])

        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        plotObj = getModifiedData(plotObj, eachPlotProperties)
        eachPlotProperties = setLegendNameforTernary(eachPlotProperties, plotData.x[index], plotData.y[index], plotData.z[index])
        let maxLeng = plotObj.a.length > plotObj.b.length ? plotObj.a.length : plotObj.b.length
        maxLeng = maxLeng > plotObj.c.length ? maxLeng : plotObj.c.length

        eachPlotProperties = modifyColorScale(eachPlotProperties, maxLeng, plotProperties, gridData)
        allPlots.push({ ...plotObj, ...eachPlotProperties })
        // allPlots.push({...plotObj,...plotProperties})
      }
    }
    else if (plotData.x && plotData.y) {
      let loopLength = 0;
      loopLength = plotData.y.length > plotData.x.length ? plotData.y.length : plotData.x.length
      for (let index = 0; index < loopLength; index++) {
        let plotObj = {

        }
        plotObj.a = getDataFromGrid(gridData[plotData.x[index]])
        plotObj.b = getDataFromGrid(gridData[plotData.y[index]])
        plotObj.c = Array.from({ length: loopLength }, (v, i) => i + 1);

        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        plotObj = getModifiedData(plotObj, eachPlotProperties)

        eachPlotProperties = setLegendNameforTernary(eachPlotProperties, plotData.x[index], plotData.y[index], null)
        let maxLeng = plotObj.a.length > plotObj.b.length ? plotObj.a.length : plotObj.b.length
        maxLeng = maxLeng > plotObj.c.length ? maxLeng : plotObj.c.length

        eachPlotProperties = modifyColorScale(eachPlotProperties, maxLeng, plotProperties, gridData)
        allPlots.push({ ...plotObj, ...eachPlotProperties })
      }
    }
    else if (plotData.x && plotData.z) {
      let loopLength = 0;
      loopLength = plotData.x.length > plotData.z.length ? plotData.x.length : plotData.z.length
      for (let index = 0; index < loopLength; index++) {
        let plotObj = {

        }
        plotObj.a = getDataFromGrid(gridData[plotData.x[index]])
        plotObj.c = getDataFromGrid(gridData[plotData.z[index]])
        plotObj.b = Array.from({ length: loopLength }, (v, i) => i + 1);
        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        plotObj = getModifiedData(plotObj, eachPlotProperties)

        eachPlotProperties = setLegendNameforTernary(eachPlotProperties, plotData.x[index], null, plotData.z[index])
        let maxLeng = plotObj.a.length > plotObj.b.length ? plotObj.a.length : plotObj.b.length
        maxLeng = maxLeng > plotObj.c.length ? maxLeng : plotObj.c.length

        eachPlotProperties = modifyColorScale(eachPlotProperties, maxLeng, plotProperties, gridData)
        allPlots.push({ ...plotObj, ...eachPlotProperties })
      }
    }
    else if (plotData.y && plotData.z) {
      let loopLength = 0;
      loopLength = plotData.y.length > plotData.z.length ? plotData.y.length : plotData.z.length
      for (let index = 0; index < loopLength; index++) {
        let plotObj = {

        }
        plotObj.b = getDataFromGrid(gridData[plotData.y[index]])
        plotObj.c = getDataFromGrid(gridData[plotData.z[index]])
        plotObj.a = Array.from({ length: loopLength }, (v, i) => i + 1);

        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        plotObj = getModifiedData(plotObj, eachPlotProperties)

        eachPlotProperties = setLegendNameforTernary(eachPlotProperties, null, plotData.y[index], plotData.z[index])

        allPlots.push({ ...plotObj, ...eachPlotProperties })
      }
    }


  }
  else {
    console.log(plotData, "inside")
    let loopLength = 0;
    if (plotData.y && plotData.x && plotData.z) {
      loopLength = plotData.z.length
      for (let index = 0; index < loopLength; index++) {
        let x_index = null;
        let y_index = null;
        let z_index = null;
        const plotObj = {
          x: [],
          y: [],
          z: [],
        }
        if (plotData.x.length === 1) {
          plotObj.x = getDataFromGrid(gridData[plotData.x[0]])
          x_index = plotData.x[0]
        }
        else {
          plotObj.x = getDataFromGrid(gridData[plotData.x[index]])
          x_index = plotData.x[index]
        }

        if (plotData.y.length === 1) {
          plotObj.y = getDataFromGrid(gridData[plotData.y[0]])
          y_index = plotData.y[0]
        }
        else {
          plotObj.y = getDataFromGrid(gridData[plotData.y[index]])
          y_index = plotData.y[index]
        }

        plotObj.z = getDataFromGrid(gridData[plotData.z[index]])
        z_index = plotData.z[index];
        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        plotObj = getModifiedData(plotObj, eachPlotProperties)

        eachPlotProperties = setLegendNamefor3D(eachPlotProperties, x_index, y_index, z_index)
        let maxLeng = plotObj.x.length > plotObj.y.length ? plotObj.x.length : plotObj.y.length
        maxLeng = maxLeng > plotObj.y.length ? maxLeng : plotObj.y.length
        eachPlotProperties = modifyColorScale(eachPlotProperties, maxLeng, plotProperties, gridData)
        allPlots.push({ ...plotObj, ...eachPlotProperties })

      }

    }
    else if (plotData.y && plotData.x) {
      console.log(plotData)
      loopLength = plotData.y.length > plotData.x.length ? plotData.y.length : plotData.x.length
      for (let index = 0; index < loopLength; index++) {
        let x_index = null;
        let y_index = null;
        let plotObj = {
          x: [],
          y: [],
        }
        console.log("plotData", plotData)
        if (plotData.x.length === 1) {
          plotObj.x = getDataFromGrid(gridData[plotData.x[0]])
          x_index = plotData.x[0]
        }
        else {
          plotObj.x = getDataFromGrid(gridData[plotData.x[index]])
          x_index = plotData.x[index]
        }

        if (plotData.y.length === 1) {
          plotObj.y = getDataFromGrid(gridData[plotData.y[0]])
          y_index = plotData.y[0]
        }
        else {
          plotObj.y = getDataFromGrid(gridData[plotData.y[index]])
          y_index = plotData.y[index]
        }

        if (plotData.symbol_values) {
          if (plotData.symbol_values == ERRORTYPES.ROW_MEANS || plotData.symbol_values == ERRORTYPES.ROW_MEDIAN)
            plotObj = getErrorCalculationsByRows(plotObj, plotData, subGraphType, gridData)
          else
            plotObj = getErrorCalculations(plotObj, plotData, subGraphType, gridData, index);
        }
        console.log(plotObj, "plotObj")
        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        // modifiying properties based on the data
        let modifiedProperties = getModifiedPlotProperties(
          plotData,
          gridData,
          eachPlotProperties,
          graphType,
        )
        console.log(plotObj, "plotObj")
        modifiedProperties = setLegendNameforXY(layout, eachPlotProperties, x_index, y_index)
        let maxLeng = plotObj.x.length > plotObj.y.length ? plotObj.x.length : plotObj.y.length
        modifiedProperties = modifyColorScale(modifiedProperties, maxLeng, plotProperties, gridData)
        // modifying data based on properties
        plotObj = getModifiedData(plotObj, modifiedProperties)

        // Adding regression traces
        if (
          subGraphType == TYPES.SIMPLE_REGRESSION ||
          subGraphType == TYPES.MULTIPLE_REGRESSION ||
          subGraphType == TYPES.SIMPLE_ERROR_REGRESSION ||
          subGraphType == TYPES.MULTIPLE_ERROR_REGRESSION
        ) {
          // let regressionObj = getRegressionData(plotObj);
          let regressionObj = {
            x: [0, 0.2, 0.4, 0.7, 1.2, 1.5, 1.9],
            y: [0, 0.2, 0.4, 0.7, 1.2, 1.5, 1.9],
          };
          let regressionProperties = {
            type: 'scatter',
            mode: 'lines',
            line: {
              color: 'black',
              width: 1,
            },
            name: 'Plot 1 Regr'
          }
          allPlots.push({ ...regressionObj, ...regressionProperties })
          allPlots.push({ ...plotObj, ...modifiedProperties })
        }
        else {
          allPlots.push({ ...plotObj, ...modifiedProperties })
        }

      }

    }
    //Category
    else if (plotData.category) {
      // loopLength = plotData.category.length
      loopLength = plotData.x ? plotData.x.length : plotData.y.length
      for (let index = 0; index < loopLength; index++) {
        let x_index = null;
        let y_index = null;
        let z_index = null;
        const plotObj = {
          x: [],
          y: [],
        }
        if (format == 'XCategory' || format == 'CategoryX') {
          plotObj.x = getDataFromGrid(gridData[plotData.x[index]])
          plotObj.y = getDataFromGrid(gridData[plotData.category[0]])
        }
        if (format == 'YCategory' || format == 'CategoryY') {
          plotObj.y = getDataFromGrid(gridData[plotData.y[index]])
          plotObj.x = getDataFromGrid(gridData[plotData.category[0]])
        }

        if (plotData.symbol_values) {
          plotObj = getErrorCalculations(plotObj, plotData, subGraphType, gridData, index);
        }
        console.log(plotObj)
        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))

        let maxLeng = plotObj.x.length > plotObj.y.length ? plotObj.x.length : plotObj.y.length
        eachPlotProperties = modifyColorScale(eachPlotProperties, maxLeng, plotProperties, gridData)

        allPlots.push({ ...plotObj, ...eachPlotProperties })
      }
    }

    //XManyYReplicates
    else if (plotData.startset && plotData.endset) {
      if (!plotData.symbol_values) {
        let replicates = [...plotData.startset, ...plotData.endset]
        loopLength = replicates.length
        for (let index = 0; index < loopLength; index++) {
          let x_index = null;
          let y_index = null;
          let z_index = null;
          let plotObj = {
            x: [],
            y: [],
          }

          if (format == 'XManyYReplicate' || format == 'ManyYReplicate') {
            plotObj.y = getDataFromGrid(gridData[replicates[index]])
          }
          if (format == 'YManyXReplicate' || format == 'ManyXReplicate') {
            plotObj.x = getDataFromGrid(gridData[replicates[index]])
          }
          if (plotData.x) {
            plotObj.x = getDataFromGrid(gridData[plotData.x[0]])
          }
          if (plotData.y) {
            plotObj.y = getDataFromGrid(gridData[plotData.y[0]])
          }

          let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
          plotObj = getModifiedData(plotObj, eachPlotProperties)
          allPlots.push({ ...plotObj, ...eachPlotProperties })
        }
      }
      else {
        console.log("sdgdhhjkl------>", plotData)
        loopLength = plotData.startset.length;
        for (let index = 0; index < loopLength; index++) {
          let plotObj = {
            x: [],
            y: [],
          }
          // if(plotData.x){
          //   plotObj.x = getDataFromGrid(gridData[plotData.x[0]] )
          // }
          // if(plotData.y){
          //   plotObj.y = getDataFromGrid(gridData[plotData.y[0]] )
          // }
          // if(!plotObj.x.length){
          //   plotObj = getErrorCalculations(plotObj,plotData,subGraphType,gridData,index);
          // }

          let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
          plotObj = getErrorCalculations(plotObj, plotData, subGraphType, gridData, index);
          console.log('Row means plotObj', plotObj)
          allPlots.push({ ...plotObj, ...eachPlotProperties })
        }

      }
    }

    else if (plotData.y) {
      loopLength = plotData.y.length ? plotData.y.length : plotData.bar.length
      for (let index = 0; index < loopLength; index++) {
        let x_index = null;
        let y_index = null;
        let plotObj = {
          y: [],
          x: []
        }
        plotObj.y = getDataFromGrid(gridData[plotData.y[index]])
        plotObj.x = Array.from({ length: plotObj.y.length }, (v, i) => i + 1);

        y_index = plotData.y[index]

        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        let modifiedProperties = getModifiedPlotProperties(
          plotData,
          gridData,
          eachPlotProperties,
          graphType,

        )
        if (plotData.symbol_values) {
          console.log(plotData.symbol_values, "inside synbol")
          plotObj = getErrorCalculations(plotObj, plotData, subGraphType, gridData, index);
        }

        modifiedProperties = setLegendNameforXY(layout, modifiedProperties, x_index, y_index)
        plotObj = getModifiedData(plotObj, modifiedProperties)
        let maxLeng = plotObj.y.length
        modifiedProperties = modifyColorScale(modifiedProperties, maxLeng, plotProperties, gridData)
        allPlots.push({ ...plotObj, ...modifiedProperties })

      }
    }
    else if (plotData.x) {
      loopLength = plotData.x.length
      for (let index = 0; index < loopLength; index++) {
        let x_index = null;
        let y_index = null;
        let plotObj = {
          x: [],
          y: []
        }
        plotObj.x = getDataFromGrid(gridData[plotData.x[index]])
        plotObj.y = Array.from({ length: plotObj.x.length }, (v, i) => i + 1);
        x_index = plotData.x[index]
        if (plotData.symbol_values) {
          console.log(plotData.symbol_values, "inside synbol")
          plotObj = getErrorCalculations(plotObj, plotData, subGraphType, gridData, index);
        }


        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        let modifiedProperties = getModifiedPlotProperties(
          plotData,
          gridData,
          eachPlotProperties,
          graphType,
        )


        modifiedProperties = setLegendNameforXY(layout, eachPlotProperties, x_index, y_index)
        plotObj = getModifiedData(plotObj, modifiedProperties)

        let maxLeng = plotObj.x.length;
        modifiedProperties = modifyColorScale(modifiedProperties, maxLeng, plotProperties, gridData)
        allPlots.push({ ...plotObj, ...modifiedProperties })


      }
    }
    else if (plotData.z) {
      loopLength = plotData.z.length
      for (let index = 0; index < loopLength; index++) {
        let x_index = null;
        let y_index = null;
        let z_index = null;
        let plotObj = {
          x: [],
          y: [],
          z: [],
        }
        plotObj.z = getDataFromGrid(gridData[plotData.z[index]]);
        z_index = plotData.z[index]
        plotObj.x = Array.from({ length: plotObj.z.length }, (v, i) => i + 1);
        plotObj.y = Array.from({ length: plotObj.z.length }, (v, i) => i + 1);
        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        eachPlotProperties = setLegendNamefor3D(eachPlotProperties, x_index, y_index, z_index)

        let maxLeng = plotObj.x.length > plotObj.y.length ? plotObj.x.length : plotObj.y.length
        maxLeng = maxLeng > plotObj.z.length ? maxLeng : plotObj.z.length

        eachPlotProperties = modifyColorScale(eachPlotProperties, maxLeng, plotProperties, gridData)
        allPlots.push({ ...plotObj, ...eachPlotProperties })

      }
    }
    else if (plotData.bar) {
      loopLength = plotData.bar.length
      for (let index = 0; index < loopLength; index++) {
        let x_index = null;
        let y_index = null;
        let plotObj = {
          y: [],
        }
        plotObj.y = getDataFromGrid(gridData[plotData.bar[index]])
        // plotObj.x = Array.from({ length: loopLength }, (v, i) => i + 1);

        y_index = plotData.bar[index]

        let eachPlotProperties = JSON.parse(JSON.stringify(plotProperties))
        let modifiedProperties = getModifiedPlotProperties(
          plotData,
          gridData,
          eachPlotProperties,
          graphType,

        )
        if (plotData.symbol_values) {
          console.log(plotData.symbol_values, "inside synbol")
          plotObj = getErrorCalculations(plotObj, plotData, subGraphType, gridData, index, true);
        }
        console.log(plotObj, "plotData.error1[index]a")
        modifiedProperties = setLegendNameforXY(layout, modifiedProperties, x_index, y_index)
        plotObj = getModifiedData(plotObj, modifiedProperties)
        let maxLeng = plotObj.y.length
        modifiedProperties = modifyColorScale(modifiedProperties, maxLeng, plotProperties, gridData)
        allPlots.push({ ...plotObj, ...modifiedProperties })

      }
    }

  }

  // for ColorScheme Initilization on each Line
  if (plotProperties.type !== 'choropleth') {
    allPlots = modifyLineColorScheme(allPlots, plotProperties, gridData)
  }

  if (plotProperties.type == 'scatter' && allPlots.length > 1) {
    allPlots = modifySymbol(allPlots, plotProperties, gridData)
  }

  if (!plotProperties.traceDetails) {
    plotProperties.traceDetails = allPlots.map((plt, index) => {
      plt.showlegend = true
      return {
        index,
        'name': plt.name,
        'isShow': true
      }
    })
  }
  else {
    let alltraceDetail = []
    for (let i = 0; i < plotProperties.traceDetails.length; i++) {
      allPlots[i].showlegend = plotProperties.traceDetails[i].isShow
      let newDet = {
        ...plotProperties.traceDetails[i],
        'name': allPlots[i].name,
      }
      alltraceDetail.push(newDet)
    }
    plotProperties.traceDetails = alltraceDetail

    console.log("Heyyyyyyyyyyyy-->>>", plotProperties.traceDetails)
  }

  return allPlots
}


export const getSpreadsheetColumn = async (
  openedWorksheet: any,
  colIndex: any
) => {
  let gridData = await getDataSetByKey(
    openedWorksheet[0].key,
    openedWorksheet[0].client
  );
  gridData = transposeRowsToColumns(gridData);
  const columnData = getDataFromGrid(gridData[colIndex]);
  return columnData;
};

export const getColumnData = async (openedWorksheet: any) => {
  let gridData = await getDataSetByKey(
    openedWorksheet[0].key,
    openedWorksheet[0].client
  );
  gridData = transposeRowsToColumns(gridData);
  const columnData1 = getDataFromGrid(gridData[1]);
  const columnData2 = getDataFromGrid(gridData[2]);
  return [columnData1, columnData2];
};

export const updateGraphProperties = (
  currGrPg: any,
  currGraph: any,
  currPlot: any,
  newLayout: any,
  newProperties: any,
  props: any
) => {
  const currentGraphPage = { ...props.allGraphPages[currGrPg.id] };
  const currentGraph = currentGraphPage.graphList.filter(
    (item: any) => item.id === currGraph.id
  )[0];
  //console.log(currentGraph)
  const currentPlot = currentGraph.plotData.filter(
    (item: any) => item.id === currPlot.id
  )[0];

  currentGraph.layout = newLayout;
  currentPlot.properties = newProperties;

  currentGraphPage.graphList = currentGraphPage.graphList.map((grp: any) => {
    if (grp.id !== currentGraph.id) return grp;
    else return currentGraph;
  });

  currentGraph.plotData = currentGraph.plotData.map((plot: any) => {
    if (plot.id !== currentGraph.id) return plot;
    else return currentPlot;
  });
  currentGraphPage.isSaved = false;
  console.log(currentGraphPage);
  addNewGraphState(currentGraphPage, props);
  props.updateGraphProperty({ upGrPg: currentGraphPage });
};

export const updateGraphPage = (
  currGrPg: any,
  props: any,
  isAdding: boolean,
  nodeEle: any,
  nodeConnector: any,
  changedElement: any,
  targetPosition: object,
  sizeChange ? : boolean,
  isGraphType ?:boolean,
  isPosition ? : boolean,
  isTextChange ? : boolean 
) => {
  const currentGraphPage = { ...props.allGraphPages[currGrPg.id] };
  console.log(currentGraphPage, 'props');
  if (isAdding) {
    if (nodeEle) {
      currentGraphPage.allNodesList.push(nodeEle)
    } else {
      currentGraphPage.allConnectorsList.push(nodeConnector);
    }
  } else {
    console.log("inside hewrere")
    if (nodeEle) {
      console.log("inside", currentGraphPage)
      if (isGraphType) {
        console.log("inside")
        currentGraphPage.graphList = currentGraphPage.graphList.map((item) => {
          if (item.id == changedElement.id) {
            console.log("inside1", targetPosition)
            if (isPosition) {
              item.layout.offsetX = targetPosition.offsetX;
              item.layout.offsetY = targetPosition.offsetY;
              console.log("inside2", item.layout)
            } else {
              item.layout.width = targetPosition.width;
              item.layout.height = targetPosition.height
            }
          }
          return item
        })
      }
      currentGraphPage.allNodesList.find((item) => {
        if (item.id == changedElement.id) 
        {
          if (!sizeChange && !isTextChange) {
            console.log("inside here",targetPosition)
            item.offsetX = targetPosition.x;
            item.offsetY = targetPosition.y;
          } else if (isTextChange) {
            console.log("inside1066",changedElement,"------------->>>>>>>>>>",changedElement.shape.properties.content, nodeEle, item)
           console.log("nodeEle", )
            item.width = changedElement.width,
            item.height = changedElement.height,
            item.offsetX = changedElement.offsetX,
            item.offsetY = changedElement.offsetY,
            item.shape.content = nodeEle.shape.content
            console.log(item, "items edit",changedElement.shape.content)
           }else {
            console.log("inside3")

            item.width = targetPosition.width;
            item.height = targetPosition.height;
          }
        }
      });
    console.log(  currentGraphPage.allNodesList)
    } else {
      currentGraphPage.allConnectorsList.find((item) => {
        console.log(changedElement);
        if (item.id == changedElement.id) {
          console.log('insideconnector', targetPosition);
          item.offsetX = targetPosition.x;
          item.offsetY = targetPosition.y;
          item.sourcePoint = {
            x: changedElement.sourcePoint.x,
            y: changedElement.sourcePoint.y,
          };
          item.targetPoint = {

            x: changedElement.targetPoint.x,
            y: changedElement.targetPoint.y,
          };
        }
      });
    }
  }
// if(isTextChange){
//   props.isReRenderGraph(false);
//   setGraphReload(true);
//   setTimeout(() => {
//       props.isReRenderGraph(true);
//   })
// }
  console.log(currentGraphPage, "item.layoutitem.layout");
  currentGraphPage.isSaved = false;
  addNewGraphState(currentGraphPage, props, false, true);
  props.updateGraphProperty({ upGrPg: currentGraphPage });
};

export const deleteGraphPlot = (currPlot: any, props: any, isGrPg?: any) => {
  console.log(props);
  let currentGraphPage: any;
  if (isGrPg) {
    currentGraphPage = { ...props.allGraphPages[currPlot.graphPageId] };
  } else {
    currentGraphPage = {
      ...props.notebooks.allGraphPages.byId[currPlot.graphPageId],
    };
  }

  const currentGraph = currentGraphPage.graphList.filter(
    (item: any) => item.id === currPlot.graphId
  )[0];
  console.log(currentGraph);
  currentGraph.plotData = currentGraph.plotData.filter(
    (item: any) => item.id !== currPlot.id
  );

  currentGraphPage.graphList = currentGraphPage.graphList.map((grp: any) => {
    if (grp.id !== currentGraph.id) return grp;
    else return currentGraph;
  });
  currentGraphPage.isSaved = false;
  addNewGraphState(currentGraphPage, props, false, true);
  props.updateGraphProperty({ upGrPg: currentGraphPage });
};

export const updateGraphPlot = (currPlot: any, props: any, action) => {
  if (action === 'new') {
    currPlot.properties = getPlotProperties(
      currPlot.graphType,
      currPlot.subGraphType
    );
  }
  const currentGraphPage = { ...props.allGraphPages[currPlot.graphPageId] };
  //console.log(currentGraphPage)
  const currentGraph = currentGraphPage.graphList.filter(
    (item: any) => item.id === currPlot.graphId
  )[0];
  //console.log(currentGraph)
  currentGraph.plotData = currentGraph.plotData.map((item: any) => {
    if (item.id !== currPlot.id) return item;
    else return currPlot;
  });

  currentGraphPage.graphList = currentGraphPage.graphList.map((grp: any) => {
    if (grp.id !== currentGraph.id) return grp;
    else return currentGraph;
  });
  currentGraphPage.isSaved = false;
  addNewGraphState(currentGraphPage, props, false, true);
  props.updateGraphProperty({ upGrPg: currentGraphPage });
};

export const buildPlotData = (
  graphPageId: string,
  graphDataObject: any,
  props
) => {
  console.log(graphDataObject, 'graph Data oBject!!!!!');

  const currentGraphPage = props.notebooks.allGraphPages.byId[graphPageId];
  let currentGraph
  props.pageInstance.selectedItems.nodes?.map((nodeItem: any) => {
    currentGraphPage.graphList.filter((graphID: any) => {
      if (graphID.id === nodeItem.id) {
        currentGraph = graphID
        const SequenceId = currentGraph.plotLength + 1;
        currentGraph.plotLength = SequenceId;
        const plotObject = getDefaultPlotDataObject(
          `Plt${SequenceId}`,
          `Plot${SequenceId}`,
          graphDataObject.graphtype,
          graphDataObject.graphstyle,
          graphDataObject.dataformat,
          currentGraphPage.worksheetId,
          currentGraph.id,
          graphPageId
        );
        plotObject.properties = getPlotProperties(
          graphDataObject.graphtype,
          graphDataObject.graphstyle
        );
        plotObject.data = graphDataObject.result;
        // plotObject.properties.xais = "x"
        addNewPlot(plotObject, props)
      }
    });
  });
}

//add new plot

export const addNewPlot = (currPlot: any, props: any) => {
  // if(action === "new"){
  //   currPlot.properties =  getPlotProperties(currPlot.graphType, currPlot.subGraphType);
  // }
  console.log("currentGraph", props.notebooks.allGraphPages)
  console.log("currentprops", props)
  console.log("currentplot", currPlot)

  const currentGraphPage = { ...props.notebooks.allGraphPages.byId[currPlot.graphPageId] };
  console.log(currentGraphPage)
  const currentGraph = currentGraphPage.graphList.filter((item: any) => item.id === currPlot.graphId)[0];
  console.log("currentGraph", currentGraph)
  currentGraph.plotData.push(currPlot);
  currentGraphPage.graphList = currentGraphPage.graphList.map((grp: any) => {
    if (grp.id !== currentGraph.id) return grp;
    else return currentGraph;
  });
  currentGraphPage.isSaved = false;
  addNewGraphState(currentGraphPage, props, false, true);
  props.updateGraphProperty({ upGrPg: currentGraphPage });
};


export const addNewAxis = (currPlot: any, props: any, side: any, axis: any) => {
  // if(action === "new"){   
  //   currPlot.properties =  getPlotProperties(currPlot.graphType, currPlot.subGraphType);
  // }
  console.log("props", props)
  console.log("side", side)
  console.log("axis", axis)

  const currentGraphPage = { ...props.notebooks.allGraphPages.byId[currPlot.graphPageId] };
  console.log(currentGraphPage)
  const currentGraph = currentGraphPage.graphList.filter((item: any) => item.id === currPlot.graphId)[0];
  console.log("currentGraph", currentGraph)
  if (axis == "xaxis") {
    let Xaxis = get2dAdditionalXAxis()
    Xaxis.xaxis2.side = side
    currentGraph.layout.xaxis2 = Xaxis.xaxis2
  }
  else if (axis == "yaxis") {
    let Yaxis = get2dAdditionalYAxis()
    Yaxis.yaxis2.side = side
    currentGraph.layout.yaxis2 = Yaxis.yaxis2
  }
  currentGraph.plotData = currentGraph.plotData.map((plot) => {
    if (plot.id == currPlot.id) {
      if (axis == "yaxis") {
        plot.properties.yaxis = 'y2'
      }
      else if (axis == "xaxis") {
        plot.properties.xaxis = 'x2'
      }
    }
    return plot
  })
  currentGraphPage.graphList = currentGraphPage.graphList.map((grp: any) => {
    if (grp.id !== currentGraph.id)
      return grp;
    else
      return currentGraph
  });
  currentGraphPage.isSaved = false;
  addNewGraphState(currentGraphPage, props, false, true);
  props.updateGraphProperty({ upGrPg: currentGraphPage })
}

//Modify plot

export const modifyPlotData = (currPlotData, graphDataObject: any, props) => {
  const currentGraphPage = {
    ...props.notebooks.allGraphPages.byId[currPlotData.graphPageId],
  };
  console.log(currPlotData);
  const currentGraph = currentGraphPage.graphList.filter(
    (item: any) => item.id === currPlotData.graphId
  )[0];
  currentGraph.plotData = currentGraph.plotData.map((plot) => {
    if (plot.id == currPlotData.id) {
      let properties = getPlotProperties(graphDataObject.graphtype, graphDataObject.graphstyle);

      return {
        ...plot,
        format: graphDataObject.dataformat,
        graphType: graphDataObject.graphtype,
        subGraphType: graphDataObject.graphstyle,
        data: graphDataObject.result,
        properties: properties
      }
    }
    else {
      return plot
    }
  });
  currentGraphPage.graphList = currentGraphPage.graphList.map((grp: any) => {
    if (grp.id !== currentGraph.id) return grp;
    else return currentGraph;
  });

  console.log("currentGraphPage", currentGraphPage)
  currentGraphPage.isSaved = false;
  addNewGraphState(currentGraphPage, props, false, true);
  props.updateGraphProperty({ upGrPg: currentGraphPage })
  // const currentGraph = currentGraphPage.graphList.filter((item:any) => item.id === currPlotData.graphId)[0];
  // console.log(currentGraph.plotData)
  // console.log(graphDataObject)
};

export const addGraphTotheExistingPage = (
  graphPage: any,
  graphObj: any,
  props: any,
  isAlreadyGraphExists
) => {
  let currentGraphPage = JSON.parse(JSON.stringify(graphPage));
  console.log(graphobject, 'graphObject');
  let graphobject = createGraph(
    graphPage.worksheetId,
    currentGraphPage,
    graphObj,
    props.defaultOption
  );
  currentGraphPage.graphList.push(graphobject);
  currentGraphPage.graphLength += 1;
  const openedWorksheet = props.openWorksheets.filter(
    (data) => currentGraphPage.worksheetId === data.key
  );
  const openGraph = {
    id: graphobject.id,
    worksheetId: currentGraphPage.worksheetId,
    wrkClient: openedWorksheet[0].client,
  };
  props.storeGraph(openGraph);
  currentGraphPage.isSaved = false;
  addNewGraphState(currentGraphPage, props, false, true);
  props.updateGraphProperty({ upGrPg: currentGraphPage });
};

export const cloneTheGraph = (
  worksheetId: string,
  graphPage: any,
  currentGraphObj: any
) => {
  const graphLength = graphPage.graphLength + 1;
  const graphObject = getDefaultGraphObject(
    `Gr${graphLength}`,
    `Graph${graphLength}`,
    worksheetId,
    graphPage.id
  );
  console.log(currentGraphObj);
  graphObject.layout = JSON.parse(JSON.stringify(currentGraphObj.layout));
  // getLayoutByGraphType(graphObj.graphType, graphObj.subGraphType);
  // let plotObject
  // const SequenceId = graphObject.plotLength + 1;
  currentGraphObj.plotData.map((plotData, index) => {
    const plotObject = getDefaultPlotDataObject(
      `Plt${index + 1}`,
      `Plot${index + 1}`,
      plotData.graphType,
      plotData.subGraphType,
      plotData.format,
      worksheetId,
      graphObject.id,
      graphPage.Id
    );
    graphObject.plotLength = index + 1;
    plotObject.properties = JSON.parse(
      JSON.stringify(currentGraphObj.plotData[0].properties)
    );
    // getPlotProperties(currentGraphObj.graphType, currentGraphObj.subGraphType);
    plotObject.data = plotData.data;
    graphObject.plotData.push(plotObject);
    graphObject.allPlotDataId.push(plotObject.id);
  });
  return graphObject;
};

export const pasteGraphTotheExisting = (
  graphPage: any,
  graphObjArray: any,
  props: any,
  fromContext: boolean
) => {
  let currentGraphPage = JSON.parse(JSON.stringify(graphPage));
  console.log(currentGraphPage, 'pageobject', graphObjArray);
  let graphobject
  graphObjArray.map((graphObj) => {
    if (!fromContext) {
      graphobject = cloneTheGraph(
        graphPage.worksheetId,
        currentGraphPage,
        graphObj
      );
    } else {
      graphobject = graphObjArray
    }

    currentGraphPage.graphList.push(graphobject);
    currentGraphPage.graphLength += 1;

    if (graphPage.worksheetId) {
      const openedWorksheet = props.openWorksheets.filter(
        (data) => currentGraphPage.worksheetId === data.key
      );
      const openGraph = {
        id: graphobject.id,
        worksheetId: currentGraphPage.worksheetId,
        wrkClient: openedWorksheet[0].client,
      };
      props.actions.storeGraph(openGraph);
    }
  });
  // console.log(graphobject, "currentGraphPage", currentGraphPage)

  console.log(currentGraphPage, 'currentGraphPage---->');
  currentGraphPage.isSaved = false;
  addNewGraphState(currentGraphPage, props, false, true);
  props.updateGraphProperty({ upGrPg: currentGraphPage });
};

export const getDefaultOptions = (
  properties: any,
  defaultOption: any,
  graphData: any
) => {
  console.log(properties, graphData);
  let defSymbol = defaultOption.optionsCollection.Graph.Symbols;
  let defLines = defaultOption.optionsCollection.Graph.lines;
  let defFills = defaultOption.optionsCollection.Graph.fills;
  const unit = defaultOption.optionsCollection.GraphPage.defaultUnit;

  properties.marker.symbol = defSymbol.single.symbol
  properties.marker.color = defSymbol.single.fillcolor
  properties.marker.size = convert_To_Pixel(unit, +defSymbol.size);

  if (properties.type != 'choropleth') {
    properties.line.color = defLines.single.color
    properties.line.dash = defLines.single.linetype
    properties.line.width = convert_To_Pixel(unit, +defLines.thickness);
  }


  if ((graphData.hasOwnProperty("x") && graphData['x'].length > 1) || (graphData.hasOwnProperty("y") && graphData['y'].length > 1)
    || (graphData.hasOwnProperty("z") && graphData['z'].length > 1) || (graphData.hasOwnProperty("r") && graphData['r'].length > 1)
    || (graphData.hasOwnProperty("theta") && graphData['theta'].length > 1)) {
    properties.marker.symbol = defSymbol.multiple.symbol
    properties.marker.color = defSymbol.multiple.fillcolor
    if (properties.type != 'choropleth') {
      properties.line.color = defLines.multiple.color
      properties.line.dash = defLines.multiple.linetype
    }

  }

  if (properties.type == 'bar') {
    properties.marker.color = defFills.singleSeries
    properties.width = defFills.barThickness //convert_To_Pixel(unit, +defFills.barThickness);//(+defFills.barThickness)
    properties.barWidth = defFills.barThickness // convert_To_Pixel(unit, +defFills.barThickness);//(+defFills.barThickness)

    if ((graphData.hasOwnProperty("x") && graphData['x'].length > 1) || (graphData.hasOwnProperty("y") && graphData['y'].length > 1)) {
      properties.marker.color = defFills.multipleGroups
    }
  }

  if (properties.type == 'pie') {
    properties.marker.color = 'Rainbow'
  }

  if (properties.type === 'area') {
    properties.marker.symbol = 'none'
  }

  if(properties.mode == 'markers'){
    if(properties.line && properties.line.dash){
      properties.line.dash= 'none'
    }
  }
  else if (properties.mode == 'lines') {
    if (properties.marker && properties.marker.symbol) {
      properties.marker.symbol = 'none'
    }
  }

  return properties;
};


export const getDefaultLayoutOptions = (layout: any, defaultOption: any, graphData: any) => {

  let defSizeAndPosition = defaultOption.optionsCollection.Graph.sizeAndPosition;
  let defFont = defaultOption.optionsCollection.Graph.font;
  const unit = defaultOption.optionsCollection.GraphPage.defaultUnit;

  layout.width = convert_To_Pixel(unit, +defSizeAndPosition.width);
  layout.height = convert_To_Pixel(unit, +defSizeAndPosition.height);

  // layout.title.font.family = defFont;
  // layout.legend.font.family = defFont;
  // layout.legend.title.font.family = defFont;
//   layout.modebar_add = ['drawline',
//   'drawopenpath',
//   'drawclosedpath',
//   'drawcircle',
//   'drawrect',
//   'eraseshape'
//  ]

  let newLayout = JSON.stringify(layout).replaceAll('Times New Roman', defFont)
  newLayout = JSON.parse(newLayout)
  return newLayout
}

export const modifyColorScale = (properties: any, maxLeng: number, mainProp?: any, gridData?: any) => {

  if (properties.marker.colorscale !== 'none') {
    if (typeof properties.marker.colorscale === 'number') {
      let isentirerange = Object.values(properties.data)[0].isentirerange
      properties.marker.color = getgraphicCellFromGrid(gridData[properties.marker.colorscale], 'color', isentirerange)
    }
    else {
      console.log(properties.marker.color)
      console.log(!Array.isArray(properties.marker.color), Array.isArray(properties.marker.color), properties.marker.color.length !== maxLeng)
      let schemeArray = colorScheme[properties.marker.colorscale]
      properties.marker.color = Array.from({ length: Math.floor(maxLeng / (schemeArray.length)) }, () => schemeArray).flat();
      if (maxLeng % (schemeArray.length)) {
        console.log("rey", ...schemeArray.slice(0, maxLeng % (schemeArray.length) + 1))
        properties.marker.color.push(...schemeArray.slice(0, maxLeng % (schemeArray.length)))
      }
      console.log("rey", schemeArray, properties.marker.color)
      // if (!Array.isArray(properties.marker.color) || (Array.isArray(properties.marker.color) && properties.marker.color.length !== maxLeng)) {
      //   properties.marker.color = Array.from({ length: maxLeng }, (_, i) => i + 1)
      //   mainProp.marker.color = properties.marker.color
      // }
    }
  }

  if (properties.marker.line.colorscale !== 'none') {
    if (typeof properties.marker.line.colorscale === 'number') {
      let isentirerange = Object.values(properties.data)[0].isentirerange
      properties.marker.line.color = getgraphicCellFromGrid(gridData[properties.marker.line.colorscale], 'color', isentirerange)
    }
    else {
      let schemeArray = colorScheme[properties.marker.line.colorscale]
      properties.marker.line.color = Array.from({ length: Math.floor(maxLeng / (schemeArray.length)) }, () => schemeArray).flat();
      if (maxLeng % (schemeArray.length)) {
        console.log("rey", ...schemeArray.slice(0, maxLeng % (schemeArray.length) + 1))
        properties.marker.line.color.push(...schemeArray.slice(0, maxLeng % (schemeArray.length)))
      }
      console.log("rey...")
    }
  }

  if (properties.marker.symbol !== 'none') {
    if (typeof properties.marker.symbol === 'number') {
      let isentirerange = Object.values(properties.data)[0].isentirerange
      properties.marker.symbol = getgraphicCellFromGrid(gridData[properties.marker.symbol], 'shape', isentirerange)
    }
    else if (properties.marker.symbol == 'double' || properties.marker.symbol == 'mono' || properties.marker.symbol == 'dot-double') {
      let symbolArray = symbolSchemeType[properties.marker.symbol]
      properties.marker.symbol = Array.from({ length: Math.floor(maxLeng / (symbolArray.length)) }, () => symbolArray).flat();
      if (maxLeng % (symbolArray.length)) {
        properties.marker.symbol.push(...symbolArray.slice(0, maxLeng % (symbolArray.length)))
      }

    }
  }

  return properties
}

export const modifyLineColorScheme = (allPlots: any, plotProperties: any, gridData?: any) => {

  if (typeof plotProperties.line.colorscheme == 'number' || typeof plotProperties.line.dash == 'number' ||
    typeof plotProperties.fillColorScheme == 'number') {

    let isentirerange = Object.values(plotProperties.data)[0].isentirerange
    let schemeArray = getgraphicCellFromGrid(gridData[plotProperties.line.colorscheme], 'color', isentirerange)
    let areaschemeArray = getgraphicCellFromGrid(gridData[plotProperties.fillColorScheme], 'color', isentirerange)
    let dashArray = getgraphicCellFromGrid(gridData[plotProperties.line.dash], 'line', isentirerange)
    let clrindex = 0
    let dashindex = 0
    let areaindex = 0
    allPlots = allPlots.map(plt => {
      if (typeof plotProperties.line.colorscheme == 'number') {
        if (clrindex == schemeArray.length) {
          clrindex = 0;
        }
        plt.line.color = schemeArray[clrindex]
        clrindex++
      }

      if (typeof plotProperties.line.dash == 'number') {
        if (dashindex == dashArray.length) {
          dashindex = 0;
        }
        plt.line.dash = dashArray[dashindex]
        dashindex++
      }

      if (typeof plotProperties.fillColorScheme == 'number') {
        if (areaindex == areaschemeArray.length) {
          areaindex = 0;
        }
        plt.fillcolor = areaschemeArray[areaindex]
        areaindex++
      }

      return plt
    })


  }

  else if (plotProperties.line.colorscheme !== 'none' || plotProperties.line.dash === 'mono' || plotProperties.line.dash === 'incr'
    || typeof plotProperties.fillColorScheme !== 'none') {

    let schemeArray = colorScheme[plotProperties.line.colorscheme]
    let areaschemeArray = colorScheme[plotProperties.fillColorScheme]
    let dashArray = lineSchemeType[plotProperties.line.dash]
    let clrindex = 0
    let dashindex = 0
    let areaindex = 0
    allPlots = allPlots.map(plt => {
      if (plotProperties.line.colorscheme !== 'none') {
        if (clrindex == schemeArray.length) {
          clrindex = 0;
        }
        plt.line.color = schemeArray[clrindex]
        clrindex++
      }

      if (plotProperties.line.dash === 'mono' || plotProperties.line.dash === 'incr') {
        if (dashindex == dashArray.length) {
          dashindex = 0;
        }
        plt.line.dash = dashArray[dashindex]
        dashindex++
      }

      if (plotProperties.fillColorScheme != 'none') {
        if (areaindex == areaschemeArray.length) {
          areaindex = 0;
        }
        plt.fillcolor = areaschemeArray[areaindex]
        areaindex++
      }

      return plt
    })
  }

  return allPlots
}

export const modifySymbol = (allPlots: any, plotProperties: any, gridData?: any) => {

  let symbolArray = symbolSchemeType[plotProperties.marker.symbol]
  let symbolindex = 0

  return allPlots.map((plot) => {
    if (plot.marker && plot.marker.colorscale !== 'none') {
      if (typeof plot.marker.colorscale === 'number') {
        let isentirerange = Object.values(plot.data)[0].isentirerange
        plot.marker.color = getgraphicCellFromGrid(gridData[plot.marker.colorscale], 'color', isentirerange)
      }
    }
    if (plot.marker && typeof plot.marker.line.colorscale === 'number') {
      let isentirerange = Object.values(plot.data)[0].isentirerange
      plot.marker.line.color = getgraphicCellFromGrid(gridData[plot.marker.line.colorscale], 'color', isentirerange)
    }

    if (plotProperties.marker.symbol == 'double' || plotProperties.marker.symbol == 'mono' || plotProperties.marker.symbol == 'dot-double') {
      if (symbolindex == symbolArray.length) {
        symbolindex = 0;
      }
      plot.marker.symbol = symbolArray[symbolindex]
      symbolindex++
    }

    return plot
  })

}

export const deleteTheElementsFromPage = (currentGraphPage: any, props: any, elements: any, elementType: any, isOnlyGraph?: any) => {
  let graphsList
  let allNodes
  let allConnectors

  console.log(elements, "inside delete", currentGraphPage)
  let selectedCopiedItem = { graphItems: [], nodeItems: [], connectorItems: [], graphPageId: '' }
  let activeGraphId = props.allActiveItem.graphPage.id;
  // let isContextMenu = true
  if (elementType == 'node') {
    elements.map((item) => {
      console.log("hielss")
      if (item.shape?.type == 'HTML') {
        console.log("hielss")
        currentGraphPage.graphList = currentGraphPage.graphList.filter((graphItem) => {

          if (isOnlyGraph) {
            console.log("inside graph", item)
            if (graphItem.id == item.id) {
              console.log("inside graph1")
              selectedCopiedItem.graphItems.push(graphItem)
              selectedCopiedItem.graphPageId = activeGraphId
            }
          }
          return graphItem.id !== item.id
        })
        currentGraphPage.allNodesList = currentGraphPage.allNodesList.filter((nodeItem) => {
          if (isOnlyGraph) {
            console.log("inside node")
            if (nodeItem.id == item.id) {
              selectedCopiedItem.nodeItems.push(nodeItem)
              selectedCopiedItem.graphPageId = activeGraphId
            }
          }
          return nodeItem.id !== item.id
        })
      } else {
        currentGraphPage.allNodesList = currentGraphPage.allNodesList.filter((nodeItem) => {
          if (isOnlyGraph) {
            if (nodeItem.id == item.id) {
              console.log("inside only node")
              selectedCopiedItem.nodeItems.push(nodeItem)
              selectedCopiedItem.graphPageId = activeGraphId
            }
          }
          return nodeItem.id !== item.id
        })
      }
    })
  }
  if (elementType == 'connector') {
    elements.map((item) => {
      currentGraphPage.allConnectorsList = currentGraphPage.allConnectorsList.filter((nodeItem) => {
        if (isOnlyGraph) {
          if (nodeItem.id == item.id) {
            console.log("inside connector")
            selectedCopiedItem.connectorItems.push(nodeItem)
            selectedCopiedItem.graphPageId = activeGraphId
          }
        }
        return nodeItem.id !== item.id
      })
    })
  }
  console.log(currentGraphPage, "graps", selectedCopiedItem)
  props.setSelectedElements(selectedCopiedItem)
  currentGraphPage.isSaved = false;
  props.isReRenderGraph(false);
  setGraphReload(true);
  setTimeout(() => {
    props.isReRenderGraph(true);
  })
  addNewGraphState(currentGraphPage, props, false, true);
  props.updateGraphProperty({ upGrPg: currentGraphPage });
  console.log(props, "hellloooo-----atlast")
}

const getRandomLetters = (length = 1) =>
  Array(length)
    .fill()
    .map((e) => String.fromCharCode(Math.floor(Math.random() * 26) + 65))
    .join('');
const getRandomDigits = (length = 1) =>
  Array(length)
    .fill()
    .map((e) => Math.floor(Math.random() * 10))
    .join('');
const generateUniqueID = () => {
  let id = getRandomLetters(2) + getRandomDigits(4);
  return id;
};

export const pasteTheElement = (itemToCheck, props, itemType, graphPageID) => {
  let currentGraphPage =
    props.notebooks.allGraphPages.byId[props.allActiveItem.graphPage.id];
  let copiedGraphPage =
    props.notebooks.allGraphPages.byId[graphPageID];
  if (itemToCheck) {
    if (copiedGraphPage) {
      if (itemType == 'connector') {
        itemToCheck.map((item, index) => {
          item.id = item.id + index + generateUniqueID();
          item.offsetX = item.offsetX + index * 100 + getRandomDigits(3);
          item.offsetY = item.offsetY + index * 100 + getRandomDigits(6);
          props.pageInstance.addConnector(item);
        });
      }
      if (itemType == 'node') {
        itemToCheck.map((item, index) => {
          item.id = item.id + index;
          item.offsetX = item.offsetX + index * 100;
          item.offsetY = item.offsetY + index * 100;
          props.pageInstance.addNode(item);
        });
      }
      if (itemType == 'graph') {
        console.log(itemToCheck, "itemToCheck")
        pasteGraphTotheExisting(currentGraphPage, itemToCheck, props, true);
      }
    }
  }
}


export const copiedFuncionality = (props) => {
  let valuereturnd = props.pageInstance.copy();
  let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
  console.log(valuereturnd, 'valuereturnd');
  let nodeIds = [];
  let connectorIds = [];
  let graphIds = [];
  let nodeEle;
  valuereturnd.map((element) => {
    if (element.type) {
      connectorIds.push(element);
    } else {
      element.shape.type === 'HTML'
        ? graphIds.push(element)
        : nodeIds.push(element);
    }
  });

  props.actions.setCopiedEleID({
    nodeIDs: nodeIds,
    connectorIDs: connectorIds,
    graphIDs: graphIds,
    graphPageID: activeGraphId,
  });
};

export const pasteItems = (props) => {

  let currentGraphPage =
    props.notebooks.allGraphPages.byId[props.allActiveItem.graphPage.id];
  let copiedGraphPage =
    props.notebooks.allGraphPages.byId[props.copiedElementIDS.graphPageID];
  console.log(
    currentGraphPage,
    'currentGraphPage',
    copiedGraphPage,
    props.copiedElementIDS
  );
  let copiedGraphObj = [];
  if (props.copiedElementIDS) {
    if (copiedGraphPage) {
      props.copiedElementIDS.nodeIDs.map((item, index) => {
        item.id = item.id + index;
        item.offsetX = item.offsetX + index * 100;
        item.offsetY = item.offsetY + index * 100;
        props.pageInstance.addNode(item);
      });
      props.copiedElementIDS.graphIDs.map((item, index) => {
        copiedGraphPage.graphList.filter((graphItem) => {
          console.log('in graph paste');
          let id = graphItem.id.split('-')[0] + '-';
          let graphId = item.id.split('-')[0] + '-';
          if (id === graphId) {
            copiedGraphObj.push(graphItem);
          }
        });
        // let worksheetId = currentGraphPage.worksheetId;
        console.log(currentGraphPage, 'curreent');
        // item.id = item.id;
        // item.offsetX = item.offsetX + index;
        // item.offsetY = item.offsetY + index;
      });
      console.log(copiedGraphObj, 'copiedGraphObj');
      props.copiedElementIDS.connectorIDs.map((item, index) => {
        item.id = item.id + index + generateUniqueID();
        item.offsetX = item.offsetX + index * 100 + getRandomDigits(3);
        item.offsetY = item.offsetY + index * 100 + getRandomDigits(6);
        props.pageInstance.addConnector(item);
      });
      //     currentGraphPage.isSaved = false;
      // props.isReRenderGraph(false);
      // setGraphReload(true);
      // setTimeout(() => {
      //     props.isReRenderGraph(true);
      // })
      pasteGraphTotheExisting(currentGraphPage, copiedGraphObj, props);
    }
  } else {
    let itemToCheck
    let itemType
    if (props.selectedCopiedItems.connectorItems.length > 0) {
      itemToCheck = props.selectedCopiedItems.connectorItems
      itemType = 'connector'
    } else if (props.selectedCopiedItems.nodes.length > 0) {
      itemToCheck = props.selectedCopiedItems.nodes
      itemType = 'node'
    } else {
      itemToCheck = props.selectedCopiedItems.graphItems
      itemType = 'graph'
    }
    pasteTheElement(itemToCheck, props, itemType, props.selectedCopiedItems.graphPageId)
  }
};
