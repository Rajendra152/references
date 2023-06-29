import React from 'react';
import * as Config from '../components/App/Config';
import { post } from './DataService';
import { getDataSet } from '../components/Redis/data';
import { getDataSetByKey, createNewClient, subscribToChannel, listenToChanges, unsubscribToChannel } from "../services/RedisServices";
import { getLayout, getProperties } from './../components/Graph/GraphProperties'
const data_scatter_regression = [
    [{
      y: [1,2,3],
      x: [4,5,6],
      type: 'scatter',
      mode: 'lines',
      // line: { shape : 'spline' , smoothing : 1.3},
      marker: {symbol : 'diamond-open',color: 'red'},
    }],
    {width: 600, height: 400, title: 'Scatter plot'}
  ]


export function getGraphData(key){
    return  getDataSet(key)
}

export async function  getRegressionData(){
  const columnData = {
    "data_format":0,
    "data_params":{​​​"key":"test34","type":"string"}​​​,
    "data_columns":{​​​"data1":"col1","data2":"col2"}​​​
  }
  // const data = await axios.post('http://127.0.0.1:8000/plot_regression/execute_regression', columnData).then(response=>{
  const data = await post(Config.getRegressionData, columnData).then(response=>{  
    console.log(response)
    const res_data = response.data
    const reg_key = res_data['result'].data_key
    const reg_data = getRegressionDataFromRedis(reg_key).then(res=>{
      const new_res = JSON.parse(res)
      const new_graph_data = []

      new_graph_data.push([{
        x: new_res.x,
        y: new_res.y,
      }])
      return new_graph_data
    })
    return reg_data
  })
  return data
}

export async function getRegressionDataFromRedis(key){
  const data = await getDataSet(key)
  return data
}

export const getGraphDataFormat = (graphObject, format: String) => {
    graphObject.format = format
    return graphObject
}

export const getGraphDataSource = () =>{
  const graphDataSource = {}

  return graphDataSource
}

export const getDefaultGraphObject = (graphType: String) =>{
  const graphObject = {id:'graph1',
        name : 'Graph1',
        type: 'graph',
        graphType:'',
        worksheet : '',
        format : 'XY',
        data : { x: [], y : []} }
  return graphObject;
}

//@Teja

const getDataFromGrid = (column)=>{
  return column
  .filter(item=>{
    return item.value != '' && item.value != undefined
  })
  .map(item=>{
    return item.value
  })
}

//@Teja

const transposeRowsToColumns = (grid)=>{
  const transposedData = grid[0].map((_,colIndex)=> grid.map(row => row[colIndex]));
  return transposedData
}

 export async function buildGraphObject(graphType : string, subGraphType: string, currentFormat: string,
    activeWorksheet, activeClient){

  // fetch data from redis with activeWorksheet

  let gridData = await getDataSetByKey(activeWorksheet, activeClient)
  gridData = transposeRowsToColumns(gridData)
  const graphObject = getDefaultGraphObject(graphType);
  graphObject.format = currentFormat;
  graphObject.worksheet = activeWorksheet;
  graphObject.graphType = graphType;
  graphObject.data.x = getDataFromGrid(gridData[1].slice(1))
  graphObject.data.y = getDataFromGrid(gridData[2].slice(1))

  return graphObject;
}


export function createSubscription(keyIdentifier, callbackfn, client?){
  if(!client){
    client = createNewClient();
  }

  const subscribe = subscribToChannel(client, keyIdentifier);
  listenToChanges(client, callbackfn)

  return {
    client: client,
    subscribe: subscribe
  }
}

export function doUnscbscribe(client, keyIdentifier, callbackfn){
  unsubscribToChannel(client, keyIdentifier, callbackfn)
}

/* Different Graph types */


export const scatter = {
  mode: 'markers',
  marker: { symbol: 'circle', color: 'red' },
};

export const line = {
  mode: 'lines',
  marker: { symbol: 'circle', color: 'red' },
};

export const lineScatter = {
  mode: 'lines+markers',
  marker: { symbol: 'circle', color: 'red' },
};

export const lineSpline = {
  mode: 'lines',
  marker: { symbol: 'circle', color: 'red' },
  line: { shape : 'spline' , smoothing : 1.3},
};

export const horizontalDotPlot = {
  mode: 'markers',
  marker: {
    color: 'rgba(156, 165, 196, 0.95)',
    line: {
      color: 'rgba(156, 165, 196, 1.0)',
      width: 1,
    },
    symbol: 'circle',
    size: 16,
  },
};


export const getPlotProperties = (graphType) => {
  switch (graphType) {
    case 'scatter':
      return { ...getProperties(), mode: 'markers'};
    case 'line':
      return { ...getProperties(), mode: 'lines'};
    case 'lineScatter':
      return { ...getProperties(), mode: 'lines+markers'};
    case 'lineSpline':
      return lineSpline;
    case 'horizontalDotPlot':
      return horizontalDotPlot;
    default:
      return scatter.mode;
  }
};




export const getPlotData = (graphType, data) =>{

  let X=data.x;
  let Y= data.y;

  let plotObj =  [];
  let noOfObj = X.length>Y.length ? X.length : Y.length;


  return {
    type: graphType,
    x: data.x,
    y: data.y,
  }
}

/* Different Graph types */


