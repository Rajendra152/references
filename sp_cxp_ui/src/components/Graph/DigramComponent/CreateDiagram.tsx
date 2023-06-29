import React, { useEffect, useState, useRef } from 'react';
import {
  DiagramComponent,
  IDragEnterEventArgs,
  MarginModel,
  NodeModel,
  PrintAndExport,
  DiagramConstraints,
  ITextEditEventArgs,
  DiagramContextMenu,
  Inject,
  CommandManagerModel,
Keys,
KeyModifiers,
  NodeConstraints,
  HtmlModel,
  GridlinesModel,
  ISelectionChangeEventArgs,
  ZoomOptions,
  ICollectionChangeEventArgs,
  ISizeChangeEventArgs,
  IClickEventArgs,
  TextModel,
  SnapConstraints,
  DiagramTools,
  SnapSettingsModel,
  //UndoRedo,
  ConnectorModel,
  Snapping,
  PortConstraints,
  PortVisibility,
  Connector,
  Selector,
  SnapSettings,
  Rect,
  Size,
  IMouseEventArgs,
  DiagramBeforeMenuOpenEventArgs,
} from '@syncfusion/ej2-react-diagrams';
import { getRulerSize } from '@syncfusion/ej2-diagrams/src/diagram/ruler/ruler';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateGraphPage, deleteTheElementsFromPage, pasteTheElement,copiedFuncionality } from '../../../services/graphPageServices/GraphServices';
import { addNewGraphState } from '../../../services/UndoRedoServices';
import * as ACTION from '../../Redux/actionConstants';
import { getDataSetByKey } from '../../../services/RedisServices';
import { storeGraph } from '../../../store/Worksheet/WorksheetOperation/actions';
import { transposeRowsToColumns } from '../../../services/graphPageServices/GraphServices'
import {
  setDiagramPageInstance,
  isShowGrids,
  isSetRuler,
  setSelectedNode,
  setZoomActionType,
  setCopiedEleID,
  setPageZoomValue,
  setDiagramNodes,
  isSetSnapTo,
  setXYCoordinates,
  setViewDataSecObj,
  isReRenderGraph,
  setSelectedElements
} from '../../../store/CreateGraph/CreateDiagramPage/actions';
import * as ElementTypes from '../DigramComponent/ShapeNodes';
import { string } from 'mathjs';
import {
  isRedoDataAvailable,
  isUndoDataAvailable,
} from '../../../store/Worksheet/SpreadSheet/actions';
//Set the Shape of the drawing Object.
import { MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import {
  setActiveWorksheet,
  storeWorksheet,
} from '../../../store/Worksheet/WorksheetOperation/actions';
import { createSectionWithWorksheet } from '../../../services/NotebookManagerServices/WorksheetCreation';
import { pastingItemIntoNode } from '../../../services/NotebookManagerServices/PastingItems';
import { GraphObjProps } from '../../../services/graphPageServices/GraphPageInterfaces';
import { summaryInfoAction } from '../../../store/SummaryInfo/actions';
import { debounce } from '../../../utils/globalUtility'
import * as actionCreators from '../../../store/Helpmenu/actions';

const SetShape = (diagramInstance, obj, nodes) => {
  let drawingshape;
  drawingshape = { type: 'Basic', shape: obj };
  let node = { id: obj, shape: drawingshape };
  diagramInstance.drawingObject = node;
  enableTool(diagramInstance);
};
const enableTool = (diagramInstance: any) => {
  diagramInstance.dataBind();
};
const getTextNode = (diagramInstance, existingNodes) => {
  let drawingshape;
  drawingshape = { type: 'Text' };
  let node = {
    shape: drawingshape
  };
  setdrawobject(node, null, diagramInstance, existingNodes);
};
const setdrawobject = (node, connector, diagramInstance, existingNodes) => {
  if (connector == null) {
    diagramInstance.drawingObject = node;
  } else {
    diagramInstance.drawingObject = connector;
  }
  enableTool(diagramInstance);
};

// based on the option, Click event to perform ZoomIn,ZoomOut and Reset.
const onItemClick = (diagramInstance, type, setZoomAction, setPageZoom) => {
  console.log(diagramInstance)
  switch (type) {
    case 'Zoom In':
      let zoomin: ZoomOptions = { type: 'ZoomIn', zoomFactor: 0.2 };
      diagramInstance.zoomTo(zoomin);
      setPageZoom(diagramInstance.scrollSettings.currentZoom);
      setZoomAction('');
      break;
    case 'Zoom Out':
      let zoomout: ZoomOptions = { type: 'ZoomOut', zoomFactor: 0.2 };
      diagramInstance.zoomTo(zoomout);
      setPageZoom(diagramInstance.scrollSettings.currentZoom);
      setZoomAction('');
      break;
    case 'Reset':
      diagramInstance.reset();
      // diagramInstance.fitToPage({ mode: 'Page', region: 'CustomBounds', margin: { left: 50, right: 50 }, customBounds: bound });
      break;
  }
};
const CreateDiagram = (props) => {

 
  let diagramInstance: DiagramComponent;
  let htmlShape: HtmlModel = { type: 'HTML' };
  let constraints: any = NodeConstraints.Default;
  let htmlNode: NodeModel[] = [];
  console.log( props.graphList, " props.graphList")

  let htmlNodes = props.graphList.map((item, index) => {
     htmlNode = {
      id: item.id,
      offsetX: item.layout.offsetX,
      offsetY: item.layout.offsetY,
      width: item.layout.width,
      height: item.layout.height,
      shape: htmlShape,
    };
 
    return htmlNode;
  });
   let initialValue = props.graphList.length > 0 ? htmlNodes : [];
  // // let props = props
  const [allUpdatedNodes, setAllUpdatedNodes] = useState({
    allNodes: initialValue,
    allConnectors: [],
  });
  const [currGrPg, setCurrGrPg] = useState(
    props.allGraphPages[props.grPageProps.graphPageData.id]
  );
  let [currentOffsetYAddition, setcurrentOffsetYAddition] = useState(0)
  const [showRulers, setshowRuler] = useState(false);
  const [showGridLines, setSnapSettings] = useState(SnapConstraints.None);
  const [tool, setDiagramTool] = useState(DiagramTools.MultipleSelect);
  const [clientheight, setClientHeight] = useState(window.innerHeight - document.getElementsByClassName('ribbon-tab')[0]?.clientHeight - document.getElementsByClassName('footer-bar')[0].clientHeight - document.getElementById('title-bar').clientHeight - 90);
const [clientWidth, setClientWidth] = useState(window.innerWidth - document.getElementsByClassName('sidemenu-notebook-continer')[0].clientWidth - 70)
  let nodeConstraints: any =
    NodeConstraints.Default & ~NodeConstraints.Resize & ~NodeConstraints.Rotate;
  let elements = props;
  const sectionElement = useRef(null);
  const renderElement = (type) => {
    switch (type) {
      case ElementTypes.RECTANGLE:
        diagramInstance.tool = DiagramTools.ContinuousDraw;
        SetShape(diagramInstance, 'Rectangle', htmlNode);
        break;
      case ElementTypes.ELLIPSE:
        diagramInstance.tool = DiagramTools.ContinuousDraw;
        SetShape(diagramInstance, 'Ellipse', htmlNode);
        break;
      case ElementTypes.LINE:
        diagramInstance.tool = DiagramTools.ContinuousDraw;
        setdrawobject(
          null,
          {
            type: 'Straight',
            targetDecorator: { shape: 'None' },
            style: { strokeWidth: 2, strokeColor: '#757575' },
          },
          diagramInstance,
          htmlNode
        );
        break;
      case ElementTypes.DownARROW:
        diagramInstance.tool = DiagramTools.ContinuousDraw;
        setdrawobject(
          null,
          {
            type: 'Straight',
            style: { strokeWidth: 2, strokeColor: '#757575' },
          },
          diagramInstance,
          htmlNode
        );
        break;
      case ElementTypes.TEXT:
        diagramInstance.tool = DiagramTools.ContinuousDraw;
        getTextNode(diagramInstance, htmlNode);
        break;
      case ElementTypes.SELECT:
        diagramInstance.tool = DiagramTools.None;
        break;
      default:
    }
  };

  useEffect(() => {
    addNewGraphState(currGrPg, props, true);
    if(props.pagesetwidth == "" || props.pagesetheight=="" ){
      console.log("i did refresh 22221",clientWidth,clientheight)
      diagramInstance.width = "100%"
      diagramInstance.height = "587.36px"
      console.log("i did refresh",props.pagesetwidth,props.pagesetheight)

    }
    else{
      console.log("i did refresh 2",props.pagesetwidth,props.pagesetheight)

      props.setPageSize( props.pagesetwidth,props.pagesetheight);

    }
  }, []);

  useEffect(() => {
    let adjustedHeight = currentOffsetYAddition + 400;
    props.setPageSize(props.pagesetwidth, `${props.pagesetheight}`);
    window.addEventListener('resize', changeHeight);
    // window.addEventListener('resize', updateSize);
    return () => {
      // window.removeEventListener('resize', updateSize);
    };
  },[currentOffsetYAddition]);

  useEffect(
    ()=>changeHeight(),
    [props.isStatusbarDisplay] //, props.isNotebookManagerDisplay,]
  );

  useEffect(() => {
    let gridValue;
    console.log(props, "dfghhmjm")
    diagramInstance.dataBind();
    if (props.zoomType != '') {
      onItemClick(
        diagramInstance,
        props.zoomType,
        props.actions.setZoomAction,
        props.actions.setPageZoom
      );
    } else {
      renderElement(props.nodeElementType);
    }
    if (props.enableSnapTo) {
      gridValue = SnapConstraints.All;  //SnapToLines also can be used if we don't want SnapToObject
    } else {
      const { grids, showHorizontal, showVertical } = elements;
      gridValue = SnapConstraints.None;
      if (grids) {
        if (
          (showHorizontal && showVertical) ||
          (!showHorizontal && !showVertical)
        ) {
          gridValue = SnapConstraints.ShowLines;
        } else if (showHorizontal) {
          gridValue = SnapConstraints.ShowHorizontalLines;
        } else if (showVertical) {
          gridValue = SnapConstraints.ShowVerticalLines;
        }
      }
      // gridValue = elements.grids ? SnapConstraints.ShowLines : SnapConstraints.None
    }
    setSnapSettings(gridValue);
    const diagramTool = props.setZoomTool
      ? DiagramTools.ZoomPan
      : DiagramTools.None;
    setDiagramTool(diagramTool);

    if (sectionElement.current) {
      let graphPage =
        props.notebooks.allGraphPages.byId[props.allActiveItem.graphPage.id];

      pastingItemIntoNode(sectionElement.current, graphPage, props);
      sectionElement.current = null;
    }
 
  }, [props]);


  useEffect(() => {
    let Nodes;
    let bound = new Rect(100, 100, 500, 100);
    console.log("helllooooooo---->")
    let htmlNodes = props.graphList.map((item, index) => {
      console.log(item.layout, "item.layout")
    
      // console.log('**********Index*********', index)
      // console.log('**********Item*********', item)
      // if(index > 0 ){
      //   currentOffsetYAddition = item.layout.offsetY + currentOffsetYAddition + 50
      // } else{
      //   currentOffsetYAddition = item.layout.offsetY
      // }
     
      htmlNode = {
        id: item.id,
        offsetX: item.layout.offsetX,
        offsetY: item.layout.offsetY,
        // offsetY: currentOffsetYAddition,
        width: item.layout.width,
        height: item.layout.height,
        shape: htmlShape,
      };

      return htmlNode;
    });
    // console.log('******curentOffset setting**********', currentOffsetY)
    // setcurrentOffsetYAddition(currentOffsetYAddition)
    Nodes = {
      allNodes: [...htmlNodes, ...currGrPg.allNodesList],
      allConnectors: currGrPg.allConnectorsList,
    };
    console.log("nodes", Nodes)
    setAllUpdatedNodes(Nodes);

    props.actions.setPageInstance(diagramInstance);
    props.actions.setXYCoordinates({ x: 100, y: 101 });
  }, [props]);



  const updateTheDiagramNodes = (diagramInstance, args, existingNode) => {
    let element = args.element;
    let id = element.id.slice(0, 5);
    if (
      (props.pageInstance != undefined || props.pageInstance != null) &&
      id != 'group'
    ) {
      let nodeEle = {};
      let allNodes: NodeModel[] = [];
      let allConnectors: ConnectorModel[] = [];
      if (args.type == 'Addition') {
        if (element.propName == 'connectors') {
          nodeEle = {
            id: element.id,
            type: element.type
              ? element.type
              : element.properties.shape.properties.shape,
            targetDecorator: {
              shape: element.targetDecorator.shape,
              width: element.targetDecorator.width,
              height: element.targetDecorator.height,
            },
            offsetX: element.wrapper.offsetX,
            offsetY: element.wrapper.offsetY,
            sourcePoint: { x: element.sourcePoint.x, y: element.sourcePoint.y },
            targetPoint: { x: element.targetPoint.x, y: element.targetPoint.y },
            shape: {
              properties: element.shape.properties,
              type: element.shape.type,
            },
            style: {
              strokeColor: '#757575',
              strokeDashArray: '',
              strokeWidth: 2,
            },
          };
          updateGraphPage(currGrPg, props, true, false, nodeEle);
        } else if (element.propName == 'nodes') {
          nodeEle = {
            id: element.id,
            width: element.width,
            height: element.height,
            offsetX: element.offsetX,
            offsetY: element.offsetY,
            type: element.type ? element.type : '',
            shape: {
              content: element.shape.content,
              shape: element.shape.shape,
              type: element.shape.type,
            },
          };
          updateGraphPage(currGrPg, props, true, nodeEle, false);
        }
      }
    }
  };

  // const updateTextNodeValue = (args) => {
  //   console.log(args, "text args")

  //   let newNodeElement = {
  //     id: args.element.id,
  //     width: args.element.width,
  //     height: args.element.height,
  //     offsetX: args.element.offsetX,
  //     offsetY: args.element.offsetY,
  //     type: args.element.type ? args.element.type : '',
  //     shape: {
  //       content: args.newValue,
  //       shape: args.element.shape.shape,
  //       type: args.element.shape.type,
  //     },
  //   };
  //   console.log(newNodeElement, "newNodeElement")
    
  //   updateGraphPage(currGrPg, props, false, newNodeElement, false, args.element, undefined, false, false, false, true);
  // }

  const updateTheConnectorValue = (diagramInstance, args) => {
    console.log("fghjkl")
    if (diagramInstance != undefined || diagramInstance != null) {
      let nodes = currGrPg.allNodesList;
      let connectors = currGrPg.allConnectorsList;
      let changedElement = args.source;
      let isConnector;
      let isPosition = true
      console.log("changedElement", changedElement )
      if (changedElement instanceof Selector) {
        isConnector = changedElement.connectors.length > 0 ? true : false;
        changedElement = isConnector
          ? changedElement.connectors[0]
          : changedElement.nodes[0];
      } else {
        isConnector = changedElement instanceof Connector ? true : false;
      }
      if (isConnector) {
        updateGraphPage(
          currGrPg,
          props,
          false,
          false,
          true,
          changedElement,
          args.targetPosition
        );
      } else {
        console.log("hello",changedElement.shape?.type)
        let isGraph = changedElement.shape?.type == 'HTML' ? true : false
        updateGraphPage(
          currGrPg,
          props,
          false,
          true,
          false,
          changedElement,
          args.newValue,
          false,
          isGraph,
          isPosition
        );
      }
    }
  };

  const getXYPositionsOnMouseOver = (arg) => {
    console.log("hinside")
    var offsetX;
    var offsetY;
    offsetX = arg.clientX;
    offsetY = arg.clientY;
    var position = new Size();
    position = getRulerSize(props.pageInstance);
    var boundingRect = props.pageInstance.element.getBoundingClientRect();
    offsetX =
      offsetX +
      props.pageInstance.diagramCanvas.scrollLeft -
      boundingRect.left -
      position.width;
    offsetY =
      offsetY +
      props.pageInstance.diagramCanvas.scrollTop -
      boundingRect.top -
      position.height;

    offsetX /= props.pageInstance.scroller.transform.scale;
    offsetY /= props.pageInstance.scroller.transform.scale;
    offsetX -= props.pageInstance.scroller.transform.tx;
    offsetY -= props.pageInstance.scroller.transform.ty;
    props.actions.setXYCoordinates({ x: offsetX.toFixed(2), y: offsetY.toFixed(2) });
  };

  let horizontalGridlines: GridlinesModel = { lineDashArray: '1,1' };
  let verticalGridlines: GridlinesModel = { lineDashArray: '1,1' };
  let marginStyle: MarginModel = { top: 0, left: 20, bottom: 0, right: 20 };
  const setNodeTemplate = (args) => {
    // let length = args.id.length
    let values;
    let id = args.id.split('-')[0] + '-';
    values = props.graphsObject.filter((item) => {
      return item.props.children.props.children.props.graphItem.id == id;
    });
    return values[0] ? values[0] : '';
  };

  const isNode = (selectedElements) => {
    if(selectedElements.nodes.length > 0) {
    return  selectedElements.nodes[0].shape?.type !== 'HTML' ? 'nodes' : 'graph'
    } else {
     return 'connectors'
    }
  }

  const contextMenuOpen = (args) => {
    console.log( args, "insideviewgraphdat")
    console.log('1-->');
    diagramInstance?.selectedItems.connectors?.length
      ? args.hiddenItems.push('viewGraphData')
      : diagramInstance.selectedItems.nodes?.map((nodeItem) => {
          console.log('2-->');
          for (let item of args.items) {
            if (item.text === 'viewGraphData') {
              console.log('3-->');
              console.log(nodeItem);
              if (nodeItem.shape?.type !== 'HTML') {
                console.log('4-->');
                args.hiddenItems.push(item.text);
              } else if (nodeItem.shape?.type == 'HTML') {
                let currentGraphPage =
                  props.notebooks.allGraphPages.byId[
                    props.allActiveItem.graphPage.id
                  ];
                console.log(currentGraphPage);
                currentGraphPage?.graphList.filter((graphID: any) => {
                  console.log('5-->', graphID.id === nodeItem.id, graphID);
                  if (
                    graphID.id === nodeItem.id &&
                    !graphID.isResultGraphPage
                  ) {
                    console.log("helloooo")
                    args.hiddenItems.push(item.text);
                  }
                });
              }
            }
        
          }
        });
  };
  const setResultGraphViewData = async() => {
    let graphpage =
    props.notebooks.allGraphPages.byId[props.allActiveItem.graphPage.id];
  let openedWorksheet = props.openWorksheets.filter(
    (item) => item.key == graphpage.worksheetId
  );
  console.log("openedWorksheet",props.openWorksheets,"<>>>>>>>><",props)
  let gridDataBefore = await getDataSetByKey(
    openedWorksheet[0].key,
    openedWorksheet[0].client
  );
  console.log(gridDataBefore, 'gridData');

let gridData = transposeRowsToColumns(gridDataBefore[0].sheetdata)
  console.log(gridData, 'gridData');
  let sectionObject = await createSectionWithWorksheet(
    props,
    graphpage,
    gridData
  );
  props.actions.setViewDataSecObj({
    sectionID: sectionObject.id,
    graphPageId: graphpage.id,
  });
  }
  const contextMenuClick = (args) => {
    console.log(args.item, "args.item.", diagramInstance.selectedItems.nodes[0])
    let elements = diagramInstance.selectedItems
    let element = isNode(diagramInstance.selectedItems)
    console.log(element)
    if (args.item.id === 'viewGraphData') {
      // createWorksheet(props)
      props.setSelectedElements({})
      setResultGraphViewData()
    } else if(args.item.id === 'diagram_contextMenu_cut') {
      props.setSelectedElements({})
     if(element === 'connector'){
      props.pageInstance.cut()
      deleteTheElementsFromPage(currGrPg,props,diagramInstance.selectedItems.connectors,'connector',true)
    } else {
       if(element === 'graph'){
        //  console.log(diagramInstance, diagramInstance.selectedItems, "diagramInstance.selectedItems")
        deleteTheElementsFromPage(currGrPg,props,elements.nodes,'graph',true)
       }
       deleteTheElementsFromPage(currGrPg,props,elements.nodes,'node', true)
     }
     
    }else if(args.item.id === 'diagram_contextMenu_copy') {
      props.setSelectedElements({})
      copiedFuncionality(props)
      diagramInstance.copy()
      console.log("elloooo")
    } else if(args.item.id === 'diagram_contextMenu_paste') {
      let itemToCheck
      let itemType
      console.log(props.selectedCopiedItems,"props.selectedCopiedItems")
     if(props.selectedCopiedItems.connectorItems.length > 0){
       itemToCheck = props.selectedCopiedItems.connectorItems
       itemType = 'connector'
     } else if (props.selectedCopiedItems.nodeItems.length > 0){
      itemToCheck = props.selectedCopiedItems.nodeItems
      itemType = 'node'
     } else if(props.selectedCopiedItems.graphItems > 0){
      itemToCheck = props.selectedCopiedItems.graphItems
      itemType = 'graph'
     }
      pasteTheElement(itemToCheck, props , itemType, props.selectedCopiedItems.graphPageId)

    } else if (args.item.id === 'diagram_contextMenu_sendToBackOrder'){
      props.pageInstance.sendToBack()
    } else if (args.item.id === 'diagram_contextMenu_moveForwardOrder'){
      
    }
    
  };

  useEffect(()=>{
    diagramInstance.width =props.pagesetwidth
    diagramInstance.height =props.pagesetheight
  },[props])

  var graphHeight;
  var graphwidth;
  const changeHeight = ()=>{
    graphHeight =
      window.innerHeight -
      document.getElementsByClassName('ribbon-tab')[0].clientHeight -
      document.getElementsByClassName('footer-bar')[0].clientHeight -
      document.getElementById('title-bar').clientHeight -
      90;
    setClientHeight(graphHeight)
    setClientWidth(graphwidth)
  }

  const resizeTheGraph = (args : ISizeChangeEventArgs) => {
    let elementNode = args.source?.nodes
    let elementConnectors = args.source?.connectors
    let newValues = args.newValue
    if(args.state == 'Completed'){
      if(elementNode?.length >0){
        if(elementNode[0].shape?.type == 'HTML'){
          updateGraphPage(
            currGrPg,
            props,
            false,
            true,
            false,
            elementNode[0],
            args.newValue,
            true,
            true
          );
      } else {
        updateGraphPage(
          currGrPg,
          props,
          false,
          true,
          false,
          elementNode[0],
          args.newValue,
          true,
          false
        );
      } 
    }
      if(elementConnectors?.length > 0) {
        updateGraphPage(
          currGrPg,
          props,
          false,
          false,
          true,
          elementConnectors[0],
          args.newValue,
          true,
          false
        );
      }
    }
  }

  const getCommandManagerSettings = (): CommandManagerModel =>{ 
    let commandManager: CommandManagerModel = {
    commands: [{
                name: 'Delete',
                parameter: 'node',
                //Method to define whether the command can be executed at the current moment
                canExecute: function() {
                    //Defines that the clone command can be executed, if and only if the selection list is not empty.
                  return true
                },
                //Command handler
                execute: function() {
                    //Logic to clone the selected element
                    let nodes = diagramInstance.selectedItems.nodes
                    let connectors = diagramInstance.selectedItems.connectors
                    console.log(diagramInstance.selectedItems.nodes,diagramInstance.selectedItems.connectors, "hellllooo")
                    if(nodes.length > 0) {
                      deleteTheElementsFromPage(currGrPg,props,nodes,'node')
                    } 
                  
                    if(connectors.length > 0) {
                      deleteTheElementsFromPage(currGrPg,props,connectors,'connector')
                    }
                },
                //Defines that the clone command has to be executed on the recognition of key press.
                gesture: {
                    key: Keys.Delete,
                }
            }
        ]
    };
    return commandManager;
  }
console.log(props.pagesetwidth);
console.log(props.pagesetheight);
console.log(props);
console.log(clientWidth);
console.log(clientheight);
  return (
    // <div className="diagram-comp"
    //   onMouseMove={debounce(getXYPositionsOnMouseOver, 100)}
    //   style={{ display:'flex', height:clientheight,width:"1033px", overflowY:'scroll', overflowX:'scroll', justifyContent:"center", border:'1px solid lightgrey'}}
    // >
    <div onMouseMove={debounce(getXYPositionsOnMouseOver, 100)} style={{height:clientheight,overflow:"scroll",display:"flex",justifyContent:"center"}}>
      <DiagramComponent 
        id="diagram"
        ref={(diagram) => (diagramInstance = diagram)}
        // style={{ overflow: 'auto' }}
        width={props.pagesetwidth}
        height={props.pagesetheight}
        mode={'SVG'}
        commandManager={getCommandManagerSettings()}
        pageSettings={{
          // Sets the PageOrientation for the diagram to page
          orientation: "Landscape",
          width: 500,
          height: 450,

          // boundaryConstraints: 'Diagram',
          // Sets the space to be left between an annotation and its parent node/connector
          margin: {
            left: 10,
            top: 10,
            bottom: 10,
          },
        }}
        nodes={
          allUpdatedNodes && allUpdatedNodes.allNodes.length > 0
            ? allUpdatedNodes.allNodes
            : []
        }
        connectors={
          allUpdatedNodes && allUpdatedNodes.allConnectors.length > 0
            ? allUpdatedNodes.allConnectors
            : []
        }
        created={(args) => {
          if (diagramInstance != undefined || diagramInstance != null) {
            for (var i = 0; i < diagramInstance.nodes.length; i++) {
              console.log(
                diagramInstance.nodes,
                args,
                ' diagramInstance.nodes'
              );
            }
          }
        }}
        rulerSettings={{
          showRulers: props.showRuler,
          horizontalRuler: { segmentWidth: 100, interval: 20 },
          verticalRuler: { segmentWidth: 100, interval: 20 },
        }}
        tool={tool}
       
        snapSettings={{
          horizontalGridlines,
          verticalGridlines,
          constraints: showGridLines,
          snapObjectDistance: 4,
          snapAngle: 4,
        }}
        // snapSettings={{
        //   horizontalGridlines,
        //   verticalGridlines,
        //   constraints: showGridLines,
        //   snapObjectDistance: 4,
        //   snapAngle: 4,
        // }}
        collectionChange={(args: ICollectionChangeEventArgs) => {
          updateTheDiagramNodes(diagramInstance, args, htmlNode[0]);
        }}
        nodeTemplate={setNodeTemplate}
        // pageSettings={{ width: 200, height: 800, orientation: 'Portrait', boundaryConstraints: 'Infinity', margin: (0, 20, 0, 20) }}

        selectionChange={(args) => {}}
        textEdit={(args) => {}}
        positionChange={(args) => {
          if (args.state == 'Completed') {
            console.log("args for position change", args)
            updateTheConnectorValue(props.pageInstance, args);
          }
        }}
        contextMenuSettings={{
          //Enables the context menu
          show: true,
          items: [
            {
              text: 'viewGraphData',
              id: 'viewGraphData',
            },   
          ],
          // Hides the default context menu items
          showCustomMenuOnly: false,
        }}
        contextMenuOpen={contextMenuOpen}
        contextMenuClick={contextMenuClick}
        sizeChange = {resizeTheGraph}
      >
        <Inject services={[DiagramContextMenu, Snapping, PrintAndExport]} />
      </DiagramComponent>
     </div>
  );
};

function mapStateToProps(state) {
  return {
    pagesetwidth: state.helpMenuReducer.width,
    pagesetheight: state.helpMenuReducer.height,
    nodeElementType: state.createDiagramPageReducer.selectedNodeType,
    zoomType: state.createDiagramPageReducer.zoomType,
    allNodes: state.createDiagramPageReducer.nodes,
    allGraphPages: state.notebookReducer.notebooks.allGraphPages.byId,
    showRuler: state.createDiagramPageReducer.showRuler,
    pageInstance: state.createDiagramPageReducer.diagramPageInstance,
    grids: state.createDiagramPageReducer.grids,
    showHorizontal: state.createDiagramPageReducer.showHorizontal,
    showVertical: state.createDiagramPageReducer.showVertical,
    pageZoomValue: state.createDiagramPageReducer.pageZoomValue,
    setZoomTool: state.createDiagramPageReducer.enablePageMovement,
    enableSnapTo: state.createDiagramPageReducer.enableSnapTo,
    activeItems: state.notebookReducer.activeItems,
    notebooks: state.notebookReducer.notebooks,
    activeWorksheet: state.worksheetOperationReducer.activeWorksheet,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    openGraphs: state.worksheetOperationReducer.openGraphs,
    allActiveItem: state.notebookReducer.allActiveItem,
    isNotebookManagerDisplay: state.mainWindowReducer.isNotebookManagerDisplay,
    isStatusbarDisplay: state.mainWindowReducer.isStatusbarDisplay,
    selectedCopiedItems : state.createDiagramPageReducer.selectedCopiedItems
  };
}
function mapDispatchToProps(dispatch) {
  return {
            setPageSize: (width, height) => dispatch(actionCreators.setpageSize(width, height)),

    actions: {
      setSelectedNodeType: bindActionCreators(setSelectedNode, dispatch),
      setZoomAction: bindActionCreators(setZoomActionType, dispatch),
      setPageZoom: bindActionCreators(setPageZoomValue, dispatch),
      setDiagramNodes: bindActionCreators(setDiagramNodes, dispatch),
      showRuler: bindActionCreators(isSetRuler, dispatch),
      setPageInstance: bindActionCreators(setDiagramPageInstance, dispatch),
      showGrids: bindActionCreators(isShowGrids, dispatch),
      isSetSnapTo: bindActionCreators(isSetSnapTo, dispatch),
      setXYCoordinates: bindActionCreators(setXYCoordinates, dispatch),
      storeWorksheet: bindActionCreators(storeWorksheet, dispatch),
      setActiveWorksheet: bindActionCreators(setActiveWorksheet, dispatch),
      setViewDataSecObj: bindActionCreators(setViewDataSecObj, dispatch),
      storeGraph: bindActionCreators(storeGraph, dispatch),
      setCopiedEleID: bindActionCreators(setCopiedEleID, dispatch),
    },
    updateGraphProperty: (item) => {
      dispatch({ type: ACTION.UPDATE_GRAPH_PROPERTY, payload: item });
    },
    setActiveItem: (activeItem: IActiveItems) => {
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: activeItem });
    },
    setAllActiveItem: (allactiveItem: IActiveItems) => {
      dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
    },
    setSelectedPivotItem: (pvtItem) => {
      dispatch({ type: 'SET_SELECTED_PIVOT_ITEM', payload: pvtItem });
    },
    addSection: (newSection: IActiveItems) => {
      dispatch({ type: 'ADD_SECTION', payload: newSection });
    },
    addWorksheet: (item) => {
      dispatch({ type: 'ADD_WORKSHEET', payload: item });
    },
    addGraphPage: (item) => {
      dispatch({ type: 'ADD_GRAPHPAGE', payload: item });
    },
    isUndoDataAvailable: bindActionCreators(isUndoDataAvailable, dispatch),
    isRedoDataAvailable: bindActionCreators(isRedoDataAvailable, dispatch),
    isReRenderGraph: bindActionCreators(isReRenderGraph, dispatch),
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
    setSelectedElements : bindActionCreators(setSelectedElements, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDiagram);
