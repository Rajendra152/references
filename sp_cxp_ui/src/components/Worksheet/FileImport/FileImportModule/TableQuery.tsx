import React, { useState } from 'react'
import {
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  IComboBoxStyles,
  Stack,
  IStackTokens,
} from '@fluentui/react';
import { Label } from '@fluentui/react/lib/Label';
import { ContextualMenu, IContextualMenuProps, IIconProps } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
// import * as importDBAction from '../../store/Worksheet/ImportDB/actions';
// import * as DBService from './../../services/ImportODBCServices';
import BottomSection from './../../Compontent/BottomSection';
// import * as Services from './../../services/RedisServices';
// import * as DBfunction from './DBFunction/DBFunction';
// import * as ErrorMessage from './Compontent/ErrorCompontent';
import * as importfileAction from "../../../../store/Worksheet/FileImport/actions";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// const optionsForCustomRender: IComboBoxOption[] = [
//   { key: 'header1', text: 'Theme fonts' },
//   { key: 'divider', text: '-' },
//   { key: 'header2', text: 'Other options' },
// ];

const style = {
  display:"block",
  width:"150px",
  height: "200px"
}

const onRenderOption = (item: IComboBoxOption) => {
  return <span>{item.text}</span>;
};

// Basic styling to make the example look nicer
const basicStyles: Partial<IComboBoxStyles> = { root: { width: '100%', marginBottom: 20 } };
const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

const DoubleChevronLeftMedMirrored: IIconProps = { iconName: 'DoubleChevronLeftMedMirrored' };
const DoubleChevronLeftMed: IIconProps = { iconName: 'DoubleChevronLeftMed' };
const ChevronRightMed: IIconProps = { iconName: 'ChevronRightMed' };
const ChevronLeftMed: IIconProps = { iconName: 'ChevronLeftMed' };

const constructObj = (param) =>{
  let data = [];
  if(param){
    param.map(a=>{
      data.push({
        key: a,
        text: a
      })
    })
  }
  return data;
}

function TableQuery(props) {
  // const [optionsForCustomRender, setOptionsForCustomRender] = useState([])
  const [unselectTable, setUnselectTable] = useState([]);
  const [selectTable, setSelectTable] = useState([]);
  const [currentTableInfo, setCurrentTableInfo] = useState([]);
  const [propsTable, setPropsTable] = useState(props.tableList);
  const [currentTable, setCurrentTable] = useState("");
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>('');
  const value = props.value;
  let unselectedPara = "";
  let selectedPara = "";
  const optionsForCustomRender = constructObj(props.tableList.database_related_table);
  const onChange = () =>{

  }
  const changeTable = (e, option) =>{
    let param = option.text;
    setSelectedKey(param as string);
    setCurrentTable(param);
    setSelectTable([]);
    setUnselectTable([]);
    let data = propsTable[param];
    // setCurrentTableInfo(data.result[param]);
    // setUnselectTable(data.result[param]);

  }

  const moveRtoL = () =>{
    let data = [...currentTableInfo];
    setSelectTable(data);
    setUnselectTable([]);
  }
  const moveLtoR = () =>{
    let data = [...currentTableInfo];
    setUnselectTable(data);
    setSelectTable([]);
    document.querySelector('#items').value = "";
  }

  const unselected = (e) =>{
    console.log(e.target.value);
    unselectedPara = e.target.value;
  }

  const selected = (e) =>{
    console.log(e.target.value);
    selectedPara = e.target.value;
  }

  const singleLtoR = () =>{
    let data = [...unselectTable], info = [...selectTable];
    const index = data.indexOf(unselectedPara);
    if (index > -1) {
      data.splice(index, 1);
    }
    setUnselectTable(data);
    info.push(unselectedPara);
    info = info.filter(a=>a!==""&&a!==undefined&&a!==null);
    setSelectTable(info);
  }

  const singleRtoL = () =>{
    let data = [...selectTable], info = [...unselectTable];
    const index = data.indexOf(selectedPara);
    if (index > -1) {
      data.splice(index, 1);
    }
    // data.pop(selectedPara);
    setSelectTable(data);
    info.push(selectedPara);
    info = info.filter(a=>a!==""&&a!==undefined&&a!==null);
    setUnselectTable(info);
    document.querySelector('#ritems').value = "";
  };

  const importData = () =>{

  }

  return (
<>
      <Stack horizontal className={`flex-container br-1 p-1 mb-2`}>
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
          onRenderOption={onRenderOption}
          styles={basicStyles}
          onChange={changeTable}
          className={`w-100`}
        />
        </Stack>
        <Stack horizontal tokens={stackTokens} className={`mb-1`}>
          <Stack tokens={stackTokens} className={`w-33 text-center`}>
            <Label for="item">{`Available Fields`}</Label>
            <select id ="items" className={`m-auto`} size={6} style={style}
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
              <Stack tokens={stackTokens}><DefaultButton text="" onClick={moveRtoL} className={`text-black`} iconProps={DoubleChevronLeftMedMirrored} /></Stack>
              <Stack tokens={stackTokens}><DefaultButton text="" onClick={moveLtoR} className={`text-black`} iconProps={DoubleChevronLeftMed} /></Stack>
              <Stack tokens={stackTokens}><DefaultButton text="" onClick={singleLtoR} className={`text-black`} iconProps={ChevronRightMed} /></Stack>
              <Stack tokens={stackTokens}><DefaultButton text="" onClick={singleRtoL} className={`text-black`} iconProps={ChevronLeftMed} /></Stack>
          </Stack>
          <Stack tokens={stackTokens} className={`w-33 text-center`}>
          <Label for="item">{`Selected Fields`}</Label>
            <select id ="ritems" className={`m-auto`} size={6} style={style}
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
            <BottomSection type={2} component={
              <>
              <Stack tokens={stackTokens}>
                {/* <DefaultButton
                    text="Help"
                    className={`text-block`}
                    allowDisabledFocus
                    // disabled={disabled}
                    // checked={checked}
                    onClick={()=>props.actions.importDBAction.isOpenTableQuery({message:false})}
                /> */}
              </Stack>
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
                      onClick={()=>{props.actions.importfileAction.isOpenTableQuery({message: false})}}
                      allowDisabledFocus
                      // disabled={disabled}
                      // checked={checked}
                  />
              </Stack>
              </>
        }
        />
    </Stack>

    </>
  )
}

function mapStateToProps(state) {
  return {
    importfileState: state.ImportfileReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      importfileAction: bindActionCreators(importfileAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TableQuery);
