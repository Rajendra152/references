import React, { useEffect, useState } from 'react'
import {
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  IComboBoxStyles,
  Stack,
  IStackTokens,
  IStackStyles,
  Label
} from '@fluentui/react';
import {
  getTheme
} from 'office-ui-fabric-react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import BottomSection from './../../Compontent/BottomSection';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { DetailsListComp } from "./../Compontent/DetailsListComp";
import { ChoiceGroups } from "./../Compontent/ChoiceGroups";
import { TextField } from '@fluentui/react/lib/TextField';
import * as importfileAction from "../../../../store/Worksheet/FileImport/actions";
import * as ProgressAction from "../../../../store/Channel/Progress/actions";
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from '@fluentui/react/lib/DetailsList';
import * as DBService from './../../../../services/ImportFileService';
import * as Services from './../../../../services/RedisServices';
import * as ErrorMessage from './../../Compontent/ErrorCompontent';
import { createSubscribeChannel, subscriber, unSubscribeChannel } from './../../../Constant/ConstantFunction';


const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 75 } },
};

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

export const ImportSpreadsheet = (props) => {
  const [propsWorksheet, setPropsWorksheet] = useState([]);
  const [statusBar, setStatusBar] = useState(0);
  const [disableInp, setDisableInp] = useState(true);
  // const [worksheetList, setWorksheetList] = useState([])
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState({
    col_range: '',
    idx: '',
    key: '',
    max_cell: "",
    min_cell: "",
    name: "",
    row_range: '',
    value: '',
  });
  const [results, setResults] = useState([]);

  const loadData = ()=>{
    let listinfo = [];
    if(props.worksheet){
      let keys = Object.keys(props.worksheet);
      keys.map((a, index)=>{
        let data = props.worksheet[a];
        data.idx = index;
        data.value = index;
        data.key = index;
        listinfo.push(data);
      });
      setPropsWorksheet(listinfo);
    }

  }
  useEffect(() => {
    loadData();
  },[])


  const selectSheet = (param, index) =>{

    let selectedRowArr = [...selectedRow];
    let update = false;
    if(selectedRow.length > 0){
      let filterInfo = selectedRow.findIndex(a=>a===index);
      if(filterInfo !== -1){
        selectedRowArr.splice(filterInfo, 1);
        setSelectedRow(selectedRowArr);
      }else{
        update = true;
      }
    }else{
      update = true;
    }
    if(update){
      selectedRowArr.push(index);
      setSelectedRow(selectedRowArr);
      setSelectedSheet(param);
    }
    console.log(selectedRow);
  }

  const selectRadio = (e, option) =>{
    let value = option.key;
    if(value==='all'){
      setDisableInp(true);
      let info = propsWorksheet.filter(a=>a.idx==selectedSheet.idx);
      info = info[0];
      info = {...info};
      setSelectedSheet(info);
    }else{
      setDisableInp(false);
    }
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

  const importData = async () =>{
    let request = {};
    if(selectedRow.length==1||selectedRow.length > 1){
    if(selectedRow.length > 1){
      for (let i = 0; i < selectedRow.length; i++) {
        const element = selectedRow[i];
        request[element] = propsWorksheet[element];
      }
    }else{
      request = {[selectedRow[0]]: selectedSheet};
    }

    //Changing max and min cell values to uppercase
    Object.keys(request).forEach((key) => {
      request[key] && request[key].min_cell ? request[key].min_cell = request[key].min_cell.toUpperCase() : '';
      request[key] && request[key].max_cell ? request[key].max_cell = request[key].max_cell.toUpperCase() : '';
    })

    let response = DBService.querySpreadSheetInfo({"sheet_data": request});
    subscribeToChannel();
    response.then(async(success)=>{
      let data = success.data;
      props.actions.ProgressAction.isLoadBar({message: false});
      if(data.status==="success"){
        let queryKey = data.result.key_name;
        // props.actions.importfileAction.spreadsheetUpdate({message: myData});
        // // props.actions.importfileAction.isOpenSpreadsheet({message: false})
        // props.actions.importfileAction.isOpenImportfile({ message: false });
        await Services.getDataQueryKey(queryKey).then((res)=>{
          props.actions.importfileAction.spreadsheetUpdate({message: res});
          // props.actions.importfileAction.isOpenSpreadsheet({message: false})
          props.actions.importfileAction.isOpenImportfile({ message: false });
        }).then((reject)=>{
          ErrorMessage.ErrorMessage(reject);
        })
      }else{
        ErrorMessage.ErrorMessage(data);
      }
    }).then(error=>{
      console.error(error);
    });
  }else{
    let data =  {
      error: "Please select the sheetname",
      type: 'info'
    }
    ErrorMessage.ErrorMessage(data);
    // alert("Please select the sheetname")
  }
  };

  const minCell = (e)=>{
    console.log(e.target.value);
    let info = selectedSheet;
    info = {...info};
    info.min_cell = e.target.value;
    setSelectedSheet(info);
  }

  const maxCell = (e)=>{
    console.log(e.target.value);
    let info = selectedSheet;
    info = {...info};
    info.max_cell = e.target.value;
    setSelectedSheet(info);
  }

  return (
    <>
      <Stack horizontal className={`flex-container br-1 p-1 mb-1 pt-0`}>
        <Label>Portion to Read</Label>
        <Stack className={`w-100`}>
          <Stack horizontal tokens={stackTokens} className={`mb-1`}>
            <Stack className={`w-75 table-h`}>
                <table className={`table br-0`}>
                    <tbody>
                    {propsWorksheet.map(function (item, i) {
                      return (
                      <React.Fragment>
                        <tr className={selectedRow.includes(i) ? "tableSelected" : "" } onClick={()=>selectSheet(item, item.idx)} key={iconButtonStyles}>
                          <td>{item.name}</td>
                        </tr>
                      </React.Fragment>
                      )
                    })
                    }
                    </tbody>
                </table>
            </Stack>
          </Stack>
          <Stack horizontal tokens={stackTokens} className={`mb-1`}>
            <ChoiceGroups itemList={
              [
                { key: 'all', text: 'Entire Range' },
                { key: 'cell', text: 'Cells' }
              ]
            } defaultValue={`all`} _onChange={(e, option)=>selectRadio(e, option)}/>
          </Stack>
          <Stack horizontal tokens={stackTokens}>
          <Stack {...columnProps}>
              <TextField onChange={(e)=>minCell(e)} disabled={disableInp} value={selectedSheet.min_cell} placeholder="Ex: A1" />
            </Stack>
            <Stack {...columnProps}>
              <TextField onChange={(e)=>maxCell(e)} disabled={disableInp} value={selectedSheet.max_cell} placeholder="Ex: AK1490" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack className={``}>
        <Label style={{fontWeight:300}}>
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
                onClick={()=>{
                  props.actions.importfileAction.isOpenSpreadsheet({message: false})
                  props.actions.importfileAction.isOpenImportfile({ message: false });
                }}
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
const theme = getTheme();
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

export default connect(mapStateToProps, mapDispatchToProps)(ImportSpreadsheet)
