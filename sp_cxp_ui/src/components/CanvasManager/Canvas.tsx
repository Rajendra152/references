import React, { ReactNode } from 'react';
// import { isFunction, isNil, isArray, find } from 'lodash'
import * as d3 from 'd3';
import { ZoomBehavior, ZoomTransform } from 'd3';
import { CanvasObjectType } from '../MainWindow/MainWindow';
//import {, GraphProps, GraphPageObjectProps, GraphPageObjectItemProps, GraphObjectType} from './CanvasInterfaces'
import Graph from '../Graph/Graph';

interface CanvasItemProps {
  x: number;
  y: number;
  width: number;
  height: number;
  // type: CanvasObjectType
  // element : HTMLElement
}

// interface CanvasProps{
//     list : CanvasItemProps
// }

// const renderItem = (item: CanvasItemProps) =>{
//     const itemProperties = item.properties
//     const position = itemProperties.position
//     return (
//         <foreignObject width={position.width+'px'} height={position.height+'px'} x={'0px'} y={'0px'}>
//             {item.data}
//         </foreignObject>
//     )
// }

// const renderItems = (items: CanvasItemProps[])=>{
//     return (
//        items.map(item=>{
//            return (
//                 renderItem(item)
//            )
//        })
//     )
// }

const renderGraph = (graphItem) => {
  return (
    <foreignObject width="1" height="1" x={graphItem.x}>
      <Graph {...graphItem} />
    </foreignObject>
  );
};

const renderGraphs = (graphList) => {
  if (graphList.length != 0) {
    graphList[0].x = 20;
    // graphList[1].x = 350;
  }
  return graphList.map((graphItem) => {
    return renderGraph(graphItem);
  });
};

const renderText = (textItem) => {
  return (
    <foreignObject
      width="1"
      height="1"
      x={textItem.properties.position.left + 'px'}
      y={textItem.properties.position.top}
    >
      <div style={{ color: textItem.properties.textStyle?.color }}>
        {textItem.data}
      </div>
    </foreignObject>
  );
};

const renderLine = (lineItem) => {
  return (
    <line
      x1={lineItem.properties.position.left}
      y1={lineItem.properties.position.top}
      x2={lineItem.properties.position.right}
      y2={lineItem.properties.position.bottom}
      stroke="black"
    />
  );
};

const renderGrapgePageObject = (objectItem) => {
  console.log(objectItem.data);
  switch (objectItem.type) {
    case GraphObjectType.TEXT:
      return renderText(objectItem);
    case GraphObjectType.LINE:
      return renderLine(objectItem);
    default:
      return;
  }
};

const rednerGraphPageObjects = (objectList) => {
  return objectList.map((objectItem) => {
    return renderGrapgePageObject(objectItem);
  });
};

const Canvas = (CanvasProps) => {
  console.log('Canvas props');
  console.log(CanvasProps);
  const graphList = CanvasProps.graphs == undefined ? [] : CanvasProps.graphs;
  const graphPageObjectList =
    CanvasProps.graphPageObjects == undefined
      ? []
      : CanvasProps.graphPageObjects;

  const objectToDisplay = graphList.length ? (
    renderGraphs(graphList)
  ) : (
    <>
      <foreignObject width="1" height="1" x={160 + 'px'} y={80 + 'px'}>
        <div style={{ color: 'red' }}>{CanvasProps.graphPageData.name} </div>
      </foreignObject>
      <line x1={50} y1={150} x2={400} y2={150} stroke="black" />
    </>
  );
  return (
    <svg width="99%" height="300px" style={{ border: '1px solid black' }}>
      {/* {renderGraphs(graphList)} */}
      {/* {rednerGraphPageObjects(graphPageObjectList)}  */}
      {objectToDisplay}
    </svg>
  );
};

export default Canvas;
