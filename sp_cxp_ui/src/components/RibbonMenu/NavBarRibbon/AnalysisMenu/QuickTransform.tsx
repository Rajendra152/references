import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  DefaultButton,
  ContextualMenu,
  IconButton,
  IIconProps,
} from 'office-ui-fabric-react';
import {
  TooltipHost,
} from "@fluentui/react/lib/Tooltip";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BottomSection from './../ModalCompontent/Compontent/BottomSection';
import ModalCompontent from '../ModalCompontent/Modal/ModalCompontent';
import * as TransformAction from '../../../../store/Analysis/Transform/actions';
import { post } from '../../../../services/DataService';
import * as Config from '../../../App/Config';
import { getActiveWorksheet } from '../../../../utils/spreadsheet/spreadsheetUtility';
import { getDataSetByKey, updatDatasetInRedis, createNewClient } from '../../../../services/RedisServices';
import { convertMetadata } from '../../../Worksheet/Metadata';
import { setWorksheetData, updateData } from '../../../../services/WorksheetServicesNew';
import { showMessageBox, dataService, transposeArray } from '../../../../utils/globalUtility';
import { Subscription } from 'rxjs';
import Helpbutton from '../../../../HelpButton';
import * as graphicCellAction from '../../../../store/Worksheet/GraphicCell/actions';
import {
  getCellAddress
} from '@syncfusion/ej2-react-spreadsheet';
import { remote } from 'electron'
var redis = require('redis');
const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };

const dragOptions: IDragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const helpIcon: IIconProps = { iconName: 'Help' };

const warningOptions = {
  buttons: ["OK"],
  message: "",
  title: 'Transform Error',
}

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}
const funFld1 = [
  { name: 'col', format: 'col(?)', left: true, tooltipContent: 'col(column,top,bottom)' },
  { name: 'cell', format: 'cell(?,?)', left: true, tooltipContent: 'cell(column,row)' },
  { name: 'block', format: 'block(?,?,?,?)', left: true, tooltipContent: 'block(column 1,row 1,column 2,row 2)' }
]
const funFld2 = [
  { name: '+', format: '+' },
  { name: '-', format: '-' },
  { name: '/', format: '/' },
  { name: '*', format: '*' },
  { name: '^', format: '^' },
  { name: '()', format: '(?)' }

]
const funFld3 = [
  { name: 'abs', format: 'abs(?)', tooltipContent: 'abs(range)' },
  { name: 'exp', format: 'exp(?)', tooltipContent: 'exp(range)' },
  { name: 'ln', format: 'ln(?)', tooltipContent: 'In(range)' },
  { name: 'log', format: 'log(?)', tooltipContent: 'log(range)' },
  { name: 'sqrt', format: 'sqrt(?)', tooltipContent: 'sqrt(range)' },
  { name: 'mod', format: 'mod(?,?)', tooltipContent: 'mod(numerator,divisor)' }
]
const funFld10 = [
  { name: 'π', format: '3.1415926535897932' },
  { name: 'e', format: '2.7182818284590452' }]

const funFld4 = [
  { name: 'mean', format: 'mean(?)', tooltipContent: 'mean(range)' },
  { name: 'median', format: 'median(?)', tooltipContent: 'median(range)' },
  { name: 'min', format: 'min(?)', tooltipContent: 'min(range)' },
  { name: 'max', format: 'max(?)', tooltipContent: 'max(range)' },
  { name: 'stddev', format: 'stddev(?)', tooltipContent: 'stddev(range)' },
  { name: 'stderr', format: 'stderr(?)', tooltipContent: 'stderr(range)' }
]
const funFld5 = [
  { name: 'data', format: 'data(?,?,1)', tooltipContent: 'data(start,stop,step)' },
  { name: 'int', format: 'int(?)', tooltipContent: 'int(range)' },
  { name: 'prec', format: 'prec(?,?,0)', tooltipContent: 'prec(range,digits,mode)' },
  { name: 'round', format: 'round(?,?,0)', tooltipContent: 'round(range,places,mode)' },
  { name: 'nth', format: 'nth(?,?)', tooltipContent: 'nth(range,increment)' },
  { name: 'avg', format: 'avg(?)', tooltipContent: 'avg(range,range,...)' },
]
const funFld6 = [
  { name: 'cos', format: 'cos(?)', tooltipContent: 'cos(range)' },
  { name: 'sin', format: 'sin(?)', tooltipContent: 'sin(range)' },
  { name: 'tan', format: 'tan(?)', tooltipContent: 'tan(range)' },
  { name: 'arccos', format: 'arccos(?)', tooltipContent: 'arccos(range)' },
  { name: 'arcsin', format: 'arcsin(?)', tooltipContent: 'arcsin(range)' },
  { name: 'arctan', format: 'arctan(?)', tooltipContent: 'arctan(range)' },
]
const funFld7 = [
  { name: 'total', format: 'total(?)', tooltipContent: 'total(range)' },
  { name: 'sum', format: 'sum(?)', tooltipContent: 'sum(range)' },
  { name: 'diff', format: 'diff(?)', tooltipContent: 'diff(range)' },
  { name: 'factorial', format: 'factorial(?)', tooltipContent: 'factorial(range)' },
  { name: 'choose', format: 'choose(?,?)', tooltipContent: 'choose(total size,subset size)' },
  { name: 'rgbcolor', format: 'rgbcolor(?,?,?)', tooltipContent: 'rgbcolor(red,green,blue)' }
]
const funFld8 = [
  { name: 'gaussian', format: 'gaussian(?,0/0,0,1)', tooltipContent: 'gaussian(number,seed,mean,stddev)' },
  { name: 'random', format: 'random(?,0/0,0,1)', tooltipContent: 'random(number,seed,low,high)' },
  { name: 'runavg', format: 'runavg(?,?)', tooltipContent: 'runavg(range,window)' },
  { name: 'inv', format: 'inv(?)', tooltipContent: 'inv(block)' },
  { name: 'fft', format: 'fft(?)', tooltipContent: 'fft(range)' },
  { name: 'invfft', format: 'invfft(?)', tooltipContent: 'invfft(block)' },
]
const funFld9 = [
  { name: 'normdist', format: 'normdist(?,0,1)', tooltipContent: 'normdist(indvar,mean,stddev)' },
  { name: 'norminv', format: 'norminv(?,0,1)', tooltipContent: 'norminv(indvae,mean,stddev)' },
  { name: 'tdist', format: 'tdist(?,?)', tooltipContent: 'tdist(indvar,df)' },
  { name: 'tinv', format: 'tinv(?,?)', tooltipContent: 'tinv(indvar,df)' },
  { name: 'fdist', format: 'fdist(?,?,?)', tooltipContent: 'fdist(indvar,numerator df,denominator df)' },
  { name: 'finv', format: 'finv(?,?,?)', tooltipContent: 'finv(indvar,numerator df,denominator df)' },
]

const lInputAcceptedFields = [
  'col',
  'block',
  'cell'
]

const trigonometricUnits = [
  { key: '0', text: 'Degrees' },
  { key: '1', text: 'Radians' },
  { key: '2', text: 'Grads' }
]

const trigonometricUnitsMap: any = {
  '0': 'Degrees',
  '1': 'Radians',
  '2': 'Grads',
}
let sharedVariables = remote.getGlobal('shared');
const subscriber = createNewClient()
const publisher = createNewClient()
const QuickTransformRedisKey = "QuickTransformData";
const client = createNewClient();

function QuickTransform(props) {
  const [schemaList, setSchemaList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [funFields, setFunFields] = useState(funFld);
  const [lFieldValue, setLFieldValue] = useState('');
  const [rFieldValue, setRFieldValue] = useState('');
  const [focussedField, setFocussedField] = useState('left');
  const [openOptionsModal, setOpenOptionsModal] = useState(false);
  const [trigonometricUnit, setTrigonometricUnit] = useState('0');
  const [tranformAsTitle, setTranformAsTitle] = useState(false);
  const lFieldRef: any = useRef();
  const rFieldRef: any = useRef();
  let subscription: Subscription;

  const setOptionsModal = () => {
    let rows: any = [...selectedRows];
    if (rows.length === 1) {
      let equations = schemaList[rows[0]];
      setTrigonometricUnit(equations?.trigonometricUnit || '0');
      //setTranformAsTitle(equations?.tranformAsTitle || false);
    }
    setOpenOptionsModal(true);
  }

  const updateTextField = (data: any) => {
    if (focussedField === 'left' && lInputAcceptedFields.includes(data.name)) {
      updateField({ fieldValue: lFieldValue, fieldRef: lFieldRef, data, setFieldValue: setLFieldValue })
    } else if (focussedField === 'right') {
      updateField({ fieldValue: rFieldValue, fieldRef: rFieldRef, data, setFieldValue: setRFieldValue })
    }
  }

  const updateField = ({ fieldValue, fieldRef, data, setFieldValue }: any) => {
    let value = fieldValue;
    let startPos = fieldRef?.current?.selectionStart;
    let endPos = fieldRef?.current?.selectionEnd;
    focussedField === 'left' ? value = data.format : value = value.substring(0, startPos)
      + data.format
      + value.substring(endPos, value.length);
    setFieldValue(value);
    let cursorPos = focussedField === 'left' ? (data.cursor ? data.format.split(")")[0].length + 1 : data.format.split("(")[0].length + 1) : (data.cursor ? startPos + data.format.split(")")[0].length + 1 : startPos + data.format.split("(")[0].length + 1);
    setTimeout(() => {
      fieldRef?.current?.focus();
      fieldRef?.current?.setSelectionRange(cursorPos, cursorPos + 1);
    }, 0)
  }

  const updateSelectedRows = (event: any, index: number) => {
    let rows: any = [...selectedRows];
    if (event.ctrlKey) {
      let selectedIndex = rows.indexOf(index);
      if (selectedIndex >= 0) {
        rows.splice(selectedIndex);
      } else {
        rows.push(index);
      }
    } else if (event.shiftKey) {
      let lastIndex = rows[rows.length - 1];
      if (lastIndex < index) {
        while (lastIndex < index) {
          lastIndex++;
          rows.push(lastIndex);
        }
      } else if (lastIndex > index) {
        while (lastIndex > index) {
          lastIndex--;
          rows.push(lastIndex);
        }
      }
    } else {
      rows = [index];
    }
    if (rows.length === 1) {
      let equations = schemaList[rows[0]]?.equation?.split("=");
      setLFieldValue(equations[0]);
      setRFieldValue(equations[1]);
    } else {
      setLFieldValue('');
      setRFieldValue('');
    }
    setSelectedRows(rows);
  }

  const runTransform = async () => {
    let RGBSELECTED = rFieldValue.includes("rgbcolor")
    let rFieldValueRGB = rFieldValue.replace("rgbcolor", "rgb");
    if (RGBSELECTED == true) {
      let rows: any = [...selectedRows];
      let list = JSON.parse(JSON.stringify(schemaList));
      let currentEquation = lFieldValue + '=' + rFieldValue;
      let schemaEquation = { equation: lFieldValue + '=' + rFieldValue, trigonometricUnit: trigonometricUnit, tranformAsTitle: tranformAsTitle };
      let equationsToRun: any = [];
      if (rows.length === 0) {
        if (lFieldValue && rFieldValue) {
          list.push(schemaEquation);
          equationsToRun.push({
            "equation": currentEquation,
            "units": trigonometricUnitsMap[trigonometricUnit]
          });
        }
      } else if (rows.length === 1) {
        if (lFieldValue && rFieldValue) {
          if (list[rows[0]].equation !== currentEquation) {
            list.push(schemaEquation);
          }
          equationsToRun.push({
            "equation": currentEquation,
            "units": trigonometricUnitsMap[trigonometricUnit]
          });
        }
      } else if (rows.length > 1) {
        rows.forEach((index: number) => {
          equationsToRun.push({
            "equation": list[index].equation,
            "units": trigonometricUnitsMap[trigonometricUnit]
          })
        });
      }
      if (equationsToRun.length) {
        const activeSheetId = getActiveWorksheet(props.notebookState);
        if (activeSheetId && activeSheetId.length) {
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
          console.log("-------------->>262", data, "data")
          console.log("here")
          subscriber.subscribe('user-input');
          subscribeToChannel();
          post(
            Config.quickTransform,
            {
              "worksheet": clientData.key,
              //"units": trigonometricUnitsMap[trigonometricUnit],
              "quick_transform": equationsToRun
            }
          ).then(async (response: any) => {
            response = response.data;
            if (response) {
              let errorMsg = response.error || response.error_message || (response.worksheet && response.worksheet.error_message) || (response.quick_transform && response.quick_transform.error_message) || '';
              if (errorMsg) {
                warningOptions.message = errorMsg;
                showMessageBox(warningOptions);
              } else if (response.result) {
                setSchemaList(list);
                updateDataInRedis(list);
                setSelectedRows([]);
                setLFieldValue('');
                setRFieldValue('');
                const data = await getDataSetByKey(response.result.redis_id, client);
                if (data && data.length) {
                  let sheetData = data[0].sheetdata;
                  sheetData = transposeArray(sheetData);
                  await updateData(
                    client,
                    sheetData,
                    key
                  );
                  // dataService.sendData({ sheetId: key });
                }
              }
            }
          })
        }
      }




      let ISCOL = lFieldValue.includes("col")
      let cellIndexfirst
      let cellIndexlast
      if (ISCOL == true) {
        cellIndexfirst = parseInt(lFieldValue.charAt(lFieldValue.lastIndexOf("(") + 1)) - 1;
        cellIndexlast = 0;
      }
      else {
        cellIndexfirst = parseInt(lFieldValue.charAt(lFieldValue.lastIndexOf("(") + 1)) - 1;
        cellIndexlast = parseInt(lFieldValue.charAt(lFieldValue.lastIndexOf("(") + 3)) - 1;
      }
      console.log("cell index", cellIndexfirst, cellIndexlast)
      let cellvalue = getCellAddress(cellIndexlast, cellIndexfirst)
      console.log("hey rgb", cellvalue)
      let item = { value: `@${rFieldValueRGB}`, backgroundColor: `${rFieldValueRGB}`, text: 'Custom', custom: true, cellvalue: cellvalue };

      props.actions.graphicCellAction.GraphicCellRGBUpdate({ message: item });
    }
    else {
      console.log("no rgb")


      console.log("debug 1",)
      let rows: any = [...selectedRows];
      console.log("rows here", rows)
      let list = JSON.parse(JSON.stringify(schemaList));
      console.log("left here", lFieldValue)
      console.log("right here", rFieldValue)


      let currentEquation = lFieldValue + '=' + rFieldValue;
      let schemaEquation = { equation: lFieldValue + '=' + rFieldValue, trigonometricUnit: trigonometricUnit, tranformAsTitle: tranformAsTitle };
      let equationsToRun: any = [];
      if (rows.length === 0) {
        console.log("debug 0",)

        if (lFieldValue && rFieldValue) {
          list.push(schemaEquation);
          // setSchemaList(list);
          console.log("-------------->>2")
          equationsToRun.push({
            "equation": currentEquation,
            "units": trigonometricUnitsMap[trigonometricUnit]
          });
        }
      } else if (rows.length === 1) {
        console.log("debug 11",)

        if (lFieldValue && rFieldValue) {
          if (list[rows[0]].equation !== currentEquation) {
            list.push(schemaEquation);
            // setSchemaList(list);
          }
          equationsToRun.push({
            "equation": currentEquation,
            "units": trigonometricUnitsMap[trigonometricUnit]
          });
        }
      } else if (rows.length > 1) {
        console.log("debug 12",)

        rows.forEach((index: number) => {
          equationsToRun.push({
            "equation": list[index].equation,
            "units": trigonometricUnitsMap[trigonometricUnit]
          })
        });
      }
      if (equationsToRun.length) {
        const activeSheetId = getActiveWorksheet(props.notebookState);
        if (activeSheetId && activeSheetId.length) {
          const key = activeSheetId[0].id;
          const client = createNewClient();
          let data = await getDataSetByKey(key, client);
          // console.log("-------------->>262",data, "data")
          data = transposeArray(data);


          const clientData = await setWorksheetData(
            [{
              sheetdata: data,
              metadata: convertMetadata(data)
            }],
            'meta' + key
          );
          console.log("-------------->>262", data, "data")
          console.log("here 2")
          subscriber.subscribe('user-input');
          subscribeToChannel();
          post(
            Config.quickTransform,
            {
              "worksheet": clientData.key,
              //"units": trigonometricUnitsMap[trigonometricUnit],
              "quick_transform": equationsToRun
            }
          ).then(async (response: any) => {
            response = response.data;
            if (response) {
              let errorMsg = response.error || response.error_message || (response.worksheet && response.worksheet.error_message) || (response.quick_transform && response.quick_transform.error_message) || '';
              if (errorMsg) {
                warningOptions.message = errorMsg;
                showMessageBox(warningOptions);
              } else if (response.result) {
                setSchemaList(list);
                updateDataInRedis(list);
                setSelectedRows([]);
                setLFieldValue('');
                setRFieldValue('');
                const data = await getDataSetByKey(response.result.redis_id, client);
                console.log("data here", data)
                if (data && data.length) {
                  let sheetData = data[0].sheetdata;
                  sheetData = transposeArray(sheetData);
                  await updateData(
                    client,
                    sheetData,
                    key
                  );
                  dataService.sendData({ sheetId: key });
                }
              }
            }
          })
        }
      }
    }
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
      // if (responseMessage) {
      //   console.log('****Open dailog here*****');
      //   //alert("here");
      //   //alert(responseMessage)
      //   setResponseMessageAlert(responseMessage)
      //   setButtonTypes(response.MessageBox.ButtonTypes)
      //   toggleHideDialog()
      //   subscriber.removeAllListeners();
      //   publisher.removeAllListeners();
        
       
      // }
       if (confirm(responseMessage)) {
          publishToChannel();
        } else {
          publishToChannelCanceledByUser();
        }
    });
  };
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
  const updateDataInRedis = async (list: any) => {
    let equations = JSON.parse(JSON.stringify(list));
    const data = { equations, tranformAsTitle };
    await updatDatasetInRedis(client, data, QuickTransformRedisKey);
  }

  const deleteRow = (index: number) => {
    let list = JSON.parse(JSON.stringify(schemaList));
    list.splice(index, 1);
    let rows: any = [...selectedRows];
    let rowIndex = rows.indexOf(index);
    if (rowIndex >= 0) {
      rows.splice(rowIndex, 1);
      setSelectedRows(rows);
      setLFieldValue('');
      setRFieldValue('');
    }
    setSchemaList(list);
    updateDataInRedis(list);
  }

  const updateTrigonometricOptions = () => {
    if (selectedRows.length > 0) {
      let list = JSON.parse(JSON.stringify(schemaList));
      selectedRows.forEach((row: number) => {
        list[row].trigonometricUnit = trigonometricUnit;
        list[row].tranformAsTitle = tranformAsTitle;
      });
      setSchemaList(list);
      updateDataInRedis(list);
    }
    setOpenOptionsModal(false);
  }

  useEffect(() => {
    subscription = dataService.getData().subscribe((data: any) => {
      if (data && data.range) {
        const [row1, col1, row2, col2] = data.range;
        let fieldData;
        if (data.isHead) {
          fieldData = { name: 'col', format: `col(${col1 + 1})`, cursor: true };
        } else if (col1 === col2 && row1 === row2) {
          fieldData = { name: 'cell', format: `cell(${col1 + 1}, ${row1 + 1})`, cursor: true };
        } else if (col1 === col2) {
          fieldData = { name: 'col', format: `col(${col1 + 1}, ${row1 + 1}, ${row2 + 1})`, cursor: true };
        } else {
          fieldData = { name: 'block', format: `block(${col1 + 1}, ${row1 + 1}, ${col2 + 1}, ${row2 + 1})`, cursor: true };
        }
        fieldData && updateTextField(fieldData);
      }
    });

    return () => {
      subscription.unsubscribe();
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getDataSetByKey(QuickTransformRedisKey, client);
    if (data) {
      setTranformAsTitle(data.tranformAsTitle || false);
      setSchemaList(data.equation || []);
    }
  }

  const closeTransform = () => {
    props.actions.TransformAction.isOpenQuickTransform({
      message: false
    })
  }

  return (
    <div>
      <ModalCompontent component={<>
        <div className="insets-container quickTranform">
          <div className="insets-header">
            <Label>Equation</Label>
          </div>
          <div  style={{maxHeight: '100px' , overflow:'scroll', minHeight:'100px'}}>
            <table className={`table br-0`}>
              <tbody>
                {schemaList && schemaList.map(function (item, i) {
                  return (
                    <React.Fragment>
                      <tr className={selectedRows.includes(i) ? "tableSelected" : ""} onClick={(e) => updateSelectedRows(e, i)} key={item}>
                        <td colSpan={8}>
                          {selectedRows.includes(i) && <i style={{ color: '#0078d4' }} className="ms-Icon ms-Icon--CompletedSolid" aria-hidden="true"></i>}
                          {item.equation}
                        </td>
                        <td colSpan={2} style={{ textAlign: 'right' }}>
                          <i onClick={(e) => { e.stopPropagation(); deleteRow(i) }} style={{ cursor: 'pointer', color: '#0078d4' }} className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i>
                        </td>
                      </tr>
                    </React.Fragment>
                  )
                })
                }
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <Stack horizontal className={'p-0'} tokens={stackTokens} styles={stackStyles}>
          <BottomSection type={'all'} component={<>
            <div className="ms-Grid-col ms-lg3 p-0">
              <TextField ref={lFieldRef} value={lFieldValue} className={'w-100'} onChange={(e: any) => setLFieldValue(e.target.value)} onFocus={() => { setFocussedField('left') }} autoFocus />
            </div>
            <div className="ms-Grid-col ms-lg1 text-center">
              =
            </div>
            <div className="ms-Grid-col ms-lg6">
              <TextField ref={rFieldRef} value={rFieldValue} className={'w-100'} onChange={(e: any) => setRFieldValue(e.target.value)} onFocus={() => { setFocussedField('right') }} />
            </div>
            <div className={'ms-lg2'}>
              <DefaultButton
                text={selectedRows.length > 1 ? "Run All" : "Run"}
                className={`bg-green whiteColor`}
                allowDisabledFocus
                onClick={runTransform}
              />
            </div>
            <div className={'ms-lg2 ml-1'}>
              <DefaultButton
                text="Cancel"
                className={`text-block`}
                onClick={closeTransform}
                allowDisabledFocus
              />
            </div>
          </>} />
        </Stack><br />
        <div className="insets-container quickTranform">
          <div className="insets-header">
            <Label>Operators and Functions</Label>
          </div>
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <BottomSection type={'all'} component={<>
              <div className={'mb-div-1 ml-1 operatorCol'}>
                {funFld1.map(a =>
                  <React.Fragment >
                    <TooltipHost
                      content={a.tooltipContent}
                      closeDelay={100}>
                      <button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>
                    </TooltipHost>
                  </React.Fragment>

                )}
              </div>
              <div className={'mb-div-1 ml-1 operatorCol'}>

                {funFld2.map(a =>
                  <React.Fragment>
                    <button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>
                  </React.Fragment>
                )}
              </div>
              <div className={'mb-div-1 ml-1 operatorCol'}>
                {funFld3.map(a =>
                  <React.Fragment>
                    {(focussedField === 'left' && !a.left) ?
                      (<button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>) :
                      (<TooltipHost
                        content={a.tooltipContent}
                        closeDelay={100}>
                        <button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>
                      </TooltipHost>
                      )
                    }
                  </React.Fragment>
                )}
              </div>
              <div className={'mb-div-1 ml-1 operatorCol'}>
                {funFld4.map(a =>
                  <React.Fragment>
                    {(focussedField === 'left' && !a.left) ?
                      (<button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>) :
                      (<TooltipHost
                        content={a.tooltipContent}
                        closeDelay={100}>
                        <button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>
                      </TooltipHost>
                      )
                    }
                  </React.Fragment>
                )}

              </div>
              <div className={'mb-div-1 ml-1 operatorCol'}>
                {funFld5.map(a =>
                  <React.Fragment>
                    {(focussedField === 'left' && !a.left) ?
                      (<button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>) :
                      (<TooltipHost
                        content={a.tooltipContent}
                        closeDelay={100}>
                        <button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>
                      </TooltipHost>
                      )
                    }
                  </React.Fragment>
                )}
              </div>
              <div className={'mb-div-1 ml-1 operatorCol'}>
                {funFld6.map(a =>
                  <React.Fragment>
                    {(focussedField === 'left' && !a.left) ?
                      (<button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>) :
                      (<TooltipHost
                        content={a.tooltipContent}
                        closeDelay={100}>
                        <button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>
                      </TooltipHost>
                      )
                    }
                  </React.Fragment>
                )}
              </div>
              <div className={'mb-div-1 ml-1 operatorCol'}>
                {funFld7.map(a =>
                  <React.Fragment>
                    {(focussedField === 'left' && !a.left) ?
                      (<button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>) :
                      (<TooltipHost
                        content={a.tooltipContent}
                        closeDelay={100}>
                        <button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>
                      </TooltipHost>
                      )
                    }
                  </React.Fragment>
                )}
              </div>
              <div className={'mb-div-1 ml-1 operatorCol'}>
                {funFld8.map(a =>
                  <React.Fragment>
                    {(focussedField === 'left' && !a.left) ?
                      (<button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>) :
                      (<TooltipHost
                        content={a.tooltipContent}
                        closeDelay={100}>
                        <button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>
                      </TooltipHost>
                      )
                    }
                  </React.Fragment>
                )}
              </div>
              <div className={'mb-div-1 ml-1 operatorCol'}>
                {funFld9.map(a =>
                  <React.Fragment>
                    {(focussedField === 'left' && !a.left) ?
                      (<button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>) :
                      (<TooltipHost
                        content={a.tooltipContent}
                        closeDelay={100}>
                        <button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>
                      </TooltipHost>
                      )
                    }
                  </React.Fragment>
                )}
              </div>
              <div className={'mb-div-1 ml-1 operatorCol'}>
                {funFld10.map(a =>
                  <React.Fragment>
                    <button disabled={(focussedField === 'left' && !a.left)} className={'ml-1'} onClick={() => { updateTextField(a) }}>{a.name}</button>
                  </React.Fragment>
                )}
                <button className={'ml-1'}>
                  <i onClick={setOptionsModal} className="ms-Icon ms-Icon--Settings" aria-hidden="true"></i>
                </button>
              </div>
            </>
            }></BottomSection>
          </Stack>
        </div>
        <Modal
          titleAriaId={'titleAriaId'}
          isOpen={openOptionsModal}
          onDismiss={() => setOpenOptionsModal(false)}
          isModeless={true}
          containerClassName={'addAsModal'}
          dragOptions={dragOptions}
        >
          <div className={contentStyles.header}>
            <div className="ms-Grid-col ms-sm9">
              <span id={'title2'} style={{ fontSize: 18 }}>Options</span>
            </div>
            <div className="ms-Grid-col ms-sm3">
              <Helpbutton nodeId="" />
            </div>
            <div style={iconButtonStyles.root}>
              <IconButton
                // styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={() => setOpenOptionsModal(false)}
              />
            </div>
          </div>
          <div className={contentStyles.body}>
            <fieldset className={contentStyles.fieldSet}>
              <legend>Trigonometric units</legend>
              <ChoiceGroup defaultSelectedKey={trigonometricUnit} options={trigonometricUnits} onChange={(e, item: any) => { setTrigonometricUnit(item.key) }} />
            </fieldset>
            <Checkbox label="Use transform as title of output column" checked={tranformAsTitle} onChange={(e: any) => { setTranformAsTitle(e.target.checked) }} />
            <BottomSection type={'all'} component={<>
              <div className={'ms-lg12'} style={{ textAlign: 'right', marginTop: '10px' }}>
                <DefaultButton
                  text="OK"
                  className={`bg-green`}
                  allowDisabledFocus
                  onClick={updateTrigonometricOptions}
                />
                <DefaultButton
                  text="Cancel"
                  className={`text-block ml-1`}
                  onClick={() => {
                    setOpenOptionsModal(false)
                  }}
                  allowDisabledFocus
                />
              </div>
            </>} />
          </div>
        </Modal>
      </>
      }
        close={closeTransform}
        title={'Quick Transform'}
        className={'quickTranformModal'}
        headerClassName={'draggableContainer'}
        isDraggable={true}
        isModeless={true}
        keepInBounds={true}
        isBlocking={false}
      >
      </ModalCompontent>
    </div>
  )
}

const theme = getTheme();
const contentStyles = mergeStyleSets({
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '1 1 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
  columns: {
    display: 'flex',
    marginTop: '10px'
  },
  column: {
    flex: '0 0 50%',
    marginBottom: '15px'
  },
  fieldSet: {
    border: '1px solid rgb(211, 211, 218, 0.7)',
    marginBottom: '10px'
  },
});

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

function mapStateToProps(state) {
  return {
    transformState: state.transformReducer,
    notebookState: state.notebookReducer,
    referenceObjectState: state.instanceReducer.instance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      TransformAction: bindActionCreators(TransformAction, dispatch),
      graphicCellAction: bindActionCreators(graphicCellAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuickTransform);
