import React, { useState, useEffect } from 'react';
import {
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  IComboBoxStyles,
  Stack,
  IStackTokens,
} from '@fluentui/react';
import { Label } from '@fluentui/react/lib/Label';
import {
  ContextualMenu,
  IContextualMenuProps,
  IIconProps,
} from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import * as importDBAction from '../../store/Worksheet/ImportDB/actions';
import * as DBService from './../../services/ImportODBCServices';
import BottomSection from './Compontent/BottomSection';
import * as Services from './../../services/RedisServices';
import * as DBfunction from './DBFunction/DBFunction';
import * as ErrorMessage from './Compontent/ErrorCompontent';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProgressAction from '../../store/Channel/Progress/actions';
import {
  createSubscribeChannel,
  subscriber,
  unSubscribeChannel,
} from '../../components/Constant/ConstantFunction';
// const optionsForCustomRender: IComboBoxOption[] = [
//   { key: 'header1', text: 'Theme fonts' },
//   { key: 'divider', text: '-' },
//   { key: 'header2', text: 'Other options' },
// ];

const style = {
  display: 'block',
  width: '100%',
  height: '200px',
  margin: '0px',
};

const onRenderOption = (item: IComboBoxOption) => {
  return <span>{item.text}</span>;
};

// Basic styling to make the example look nicer
const basicStyles: Partial<IComboBoxStyles> = {
  optionsContainer: {
    width: '250px',
    maxHeight: '250px',
  },
  container: {
    width: '250px',
  },
};
const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

const DoubleChevronLeftMedMirrored: IIconProps = {
  iconName: 'DoubleChevronLeftMedMirrored',
};
const DoubleChevronLeftMed: IIconProps = { iconName: 'DoubleChevronLeftMed' };
const ChevronRightMed: IIconProps = { iconName: 'ChevronRightMed' };
const ChevronLeftMed: IIconProps = { iconName: 'ChevronLeftMed' };

const constructObj = (param) => {
  let data = [];
  if (param) {
    param.map((a) => {
      data.push({
        key: a,
        text: a,
      });
    });
  }
  return data;
};

function TableQuery(props) {
  // const [optionsForCustomRender, setOptionsForCustomRender] = useState([])
  const [unselectTable, setUnselectTable] = useState([]);
  const [selectTable, setSelectTable] = useState([]);
  const [currentTableInfo, setCurrentTableInfo] = useState([]);
  const [propsTable, setPropsTable] = useState(props.tableList);
  const [currentTable, setCurrentTable] = useState('');
  const [statusBar, setStatusBar] = useState(0);
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>('');
  const value = props.value;
  let unselectedPara = '';
  let selectedPara = '';
  const optionsForCustomRender = constructObj(
    props.tableList.database_related_table
  );
  useEffect(() => {
    if (optionsForCustomRender.length > 0) {
      changeTable(undefined, optionsForCustomRender[0]);
    }
  }, []);
  const onChange = () => {};

  useEffect(() => {
    props.actions.ProgressAction.updatePercentageMessage({
      message: statusBar,
    });
    if (statusBar == 0 || statusBar == 100) {
      props.actions.ProgressAction.isLoadBar({ message: false });
      props.actions.ProgressAction.updatePercentageMessage({ message: 0 });
    }
  }, [statusBar]);

  const subscribeToChannel = async () => {
    // alert("inside subscrbe")
    props.actions.ProgressAction.isLoadBar({ message: true });
    console.log('subscribing to channel user input!');
    await subscriber.on('message', (channel, message) => {
      setStatusBar(parseInt(message));
      if (message == 100 || message == '100') {
        setStatusBar(0);
        unSubscribeChannel('progress');
      }
      //  return message;
    });
  };
  const changeTable = (e, option) => {
    let param = option.text;
    setSelectedKey(param as string);
    setCurrentTable(param);
    setSelectTable([]);
    setUnselectTable([]);
    let data = propsTable[param];
    let conn = {
      type: 'specific',
      table: param,
    };
    let response = DBService.getTableCols(conn);
    response
      .then((success) => {
        let data = success.data;
        if (data.status === 'success') {
          setCurrentTableInfo(data.result[param]);
          setUnselectTable(data.result[param]);
        } else {
          ErrorMessage.ErrorMessage(data);
        }
      })
      .then((error) => {
        console.error(error);
      });
  };

  const moveRtoL = () => {
    let data = [...currentTableInfo];
    setSelectTable(data);
    setUnselectTable([]);
  };
  const moveLtoR = () => {
    let data = [...currentTableInfo];
    setUnselectTable(data);
    setSelectTable([]);
  };

  const unselected = (e) => {
    console.log(e.target.value);
    unselectedPara = e.target.value;
  };

  const selected = (e) => {
    console.log(e.target.value);
    selectedPara = e.target.value;
  };

  const singleLtoR = () => {
    let data = [...unselectTable],
      info = [...selectTable];
    const index = data.indexOf(unselectedPara);
    if (index > -1) {
      data.splice(index, 1);
    }
    setUnselectTable(data);
    info.push(unselectedPara);
    info = info.filter((a) => a !== '' && a !== undefined && a !== null);
    setSelectTable(info);
    document.querySelector('#items').value = '';
  };

  const singleRtoL = () => {
    let data = [...selectTable],
      info = [...unselectTable];
    const index = data.indexOf(selectedPara);
    if (index > -1) {
      data.splice(index, 1);
    }
    // data.pop(selectedPara);
    setSelectTable(data);
    info.push(selectedPara);
    info = info.filter((a) => a !== '' && a !== undefined && a !== null);
    setUnselectTable(info);
    document.querySelector('#ritems').value = '';
  };

  const importData = async () => {
    if (selectTable.length > 0) {
      let conn = {
        table: currentTable,
        columns: selectTable,
      };
      props.actions.ProgressAction.isLoaderSM({ message: true });
      let res = await DBService.importData(conn);
      // subscribeToChannel();
      if (res.status == 200) {
        props.actions.importDBAction.isOpenImportTable({ message: false });
        // props.actions.ProgressAction.isLoadBar({message: false});
        if (res.data.status === 'success') {
          let queryKey = res.data.result.key;
          let redisData = await Services.getDataQueryKey(queryKey);
          props.actions.ProgressAction.isLoaderSM({ message: false });
          if (redisData.length > 0) {
            DBfunction.disConnection();
            props.actions.importDBAction.updateDataSheet({
              message: redisData,
            });
            props.actions.importDBAction.isOpenImportTable({ message: false });
          } else {
            ErrorMessage.ErrorMessage('No Records');
          }
        } else {
          props.actions.ProgressAction.isLoaderSM({ message: false });
          ErrorMessage.ErrorMessage(res);
        }
      } else {
        props.actions.ProgressAction.isLoaderSM({ message: false });
        ErrorMessage.ErrorMessage(res);
        // props.actions.ProgressAction.isLoadBar({message: false});
      }
      props.actions.ProgressAction.isLoaderSM({ message: false });
    } else {
      let data = {
        error: 'Please select field name',
        type: 'info',
      };
      ErrorMessage.ErrorMessage(data);
    }

    // let response =await DBService.importData(conn);
    // let value = await response.then((success)=>{
    //   let data = success.data;
    //   if(data.status==="success"){
    //     let queryKey = data.result.key;
    //      Services.getDataQueryKey(queryKey).then((res)=>{
    //       DBfunction.disConnection();
    //       props.actions.importDBAction.updateDataSheet({message: res});
    //       props.actions.importDBAction.isOpenImportTable({message:false});
    //     }).then((reject)=>{
    //       ErrorMessage.ErrorMessage(reject);
    //     })
    //   }else{
    //     ErrorMessage.ErrorMessage(data);
    //   }
    // }).then(error=>{
    //   console.error(error);
    // })
  };

  return (
    <>
      <Stack
        horizontal
        className={`flex-container br-1 p-1 mb-2 removecallout`}
      >
        <Stack className={`w-100`}>
          <Stack horizontal tokens={stackTokens}>
            <ComboBox
              // defaultSelectedKey={currentTable}
              value={currentTable}
              label="Select Table"
              allowFreeform
              autoComplete="on"
              options={optionsForCustomRender}
              selectedKey={selectedKey}
              dropdownMaxWidth={200}
              onRenderOption={onRenderOption}
              styles={basicStyles}
              onChange={changeTable}
             // className={`w-100`}
             // calloutProps={{ doNotLayer: true }}
            />
          </Stack>
          <Stack horizontal tokens={stackTokens} className={`mb-1`}>
            <Stack tokens={stackTokens} className={`w-40`}>
              <Label for="item">{`Available Fields`}</Label>
              <select
                id="items"
                className={`m-auto`}
                size={6}
                style={style}
                value={value}
                onChange={unselected}
              >
                {unselectTable.map((list, index) => (
                  <option key={index} value={list}>
                    {list}
                  </option>
                ))}
              </select>
            </Stack>
            <Stack tokens={stackTokens} className={`align-center mt-2`}>
              {/* <Label></Label> */}
              <Stack tokens={stackTokens}>
                <DefaultButton
                  text=""
                  onClick={moveRtoL}
                  className={`text-black`}
                  iconProps={DoubleChevronLeftMedMirrored}
                />
              </Stack>
              <Stack tokens={stackTokens}>
                <DefaultButton
                  text=""
                  onClick={moveLtoR}
                  className={`text-black`}
                  iconProps={DoubleChevronLeftMed}
                />
              </Stack>
              <Stack tokens={stackTokens}>
                <DefaultButton
                  text=""
                  onClick={singleLtoR}
                  className={`text-black`}
                  iconProps={ChevronRightMed}
                />
              </Stack>
              <Stack tokens={stackTokens}>
                <DefaultButton
                  text=""
                  onClick={singleRtoL}
                  className={`text-black`}
                  iconProps={ChevronLeftMed}
                />
              </Stack>
            </Stack>
            <Stack tokens={stackTokens} className={`w-40`}>
              <Label for="item">{`Selected Fields`}</Label>
              <select
                id="ritems"
                className={`m-auto`}
                size={6}
                style={style}
                value={value}
                onChange={selected}
              >
                {selectTable.map((list, index) => (
                  <option key={index} value={list}>
                    {list}
                  </option>
                ))}
              </select>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack horizontal tokens={stackTokens}>
        <BottomSection
          type={'all'}
          component={
            <>
              <div className={`ms-lg6`}>
                <Stack>
                  <Label>Overwrite at Row 1, Column 1</Label>
                </Stack>
              </div>
              <div className={`ms-lg6 ms-lgOffset1 d-flex`}>
                {/* <Stack tokens={stackTokens}> */}
                {/* <DefaultButton
                    text="Help"
                    className={`text-block`}
                    allowDisabledFocus
                    // disabled={disabled}
                    // checked={checked}
                    onClick={()=>props.actions.importDBAction.isOpenTableQuery({message:false})}
                />
              </Stack> */}
                <Stack tokens={stackTokens} className={`offset1`}>
                  <DefaultButton
                    text="Import"
                    className={`bg-green`}
                    allowDisabledFocus
                    // disabled={disabled}
                    // checked={checked}
                    onClick={importData}
                  />
                </Stack>
                <Stack tokens={stackTokens} className={`offset1`}>
                  <DefaultButton
                    text="Cancel"
                    className={`text-block`}
                    // onClick={hideModal}
                    // onClick={setShowList(!showList)}
                    onClick={() => {
                      DBfunction.disConnection();
                      props.actions.importDBAction.isOpenImportTable({
                        message: false,
                      });
                    }}
                    allowDisabledFocus
                    // disabled={disabled}
                    // checked={checked}
                  />
                </Stack>
              </div>
            </>
          }
        />
      </Stack>
    </>
  );
}

function mapStateToProps(state) {
  return {
    importDBState: state.importDBReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      importDBAction: bindActionCreators(importDBAction, dispatch),
      ProgressAction: bindActionCreators(ProgressAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TableQuery);
