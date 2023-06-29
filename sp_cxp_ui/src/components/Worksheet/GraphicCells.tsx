import React from 'react'

const colorCell = (color)=>{
    const colorObj = {
        el : ()=>(<div style= {{backgroundColor: color, width:'100%', height: '100%'}}></div>),
        value : '@rgb(255,0,0)'
    }
    return colorObj
}

const lineCell = (lineType)=>{
    const lineObj = {
        el : ()=>(<div style= {{ width:'100%', height: '100%'}}>♘</div>),
        value : '@line(2)'
    }
    return lineObj
}

const GraphicCells = (graphicType,param)=>{
    if(graphicType == 'color')
        return colorCell(param)
    else if(graphicType == 'line')
        return lineCell(param)
}

export default GraphicCells