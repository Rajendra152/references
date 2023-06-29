import React, { useState, useEffect } from 'react'
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
import * as DBService from './../../../../services/ImportFileService';
import * as Services from './../../../../services/RedisServices';
import * as ErrorMessage from './../../Compontent/ErrorCompontent';
import { createSubscribeChannel, subscriber, unSubscribeChannel } from './../../../Constant/ConstantFunction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProgressAction from "../../../../store/Channel/Progress/actions";

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


function FieldSelection(props) {

  const [unselectTable, setUnselectTable] = useState(props.fieldsList);
  const [selectTable, setSelectTable] = useState([]);
  const [currentTableInfo, setCurrentTableInfo] = useState(props.fieldsList);
  // const [propsTable, setPropsTable] = useState(props.tableList);
  const [currentTable, setCurrentTable] = useState("");
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>('');
  const [statusBar, setStatusBar] = useState(0);
  const value = props.value;
  let unselectedPara = {};
  let selectedPara = "";

  const onChange = () =>{

  }
  const changeTable = (e, option) =>{
    let param = option.text;
    setSelectedKey(param as string);
    setCurrentTable(param);
    setSelectTable([]);
    setUnselectTable([]);
    // let data = propsTable[param];
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
    // console.log(unselectedPara);
    const index = data.findIndex((element)=>element.name===unselectedPara);
    let indexData:Object = data[index];
    if (index > -1) {
      data.splice(index, 1);
    }
    setUnselectTable(data);
    info.push(indexData);
    info = info.filter(a=>a!==undefined&&a.name!==""&&a.name!==undefined&&a.name!==null);
    setSelectTable(info);
    unselectedPara = "";
    document.querySelector('#items').value = "";
  }

  const singleRtoL = () =>{
    let data = [...selectTable], info = [...unselectTable];
    const index = data.findIndex((element)=>element.name===selectedPara);
    let indexData:Object = data[index];
    if (index > -1) {
      data.splice(index, 1);
    }
    // data.pop(selectedPara);
    setSelectTable(data);
    info.push(indexData);
    info = info.filter(a=>a!==undefined&&a.name!==""&&a.name!==undefined&&a.name!==null);
    setUnselectTable(info);
    selectedPara="";
    document.querySelector('#ritems').value = "";
  };



  const importData = async() =>{
    if(selectTable.length > 0){
    let request = {};
    selectTable.map((a, index)=>{
      if(a){
        request[a.idx] = [
          a.name,
          a.key
        ]
      }
    });
    //   let conn ={
    //     "table":  currentTable,
    //     "columns": selectTable
    // }
    let response = DBService.queryFileSelectionInfo({"Headers": request, 'status': 'success'});
    subscribeToChannel();
    // if(response.data.status=="success"){
    response.then(async(success)=>{
      props.actions.ProgressAction.isLoadBar({message: false});
      let data = success.data;
      if(data.status==="success"){
        let queryKey = data.result.key_name;
        let client = await Services.getDataQueryKey(queryKey);
        console.log(client);
        if(client){
          if(client.length>0){
              // if(client){
                props.actions.importfileAction.fieldSelectionUpdate({message: client});
                props.actions.importfileAction.isOpenImportfile({message:false});
              // }
          }
        }
        // client.then((res)=>{

        // }).then((reject)=>{
        //   ErrorMessage.ErrorMessage(reject);
        // })
      }else{
        props.actions.importfileAction.isOpenImportfile({message:false});
        ErrorMessage.ErrorMessage(data);
      }
    }).then(error=>{
      console.error(error);
    })
    }
  // }
  }


  useEffect(()=>{
    props.actions.ProgressAction.updatePercentageMessage({message: statusBar});
    if(statusBar==0||statusBar==100){
      props.actions.ProgressAction.isLoadBar({message: false});
      props.actions.ProgressAction.updatePercentageMessage({message: 0});
    }
  }, [statusBar]);

  const subscribeToChannel = async()=>{
    // alert("inside subscrbe")
    // alert("inside subscrbe")
    props.actions.ProgressAction.isLoadBar({message: true});
    console.log('subscribing to channel user input!')
    await subscriber.on("message", (channel,message) => {
      setStatusBar(parseInt(message));
   if(message==100||message=='100'){
      setStatusBar(0);
     unSubscribeChannel('progress');
   }
   //  return message;
    })

   }

  return (
<>
      <Stack horizontal className={`flex-container br-1 p-1 mb-2`}>
        <Stack className={`w-100`}>
        <Stack horizontal tokens={stackTokens} className={`mb-1`}>
          <Stack tokens={stackTokens} className={`w-33 text-center`}>
            <Label for="item">{`Available Fields`}</Label>
            <select id ="items" className={`m-auto`} size={6} style={style}
              value={value}
              onChange={unselected}
            >
              {unselectTable.map((list, index) => (
                <option key={index} value={list.name}>
                  {list.name}
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
                <option key={index} value={list.name}>
                  {list.name}
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

              </Stack>
              <Stack tokens={stackTokens} className={`offset1`}>
                  <DefaultButton
                      text="Import"
                      className={`bg-green`}
                      allowDisabledFocus
                      // disabled={disabled}
                      // checked={checked}
                      onClick={()=>importData()}
                  />
              </Stack>
              <Stack tokens={stackTokens} className={`offset1`}>
                  <DefaultButton
                      text="Cancel"
                      className={`text-block`}
                      // onClick={hideModal}
                      // onClick={setShowList(!showList)}
                      onClick={()=>{props.actions.importfileAction.isOpenFieldSelection({message: false});props.actions.importfileAction.isOpenImportfile({message:false})}}
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
      ProgressAction: bindActionCreators(ProgressAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FieldSelection);
