import React, { useState, useEffect } from 'react';
import {
  DefaultButton,
} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalCompontent from './../ModalCompontent/Modal/ModalCompontent';
import * as TransformAction from '../../../../store/Analysis/Transform/actions';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { showMessageBox, showOpenDialog, showSaveDialog, readFile, writeFile, homeDir } from '../../../../utils/globalUtility'
import { getDataSetByKey, updatDatasetInRedis, createNewClient } from '../../../../services/RedisServices';
import { TransformDataProps } from '../../../../services/notebookManagerServices/NotebookManagerInterfaces';
import { createTransform } from "../../../../services/NotebookManagerServicesNew";
import { getActiveWorksheet, isWorksheetActive } from '../../../../utils/spreadsheet/spreadsheetUtility';
import { convertMetadata } from '../../../Worksheet/Metadata';
import { setWorksheetData, updateData } from '../../../../services/WorksheetServicesNew';
import { post } from '../../../../services/DataService';
import * as Config from '../../../App/Config';
import { dataService, transposeArray } from '../../../../utils/globalUtility';
import  {summaryInfoAction} from "../../../../store/SummaryInfo/actions";

const client = createNewClient();

const options: IChoiceGroupOption[] = [
  { key: '0', text: 'Degrees' },
  { key: '1', text: 'Radians' },
  { key: '2', text: 'Grads' },
];

const trigonometricUnitsMap: any = {
  '0': 'Degrees',
  '1': 'Radians',
  '2': 'Grads',
}

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

function DivCompt({
  compontent
}) {
  return (
    <div className="ms-Grid w-100" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col d-flex ms-lg-12 ms-lg12 p-0">
          {compontent}
        </div>
      </div>
    </div>
  )
}

const explorerOpenOptions = {
  title : "Open Transform File",
  defaultPath : homeDir + "/Documents",
  buttonLabel : "Open",
  filters :[
   {name: 'Tranform File (*.xfmx)', extensions: ['xfmx']}
  ],
  properties: ['openFile']
}

const explorerSaveOptions = {
  title : "Save Transform File",
  defaultPath : homeDir + "/Documents",
  buttonLabel : "Save",
  filters :[
   {name: 'Tranform File (*.xfmx)', extensions: ['xfmx']}
  ]
}

const fileString = "jsv5G.,";
const UserDefinedRedisKey = "UserDefinedData";

function UserDefinedCompontent(props) {
  // To store Trigonometric option
  const [trigonometricUnit, setTrigonometricUnit] = useState('1');
  // To store formula
  const [equation, setEquation] = useState('');
  // To store whether formula modified or not
  const [equationModified, setEquationModified] = useState(false);
  // To store title of the transform
  const [title, setTitle] = useState('');
  // To store the location of file
  const [filePath, setFilePath] = useState('');
  // To store notebook transform Id
  const [transformId, setTransformId] = useState('');
  // To store whether transform opened from notebook or not
  const [fromNotebook, setFromNotebook] = useState(false);

  const dialogOptions  = {
    buttons: ["Yes","No","Cancel"],
    message: "",
    title: "Transforms"
  }

  const warningOptions  = {
    buttons: ["OK"],
    message: "An open worksheet is required to open the transform dialog",
    title: "SigmaPlot 15"
  }

  useEffect(() => {
    loadData();
  }, [])

  const loadData = () => {
    if(!isWorksheetActive(props.notebookState)) {
      props.TransformAction.isOpenUserDefined({
        message: false
      });
      showMessageBox(warningOptions);
      return;
    }
    let transformId = props.transformState.transformId;
    if(transformId) {
      setTransformId(transformId);
      const transformData = props.notebooks?.allTransforms?.byId?.[transformId] || {};
      const { equation, trigonometricUnit } = transformData.transformData;
      if(equation) {
        setEquation(equation);
      }
      if(trigonometricUnit) {
        setTrigonometricUnit(trigonometricUnit);
      }
      if(transformData.name) {
        setTitle(transformData.name);
      }
    } else {
      getRedisData();
    }
  }

  const getRedisData = async () => {
    const data = await getDataSetByKey(UserDefinedRedisKey, client);
    if(data) {
      setTrigonometricUnit(data.trigonometricUnit || '0');
      setEquation(data.equation || '');
      setEquationModified(data.equationModified || false);
      setFilePath(data.filePath || '');
      setTitle(data.title || '');
      setFromNotebook(data.fromNoteBook)
    }
  }

  const newTransform = async () => {
    if(transformId) {
      await closeTransform();
      createTransform(props);
    } else if(equationModified) {
        dialogOptions.message = "Save changes to tranform '"+ (title ? title : "(untitled)") +"'?";
        showMessageBox(dialogOptions).then((res: any) => {
          switch(res.response) {
            case 0:
              saveTransform(true);
              break;
            case 1:
              resetAll();
              break;
          }
        })
    } else {
      resetAll();
    }
  }

  const importTransform = () => {
    if(equationModified) {
      dialogOptions.message = "Save changes to tranform '"+ (title ? title : "(untitled)") +"'?";
      showMessageBox(dialogOptions).then((res: any) => {
        switch(res.response) {
          case 0:
            saveDialog();
            break;
          case 1:
            openDialog();
            break;
        }
      })
    } else {
      openDialog();
    }
  }

  const saveTransform = (reset?: boolean) => {
    if(fromNotebook) {
      return;
    }
    if(filePath) {
      saveFile(filePath, reset);
    } else {
      saveDialog(reset);
    }
  }

  const saveAsTransform = () => {
      saveDialog();
  }

  const openDialog = () => {
    showOpenDialog(explorerOpenOptions).then((response: any) => {
      if(!response.canceled && response.filePaths.length) {
        const filePath = response.filePaths[0];
        readFile(filePath, (err: any, data: any) => {
          if (err) {
            console.error(err)
            return;
          }
          const fileName = filePath.split("\\").pop();
          setTitle(fileName);
          setFilePath(filePath);
          setEquation(data.replace(fileString, "").split("\n").slice(1).join("\n"));
          setEquationModified(false);
        })
      }
    });
  }

  const saveDialog = (reset?: boolean) => {
    showSaveDialog(explorerSaveOptions).then((response: any) => {
      if(!response.canceled && response.filePath) {
        if(transformId) {
          const transformData = {equation, trigonometricUnit, transformId: transformId};
          props.updateTransformData(transformData)
        }
        saveFile(response.filePath, reset);
      }
    })
  }

  const saveFile = (filePath: string, reset?: boolean) => {
    let content = equation;
    content = fileString + "\n" + content;
    writeFile(filePath, content, (err: any) => {
      if(err){
          console.log("An error ocurred creating the file "+ err.message)
      }
      console.log(filePath + " The file has been succesfully saved");
      if(reset) {
        resetAll();
        return;
      }
      const fileName = filePath.split("\\").pop() || '';
      setTitle(fileName);
      setFilePath(filePath);
      setEquationModified(false);
      setTransformId('');
    });
  }

  const resetAll = () => {
    setEquation('');
    setEquationModified(false);
    setTitle('');
    setFilePath('');
    setTrigonometricUnit('1');
    setTransformId('');
    setFromNotebook(false);
  }

  const runTransform = async () => {
    const activeSheetId = getActiveWorksheet(props.notebookState);
    if(activeSheetId && activeSheetId.length) {
      const key = activeSheetId[0].id;
      const client = createNewClient();
      let data = await getDataSetByKey(key, client);
      data = transposeArray(data);
      const clientData = await setWorksheetData(
        [{
          sheetdata: data,
          metadata: convertMetadata(data)
        }],
        'meta' + key
      );
      post(
        Config.userDefined,
        {
          "worksheet": clientData.key,
          "units": trigonometricUnitsMap[trigonometricUnit],
          "user_defined": equation
        }
      ).then(async (response: any) => {
        response = response.data;
        if(response) {
          let errorMsg = response.error || response.error_message || (response.worksheet && response.worksheet.error_message) || (response.user_defined && response.user_defined.error_message) || '';
          if(errorMsg) {
            warningOptions.message = errorMsg;
            showMessageBox(warningOptions);
          } else if(response.result) {
            const data = await getDataSetByKey(response.result.redis_id, client);
            if(data && data.length) {
              let sheetData = data[0].sheetdata;
              sheetData = transposeArray(sheetData);
              await updateData(
                client,
                sheetData,
                key
              );
              dataService.sendData({sheetId: key});
              closeTransform();
            }
          }
        }
      })
    }
  }

  const closeTransform = async () => {
    await updateTransformData();
    props.TransformAction.isOpenUserDefined({
      message: false
    })
  }

  const updateTransformData = async () => {
    const data: any = { equation, title, filePath, trigonometricUnit, equationModified, fromNoteBook: false };
    if(transformId || fromNotebook) {
      data.fromNoteBook = true;
    }
    await updatDatasetInRedis(client, data, UserDefinedRedisKey);
    if(transformId) {
      const transformData = {equation, trigonometricUnit, transformId: transformId};
      props.updateTransformData(transformData)
    }
  }

  return (
    <div>
      <ModalCompontent component={<>
        {/* <Stack horizontal className={`flex-container br-1 p-1`}> */}

          {/* <Label>Edit Transform</Label> */}
          <DivCompt compontent={
            <>
              <div className={`ms-Grid-col ms-lg10`}>
                <TextField value={equation} multiline style={{minHeight: '300px'}} onChange={(e: any) => {setEquationModified(true); setEquation(e.target.value);}}/>
                <ChoiceGroup className={'group-flex fieldGroupFlex'} selectedKey={trigonometricUnit} options={options} label={'Trigonometric units'} onChange={(e, item: any) => {setTrigonometricUnit(item.key)}} required={true} />
              </div>
              <Stack className={`ms-Grid-col ms-lg3`} style={{textAlign: 'center'}}>
                  <div className={'ms-lg12 mr-1 mb-1'}>
                    <DefaultButton
                      text="Run"
                      className={`w-100px bg-green whiteColor`}
                      allowDisabledFocus
                      onClick={runTransform}
                    />
                  </div>
                  <div className={'ms-lg12 mr-1 mb-1'}>
                    <DefaultButton
                      text="New"
                      className={`text-block w-100px`}
                      allowDisabledFocus
                      onClick={newTransform}
                    />
                  </div>
                  <div className={'ms-lg12 mr-1 mb-1'}>
                    <DefaultButton
                      text={transformId ? "Import" : "Open..."}
                      className={`text-block w-100px`}
                      allowDisabledFocus
                      onClick={importTransform}
                    />
                  </div>
                  <div className={'ms-lg12 mr-1 mb-1'}>
                    <DefaultButton
                      disabled={transformId !== ''}
                      text="Save"
                      className={`text-block w-100px`}
                      allowDisabledFocus
                      onClick={() => saveTransform()}
                    />
                  </div>
                  <div className={'ms-lg12 mr-1 mb-1'}>
                    <DefaultButton
                      text={transformId ? "Save Copy" : "Save As..."}
                      className={`text-block w-100px`}
                      allowDisabledFocus
                      onClick={saveAsTransform}
                    />
                  </div>
                  <div className={'ms-lg12 mr-1 mb-1'}>
                    <DefaultButton
                      text="Close"
                      className={`text-block w-100px`}
                      allowDisabledFocus
                      onClick={closeTransform}
                    />
                  </div>
                  {/* <div className={'ms-lg12 mr-1'}>
                    <Checkbox disabled className={'mb-1'} label="Watch" boxSide={'start'} />
                    <Checkbox disabled className={'mb-1'} label="Single-step" boxSide={'start'} />
                  </div> */}
              </Stack>
            </>
          } />
        {/* </Stack> <br /> */}
      </>
      }
        close={() => closeTransform()}
        title={'User-Defined Transform - ' + (title ? title : '(untitled)')}
        className={'userDefinedTransformModal'}
        isDraggable={true}
        isModeless={true}
        keepInBounds={true}
        isBlocking={false}>
      </ModalCompontent>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    transformState: state.transformReducer,
    referenceObjectState: state.instanceReducer.instance,
    notebookState: state.notebookReducer,
    notebooks: state.notebookReducer.notebooks,
    allActiveItem: state.notebookReducer.allActiveItem,
    licenseInfo: state.licenseInfoReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTransformData: (transformData: TransformDataProps) => {
      dispatch({ type: 'UPDATE_TRANSFORM_DATA', payload: transformData });
    },
    addTransform: (newTransform: any) => {
      dispatch({ type: 'ADD_TRANSFORM', payload: newTransform });
    },
    addSection: (newSection: any) => {
      dispatch({ type: 'ADD_SECTION', payload: newSection });
    },
    setAllActiveItem: (allactiveItem: any) => {
      dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
    },
    TransformAction: bindActionCreators(TransformAction, dispatch),
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDefinedCompontent);
