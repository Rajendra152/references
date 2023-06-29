import React, { useState, useEffect } from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Modal,
  IDragOptions,
  IIconProps,
  IStackProps,
  Dialog,
  DialogType,
  DialogFooter,
} from '@fluentui/react';
import { Checkbox } from '@fluentui/react';
import {
  DefaultButton,
  IconButton,
  IButtonStyles,
} from '@fluentui/react/lib/Button';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import * as sampleSizeAction from '../../../store/Analysis/SampleSize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { convertMetadata } from '../../../components/Worksheet/Metadata';
import {
  getDataSetByKey,
  createNewClient,
} from '../../../services/RedisServices';
import { post } from '../../../services/DataService';
import { api_call_sample_tests } from '../Wizard/TestOptions/SampleTestsAPI';
import { createReport } from '../../../services/NotebookManagerServicesNew';
import { setWorksheetData } from '../../../services/WorksheetServicesNew';
import * as actionCreators from '../../../store/Helpmenu/actions';
import Helpbutton from '../../../HelpButton';
import  {summaryInfoAction} from "../../../store/SummaryInfo/actions";
import { remote } from 'electron'
var redis = require('redis');
const modalPropsStyles = { main: { maxWidth: 450 } };

const AnalysisSampleWizard: React.FunctionComponent = (props) => {
  console.log(props);
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  console.log('model open');
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(true);
  const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(true);

  const [labelOneValue, setLabelOneValue] = useState(0.0);
  const [labelTwoValue, setLabelTwoValue] = useState(0.0);
  const [labelThreeValue, setLabelThreeValue] = useState(0.0);
  const [labelFourValue, setLabelFourValue] = useState(0.05);
  const [labelFiveValue, setLabelFiveValue] = useState(0);
  const [yatesCorrection, setyatesCorrection] = useState(false);
  const [sampleSize, setSampleSize] = useState(0);
  const [worksheet_id, setworksheet_id] = useState('');
  const [notebook_id, setnotebook_id] = useState('');
  const [responseMessageAlert, setResponseMessageAlert] = useState('')
  const [buttonTypes, setButtonTypes] = useState([]);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  // Normally the drag options would be in a constant, but here the toggle can modify keepInBounds
  const dragOptions = React.useMemo(
    (): IDragOptions => ({
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu,
      keepInBounds,
    }),
    [keepInBounds]
  );
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
  const onDismiss=(ev)=>{
    ev.preventDefault()
    if (props.sampleSizeState.isOpenSaTtest) {
      props.actions.sampleSizeAction.isOpenSaTtest({
        message: false,
      });
    } else if (props.sampleSizeState.isOpenSaPairedTtest) {
      props.actions.sampleSizeAction.isOpenSaPairedTtest({
        message: false,
      });
    } else if (props.sampleSizeState.isOpenSaProportions) {
      props.actions.sampleSizeAction.isOpenSaProportions({
        message: false,
      });
    } else if (props.sampleSizeState.isOpenSaAnova) {
      props.actions.sampleSizeAction.isOpenSaAnova({
        message: false,
      });
    } else if (props.sampleSizeState.isOpenSaChisquare) {
      props.actions.sampleSizeAction.isOpenSaChisquare({
        message: false,
      });
    } else if (props.sampleSizeState.isOpenSaCorrelation) {
      props.actions.sampleSizeAction.isOpenSaCorrelation({
        message: false,
      });
    }
  }

  var current;
  if (props.helpMenu.HelpValue[0].selectedItem !== '') {
    current = props.helpMenu.HelpValue[0].selectedItem;
    console.log('x', current);
  } else if (props.helpMenu.HelpValue[0].selectedElement !== '') {
    current = props.helpMenu.HelpValue[0].selectedElement;
    console.log('3', current);
  } else {
    current = props.helpMenu.HelpValue[0].RibbonMenu;
    console.log('4', current);
  }

  useEffect(() => {
    if (props.title == 'Anova') {
      props.OpenHelpWindow(
        'wbasics',
        'determining_the_minimum_sample_size_for_a_one_way_anova',
        ''
      );
    } else if (props.title == 'Paired t-test') {
      props.OpenHelpWindow(
        'wbasics',
        'determining_the_minimum_sample_size_for_a_paired_t_test',
        ''
      );
    } else if (props.title == 'Proportions') {
      props.OpenHelpWindow(
        'wbasics',
        'determining_the_minimum_sample_size_for_a_proportions_comparison',
        ''
      );
    } else if (props.title == 't-test') {
      props.OpenHelpWindow(
        'wbasics',
        'determining_the_minimum_sample_size_for_a_t_test',
        ''
      );
    } else if (props.title == 'Correlation') {
      props.OpenHelpWindow(
        'wbasics',
        'determining_the_minimum_sample_size_to_detect_a_specified_correlation',
        ''
      );
    }
    getWorkSheetId()
  }, [props.title]);
  
  // useEffect(()=>{
  //   return () => {
  //     alert("use effect")
  //     subscriber.removeAllListeners();
  //     publisher.removeAllListeners();
  //   };
  // }
  // )
  const stackTokens = { childrenGap: 50 };
  const stackStyles: Partial<IStackStyles> = {
    root: { display: 'flex', justifyContent: 'flex-end' },
  };
  // const stackTokens: IStackTokens = { childrenGap: 40 };
  // const stackStyles: Partial<IStackStyles> = { root: { width: 300 } };
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 5 },
    // styles: { root: { width: 100 } },
  };
  const textFieldStyles: Partial<ITextFieldStyles> = {
    subComponentStyles: {
      label: { root: { display: 'inline-block' } },
    },
    fieldGroup: {
      display: 'inline-flex',
      maxWidth: '100px',
      marginRight: '0px',
      justifyContent: 'flex-end',
    },
    wrapper: {
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'space-between',
    },
  };


  // Use useId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings and manually ensure uniqueness.)
  const titleId = useId('title');

  function validateModalValues(initiatedBy: any) {
    //alert(initiatedBy);
    switch (props.title) {
      case 't-test':
        if (
          labelOneValue === '' ||
          labelTwoValue === '' ||
          labelThreeValue === '' ||
          labelFourValue === ''
        ) {
          alert('Enter a Number');
          return;
        }
        if (labelTwoValue <= 0) {
          //alert("1")
          alert('Expected standard deviation must be positive.');
          return;
        }

        if (!(labelThreeValue >= 0.001 && labelThreeValue <= 0.999)) {
          alert('Desired power must be between 0.001 and 0.999.');
          return;
        }
        if (!(labelFourValue >= 0.001 && labelFourValue <= 0.999)) {
          alert('Alpha must be between 0.001 and 0.999.');
          return;
        }
        if (initiatedBy === 'Calculate') {
          submitDatatoApi();
        } else {
          saveToReport();
        }
        break;
      case 'Paired t-test':
        if (
          labelOneValue === '' ||
          labelTwoValue === '' ||
          labelThreeValue === '' ||
          labelFourValue === ''
        ) {
          alert('Enter a Number');
          return;
        }
        if (labelTwoValue <= 0) {
          // alert("2")
          alert('Expected standard deviation must be positive.');
          return;
        }
        if (!(labelThreeValue >= 0.001 && labelThreeValue <= 0.999)) {
          alert('Desired power must be between 0.001 and 0.999.');
          return;
        }
        if (!(labelFourValue >= 0.001 && labelFourValue <= 0.999)) {
          alert('Alpha must be between 0.001 and 0.999.');
          return;
        }
        if (initiatedBy === 'Calculate') {
          submitDatatoApi();
        } else {
          saveToReport();
        }
        break;
      case 'Proportions':
        if (
          labelOneValue === '' ||
          labelTwoValue === '' ||
          labelThreeValue === '' ||
          labelFourValue === ''
        ) {
          alert('Enter a Number');
          return;
        }
        if (!(labelOneValue >= 0.001 && labelOneValue <= 0.999)) {
          alert(
            'Expected Group 1 proportions must be between 0.001 and 0.999.'
          );
          return;
        }
        if (!(labelTwoValue >= 0.001 && labelTwoValue <= 0.999)) {
          alert(
            'Expected Group 2 proportions must be between 0.001 and 0.999.'
          );
          return;
        }
        if (labelOneValue == labelTwoValue) {
          alert('Expected proportions must not be equal.');
          return;
        }
        if (!(labelThreeValue >= 0.001 && labelThreeValue <= 0.999)) {
          alert('Desired power must be between 0.001 and 0.999.');
          return;
        }
        if (!(labelFourValue >= 0.001 && labelFourValue <= 0.999)) {
          alert('Alpha must be between 0.001 and 0.999.');
          return;
        }
        if (initiatedBy === 'Calculate') {
          submitDatatoApi();
        } else {
          saveToReport();
        }
        break;
      case 'Anova':
        if (
          labelOneValue === '' ||
          labelTwoValue === '' ||
          labelThreeValue === '' ||
          labelFourValue === ''
        ) {
          alert('Enter a Number');
          return;
        }
        if (labelTwoValue <= 0) {
          //alert("3")
          alert('Expected standard deviation must be positive.');
          return;
        }
        if (labelFiveValue < 2) {
          alert('There must be at least two groups.');
          return;
        }
        if (!(labelThreeValue >= 0.001 && labelThreeValue <= 0.999)) {
          alert('Desired power must be between 0.001 and 0.999.');
          return;
        }
        if (!(labelFourValue >= 0.001 && labelFourValue <= 0.999)) {
          alert('Alpha must be between 0.001 and 0.999.');
          return;
        }
        if (initiatedBy === 'Calculate') {
          submitDatatoApi();
        } else {
          saveToReport();
        }
        break;
      case 'Chi-square':
        if (labelThreeValue === '' || labelFourValue === '') {
          alert('Enter a Number');
          return;
        }
        if (!(labelThreeValue >= 0.001 && labelThreeValue <= 0.999)) {
          alert('Desired power must be between 0.001 and 0.999.');
          return;
        }
        if (!(labelFourValue >= 0.001 && labelFourValue <= 0.999)) {
          alert('Alpha must be between 0.001 and 0.999.');
          return;
        }
        if (initiatedBy === 'Calculate') {
          submitDatatoApi();
        } else {
          saveToReport();
        }
        break;
      case 'Correlation':
        if (
          labelOneValue === '' ||
          labelThreeValue === '' ||
          labelFourValue === ''
        ) {
          alert('Enter a Number');
          return;
        }
        if (labelOneValue >= 1) {
          alert('Expected correlation must be smaller than 1.');
          return;
        }
        if (labelOneValue < 0) {
          alert('Expected correlation must be positive.');
          return;
        }
        if (!(labelThreeValue >= 0.001 && labelThreeValue <= 0.999)) {
          alert('Desired power must be between 0.001 and 0.999.');
          return;
        }
        if (!(labelFourValue >= 0.001 && labelFourValue <= 0.999)) {
          alert('Alpha must be between 0.001 and 0.999.');
          return;
        }
        if (initiatedBy === 'Calculate') {
          submitDatatoApi();
        } else {
          saveToReport();
        }
        break;
      default:
        break;
    }
   // saveToReport();
  }

  async function getworkSheetKey() {
    let openedWorksheet = props.openWorksheets.filter(
      (item) => item.key == props.activeWorksheet
    );
    console.log(openedWorksheet, 'openedWorksheet');
    console.log(openedWorksheet.length, 'openedWorksheet length');
    if (openedWorksheet.length) {
      let gridData = await getDataSetByKey(
        openedWorksheet[0].key,
        openedWorksheet[0].client
      );
      console.log(gridData);
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
        'meta' + openedWorksheet[0].key
      );
      return clientData.key;
    }
  }
  function getWorkSheetId(){
    let active_item = props.allActiveItem;

    let actvItem = props.activeItems;
    if (active_item.worksheet === null) {
      for (let i = actvItem.length - 1; i >= 0; i--) {
        console.log(actvItem[i].type === ITEM_TYPE.WORKSHEET);

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
          console.log(allActiveItem);
          console.log(allActiveItem.worksheet)
          setworksheet_id(allActiveItem.worksheet)
          setnotebook_id(allActiveItem.notebook)
          break;
        }
       
      }
    }else{
      console.log(active_item.worksheet)
      setworksheet_id(active_item.worksheet)
      setnotebook_id(active_item.notebook)
    }
  }
  async function submitDatatoApi() {
    var workSheetKey = await getworkSheetKey();
    let rowIndex = props.referenceObjectState.getActiveSheet().usedRange
    .rowIndex;
    let result = api_call_sample_tests(
      props.title,
      labelOneValue,
      labelTwoValue,
      labelThreeValue,
      labelFourValue,
      labelFiveValue,
      yatesCorrection,
      props.sampleSizeState.isChiSquareDataAvailable,
      workSheetKey,
      rowIndex
    );
    let url = result[0];
    let body = result[1];
    console.log('Inside submit data', body);
    body.worksheet_title=props.notebooks.allWorksheets.byId[worksheet_id].name;
    body.notebook=props.notebooks.allNotebooks.byId[notebook_id].name;
    subscriber.subscribe('user-input');
    subscribeToChannel();
    console.log('Inside submit data url', url);
    let sendRes = await post(url, body);
    console.log('Response from backend', sendRes);
    console.log(sendRes.data.result.redis_id);
    const client = createNewClient();
    let optionsData = await getDataSetByKey(
      sendRes.data.result.redis_id,
      client
    );
    console.log(optionsData);
    // subscriber.removeAllListeners();
    // publisher.removeAllListeners();
    //alert(optionsData.sample_size);
    setSampleSize(optionsData.sample_size);
    //createReport(props,null,optionsData)
  }
  let sharedVariables = remote.getGlobal('shared');
  const subscriber = createNewClient()
  const publisher = createNewClient()
  async function saveToReport() {
    //alert("here")
    var workSheetKey = await getworkSheetKey();
    let rowIndex = props.referenceObjectState.getActiveSheet().usedRange
    .rowIndex;
    let result = api_call_sample_tests(
      props.title,
      labelOneValue,
      labelTwoValue,
      labelThreeValue,
      labelFourValue,
      labelFiveValue,
      yatesCorrection,
      props.sampleSizeState.isChiSquareDataAvailable,
      workSheetKey,
      rowIndex
    );
    let url = result[0];
    let body = result[1];
    console.log('Inside submit data', body);
    console.log('Inside submit data url', url);
    body.worksheet_title=props.notebooks.allWorksheets.byId[worksheet_id].name;
    body.notebook=props.notebooks.allNotebooks.byId[notebook_id].name;
    //subscriber.subscribe('STITWITHDATA_IP');
    subscriber.subscribe('user-input');
    subscribeToChannel();
    let sendRes = await post(url, body);
    console.log('Response from backend', sendRes);
    if(sendRes.data.result){
    console.log(sendRes.data.result.redis_id);
    var testName = sendRes.data.result.redis_id.substring(
      0,
      sendRes.data.result.redis_id.indexOf('_')
    );
    console.log(testName);
    const client = createNewClient();
    let optionsData = await getDataSetByKey(
      sendRes.data.result.redis_id,
      client
    );
   
    console.log(optionsData);
    setSampleSize(optionsData.sample_size);
    subscribeToChannel();
    if (props.sampleSizeState.isOpenSaTtest) {
      props.actions.sampleSizeAction.isOpenSaTtest({ message: false });
    } else if (props.sampleSizeState.isOpenSaPairedTtest) {
      props.actions.sampleSizeAction.isOpenSaPairedTtest({ message: false });
    } else if (props.sampleSizeState.isOpenSaProportions) {
      props.actions.sampleSizeAction.isOpenSaProportions({ message: false });
    } else if (props.sampleSizeState.isOpenSaAnova) {
      props.actions.sampleSizeAction.isOpenSaAnova({ message: false });
    } else if (props.sampleSizeState.isOpenSaChisquare) {
      props.actions.sampleSizeAction.isOpenSaChisquare({ message: false });
    } else if (props.sampleSizeState.isOpenSaCorrelation) {
      props.actions.sampleSizeAction.isOpenSaCorrelation({ message: false });
    }
   createReport(props, null, optionsData, null, props.title + ' Sample Size');
  }
  }
  function _getValueYatesCorrection(
    ev: React.FormEvent<HTMLElement>,
    isChecked: boolean
  ) {
    console.log(`The option has been changed to ${isChecked}.`);
    setyatesCorrection(isChecked);
  }
  const subscribeToChannel = () => {
    console.log('subscribing to channel user input!');
    console.log(subscriber)
    subscriber.on('message', (channel, message) => {
      console.log('inside user-input');
      let response = message;
      console.log(response);
      console.log(typeof response);
      response = JSON.parse(response);
      console.log(response);
      console.log('message', response);
      console.log(response.MessageBox.Message);
      let responseMessage = response.MessageBox.Message.join();
      console.log(responseMessage);
      console.log(response.MessageBox.ButtonTypes);
       if (confirm(responseMessage)) {
        // alert("insid if")
          publishToChannel();
        } else {
          //alert("insdie els")
          publishToChannelCanceledByUser();
        }
    });
  };
  const yesFunction=()=>{
    publishToChannel();
    toggleHideDialog()
  }
  const noFunction=()=>{
    publishToChannelCanceledByUser();
    toggleHideDialog()
  }
  const dailogButton = buttonTypes.map((item)=>{
    console.log(item)
    return(
        <DefaultButton 
        key={ item }
        onClick={ item === 'Ok' || item === 'Yes' ? yesFunction : noFunction } 
        text={item} 
        />
    )
})
const publishToChannel = () => {
  console.log('publishing data to user-response!');
  publisher.publish('user-response', 0);
  subscriber.removeAllListeners();
  publisher.removeAllListeners();
};
const publishToChannelCanceledByUser = () => {
  console.log('publishing data to user-response!');
  publisher.publish('user-response', 1);
  subscriber.removeAllListeners();
  publisher.removeAllListeners();
};
  return (
    <div>
      <Modal
        titleAriaId={titleId}
        isOpen={props.isOpen}
        onDismiss={(ev)=>onDismiss(ev)}
        isBlocking={false}
        isModeless={false}
        containerClassName={contentStyles.container}
        dragOptions={dragOptions}
      >
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
        <div className="ms-Grid " dir="ltr">
          <div className="ms-Grid-row">
            <div className={contentStyles.header}>
              <div className="ms-Grid-col ms-sm9">
                <span id={titleId}>{props.title + ' Sample Size'}</span>
              </div>
              <div className="ms-Grid-col ms-sm3 ">
                <Helpbutton nodeId={current} />
              </div>
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                // onClick={hideModal}
                onClick={() => {
                  if (props.sampleSizeState.isOpenSaTtest) {
                    props.actions.sampleSizeAction.isOpenSaTtest({
                      message: false,
                    });
                  } else if (props.sampleSizeState.isOpenSaPairedTtest) {
                    props.actions.sampleSizeAction.isOpenSaPairedTtest({
                      message: false,
                    });
                  } else if (props.sampleSizeState.isOpenSaProportions) {
                    props.actions.sampleSizeAction.isOpenSaProportions({
                      message: false,
                    });
                  } else if (props.sampleSizeState.isOpenSaAnova) {
                    props.actions.sampleSizeAction.isOpenSaAnova({
                      message: false,
                    });
                  } else if (props.sampleSizeState.isOpenSaChisquare) {
                    props.actions.sampleSizeAction.isOpenSaChisquare({
                      message: false,
                    });
                  } else if (props.sampleSizeState.isOpenSaCorrelation) {
                    props.actions.sampleSizeAction.isOpenSaCorrelation({
                      message: false,
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className={contentStyles.body}>
          <div className="ms-Grid">
            {props.label1 && (
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
                  <TextField
                    type="number"
                    label={props.label1}
                    styles={textFieldStyles}
                    value={labelOneValue}
                    onChange={(e) => setLabelOneValue(e.target.value)}
                  />
                </div>
              </div>
            )}
            {props.label2 && (
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
                  <TextField
                    type="number"
                    label={props.label2}
                    styles={textFieldStyles}
                    value={labelTwoValue}
                    onChange={(e) => setLabelTwoValue(e.target.value)}
                  />
                </div>
              </div>
            )}

            {props.label3 && (
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
                  <TextField
                    type="number"
                    label={props.label3}
                    styles={textFieldStyles}
                    value={labelThreeValue}
                    onChange={(e) => setLabelThreeValue(e.target.value)}
                  />
                </div>
              </div>
            )}
            {props.sampleSizeState.isOpenSaAnova && (
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
                  <TextField
                    type="number"
                    label="Number of Groups"
                    styles={textFieldStyles}
                    value={labelFiveValue}
                    onChange={(e) => setLabelFiveValue(e.target.value)}
                  />
                </div>
              </div>
            )}
            {props.label4 && (
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
                  <TextField
                    type="number"
                    label={props.label4}
                    styles={textFieldStyles}
                    value={labelFourValue}
                    onChange={(e) => setLabelFourValue(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="ms-Grid-row" style={{ padding: '10px 0px' }}>
              <div
                className="ms-Grid-col ms-sm12  ms-lg12 ms-md12"
                style={{ display: 'inline-block' }}
              >
                <div
                  className="ms-Grid-col ms-sm7 ms-lg7 ms-md7"
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                  }}
                >
                  <DefaultButton
                    text="Calculate"
                    onClick={() => validateModalValues('Calculate')}
                    className={`text-block`}
                    style={{ backgroundColor: '#0f9c89' }}
                  />
                </div>
                <div
                  className="ms-Grid-col ms-sm5  ms-lg5 ms-md5"
                  style={{
                    display: 'inline-block',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                  }}
                >
                  <TextField
                    label="Sample Size"
                    styles={textFieldStyles}
                    value={sampleSize}
                  />
                </div>
              </div>
              {props.sampleSizeState.isOpenSaProportions ||
              props.sampleSizeState.isOpenSaChisquare ? (
                <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
                  <Checkbox
                    disabled={
                      props.sampleSizeState.isOpenSaChisquare ? 'disabled' : ''
                    }
                    label="Yates Correction Factor"
                    onChange={_getValueYatesCorrection}
                  />
                </div>
              ) : null}
            </div>
            <div className="ms-Grid-row" style={{ marginTop: '10px' }}>
              <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                  {/* <div className="ms-Grid-col ms-sm4  ms-lg4"> */}

                  <DefaultButton
                    id="saveToReport"
                    className="buttonColor"
                    text="Save To Report"
                    onClick={() => validateModalValues('saveToReport')}
                    className={btnStyles}
                  />
                  {/* </div> */}
                </Stack>
                <Stack {...columnProps}>
                  {/* <div className="ms-Grid-col ms-sm4  ms-lg4"> */}
                  <DefaultButton
                    text="Close"
                    className={`text-block`}
                    onClick={() => {
                      if (props.sampleSizeState.isOpenSaTtest) {
                        props.actions.sampleSizeAction.isOpenSaTtest({
                          message: false,
                        });
                      } else if (props.sampleSizeState.isOpenSaPairedTtest) {
                        props.actions.sampleSizeAction.isOpenSaPairedTtest({
                          message: false,
                        });
                      } else if (props.sampleSizeState.isOpenSaProportions) {
                        props.actions.sampleSizeAction.isOpenSaProportions({
                          message: false,
                        });
                      } else if (props.sampleSizeState.isOpenSaAnova) {
                        props.actions.sampleSizeAction.isOpenSaAnova({
                          message: false,
                        });
                      } else if (props.sampleSizeState.isOpenSaChisquare) {
                        props.actions.sampleSizeAction.isOpenSaChisquare({
                          message: false,
                        });
                      } else if (props.sampleSizeState.isOpenSaCorrelation) {
                        props.actions.sampleSizeAction.isOpenSaCorrelation({
                          message: false,
                        });
                      }
                    }}
                  />
                  {/* </div> */}
                </Stack>
              </Stack>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const cancelIcon: IIconProps = { iconName: 'Cancel' };
const helpIcon: IIconProps = { iconName: 'Help' };

const theme = getTheme();
const btnStyles = {
  marginRight: '180px',
};
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      // color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
// const stackProps: Partial<IStackProps> = {
//   horizontal: true,
//   tokens: {childrenGap: 40 },
//   styles: {root: {marginBottom: 20 } },
// };
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.black,
    // marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    // color: theme.palette.neutralDark,
  },
};

const helpIconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.black,
    marginLeft: 'auto',
    marginTop: '4px',
  },
  rootHovered: {
    // color: theme.palette.neutralDark,
  },
};
function mapStateToProps(state) {
  console.log(state, 'state in sample modal');
  return {
    sampleSizeState: state.sampleSizeReducer,
    notebooks: state.notebookReducer.notebooks,
    activeItems: state.notebookReducer.activeItems,
    allActiveItem: state.notebookReducer.allActiveItem,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    helpMenu: state.helpMenuReducer,
    activeWorksheet: state.worksheetOperationReducer.activeWorksheet,
    referenceObjectState: state.instanceReducer.instance,
  };
}

function mapDispatchToProps(dispatch) {
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
      sampleSizeAction: bindActionCreators(sampleSizeAction, dispatch),
    },
    setActiveItem: (activeItem: IActiveItems) => {
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: activeItem });
    },
    setAllActiveItem: (allactiveItem: IActiveItems) => {
      dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
    },
    addReport: (newReport: IActiveItems) => {
      dispatch({ type: 'ADD_REPORT', payload: newReport });
    },
    setSelectedPivotItem: (pvtItem) => {
      dispatch({ type: 'SET_SELECTED_PIVOT_ITEM', payload: pvtItem });
    },
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnalysisSampleWizard);
