import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resultGraphAction from '../../../store/Analysis/actions';
import CloseIcon from '@material-ui/icons/Close';
import { storeGraph } from '../../../store/Worksheet/WorksheetOperation/actions';
import { createGraphPage } from '../../../services/NotebookManagerServicesNew';
import * as TYPES from '../../../services/graphPageServices/allGraphType/GraphTypeConstants';
import { resultGraphTypes } from '../../RibbonMenu/Wizard/GraphList/ResultGraphList';
import * as TestTypes from '../../RibbonMenu/Wizard/GraphList/TestGraphsList';
import { createGraph } from '../../../services/graphPageServices/GraphServices';
import * as actionCreators from '../../../store/Helpmenu/actions'
import Helpbutton from '../../../HelpButtonTransparent';
import { createWorksheetDatarecompute } from '../../../services/NotebookManagerServices/ReportCreation';
import { summaryInfoAction } from "../../../store/SummaryInfo/actions";
import HistoModal from './HistogramReport';
import CovariantReport from './CovariantReport';
import SelectVariable from './SelectVariable'
import {
  getCellAddress,
  getColIndex,
  getColumnHeaderText,
  getIndexesFromAddress,
} from '@syncfusion/ej2-react-spreadsheet';
import * as actionhistogram from '../../../store/Worksheet/Sort/actions';
import { post } from '../../../services/DataService';
import { pairedttestutility } from "../../App/Config";
import FrequencyBar from './FrequencyBar';
import {
  getDataSetByKeyHistogram,
  createNewClient, getDataSetByKey
} from "../../../services/RedisServices";
import { storeWorksheet } from '../../../store/Worksheet/WorksheetOperation/actions';
import * as componentInstance from "../../../store/Worksheet/SpreadSheet/actions";
import * as formatCellAction from "../../../store/Worksheet/FormatCell/actions";
const { ipcRenderer } = require('electron');

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: '50%',
    left: '50%',
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid black',
    padding: '12px 0px 0px',
    outline: 'none',
  },
  buttons: {
    width: '100%',
    margin: '5px 0px',
  },
  head1: {
    paddingLeft: '5px',
    margin: '0px 10px 10px 0px',
  },
  bodybg: {
    backgroundColor: '#ccd2d8ed',
    margin: 'auto',
    padding: '15px',
  },
  insidebg: {
    backgroundColor: 'white',
    height: '300px',
    overflowY: 'auto',
    border: '1px solid grey',
  },
  font12: {
    fontSize: '12px',
  },
  resimg: {
    marginLeft: '43%',
    width: 26,
    height: 23,
    backgroundColor: 'white',
  },
  grname: {
    margin: '0px',
    textAlign: 'center',
  },
  bgselect: {
    backgroundColor: '#0985e3',
    color: 'white',
  },
}));

function ResultModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState({});
  const [selected, graphSelections] = useState('false');
  const [type, setType] = useState('');
  const [graphType, setGraphType] = useState('');
  const [resultGraphs, setResultGraphs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCovariantModal, setcovariateModal] = useState(false);
  const [showDataVariableModal, setShowdatavariable] = useState(false);
  const [showFrequencyBar, setshowFrequencyBar] = useState(false);




  const resultValues = useRef(0);
  const reportValue = useRef('');
  // const [currentReport, setCurrentReport] = useState('')
  let currentReport =
    props.notebooks &&
    props.notebooks.allReports.byId[props.allActiveItem.report];


  let typeId
  useEffect(() => {
    console.log('currentReportID', currentReport);
    if (resultValues.current > 0) {
      console.log(selectedGraph);
      let selectedValues = Object.values(selectedGraph);
      let selectedGraphKeys = Object.keys(selectedGraph);

      let item = selectedValues[selectedValues.length - resultValues.current];
      let keyName =
        selectedGraphKeys[selectedValues.length - resultValues.current];
      console.log(selectedValues, 'hello nikhila', selectedGraph);
      console.log(item);
      createGraphinPage(
        item.graphType,
        item.subGraphType,
        item.format,
        item.data,
        reportValue.current.id,
        keyName
      );
      resultValues.current -= 1;
      if (resultValues.current == 0) {
        handleClose()
      }
    }
  }, [props]);

  useEffect(() => {
    if (!props) {
      props.OpenHelpWindow('generating_report_graphs', '', '')
    }
  }, [])

  const openHelpWindow = () => {
    console.log('1');
    let Data = {
      message: 'Help',
      someData: "Let's go",
      path: 'helpMenu/generating_report_graphs'
    };
    ipcRenderer.send('request-mainprocess-action', Data);
  }

  const GraphSelection = (active, resultGraphType) => {
    console.log("here", active, resultGraphType, selectedGraph)
    let graphsResult = [...resultGraphs];
    if (selectedGraph.hasOwnProperty(active)) {
      delete selectedGraph[active];
      setSelectedGraph({ ...selectedGraph });
      graphsResult.slice();
    } 
    else {
      setSelectedGraph({ ...selectedGraph, [active]: resultGraphType });
      graphsResult.push({ [active]: resultGraphType });
      setResultGraphs(graphsResult);
    }
    graphSelections(active);
  };

  const handleClose = () => {
    if (resultValues.current == 0) {
      // setSelectedGraph({})  ask nikila why this
    }
    setOpen(false);
    props.actions.resultGraphAction.isOpenResultGraph({
      message: false,
    });
  };
  console.log(props, 'notebooks');

  const getResultGraphs = () => {
    if (
      currentReport &&
      currentReport.reportData &&
      currentReport.reportData.graph &&
      Object.keys(currentReport.reportData.graph).length !== 0
    ) {
      console.log(Object.keys(currentReport.reportData.graph).length);
      console.log("currentRepor", currentReport);

      return currentReport.reportData.graph.graph_types.map((item) => {
        if (item.name == "Histogram") {
          if (currentReport.testOptionName == "Normality") {

          }
          else {
            SourceColumn = getColumnHeaderText(item.col_selections[0] + 1)
            props.selecthistSrc(SourceColumn)
            console.log("SourceColumn", SourceColumn)
          }

        }
        console.log(resultGraphTypes[item.name], 'inside', item.name);
        if (resultGraphTypes[item.name] !== undefined) {
          let resultGraphData = JSON.parse(
            JSON.stringify(resultGraphTypes[item.name])
          );
          let keys = ['x', 'y', 'error1']
          for (const key in resultGraphData.data) {
            if (keys.includes(key))
              resultGraphData.data[key] = [...item.col_selections];
          }
          console.log(resultGraphData, 'inside graphs--->');
          return (
            <div
              style={{ padding: '10px' }}
              className={
                selectedGraph.hasOwnProperty(item.name) ? classes.bgselect : ''
              }
              onClick={() => GraphSelection(item.name, resultGraphData)}
            >
              <img
                className={classes.resimg}
                src={resultGraphTypes[item.name].image}
                alt=""
              />
              <p className={`${classes.grname} ${classes.font12}`}>
                {item.name}
              </p>
            </div>
          );
        }
      });
    } else {
      return '<> </>';
    }
  };

  // const createDynamicData = () => {

  // }

  var newWorksheet
  var SourceColumn: String;

  const updateSrcColum = (col) => {
    console.log("here1 rachu")
    SourceColumn = col
    props.selecthistSrc(col)
    console.log("here2 rachu")
  }

  const OpenHistogram = () => {
    setShowdatavariable(false)
    setShowModal(true)
  }

  const createResultGraph = async (selectedGraphs: any, currentReport: any) => {
    console.log(currentReport, 'helloo nikhila', selectedGraphs);
    // Object.values(selectedGraphs).map((item) => {
    //   console.log(item)

    // createGraphinPage(item.graphType, item.subGraphType, item.format, item.data , currentReport.id)
    // })
    newWorksheet = currentReport.id
    let selectedValues = Object.values(selectedGraphs);
    let selectedGraphKeys = Object.keys(selectedGraphs);
    console.log(selectedGraphKeys[0], 'helloo rachu', selectedGraphKeys, selectedGraphs);
    let keyhist = false, keycovarient = false, cocount = 0, keyFrequency = false, nrmlityprblty = false, bfraftlne = false
    Object.keys(selectedGraphs).forEach((key: any) => {
      console.log("here rachu", key.length)
      if (key == "Histogram") {
        keyhist = true
      }
      else if (key == "Adjusted Survival Curves") {
        keycovarient = true
        cocount = cocount + 1
      }
      else if (key == "Log-Log Survival Curves") {
        keycovarient = true
        cocount = cocount + 1

      }
      else if (key == "Cumulative Hazard Curves") {
        keycovarient = true
        cocount = cocount + 1

      }
      else if (key == "Frequency Bar Chart") {
        keyFrequency = true
        console.log("cocount", cocount)

      }
      else if (key == "Normal Probability Plot") {
        nrmlityprblty = true

      }
      else if (key == "Before & After Line Plot") {
        bfraftlne = true

      }
    })

    if (selectedGraphKeys.length > 1) {
      if (keyhist == true) {
        if (currentReport.testOptionName == "Normality") {
          console.log("here rachuuu")
          props.updateID("worsheet")
          setShowdatavariable(true)

        }
        else if (currentReport.testOptionName == "Paired T-test") {
          props.updateID("paired")
          setShowModal(true)
        }
        else {
          props.updateID("report")
          setShowModal(true)
        }
      }
      else if (keycovarient == true) {
        setcovariateModal(true)
      }
      else if (keyFrequency == true) {
        if (currentReport.testOptionName == "One Way Frequency Tables") {

          setshowFrequencyBar(true)
        }
      }
      else {
        // if (currentReport.testOptionName == "Paired T-test") {
        //   let arg
        //   if (nrmlityprblty == true) {
        //     arg = {
        //       worksheet: props.rediskeytest.message,
        //       IsTransform: false
        //     };
        //   }
        //   else if (bfraftlne == true) {
        //     arg = {
        //       worksheet: props.rediskeytest.message,
        //       IsTransform: true
        //     };
        //   }

        //   let sendRes = await post(pairedttestutility, arg);
        //   console.log("sendRes", sendRes)
        // }
        if (currentReport.testOptionName == "Paired T-test") {
          let arg
          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          let rand = ''
          for (var i = 0; i < 4; i++) {
            rand += characters.charAt(Math.floor(Math.random() *
              4))
          }
          let ReportNew = currentReport
          ReportNew.pairedTestId = currentReport.id + rand + "pair"
          if (bfraftlne == true) {
            arg = {
              worksheet: props.rediskeytest.message,
              IsTransform: true
            };

            let sendRes = await post(pairedttestutility, arg);
            console.log("sendRes", sendRes)
            if (sendRes !== undefined) {
              if (sendRes.data.result !== undefined) {
                const client = createNewClient();
                let graphData = await getDataSetByKey(
                  sendRes.data.result.key_name,
                  client
                );
                console.log("graphData", graphData)
                await createWorksheetDatarecompute(graphData.sheetdata, ReportNew.pairedTestId, props, 'Paired t test')
                var data = { y: graphData.graph_types[0].col_selections }
                createGraphinPage(
                  "line",
                  "multipleStraight",
                  "ManyY",
                  data,
                  ReportNew.pairedTestId,
                  "Before & After Line Plot"
                );

              }
            }
          }
        }
        else {
          let item = selectedValues[0];
          console.log("item", item.data)
          createGraphinPage(
            item.graphType,
            item.subGraphType,
            item.format,
            item.data,
            currentReport.id,
            selectedGraphKeys[0]
          );
          resultValues.current = selectedValues.length - 1;
          reportValue.current = currentReport;
        }
      }

    }



    else {
      let item = selectedValues[0];

      if (keyhist == true) {
        if (currentReport.testOptionName == "Normality") {
          setShowdatavariable(true)
          props.updateID("worsheet")
        }
        else if (currentReport.testOptionName == "Paired T-test") {
          props.updateID("paired")
          setShowModal(true)
        }
        else {
          props.updateID("report")
          setShowModal(true)
        }
      }

      else if (keyFrequency == true) {
        if (currentReport.testOptionName == "One Way Frequency Tables") {

          setshowFrequencyBar(true)
        }
      }
      else if (keycovarient == true) {
        setcovariateModal(true)
      }

      else {
        if (currentReport.testOptionName == "Paired T-test") {
          let arg
          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          let rand = ''
          for (var i = 0; i < 4; i++) {
            rand += characters.charAt(Math.floor(Math.random() *
              4))
          }
          let ReportNew = currentReport
          ReportNew.pairedTestId = currentReport.id + rand + "pair"
          if (bfraftlne == true) {
            arg = {
              worksheet: props.rediskeytest.message,
              IsTransform: true
            };

            let sendRes = await post(pairedttestutility, arg);
            console.log("sendRes", sendRes)
            if (sendRes !== undefined) {
              if (sendRes.data.result !== undefined) {
                const client = createNewClient();
                let graphData = await getDataSetByKey(
                  sendRes.data.result.key_name,
                  client
                );
                console.log("graphData", graphData)
                await createWorksheetDatarecompute(graphData.sheetdata, ReportNew.pairedTestId, props, 'Paired t test')
                var data = { y: graphData.graph_types[0].col_selections }
                createGraphinPage(
                  "line",
                  "multipleStraight",
                  "ManyY",
                  data,
                  ReportNew.pairedTestId,
                  "Before & After Line Plot"
                );

              }
            }
          }
        }
        else {
          let item = selectedValues[0];
          console.log("item", item.data, item)

          createGraphinPage(
            item.graphType,
            item.subGraphType,
            item.format,
            item.data,
            currentReport.id,
            selectedGraphKeys[0]
          );
          resultValues.current = selectedValues.length - 1;
          reportValue.current = currentReport;
        }
      }
    }
  handleClose();

};

const createGraphinPage = (
  graphType: string,
  subGraphType: string,
  format: string,
  data: Object,
  resultGraphWorksheetID: string,
  keyName: string
) => {
  // need to move this method inside Graph Services and
  // need to call inside createGaphPage in Notebook Services.

  // const graphObject = createnewGraphObject('graph');
  // graphObject.graphType = graphType;
console.log("came",  graphType,
subGraphType,
format,
data ,
resultGraphWorksheetID,
keyName)
  const graphObject = {
    graphType,
    subGraphType,
    format,
    data,
  };
  console.log(graphObject, keyName, 'insdiecreategraph', resultGraphWorksheetID);
  createGraphPage(
    props,
    graphObject,
    currentReport,
    resultGraphWorksheetID,
    keyName
  );
};

const body = (
  <div style={modalStyle} className={classes.paper}>
    <h5 id="simple-modal-title" className={classes.head1}>
      Create Result Graph
    </h5>
    <div className={`${classes.bodybg}  ms-Grid`} dir="ltr">
      <div className="ms-Grid-col ms-sm9 ms-md11 ms-lg11 ">
        <p style={{ fontSize: '13px', margin: '0px' }}>Select Graph Type:</p>
      </div>
      <CloseIcon
        style={{ float: 'right' }}
        onClick={() =>
          props.actions.resultGraphAction.isOpenResultGraph({
            message: false,
          })
        }
      ></CloseIcon>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div
            className="ms-Grid-col ms-sm7 ms-md7 ms-lg7  "
            style={{ padding: '10px 0px' }}
          >
            <div className={classes.insidebg}>{getResultGraphs()}</div>
          </div>
            <div
              className="ms-Grid-col ms-sm5 ms-md5 ms-lg5 "
              style={{ padding: '7%' }}
            >
              <div>
                <button
                  type="button"
                  className={classes.buttons}
                  onClick={() =>
                    createResultGraph(selectedGraph, currentReport)
                  }
                  disabled={Object.values(selectedGraph).length === 0}
                >
                  OK
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className={classes.buttons}
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button type="button" onClick={openHelpWindow} className={classes.buttons + "" + ' pointer'}>
                  Help
                </button>
              </div>
              <div className="ms-Grid-row">
                <p className={classes.font12} style={{ marginBottom: '0px' }}>
                  Select items with the keyboard or mouse
                </p>
              </div>
              <div className="ms-Grid-row">
                <p className={classes.font12}>
                  Multiple items can be selected with the mouse; left-click to
                  select or deselect
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
    {props.isOpenResultGraph ? <ResultModal /> : <></>}
  </div>
);

  return (
    <div>
      <Modal
        open={props.isOpenResultGraph ? props.isOpenResultGraph : ''}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      {showModal && (

        <HistoModal SourceColumn={SourceColumn} createGraphinPage={createGraphinPage} typeId={typeId} close={() => setShowModal(false)} currentReport={currentReport} selectedGraph={selectedGraph} />
      )}
      {
        showCovariantModal && (
          <CovariantReport currentReport={currentReport} close={() => setcovariateModal(false)} selectedGraph={selectedGraph} createGraphinPage={createGraphinPage} />
        )
      }
      {
        showFrequencyBar && (
          <FrequencyBar currentReport={currentReport} createGraphinPage={createGraphinPage} close={() => setshowFrequencyBar(false)} selectedGraph={selectedGraph} createGraphinPage={createGraphinPage} />
        )
      }
      {
        showDataVariableModal && (
          <SelectVariable OpenHistogram={OpenHistogram} updateSrcColum={updateSrcColum} currentReport={currentReport} close={() => setShowdatavariable(false)} selectedGraph={selectedGraph} createGraphinPage={createGraphinPage} />
        )
      }


    </div>
  );
}

function mapStateToProps(state) {
  return {
    isOpenResultGraph: state.resultGraphReducer.isOpenResultGraph,
    notebooks: state.notebookReducer.notebooks,
    activeItems: state.notebookReducer.activeItems,
    allActiveItem: state.notebookReducer.allActiveItem,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    activeWorksheet: state.worksheetOperationReducer.activeWorksheet,
    openGraphs: state.worksheetOperationReducer.openGraphs,
    defaultOption: state.optionsReducer,
    rediskeytest: state.instanceReducer.rediskeytest

  };
}

function mapDispatchToProps(dispatch) {
  return {

    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
    selecthistSrc: (SourceColumn: any) => dispatch(actionhistogram.selecthistSrc(SourceColumn)),
    updateID: (SourceColumn: any) => dispatch(actionhistogram.selectTypeId(SourceColumn)),

    setActiveItem: (activeItem: IActiveItems) => {
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: activeItem });
    },
    setAllActiveItem: (allactiveItem: IActiveItems) => {
      dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
    },
    addSection: (newSection: IActiveItems) => {
      dispatch({ type: 'ADD_SECTION', payload: newSection });
    },
    setSelectedPivotItem: (pvtItem) => {
      dispatch({ type: 'SET_SELECTED_PIVOT_ITEM', payload: pvtItem });
    },
    addGraphPage: (item) => {
      dispatch({ type: 'ADD_GRAPHPAGE', payload: item });
    },
    storeGraph: bindActionCreators(storeGraph, dispatch),
    actions: {
      resultGraphAction: bindActionCreators(resultGraphAction, dispatch),
      storeWorksheet: bindActionCreators(storeWorksheet, dispatch),
      rowIndexUpdate: bindActionCreators(componentInstance, dispatch),
      formatCellAction: bindActionCreators(formatCellAction, dispatch),
    },
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ResultModal);
