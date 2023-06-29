import React, { useState, useEffect } from 'react'
import {
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  IComboBoxStyles,
  Stack,
  IStackTokens,
  IStackStyles,
  IStackProps,
  Label
} from '@fluentui/react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import BottomSection from '../../Compontent/BottomSection';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { DetailsListComp } from "../Compontent/DetailsListComp";
import { ChoiceGroups } from "../Compontent/ChoiceGroups";
import { TextField } from '@fluentui/react/lib/TextField';
import * as importfileAction from "../../../../store/Worksheet/FileImport/actions";
import * as DBService from './../../../../services/ImportFileService';
import * as Services from './../../../../services/RedisServices';
import * as ErrorMessage from './../../Compontent/ErrorCompontent';
import * as ConstFunc from "../../../Constant/ConstantFunction";
import { createSubscribeChannel, subscriber, unSubscribeChannel } from './../../../Constant/ConstantFunction';
import * as ProgressAction from "../../../../store/Channel/Progress/actions";
const fs = require('fs');

// components/Constant/ConstantFunction
const optionsForCustomRender: IComboBoxOption[] = [
  { key: 'header1', text: 'Theme fonts' },
  { key: 'divider', text: '-' },
  { key: 'header2', text: 'Other options' },
];

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


const onRenderOption = (item: IComboBoxOption) => {
  return <span>{item.text}</span>;
};

const basicStyles: Partial<IComboBoxStyles> = { root: { width: 200, marginBottom: 20 } };

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 75 } },
};

const colProps300 = {
  tokens: { childrenGap: 10 },
  styles: { root: { width: 450 } }
}

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

export const ImportText = (props) => {
  const [recentQueryList, setRecentQueryList] = useState([]);
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>('');
  const [selectedDelimitKey, setSelectedDelimitKey] = React.useState<string | undefined>('');
  const [formatSchema, setFormatSchema] = React.useState<string | undefined>('');
  let startRange = {row_start_range: 1, col_start_range: 1};
  const endRange = {endRow: props.importText.row_range, endCol: props.importText.col_range}
  const [propsImportData, setPropsImportData] = useState({ ...startRange, ...props.importText})
  const [statusBar, setStatusBar] = useState(0);
  const changeTable = (e, option) => {
    // let param = e.target.value;
    // setFormatSchema(param);
    if(ConstFunc.checkNotNull(option)){
      let data = option.text;
      setSelectedKey(data as string);
      // setCurrentTable(data);
      if(fs.existsSync(data)){
        data = fs.readFileSync(data, 'utf8');
        data = JSON.parse(data);
        setPropsImportData(data);
      }else{
        ConstFunc.removeFormatQuery(data);
        data = [...constructObj(ConstFunc.getFormatSchemaQuery())];
        setRecentQueryList(data);
        setSelectedKey("");
        alert("File is't exist");
      }
    }
  }


  const importData = async() =>{
    let request = {...propsImportData};
    Object.keys(request).map(a=>{
      if(a){
        let data = a.toLowerCase();
        if(data === 'fixed_column'){
          request[a] = (request[a])? request[a]: false;
        }else if(data === 'model'){
          request[a] = (request[a])? request[a]: '-';
        }else if(data === 'delimiter'){
          request[a] = (request[a])? request[a]: 0;
        }else{
          request[a] = (request[a])? request[a]: '';
        }
      }
    })
    let response = DBService.queryImportTextInfo({"result": request,"status": "success"});
    subscribeToChannel();
    response.then(async(success)=>{
      let data = success.data;
      props.actions.ProgressAction.isLoadBar({message: false});
      if(data.status==="success"){
        let queryKey = data.result.key_name;
        let res = await Services.getDataQueryKey(queryKey);
        if(res){
          if(res.length>0){
            props.actions.importfileAction.importTextUpdate({message: res});
            props.actions.importfileAction.isOpenImportfile({ message: false });
            props.actions.importfileAction.isOpenImportText({ message: false });
          }
        }


          // await Services.getDataQueryKey(queryKey).then((res)=>{

          // }).then((reject)=>{
          //   props.actions.importfileAction.isOpenImportfile({ message: false });
          //   ErrorMessage.ErrorMessage(reject);
          // })
        // let client = Services.getDataQueryKey(queryKey);
        // client.then((res)=>{
        //   console.log(res);
        //   // props.actions.importDBAction.updateDataSheet({message: res});
        //   // props.actions.importDBAction.isOpenImportTable({message:false});
        // }).then((reject)=>{
        //   ErrorMessage.ErrorMessage(reject);
        // })
      }else{
        props.actions.importfileAction.isOpenImportfile({ message: false });
        ErrorMessage.ErrorMessage(data);
      }
    }).then(error=>{
      props.actions.importfileAction.isOpenImportfile({ message: false });
      console.error(error);
    })

  };

  const selectRadio = async(e, option) =>{
    console.log(option.key);
    let info = propsImportData;
    info = {...info};
    info.delimiter = option.key;
    if(option.key==0){
      info.Fixed_column = true
    }else{
      info.Fixed_column = false
    }
    setPropsImportData(info);
  };

  const onchangeRowRange = (e) =>{
    // console.log(e.target.value, e.target.querySelector('name'));
    // let name = e.target.querySelector('name');    
    if(endRange.endRow > e.target.value && e.target.value > 0){
      let info = propsImportData;
    info = {...info};
      info['row_range'] = parseInt(e.target.value);
      setPropsImportData(info);
    }
    // info['row_range'] = e.target.value;
    
  }

  const onchangeColRange = (e) =>{
    // console.log(e.target.value, e.target.querySelector('name'));
    // let name = e.target.querySelector('name');
    
    if(endRange.endCol > e.target.value && e.target.value > 0){
      let info = propsImportData;
      info = {...info};
      info['col_range'] = parseInt(e.target.value);
      setPropsImportData(info);
    }
    // info['col_range'] = e.target.value;
    
  }

  const onchangeModel = (e) =>{
    // console.log(e.target.value, e.target.querySelector('name'));
    // let name = e.target.querySelector('name');
    let info = propsImportData;
    info = {...info};
    info['model'] = e.target.value;
    setPropsImportData(info);
  }

  const onchangeData = (e) =>{
    // console.log(e.target.value, e.target.querySelector('name'));
    // let name = e.target.querySelector('name');
    let info = propsImportData;
    info = {...info};
    info['Data'] = e.target.value;
    setPropsImportData(info);
  }

  const saveFile = async() =>{
    let storeData = JSON.stringify(propsImportData);
    await ConstFunc.saveFormatSchema(storeData, __dirname, undefined).then((res)=>{
      let data = recentQueryList;
      data.push({ key: ConstFunc.savePath, text: ConstFunc.savePath});
      setRecentQueryList(data);
    });
  }

  const removeFormat = () =>{
    if(selectedKey){
      let data = selectedKey;
      ConstFunc.removeFormatQuery(data);
        data = [...constructObj(ConstFunc.getFormatSchemaQuery())];
        setRecentQueryList(data);
        setSelectedKey("");
        alert("Successfully Removed");
    }
  }

  useEffect(() => {
    let obj = props.importText;
    obj = { ...startRange, ...props.importText};
    obj.model = (obj.model)? obj.model: '';
   setPropsImportData(obj);
   let recentQry = ConstFunc.getFormatSchemaQuery();
    let data = [...constructObj(recentQry)];
    setRecentQueryList(data);
  },[])

  useEffect(()=>{
    props.actions.ProgressAction.updatePercentageMessage({message: statusBar});
    if(statusBar==0||statusBar==100){
      props.actions.ProgressAction.isLoadBar({message: false});
      props.actions.ProgressAction.updatePercentageMessage({message: 0});
    }
  }, [statusBar]);

  const subscribeToChannel = async()=>{
    // alert("inside subscrbe")
    props.actions.ProgressAction.isLoadBar({message: true});
    console.log('subscribing to channel user input!')
    await subscriber.on("message", (channel,message) => {
      // console.log(message);
      setStatusBar(parseInt(message));
   if(message==100||message=='100'){
      setStatusBar(0);
     unSubscribeChannel('progress');
   }
   //  return message;
    })

   }

   const onchangeStartCol = (e) =>{    
    if(endRange.endCol > e.target.value && e.target.value > 0){
      let info = propsImportData;
      info = {...info};
      info['col_start_range'] = parseInt(e.target.value);
      setPropsImportData(info);
    }
    // info['startCol'] = e.target.value; 
   }

   const onchangeStartRow = (e) =>{    
    if(endRange.endRow > e.target.value && e.target.value > 0){
      let info = propsImportData;
      info = {...info};
      info['row_start_range'] = parseInt(e.target.value);
      setPropsImportData(info);
    }
   }

   const getHtmlContent = (param) =>{
    // (propsImportData.Data)? propsImportData.Data: ''
    if(Array.isArray(propsImportData.Data)){
      let str = propsImportData.Data.join('\n');
      console.log(str)
      return str.toString();
    }else{
      return (propsImportData.Data)? propsImportData.Data: '';
    }
   }

   const changeDelimit  = (e, option) => {
    // let param = e.target.value;
    // setFormatSchema(param);
    console.log("<<<<<<<<<<<>>>>>>>>>>>>")
    console.log("<<<<<<<<<<<>>>>>>>>>>>>")
    console.log("<<<<<<<<<<<>>>>>>>>>>>>")
    console.log(e.target.value, option)
    if(ConstFunc.checkNotNull(option)){
      let data = option.text;
      setSelectedDelimitKey(data as string);
    }else{
      setSelectedDelimitKey(e.target.value as string);
    }
  }

  return (
    <>
      <Stack horizontal className={`flex-container br-1 p-0_5 mb-1`}>

        {/* <Stack horizontal tokens={stackTokens} className={`br-1`}>

          </Stack> */}
          <Stack className={`mb-1 br-1 w-100 p-0_5`}>
            <Stack horizontal tokens={stackTokens}>
                <ComboBox
                  // defaultSelectedKey={currentTable}
                  value={""}
                  label="Format Schema"
                  allowFreeform
                  autoComplete="on"
                  options={recentQueryList}
                  selectedKey={selectedKey}
                  onRenderOption={onRenderOption}
                  styles={basicStyles}
                  onChange={changeTable}
                  className={`w-100 mb-0`}
                />
                <Stack {...columnProps} className={`offset1 mt-1`}>
                  <DefaultButton
                    text="Add"
                    className={`text-block`}
                    onClick={()=>saveFile()}
                    // onClick={()=>props.actions.importfileAction.isOpenSpreadsheet({message: false})}
                    allowDisabledFocus
                  />
                </Stack>
                <Stack {...columnProps} className={`offset1 mt-1`}>
                  <DefaultButton
                    text="Remove"
                    className={`text-block`}
                    onClick={()=>removeFormat()}
                    allowDisabledFocus
                  />
                </Stack>
            </Stack>
          </Stack>
          <Stack className={`mb-1 br-1 w-100 p-0_5`}>

          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                <Stack horizontal tokens={stackTokens}>
                  <ChoiceGroups itemList={
                    [
                      { key: 0, text: 'Fixed Columns' },
                      { key: 1, text: 'White Spaced' },
                      { key: 2, text: 'Tab delimited' },
                      { key: 3, text: 'Delimited' }
                    ]
                  } defaultValue={propsImportData.delimiter} value={propsImportData.delimiter} _onChange={(e, option)=>selectRadio(e, option)}/>
                </Stack>
                <Stack horizontal tokens={stackTokens}>
                  <Stack {...columnProps}>
                    {/* <select>
                      <option value=",">,</option>
                    </select> */}
                    <ComboBox
                  // defaultSelectedKey={currentTable}
                  value={selectedDelimitKey}
                  label=""
                  allowFreeform
                  autoComplete="on"
                  options={[
                    {key: ',', text: ','}
                  ]}
                  selectedKey={selectedDelimitKey}
                  onRenderOption={onRenderOption}
                  styles={basicStyles}
                  onChange={changeDelimit}
                  className={`w-100 mb-0`}
                />
                  </Stack>
                </Stack>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg6">
                <Label>Portion to read</Label>
                <Stack horizontal tokens={stackTokens}>
                  <Stack {...columnProps} className={`mt-1`}>
                    <Label>Rows</Label>
                  </Stack>
                  <Stack {...colProps300} className={`offset1 mt-1`}>
                      <TextField type={'number'} onChange={(e)=>onchangeStartRow(e)} min={1}  value={propsImportData.row_start_range} label="" />
                  </Stack>
                  <Stack {...columnProps} className={`offset1 mt-1`}>
                    <Label>To</Label>
                  </Stack>
                  <Stack {...colProps300} className={`offset1 mt-1`}>
                      <TextField type={'number'} name={'row_range'} min={1} onChange={(e)=>onchangeRowRange(e)} value={propsImportData.row_range} label="" />
                  </Stack>
                </Stack>
                <Stack horizontal tokens={stackTokens}>
                  <Stack {...columnProps} className={`mt-1`}>
                    <Label>Columns</Label>
                  </Stack>
                  <Stack {...colProps300} className={`offset1 mt-1`}>
                      <TextField  type={'number'} onChange={(e)=>onchangeStartCol(e)} min={1}  value={propsImportData.col_start_range} label="" />
                  </Stack>
                  <Stack {...columnProps} className={`offset1 mt-1`}>
                    <Label>To</Label>
                  </Stack>
                  <Stack {...colProps300} className={`offset1 mt-1`}>
                      <TextField type={'number'} name={'col_range'} min={1} onChange={(e)=>onchangeColRange(e)} value={propsImportData.col_range} label="" />
                  </Stack>
                </Stack>
              </div>
            </div>
          </div>
          </Stack>

          <Stack className={`mb-1 br-1 w-100 p-0_5`}>
            <TextField onChange={(e)=>onchangeModel(e)} name={'model'} value={propsImportData.model} disabled={(propsImportData.Fixed_column)? false: true} label="Model" multiline rows={1} />
          </Stack>

          <Stack className={`mb-0 br-1 w-100 p-0_5`}>
            <pre className={'preCls'} onChange={(e)=>onchangeData(e)} name={'Data'} dangerouslySetInnerHTML={{ __html:getHtmlContent(propsImportData.Data)}} label="File Contents" multiline rows={4}></pre>
          </Stack>

      </Stack>
      <Stack className={``}>
        <Label style={{ fontWeight: 300 }}>
          All sheets will be imported, Overwrite at Row 1 Column 1
        </Label>
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
                onClick={() => { props.actions.importfileAction.isOpenImportfile({message: false});props.actions.importfileAction.isOpenImportText({ message: false })}}
                // onClick={setShowList(!showList)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ImportText)
