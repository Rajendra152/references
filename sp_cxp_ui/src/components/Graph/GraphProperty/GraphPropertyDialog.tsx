import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CommonModalComp from './../../CommonComp/CommonModalComp';
import * as graphPropertyAction from './../../../store/GraphProperty/GraphProperty/actions';
import * as ACTION from '../../Redux/actionConstants';

import ListComponent from './ListComponent';
import GraphBanner from './GraphBanner'
import GraphContent from './GraphContent';

import GraphPlanes from './GraphSubListContent/GraphPlanes';
import AxisContent from './AxisContent';
import PlotContent from './PlotContent';


import Legends from './GraphSubListContent/Legends';
import LegendsItem from './GraphSubListContent/LegendItem';
import Geographic from './GraphSubListContent/Geographic';
import Grid from './GraphSubListContent/Grids';
import Lines from './AxisSubListContent/Lines';
import Scaling from './AxisSubListContent/Scaling';
import RadarLabelsandTicks from './AxisSubListContent/RadarLabelsandTicks';
import MajorLabels from './AxisSubListContent/MajorLabels';
import MinorLabels from './AxisSubListContent/MinorLabels';
import MajorPolarLabels from './AxisSubListContent/MajorPolarLabels';
import MinorPolarLabels from './AxisSubListContent/MinorPolarLabel';
import MajorTernaryLabels from './AxisSubListContent/MajorTernaryLabels';
import MajorTickLabels from './AxisSubListContent/MajorTickLabel'
import MinorTickLabels from './AxisSubListContent/MinorTickLabel'
import MajorTicks from './AxisSubListContent/MajorTicks'
import MinorTicks from './AxisSubListContent/MinorTicks';
import Droplines from './PlotSubListContent/DropLines';


import Data from './PlotSubListContent/Data'
import Symbols from './PlotSubListContent/Symbols'
import PlotLines from './PlotSubListContent/Lines'
import AreaFills from './PlotSubListContent/AreaFill'
import AreaFillRadar from './PlotSubListContent/AreaFillRadar'
import BarWidth from './PlotSubListContent/BarWidth'
import ReferenceLines from './PlotSubListContent/ReferenceLines'
import Fills from './PlotSubListContent/Fills'
import Location from './PlotSubListContent/MapLocation'


import { getDialogPropertiesList } from '../../../utils/graphDailogProperty/getDialogPropertyList';
import { getAllAxis } from '../../../utils/graphDailogProperty/getAxisObject';
import { updateGraphProperties, deleteGraphPlot, updateGraphPlot } from '../../../services/graphPageServices/GraphServices';
import * as ITEM from '../../Constant/GraphDialog';
import Breaks from './AxisSubListContent/Breaks';
import MinorTernaryLabels from './AxisSubListContent/MinorTernaryLabels';
import MinorTernaryTicks from './AxisSubListContent/MinorTernaryTicks';
import MajorTernaryTicks from './AxisSubListContent/MajorTernaryTicks';
import ScalingTernary from './AxisSubListContent/ScalingTernary';
import PieSlice from './PlotSubListContent/PieSlice';
import BoxOptions from './PlotSubListContent/BoxOptions';
import FrameLines from './GraphSubListContent/FrameLines';
import Rotation from './GraphSubListContent/Rotation';
import GridFills from './GraphSubListContent/GridFills';
import { getAxisJSON } from '../../../utils/graphDailogProperty/axisSubListJSON/getAxisInsetsJSON'
import Lines3D from './PlotSubListContent/Lines3D';
import Mesh from './PlotSubListContent/Mesh';
import ScalingAngular from './AxisSubListContent/ScalingAngular';
import PolarRadialLine from './AxisSubListContent/PolarAngularLine';
import PolarAngularLine from './AxisSubListContent/PolarRadialLine';
import RadarAxis from './AxisSubListContent/RadarAxis';
import AxisFills from './AxisSubListContent/AxisFills';
import * as actionCreators from '../../../store/Helpmenu/actions';
import CounterFills from './PlotSubListContent/CounterFills';
import CounterScale from './PlotSubListContent/CounterScale';
import CounterLabels from './PlotSubListContent/CounterLabels';
import CounterDetails from './PlotSubListContent/CounterDetails';
import { isRedoDataAvailable, isUndoDataAvailable } from '../../../store/Worksheet/SpreadSheet/actions';
import { isReRenderGraph } from '../../../store/CreateGraph/CreateDiagramPage/actions';

const getCurrAxis = (currGraph) => {
  const layout = currGraph?.layout;
  const allAxis = getAllAxis(layout, currGraph?.plotData[0].properties);
  return allAxis[0]
}

const getCurrGraph = (currGrPg:any, graphId:any) => {
  let curr = currGrPg?.graphList.filter((item) => item.id === graphId)[0]
  if(curr){
    return curr
  }
  else{
    return currGrPg?.graphList[0]
  }
}

const GraphPropertyDialog = (props) => {
  console.log(props)
  const [currGrPg, setCurrGrPg] = useState(
    props.allGraphPages[props.graphPageObject.id]
  );
  const [currGraph, setCurrGraph] = useState(getCurrGraph(currGrPg,props?.graphId));
  const [currPlot, setCurrPlot] = useState(currGraph?.plotData[0]);
  const [currAxis, setCurrAxis] = useState(getCurrAxis(currGraph))

  const [currSelectedItem, setCurrSelectedItem] = useState('Graph');
  const [currParentItem, setCurrParentItem] = useState('Graph');
  const [trackIndex, setTrackIndex] = useState(0)
  const listTrack = useRef([]);



  // useEffect(() => {
  //   props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "")
  //   let currentGraph = currGrPg.graphList.filter((item) => item.id === props.graphId)
  //   const layout = currentGraph[0].layout;
  //   const allAxis = getAllAxis(layout, currentGraph[0].plotData[0].properties);
  //   console.log(currentGraph)
  //   setCurrAxis(allAxis[0])
  //   setCurrGraph(currentGraph[0])
  //   setCurrSelectedItem('Graph');
  //   setCurrParentItem('Graph');
  //   setCurrPlot(currentGraph[0].plotData[0]);
  //   setTrackIndex(0)
  // }, [])

  useEffect(() => {
    return () => {
      // props.OpenHelpWindow("wbasics", "", ""),
      props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "")

        console.log("exit")
    }

  }, [])

  
  useEffect(() => {
   setCurrPlot(currGraph?.plotData[0]);
    const layout = currGraph?.layout;
    if(typeof layout == "object"){
      const allAxis = getAllAxis(layout, currGraph?.plotData[0].properties);
      setCurrAxis(allAxis[0])
      setCurrSelectedItem('Graph');
      setCurrParentItem('Graph');
      setTrackIndex(0)
    }    
  }, [currGraph])

 

const help = (a:string,b:string,c:string)=>{
  props.OpenHelpWindow(a,b,c)
}
  const graphOptionOnChange = (currGraph: any) => {
    const layout = currGraph?.layout;
    const allAxis = getAllAxis(layout, currGraph?.plotData[0].properties);
    setCurrAxis(allAxis[0])
    setCurrGraph(currGraph);
    setCurrSelectedItem('Graph');
    setCurrParentItem('Graph');
    setCurrPlot(currGraph?.plotData[0]);
    setTrackIndex(0)
  };

  const axisOptionOnChange = (item) => {
    
    console.log('Hellllloooooooooooooo', currGraph?.layout?.type==='polarPlot')
    if(currGraph?.layout?.graphType==='polarPlot'){
      setCurrSelectedItem('Graph');
      setCurrParentItem('Graph');
      setTrackIndex(0)
      console.log('Hellllloooooooooooooo')
    }
    setCurrAxis(item)
  };

  const plotOptionOnChange = (item) => {
    const curPlot = currGraph?.plotData.filter(data => data.id === item.key)
    setCurrPlot(curPlot[0])
    const allAxis = getAllAxis(layout, curPlot[0]?.properties);
    setCurrAxis(allAxis[0])
    setCurrSelectedItem('Graph');
    setCurrParentItem('Graph');
    setTrackIndex(0)
  };

  const plotSetFromPlotContent = (item) => {
    setCurrPlot(item)
  };

  const graphPropertyOnChange = (newLayout: any, newProperties: any) => {
    console.log("new-layout", newLayout)
    updateGraphProperties(
      currGrPg,
      currGraph,
      currPlot,
      newLayout,
      newProperties,
      props
    );
  };

  const delGraphPlot = (currPlot) => {
    deleteGraphPlot(currPlot, props, true)
  }

  const upGraphPlot = (currPlot, action) => {
    updateGraphPlot(currPlot, props, action)
  }

  const allGraph = [...currGrPg?.graphList];
  const allPlot = (currGraph?.plotData)? [...currGraph?.plotData]: [];


  const layout = currGraph?.layout;
  const properties = currPlot?.properties;
  const plotData = currPlot?.data;
  const allAxis = getAllAxis(layout, properties)
  console.log("I MAIN DIALOG",allAxis, layout,  properties)
  const dialogList = getDialogPropertiesList(layout, properties, currAxis?.key);
  listTrack.current = []
  for (const pname in dialogList) {
    const obj = {
      pname: pname,
      cname: pname
    }
    listTrack.current.push(obj)
    for (const cname in dialogList[pname]) {
      const cobj = {
        pname: pname,
        cname: cname
      }
      listTrack.current.push(cobj)
    }
  }



  console.log(dialogList)
  properties.defaultUnit = props.defaultOption.optionsCollection.GraphPage.defaultUnit?props.defaultOption.optionsCollection.GraphPage.defaultUnit:'in';

  const onSetCurrListItem = (item: string, parItem: string) => {
    for (let i = 0; i < listTrack.current.length; i++) {
      if (listTrack.current[i].pname === parItem && listTrack.current[i].cname === item) {
        setTrackIndex(i)
        break;
      }
    }
    setCurrSelectedItem(item);
    setCurrParentItem(parItem);
  };

  const contentComp = () => {
    switch (currParentItem) {
      case ITEM.GRAPH:
        return graphSubContent();

      case ITEM.AXIS:
        return axisSubContent();

      case ITEM.PLOT:
        return plotSubContent();

      case '':
        return <div>Select List Item</div>;

      default:
        return <div>Yet To Complete</div>;
    }
  };

  const graphSubContent = () => {
    switch (currSelectedItem) {
      case ITEM.GRAPH:
        return (
          <GraphContent
            titleObj={layout.title}
            properties={properties}
            layout={layout}
            OpenHelpWindow={help}
            graphPropertyOnChange={graphPropertyOnChange}
          />
        );

      case ITEM.LEGENDS:
        return <Legends
          legendProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
        />;

      case ITEM.LEGENDS_ITEMS:
        return <LegendsItem
          legendProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currGrPg={currGrPg}
          pro={props}
        />;

      case ITEM.GRAPH_PLANES:
        return <GraphPlanes
          planeProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
        />;

      case ITEM.GRIDS:
        return <Grid
          gridProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
        />;
      case ITEM.FRAME_LINES:
        return <FrameLines
          frameProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange} />
      case ITEM.ROTATION:
        return <Rotation
          rotationProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange} />

      case ITEM.GRID_FILLS:
        return <GridFills
          gridFills={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;

      case ITEM.GEOGRAPHIC:
        return <Geographic
          geog={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;

      default:
        return <div>Yet To Implement--legend</div>;
    }
  };

  const axisSubContent = () => {
    switch (currSelectedItem) {
      case ITEM.AXIS:
        return <AxisContent
          axisProp={getAxisJSON(layout, currAxis)}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key}
        />;

      case ITEM.LINES:
        if (layout.graphType === 'polarPlot' && currAxis.key === 'radialaxis') {
          return <PolarRadialLine
            linesProp={dialogList[currParentItem][currSelectedItem]}
            properties={properties}
            layout={layout}
            OpenHelpWindow={help}
            graphPropertyOnChange={graphPropertyOnChange}
            currAxis={currAxis.key}
          />
        }
        else if (layout.graphType === 'polarPlot' && currAxis.key === 'angularaxis') {

          return <PolarAngularLine
            linesProp={dialogList[currParentItem][currSelectedItem]}
            properties={properties}
            layout={layout}
            OpenHelpWindow={help}
            graphPropertyOnChange={graphPropertyOnChange}
            currAxis={currAxis.key}
          />
        }
        else if (layout.graphType === 'radarPlot') {

          return <RadarAxis
            linesProp={dialogList[currParentItem][currSelectedItem]}
            properties={properties}
            layout={layout}
            OpenHelpWindow={help}
            graphPropertyOnChange={graphPropertyOnChange}
            currAxis={currAxis.key}
          />
        }
        else {
          return <Lines
            linesProp={dialogList[currParentItem][currSelectedItem]}
            properties={properties}
            layout={layout}
            OpenHelpWindow={help}
            graphPropertyOnChange={graphPropertyOnChange}
            currAxis={currAxis.key} />;
        }

      case ITEM.SCALING:
        if (layout.hasOwnProperty('ternary')) {
          return <ScalingTernary
          OpenHelpWindow={help}
          />
        }
        else if (layout.graphType === 'polarPlot' && currAxis.key === 'angularaxis') {
          return <ScalingAngular
            scaleProp={dialogList[currParentItem][currSelectedItem]}
            properties={properties}
            layout={layout}
            OpenHelpWindow={help}
            graphPropertyOnChange={graphPropertyOnChange}
            currAxis={currAxis.key}
          />
        }

        else {
          return <Scaling
            scaleProp={dialogList[currParentItem][currSelectedItem]}
            properties={properties}
            layout={layout}
            OpenHelpWindow={help}
            graphPropertyOnChange={graphPropertyOnChange}
            currAxis={currAxis.key}
          />;
        }

      case ITEM.RADAR_LABELS_TICKS:
        return <RadarLabelsandTicks
          majorLabel={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis="angularaxis" />;

      case ITEM.MAJOR_LABELS:
        return <MajorLabels
          majorLabel={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key}
        />;

      case ITEM.MINOR_LABELS:
        return <MinorLabels
          majorLabel={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key}
        />;

      case ITEM.MAJOR_POLAR_LABELS:
        return <MajorPolarLabels
          majorLabel={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;

      case ITEM.MAJOR_TERNARY_LABELS:
        return <MajorTernaryLabels
          majorLabel={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;

      case ITEM.MINOR_TERNARY_LABELS:
        return <MinorTernaryLabels
          minTerProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;

      case ITEM.MINOR_POLAR_LABELS:
        return <MinorPolarLabels
          minorLabel={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;

      case ITEM.MINOR_TERNARY_TICKS:
        return <MinorTernaryTicks
          minTerTickProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;
      case ITEM.MAJOR_TERNARY_TICKS:
        return <MajorTernaryTicks
          majorTick={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;
      case ITEM.MAJOR_TICK_LABELS:
        return <MajorTickLabels
          majTckProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;

      case ITEM.MINOR_TICK_LABELS:
        return <MinorTickLabels
          majTckProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;

      case ITEM.MAJOR_TICKS:
        return <MajorTicks
          majorTick={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;

      case ITEM.MINOR_TICKS:
        return <MinorTicks
          majorTick={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;

      case ITEM.AXIS_FILLS:
        return <AxisFills
          axisFills={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          currAxis={currAxis.key} />;


      case ITEM.BREAKS:
        return <Breaks
        OpenHelpWindow={help}
        />;

      case '':
        return <div>Select List Item</div>;

      default:
        return <div>Yet To Implement</div>;
    }
  };

  const plotSubContent = () => {
    switch (currSelectedItem) {
      case ITEM.PLOT:
        return <PlotContent
          allPlot={allPlot}
          currPlot={currPlot}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          delGraphPlot={delGraphPlot}
          upGraphPlot={upGraphPlot}
          stateSpreadSheet={props.stateSpreadSheet}
          setPlotOnClick={plotSetFromPlotContent}
        />;

      case ITEM.DATA:
        return <Data
          dataProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          plotData={plotData}
          currGrPg={currGrPg}
          openWorksheets={props.openWorksheets}
        />;

      case ITEM.SYMBOLS:
        return <Symbols
          symbolProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          graphicCell={props.graphicCell}
          worksheetId={currGraph?.activeWorksheet}
        />;

      case ITEM.LINES:
        return <PlotLines
          linesProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          graphicCell={props.graphicCell}
          worksheetId={currGraph?.activeWorksheet}
        />;

      case ITEM.MESH:
        return <Mesh
          linesProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange} />

      case ITEM._3D_LINES:
        return <Lines3D
          linesProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange} />

      case ITEM.AREA_FILLS:
        if (layout.graphType === 'radarPlot') {
          return <AreaFillRadar
            areaProp={dialogList[currParentItem][currSelectedItem]}
            properties={properties}
            layout={layout}
            OpenHelpWindow={help}
            graphPropertyOnChange={graphPropertyOnChange}
          />;
        }
        else {
          return <AreaFills
          areaProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          graphPropertyOnChange={graphPropertyOnChange}         
          graphicCell={props.graphicCell}
          worksheetId={currGraph?.activeWorksheet}
          OpenHelpWindow={help}
        />;
        }


      case ITEM.BAR_WIDTHS:
        return <BarWidth
          barProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
        />;

      case ITEM.REFERENCE_LINES:
        return <ReferenceLines
          refreProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
        />;

      case ITEM.DROP_LINES:
        return <Droplines
          dropProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
        />;

      case ITEM.FILLS:
        return <Fills
          fillProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
          graphicCell={props.graphicCell}
          worksheetId={currGraph?.activeWorksheet}
        />;

      case ITEM.PIE_SLICES:
        return <PieSlice
          sliceProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
        />;
      case ITEM.BOX_OPTIONS:
        return <BoxOptions
          boxProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
        />;

      case ITEM.CONTOUR_FILLS:
        return <CounterFills
          fillProp={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
        />;

      case ITEM.LOCATION:
        return <Location
          location={dialogList[currParentItem][currSelectedItem]}
          properties={properties}
          layout={layout}
          OpenHelpWindow={help}
          graphPropertyOnChange={graphPropertyOnChange}
        />;

      case ITEM.CONTOUR_SCALE:
        return <CounterScale
        OpenHelpWindow={help}

          // boxProp={dialogList[currParentItem][currSelectedItem]}
          // properties={properties}
          // layout={layout}
          // graphPropertyOnChange={graphPropertyOnChange}
        />;
      case ITEM.CONTOUR_LABELS:
        return <CounterLabels
        OpenHelpWindow={help}

          // boxProp={dialogList[currParentItem][currSelectedItem]}
          // properties={properties}
          // layout={layout}
          // graphPropertyOnChange={graphPropertyOnChange}
        />;
      case ITEM.CONTOUR_DETAILS:
        return <CounterDetails
        OpenHelpWindow={help}

          // boxProp={dialogList[currParentItem][currSelectedItem]}
          // properties={properties}
          // layout={layout}
          // graphPropertyOnChange={graphPropertyOnChange}
        />;

      case '':
        return <div>Select List Item</div>;

      default:
        return <div>Yet To Implement</div>;
    }
  };



  const onkeyUp = (ev) => {
    console.log(ev)
    //UpArrowKeyPressed
    if (ev.keyCode == 40) {
      if (trackIndex < listTrack.current.length - 1) {
        setTrackIndex(trackIndex + 1)
      }
    }
    //DownArrowKeyPressed
    if (ev.keyCode == 38) {
      if (trackIndex > 0) {
        setTrackIndex(trackIndex - 1)
      }
    }

    //Enter or RightArrow
    if (ev.keyCode == 39 || ev.keyCode == 13) {
      setCurrParentItem(listTrack.current[trackIndex].pname)
      setCurrSelectedItem(listTrack.current[trackIndex].cname)
    }

  }

  return (
    <div>
      <CommonModalComp
        close={() =>
          props.actions.graphPropertyAction.isOpenGraphProperty({
            isOpen: false,
            graphId: props.graphPropertyState.isOpenGraphProperty.graphId
          })
        }
        title={'Graph Properties'}
        component={
          <>
            <div className="ms-Grid zeropad graphDialog" id="graph-pty" dir="ltr">
              <div className="ms-Grid-row"
                style={{ outline: "white" }}
                onKeyUp={onkeyUp}
                tabIndex="0"
              >
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <ListComponent
                    dialogList={dialogList}
                    currSelItem={currSelectedItem}
                    currParItem={currParentItem}
                    onSetCurrListItem={onSetCurrListItem}
                    currTrack={listTrack.current[trackIndex]}
                  />
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <GraphBanner
                    allGraph={allGraph}
                    allPlot={allPlot}
                    allAxis={allAxis}
                    currGraph={currGraph}
                    currPlot={currPlot}
                    currAxis={currAxis.key}
                    graphOptionOnChange={graphOptionOnChange}
                    axisOptionOnChange={axisOptionOnChange}
                    plotOptionOnChange={plotOptionOnChange}
                  />
                  {contentComp()}
                </div>
              </div>
            </div>
          </>
        }
        isDraggable={true}
        isModeless={false}
        keepInBounds={true}
        isBlocking={false}
      ></CommonModalComp>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    graphPropertyState: state.graphPropertyReducer,
    allGraphPages: state.notebookReducer.notebooks.allGraphPages.byId,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    stateSpreadSheet: state.instanceReducer,
    graphicCell:state.graphicCellReducer,
    defaultOption: state.optionsReducer,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),

    actions: {
      graphPropertyAction: bindActionCreators(graphPropertyAction, dispatch),
    },
    updateGraphProperty: (item) => {
      dispatch({ type: ACTION.UPDATE_GRAPH_PROPERTY, payload: item });
    },
    isUndoDataAvailable: bindActionCreators(isUndoDataAvailable, dispatch),
    isRedoDataAvailable: bindActionCreators(isRedoDataAvailable, dispatch),
    isReRenderGraph: bindActionCreators(isReRenderGraph, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphPropertyDialog);
