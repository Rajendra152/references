
import React, { Dispatch } from 'react'

export const Graph = (props)=>{

    const graphData = props.graph

    const handleClick = (data, graphData)=>{
        props.onHandleClick(data)

        console.log(graphData)
    }

    return (
        <div className="subsheet-data" onClick={()=>handleClick(graphData.graphInfo, graphData)}>{graphData.graphInfo.name.split("-")[0]}</div>
    )
}


export default Graph
