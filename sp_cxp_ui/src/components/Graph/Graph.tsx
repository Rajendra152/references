import React, { useState, useEffect, useRef, useMemo } from 'react';
import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js-cartesian-dist'

import { getDataSetByKey } from '../../services/RedisServices';

import {
  buildGraphObject,
  createSubscription,
  doUnscbscribe,
  getPlotProperties,
  getPlotData,
} from '../../services/GraphServicesNew';

import { getDataFromWorksheet } from "../../services/graphPageServices/GraphServices";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeGraph } from '../../store/Worksheet/WorksheetOperation/actions';
import { getLayoutByGraphType } from '../../services/graphPageServices/allGraphType/GetLayoutOnGraphType';

import GraphPropertyDialog from '../Graph/GraphProperty/GraphPropertyDialog';
import * as graphPropertyAction from '../../store//GraphProperty/GraphProperty/actions';
import { transposeRowsToColumns } from '../../services/graphPageServices/GraphServices'
import { getGraphReload, setGraphReload } from '../../services/UndoRedoServices';
import  FillPattern  from '../Graph/FillPattern';
import  FillGradient  from '../Graph/FillGradient';

const Graph = (graphProps:any) => {
  console.log(graphProps);
  const [plotTraces, setPlotTraces] = useState([]);
  console.log(graphProps.graphItem.layout,"graphProps.graphItem.layout")
  const [layout, setLayout] = useState(graphProps.graphItem.layout)
  const columns = layout.legend.columns ?? 1;
  const  xaxis = layout.droplines?.xaxis;
  const yaxis = layout.droplines?.yaxis

  const mainMappings = useRef([])

  const legendGroupMappings = useMemo(() => {
    const legendGroups = [];
    let count = 0;
    for (let i = 0; i < plotTraces.length; i++) {
      legendGroups.push(count++);
      if (count === columns) count = 0;
    }
    return legendGroups;
  }, [columns, plotTraces.length]);

  useEffect(async () => {

    const openedGraph = graphProps.openGraphs.filter(gr =>gr.id===graphProps.graphItem.id)
    if(openedGraph.length > 0) {
      let gridData = await getDataSetByKey(graphProps.graphItem.activeWorksheet,  openedGraph[0].wrkClient);

console.log(gridData,openedGraph, "gridData==>")
if(graphProps.graphItem.isResultGraphPage){
  gridData = gridData[0].sheetdata
  if(!graphProps.graphItem.isHistogram){
    gridData = transposeRowsToColumns(gridData);
  } 
  else if(graphProps.graphItem.isHistogram){
    gridData = transposeRowsToColumns(gridData);

  }
}
      gridData = transposeRowsToColumns(gridData);
        let allTraces = [];
        if (!openedGraph.length) {
    
        }
        else {
          console.log(graphProps.graphItem.plotData,"Graph Props!!!!",graphProps.graphItem)
          for(const plotData of graphProps.graphItem.plotData){
    
            console.log(plotData,"Plotdata!!!!!!!!")
            if(plotData.isChecked){
              allTraces.push(...await getDataFromWorksheet(plotData.activeWorksheet, openedGraph[0].wrkClient, plotData, graphProps.graphItem.layout, gridData))
            }
            
           }
    
        }
        // Reference Line code Starts From here-------!!!!

      //   if(graphProps.graphItem.plotData[0].properties.type=='scatter'){
      //     var plotData = graphProps.graphItem.plotData[0];
      // var color: any = plotData.properties.refLine.color;
      // var style: any = plotData.properties.refLine.dash;
      // var width: number = plotData.properties.refLine.width;
      // var spec: number = plotData.properties.refLine.axis;
      // var gapColor: any = plotData.properties.refLine.gapColor;
      // var direction : any = plotData.properties.refLine.direction;

      // if (plotData.properties.refLine.flag == true && plotData.properties.refLine.dash != 'solid') {
      //   var gapLine: any = {
      //     x: direction == 'x-hor' ? graphProps.graphItem.layout.xaxis.range : [spec, spec],
      //     y: direction == 'x-hor' ? [spec, spec] : graphProps.graphItem.layout.yaxis.range,
      //     mode: 'lines',
      //     textposition: 'bottom',
      //     showlegend: false,
      //     type: 'scatter',
      //     line: {
      //       color: gapColor,
      //       width: width,
      //       dash: 'solid',
      //     }
      //   };
      //   if (plotData.properties.refLine.layer == 'behind') {
      //     allTraces.unshift(gapLine);
      //   } else {
      //     allTraces.push(gapLine);
      //   }
      // }

      // if (plotData.properties.refLine.specification == "upperspec") {
      //   var trace3: any = {
      //     x: direction == 'x-hor' ? graphProps.graphItem.layout.xaxis.range : [spec, spec],
      //     y: direction == 'x-hor' ? [spec, spec] : graphProps.graphItem.layout.xaxis.range,
      //     mode: 'lines',
      //     name: 'Upper Specification',
      //     textposition: 'Upper',
      //     type: 'scatter',
      //     line: {
      //       color: color,
      //       width: width,
      //       dash: style,
      //       layer: 'below'
      //     }
      //   };
      //   if (plotData.properties.refLine.layer == 'behind' && plotData.properties.refLine.dash == 'solid') {
      //     allTraces.splice(0, 0, trace3);
      //   } else if (plotData.properties.refLine.layer == 'behind' && plotData.properties.refLine.dash != 'solid') {
      //     allTraces.splice(1, 0, trace3);
      //   } else {
      //     allTraces.push(trace3);
      //   }

      // } else if (plotData.properties.refLine.specification == "lowerspec") {
      //   var trace3: any = {
      //     x: direction == 'x-hor' ? graphProps.graphItem.layout.xaxis.range : [spec, spec],
      //     y: direction == 'x-hor' ? [spec, spec] : graphProps.graphItem.layout.yaxis.range,
      //     mode: 'lines',
      //     name: 'Lower Specification',
      //     textposition: 'upper',
      //     type: 'scatter',
      //     line: {
      //       color: color,
      //       width: width,
      //       dash: style,
      //       layer: 'below'
      //     }
      //   };
      //   if (plotData.properties.refLine.layer == 'behind') {
      //     allTraces.unshift(trace3);
      //   } else {
      //     allTraces.push(trace3);
      //   }
      // } else if (plotData.properties.refLine.specification == "upperctrl") {
      //   var trace3: any = {
      //     x: direction == 'x-hor' ? graphProps.graphItem.layout.xaxis.range : [spec, spec],
      //     y: direction == 'x-hor' ? [spec, spec] : graphProps.graphItem.layout.yaxis.range,
      //     mode: 'lines',
      //     textposition: 'upper',
      //     type: 'scatter',
      //     line: {
      //       color: color,
      //       width: width,
      //       dash: style,
      //     }
      //   };
      //   if (plotData.properties.refLine.layer == 'behind') {
      //     allTraces.unshift(trace3);
      //   } else {
      //     allTraces.push(trace3);
      //   }
      // } else if (plotData.properties.refLine.specification == "mean") {
      //   var trace3: any = {
      //     x: direction == 'x-hor' ? graphProps.graphItem.layout.xaxis.range : [spec, spec],
      //     y: direction == 'x-hor' ? [spec, spec] : graphProps.graphItem.layout.yaxis.range,
      //     mode: 'lines',
      //     name: 'Mean',
      //     textposition: 'upper',
      //     type: 'scatter',
      //     line: {
      //       color: color,
      //       dash: style,
      //       width: width
      //     }
      //   };
      //   if (plotData.properties.refLine.layer == 'behind' && plotData.properties.refLine.dash == 'solid') {
      //     allTraces.splice(0, 0, trace3);
      //   } else if (plotData.properties.refLine.layer == 'behind' && plotData.properties.refLine.dash != 'solid') {
      //     allTraces.splice(1, 0, trace3);
      //   } else {
      //     allTraces.push(trace3);
      //   }
      // } else if (plotData.properties.refLine.specification == "lowerctrl") {
      //   var trace3: any = {
      //     x: direction == 'x-hor' ? graphProps.graphItem.layout.xaxis.range : [spec, spec],
      //     y: direction == 'x-hor' ? [spec, spec] : graphProps.graphItem.layout.yaxis.range,
      //     mode: 'lines',
      //     name: 'Lower Control Line',
      //     textposition: 'bottom',
      //     type: 'scatter',
      //     line: {
      //       color: color,
      //       width: width,
      //       dash: style,
      //     }
      //   };
      //   if (plotData.properties.refLine.layer == 'behind') {
      //     allTraces.unshift(trace3);
      //   } else {
      //     allTraces.push(trace3);
      //   }
      // }
      //   } 

      // Reference Line code Ends From here-------!!!!
       setPlotTraces(allTraces);
      setLayout(graphProps.graphItem.layout)
    }
    

  }, [graphProps.notebooks]);

  useEffect(()=>{
    if(!getGraphReload()) {
      graphProps.actions.graphPropertyAction.isOpenGraphProperty(
        {isOpen: false, graphId : graphProps.graphItem.id})
    } else {
      setTimeout(() => {
          setGraphReload(false);
      }, 200)
    }
  },[])
  let tempPlotData = graphProps.graphItem.plotData
  let tempprops = tempPlotData[0].properties
  if(tempprops.type == 'scatterpolar'){
    layout.polar.angularaxis = {
      ...layout.polar.angularaxis,
      direction : tempPlotData[0].data.isClockWise? 'clockwise': 'counterclockwise',
      //thetaunit : tempPlotData[0].data.units
    }
  }

  const fontTransform = (text: string, fontAttr: FontAttr) => {
    if (fontAttr.underline) text = `<u>${text}</u>`;
    if (fontAttr.style === 'Bold') text = text.bold();
    else if (fontAttr.style === 'Italic') text = text.italics();
    else if (fontAttr.style === 'Bold Italic') text = '<em>' + text + '</em>';
    return text;
  };

   let allTraces = plotTraces.map((item: any, index) => {
    let traceName: string = item.name;
    // if (layout.legend.font.underline) traceName = '<u>' + traceName + '</u>';
    // if (layout.legend.font.style === 'Bold') traceName = traceName.bold();
    // else if (layout.legend.font.style === 'Italic')
    //   traceName = traceName.italics();
    // else if (layout.legend.font.style === 'Bold Italic')
    //   traceName = '<em>' + traceName + '</em>';
    if(item.type=='box'){
      if(item.outlierType==="percentile"){
        if(item?.x){
          if(item.x.length > 6){
            item.x = item.x.slice(0,6);
          }
        }
        if(item?.y){
          if(item.y.length > 6){
            item.y = item.y.slice(0,6);
          }
        }
      }      
    }
    return {
      ...item,
      name: fontTransform(traceName, layout.legend.font),
      legendgroup: `group${legendGroupMappings[index]}`,
    };
  });

  const droplineMappings = useMemo(() => {
    mainMappings.current = [];

    for (let data of allTraces) {
      const mappings = [];
      if(data.type== 'scatter'){
        const xDataLength = data?.x?.length;
        const yDataLength = data?.y?.length;
        const minLength = xDataLength < yDataLength ? xDataLength : yDataLength;
        for (let j = 0; j < minLength; j++) {
          mainMappings.current.push([data.x[j], data.y[j]]);
        }
      }
      
      // mainMappings.current.push(...mappings);
    }
    return mainMappings.current;
  }, [allTraces]);

  const xDroplines = useMemo<any[]>(
    () =>
      xaxis?.visible
        ? droplineMappings.map((item) => ({
            type: 'line',
            x0: 0,
            y0: item[1],
            x1: item[0],
            y1: item[1],
            layer: 'below',
            line: {
              width: xaxis.thickness,
              color: xaxis.color,
              dash: xaxis.type,
            },
          }))
        : [],
    [xaxis, droplineMappings]
  );

  const yDroplines = useMemo<any[]>(
    () =>
      yaxis?.visible
        ? droplineMappings.map((item) => ({
            type: 'line',
            x0: item[0],
            y0: 0,
            x1: item[0],
            y1: item[1],
            layer: 'below',
            line: {
              width: yaxis.thickness,
              color: yaxis.color,
              dash: yaxis.type,
            },
          }))
        : [],
    [yaxis, droplineMappings]
  );
  
  const grPgLayout = {
    ...layout,
    legend: {
      ...layout.legend,
      // orientation: 'h',
      // traceorder: columns === 1 ? 'normal' : 'grouped',
      // y:-0.3,
      // x:0,
      groupclick: 'toggleitem',
      title: {
        ...layout.legend.title,
        text: layout.legend?.title?.text
          ? fontTransform(
            layout.legend?.title?.text,
            layout.legend?.title?.font
            )
          : undefined,
      },
    },
    title: {
      ...layout.title,
      text: layout.title?.text
        ? fontTransform(
          layout.title?.text,
          layout.title?.font
        )
        : undefined,
    },
    xaxis: {
      ...layout.xaxis,
      title: {
        ...layout.xaxis?.title,
        text: layout.xaxis?.title?.text ? fontTransform(
          layout.xaxis?.title?.text,
          layout.xaxis?.title?.font
        ) : undefined,
      }
    },
    yaxis: {
      ...layout.yaxis,
      title: {
        ...layout.yaxis?.title,
        text: layout.yaxis?.title?.text ? fontTransform(
          layout.yaxis?.title?.text,
          layout.yaxis?.title?.font
        ) : undefined,
      }
    },
    shapes: [...xDroplines, ...yDroplines],
  };
  
  console.log(layout.legend.title.text)
  console.log("allTraces",allTraces)
  console.log("pglayout",grPgLayout)

  const grConfig = {displayModeBar:true, 
  'displaylogo': false,
  'responsive': true,
  'scrollZoom': true,
  edits:{legendPosition:true},
  'modeBarButtonsToRemove' : ['select','lasso2d','zoom3d', 'pan3d', 'orbitRotation', 'tableRotation', 'handleDrag3d', 'resetCameraDefault3d'
  , 'resetCameraLastSave3d', 
  'hoverClosest3d'],
}
  
  console.log(graphProps)
 
 
  return (
    <div
    onClick={()=>graphProps.actions.graphPropertyAction.isOpenGraphProperty({isOpen: false, graphId : graphProps.graphItem.id})}
    onDoubleClick={()=>graphProps.actions.graphPropertyAction.isOpenGraphProperty({isOpen: true, graphId : graphProps.graphItem.id})}>
      <div id='plot_div'>
      <Plot data={allTraces} layout={grPgLayout}  config = {grConfig} scrollZoom = {true} id= {graphProps.graphItem.id} />

      </div>
      <FillGradient />
      <FillPattern data={allTraces} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    openGraphs: state.worksheetOperationReducer.openGraphs,
    notebooks: state.notebookReducer.notebooks,
    graphPropertyState: state.graphPropertyReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      storeGraph: bindActionCreators(storeGraph, dispatch),
      storeGraphToSection: (graphobj) => {
        dispatch({ type: 'ADD_GRAPH_TO_SECTION', payload: graphobj })
      },
      graphPropertyAction: bindActionCreators(graphPropertyAction, dispatch),

    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Graph);

