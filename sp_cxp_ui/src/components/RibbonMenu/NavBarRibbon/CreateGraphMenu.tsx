import {
  ActionButton,
  IContextualMenuProps,
  IContextualMenuStyleProps,
  IContextualMenuSubComponentStyles,
  Image,
} from 'office-ui-fabric-react';
import React, { useMemo, useState, useEffect } from 'react';
import Format from '../../../images/worksheet-tab-icons/FormatCells.svg';
import * as ConstantImage from '../../Constant/ConstantImage';
import { connect } from 'react-redux';
import * as ACTION from '../../Redux/actionConstants';
import { Label } from 'office-ui-fabric-react/lib/Label';
import {
  TeachingBubble,
  IStyleFunctionOrObject,
} from 'office-ui-fabric-react/lib/TeachingBubble';
import { useBoolean } from '@uifabric/react-hooks';
// import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import {
  createGraphPage
} from '../../../services/NotebookManagerServicesNew';

import { bindActionCreators } from 'redux';

import { storeGraph } from '../../../store/Worksheet/WorksheetOperation/actions';
import * as storeSpreadsheetAction from '../../../store/Worksheet/SpreadSheet/actions';
import * as TYPES from "../../../services/graphPageServices/allGraphType/GraphTypeConstants";
import { createNewGraphPage } from '../../../services/notebookManagerServices/GraphPageCreation';

import { getGraphInfo} from './Graphservice';
import { graphList } from '../Wizard/WizardServices';

import { addGraphTotheExistingPage } from '../../../services/graphPageServices/GraphServices'
import * as actionCreators from '../../../store/Helpmenu/actions';

const { ipcRenderer } = require('electron');
import { useTranslation } from 'react-i18next';
import {
  TooltipHost,
  ITooltipHostStyles,
  DirectionalHint,
} from '@fluentui/react/lib/Tooltip';
import { useId } from '@fluentui/react-hooks';
import * as toolTipId from './ToolTipIDs';
import { isRedoDataAvailable, isUndoDataAvailable } from '../../../store/Worksheet/SpreadSheet/actions';
import { isReRenderGraph } from '../../../store/CreateGraph/CreateDiagramPage/actions';
import  {summaryInfoAction} from "../../../store/SummaryInfo/actions";
import { setInitialGraphCreation } from '../../../services/UndoRedoServices';

import {
  getActiveSheetDataAsRows,
} from '../../../utils/spreadsheet/spreadsheetUtility';
import { UsedRange } from '@syncfusion/ej2-spreadsheet';
const styles: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
};

const calloutProps = { gapSpace: 0 };
const examplePrimaryButtonProps: IButtonProps = {
  children: 'Try it out',
};

const dropdownStyle: Partial<IContextualMenuSubComponentStyles> = {
  // dropdown: { width: 85 },
  callout: { maxHeight: 100, overflowY: 'auto' }
};

function CreateGraph(props) {
  const [bubbleObj, setBubbleObj] = useState({});
  const [
    teachingBubbleVisible,
    { toggle: toggleTeachingBubbleVisible },
  ] = useBoolean(false);
  const { t } = useTranslation();

  const [
    graphteachingBubbleVisible,
    { toggle: toggleGraphteachingBubbleVisible },
  ] = useBoolean(false);

  const exampleSecondaryButtonProps: IButtonProps = React.useMemo(
    () => ({
      children: 'OK',
      onClick: toggleGraphteachingBubbleVisible,
    }),
    [toggleGraphteachingBubbleVisible]
  );

  const [
    graphTypeBubbleVisible,
    { toggle: toggleGraphTypeBubbleVisible },
  ] = useBoolean(false);

  const exampleSecondaryBtnProps: IButtonProps = React.useMemo(
    () => ({
      children: 'OK',
      onClick: toggleGraphTypeBubbleVisible,
    }),
    [toggleGraphTypeBubbleVisible]
  );

  const [lineBubbleVisible, { toggle: toggleLineBubbleVisible }] = useBoolean(
    false
  );
  const [
    linescatterBubbleVisible,
    { toggle: toggleLinescatterBubbleVisible },
  ] = useBoolean(false);
  const [scatter, setScatter] = React.useState([
    {
      name: 'Simple Scatter',
      image: Format,
    },
    {
      name: 'Regression',
      image: Format,
    },
  ]);
  const [line, setLine] = React.useState([
    {
      name: 'Straight Line',
      image: Format,
    },
  ]);
  const [linescatter, setLinescatter] = React.useState([
    {
      name: 'Line & Scatter',
      image: Format,
    },
    {
      name: 'Spline Curve Line & Scatter',
      image: Format,
    },
  ]);

  const menuProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'emailMessage',
        text: 'Email message',
        iconProps: { iconName: 'Mail' },
      },
      {
        key: 'calendarEvent',
        text: 'Calendar event',
        iconProps: { iconName: 'Calendar' },
      },
    ],
  };


  useEffect(()=>{
    props.OpenHelpWindow("nbasic","","")
  
  },[])
  const scatterProps: IContextualMenuProps = {
    className: 'dropdownList',
    styles : dropdownStyle,
    items: [
      {
        key: 'simpleScatter',
        text: 'Simple Scatter',
        onClick: () => openBubble('DATAFORMAT','1', 'SP1', true)
        
        // onClick: () => createGraphinPage('lineScatter','simpleStraight','XY',{x:[3],y:[4]})

      },
      // {
      //   key: 'simpleScatterRegression',
      //   text: 'Simple Scatter - Regression',
      //   onClick: () => openBubble('DATAFORMAT','1', 'SP3', true)
      // },
      {
        key: 'multipleScatter',
        text: 'Multiple Scatter',
        onClick: () => openBubble('DATAFORMAT','1', 'SP2', true)
      },
      // {
      //   key: 'multipleScatterRegression',
      //   text: 'Multiple Scatter - Regression',
      //   onClick: () => openBubble('DATAFORMAT','1', 'SP4', true)
      // },
      {
        key: 'simpleScatterErrorBars',
        text: 'Simple Scatter - Error bars',
        onClick: () => openBubble('CALCULATIONS','1', 'SP5', true)
      },
      // {
      //   key: 'simpleScatterErrorRegression',
      //   text: 'Simple Scatter - Error Bars & Regression',
      //   onClick: () => openBubble('CALCULATIONS','1', 'SP7', true)
      // },
      {
        key: 'multipleScatterErrorBars',
        text: 'Multiple Scatter - Error Bars',
        onClick: () =>  openBubble('CALCULATIONS','1', 'SP6', true)
      },
      // {
      //   key: 'multipleScatterErrorBarsRegression',
      //   text: 'Multiple Scatter - Error Bars & Regression',
      //   onClick: () => openBubble('CALCULATIONS','1', 'SP8', true)
      // },
      {
        key: 'horizontalErrorBars',
        text: 'Horizontal Error bars',
        onClick: () =>  openBubble('CALCULATIONS','1', 'SP9', true)
      },
      {
        key: 'biDirectionalErrorBars',
        text: 'Bi directional Error Bars',
        onClick: () =>  openBubble('CALCULATIONS','1', 'SP10', true)
        // onClick: () => createGraphinPage(TYPES.SCATTER_PLOT,TYPES.BI_DIRECTIONAL_ERROR,'XY',{x:[0],y:[1],symbol_values:TYPES.WORKSHEET_COLUMNS,error1:[2],error2:[3]})
      },
      {
        key: 'verticalAsymmetricErrorBars',
        text: 'Vertical Asymmetric Error Bars',
        onClick: () =>  openBubble('DATAFORMAT','1', 'SP11', true)
      },
      {
        key: 'horizontalAsymmetricErrorBars',
        text: 'Horizontal Asymettric Error bars',
        onClick: () =>  openBubble('DATAFORMAT','1', 'SP12', true)
      },
      {
        key: 'biDirectionalAysmmetricErrorBars',
        text: 'Bi directional Asymmetric Error Bars',
        onClick: () =>  openBubble('DATAFORMAT','1', 'SP13', true)
      },
      {
        key: 'verticalPoint',
        text: 'Vertical Point',
        onClick: () => openBubble('DATAFORMAT','1', 'SP14', true)
      },
      {
        key: 'horizontalPoint',
        text: 'Horizontal Point',
        onClick: () => openBubble('DATAFORMAT','1', 'SP15', true)
      },
    ],
  };

  const lineProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'simpleScatter',
        text: 'Simple Straight',
        onClick: () => openBubble('DATAFORMAT','2', 'LP1', true)
      },
      {
        key: 'horizontalBox',
        text: 'Multiple Straight',
        onClick: () => openBubble('DATAFORMAT','2', 'LP2', true)
      },
      {
        key: 'simpleSpline',
        text: 'Simple Spline',
        onClick: () => openBubble('DATAFORMAT','2', 'LP3', true)
      },
      {
        key: 'multipleSpline',
        text: 'Multiple Spline',
        onClick: () => openBubble('DATAFORMAT','2', 'LP4', true)
      },
      {
        key: 'simpleVerticalStep',
        text: 'Simple Vertical Step',
        onClick: () => openBubble('DATAFORMAT','2', 'LP5', true)
      },
      {
        key: 'multipleVerticalStep',
        text: 'Multiple Vertical Step',
        onClick: () => openBubble('DATAFORMAT','2', 'LP6', true)
      },
      {
        key: 'simpleHorizontalStep',
        text: 'Simple Horizontal Step',
        onClick: () => openBubble('DATAFORMAT','2', 'LP7', true)
      },
      {
        key: 'multipleHorizontalStep',
        text: 'Multiple Horizontal Step',
        onClick: () => openBubble('DATAFORMAT','2', 'LP8', true)
      },
      {
        key: 'simpleVerticalMidpointStep',
        text: 'Simple Vertical Midpoint Step',
        onClick: () => openBubble('DATAFORMAT','2', 'LP9', true)
      },
      {
        key: 'multipleVerticalMidpointStep',
        text: 'Multiple Vertical Midpoint Step',
        onClick: () =>openBubble('DATAFORMAT','2', 'LP10', true)
      },
      {
        key: 'simpleHorizontalMidpointStep',
        text: 'Simple Horizontal Midpoint Step',
        onClick: () =>openBubble('DATAFORMAT','2', 'LP11', true)
      },
      {
        key: 'multipleHorizontalMidpointStep',
        text: 'Multiple Horizontal Midpoint Step',
        onClick: () => openBubble('DATAFORMAT','2', 'LP12', true)
      },
    ],
  };

  const lineScatterProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'simpleStraightLineScatter',
        text: 'Simple Straight Line & Scatter',
        onClick: () => openBubble('DATAFORMAT','3', 'LSP1', true)
      },
      {
        key: 'simple_spline_curve_line_scatter',
        text: 'Simple Spline Curve Line & Scatter',
        onClick: () => openBubble('DATAFORMAT','3', 'LSP3', true)
      },
      {
        key: 'multiple_line_scatter',
        text: 'Multiple Straight Line & Scatter',
        onClick: () => openBubble('DATAFORMAT','3', 'LSP2', true)
      },
      {
        key: 'multiple_spline_curve_line_scatter',
        text: 'Multiple Spline Curve Line & Scatter',
        onClick: () =>  openBubble('DATAFORMAT','3', 'LSP4', true)
      },
      {
        key: 'simple_line_scatter_error_bar',
        text: 'Simple Line & Scatter - Error Bars',
        onClick: () =>  openBubble('CALCULATIONS','3', 'LSP5', true)
      },
      {
        key: 'multiple_line_scatter_error_bar',
        text: 'Multiple Line & Scatter - Error Bars',
        onClick: () => openBubble('CALCULATIONS','3', 'LSP6', true)
      },
      {
        key: 'horizontal_line_scatter_error_bar',
        text: 'Horizontal Line & Scatter - Error Bars',
        onClick: () =>  openBubble('CALCULATIONS','3', 'LSP7', true)
      },
      {
        key: 'bidirectional_line_scatter_error_bar',
        text: 'Bidirectional Line & Scatter - Error Bars',
        onClick: () => openBubble('CALCULATIONS','3', 'LSP8', true)
      },
      {
        key: 'simple_vertical_line_scatter_step_plot',
        text: 'Simple Vertical Line & Scatter Step Plot',
        onClick: () =>  openBubble('DATAFORMAT','3', 'LSP9', true)
      },
      {
        key: 'multiple_vertical_line_scatter_step_plot',
        text: 'Multiple Vertical Line & Scatter Midpoint Step',
        onClick: () =>  openBubble('DATAFORMAT','3', 'LSP10', true)
      },
      {
        key: 'simple_horizontal_line_scatter_step_plot',
        text: 'Simple Horizontal Line & Scatter Step',
        onClick: () =>  openBubble('DATAFORMAT','3', 'LSP11', true)
      },
      {
        key: 'multiple_horizontal_line_scatter_step_plot',
        text: 'Multiple Horizontal Line & Scatter Step',
        onClick: () =>  openBubble('DATAFORMAT','3', 'LSP12', true)
      },
      {
        key: 'simple_horizontal_line_scatter_midpoint_step_plot',
        text: 'Simple Horizontal Line & Scatter Midpoint Step Plot',
        onClick: () =>  openBubble('DATAFORMAT','3', 'LSP13', true)
      },
      {
        key: 'multiple_vertical_line_scatter_midpoint_step_plot',
        text: 'Multiple Vertical Line & Scatter Midpoint Step',
        onClick: () =>  openBubble('DATAFORMAT','3', 'LSP14', true)
      },
      {
        key: 'simple_vertical_line_scatter_midpoint_step_plot',
        text: 'Simple Vertical Line & Scatter Midpoint Step',
        onClick: () => openBubble('DATAFORMAT','3', 'LSP15', true)
      },
      {
        key: 'multiple_horizontal_line_scatter_midpoint_step_plot',
        text: 'Multiple Horizontal Line & Scatter Midpoint Step',
        onClick: () =>  openBubble('DATAFORMAT','3', 'LSP1', true)
      },
    ]
  };

  const boxMenuProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'verticalBox',
        text: 'Vertical Box',
        onClick: () => openBubble('DATAFORMAT','10', 'BP1', true)
      },
      {
        key: 'horizontalBox',
        text: 'Horizontal Box',
        onClick:() => openBubble('DATAFORMAT','10', 'BP2', true)
      },
    ],
  };
//need clarity
  const barMenuProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'simpleBar',
        text: 'Simple Bar',
        onClick: () => openBubble('DATAFORMAT','8', 'VBCP1', true)
      },
      {
        key: 'groupedBar',
        text: 'Grouped Bar',
        onClick: () => openBubble('DATAFORMAT','8', 'VBCP2', true)
      },
      {
        key: 'simpleErrorBars',
        text: 'Vertical Bar - Error Bars',
        onClick: () => openBubble('CALCULATIONS','8', 'VBCP3', true)
      },
      {
        key: 'groupedErrorBars',
        text: 'Grouped Vertical Bar - Error Bars',
        onClick: () => openBubble('CALCULATIONS','8', 'VBCP4', true)
      },
      {
        key: 'stackVertical',
        text: 'Stack Vertical',
        onClick: () => openBubble('DATAFORMAT','8', 'VBCP5', true)
      },

      {
        key: 'simple_horizontal_bar',
        text: 'Simple horizontal Bar',
        onClick: () =>openBubble('DATAFORMAT','9', 'HBCP1', true)
      },
//  {
//   key: 'groupedErrorBars',
//   text: 'Grouped Vertical Bar - Error Bars',
//   onClick: () => openBubble('CALCULATIONS','8', 'VBCP4', true)
//   },
      {
        key: 'grouped_horizontal_bar',
        text: 'Grouped Horizontal Bar',
        onClick: () => openBubble('DATAFORMAT','9', 'HBCP2', true)
      },
      {
        key: 'simple_horizontal_error_bar',
        text: 'Horizontal Bar - Error Bars',
        onClick: () =>openBubble('CALCULATIONS','9', 'HBCP3', true)
      },
      {
        key: 'grouped_horizontal_error_bar',
        text: 'Grouped Horizontal Bar - Error Bars',
        onClick: () => openBubble('CALCULATIONS','9', 'HBCP4', true)
      },
      {
        key: 'stacked_horizontal_bar',
        text: 'Stack Vertical',
        onClick: () =>openBubble('DATAFORMAT','9', 'HBCP5', true)
      },
    ],
  };

  const polarProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'polarScatter',
        text: 'Polar Scatter',
        onClick: () =>  openBubble('CALCULATIONS','6', 'PP1', true)
      },
      {
        key: 'polarLine',
        text: 'Polar Line',
        onClick: () =>  openBubble('CALCULATIONS','6', 'PP2', true)
      },
      {
        key: 'polarLineScatter',
        text: 'Polar Line Scatter',
        onClick: () =>  openBubble('CALCULATIONS','6', 'PP3', true)
      },
    ],
  };


  const radarProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'radarScatter',
        text: 'Radar Scatter',
        onClick: () =>openBubble('DATAFORMAT','7', 'RP1', true)
        // onClick: () => {createGraphinPage(TYPES.RADAR_PLOT,TYPES.RADAR_SCATTER,'rTheta',{r:[0],theta:[1]})}
      },
      {
        key: 'radarLine',
        text: 'Radar Line',
        onClick: () => openBubble('DATAFORMAT','7', 'RP2', true)
        // onClick: () => {createGraphinPage(TYPES.RADAR_PLOT,TYPES.RADAR_LINE,'rTheta',{r:[0],theta:[1]})}
      },
      {
        key: 'radarLineScatter',
        text: 'Radar Line Scatter',
        onClick: () => openBubble('DATAFORMAT','7', 'RP3', true)
        // onClick: () => {createGraphinPage(TYPES.RADAR_PLOT,TYPES.RADAR_LINE_SCATTER,'rTheta',{r:[0],theta:[1]})}
      },
      {
        key: 'radarLineError',
        text: 'Radar Line & Error band',
        onClick: () => openBubble('DATAFORMAT','7', 'RP5', true)
        // onClick: () => {createGraphinPage(TYPES.RADAR_PLOT,TYPES.RADAR_LINE_ERROR,'rTheta',{r:[1,2],theta:[4],error:[0,3]})}
      },
      {
        key: 'radarArea',
        text: 'Radar Area',
        onClick: () => openBubble('DATAFORMAT','7', 'RP6', true)
        // onClick: () => {createGraphinPage(TYPES.RADAR_PLOT,TYPES.RADAR_AREA,'rTheta',{r:[0,3],theta:[1,4]})}
      },
    ],
  };

  const ternaryProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'ternaryScatter',
        text: 'Ternary Scatter',
        onClick: () =>openBubble('DATAFORMAT','17', 'TP1', true)
      },
      {
        key: 'ternaryLine',
        text: 'Ternary Line',
        onClick: () => openBubble('DATAFORMAT','17', 'TP2', true)
      },
      {
        key: 'ternaryLineScatter',
        text: 'Ternary Line Scatter',
        onClick: () => openBubble('DATAFORMAT','17', 'TP3', true)
      },
    ],
  };

  //done
  const areaMenuProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'simpleArea',
        text: 'Simple Area',
        onClick: () =>openBubble('DATAFORMAT','5', 'AP1', true)
        // onClick: () => {createGraphinPage(TYPES.AREA_PLOT,TYPES.SIMPLE_AREA,'XY',{x:[0],y:[4]})}
      },
      {
        key: 'multipleArea',
        text: 'Multiple Area',
        onClick: () =>openBubble('DATAFORMAT','5', 'AP2', true)
        // onClick: () => {createGraphinPage(TYPES.AREA_PLOT,TYPES.MULTIPLE_AREA,'XY',{x:[0,2],y:[1,3]})}
      },
      {
        key: 'verticalArea',
        text: 'Vertical Area',
        onClick: () => openBubble('DATAFORMAT','5', 'AP3', true)
        // onClick: () => {createGraphinPage(TYPES.AREA_PLOT,TYPES.SIMPLE_VERTICAL_AREA,'XY',{x:[0],y:[1]})}
      },
      {
        key: 'multipleVerticalArea',
        text: 'Multiple Vertical Area',
        onClick: () => openBubble('DATAFORMAT','5', 'AP4', true)
        // onClick: () => {createGraphinPage(TYPES.AREA_PLOT,TYPES.MULTIPLE_VERTICAL_AREA,'XY',{x:[0,2],y:[1,3]})}
      },
    ],
  };

  const contourProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'simpleContour',
        text: 'Contour',
        onClick: () => openBubble('DATAFORMAT', '12', 'CP1', true)
        // onClick: () => {createGraphinPage(TYPES.CONTOUR_PLOT, TYPES.SIMPLE_CONTOUR,'XYZ',{x:[1],y:[2],z:[3]})}
      },
      {
        key: 'filledContour',
        text: 'Filled Contour',
        onClick: () => openBubble('DATAFORMAT', '12', 'CP2', true)
        // onClick: () => {createGraphinPage(TYPES.CONTOUR_PLOT, TYPES.FILLED_CONTOUR,'XYZ',{x:[1],y:[2],z:[3]})}
      },
    ],
  };

  const LineProps3d: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'line_3d_trajectory',
        text: '3D Trajectory',
        onClick: () => openBubble('DATAFORMAT', '14', '_3DLP1', true)
      },
      {
        key: 'line_3d_waterfall',
        text: '3D Waterfall',
        onClick: () =>openBubble('DATAFORMAT', '14', '_3DLP2', true)
      },
    ],
  };


  /* Create graph changes codes*/

  const getSubgraphType = () => {
    return 'simple';
  };

  const getDataFormat = () => {
    return 'XY';
  };

  const getActiveWorksheetClient = () => {
    const client = props.openWorksheets.filter((data) => {
      if (props.activeWorksheet === data.key) {
        return true;
      }
      return false;
    });
    return client[0].client;
  };


  const getGraphId = (worksheetId: string) => {
    let graphLength = 0;
    let activeNotebook='';
    // props.notebooks.forEach(element => {
    //   element.children.forEach(item => {
    //     if(item.worksheet.id === worksheetId){
    //       console.log(item)
    //       console.log("ACTIVE-->", worksheetId)
    //       console.log(element)
    //       graphLength = item.graph.length+1;
    //       activeNotebook = element.name

    //       // props.actions.storeGraphToSection(props.notebooks)
    //       return true;
    //     }
    //   })
    // });

    const actSec = props.notebooks.allSections.byId[props.allActiveItem.section]
    const actWrk = props.notebooks.allWorksheets.byId[actSec.worksheetId]
    const actNbk = props.notebooks.allNotebooks.byId[actWrk.parentNotebookId]
    return [actWrk.id + actNbk.allGraphPagesId.length, actNbk.allGraphPagesId.length, actNbk.name];

  };

  const createnewGraphObject = (graphName: string) => {
    let activeWorksheetClient = getActiveWorksheetClient();
    const subGraphType = getSubgraphType();
    const format = getDataFormat();

    const [graphId, graphCount, activeNotebook] = getGraphId(props.activeWorksheet)
    console.log(graphId, graphCount);

    const graphInfo = {
      id: graphId,
      name: `Graph${graphCount} - ${activeNotebook}`,
      type: 'scatter',
      subType:subGraphType,
      format,
      activeWorksheet: props.activeWorksheet,
      activeWorksheetClient,
      data:{x:[1],y:[2]}
    };

    return graphInfo;
  };


  function createGraph(graphType: string) {
    const graphObject = createnewGraphObject('graph');
    graphObject.graphType = graphType;

    let isGraphExist = props.activeItems.filter(
      (item) => item.id == graphObject.id
    );

    console.log("I am Inside Creaate Graph------------------------------")
    console.log(props);
    console.log(isGraphExist);
    console.log(graphObject.id);
    if (!isGraphExist.length) {
      props.setActiveItem(graphObject);
      props.setSelectedPivotItem(graphObject.id);
    }

  }
  /** End Here */

  const createGraphinPage = (graphType: string, subGraphType: string, format:string, data:Object) =>{

    // need to move this method inside Graph Services and
    // need to call inside createGaphPage in Notebook Services.

    // const graphObject = createnewGraphObject('graph');
    // graphObject.graphType = graphType;

    const graphObject = {
      graphType,
      subGraphType,
      format,
      data
    }
    console.log("hello inside graph in page")
    console.log(graphObject, "insidectraet")
    if(graphObject.graphType == "mesh3D"){
    let plotData= [[]]
    plotData =graphObject.data;
    console.log(plotData)
    var gridData=getActiveSheetDataAsRows(props.stateSpreadSheet.instance);
    console.log(gridData);
    gridData=transposeRowsToColumnsForSpreadsheet(gridData);
    console.log(gridData);
    let loopLength = 0;
    let plotObj = {
      x: [],
      y: [],
      z: [],
    }
    if (plotData.y && plotData.x && plotData.z) {
      loopLength = plotData.z.length
      for (let index = 0; index < loopLength; index++) {
        let x_index = null;
        let y_index = null;
        let z_index = null;
     
        if (plotData.x.length === 1) {
          console.log(gridData[plotData.x[0]]);
         
          plotObj.x = getDataFromGrid(gridData[plotData.x])
          console.log(plotObj.x)
          x_index =plotObj.x
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
        console.log(plotObj);
      }

    }
    let lengthisEqual=plotObj.x.length===plotObj.y.length?plotObj.x.length===plotObj.z.length?true:false:false
    console.log(lengthisEqual);
    if(lengthisEqual == false){
      alert("Mesh Plot requires equal length of columns to plot the graph.Please select columns with equal lengths")
    }else{
      if(props.allActiveItem.graphPage && props.allActiveItem.graphPage.id) {
        console.log(props, "insidectraet")
        let currentGraphPage = props.notebooks.allGraphPages.byId[props.allActiveItem.graphPage.id]
        addGraphTotheExistingPage(currentGraphPage, graphObject, props)
      } else {
        createGraphPage(props, graphObject)
      }
    }
  }else{
        if(props.allActiveItem.graphPage && props.allActiveItem.graphPage.id) {
      console.log(props, "insidectraet")
      let currentGraphPage = props.notebooks.allGraphPages.byId[props.allActiveItem.graphPage.id]
      addGraphTotheExistingPage(currentGraphPage, graphObject, props)
    } else {
      createGraphPage(props, graphObject)
    }
  }


  }
   const getDataFromGrid = (column) => {
    console.log('column', column);
    if(!column){
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
   const transposeRowsToColumnsForSpreadsheet = (grid) => {
    const transposedData = grid[0].map((_, colIndex) =>
      grid.map((row) => row[colIndex])
    );
    return transposedData;
  };
  useEffect(() => {
    if (ipcRenderer.rawListeners('fromWorksheetWizard').length === 0) {
      ipcRenderer.on('fromWorksheetWizard', function (event, arg){
        setInitialGraphCreation(true);
        let values = getGraphInfo(arg)
        console.log(arg, "short window")
        console.log(values, "long window")
        createGraphinPage(values.graphtype, values.graphstyle, values.dataformat, values.result)
    });
    }
  return () => {
    if(ipcRenderer != undefined ){
      ipcRenderer.removeAllListeners('fromWorksheetWizard')
    }
  }
})


  const CustomTeachingBubble = (props) => {
    return (
      <>
        {
          <TeachingBubble
            calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
            target={`#${props.id}`}
            isWide={true}
            hasCloseButton={true}
            closeButtonAriaLabel="Close"
            onDismiss={props.toggle}
            headline={props.headline}
            styles={{
              body: {
                background: '#fff',
              },
              root: {
                background: '#fff',
              },
            }}
          >
            <div className="ms-Grid">
              <div className="ms-Grid-row" style={{ display: 'block' }}>
                {props.data.map((a) => (
                  <div
                    className="ms-Grid-col ms-lg2"
                    style={{ display: 'inline-table' }}
                  >
                    <div
                      className={
                        !props.smartToggle
                          ? 'ribbon-gbutton lastBox-btn'
                          : 'ribbon-gbutton sim-ribbon-gbutton'
                      }
                    >
                      <Image
                        alt="ribbon-icon"
                        className="ribbon-icon-svg "
                        src={a.image}
                      />
                      {/* <ActionButton className="box-btn" allowDisabledFocus  > */}
                      <Label>{a.name}</Label>
                      {/* </ActionButton> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TeachingBubble>
        }
      </>
    );
  };

  const checkSheet = () => {
    var activeSheet = props.stateSpreadSheet.instance.getActiveSheet();
    var address = activeSheet?.usedRange || undefined;
    let rowData = address.colIndex;
    let rowInfo = address.rowIndex
    console.log(rowData,"000000>>", rowInfo, "hellooo", address, "inside-->")
    if(rowData == 0 && rowInfo == 0){
        return true
    }
    return false;
  }

  const openWizard = (format,graphType, graphStyle, isStepExists, dataselection) => {
    let checkEmptySpreadsheet = checkSheet();
    if (checkEmptySpreadsheet === false) {
      let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
      let Data = {
        message: 'Hi',
        someData: "Let's go",
        path: 'graphWizard',
        sheetData: sheetData,
        stepType: isStepExists?format:'',
        graphType:graphType,
        graphStyle: graphStyle,
        dataselection: dataselection || undefined
      };
      // Send information to the main process
      // if a listener has been set, then the main process
      // will react to the request !
      ipcRenderer.send('request-mainprocess-action', Data);
    } else {
      alert("There is no data in your worksheet")
    }
  };

  const openBubble = (format, graphType, graphStyle, isStepExists) => {
    //  toggleGraphteachingBubbleVisible();
    //  setBubbleObj(param);
    openWizard(format,graphType, graphStyle, isStepExists);
  };

  const opengrphTypeBubble = (param) => {
    toggleGraphTypeBubbleVisible();
    setBubbleObj(param);
  };

  let isCreationEnable = false;
  if(props.allActiveItem.section){
    isCreationEnable =props.notebooks.allSections.byId[props.allActiveItem.section] && props.notebooks.allSections.byId[props.allActiveItem.section].worksheetId
  }

  return (
    <div className="ms-Grid" dir="ltr">
      {graphteachingBubbleVisible && (
        <TeachingBubble
          target={'#' + bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={toggleGraphteachingBubbleVisible}
          headline={bubbleObj.title}
        >
          <div className="ms-Grid">
            <div className="ms-Grid-row d-flex">
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                <div className="LayoutPage-demoBlock">
                  <img
                    src={ConstantImage.GraphWizardImg}
                    className={'bubbleImg'}
                  />
                </div>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                <div className="LayoutPage-demoBlock">{bubbleObj.message}</div>
              </div>
            </div>
          </div>
        </TeachingBubble>
      )}
      {graphTypeBubbleVisible && (
        <TeachingBubble
          target={'#' + bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryBtnProps}
          onDismiss={toggleGraphTypeBubbleVisible}
          headline={bubbleObj.title}
        >
          {bubbleObj.message}
        </TeachingBubble>
      )}
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ribbon-container">
          <div className="ribbon-btn-box mrspace">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-button'
              }
            >
              <div
                id="graphWizardID"
                onClick={() =>
                  openBubble('GRAPHTYPE', '1', 'SP1', false)
                }
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton lastBox-btn'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
              >
                <TooltipHost
                  content={t("Create a graph on a new graph page or on an existing graph page")}
                  closeDelay={100}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.GraphWizard}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Graph Wizard
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Create</label>
          </div>
         
          <div className="ribbon-btn-box mrspace">
            <div
              className={
                isCreationEnable
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button disableItem'
              }
            >
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
                id="scatterId"
                // onClick={toggleTeachingBubbleVisible}
              >
                  <TooltipHost
                  content={t("Plot data as XY Points using symbols")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.ScatterGraph}
                />
                <ActionButton
                  className="box-btn"
                  menuProps={scatterProps}
                >
                  Scatter
                </ActionButton>
                </TooltipHost>
              </div>
              {teachingBubbleVisible && (
                <CustomTeachingBubble
                  id="scatterId"
                  headline={'Scatter Plot'}
                  data={scatter}
                  toggle={toggleTeachingBubbleVisible}
                />
              )}
              <div
                id="lineId"
                // onClick={toggleLineBubbleVisible}
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                 <TooltipHost
                  content={t("Plot data as XY Points connected by lines")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.LineGraph}
                />
                <ActionButton
                  className="box-btn"
                  allowDisabledFocus
                  menuProps={lineProps}
                >
                  Line
                </ActionButton>
                </TooltipHost>
              </div>
              {lineBubbleVisible && (
                <CustomTeachingBubble
                  id="lineId"
                  headline={'Line Plot'}
                  data={line}
                  toggle={toggleLineBubbleVisible}
                />
              )}
              <div
                id="linescatterId"
                // onClick={toggleLinescatterBubbleVisible}
                // onClick={() => createGraphinPage('lineScatter','simpleStraight','XY',{x:[3],y:[4]})}
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
                // style = {{ paddingTop : '5px'}}
              >
                 <TooltipHost
                  content={t("Plot data as XY Points connected using symbols connected with lines")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.LineScatterGraph}
                />
                <ActionButton
                  className="box-btn"

                  allowDisabledFocus
                  menuProps={lineScatterProps}
                >
                  {t("Line\u00a0and Scatter")}
                </ActionButton>
                </TooltipHost>
              </div>
              {linescatterBubbleVisible && (
                <CustomTeachingBubble
                  id="linescatterId"
                  headline={'Line and Scatter Plot'}
                  data={linescatter}
                  toggle={toggleLinescatterBubbleVisible}
                />
              )}
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                 <TooltipHost
                  content={t("Plot data as X or Y values with horizontal and vertical bars ")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.BarGraph}
                />
                <ActionButton
                  className="box-btn"
                  menuProps={barMenuProps}
                >
                  Bar
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                <TooltipHost
                  content={t("Plot data as line plots and fill colors")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.AreaGraph}
                />
                <ActionButton
                  className="box-btn"
                  allowDisabledFocus
                  menuProps={areaMenuProps}
                >
                  Area
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                 <TooltipHost
                  content={t("Plot data using angles and distance from the center")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.PolarScatterGraph}
                />
                <ActionButton
                  className="box-btn"
                  allowDisabledFocus
                  menuProps={polarProps}
                >
                  Polar
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                 <TooltipHost
                  content={t("Plot multiple variables using distance from the origin")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.RadarScatterGraph}
                />
                <ActionButton
                  className="box-btn"
                  allowDisabledFocus
                  menuProps={radarProps}
                >
                  Radar
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                 <TooltipHost
                  content={t("Plot the normalise proportions of three substances in a triangle")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.TernaryLineGraph}
                />
                <ActionButton
                  className="box-btn"
                  allowDisabledFocus
                  menuProps={ternaryProps}
                >
                  Ternary
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                 <TooltipHost
                  content={t("Plot the data as media and percentile")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.BoxGraph}
                />
                <ActionButton
                  className="box-btn"
                  allowDisabledFocus
                  menuProps={boxMenuProps}
                >
                  Box
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
                onClick={
                  () => openBubble('DATAFORMAT','11', 'PC1', true)
                      //  () => createGraphinPage(TYPES.PIE_PLOT,TYPES.PIE_PLOT,'XY',{x:[0],y:[1]})

                //   () => createGraphinPage(
                //   TYPES.PIE_PLOT,
                //   TYPES.PIE_PLOT,
                //    'pie',
                //  {values:[3]})
                }
              >
                <TooltipHost
                  content={t("Plot the data as percent of total")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.PieGraph}
                />
                <ActionButton className="box-btn" disabled allowDisabledFocus>
                  Pie
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
                onClick ={()=> openBubble('DATAFORMAT', '18', 'BP1', true)}
              >
                <TooltipHost
                  content={t("Plot bubbles of various sizes on XY Plane")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.BubbleGraph}
                />
                <ActionButton className="box-btn" disabled allowDisabledFocus>
                  {t("Bubble")}
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop' 
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
                // onClick={()=>createGraphinPage('heatMap','heatMap','XYZ',{x:[0],y:[1],z:[2,3,]})}
                onClick={ () => openBubble('DATAFORMAT','4', 'HM1', true)}
              >
                <TooltipHost
                  content={t("Plot the data as in map")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.VectorGraph}
                />
                <ActionButton className="box-btn" disabled allowDisabledFocus>
                {t("Heat\u00a0Map")}
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton lastBox-btn graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
                // onClick={()=>createGraphinPage('choroplethMap','choroplethMap','XY',{x:[0],y:[1]})}
                onClick ={()=>openBubble('DATAFORMAT', '19', 'CM1', true)}
              >
                <TooltipHost
                  content={t("Plot the data as in map")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg "
                  src={ConstantImage.ForestGraph}
                />
                <ActionButton className="box-btn" allowDisabledFocus>
                {t("Maps")}
                </ActionButton>
                </TooltipHost>
              </div>

              {/* <div
                id="graphTypeID"
                onClick={() =>
                  opengrphTypeBubble({
                    id: 'graphTypeID',
                    title: 'New Graph Types',
                    message:
                      "Get in-depth analysis within minutes using SigmaPlot 15's new graph types",
                  })
                }
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton lastBox-btn'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg "
                  src={ConstantImage.NewGraphType}
                />
                <ActionButton className="box-btn" allowDisabledFocus>
                  New Graph Types
                </ActionButton>
              </div> */}
            </div>
            <label className="ribbon-boxbtn-lbl">2D Graphs</label>
          </div>
         
          <div className="ribbon-btn-box">
            <div
              className={
                isCreationEnable
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button disableItem'
              }
            >
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                   <TooltipHost
                  content={t("Plot 3D data as contour outlines in a 2D space")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.ContourGraph}
                />
              
                <ActionButton
                  className="box-btn"
                  allowDisabledFocus
                  menuProps={contourProps}
                >
                  Contour
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
                onClick ={()=>openBubble('DATAFORMAT', '13', '_3DSP1', true)}
              >
                   <TooltipHost
                  content={t("Plot data as XYZ points in 3D space")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.Scatter_3D}
                />
                <ActionButton className="box-btn" disabled allowDisabledFocus>
                  3D Scatter
                </ActionButton>
                </TooltipHost>
              </div>
              <div
              // style = {{ paddingTop : '5px'}}
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }

              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.Line_3D}
                />
                   <TooltipHost
                  content={t("Plot data as XYZ points connected with lines")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <ActionButton
                  className="box-btn"

                  allowDisabledFocus
                  menuProps={LineProps3d}
                >
                  3D Line
                </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
                onClick ={()=>openBubble('DATAFORMAT','15','_3DMP1', true)}

              >
                     <TooltipHost
                  content={t("Plot data as a 3D space")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.Mesh_3D}
                />
              
                <ActionButton className="box-btn" allowDisabledFocus>
                  3D Mesh
                </ActionButton>
                </TooltipHost>
              </div>
              {/* <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.Bar_3D}
                />
                <ActionButton className="box-btn" allowDisabledFocus>
                  3D Bar
                </ActionButton>
              </div> */}
            </div>
            <label className="ribbon-boxbtn-lbl">3D Graphs</label>
          </div>
          {/* <div className="v-hr"></div>
          <div className="ribbon-btn-box">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-submenubutton'
              }
            >
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton singleIcon lastBox-btn'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.AddToGallery}
                />
                <ActionButton className="box-btn" allowDisabledFocus>
                  Add To Gallery
                </ActionButton>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Graph Gallery</label>
          </div>
          <div className="v-hr"></div> */}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (canvasState) => {
  return {
    activeItems: canvasState.notebookReducer.activeItems,
    notebooks: canvasState.notebookReducer.notebooks,
    activeWorksheet: canvasState.worksheetOperationReducer.activeWorksheet,
    openWorksheets: canvasState.worksheetOperationReducer.openWorksheets,
    openGraphs: canvasState.worksheetOperationReducer.openGraphs,
    allActiveItem: canvasState.notebookReducer.allActiveItem,
    stateSpreadSheet: canvasState.instanceReducer,
    defaultOption: canvasState.optionsReducer,
    licenseInfo: canvasState.licenseInfoReducer,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    OpenHelpWindow: (RibbonMenu:string,selectedElement:string,selectedItem:string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu,selectedElement,selectedItem)),

    setActiveItem: (graphData) => {
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: graphData });
    },
    setSelectedPivotItem : (pvtItem)=>{
      dispatch({ type : 'SET_SELECTED_PIVOT_ITEM', payload : pvtItem})
    },
    addGraphPage : (graphPage)=>{
      dispatch({ type : 'ADD_GRAPHPAGE', payload : graphPage})
    },
    setAllActiveItem: (allactiveItem: IActiveItems) => {
      dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
    },
    storeGraph: bindActionCreators(storeGraph, dispatch),
    storeSpreadsheet: bindActionCreators(storeSpreadsheetAction, dispatch),
    updateGraphProperty: (item) => {
      dispatch({ type: ACTION.UPDATE_GRAPH_PROPERTY, payload: item });
    },
    isUndoDataAvailable: bindActionCreators(isUndoDataAvailable, dispatch),
    isRedoDataAvailable: bindActionCreators(isRedoDataAvailable, dispatch),
    isReRenderGraph: bindActionCreators(isReRenderGraph, dispatch),
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
  };
  
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGraph);
