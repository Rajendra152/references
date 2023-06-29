import React, { useEffect, useState } from 'react';

import Graph from '../Graph/Graph';

import { GraphPageProps } from "../../services/notebookManagerServices/NotebookManagerInterfaces";
import CreateDiagram from '../Graph/DigramComponent/CreateDiagram'
import { connect } from 'react-redux';
import GraphPropertyDialog from '../Graph/GraphProperty/GraphPropertyDialog';

import { bindActionCreators } from 'redux';

import * as graphPropertyAction from '../../store//GraphProperty/GraphProperty/actions';
const GraphPageCanvas = (grPageProps: GraphPageProps) => {

  const [graphvalues, setgraphvalues] = useState([])

  useEffect(()=>{
    return () => {
      grPageProps.actions.graphPropertyAction.isOpenGraphProperty({
        isOpen: false,
        graphId: grPageProps.graphPropertyState.isOpenGraphProperty.graphId,
      });
    }
  },[])

  // rendering list of graph object
  const renderMultipleGraphs = (graphList: Object[]) => {
    return (
      graphList.map(graphItem => {
        return renderGraph(graphItem)
      })
    )
  }


  // rendering single graph Object
  const renderGraph = (graphItem: Object) => {
    return (
      <svg width={graphItem.layout.width+'px'} height={graphItem.layout.height+'px'}>
        <foreignObject>
          <Graph graphItem={graphItem} graphPage={grPageProps} />
        </foreignObject>
      </svg>
    )
  }


  // rendering List of Text Object
  const renderMultipleText = (textList:Object[])=>{
    return (
        textList.map(textItem =>{
          return renderText(textItem)
      })
    )
  }


  // rendering each Text object
  const renderText = (textItem:Object)=>{
    return (
        <foreignObject width="1" height="1" x={textItem.properties.position.left + 'px'} y={textItem.properties.position.top}>
            <div style={{ 'color' : textItem.properties.textStyle?.color}}>{textItem.data}</div>
        </foreignObject>
    )
  }


  //rendering multiple line Object
  const renderMultipleLine = (lineItemList:Object[])=>{
    const allLines = lineItemList.map(lineItem => {return renderLine(lineItem)})
    return allLines
  }


  // render each Line Object
  const renderLine = (lineItem:Object)=>{
    //need rework on lineItem Object
    return (
        <line x1={lineItem.position.left}
              y1={lineItem.position.top}
              x2={lineItem.position.right}
              y2={lineItem.position.bottom}
              stroke="black"
        />
    )
  }


  const graphList = grPageProps.graphPageData.graphList ? grPageProps.graphPageData.graphList : [];
  const nodesList = grPageProps.graphPageData.allNodesList ? grPageProps.graphPageData.allNodesList : [];
  const connectorsList = grPageProps.graphPageData.allConnectorsList ? grPageProps.graphPageData.allConnectorsList : [];
console.log(graphList,grPageProps)
  useEffect(() => {
    console.log(graphList, "graph---->")
    let value = renderMultipleGraphs(graphList)
    setgraphvalues(value)
  }, [graphList])
  // console.log(graphList, "graph---->")
  //   let value = renderMultipleGraphs(graphList)
  //   setgraphvalues(value)

  return (
    <div id="diagram-container" style={{margin:"20px"}}>
        {grPageProps.reRenderGraph && <CreateDiagram graphList={graphList} graphsObject={graphvalues} nodesList={nodesList} connectorsList={connectorsList} grPageProps={grPageProps} />}
      {grPageProps.graphPropertyState.isOpenGraphProperty.isOpen && (
        <GraphPropertyDialog graphPageObject={grPageProps.graphPageData} graphId={grPageProps.graphPropertyState.isOpenGraphProperty.graphId} />
      )}
      {/* <div id="screenshort">
        <img id="blobImage" src="" alt="" />
      </div> */}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    openGraphs: state.worksheetOperationReducer.openGraphs,
    notebooks: state.notebookReducer.notebooks,
    graphPropertyState: state.graphPropertyReducer,
    reRenderGraph: state.createDiagramPageReducer.reRenderGraph,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      graphPropertyAction: bindActionCreators(graphPropertyAction, dispatch),
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(GraphPageCanvas);