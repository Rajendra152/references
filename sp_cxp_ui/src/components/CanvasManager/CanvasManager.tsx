import React, { useState,Dispatch } from 'react';
import {connect} from 'react-redux';
import { IAction } from '../Redux/notebookReducer';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Icon } from '@fluentui/react';
import Worksheet from '../Worksheet/WorksheetNew';
import Graph from '../Graph/Graph';
import Report from '../Report/Report-tinymce';
//import { getData } from '../Worksheet/WorksheetData'

export interface IWorksheet{
    id: number
    data : string[][]
}

export interface IGraph{

}

export interface IReport{

}

export interface INotebookItem{
    notebookItem : IWorksheet | IGraph | IReport
}

export interface ICanvasState{
    activeItems : INotebookItem[]
}

const sampleGraph = {
    id: 'graph_1',
    name : 'Graph',
    type: 'graph',
    graph_page_id: 1,
    worksheet_id:2,
    graphs : [{
        type : 'scatter',
        dataFormat: 'XY',
        graphData : {
            x : [1,2,3,4],
            y : [4,5,6,7]
        }
    },{
        type : 'scatter',
        dataFormat: 'XY',
        graphData : {
            x : [10,12,34,45],
            y : [42,51,26,70]
        }
    }]
}

const CanvasManager = (props)=>{

    const renderGraph = (graphData)=>{
        return Graph(graphData.graphs)
        // return  <Canvas type={graphData.type} graph_page_id={graphData.graph_page_id} worksheet_id={graphData.worksheet_id} graphs={graphData.graphs} ></Canvas>
    }

    const getCellValues = (arr)=>{
        return arr.map(item=>{
            return Number(item.value)
        })
    }

    async function createGraph(graphData){
        // const data = await getData('Test-100')
        // graphData.graphs[0].graphData.x = getCellValues(data[1])
        // graphData.graphs[0].graphData.y = getCellValues(data[2])
        // graphData.graphs[1].graphData.x = getCellValues(data[3])
        // graphData.graphs[1].graphData.y = getCellValues(data[4])
         console.log("------ Button----------")
        console.log(props.activeItems)
        console.log(props.activeItems.indexOf(graphData))
        if(props.activeItems.indexOf(graphData) == -1){
            props.setActiveItem(graphData)
        }
    }

    const createActiveItem = (item)=>{
        switch(item.type){
            case 'worksheet':
                return <Worksheet/>
            case 'graph':
                return renderGraph(item)
            case 'report':
                return <Report/>
        }
    }

    const removeActiveItem = (id)=>{
        props.removeActiveItem(id)
    }

    function _customRenderer(
        link,
        defaultRenderer,
      ) {
        if (!link || !defaultRenderer) {
          return null;
        }

        return (
          <span style={{ flex: '0 1 100%' }}>
            {defaultRenderer({ ...link, itemIcon: undefined })}
            {/* <Icon iconName={link.itemIcon} style={{ color: 'red', paddingLeft: '10px' }} /> */}
            <Icon iconName="Cancel" style={{ color: '#4a4a4a', paddingLeft: '10px' }} onClick={()=>removeActiveItem(link.itemKey)} ></Icon>
          </span>
        );
      }

    const activeItems = props.activeItems ?
                        props.activeItems.map(item=>{
                            return (
                                <PivotItem itemKey={item.id} key={item.id} headerText={item.name} itemIcon="Add" onRenderItemLink={_customRenderer}>
                                   {createActiveItem(item)}
                                </PivotItem>
                            )
                        }) : []


    return (

        <div>
            { activeItems.length ?
            (
            <div>
            <Pivot className="content-div-pivot" aria-label="Large Link Size Pivot Example" linkSize={PivotLinkSize.large}>
                {activeItems}
            </Pivot>
            <button onClick={()=>createGraph(sampleGraph)}>Create Graph</button>
            </div>
            ) : null}
        </div>
    )
}


const mapStateToProps = (canvasState:ICanvasState)=>{
    return {
        activeItems : canvasState.notebookReducer.activeItems
    }
}

const mapDispatchToProps = (dispatch : Dispatch<IAction>)=>{
    return {
        getActiveList : ()=>{
            dispatch({ type : 'GET_ACTIVE_WINDOW_LIST'})
        },
        setActiveItem : (graphData) =>{
            dispatch({ type : 'SET_ACTIVE_ITEM', payload: graphData})
        },
        removeActiveItem : (item)=>{
            dispatch({ type : 'REMOVE_ACTIVE_ITEM', payload : item})
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(CanvasManager)
