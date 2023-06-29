import {
  ActionButton,
  Dropdown,
  IconButton,
  IContextualMenuProps,
  IIconProps,
  Image,
  IDropdownOption,
  ComboBox,
  IComboBoxStyles,
  IDropdownStyles,
  IComboBoxOption,
  IComboBoxProps,
} from 'office-ui-fabric-react';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
// import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import Paste from '../../../images/worksheet-tab-icons/Paste.svg';
import * as ConstantImage from '../../Constant/ConstantImage';
import * as ConstantFunc from '../../Constant/ConstantFunction';
//import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { useBoolean } from '@uifabric/react-hooks';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import {
  setSelectedNode,
  isSetRuler,
  isShowGrids,
  isSetSnapTo,
  setCopiedEleID,
  isReRenderGraph,
  setSelectedElements
} from '../../../store/CreateGraph/CreateDiagramPage/actions';
import * as ElementTypes from '../../Graph/DigramComponent/ShapeNodes';
import * as ACTION from '../../Redux/actionConstants';
import {
  buildPlotData,
  deleteGraphPlot,
  deleteTheElementsFromPage,
  modifyPlotData,
  pasteGraphTotheExisting,
  pasteTheElement
} from '../../../services/graphPageServices/GraphServices';
import { addNewGraphState, setGraphReload } from '../../../services/UndoRedoServices';
import { getGraphInfo } from './Graphservice';

import { PlotDataListModal } from './PlotDataListModal';
import { index } from 'mathjs';
import { pasteItem } from '../../../services/NotebookManagerServicesNew';
import Deleteplot from './ManagePlots/Deleteplot';
import Modifyplot from './ManagePlots/Modifyplot';
import PlotLabel from './ManagePlots/Plotlabel';
import * as optionsAction from '../../../store/MainWindow/Options/actions';
import { setOptions } from './Options/OptionsService';
const { ipcRenderer } = require('electron');
import { storeGraph } from '../../../store/Worksheet/WorksheetOperation/actions';
import Addaxis from './ManagePlots/AddAxis';

import { useTranslation } from 'react-i18next';
import { addClass } from "@syncfusion/ej2-base";
import {
  TooltipHost,
  ITooltipHostStyles,
  DirectionalHint,
} from '@fluentui/react/lib/Tooltip';
import { useId } from '@fluentui/react-hooks';
import * as toolTipId from './ToolTipIDs';
import * as actionCreators from '../../../store/Helpmenu/actions'
import * as graphPropertyAction from '../../../store//GraphProperty/GraphProperty/actions';
import {
  isRedoDataAvailable,
  isUndoDataAvailable,
} from '../../../store/Worksheet/SpreadSheet/actions';
import { graphTypes, graphStyle } from "../Wizard/GraphList/GraphTypes";
import {
  SPGraphStyle, LPGraphStyle, LSPGraphStyle, HMGraphStyle,
  APGraphStyle, PPGraphStyle, RPGraphStyle, VBCGraphStyle, HBCGraphStyle,
  BPGraphStyle, PCGraphStyle, CPGraphStyle, _3DSPGraphStyle, _3DLPGraphStyle,
  _3DMPGraphStyle, _3DBPGraphStyle, TPGraphStyle, BubPGraphStyle, CMGraphStyle,
  FPGraphStyle
} from '../Wizard/GraphList/GraphStyle';
import { NodeModel } from '@syncfusion/ej2-react-diagrams';
const styles: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
};

const calloutProps = { gapSpace: 0 };

const dropdownStyle: Partial<IDropdownStyles> = {
  // dropdown: { width: 85 },
  callout: { maxHeight: 250, overflowY: 'auto' }
};
const comboBoxStyles: Partial<IComboBoxStyles> = {
  root: {
    //  width:'162px',
    height: '28px',
    border: '1px solid white',
    borderWidth: 'none',
    borderStyle: 'none'
  },
  container: {
    border: '1px solid white',
    borderWidth: 'none',
    borderStyle: 'none'
  },

  optionsContainerWrapper: {
    maxHeight: '300px',
    width: '154px'

  },
};
const comboBoxStylesFontSize: Partial<IComboBoxStyles> = {
  root: {
    //  width:'162px',
    height: '28px',
    border: '1px solid white',
    borderWidth: 'none',
    borderStyle: 'none'
  },
  // container:{
  //   border:'1px solid white',
  //   borderWidth:'none',
  //   borderStyle:'none'
  // },

  optionsContainerWrapper: {
    maxHeight: '300px',
    width: '101px'

  },
};

function GraphPage(props: any) {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isModifyOpen, setModifyOpen] = useState(false);
  const [isLabelOpen, setLabelOpen] = useState(false);
  const [disablePlot, setDisablePlot] = useState(true);
  const [isAxisOpen, setAxisOpen] = useState(false);
  const [axis, setaxis] = useState();
  const [position, setposition] = useState();
  const [plot, setplot] = useState();
  const [disableAXisclass, setdisableAXisclass] = useState(false);
  const [autoComplete, allowFreeform] = useBoolean(true)

  // const [currGrPg, setCurrGrPg] = useState(
  //   props.allGraphPages[props.grPageProps.graphPageData.id]
  // );
  const { t } = useTranslation();
  let colorRef;
  let previewIcon;
  const onCreated = () => {
    const elem = colorRef.element.nextElementSibling;
    console.log("previewIcon contains", elem);
    previewIcon = elem.querySelector(".e-selected-color");
    // setPreviewIcon(elem.querySelector('.e-selected-color'))
    addClass([previewIcon], "e-icons");
  };
  useEffect(() => {
    props.OpenHelpWindow("gpbasics1", "", "")

  }, [])
  useEffect(() => {
    if (props.allActiveItem.graphPage && props.allActiveItem.graphPage.id) {
      let activeGraphId = props.allActiveItem.graphPage.id;
      let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId]
      console.log("graphPropertyState", props.allActiveItem)
      for (let i = 0; i < allGraphsInPage.graphList.length; i++) {
        if (allGraphsInPage.graphList[i].id == props.graphPropertyState.isOpenGraphProperty.graphId) {
          if (allGraphsInPage.graphList[i].layout.hasOwnProperty('scene') == true) {
            setdisableAXisclass(true)
          }
          else if (allGraphsInPage.graphList[i].layout.hasOwnProperty('ternary') == true) {
            setdisableAXisclass(true)
          }
          else if (allGraphsInPage.graphList[i].layout.hasOwnProperty('polar') == true) {
            setdisableAXisclass(true)
          }
          // else if(allGraphsInPage.graphList[0].properties.type=='pie'){
          //   alert("4")
          // }
          else {
            setdisableAXisclass(false)
          }
        }
      }
    }
  }, [props])

  useEffect(() => {
    // console.log("123",props.pageInstance.selectedItems.nodes)
    if (props.allActiveItem.selectedItemOnNotebook === '') {
      console.log('2');
    } else {
      console.log('1');
      setDisablePlot(false);
    }
  }, [props]);

  const fontMapping: { [fontName: string]: string } = {
    ["Arial"]: '"Arial", "Arial_MSFontService", sans-serif',
    ["Arial Black"]: '"Arial Black", "Arial Black_MSFontService", sans-serif',
    ["Times New Roman"]:
      '"Times New Roman", "Times New Roman_MSFontService", serif',
    ["Comic Sans MS"]:
      '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy',
    ["Calibri"]: "Calibri, Calibri_MSFontService, sans-serif",
    ["Cambria"]: "Cambria, Cambria_MSFontService, sans-serif",
    ["Cambria Math"]: "Cambria Math, Cambria Math_MSFontService, sans-serif",
    ["Candara"]: "Candara, Candara_MSFontService, sans-serif",
    ["Courier New"]: "Courier New, Courier New_MSFontService, sans-serif",
    ["Axettac Demo"]: "Axettac Demo, Axettac Demo_MSFontService, sans-serif",
    ["Georgia"]: "Georgia, Georgia_MSFontService, sans-serif",
    ["Batang"]: "Batang, Batang_MSFontService, sans-serif",
    ["Roboto"]: "Roboto, Roboto_MSFontService, sans-serif",
    ["Tahoma"]: "Tahoma, Tahoma_MSFontService, sans-serif",
    ["Verdana"]: "Verdana, Verdana_MSFontService, sans-serif",
    ["Helvetica"]: "Helvetica, Helvetica_MSFontService, sans-serif",
    ["Book Antiqua"]: "Book Antiqua, Book Antiqua_MSFontService, sans-serif",
    ["Candara New"]: "Candara New, Candara New_MSFontService, sans-serif",
    ["Din Condensed"]: "Din Condensed, Din Condensed_MSFontService, sans-serif",
    ["Helvetica New"]: "Helvetica New, Helvetica New_MSFontService, sans-serif",
  };
  const fontSizeMapping: { [fontName: string]: string } = {
    ["8"]: '"8"',
    ["10"]: '"10"',
    ["12"]: '"12"',
    ["14"]: '"14"',
    ["16"]: '"16"',
    ["18"]: '"18"',
    ["20"]: '"20"',
    ["22"]: '"22"',
    ["24"]: '"24"',
    ["26"]: '"26"',
    ["28"]: '"28"',
    ["30"]: '"30"',
    ["32"]: '"32"',
    ["34"]: '"34"',
    ["36"]: '"36"',
    ["38"]: '"38"',
    ["40"]: '"40"',
    ["42"]: '"42"',
    ["44"]: '"44"',
    ["46"]: '"46"',
    ["48"]: '"48"',
    ["50"]: '"50"',
    ["52"]: '"52"',
    ["54"]: '"54"',
    ["56"]: '"56"',
    ["58"]: '"58"',
    ["60"]: '"60"',
    ["62"]: '"62"',
    ["64"]: '"64"',
    ["66"]: '"66"',
    ["68"]: '"68"',
    ["70"]: '"70"',
    ["72"]: '"72"',
    ["74"]: '"74"',
    ["76"]: '"76"',


  };
  const fonts = Object.keys(fontMapping);
  const fontSize = Object.keys(fontSizeMapping);
  const optionsWithFont: IComboBoxOption[] = fonts.map((fontName: string) => ({
    key: fontName,
    text: fontName,
    styles: {
      optionText: {
        fontFamily: fontMapping[fontName],
        overflow: 'visible',
        whiteSpace: 'normal',
      },
    },
  }));
  const optionsWithFontSize: IComboBoxOption[] = fontSize.map((fontName: string) => ({
    key: fontName,
    text: fontName,
    styles: {
      optionText: {
        fontFamily: fontMapping[fontName],
        overflow: 'visible',
        whiteSpace: 'normal',
      },
    },
  }));

  const [selectedFontKey, setSelectedFontKey] = React.useState<string | undefined>('');
  const [selectedFontSizeKey, setSelectedFontSizeKey] = React.useState<string | undefined>('');

  const _onChangeFontSize: IComboBoxProps['onChange'] = (event, option) => {
    console.log('******FONT*******')
    console.log(event, option)
    setSelectedFontSizeKey(option!.key as string);

    if (props.pageInstance.selectedItems.nodes.length) {
      props.pageInstance.selectedItems.nodes[0].style.fontSize = option!.key as string;
      //  setFontSize(option.key);
    }
  }
  const _onChangeFont: IComboBoxProps['onChange'] = (event, option) => {
    console.log(event, option)
    setSelectedFontKey(option!.key as string);
    if (props.pageInstance.selectedItems.nodes.length) {
      props.pageInstance.selectedItems.nodes[0].style.fontFamily = option!.key as string;
    }

  }

  const [isAddPlot, setIsAddPlot] = useState(false);
  const [isModifyPlot, setIsModifyPlot] = useState(false);
  const [selectedPlotData, setSelectedPlotData] = useState({});
  const [defaultSize, setFontSize] = useState(8);

  const DeleteCurrentplot = (currentPlot) => {
    deleteGraphPlot(currentPlot, props);
  };
let selectedGraphType: string
  const AddingPlot = (selectedGraphType) =>{
  let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
  let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
  if (allGraphsInPage && allGraphsInPage.graphList && props.pageInstance.selectedItems.nodes.length > 0) {
    addPlot('GRAPHTYPE', '1', 'SP1', true,selectedGraphType);

  }
  else {
    alert("Please select graph")
  }

}

  const openWizard = (format, graphType, graphStyle, isStepExists, dataSelection, selectedGraphType) => {
    let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
    let Data = {
      message: 'Hi',
      someData: "Let's go",
      path: 'graphWizard',
      sheetData: sheetData,
      stepType: isStepExists ? format : '',
      graphType: graphType,
      graphStyle: graphStyle,
      dataselection: dataSelection || undefined,
      selectedGraphType: selectedGraphType
    };

    // Send information to the main process
    // if a listener has been set, then the main process
    // will react to the request !
    ipcRenderer.send('request-mainprocess-action', Data);
  };
  
  // addPlot('GRAPHTYPE', '1', 'SP1', true);
  const addPlot = (format, graphType, graphStyle, isStepExists, selectedGraphType) => {
    setIsAddPlot(true);
    openWizard(format, graphType, graphStyle, isStepExists, undefined, selectedGraphType);
  };

  const modifyPlot = () => {
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
    if (allGraphsInPage &&
      allGraphsInPage.graphList &&
      props.pageInstance.selectedItems.nodes.length > 0
    ) {
      setModifyOpen(true)
      setIsModifyPlot(true)
    }
    else {
      alert("Please select graph")
    }
  };
  const plotLabel = () => {
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
    if (allGraphsInPage && allGraphsInPage.graphList && props.pageInstance.selectedItems.nodes.length > 0) {
      setLabelOpen(true)

    }
    else {
      alert("Please select graph")
    }
  }
  const openBubble = (format, graphType, graphStyle, isStepExists, dataSelection) => {
    //  toggleGraphteachingBubbleVisible();
    //  setBubbleObj(param);
    openWizard(format, graphType, graphStyle, isStepExists, dataSelection);
  };
  const ModifySingleplot = (allPlots) => {
    setSelectedPlotData(allPlots)
    console.log("here graph type and sub", allPlots.subGraphType, allPlots.graphType)
    let graphStyle1, graphType1
    for (let i = 0; i < graphTypes.length; i++) {
      if (graphTypes[i].name == allPlots.graphType) {
        graphType1 = graphTypes[i].id
      }
    }


    if (graphType1 == 11) {
      for (let i = 0; i < PCGraphStyle.length; i++) {
        if (PCGraphStyle[i].name == allPlots.subGraphType) {
          graphStyle1 = PCGraphStyle[i].id
        }
      }
      openBubble('DATASELECTION', '11', 'PC1', true, '41')

    }
    else {

      if (graphType1 == 1) {
        for (let i = 0; i < SPGraphStyle.length; i++) {
          if (SPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = SPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 2) {
        for (let i = 0; i < LPGraphStyle.length; i++) {
          if (LPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = LPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 3) {
        for (let i = 0; i < LSPGraphStyle.length; i++) {
          if (LSPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = LSPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 4) {
        for (let i = 0; i < HMGraphStyle.length; i++) {
          if (HMGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = HMGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 5) {
        for (let i = 0; i < APGraphStyle.length; i++) {
          if (APGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = APGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 6) {
        for (let i = 0; i < PPGraphStyle.length; i++) {
          if (PPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = PPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 7) {
        for (let i = 0; i < RPGraphStyle.length; i++) {
          if (RPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = RPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 8) {
        for (let i = 0; i < VBCGraphStyle.length; i++) {
          if (VBCGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = VBCGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 9) {
        for (let i = 0; i < HBCGraphStyle.length; i++) {
          if (HBCGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = HBCGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 10) {
        for (let i = 0; i < BPGraphStyle.length; i++) {
          if (BPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = BPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 12) {
        for (let i = 0; i < CPGraphStyle.length; i++) {
          if (CPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = CPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 13) {
        for (let i = 0; i < _3DSPGraphStyle.length; i++) {
          if (_3DSPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = _3DSPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 14) {
        for (let i = 0; i < _3DLPGraphStyle.length; i++) {
          if (_3DLPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = _3DLPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 15) {
        for (let i = 0; i < _3DMPGraphStyle.length; i++) {
          if (_3DMPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = _3DMPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 16) {
        for (let i = 0; i < _3DBPGraphStyle.length; i++) {
          if (_3DBPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = _3DBPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 17) {
        for (let i = 0; i < TPGraphStyle.length; i++) {
          if (TPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = TPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 18) {
        for (let i = 0; i < BubPGraphStyle.length; i++) {
          if (BubPGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = BubPGraphStyle[i].id
          }
        }

      }
      else if (graphType1 == 19) {
        for (let i = 0; i < CMGraphStyle.length; i++) {
          if (CMGraphStyle[i].name == allPlots.subGraphType) {
            graphStyle1 = CMGraphStyle[i].id
          }
        }

      }

      openBubble('DATAFORMAT', graphType1, graphStyle1, true)

    }


    // openWizard('GRAPHTYPE', '1', 'SP1', true)
  }

  // delete plot modal

  const openDeletePlotModal = () => {
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
    if (allGraphsInPage && allGraphsInPage.graphList && props.pageInstance.selectedItems.nodes.length > 0) {

      for (let i = 0; i < allGraphsInPage.graphList.length; i++) {
        console.log("abc", allGraphsInPage.graphList)
        if (allGraphsInPage.graphList[i].id == props.pageInstance.selectedItems.nodes[0].id) {
          console.log("ttt", allGraphsInPage.graphList[i].id)
          var allPlots = allGraphsInPage.graphList[i].plotData;
          if (allPlots.length == 1) {
            alert("You can't delete the last plot from graph");
          } else if (allPlots.length > 1) {
            setDeleteOpen(true);
            // deleteGraphPlot(allPlots[0],props)
          }
        }
      }
    }
    else {
      alert("Please select graph")
    }
  };

  const openAddAxisModal = () => {
    setposition(false)
    setaxis(false)
    setplot(true)
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
    if (allGraphsInPage && allGraphsInPage.graphList && props.pageInstance.selectedItems.nodes.length > 0) {

      for (let i = 0; i < allGraphsInPage.graphList.length; i++) {
        console.log("abc", allGraphsInPage.graphList)
        if (allGraphsInPage.graphList[i].id == props.pageInstance.selectedItems.nodes[0].id) {
          console.log("ttt", allGraphsInPage.graphList[i].id)
          var allPlots = allGraphsInPage.graphList[i].plotData;
          if (allPlots.length == 1) {
            alert("Please add a plot");
          } else if (allPlots.length > 1) {
            setAxisOpen(true);
            // deleteGraphPlot(allPlots[0],props)
          }
        }
      }
    }
    else {
      alert("Please select graph")
    }


  };
  useEffect(() => {
    if (ipcRenderer.rawListeners('fromWorksheetWizard').length === 0) {
      ipcRenderer.on('fromWorksheetWizard', function (event, arg) {
        let values = getGraphInfo(arg);
        console.log(arg, 'short window');
        console.log(values, 'long window');
        console.log(props.allActiveItem.graphPage.id);
        if (isAddPlot) {
          buildPlotData(props.allActiveItem.graphPage.id, values, props);
          setIsAddPlot(false);
        } else if (isModifyPlot) {
          modifyPlotData(selectedPlotData, values, props);
          setIsModifyPlot(false);
        }
      });
    }
    return () => {
      if (ipcRenderer !== undefined) {
        ipcRenderer.removeAllListeners('fromWorksheetWizard');
      }
    };
  });


  const zoomOptions: IDropdownOption[] = [
    { key: '25', text: '25%' },
    { key: '30', text: '30%' },
    { key: '40', text: '40%' },
    { key: '50', text: '50%' },
    { key: '60', text: '60%' },
    { key: '70', text: '70%' },
    { key: '80', text: '80%' },
    { key: '90', text: '90%' },
    { key: '100', text: '100%' },

  ]

  const zoomFitOptions: IDropdownOption[] = [
    { key: 'PageFit', text: 'Page Fit' },
    { key: 'FitWidth', text: 'Fit Width' },
    { key: 'FitHeight', text: 'Fit Height' },


  ]

  const Cut: IIconProps = ConstantFunc.imageProp(ConstantImage.Cut, 'menuIcon');
  const Copy: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Copy,
    'menuIcon'
  );
  const SelectAll: IIconProps = ConstantFunc.imageProp(
    ConstantImage.SelectAll,
    'menuIcon'
  );
  const Align: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Align,
    'menuIcon'
  );
  const BringToFront: IIconProps = ConstantFunc.imageProp(
    ConstantImage.BringToFront,
    'menuIcon'
  );
  const Group: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Group,
    'menuIcon'
  );
  const ArrangeGraphs: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Arrange,
    'menuIcon'
  );
  const Rulers: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Rulers,
    'menuIcon'
  );
  const SnapTo: IIconProps = ConstantFunc.imageProp(
    ConstantImage.SnapTo,
    'menuIcon'
  );
  const Grids: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Grids,
    'menuIcon'
  );
  const Select: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Select,
    'menuIcon'
  );
  const Text: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Text,
    'menuIcon'
  );
  const Line: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Line,
    'menuIcon'
  );
  const DownArrow: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Arrow,
    'menuIcon'
  );
  const Rectangle: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Rectangle,
    'menuIcon'
  );
  const Ellipse: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Ellipse,
    'menuIcon'
  );
  const LineType: IIconProps = ConstantFunc.imageProp(
    ConstantImage.LineType,
    'menuIcon'
  );
  const LineColor: IIconProps = ConstantFunc.imageProp(
    ConstantImage.LineColor,
    'menuIcon'
  );
  const LineThickness: IIconProps = ConstantFunc.imageProp(
    ConstantImage.LineThickness,
    'menuIcon'
  );
  const FillColor: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FillColor,
    'menuIcon'
  );
  const FillPattern: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FillPattern,
    'menuIcon'
  );
  const ObjectProperties: IIconProps = ConstantFunc.imageProp(
    ConstantImage.ObjectProperties,
    'menuIcon'
  );

  const Refresh: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Refresh,
    'menuIcon'
  );

  const Stop: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Stop,
    'menuIcon'
  );
  const Templates: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Templates,
    'menuIcon'
  );

  const FontName: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FontName,
    'menuIcon'
  );
  const FontSize: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FontSize,
    'menuIcon'
  );
  const Bold: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Bold,
    'menuIcon'
  );
  const Italic: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Italic,
    'menuIcon'
  );
  const UnderLine: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Underline,
    'menuIcon'
  );
  const AlignTextLeft: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTextLeft,
    'menuIcon'
  );
  const AlignTextCenter: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTextCenter,
    'menuIcon'
  );
  const ALignTextRight: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AlignTextRight,
    'menuIcon'
  );
  const FontColor: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FontColor,
    'menuIcon'
  );
  const FontRotation: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FontRotation,
    'menuIcon'
  );
  const TextProperties: IIconProps = ConstantFunc.imageProp(
    ConstantImage.TextProperties,
    'menuIcon'
  );
  const AddPlot: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AddPlot,
    'menuIcon'
  );
  const DeletePlot: IIconProps = ConstantFunc.imageProp(
    ConstantImage.DeletePlot,
    'menuIcon'
  );
  const ModifyPlot: IIconProps = ConstantFunc.imageProp(
    ConstantImage.ModifyPlot,
    'menuIcon'
  );

  const AddAxis: IIconProps = ConstantFunc.imageProp(
    ConstantImage.AddAxis,
    'menuIcon'
  );

  const pasteDropDown: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'paste',
        text: 'Paste',
        iconProps: ConstantFunc.imageProp(ConstantImage.Paste, 'menuIcon'),
        onClick: () => {
          pasteItems();
        },
      },
      {
        key: 'transposePaste',
        text: 'Paste Special',
        iconProps: ConstantFunc.imageProp(
          ConstantImage.PasteSpecial,
          'menuIcon'
        ),
        onClick: () => {
          props.pageInstance.paste();
        },
      },
    ],
  };

  const CutDropDown: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'Cut',
        text: 'Cut',
        iconProps: ConstantFunc.imageProp(ConstantImage.Cut, 'menuIcon'),
        onClick: () => {
          props.actions.setCopiedEleID({
            nodeIDs: [],
            connectorIDs: [],
            graphIDs: [],
            graphPageID: '',
          });
          props.pageInstance.cut();
        },
      },
      {
        key: 'clear',
        text: 'Clear',
        iconProps: ConstantFunc.imageProp(ConstantImage.Clear, 'menuIcon'),
        onClick: () => {
          //Logic to clone the selected element
          let nodes = props.pageInstance?.selectedItems?.nodes
          let connectors = props.pageInstance?.selectedItems?.connectors
          let currGrPg = props.notebooks.allGraphPages.byId[props.allActiveItem.graphPage.id];
          if (nodes.length > 0) {
            deleteTheElementsFromPage(currGrPg, props, nodes, 'node')
          }
          if (connectors.length > 0) {
            deleteTheElementsFromPage(currGrPg, props, connectors, 'connector')
          }
        },
      },
    ],
  };
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

  const graphPageCut: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'cut',
        text: 'Cut',
        iconProps: { iconName: 'Cut' },
      },
      {
        key: 'clear',
        text: 'Clear',
        iconProps: { iconName: 'Clear' },
      },
    ],
  };

  const graphPageArrangeProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'Bring to Front',
        text: 'Bring to Front',
        iconProps: { iconName: 'ArrangeSendBackward' },
        onClick: () => {
          props.pageInstance.bringToFront();
        },
      },
      {
        key: 'Send to Back',
        text: 'Send to Back',
        iconProps: { iconName: 'ArrangeSendToBack' },
        onClick: () => {
          props.pageInstance.sendToBack();
        },
      },
    ],
  };

  const graphPageGroupUngroup: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'group',
        text: 'Group',
        iconProps: { iconName: 'GroupObject' },
        onClick: () => {
          // console.log(props.pageInstance.selectedItems, "Selected items OF THIS DIAGRAM")
          // let newGroup: NodeModel = {
          //   id : 'group1a',
          //   children: []
          // }
          // props.pageInstance.selectedItems.nodes.forEach((item)=>newGroup.children.push(item.id))
          // props.pageInstance.selectedItems.connectors.forEach((item)=>newGroup.children.push(item.id))
          // props.pageInstance.add(newGroup)
          // console.log(props.pageInstance, "page instance")
          props.pageInstance.group()
          console.log(props.pageInstance.selectedItems.nodes[0].children,props.pageInstance.nodes[props.pageInstance.nodes.length - 1].children, "inside group")
        },
      },
      {
        key: 'ungroup',
        text: 'Ungroup',
        iconProps: { iconName: 'UngroupObject' },
        onClick: () => {
          // props.pageInstance.selectAll();
          console.log(props.pageInstance.selectedItems, "FOR Ungroup = NODES OF THIS DIAGRAM")
          props.pageInstance.unGroup();
        },
      },
    ],
  };
  const alignIconProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'Left',
        text: 'Left',
        iconProps: { iconName: 'Left' },
        onClick: () => {
          changeAlignment('Left');
        },
      },
      {
        key: 'Right',
        text: 'Right',
        iconProps: { iconName: 'Right' },
        onClick: () => {
          changeAlignment('Right');
        },
      },
      {
        key: 'Top',
        text: 'Top',
        iconProps: { iconName: 'Top' },
        onClick: () => {
          changeAlignment('Top');
        },
      },
      {
        key: 'Bottom',
        text: 'Bottom',
        iconProps: { iconName: 'Bottom' },
        onClick: () => {
          changeAlignment('Bottom');
        },
      },
      {
        key: 'Center',
        text: 'Center',
        iconProps: { iconName: 'Center' },
        onClick: () => {
          changeAlignment('Center');
        },
      },
      {
        key: 'Middle',
        text: 'Middle',
        iconProps: { iconName: 'Middle' },
        onClick: () => {
          changeAlignment('Middle');
        },
      },
    ],
  };

  const graphPageObject: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'graphicFile',
        text: 'Graphic File',
        iconProps: ConstantFunc.imageProp(ConstantImage.File, 'menuIcon'),
      },
      {
        key: 'newObject',
        text: 'New Object',
        iconProps: ConstantFunc.imageProp(
          ConstantImage.ObjectProperties,
          'menuIcon'
        ),
      },
    ],
  };

  // const [bubbleObj, setBubbleObj] = useState({});
  // const [
  //   teachingBubbleVisible,
  //   { toggle: toggleTeachingBubbleVisible },
  // ] = useBoolean(false);
  // const exampleSecondaryButtonProps: IButtonProps = React.useMemo(
  //   () => ({
  //     children: 'OK',
  //     onClick: toggleTeachingBubbleVisible,
  //   }),
  //   [toggleTeachingBubbleVisible]
  // );
  // const openBubble = (param) => {
  //   toggleTeachingBubbleVisible();
  //   setBubbleObj(param);
  // };
  const renderSelectedElement = (type: string) => {
    props.actions.setSelectedNode(type);
  };
  const openHelp = (type) => {
    if (type == 'Align') {
      props.OpenHelpWindow("gpbasics1", "aligning_page_objects", "")
    }
    else if (type == 'Arrange') {
      props.OpenHelpWindow("gpbasics1", "arranging_graphs", "")
    }
  }
  const setRulers = () => {
    const value = props.showRuler == true ? false : true;
    props.actions.isSetRuler(value);
    // Updating options
    setOptions('GraphPage.Rulers', value, props);
  };
  const setShowGrids = () => {
    const value = props.grids == true ? false : true;
    props.actions.isShowGrids({ showGrid: value });
    // Updating options
    setOptions('GraphPage.Grids.showgrids', value, props);
  };
  const setSnapTo = () => {
    const value = props.enableSnapTo == true ? false : true;
    props.actions.isSetSnapTo(value);
  };
  const changeBold = () => {
    if (props.pageInstance.selectedItems.nodes.length) {
      props.pageInstance.selectedItems.nodes[0].style.bold =
        !props.pageInstance.selectedItems.nodes[0].style.bold;
    }
  };
  const changeItalic = () => {
    if (props.pageInstance.selectedItems.nodes.length) {
      props.pageInstance.selectedItems.nodes[0].style.italic =
        !props.pageInstance.selectedItems.nodes[0].style.italic;
    }
  };
  const changeTextAlign = (type: string) => {
    if (props.pageInstance.selectedItems.nodes.length) {
      props.pageInstance.selectedItems.nodes[0].style.textAlign = type;
    }
  };
  const changeTextDecoration = () => {
    if (props.pageInstance.selectedItems.nodes.length) {
      let textDecorated =
        props.pageInstance.selectedItems.nodes[0].style.textDecoration;
      props.pageInstance.selectedItems.nodes[0].style.textDecoration =
        textDecorated === 'Underline' ? 'None' : 'Underline';
    }
  };




  const changeFontColor = (args) => {
    if (props.pageInstance.selectedItems.nodes.length) {
      props.pageInstance.selectedItems.nodes[0].style.color =
        args.currentValue.hex;
    }
  };

  const changeAlignment = (type) => {
    var option = type
    console.log("nodes", props.pageInstance.nodes)
    // props.pageInstance.select(props.pageInstance.nodes);

    const bounds = props.pageInstance.getDiagramBounds();
    console.log("selected nodes", props.pageInstance.selectedItems.connectors)
    if (props.pageInstance.selectedItems.connectors.length == 1) {
      var objects = props.pageInstance.selectedItems.connectors;
      let tx = 0;
      let ty = 0;
      for (let i = 0; i < objects.length; i++) {
        const objectBounds = objects[i].wrapper.bounds;
        if (option === 'Left') {
          tx = bounds.x + objectBounds.width / 2 - objectBounds.center.x;
        } else if (option === 'Right') {
          tx = bounds.width - objectBounds.width / 2 - objectBounds.center.x;
        } else if (option === 'Top') {
          ty = bounds.y + objectBounds.height / 2 - objectBounds.center.y;
        } else if (option === 'Bottom') {
          ty = bounds.height - objectBounds.height / 2 - objectBounds.center.y;
        } else if (option === 'Center') {
          tx = bounds.center.x - objectBounds.center.x;
        } else if (option === 'Middle') {
          ty = bounds.center.y - objectBounds.center.y;
        }
        props.pageInstance.drag(objects[i], tx, ty);
      }
    }
    if (props.pageInstance.selectedItems.nodes.length == 1) {
      var objects = props.pageInstance.selectedItems.nodes;
      let tx = 0;
      let ty = 0;
      for (let i = 0; i < objects.length; i++) {
        const objectBounds = objects[i].wrapper.bounds;
        console.log("objectBounds", objectBounds)
        if (option === 'Left') {
          tx = bounds.x + 10 + objectBounds.width / 2 - objectBounds.center.x;
        } else if (option === 'Right') {
          tx = bounds.width - 12 - objectBounds.width / 2 - objectBounds.center.x;
        } else if (option === 'Top') {
          ty = bounds.y + 10 + objectBounds.height / 2 - objectBounds.center.y;
        } else if (option === 'Bottom') {
          ty = bounds.height - 12 - objectBounds.height / 2 - objectBounds.center.y;
        } else if (option === 'Center') {
          tx = bounds.center.x - objectBounds.center.x;
        } else if (option === 'Middle') {
          ty = bounds.center.y - objectBounds.center.y;
        }
        props.pageInstance.drag(objects[i], tx, ty);
      }
    }
    else if (props.pageInstance.selectedItems.nodes.length > 1) {
      props.pageInstance.select(props.pageInstance.selectedItems.nodes);
      props.pageInstance.align(type);
    }
    else if (props.pageInstance.selectedItems.connectors.length > 1) {
      props.pageInstance.select(props.pageInstance.selectedItems.connectors);
      props.pageInstance.align(type);
    }
    props.pageInstance.dataBind();




    // props.pageInstance.selectAll();
    // props.pageInstance.align(type);
    // props.pageInstance.dataBind();
  };

  const copiedFuncionality = (value) => {
    let valuereturnd = props.pageInstance.copy();
    let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
    console.log(valuereturnd, 'valuereturnd');
    let nodeIds = [];
    let connectorIds = [];
    let graphIds = [];
    let nodeEle;
    valuereturnd.map((element) => {
      if (element.type) {
        connectorIds.push(element);
      } else {
        element.shape.type === 'HTML'
          ? graphIds.push(element)
          : nodeIds.push(element);
      }
    });

    props.actions.setCopiedEleID({
      nodeIDs: nodeIds,
      connectorIDs: connectorIds,
      graphIDs: graphIds,
      graphPageID: activeGraphId,
    });
  };
  const pasteItems = () => {

    let currentGraphPage =
      props.notebooks.allGraphPages.byId[props.allActiveItem.graphPage.id];
    let copiedGraphPage =
      props.notebooks.allGraphPages.byId[props.copiedElementIDS.graphPageID];
    console.log(
      currentGraphPage,
      'currentGraphPage',
      copiedGraphPage,
      props.copiedElementIDS
    );
    let copiedGraphObj = [];
    if (props.copiedElementIDS) {
      if (copiedGraphPage) {
        props.copiedElementIDS.nodeIDs.map((item, index) => {
          item.id = item.id + index;
          item.offsetX = item.offsetX + index * 100;
          item.offsetY = item.offsetY + index * 100;
          props.pageInstance.addNode(item);
        });
        props.copiedElementIDS.graphIDs.map((item, index) => {
          copiedGraphPage.graphList.filter((graphItem) => {
            console.log('in graph paste');
            let id = graphItem.id.split('-')[0] + '-';
            let graphId = item.id.split('-')[0] + '-';
            if (id === graphId) {
              copiedGraphObj.push(graphItem);
            }
          });
          // let worksheetId = currentGraphPage.worksheetId;
          console.log(currentGraphPage, 'curreent');
          // item.id = item.id;
          // item.offsetX = item.offsetX + index;
          // item.offsetY = item.offsetY + index;
        });
        console.log(copiedGraphObj, 'copiedGraphObj');
        props.copiedElementIDS.connectorIDs.map((item, index) => {
          item.id = item.id + index + generateUniqueID();
          item.offsetX = item.offsetX + index * 100 + getRandomDigits(3);
          item.offsetY = item.offsetY + index * 100 + getRandomDigits(6);
          props.pageInstance.addConnector(item);
        });
        //     currentGraphPage.isSaved = false;
        // props.isReRenderGraph(false);
        // setGraphReload(true);
        // setTimeout(() => {
        //     props.isReRenderGraph(true);
        // })
        pasteGraphTotheExisting(currentGraphPage, copiedGraphObj, props);
      }
    } else {
      props.pageInstance.paste()
      //   let itemToCheck
      //   let itemType
      //  if(props.selectedCopiedItems.connectorItems.length > 0){
      //    itemToCheck = props.selectedCopiedItems.connectorItems
      //    itemType = 'connector'
      //  } else if (props.selectedCopiedItems.nodes.length > 0){
      //   itemToCheck = props.selectedCopiedItems.nodes
      //   itemType = 'node'
      //  } else {
      //   itemToCheck = props.selectedCopiedItems.graphItems
      //   itemType = 'graph'
      //  }
      //  pasteTheElement(itemToCheck, props , itemType, props.selectedCopiedItems.graphPageId)
      // }
    }
  };

  const getRandomLetters = (length = 1) =>
    Array(length)
      .fill()
      .map((e) => String.fromCharCode(Math.floor(Math.random() * 26) + 65))
      .join('');
  const getRandomDigits = (length = 1) =>
    Array(length)
      .fill()
      .map((e) => Math.floor(Math.random() * 10))
      .join('');
  const generateUniqueID = () => {
    let id = getRandomLetters(2) + getRandomDigits(4);
    return id;
  };
  const newID = generateUniqueID();
  console.log('*******PROPS IN GRAPH*********', props)
  let gphPrpDisable =
    props.allActiveItem.graphPage && props.allActiveItem.graphPage.id
      ? ''
      : 'disableItem';
  let grpProperty = '';
  let addPlotDisable = '';
  if(props.allActiveItem.graphPage && props.allActiveItem.graphPage.id) {
    let activeGraphId = props.allActiveItem.graphPage.id;
    let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId]
    grpProperty =  allGraphsInPage.graphList.length > 0 ? '':'disableItem'
    
    let grList = allGraphsInPage.graphList
    if (props.pageInstance && props.pageInstance.selectedItems.nodes.length>0){
      let selectedGraph = props.pageInstance.selectedItems.nodes[0]
      let graphElement = grList.filter((item: any) => item.id === selectedGraph.id)
      if (graphElement.length>0){
        selectedGraphType = graphElement[0].plotData[0].graphType;
        if (selectedGraphType === 'heatMap' || selectedGraphType === 'pie' || selectedGraphType === 'choroplethMap') addPlotDisable = 'disableItem';
      }
    } else {
      addPlotDisable = 'disableItem';
    }
    
  }
  // const isReportDisabled = props.allActiveItem.report ? "" : "disableListItem";
  const diagram = props.pageInstance
  const onFitGraph = () => {
    diagram.fitToPage(
      {
        mode: 'Page',
        region: 'Content',
        margin: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }
      })
  }

  const changeFitDropdown = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
    let mode = ''
    switch (item.text) {
      case 'Fit Width':
        mode = 'Width'
        break;
      case 'Fit Height':
        mode = 'Height'
        break;
      default:
        mode = 'Page'
        break;
    }
    diagram.fitToPage({
      mode: mode,
      region: 'Content',
      margin: {},
      canZoomIn: false
    });

  }
  const zoom = {}
  const changeZoomDropdown = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    const currentZoom = diagram.scrollSettings.currentZoom;
    switch (item.text) {
      case '100%':
        zoom.zoomFactor = (1 / currentZoom) - 1;
        break;
      case '90%':
        zoom.zoomFactor = (0.9 / currentZoom) - 1;
        break;
      case '80%':
        zoom.zoomFactor = (0.8 / currentZoom) - 1;
        break;
      case '70%':
        zoom.zoomFactor = (0.7 / currentZoom) - 1;
        break;
      case '60%':
        zoom.zoomFactor = (0.6 / currentZoom) - 1;
        break;
      case '50%':
        zoom.zoomFactor = (0.5 / currentZoom) - 1;
        break;
      case '40%':
        zoom.zoomFactor = (0.4 / currentZoom) - 1;
        break;
      case '30%':
        zoom.zoomFactor = (0.3 / currentZoom) - 1;
        break;
      case '25%':
        zoom.zoomFactor = (0.25 / currentZoom) - 1;
        break;

    }
    diagram.zoomTo(zoom);
  };




  return (
    <div className="ms-Grid" dir="ltr">
      {/* {teachingBubbleVisible && (
        <TeachingBubble
          target={'#' + bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={toggleTeachingBubbleVisible}
          headline={bubbleObj.title}
        >
          {bubbleObj.message}
        </TeachingBubble>
      )} */}
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ribbon-container">
          <div className="ribbon-btn-box mrspace" >
            <div
              className={
                !props.smartToggle
                  ? `ribbon-grid-button ${gphPrpDisable}`
                  : `ribbon-grid-button sim-ribbon-grid-submenubutton ${gphPrpDisable}`
              }
              onClick= {() => 
                props.pageInstance.paste() }
            >

              <TooltipHost
                content={t("Paste the Contents")}
                closeDelay={100}
                // id={toolTipId.tooltipIdNote}
                calloutProps={calloutProps}
                styles={styles}
                directionalHint={DirectionalHint.bottomCenter}
              >

                <div
                  className={
                    !props.smartToggle
                      ? 'ribbon-gbutton'
                      : 'ribbon-gbutton sim-ribbon-gbutton'
                  }
                  style={{paddingTop:"18px",paddingBottom:"20px"}}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={Paste}
                  />
                  <ActionButton
                    className="box-btn"
                    allowDisabledFocus
                    // menuProps={pasteDropDown}
                  >
                    Paste
                  </ActionButton>
                </div>

              </TooltipHost>

              <div className="hor-button hr-btn-smallIcons">
                <TooltipHost
                  content={t("Cut the selected contents")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    className="align-caret"
                    iconProps={Cut}
                    menuProps={CutDropDown}
                  >
                    Cut
                  </ActionButton>
                </TooltipHost>

                <TooltipHost
                  content={t("Copy the selected contents")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    iconProps={Copy}
                    onClick={() => copiedFuncionality(false)}
                  >
                    Copy
                  </ActionButton>
                </TooltipHost>
                <TooltipHost
                  content={t("Select all the elements on the graphpage")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    iconProps={SelectAll}
                    onClick={() => props.pageInstance.selectAll()}
                  >
                    Select&nbsp;All
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Clipboard</label>
          </div>
          {/* <div className="ribbon-btn-box">
            <div className={!props.smartToggle ? "ribbon-grid-button" : "ribbon-grid-button sim-ribbon-grid-submenubutton"}>
              <div className={!props.smartToggle ? "ribbon-gbutton lastBox-btn" : "ribbon-gbutton sim-ribbon-gbutton"}>
                <Image alt="ribbon-icon" className="ribbon-icon-svg" src={ConstantImage.ObjectProperties} />
            &nbsp;  <ActionButton className="box-btn" allowDisabledFocus menuProps={graphPageObject}>
                  Object
       </ActionButton>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Insert</label>
          </div> */}
          <div className="ribbon-btn-box graph-format-div mrspace">
            <div
              className={
                !props.smartToggle
                  ? `ribbon-grid-button ${gphPrpDisable}`
                  : `ribbon-grid-button sim-ribbon-grid-submenubutton ${gphPrpDisable}`
              }>
              <div className="hor-button hr-btn-smallIcons">
                <TooltipHost
                  content={t("Align the items with respect to each other")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    className="for-whiteSpace align-caret"
                    iconProps={Align}
                    menuProps={alignIconProps}
                    onMenuClick={() => openHelp('Align')}

                  >
                    Align
                  </ActionButton>
                </TooltipHost>
                <TooltipHost
                  content={t("Move the selected objects to front/back")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    className="align-caret"
                    iconProps={ArrangeGraphs}
                    menuProps={graphPageArrangeProps}
                    onMenuClick={() => openHelp('Arrange')}

                  >

                    Arrange
                  </ActionButton>
                </TooltipHost>
                <TooltipHost
                  content={t("Group/UnGroup all the selected items as single item")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    className="align-caret"
                    iconProps={Group}
                    menuProps={graphPageGroupUngroup}
                  >
                    {t('Group')}
                  </ActionButton>
                </TooltipHost>
              </div>
              <div className="hor-button hr-btn-smallIcons">
                <TooltipHost
                  content={t("Turn snap-to off or on with respect to grids")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <ActionButton
                    iconProps={SnapTo}
                    onClick={() => {
                      setSnapTo();
                    }}
                  >
                    {t("Snap\u00a0To")}
                  </ActionButton>
                </TooltipHost>
                <TooltipHost
                  content={t("Turn page grids off or on")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    iconProps={Grids}
                    onClick={() => {
                      setShowGrids();
                    }}
                  >
                    {t('Grids')}
                  </ActionButton>
                </TooltipHost>
                <TooltipHost
                  content={t("Turn vertical and horizontal page rulers off or on")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    iconProps={Rulers}
                    onClick={() => {
                      setRulers();
                    }}
                  >
                    {t('Rulers')}
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Format</label>
          </div>
          <div className="ribbon-btn-box mrspace">
            <div className="ribbon-grid-button">
              <div
                className={
                  !props.smartToggle
                    ? `ribbon-combobox ribbon-icon-button ${gphPrpDisable}`
                    : `ribbon-combobox ribbon-combobox-flex ribbon-icon-button ${gphPrpDisable}`
                }
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '0px 2px',
                }}
              >
                <div className="ribbon-ibutton graphpage-tools-space">
                  <TooltipHost
                    content={t("Turn off the drawing mode and select the item on the graph page")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <IconButton
                      className={ElementTypes.SELECT == props.nodeElementType ? "graphPage-icons-space-active" : "graphPage-icons-space"}
                      iconProps={Select}
                      onClick={() => renderSelectedElement(ElementTypes.SELECT)}
                    />
                  </TooltipHost>
                  <TooltipHost
                    content={t("Place text on the graphpage")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <IconButton
                      className={ElementTypes.TEXT == props.nodeElementType ? "graphPage-icons-space-active" : "graphPage-icons-space"}
                      iconProps={Text}
                      onClick={() => renderSelectedElement(ElementTypes.TEXT)}
                    />
                  </TooltipHost>
                  <TooltipHost
                    content={t("Place line on the graph page")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <IconButton
                      className={ElementTypes.LINE == props.nodeElementType ? "graphPage-icons-space-active" : "graphPage-icons-space"}
                      iconProps={Line}
                      onClick={() => renderSelectedElement(ElementTypes.LINE)}
                    />
                  </TooltipHost>
                  <TooltipHost
                    content={t("Place rectangle on the graph page")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <IconButton
                      className={ElementTypes.RECTANGLE == props.nodeElementType ? "graphPage-icons-space-active" : "graphPage-icons-space"}
                      iconProps={Rectangle}
                      onClick={() =>
                        renderSelectedElement(ElementTypes.RECTANGLE)
                      }
                    />
                  </TooltipHost>
                  {/* <IconButton
                    className="graphPage-icons"
                    iconProps={DownArrow}
                    onClick={() =>
                      renderSelectedElement(ElementTypes.DownARROW)
                    }
                  /> */}
                  <TooltipHost
                    content={t("place ellipse on the graph page")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <IconButton
                      className={ElementTypes.ELLIPSE == props.nodeElementType ? "graphPage-icons-space-active" : "graphPage-icons-space"}
                      iconProps={Ellipse}
                      onClick={() => renderSelectedElement(ElementTypes.ELLIPSE)}
                    />
                  </TooltipHost>
                </div>
                {/* <div className={`ribbon-ibutton graphpage-tools-space toolsGraphPage ${gphPrpDisable}`}>
                  <TooltipHost
                    content={t("Select line pattern")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <IconButton
                      className="graphPage-icons-space"
                      iconProps={LineType}
                    />
                  </TooltipHost>
                  <TooltipHost
                    content={t("Select line color")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <IconButton
                      className="graphPage-icons-space"
                      iconProps={LineColor}
                    />
                  </TooltipHost>
                  <TooltipHost
                    content={t("Select line thickness")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <IconButton
                      className="graphPage-icons-space"
                      iconProps={LineThickness}
                    />
                  </TooltipHost>
                  <TooltipHost
                    content={t("Fill solid object with selected color")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <IconButton
                      className="graphPage-icons-space"
                      iconProps={FillColor}
                    />
                  </TooltipHost>
                  <TooltipHost
                    content={t("Select fill pattern")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <IconButton
                      className="graphPage-icons-space"
                      iconProps={FillPattern}
                    />
                  </TooltipHost>
                </div> */}
              </div>
              <div
                className={
                  !props.smartToggle
                    ? "ribbon-grid-button"
                    : "ribbon-grid-button sim-ribbon-grid-submenubutton"
                }>

                {/* <div
                  className={
                    !props.smartToggle
                      ? `ribbon-gbutton lastBox-btn ${gphPrpDisable}`
                      : `ribbon-gbutton sim-ribbon-gbutton ${gphPrpDisable}`
                  }>
                  <TooltipHost
                    content={t("Show or hide the object properties dialog")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <Image
                      alt='ribbon-icon'
                      className='ribbon-icon-svg'
                      src={ConstantImage.ObjectProperties}
                    />
                    <ActionButton className='box-btn' allowDisabledFocus>
                      {t("Object Properties")}
                    </ActionButton>
                  </TooltipHost>

                </div> */}

                <div
                  className={
                    !props.smartToggle
                      ? `ribbon-gbutton lastBox-btn ${gphPrpDisable} ${grpProperty}`
                      : `ribbon-gbutton sim-ribbon-gbutton ${gphPrpDisable} ${grpProperty}`
                  }
                  style={
                    props.graphPropertyState.isOpen
                      ? {
                        backgroundImage:
                          "linear-gradient(rgb(250, 164, 65),rgb(254, 236, 165)",
                      }
                      : {}
                  }
                  id='graphPropID'
                  onClick={() => {
                    console.log("---------->", props.graphPropertyState);
                    if (props?.graphPropertyState?.isOpenGraphProperty?.graphId) {
                      props.graphPropertyAction.isOpenGraphProperty({
                        isOpen: !props.graphPropertyState.isOpenGraphProperty.isOpen,
                        graphId: props.graphPropertyState.isOpenGraphProperty.graphId,
                      });
                    } else {
                      alert("Graph Page are empty");
                    }
                  }}>
                  <TooltipHost
                    content={t("Show or hide the graph properties dialog")}
                    closeDelay={100}
                    // id={toolTipId.tooltipIdNote}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}
                  >
                    <Image
                      alt='ribbon-icon'
                      className='ribbon-icon-svg'
                      src={ConstantImage.GraphProperties}
                    />
                    <ActionButton className='box-btn' allowDisabledFocus>
                      {t("Graph Properties")}
                    </ActionButton>
                  </TooltipHost>

                </div>
              </div>
              {/* </div> */}
            </div>

            <label className="ribbon-boxbtn-lbl">Tools</label>
          </div>
          <div className="ribbon-btn-box mrspace">
            <div className="text-pannel">
              <div className='font-container' style={{ padding: '6px 4px', width: 'min-content' }}>
                <div
                  className={
                    !props.smartToggle
                      ? `ribbon-grid-button graphTextDropDown ${gphPrpDisable}`
                      : `ribbon-grid-button sim-ribbon-grid-submenubutton ${gphPrpDisable}`
                  }
                >

                  <div className="ribbon-dropdown" style={{ width: '60%' }}>

                    <div className="ribbon-dfield" >
                      <ComboBox
                        placeholder='Font'
                        //defaultSelectedKey='Arial'
                        selectedKey={selectedFontKey}
                        options={optionsWithFont}
                        allowFreeform
                        autoComplete='on'

                        styles={comboBoxStyles}
                        onChange={_onChangeFont}
                      />

                    </div>

                  </div>
                  <div className="ribbon-dropdown" style={{ marginLeft: '2px', width: '40%' }}>
                    <div className="ribbon-dfield">
                      <ComboBox
                        placeholder='Font Size'
                        // defaultSelectedKey='8pt'
                        selectedKey={selectedFontSizeKey}
                        options={optionsWithFontSize}
                        allowFreeform
                        autoComplete='on'

                        styles={comboBoxStylesFontSize}
                        onChange={_onChangeFontSize}
                      />
                    </div>
                  </div>
                  {/* <div className="ribbon-ibutton graphpage-tools">
                    <IconButton
                      className="graphPage-icons"
                      iconProps={FontName}
                    />
                    <IconButton
                      className="graphPage-icons"
                      iconProps={FontSize}
                    />
                  </div> */}
                </div>
                <div
                  className={
                    !props.smartToggle
                      ? `ribbon-grid-button graphTextDropDown ${gphPrpDisable}`
                      : `ribbon-grid-button sim-ribbon-grid-submenubutton ${gphPrpDisable}`
                  }
                  style={{ marginTop: '8px' }}
                >
                  <div className="ribbon-ibutton graphpage-tools" style={{ height: '27px' }}>
                    <TooltipHost
                      content={t("Make the selected text bold")}
                      closeDelay={100}
                      // id={toolTipId.tooltipIdNote}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}
                    >
                      <IconButton
                        className="graphPage-icons graphPage-text-style"
                        iconProps={Bold}
                        onClick={() => {
                          changeBold();
                        }}
                      />
                    </TooltipHost>
                    <TooltipHost
                      content={t("Make the selected text italic")}
                      closeDelay={100}
                      // id={toolTipId.tooltipIdNote}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}
                    >
                      <IconButton
                        className="graphPage-icons graphPage-text-style"
                        iconProps={Italic}
                        onClick={() => {
                          changeItalic();
                        }}
                      />
                    </TooltipHost>
                    <TooltipHost
                      content={t("Underline the selected text")}
                      closeDelay={100}
                      // id={toolTipId.tooltipIdNote}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}
                    >
                      <IconButton
                        className="graphPage-icons graphPage-text-style"
                        iconProps={UnderLine}
                        onClick={() => {
                          changeTextDecoration();
                        }}
                      />
                    </TooltipHost>
                    <TooltipHost
                      content={t("Align text to the left")}
                      closeDelay={100}
                      // id={toolTipId.tooltipIdNote}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}
                    >
                      <IconButton
                        className="graphPage-icons graphPage-text-style"
                        iconProps={AlignTextLeft}
                        onClick={() => {
                          changeTextAlign('Left');
                        }}
                      />
                    </TooltipHost>
                    <TooltipHost
                      content={t("Align text to the center")}
                      closeDelay={100}
                      // id={toolTipId.tooltipIdNote}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}
                    >
                      <IconButton
                        className="graphPage-icons graphPage-text-style"
                        iconProps={AlignTextCenter}
                        onClick={() => {
                          changeTextAlign('center');
                        }}
                      />
                    </TooltipHost>
                    <TooltipHost
                      content={t("Align text to the right")}
                      closeDelay={100}
                      // id={toolTipId.tooltipIdNote}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}
                    >
                      <IconButton
                        className="graphPage-icons graphPage-text-style"
                        iconProps={ALignTextRight}
                        onClick={() => {
                          changeTextAlign('Right');
                        }}
                      />
                    </TooltipHost>

                    {/* <ColorPickerComponent
                      id="colorpickerGraph"
                      value="#ba68c8"
                      change={(args) => changeFontColor(args)}
                      cssClass="e-hide-value"
                    >
                      <IconButton
                        className="graphPage-icons"
                        style={{ marginLeft: '100px' }}
                        iconProps={FontColor}
                        // onClick =  {() => {changeFontColor('Right')}}
                      />
                    </ColorPickerComponent> */}
                    <TooltipHost
                      content={t("Choose color for the selected text")}
                      closeDelay={100}
                      // id={toolTipId.tooltipIdNote}
                      calloutProps={calloutProps}
                      styles={styles}
                      directionalHint={DirectionalHint.bottomCenter}
                    >
                      <ColorPickerComponent
                        id='colorpickerGraph'
                        created={onCreated}
                        ref={(scope) => (colorRef = scope)}
                        change={(args) => changeFontColor(args)}
                        cssClass='e-hide-value'
                        showButtons={true}>
                        {/* <IconButton
                          className='graphPage-icons'
                          style={{ marginLeft: "100px" }}
                          iconProps={FontColor}
                          // onClick =  {() => {changeFontColor('Right')}}
                        /> */}
                      </ColorPickerComponent>
                    </TooltipHost>
                    {/* <IconButton
                      className="graphPage-icons"
                      iconProps={FontRotation}
                      // { () => {changeTextAlign('Right')}}
                    /> */}
                  </div>
                  <div
                    className='ribbon-dropdown'
                    style={{ marginLeft: "2px", margin: "2px" }}>
                    <div className='ribbon-dfield'>
                      <Dropdown
                        defaultSelectedKey={"100%"}
                        options={zoomOptions}
                        placeholder={"10%"}
                        styles={dropdownStyle}
                        style={{ width: "55px" }}
                      // onChange={changeZoom}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div
                className={
                  !props.smartToggle
                    ? 'ribbon-grid-button graphTextProperties'
                    : 'ribbon-grid-button sim-ribbon-grid-submenubutton '
                }
              >
                <div
                  className={
                    !props.smartToggle
                      ? 'ribbon-gbutton'
                      : 'ribbon-gbutton sim-ribbon-gbutton'
                  }
                  id="textPropID"
                  // onClick={() =>
                  //   openBubble({
                  //     id: 'textPropID',
                  //     title: 'Quick and Easy Graph Editing',
                  //     message:
                  //       "With SigmaPlot's Text Properties, Object Properties, and Graph Properties dialog boxes, you have complete control over all graph elements' behavior and appearance.",
                  //   })
                  // }
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.TextProperties}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Text&nbsp;Properties
                  </ActionButton>
                </div>
              </div> */}
            </div>
            <label className="ribbon-boxbtn-lbl">{t("Text ")} </label>
          </div>
          <div
            className={`ribbon-btn-box mrspace ${disablePlot == true ? 'disableItem' : ''
              }`}
          >
            <div
              className={
                !props.smartToggle
                  ? `ribbon-grid-button ${gphPrpDisable}`
                  : `ribbon-grid-button sim-ribbon-grid-submenubutton ${gphPrpDisable}`
              }
            >
              <div className="hor-button hr-btn-smallIcons">
                <TooltipHost
                  content={t("Add an additional plot to the selected graph")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    iconProps={AddPlot}
                    onClick={() => {AddingPlot(selectedGraphType)
                    }}
                    className = {addPlotDisable}
                  >
                    Add&nbsp;Plot
                  </ActionButton>
                </TooltipHost>
                <TooltipHost
                  content={t("Delete a plot from selected graph")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    iconProps={DeletePlot}
                    onClick={() => {
                      openDeletePlotModal();
                    }}
                  >
                    Delete&nbsp;Plot
                  </ActionButton>
                </TooltipHost>
                <TooltipHost
                  content={t("Add an additional axis to the selected graph. There must be two plots to add an axis")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton iconProps={AddAxis}
                    className={disableAXisclass == true ? 'disableItem' : ''}
                    onClick={() => {
                      openAddAxisModal();
                    }} 
                    className={addPlotDisable}
                    >Add&nbsp;Axis</ActionButton>
                </TooltipHost>
              </div>

              <div
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${addPlotDisable}`
                    : `ribbon-gbutton sim-ribbon-gbutton  ${addPlotDisable}`
                }
              >
                {/* <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.ModifyPlot}
                /> */}
                <TooltipHost
                  content={t("Change the data or plot type of a selected plot in a graph")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    className="box-btn"
                    allowDisabledFocus
                    iconProps={ModifyPlot}
                    onClick={() => {
                      modifyPlot();
                    }}
                    className={addPlotDisable}
                  >
                    Modify Plot
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
              >
                <TooltipHost
                  content={t("Add and modify labels of a selected plot")}
                  closeDelay={100}
                  // id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.PlotLabels}
                  />
                  <ActionButton
                    className="box-btn"
                    onClick={() => {
                      plotLabel();
                    }}
                    allowDisabledFocus
                  >
                    Plot Labels
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Manage Plots</label>
          </div>
          <div className='ribbon-btn-box'>
            <div className={`hor-button hr-btn-smallIcons zoom-container ${gphPrpDisable}`}>
              {/* <div
                className='hor-button hr-btn-smallIcons'
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}> */}
              <div className='ribbon-dropdown' style={{ margin: "1px 0" }}>
                <div className='ribbon-dfield'>
                  <Dropdown
                    defaultSelectedKey={"100"}
                    options={zoomOptions}

                    styles={dropdownStyle}
                    style={{ 'width': '85px' }}
                    onChange={changeZoomDropdown}
                  />
                </div>
                <div className='ribbon-dfield' style={{ marginTop: '12px' }}>
                  <Dropdown
                    defaultSelectedKey={"FitWidth"}
                    options={zoomFitOptions}

                    styles={dropdownStyle}
                    style={{ 'width': '85px' }}
                    onChange={changeFitDropdown}
                  />
                </div>
              </div>
              {/* <div className='ribbon-dropdown' style={{ margin: "1px 0" }}>
             
                </div> */}
              {/* <ActionButton
                iconProps={Line}
                onClick={onFitGraph}
                style={{ margin: "7px 0" }}>
                Fit&nbsp;Width
              </ActionButton>
              {/* </div> */}
            </div>

            <label className='ribbon-boxbtn-lbl'>{t("Zoom")}</label>
          </div>

        </div>
      </div>
      <Deleteplot
        isDeleteOpen={isDeleteOpen}
        DeleteCurrentplot={DeleteCurrentplot}
        setDeleteOpen={setDeleteOpen}
      />
      <Modifyplot
        isModifyOpen={isModifyOpen}
        modifyPlot={ModifySingleplot}
        setModifyOpen={setModifyOpen}
      />
      <PlotLabel isLabelOpen={isLabelOpen} setLabelOpen={setLabelOpen} />
      <Addaxis isAxisOpen={isAxisOpen}
        axis={axis} plot={plot}
        position={position}
        setposition={setposition}
        setaxis={setaxis}
        setplot={setplot}
        setAxisOpen={setAxisOpen} />
    </div>
  );
}
function mapStateToProps(state: any) {
  return {
    nodeElementType: state.createDiagramPageReducer.selectedNodeType,
    showRuler: state.createDiagramPageReducer.showRuler,
    pageInstance: state.createDiagramPageReducer.diagramPageInstance,
    grids: state.createDiagramPageReducer.grids,
    stateSpreadSheet: state.instanceReducer,
    notebooks: state.notebookReducer.notebooks,
    activeWorksheet: state.worksheetOperationReducer.activeWorksheet,
    openGraphs: state.worksheetOperationReducer.openGraphs,
    allActiveItem: state.notebookReducer.allActiveItem,
    enableSnapTo: state.createDiagramPageReducer.enableSnapTo,
    copiedElementIDS: state.createDiagramPageReducer.copiedElementIDS,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    optionsState: state.optionsReducer,
    graphPropertyState: state.graphPropertyReducer,
    helpMenu: state.helpMenuReducer,
    selectedCopiedItems: state.createDiagramPageReducer.selectedCopiedItems
  };
  //   enableSnapTo : state.createDiagramPageReducer.enableSnapTo,
  //   copiedElementIDS : state.createDiagramPageReducer.copiedElementIDS,
  //   optionsState: state.optionsReducer,
  // }
}
function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),

    actions: {
      setSelectedNode: bindActionCreators(setSelectedNode, dispatch),
      isSetRuler: bindActionCreators(isSetRuler, dispatch),
      isShowGrids: bindActionCreators(isShowGrids, dispatch),
      isSetSnapTo: bindActionCreators(isSetSnapTo, dispatch),
      setCopiedEleID: bindActionCreators(setCopiedEleID, dispatch),
      storeGraph: bindActionCreators(storeGraph, dispatch),
    },

    updateGraphProperty: (item) => {
      dispatch({ type: ACTION.UPDATE_GRAPH_PROPERTY, payload: item });
    },
    optionsAction: bindActionCreators(optionsAction, dispatch),
    graphPropertyAction: bindActionCreators(graphPropertyAction, dispatch),
    isUndoDataAvailable: bindActionCreators(isUndoDataAvailable, dispatch),
    isRedoDataAvailable: bindActionCreators(isRedoDataAvailable, dispatch),
    isReRenderGraph: bindActionCreators(isReRenderGraph, dispatch),
    setSelectedElements: bindActionCreators(setSelectedElements, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphPage);
