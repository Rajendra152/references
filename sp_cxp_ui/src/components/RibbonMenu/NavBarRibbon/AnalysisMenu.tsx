import {
  ActionButton,
  IContextualMenuProps,
  IIconProps,
  Image,
  Dropdown,
  mergeStyleSets,
  IDropdown,
  IDropdownOption,
  Dialog,
  DialogFooter,
  DialogType,
} from "office-ui-fabric-react";
import {
  TooltipHost,
  ITooltipHostStyles,
  DirectionalHint,
} from "@fluentui/react/lib/Tooltip";
// import * as toolTipId from './ToolTipIDs';
import React, { useState, useEffect , useRef} from "react";
import * as ConstantImage from "../../Constant/ConstantImage";
import * as ConstantFunc from "../../Constant/ConstantFunction";
import * as dropdown from "./AnalysisTestDropDown";
import * as sampleSizeAction from "../../../store/Analysis/SampleSize";
import * as powerAction from "../../../store/Analysis/Power";
import * as formatCellAction from "../../../store/Worksheet/FormatCell/actions";
//import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { useBoolean } from "@uifabric/react-hooks";
import { bindActionCreators } from "redux";
import { DefaultButton, IButtonProps } from "@fluentui/react/lib/Button";
import { connect } from "react-redux";
import * as plotEquationAction from "../../../store/Worksheet/FormatCell/actions";
import * as plotRegressionAction from "../../../store/Worksheet/FormatCell/actions";
import * as resultGraphAction from "../../../store/Analysis/actions";
import ResultGraph from "./ReportGraph";
import { ipcRenderer } from "electron";
// import { createGraphPage } from '../../../services/NotebookManagerServicesNew';
import {
  getDataSetByKey,
  createNewClient,
} from "../../../services/RedisServices";
import StatisticalTransformationModal from "../../Analysis/StatisticalTransformation/statisticalTranformationModal";
import ReportOptionsModal from "../../Report/options/ReportOptionsModal";
import * as reportOptionsAction from "../../../store/Worksheet/Report/actions";
import { getColumnData } from "../../../services/graphPageServices/GraphServices";
import * as storeSpreadsheetAction from "../../../store/Worksheet/SpreadSheet/actions";
import * as transformAction from "../../../store/Analysis/Transform/actions";
import QuickTransform from "./AnalysisMenu/QuickTransform";
import UserDefinedCompontent from "./AnalysisMenu/UserDefined";
import { createSectionWithReport } from "../../../services/notebookManagerServices/ReportCreation";
import * as ITEM_TYPE from "../../../services/notebookManagerServices/ConstantsNotebookManager";
import { setWorksheetData } from "../../../services/WorksheetServicesNew";
import { convertMetadata, convertNegtoPos } from "../../../components/Worksheet/Metadata";
import { api_call_test_options } from "../../RibbonMenu/Wizard/TestOptions/TestOptionsAPI";
import { post, get } from "../../../services/DataService";
import { getCell } from "@syncfusion/ej2-spreadsheet";
import * as componentInstance from "../../../store/Worksheet/SpreadSheet/actions";
import {
  updateSTInSpreadSheet,
  getActiveSheetColNames,
  getActiveSheetData,
  isWorksheetActive,
  getSpreadsheetColumn,
  calculateHistogram,
  loadTestDataToSpreadsheet,
  loadDataToSpreadsheet,
  getActiveWorksheet
} from '../../../utils/spreadsheet/spreadsheetUtility';
import * as advisorAction from '../../../store/Analysis/Advisor/actions';
import { readINIFile } from '../../../utils/globalUtility'
import * as math from 'mathjs';

import { storeWorksheet } from '../../../store/Worksheet/WorksheetOperation/actions';
import { useTranslation } from 'react-i18next';
import { useId } from '@fluentui/react-hooks';
import { storeGraph } from '../../../store/Worksheet/WorksheetOperation/actions';
import * as toolTipId from './ToolTipIDs';
import * as actionCreators from '../../../store/Helpmenu/actions';
import { transposeRowsToColumns } from '../../../services/graphPageServices/GraphServices'

import  {summaryInfoAction} from "../../../store/SummaryInfo/actions";
import MultipleComparison from '../Wizard/TestOptions/MultipleComparison';
import MultipleControl from '../Wizard/TestOptions/MultipleControl';
import MultipleControlL2 from '../Wizard/TestOptions/MultipleControlL2';
import MultipleControlL3 from '../Wizard/TestOptions/MultipleControlL3';
import { createGraphPage } from "../../../services/NotebookManagerServicesNew";
import { writeINIFile } from '../../../utils/globalUtility';
var redis = require('redis');
import { remote } from 'electron'

const modalPropsStyles = { main: { maxWidth: 450 } };
let sharedVariables = remote.getGlobal('shared');

var basepath = remote.app.getAppPath();
const subscriber = createNewClient()
const publisher = createNewClient()

const styles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};
const calloutProps = { gapSpace: 0 };

function Analysis(props: { smartToggle: boolean }) {
  const [responseMessageAlert, setResponseMessageAlert] = useState('')
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [histogramOutput, setHistogramOutput] = useState("A");
  const [histogramData, setHistogramData] = useState([]);
  const [buttonTypes, setButtonTypes] = useState([]);
  const [showMultipleModal, setshowMultipleModal] = useState(false);
  const [testdata, settestdata] = useState([]);
  const [worksheet_id, setworksheet_id] = useState('');
  const [notebook_id, setnotebook_id] = useState('');
  const resultGraphForSurvival = useRef(0);
  const { t } = useTranslation();
  let currentReport =
  props.notebooks &&
  props.notebooks.allReports.byId[props.allActiveItem.report];
 // console.log("currentreport", currentReport)
  const Run: IIconProps = ConstantFunc.imageProp(ConstantImage.Run, "menuIcon");
  const TestOption: IIconProps = ConstantFunc.imageProp(
    ConstantImage.TestOptions,
    "menuIcon"
  );
  const Rerun: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Rerun,
    "menuIcon"
  );
  const SampleSize: IIconProps = ConstantFunc.imageProp(
    ConstantImage.SampleSize,
    "menuIcon"
  );
  const Power: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Power,
    "menuIcon"
  );
  const Options: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Options,
    "menuIcon"
  );
  const Statistical: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Statistical,
    "menuIcon"
  );
  const QuickTransforms: IIconProps = ConstantFunc.imageProp(
    ConstantImage.QuickTransforms,
    "menuIcon"
  );
  const UserDefined: IIconProps = ConstantFunc.imageProp(
    ConstantImage.UserDefined,
    "menuIcon"
  );
  const Dynamic: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Dynamic,
    "menuIcon"
  );
  const Global: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Global,
    "menuIcon"
  );
  const PlotEquation: IIconProps = ConstantFunc.imageProp(
    ConstantImage.PlotEquation,
    "menuIcon"
  );
  const Histogram: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Histogram,
    "menuIcon"
  );
  const Smoothers: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Smoothers,
    "menuIcon"
  );
  const NormalizeTernaryData: IIconProps = ConstantFunc.imageProp(
    ConstantImage.NormalizeTernaryData,
    "menuIcon"
  );
  const PlotRegression: IIconProps = ConstantFunc.imageProp(
    ConstantImage.PlotRegression,
    "menuIcon"
  );

  const smoothersList: IContextualMenuProps = {
    className: "dropdownList",
    items: [
      {
        key: "smooth2d",
        text: "Smooth 2D Data",
        iconProps: {},
        onClick: () => {
          openSmoothers2D();
        },
      },
      {
        key: "smooth3d",
        text: "Smooth 3D Data",
        iconProps: {},
        onClick: () => {
          openSmoothers3D();
        },
      },
    ],
  };
  const sampleSizeList: IContextualMenuProps = {
    className: "dropdownList analysisDropDrown sampleSizeList",

    items: [
      {
        key: "ttest",
        text: "t-test...",
        iconProps: {},
        onClick: (ev) => {
          switchToWorksheet();
          props.sampleSizeAction.isOpenSaTtest({ message: true });
        },
      },
      {
        key: "pairedttest",
        text: "Paired t-test...",
        iconProps: {},
        onClick: (ev) => {
          switchToWorksheet();
          props.sampleSizeAction.isOpenSaPairedTtest({ message: true });
        },
      },
      {
        key: "proportions",
        text: "Proportions...",
        iconProps: {},
        onClick: (ev) => {
          switchToWorksheet();
          props.sampleSizeAction.isOpenSaProportions({ message: true });
        },
      },
      {
        key: "anova",
        text: "ANOVA...",
        iconProps: {},
        onClick: (ev) => {
          switchToWorksheet();
          props.sampleSizeAction.isOpenSaAnova({ message: true });
        },
      },
      {
        key: "chisquare",
        text: "Chi-square...",
        iconProps: {},
        onClick: (ev) => {
          switchToWorksheet();
          // console.log(ev);
          let Data = {
            message: "Hi",
            someData: "sampleSize",
            path: "analysisTestWizard",
            testOptions: ev.target.innerText,
            sheetData: [...props.stateSpreadSheet.spreadSheetColumnData],
            width: 496,
            height: 500,
          };
          ipcRenderer.send("request-mainprocess-action", Data);
        },
      },
      {
        key: "correlation",
        text: "Correlation...",
        iconProps: {},
        onClick: (ev) => {
          switchToWorksheet();
          props.sampleSizeAction.isOpenSaCorrelation({ message: true });
        },
      },
    ],
  };
  const powerList: IContextualMenuProps = {
    className: "dropdownList analysisDropDrown powerList",
    items: [
      {
        key: "ttest",
        text: "t-test...",
        iconProps: {},
        onClick: (ev) => {
          switchToWorksheet();
          props.powerAction.isOpenPwTtest({ message: true });
        },
      },
      {
        key: "pairedttest",
        text: "Paired t-test...",
        iconProps: {},
        onClick: (ev) => {
          switchToWorksheet();
          props.powerAction.isOpenPwPairedTtest({ message: true });
        },
      },
      {
        key: "proportions",
        text: "Proportions...",
        iconProps: {},
        onClick: (ev) => {
          switchToWorksheet();
          props.powerAction.isOpenPwProportions({ message: true });
        },
      },
      {
        key: "anova",
        text: "ANOVA...",
        iconProps: {},
        onClick: (ev) => {
          switchToWorksheet();
          props.powerAction.isOpenPwAnova({ message: true });
        },
      },
      {
        key: "chisquare",
        text: "Chi-square...",
        iconProps: {},
        onClick: (ev) => {
        //  console.log(ev);
          switchToWorksheet();
          let Data = {
            message: "Hi",
            someData: "power",
            path: "analysisTestWizard",
            sheetData: [...props.stateSpreadSheet.spreadSheetColumnData],
            testOptions: ev.target.innerText,
            width: 496,
            height: 400,
          };
          ipcRenderer.send("request-mainprocess-action", Data);
          // props.powerAction.isOpenPwChisquare({ message: true });
        },
      },
      {
        key: "correlation",
        text: "Correlation...",
        iconProps: {},
        onClick: (ev) => {
        //  console.log(props.powerAction);
          switchToWorksheet();
          props.powerAction.isOpenPwCorrelation({ message: true });
        },
      },
    ],
  };

  useEffect(() => {
    // console.log('****ANALYSIS MENU*******',ipcRenderer.rawListeners("sendtoAnalysisMenu"));
    // console.log(ipcRenderer);
    if (ipcRenderer.rawListeners("sendtoAnalysisMenu").length === 0) {
      ipcRenderer.on("sendtoAnalysisMenu", function (event, arg) {
        props.resultGraphAction.isTestOptionDisabled({ message: arg.testOptionDisabled })
      })
    }
    if (ipcRenderer.rawListeners("openMainReport").length === 0) {
      ipcRenderer.on("openMainReport", function (event, arg) {
      //  console.log(arg);
        testFunction(arg);
        ipcRenderer.removeAllListeners("openMainReport");
      });
    }
    ipcRenderer.on('wizard-closed', () => {
    //  console.log(props.storeSpreadsheet);
      props.storeSpreadsheet.updateWizardOpen({message: false});
      
    })
    settestsValue(props.optionsState.optionsCollection.General.testName);
    return () => {
      if (ipcRenderer != undefined) {
        ipcRenderer.removeAllListeners("openMainReport");
      }
      subscriber.removeAllListeners();
      publisher.removeAllListeners();
      ipcRenderer.removeAllListeners("quitWizard");
      ipcRenderer.removeAllListeners("wizard-closed");
      ipcRenderer.removeAllListeners("sendtoAnalysisMenu");
    };
  });
  const runMethod = async () => {
  //  console.log('props',props)
    let checkEmptySpreadsheet = checkSheet();
  //  console.log(checkEmptySpreadsheet);
    if (checkEmptySpreadsheet === false) {
      props.resultGraphAction.isTestOptionDisabled({ message: true })
      switchToWorksheet();
      let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
      let getWorksheetData = [...props.openWorksheets];
      let activeWorksheet = getWorksheetData[0].key;
    //  console.log(props.notebooks.allWorksheets.byId);
    //  console.log(getWorksheetData[0].key);
    //  console.log(props.notebooks.allWorksheets.byId[getWorksheetData[0].key])
      let activeClient = getWorksheetData[0].client;
      let gridData1 = await getDataSetByKey(activeWorksheet, activeClient);
      gridData1 = transposeRowsToColumns(gridData1);
    //  console.log(gridData1);
      let openedWorksheet = props.openWorksheets.filter(
        (item) => item.key == props.activeWorksheet
      );
        let gridData = await getDataSetByKey(
            openedWorksheet[0].key,
            openedWorksheet[0].client
          );
          gridData = gridData.map((_, colIndex) =>
          gridData.map((row) => (row[colIndex] ? row[colIndex] : {}))
          );
       

      
      // gridData = transposeRowsToColumns(gridData);
    //   console.log(gridData);
       let rowIndex =  props.referenceObjectState.getActiveSheet().usedRange.rowIndex ||
       props.referenceObjectState?.sheets[0]?.rowCount ;
      props.actions.rowIndexUpdate.updateRowIndex({
        message: rowIndex,
      });
      let Data = {
        message: "Hi",
        someData: "Let's go",
        path: "analysisTestWizard",
        sheetData: sheetData,
        testOptions: testsValue,
        width: 496,
        height: 480,
        openWorksheet: gridData,
        range : props.transformState.selectedRange
      };
     ipcRenderer.send("request-mainprocess-action", Data);
     
    } else {
      alert("There is no data in your worksheet");
    }
  };
  const testFunction = async (arg) => {
  //  console.log(arg)
    switchToWorksheet();
    let updatedRowIndex = props.rowIndex;
    let spreadSheetReference = props.referenceObjectState;
    let openedWorksheet = props.openWorksheets.filter(
      (item) => item.key == props.activeWorksheet
    );
    if (openedWorksheet.length) {
      let gridData = await getDataSetByKey(
        openedWorksheet[0].key,
        openedWorksheet[0].client
      );
    //  console.log(gridData, "dfghjkhb")
      gridData = gridData.map((_, colIndex) =>
        gridData.map((row) => (row[colIndex] ? row[colIndex] : {}))
      );
      // let req =
      const clientData = await setWorksheetData(
        [
          {
            sheetdata: gridData,
            metadata: convertMetadata(gridData),
          },
        ],
        "meta" + openedWorksheet[0].key
      );
      var result = api_call_test_options(arg, clientData.key, updatedRowIndex);
     // console.log('result', result);
      if (result[2] === 'Interactive test-MultiComparsion') {
      //  console.log('iside interactiv test flow multi');
        subscriber.subscribe('STITWITHDATA_IP');
        subscriber.subscribe('user-input');
      //  console.log('after subs to user-input');
        submitDataInteractiveTest(
          result[0],
          result[1],
          arg.testOptionsName,
          arg
        );
      //  console.log('after subscribe to channel');
        subscribeToChannel(); //calling redis subscribe method to check change in data
      } else if (result[2] === 'Interactive test') {
      //  console.log('Interactive test');
        subscriber.subscribe('user-input');
      //  console.log('after subs to user-input');
        submitDataInteractiveTest(
          result[0],
          result[1],
          arg.testOptionsName,
          arg
        );
      //  console.log("after subscribe to channel");
        subscribeToChannel(); //calling redis subscribe method to check change in data
      } else {
       // console.log("non instreatcive");
        submitData(result[0], result[1], arg.testOptionsName, arg);
      }
    }
  };
  const subscribeToChannel = () => {
    // alert("inside subscrbe")
    subscriber.on('message', (channel, message) => {
      if (channel == 'user-input') {
        let response = message;     
        response = JSON.parse(response);
        let responseMessage = response.MessageBox.Message.join();
        console.log(responseMessage);
        console.log(response.MessageBox.ButtonTypes);
        // if (responseMessage) {
        //   console.log('****Open dailog here*****')
        //   if(responseMessage === 'Normality and equal variance passed.,Do you want to run a One Way ANOVA?'){
        //     responseMessage = 'Normality and equal variance passed. Do you want to run a One Way ANOVA?'
        //   }
        //   if (responseMessage === 'Normality test passed,Do you want to run a One-Sample t-test?') {
        //     responseMessage = 'Normality test passed. Do you want to run a One-Sample t-test?'
        //   }
        //   setResponseMessageAlert(responseMessage)
        //   setButtonTypes(response.MessageBox.ButtonTypes)
        //   toggleHideDialog()

          
        // }
        if (confirm(responseMessage)) {
            publishToChannel();
          } else {
            publishToChannelCanceledByUser();
          }
      } else {
        console.clear();
      //  console.log('Received data from backend');
      //  console.log('Received data :' + message);
      //  console.log('Calling InteractiveFlow test');
        InteractiveFlow(message);
      }
    });
  };

  const InteractiveFlow = (message: any) => {
  //  console.log("Interactive calling");
    let response = message;
  //  console.log(response);
  //  console.log(typeof response);
    response = JSON.parse(response);
  //  console.log(response);
  //  console.log('message', response);
    if (response.ComparisonType !== undefined) {
      //<MultipleComparison modalDetails={response} />
      settestdata(response);
      props.actions.formatCellAction.isOpenMultipleComparisons({
        message: true,
      });
      //setshowMultipleModal(true)
    //  console.log('show modal');
    }
  };
  const publishToChannel = () => {
   // console.log('publishing data to user-response!');
    publisher.publish('user-response', 0);
  };
  const publishToChannelCanceledByUser = () => {
   // console.log('publishing data to user-response!');
    publisher.publish('user-response', 1);
  };
  const submitDataInteractiveTest = async (url, body, testName, params, currentReport) => {
    let spreadSheetReference = props.referenceObjectState;

    // console.log('inside submitData Interative test');
    // console.log(body+"body near post");
    // console.log(body);
    // console.log(worksheet_id);
    // console.log(props.notebooks.allWorksheets.byId.name)
   // console.log(props.notebooks.allWorksheets.byId[worksheet_id].name)
    body.worksheet_title=props.notebooks.allWorksheets.byId[worksheet_id].name;
    body.notebook=props.notebooks.allNotebooks.byId[notebook_id].name;
    let sendRes = await post(url, body);
  //  console.log("Response from backend", sendRes);
    if (sendRes !== undefined) {
      if (sendRes.data.result !== undefined) {
     //   console.log(sendRes.data.result.redis_id);
        props.storeSpreadsheet.updateRedistestkey({message: sendRes.data.result.redis_id});

      //  console.log(basepath, "fghjkl")
        const client = createNewClient();
        let optionsData = await getDataSetByKey(
          sendRes.data.result.redis_id,
          client
        );
      //  console.log('Options Data',optionsData)
        subscriber.removeAllListeners();
        publisher.removeAllListeners();
        if (optionsData.result_data.length > 0) {
         // console.log('For the love of Annova')
          loadTestDataToSpreadsheet(spreadSheetReference, optionsData);
        }
      
        setTimeout(() => {
          let isDescriptive = true;
          let reportdata =   createSectionWithReport(props, null, optionsData, null, testName, isDescriptive);
          if(testName === 'Single Group'){
            // resultGraphForSurvival.current = reportdata
          }
        },2000)
        
      } else {
        alert('ERROR: ' + sendRes.data.details);
        subscriber.removeAllListeners();
        publisher.removeAllListeners();
      }
    }
  };
  const submitData = async (url, body, testName, params) => {
  //  console.log('inside submitData Non Interative test');
    body.worksheet_title=props.notebooks.allWorksheets.byId[worksheet_id].name;
    body.notebook=props.notebooks.allNotebooks.byId[notebook_id].name;
    let sendRes = await post(url, body);
    let spreadSheetReference = props.referenceObjectState;
  //  console.log("Response from backend", sendRes);
    if (sendRes !== undefined) {
      if (sendRes.data.result !== undefined) {
      //  console.log(sendRes.data.result.redis_id);
        const client = createNewClient();
        let optionsData = await getDataSetByKey(
          sendRes.data.result.redis_id,
          client
        );
        // setHistogramData(optionsData);
      //  console.log(optionsData);
      //  console.log("Histogram output data", histogramData);
           if (testName === "Histogram") {
          let outputBody = params;
          calculateHistogram(
            spreadSheetReference,
            outputBody,
            optionsData,
            props
          );
        } else {
          if (optionsData.result_data.length > 0) {
          //  console.log('trying to load data to spreadsheet')
            loadTestDataToSpreadsheet(spreadSheetReference, optionsData);
          }
          setTimeout(() => {
            // createSectionWithReport(props, null, optionsData, null, testName);
            let reportdata =   createSectionWithReport(props, null, optionsData, null, testName);
             // if(testName === 'Single Group'){
          //   console.log('****Single group working*****')
          //   const graphObject = {
          //     data: {
          //       x: [...optionsData.graph.graph_types[0].col_selections] ,
          //       y : [...optionsData.graph.graph_types[0].col_selections]
          //     },
          //     format: 'XY',
          //     graphType: 'line',
          //     subGraphType: 'simpleStraight',
          //      };
          //     createGraphPage(
          //       props,
          //       graphObject,
          //       currentReport,
          //       currentReport.id,
          //       optionsData.graph.graph_types[0].name
          //     );
          // }
          },2000)
        
         //createSectionWithReport(props, null, optionsData, null, testName);
        }
      } else {
        alert("ERROR: " + sendRes.data.details);
      }
    }
  };
  const [testOptionName, settestOptionName] = useState("");
  const [testsValue, settestsValue] = useState(
    dropdown.tests.items[0].subMenuProps.items[0].text
  );
  const [testsKey, settestsKey] = useState(
    dropdown.tests.items[0].subMenuProps.items[0].key
  );
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

  // const [
  //   teachingResultGrpBubbleVisible,
  //   { toggle: toggleTeachingResultGrpBubbleVisible },
  // ] = useBoolean(false);

  // const exampleSecondaryBtnProps: IButtonProps = React.useMemo(
  //   () => ({
  //     children: 'OK',
  //     onClick: toggleTeachingResultGrpBubbleVisible,
  //   }),
  //   [toggleTeachingResultGrpBubbleVisible]
  // );

  // const openBubble = (param) => {
  //   toggleTeachingBubbleVisible();
  //   setBubbleObj(param);
  // };

  // const openResultGrpBubble = (param) => {
  //   toggleTeachingResultGrpBubbleVisible();
  //   setBubbleObj(param);
  // };

  //setting onclick on MenuProps of Tests
  const dropdownTestList = dropdown.tests;
  for (let i = 0; i < dropdownTestList.items.length; i++) {
    if (dropdownTestList.items[i].subMenuProps) {
      for (
        let j = 0;
        j < dropdownTestList.items[i].subMenuProps.items.length;
        j++
      ) {
        if (dropdownTestList.items[i].subMenuProps.items[j].subMenuProps) {
          for (
            let k = 0;
            k <
            dropdownTestList.items[i].subMenuProps.items[j].subMenuProps.items
              .length;
            k++
          ) {
            dropdownTestList.items[i].subMenuProps.items[j].subMenuProps.items[
              k
            ].onClick = (ev) => {
              // let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
              // let Data = {
              //   message: 'Hi',
              //   someData: "Let's go",
              //   path: 'analysisTestWizard',
              //   sheetData: sheetData,
              //   testOptions: ev.target.innerText,
              //  width: 496,
              //   height: 400,
              //   //spreadSheetReference:props.referenceObjectState
              // };
              // // Send information to the main process
              // // if a listener has been set, then the main process
              // // will react to the request !
              // ipcRenderer.send('request-mainprocess-action', Data);
              settestsValue(ev.target.innerText);
             // alert(ev.target.innerText)
             props.optionsState.optionsCollection.General.testName=ev.target.innerText
           // console.log(props.optionsState.optionsCollection);
            writeINIFile(props.optionsState.optionsCollection)
              settestsKey(
                dropdownTestList.items[i].subMenuProps.items[j].subMenuProps
                  .items[k].key
              );
            };
          }
        } else {
          dropdownTestList.items[i].subMenuProps.items[j].onClick = (ev) => {
            //let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
            // let Data = {
            //   message: 'Hi',
            //   someData: "Let's go",
            //   path: 'analysisTestWizard',
            //   sheetData: sheetData,
            //   testOptions: ev.target.innerText,
            //  width: 496,
            //   height: 400,
            //   //spreadSheetReference:props.referenceObjectState
            // };
            // // Send information to the main process
            // // if a listener has been set, then the main process
            // // will react to the request !
            // ipcRenderer.send('request-mainprocess-action', Data);
            settestsValue(ev.target.innerText);
            //alert(ev.target.innerText);
            props.optionsState.optionsCollection.General.testName=ev.target.innerText
           // console.log(props.optionsState.optionsCollection);
            writeINIFile(props.optionsState.optionsCollection)
            settestsKey(dropdownTestList.items[i].subMenuProps.items[j].key);
          };
        }
      }
    } else {
      dropdownTestList.items[i].onClick = (ev) => {
        let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
        // let Data = {
        //   message: 'Hi',
        //   someData: "Let's go",
        //   path: 'analysisTestWizard',
        //   sheetData: sheetData,
        //   testOptions: ev.target.innerText,
        //  width: 496,
        //   height: 400,
        //   // spreadSheetReference:props.referenceObjectState
        // };
        // // Send information to the main process
        // // if a listener has been set, then the main process
        // // will react to the request !
        // ipcRenderer.send('request-mainprocess-action', Data);
        settestsValue(ev.target.innerText);
       // alert(ev.target.innerText)
       props.optionsState.optionsCollection.General.testName=ev.target.innerText
           // console.log(props.optionsState.optionsCollection);
            writeINIFile(props.optionsState.optionsCollection)
        settestsKey(dropdownTestList.items[i].key);
      };
    }
  }

  useEffect(() => {
    return () => {
      ipcRenderer.removeAllListeners('fromWizard');
    }
  }, []);

  const [step, setStep] = useState("");
  const [transformGridData, setTransformGridData] = useState([]);
  const [selectedCols, setselectedCols] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [graph]

  const fromWizardCallback = (event, message) => {
    if (message.data) {
      if (message.data.step) {
        setStep(message.data.step);
        if (message.data && message.data.selectedCols) {
          setselectedCols(message.data.selectedCols);
        }
        setShowModal(true);
      } else if (message.data.updateSheet) {
        updateSTInSpreadSheet(
          props.referenceObjectState,
          message.data,
          props.notebookState,
          props.optionsState
        );
      }
    }
  }

  const openStatisticalTranformationWizard = (type: string, gridData: any, value: string) => {
    ipcRenderer.removeAllListeners('fromWizard');
    setTransformGridData(gridData);
    ipcRenderer.on("fromWizard", fromWizardCallback);

    const sheetData = [...getActiveSheetColNames(props.referenceObjectState)];

    let Data = {
      message: "Hi",
      someData: "Let's go",
      type: type,
      path: "statisticalTranformation",
      gridData: gridData,
      titleName: value,
      sheetData: sheetData,
      range: props.transformState.selectedRange
    };
    // Send information to the main process
    // if a listener has been set, then the main process
    // will react to the request !
    ipcRenderer.send(
      "request-mainprocess-action",
      JSON.parse(JSON.stringify(Data))
    );
  };

  const dropdownStatistical = dropdown.statistical;
  for (let i = 0; i < dropdownStatistical.items.length; i++) {
    if (dropdownStatistical.items[i].subMenuProps) {
      for (
        let j = 0;
        j < dropdownStatistical.items[i].subMenuProps.items.length;
        j++
      ) {
        dropdownStatistical.items[i].subMenuProps.items[j].onClick = (ev) => {
          statisticalTransformClickHandler(
            dropdownStatistical.items[i].key +
              dropdownStatistical.items[i].subMenuProps.items[j].key,
            dropdownStatistical.items[i].subMenuProps.items[j].text+' '+dropdownStatistical.items[i].text
          );
        };
      }
    } else {
      dropdownStatistical.items[i].onClick = (ev) => {
        statisticalTransformClickHandler(dropdownStatistical.items[i].key,dropdownStatistical.items[i].text);
      };
    }
  }

  const statisticalTransformClickHandler = (type: string, value: string) => {
    /* let gridData = await getDataSetByKey(props.openWorksheets[0].key, props.openWorksheets[0].client)
      gridData = gridData[0].map((_: any, colIndex: number)=> gridData.map((row: any) => row[colIndex])); */
    if (isWorksheetActive(props.notebookState)) {
      openStatisticalTranformationWizard(
        type,
        getActiveSheetData(props.referenceObjectState),
        value
      );
    }
  };

  const quickTransformClickHander = () => {
    props.OpenHelpWindow("quick_transform", "", "");
    if (isWorksheetActive(props.notebookState)) {
      props.transformAction.isOpenQuickTransform({
        message: true,
      });
    }
  };
  const transposeRowsToColumns = (grid) => {
    const transposedData = grid[0].map((_, colIndex) =>
      grid.map((row) => row[colIndex])
    );
    return transposedData;
  };


  const userDefinedTransformClickHandler = () => {
    props.OpenHelpWindow("user_defined_functions", "", "");
    if (isWorksheetActive(props.notebookState)) {
      props.transformAction.isOpenUserDefined({
        message: true,
      });
    }
  };

  const switchToWorksheet = () => {
    let active_item = props.allActiveItem;

   // console.log(props.allActiveItem);
    let actvItem = props.activeItems;

   // console.log(active_item.worksheet)
    if (active_item.worksheet === null) {

      for (let i = actvItem.length - 1; i >= 0; i--) {
     //   console.log(actvItem[i].type === ITEM_TYPE.WORKSHEET);

        if (actvItem[i].type === ITEM_TYPE.WORKSHEET) {

          let allActiveItem = {
            notebook: actvItem[i].parentNotebookId,
            section: actvItem[i].parentSectionId,
            worksheet: actvItem[i].id,
            graphPage: {
              id: "",
              object: null,
            },
            report: null,
            selectedItemOnNotebook: actvItem[i].id,
            cursor: actvItem[i].id,
          };

          setworksheet_id(allActiveItem.worksheet)
          setnotebook_id(allActiveItem.notebook)
          const newSummary = {
            id: actvItem[i].id,
            type: actvItem[i].type,
            createdDate: actvItem[i].createdDate,
            modifiedDate: actvItem[i].modifiedDate,
            author: actvItem[i].author,
            description: actvItem[i].description,
          };
          props.summaryInfoAction(newSummary);

          props.setAllActiveItem(allActiveItem);

          props.setSelectedPivotItem(actvItem[i].id);
         
          break;
        }
       
      }
    }else{
      setworksheet_id(active_item.worksheet) 
      setnotebook_id(active_item.notebook)
    }
  };

  const checkSheet = () => {
    var activeSheet = props.referenceObjectState.getActiveSheet();
  var address = activeSheet.usedRange;
    var colIndex = address.colIndex;
    var rowIndex = address.rowIndex;
    var isNotEmpty;
    if (rowIndex > 0 || colIndex > 0) {
      for (let i = 0; i <= rowIndex; i++) {
        for (let j = 0; j <= colIndex; j++) {
          let cell = getCell(i, j, activeSheet); // rowIndex, colIndex, sheetIndex
          if (cell && cell.value && !isNotEmpty) {
            isNotEmpty = true;
            console.log("sheet is Not Empty");
            return false;
            break;
          } else if (i == rowIndex && j == colIndex && !isNotEmpty) {
            console.log("sheet is Empty");
            return true;
          }
        }
        if (isNotEmpty) {
          break;
        }
      }
    } else {
      console.log("sheet is Empty");
      return true;
    }
  };
  // const normalizeMenu = () => {
  //   let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
  //   let Data = {
  //     message: 'Hi',
  //     someData: "Let's go",
  //     path: 'analysisTestWizard',
  //     sheetData: sheetData,
  //     testOptions: 'Normalize Ternary Data',
  //     width: 496,
  //     height: 400,
  //   };
  // const runMethod = async () => {
  //   switchToWorksheet();
  //   let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
  //   let getWorksheetData = [...props.openWorksheets];
  //   let activeWorksheet = getWorksheetData[0].key;
  //   let activeClient = getWorksheetData[0].client;
  //   let gridData = await getDataSetByKey(activeWorksheet, activeClient);
  //   gridData = transposeRowsToColumns(gridData);
  //   let Data = {
  //     message: 'Hi',
  //     someData: "Let's go",
  //     path: 'analysisTestWizard',
  //     sheetData: sheetData,
  //     testOptions: testsValue,
  //     width: 496,
  //     height: 400,
  //     openWorksheet: gridData,
  //   };
  //   ipcRenderer.send('request-mainprocess-action', Data);
  // };
  const normalizeMenu = () => {
    props.storeSpreadsheet.updateWizardOpen({message: true});
    let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
    let Data = {
      message: "Hi",
      someData: "Let's go",
      path: "analysisTestWizard",
      sheetData: sheetData,
      testOptions: "Normalize Ternary Data",
      width: 496,
    //  height: 400,
    };
    ipcRenderer.send("request-mainprocess-action", Data);
  };
  const openSmoothers2D = () => {
    let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
    let Data = {
      message: "Hi",
      someData: "Let's go",
      path: "analysisTestWizard",
      sheetData: sheetData,
      testOptions: "Smoothers2D",
      width: 496,
      height: 400,
      //spreadSheetReference:props.referenceObjectState
    };

    ipcRenderer.send("request-mainprocess-action", Data);
  };

  const openSmoothers3D = () => {
    let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
    let Data = {
      message: "Hi",
      someData: "Let's go",
      path: "analysisTestWizard",
      sheetData: sheetData,
      testOptions: "Smoothers3D",
      width: 496,
      height: 400,
      //spreadSheetReference:props.referenceObjectState
    };

    ipcRenderer.send("request-mainprocess-action", Data);
  };

  const openHistogram = () => {
    switchToWorksheet();
    let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
    let Data = {
      message: "Hi",
      someData: "Let's go",
      path: "analysisTestWizard",
      sheetData: sheetData,
      testOptions: "Histogram",
      width: 496,
      height: 500,

      //spreadSheetReference:props.referenceObjectState
    };

    ipcRenderer.send("request-mainprocess-action", Data);
  };

  const disableTestOptions = () => {
    if(props.isTestOptionDisabled || testsKey === 'fisherExactTest') {
      return "disableItem";
    }
    // if(testsKey === 'fisherExactTest') {
    //   return "disableItem";
    // }
    return "";
  }

  const disableTestsDropdown = () => {
    // console.log("here rachana",getActiveWorksheet(props.reportOptionsState).length,props)
    if(getActiveWorksheet(props.notebookState).length === 0 &&  props.allActiveItem.report == null) {
      return "disableItem";
    }
    return "";
  }
  const arrayIncludesInObj = (arr, key, valueToCheck) => {
    return arr.some(value => value[key] === valueToCheck);
  }
  let disableResultGraph = () => {
    if (
      currentReport && currentReport.reportData && currentReport.reportData.graph &&
      (Object.keys(currentReport.reportData.graph).length !== 0 && !arrayIncludesInObj(currentReport?.reportData?.graph?.graph_types, "name", "Survival Analysis"))
    ) {
      return "";
    } else {
      return "disableItem";
    }
    // let disableItem =
    // props.allActiveItem.report !== undefined &&
    // props.allActiveItem.report.reportData !== undefined &&
    //   props.allActiveItem.report.reportData.graph &&
    //   props.allActiveItem.report.reportData.graph.length > 0
    //     ? ''
    //     : 'disableItem';
    //     return disableItem
  };
  const dialogContentProps = {
    type: DialogType.normal,
    title: 'SigmaPlotng',
    subText: responseMessageAlert,
  };
  const modalProps = React.useMemo(
    () => ({
    isBlocking: true,
      styles: modalPropsStyles,
     
  }),
    [],
  );
  const yesFunction=()=>{
    publishToChannel();
    toggleHideDialog()
  }
  const noFunction=()=>{
    publishToChannelCanceledByUser();
    toggleHideDialog()
  }
  console.log(buttonTypes)
  const dailogButton = buttonTypes.map((item)=>{
    //  console.log(item)
      return(
          <DefaultButton 
          key={ item }
          onClick={ item === 'Ok' || item === 'Yes' ? yesFunction : noFunction } 
          text={item} 
          />
      )
  })

  return (
    <div className="ms-Grid" dir="ltr">
      <MultipleComparison
        modalData={testdata}
        isOpen={props.formatCellState.isOpenMultipleComparisons}
      />
      <MultipleControl
        modalData={testdata}
        isOpen={props.formatCellState.isOpenMultipleControl}
      />
      <MultipleControlL2
        modalData={testdata}
        isOpen={props.formatCellState.isOpenMultipleControlL2}
      />
      <MultipleControlL3
        modalData={testdata}
        isOpen={props.formatCellState.isOpenMultipleControlL3}
      />
       <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          {dailogButton}
        </DialogFooter>
      </Dialog>
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
      )}
      {teachingResultGrpBubbleVisible && (
        <TeachingBubble
          target={'#' + bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryBtnProps}
          onDismiss={toggleTeachingResultGrpBubbleVisible}
          headline={bubbleObj.title}
        >
          {bubbleObj.message}
        </TeachingBubble>
      )} */}
      <div className='ms-Grid-row'>
        <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12 ribbon-container'>
          <div className='ribbon-btn-box mrspace'>
            <div
              className={
                !props.smartToggle
                  ? "ribbon-grid-button"
                  : "ribbon-grid-button sim-ribbon-grid-submenubutton"
              }>
              <div
                id='advisorID'
                onClick={() => {
                  props.advisorAction.isOpenAdvisor({
                    message: true,
                  });
                }}
                className={
                  !props.smartToggle
                    ? "ribbon-gbutton"
                    : "ribbon-gbutton sim-ribbon-gbutton"
                   
                }>
                <div
                className={`hor-button hr-btn-smallIcons analysis-stat-grp2 ${disableTestsDropdown()}`}
                >

               
                <TooltipHost
                  content={t(
                    "Determine appropriate statistical test and execute it"
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdAdvisory}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Advisor}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    Advisor
                  </ActionButton>
                  </TooltipHost>
                  </div>
              </div>

              <div className={`hor-button hr-btn-smallIcons analysis-stat-grp2 ${disableTestsDropdown()}`}>
                {/* <Dropdown
                  placeholder="           "
                  options={dropdown.tests}/> */}
                <DefaultButton
                  className='defalut-dropdown-button'
                  text={testsValue}
                  split
                  splitButtonAriaLabel='See 2 options'
                  aria-roledescription='split button'
                  menuProps={dropdownTestList}

                  //onClick={_alertClicked}
                  // disabled={disabled}
                  // checked={checked}
                />
                {/* <ActionButton menuProps={dropdown.tests}>
                  One&nbsp;Way&nbsp;Frequency&nbsp;Tables
                </ActionButton> */}
                <TooltipHost
                  content={t("Run the current test")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdRun}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <ActionButton iconProps={Run} onClick={() => runMethod()}>
                    Run
                  </ActionButton>
                </TooltipHost>
                {/* 
                <ActionButton
                  iconProps={TestOption}
                  allowDisabledFocus
                  onClick={() =>
                    props.reportOptionsAction.isOpenReportOptions({
                      message: true,
                      optionType: testsKey,
                    })
                  }
                >
                  Test Options
                </ActionButton> */}
                <div
                  onClick={() =>
                    props.reportOptionsAction.isOpenReportOptions({
                      message: true,
                      optionType: {testsKey, testsValue},
                    })
                  }
                  className={disableTestOptions()}
                >
                  <TooltipHost
                    content={t(
                      "View and change the options for the current test."
                    )}
                    closeDelay={100}
                    id={toolTipId.tooltipIdTestOptions}
                    calloutProps={calloutProps}
                    styles={styles}
                    directionalHint={DirectionalHint.bottomCenter}>
                    <ActionButton
                      iconProps={TestOption}
                      allowDisabledFocus
                    >
                      {t("Test\u00a0Options")}
                    </ActionButton>
                  </TooltipHost>
                </div>
              </div>
              {/* <div className="hor-button hr-btn-smallIcons analysis-stat-grp4">
                <ActionButton iconProps={SampleSize} menuProps={sampleSizeList}>
                  Sample&nbsp;size
                  </ActionButton>
                </TooltipHost>
                <TooltipHost
                  content={t("Compute the ability of a selected test to detect a significant difference.")}
                  closeDelay={100}
                  id={toolTipId.tooltipIdPower}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                <ActionButton iconProps={Power} menuProps={powerList}>
                  Power
                </ActionButton>
              </div> */}

              <div
                className={
                  !props.smartToggle
                    ? "ribbon-gbutton graphsAlignTop"
                    : "ribbon-gbutton sim-ribbon-gbutton graphsAlignTop"
                }>
                <TooltipHost
                  content={t(
                    "Compute the sample size needed to detect a significant difference for the selected test."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdSampleSize}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.SampleSize}
                  />
                  <ActionButton
                    className='box-btn'
                    allowDisabledFocus
                    menuProps={sampleSizeList}>
                    Sample Size
                    {/* {t('Sample Size')} */}
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? "ribbon-gbutton graphsAlignTop"
                    : "ribbon-gbutton sim-ribbon-gbutton graphsAlignTop"
                }>
                <TooltipHost
                  content={t(
                    "Compute the ability of a selected test to detect a significant difference."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdPower}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Power}
                  />

                  <ActionButton
                    className='box-btn'
                    allowDisabledFocus
                    menuProps={powerList}>
                    {t("Power")}
                  </ActionButton>
                </TooltipHost>
              </div>

              <div
                id='resultGrpID'
                onClick={() =>
                  props.resultGraphAction.isOpenResultGraph({ message: true })
                }
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${disableResultGraph()} graphsAlignTop`
                    : `sim-ribbon-gbutton ${disableResultGraph()} graphsAlignTop`
                }
                >
                <TooltipHost
                  content={t(
                    "Graph the results of a statistical test after obtaining the report."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdResultGraphs}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.CreateResultGraph}
                  />
                  <ActionButton className='box-btn' allowDisabledFocus>
                    {t("Result Graphs")}
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className='ribbon-boxbtn-lbl'>Statistics</label>
          </div>
     
          <div className='ribbon-btn-box mrspace'>
            <div
              className={
                !props.smartToggle
                  ? "ribbon-grid-button"
                  : "ribbon-grid-button sim-ribbon-grid-submenubutton"
              }>
              <div
                id='statistical'
                className={
                  !props.smartToggle
                    ? "ribbon-gbutton graphsAlignTop"
                    : "ribbon-gbutton sim-ribbon-gbutton graphsAlignTop"
                }>
                <TooltipHost
                  content={t(
                    "Modify worksheet data for statistical applications."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdStatisticalTransform}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Statistical}
                  />
                  <ActionButton
                    className='box-btn'
                    allowDisabledFocus
                    menuProps={dropdown.statistical}>
                    {t("Statistical")}
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                id='quickTransform'
                className={
                  !props.smartToggle
                    ? "ribbon-gbutton graphsAlignTop"
                    : "ribbon-gbutton sim-ribbon-gbutton graphsAlignTop"
                }>
                <TooltipHost
                  content={t(
                    "Run a single line transform by selecting functions from a panel and selecting worksheet columns."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdQuickTransform}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.QuickTransforms}
                  />
                  <ActionButton
                    className='box-btn'
                    allowDisabledFocus
                    onClick={quickTransformClickHander}>
                    {t("Quick\xa0Transform\xa0")}
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                id='userDefined'
                className={
                  !props.smartToggle
                    ? "ribbon-gbutton graphsAlignTop"
                    : "ribbon-gbutton sim-ribbon-gbutton graphsAlignTop"
                }>
                <TooltipHost
                  content={t(
                    "Enter a multiline transform for complex computations."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdUserTransform}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.UserDefined}
                  />
                  <ActionButton
                    className='box-btn'
                    allowDisabledFocus
                    onClick={userDefinedTransformClickHandler}>
                    {t("User\u00a0Defined")}
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className='ribbon-boxbtn-lbl'>{t("Transform")}</label>
          </div>
      

          {/* <div className="ribbon-btn-box">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-submenubutton'
              }
            >
            
              <div
                id="non linear"
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.Nonlinear}
                />
                <ActionButton className="box-btn" allowDisabledFocus>
                  Nonlinear
                </ActionButton>
              </div>
              <div
                id="dynamic"
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.Dynamic}
                />
                <ActionButton className="box-btn" allowDisabledFocus>
                  Dynamic
                </ActionButton>
              </div>
              <div
                id="global"
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton graphsAlignTop'
                    : 'ribbon-gbutton sim-ribbon-gbutton graphsAlignTop'
                }
              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.Global}
                />
                <ActionButton className="box-btn" allowDisabledFocus>
                  Global
                </ActionButton>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Regression</label>
          </div> */}

        

          <div className='ribbon-btn-box mrspace'>
            <div
              className={
                !props.smartToggle
                  ? "ribbon-grid-button"
                  : "ribbon-grid-button sim-ribbon-grid-submenubutton"
              }>
              <div
                id='histogram'
                className={
                  !props.smartToggle
                    ? "ribbon-gbutton graphsAlignTop"
                    : "ribbon-gbutton sim-ribbon-gbutton graphsAlignTop"
                }
                onClick={openHistogram}>
                <TooltipHost
                  content={t(
                    "Produce a frequency histogram of a worksheet column."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdHistogram}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.Histogram}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    {t('Histogram')}
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                id='normalize'
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton graphsAlignTop ${props.isWizardOpen ? 'disableItem' : ''}`
                    : `ribbon-gbutton sim-ribbon-gbutton graphsAlignTop ${props.isWizardOpen ? 'disableItem' : ''}`
                }
                // className={
                //   !props.smartToggle
                //     ? `ribbon-gbutton graphsAlignTop}`
                //     : `ribbon-gbutton sim-ribbon-gbutton graphsAlignTop }`
                // }
                onClick={() => normalizeMenu()}
                >
                <TooltipHost
                  content={t(
                    "Normalize the selected columns into data required by a Ternary Plot."
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdNormalize}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}>
                  <Image
                    alt='ribbon-icon'
                    className='ribbon-icon-svg'
                    src={ConstantImage.NormalizeTernaryData}
                  />
                  <ActionButton
                    className='box-btn'
                    allowDisabledFocus
                    
                  >
                    {t('Normalize\u00a0Ternary\u00a0Data')}
                  </ActionButton>
                </TooltipHost>
              </div>
              {/* <div>
              <ActionButton
                    className="box-btn"
                    allowDisabledFocus
                  onClick={() => { 
                    let arr = [[1, 2], [4, 5, 6], [7, 8, 9]]
                   // let modArr = math.transpose(arr)
                    let modArr = transposeRowsToColumns(arr)
                    console.log(modArr)
                    props.referenceObjectState.sheets[0].ranges[0].startCell = 'J1';

                    //Assigns the output data to Spreadsheet's data source
                    props.referenceObjectState.sheets[0].ranges[0].dataSource = modArr;
                  
                    //To ensure data persists even when we switch tabs 
                    props.referenceObjectState.actionComplete(); 
                    console.log(props.referenceObjectState)
                    }}
                  >
                    {t('Test')}
                  </ActionButton>
              </div> */}
            </div>
            <label className='ribbon-boxbtn-lbl'>Graph Analysis</label>
          </div>
        </div>
      </div>
      <ResultGraph />
      {showModal && (
        <StatisticalTransformationModal
          gridData={transformGridData}
          selectedCols={selectedCols}
          step={step}
          close={() => setShowModal(false)}></StatisticalTransformationModal>
      )}
      {props.reportOptionsState.isOpenReportOptions && (
        <ReportOptionsModal
          isOpen={props.reportOptionsState.isOpenReportOptions}
        />
      )}
      {props.transformState.isOpenQuickTransform && <QuickTransform />}
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    OpenHelpWindow: (
      RibbonMenu: string,
      selectedElement: string,
      selectedItem: string
    ) =>
      dispatch(
        actionCreators.setHelpWindowOpen(
          RibbonMenu,
          selectedElement,
          selectedItem
        )
      ),

    actions: {
      storeWorksheet: bindActionCreators(storeWorksheet, dispatch),
      rowIndexUpdate: bindActionCreators(componentInstance, dispatch),
      formatCellAction: bindActionCreators(formatCellAction, dispatch),
    },
    reportOptionsAction: bindActionCreators(reportOptionsAction, dispatch),
    sampleSizeAction: bindActionCreators(sampleSizeAction, dispatch),
    powerAction: bindActionCreators(powerAction, dispatch),
    storeSpreadsheet: bindActionCreators(storeSpreadsheetAction, dispatch),
    transformAction: bindActionCreators(transformAction, dispatch),
    plotEquationAction: bindActionCreators(plotEquationAction, dispatch),
    plotRegressionAction: bindActionCreators(plotRegressionAction, dispatch),
    resultGraphAction: bindActionCreators(resultGraphAction, dispatch),
    advisorAction: bindActionCreators(advisorAction, dispatch),

    setActiveItem: (activeItem: IActiveItems) => {
      dispatch({ type: "SET_ACTIVE_ITEM", payload: activeItem });
    },

    setAllActiveItem: (allactiveItem: IActiveItems) => {
      dispatch({ type: "SET_ALL_ACTIVE_ITEM", payload: allactiveItem });
    },
    addSection: (newSection: IActiveItems) => {
      dispatch({ type: "ADD_SECTION", payload: newSection });
    },
    setSelectedPivotItem: (pvtItem) => {
      dispatch({ type: "SET_SELECTED_PIVOT_ITEM", payload: pvtItem });
    },
    addGraphPage: (item) => {
      dispatch({ type: "ADD_GRAPHPAGE", payload: item });
    },
    storeGraph: bindActionCreators(storeGraph, dispatch),

    addReport: (newReport: IActiveItems) => {
      dispatch({ type: "ADD_REPORT", payload: newReport });
    },
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
  };
};

function mapStateToProps(state) {
  return {
    isTestOptionDisabled: state.resultGraphReducer.testOptionDisable,
    activeWorksheet: state.worksheetOperationReducer.activeWorksheet,
    notebooks: state.notebookReducer.notebooks,
    activeItems: state.notebookReducer.activeItems,
    allActiveItem: state.notebookReducer.allActiveItem,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    reportOptionsState: state.reportOptionsReducer,
    stateSpreadSheet: state.instanceReducer,
    referenceObjectState: state.instanceReducer.instance,
    isWizardOpen: state.instanceReducer.isWizardOpen,
    transformState: state.transformReducer,
    plotEquationState: state.formatCellReducer,
    notebookState: state.notebookReducer,
    plotRegressionState: state.formatCellReducer,
    rowIndex: state.instanceReducer.rowIndex,
    defaultOption: state.optionsReducer,
    openGraphs: state.worksheetOperationReducer.openGraphs,
    isOpenResultGraph: state.resultGraphReducer.isOpenResultGraph,
    licenseInfo: state.licenseInfoReducer,
    formatCellState: state.formatCellReducer,
    optionsState: state.optionsReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis);
