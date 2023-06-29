import React, { useEffect, useState } from "react";
import { Dropdown, IDropdown, ResponsiveMode } from '@fluentui/react/lib/Dropdown';
import * as DataFormat from "./DataFormat";
import { connect } from 'react-redux';
import { Label } from '@fluentui/react/lib/Label';
import { Checkbox } from '@fluentui/react';
import { bindActionCreators } from 'redux';
import * as componentInstance from '../../../../store/Worksheet/SpreadSheet/actions';
import { isBuffer } from "util";


const { ipcRenderer } = require('electron');

export let dataSelectInfoStepWise = [];

const dropdownStyles = { dropdown: { width: 100 } };

function DataSelectionStepWise(props) {
  const [step, setStep] = useState(props.select.value);//Mean
  const [currentTitle, setCurrentTitle] = useState("")
  const [tableList, setTableList] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [labelDataSelection, setlabelDataSelection] = useState("Data selection")
  const dropdownRef = React.createRef<IDropdown>();
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
  const [isChecked, setIsChecked] = useState(false);
  const [sheetData,setNewSheetData] = useState([]);
  const [actualSheetData,setActualSheetData] = useState([]);
  const [sheetStatusData,setsheetStatusData ] = useState([]);
  const [selectedGroupData,setSelectedGroupData] = useState([]);

  useEffect(() => {
    console.log(props.dataSelectionColumnData);
    if(props.dataSelectionColumnData.length){
      let getFilterDataSelectionColumnStatus = props.dataSelectionColumnData.filter(element => element.title.startsWith("Status"))
      console.log(getFilterDataSelectionColumnStatus)
      if(getFilterDataSelectionColumnStatus.length){
      //Get Data related to selected status column from worksheet Data
      let getSheetStatusData = props.content.openWorkSheetData[getFilterDataSelectionColumnStatus[0].idx]
      //add index, as existing wizards use index
      console.log(getSheetStatusData);
      getSheetStatusData.map((e,key)=>{
        if(e !==undefined){
        e.id = key+1;
      }
      });
      setsheetStatusData(getSheetStatusData);
      }
    }
    if(props.dataSelectList.value == "LogRankIndexed" || props.dataSelectList.value == "GehanBreslowIndexed"){
      let getFilterDataSelectionColumn = props.dataSelectionColumnData.filter(element => element.title.startsWith("Group"))
      console.log(getFilterDataSelectionColumn);
      //Get Data related to selected Group column from worksheet Data
      let sheetarray=[];
      let enableGroupData =[];
      let actualData = [];
      console.log(props.content.openWorkSheetData);
      let getSheetData = props.content.openWorkSheetData[getFilterDataSelectionColumn[0].idx]
      console.log(getFilterDataSelectionColumn[0].idx)
      console.log(getSheetData);
      getSheetData && getSheetData.map((e,key)=>{
       // if(!enableGroupData.includes(e.value) ){
          let obj={key:'',text:''};
          obj.key = key
          obj.text = e.value
          console.log(e);
          if(!enableGroupData.includes(e.value) ){
            actualData.push(obj);
            enableGroupData.push(e.value);
          }
          sheetarray.push(obj);
          e.id = key+1;
      //  }
      });
      setActualSheetData(actualData);
      setSelectedGroupData(enableGroupData);
      setNewSheetData(sheetarray);
    }else if(props.content.testOptions === 'Proportional Hazards' || props.content.testOptions === 'Stratified Model'){
      let storeCovariate = [];
      props.dataSelectionColumnData.map((element)=>{
        if(element.title.startsWith("Covariate") && element.value !=''){
          storeCovariate.push(element.value)
        }
      })
      let filteredCovariate = props.content.sheetData.filter(eachSheet => storeCovariate.includes(eachSheet.text))
      setActualSheetData(filteredCovariate);
    }else{
      setActualSheetData(props.content.sheetData);
    }
    selectedPair();
    //columnName();
  }, []);

  const selectedPair = () => {
    
    if (DataFormat[step] !== undefined) {
      let table = DataFormat[step];
      table = JSON.parse(JSON.stringify(table));
      setTableList(table);
      let initialTitle = "Data for " + table[0].title;
      setlabelDataSelection(initialTitle);
      setCurrentTitle(table[0].title);
    }
  }
  //  const columnName=()=> {
  //     var colNames = [];
  //     var sheet =  props.spreadsheet.getActiveSheet();
  //     var rangeIdx = getIndexesFromAddress(sheet.selectedRange);
  //     for (var cIdx = rangeIdx[1]; cIdx <= rangeIdx[3]; cIdx++) {
  //       var colName = getColumnHeaderText(cIdx + 1);
  //       colNames.push(colName);
  //     }
  //     console.log(colNames);
  //   }
  function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
    setIsChecked(isChecked);
    if(props.dataSelectList.value == "LogRankIndexed" || props.dataSelectList.value == "GehanBreslowIndexed"){
      frameDataStatusWizard('',true,'fromIndexed')
    }
  }
  const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setSelectedItem(item);
    console.log(item);
    let tableInfo = tableList.filter(a => a.title == currentTitle);
    let titleList = [...tableList];
    if (tableInfo.length > 0) {
      tableInfo = tableInfo[0];
      if (tableInfo.value) {
        tableInfo.value = item.text;
        tableInfo.idx = item.key;
        let indexVal = tableList.findIndex((element) => element.title === tableInfo.title);
        if (indexVal !== -1) {
          let index = indexVal;
          index = index + 1;
          if (tableList.length >= index) {
            let next = tableList[index];
            if (next !== undefined) {
              tableInfo.active = false;
              titleList.splice(indexVal, 1, tableInfo);
              next.active = true;
              titleList.splice(index, 1, next);
              setCurrentTitle(next.title);
              let label = "Data for " + next.title;
              setlabelDataSelection(label);
              console.log([...titleList])
              console.log(next.title)
              setTableList([...titleList]);
        props.actions.dataSelectionObject.exportDataSelectionStepWiseDataTable({
          message:[...titleList],
        });
            }
          }
        }
      } else {
        tableInfo.idx = item.key;
        tableInfo.value = item.text;
        let indexVal = tableList.findIndex((element) => element.title === tableInfo.title);
        if (indexVal !== -1) {
          let list = DataFormat.findTarget(titleList, tableInfo, step);
          if (list) {
            if (list.length > 0) {
              tableInfo.active = false;
              titleList.splice(indexVal, 1, tableInfo);
              let currTable = list.filter(a => a.active === true);
              setCurrentTitle(currTable[0].title);
              let label = "Data for " + currTable[0].title;
              setlabelDataSelection(label);
              titleList = list;
            }
          }
        }
        props.actions.dataSelectionObject.exportDataSelectionStepWiseDataTable({
          message: titleList,
        });
        setTableList(titleList);
        dataSelectInfoStepWise = titleList;
      }
      if(props.dataSelectList.value == "LogRankIndexed" || props.dataSelectList.value == "GehanBreslowIndexed"){
        frameDataStatusWizard(titleList,isChecked,'fromIndexed')
      }else if(props.content.testOptions === 'Proportional Hazards' || props.content.testOptions === 'Stratified Model'){
        frameDataStatusWizard(titleList,isChecked,'fromCovariant')
      }
      
    }
  };

  const frameDataStatusWizard=(titleList='',getStatus,getFlowType)=>{
    let dataTosend ={data:[],isSelected:getStatus,selectedGroup:[],covariantGroup:[],navigationFlow:getFlowType}
    if(getFlowType === 'fromIndexed'){
      if(getStatus){
        sheetStatusData.sort((a, b) => a.value - b.value);
        let result = getUniqueData(sheetStatusData);
        dataTosend.data = result;
        dataTosend.selectedGroup = selectedGroupData
      }else{
        let storeIndex=[];
        titleList && titleList.map((eachList)=>{
          if(eachList.value){
            dataTosend.selectedGroup.push(eachList.value);
            sheetData && sheetData.map((x)=>{
             if(x.text === eachList.value){
              storeIndex.push(x.key);
             }
            })
          }
        })
      const mappingStatusData = storeIndex.map((eachIndex)=>{
          return sheetStatusData[eachIndex];
        })
        mappingStatusData.sort((a, b) => a.value - b.value);
        let result = getUniqueData(mappingStatusData);
        dataTosend.data = result;
      }
    }else if(getFlowType === 'fromCovariant'){
      console.log('titleList fromCovariant',titleList);
      titleList && titleList.map((eachList)=>{
        if(eachList.value){
          dataTosend.covariantGroup.push(eachList.value);
        }
      })
      sheetStatusData.sort((a, b) => a.value - b.value);
      let result = getUniqueData(sheetStatusData);
      dataTosend.data = result
    }
    props.actions.dataSelectionObject.exportDataSelectionStepWiseData({
      message: dataTosend,
    });
  }
  const getUniqueData=(getData)=>{
    let result = getData.reduce((unique, o) => {
      if(!unique.some(obj => obj.value === o.value)) {
        unique.push(o);
      }
      return unique;
  },[]);
  return result
  }
  const selectRow = (param) => {
    console.log(param);
    console.log(param.value);
    let label = "Data for " + param.title;
    setlabelDataSelection(label);
    let tablelist = [...tableList];
    tablelist = tablelist.map(a => { if (a.active == true) { a.active = false } return a });
    param.active = true;
    let indexVal = tableList.findIndex((element) => element.title === param.title);
    if (indexVal !== -1) {
      tablelist.splice(indexVal, 1, param);
      setCurrentTitle(param.title);
      console.log("here");
      setSelectedItem(param)
      setTableList(tablelist);
      dataSelectInfoStepWise = tableList;
    }
  }
   return (
    <div>
      <Dropdown
        componentRef={dropdownRef}
        placeholder="Select Column"
        onChange={onChange}
        selectedKey={selectedItem ? selectedItem.key : undefined}
        label={labelDataSelection}
        options={actualSheetData}
        styles={dropdownStyles}
        disabled={isChecked}
        responsiveMode = {ResponsiveMode.large}
      />
      <br></br>
      <Label>Selected columns</Label>
      <div className="graphWizardLeftCard">
        <table className={`table cur-pointer`}>
          <tbody>
            {
              tableList.map(item => <>
                <tr onClick={() => selectRow(item)} className={(item.active === true) ? "active" : ""}>
                  <td>{item.title}</td>
                  <td>{item.value}</td>
                </tr>
              </>)
            }
          </tbody>
        </table>
      </div>
      {props.content.testOptions === "LogRank" || props.content.testOptions === "Gehan-Breslow" ?
    <div style={{marginTop:"10px"}}>
     <Checkbox label="Select all groups" onChange={_onChange} /></div>: null
 }
    </div>
  )
}
function mapStateToProps(state) {
  console.log(state)
  return {
    referenceObjectState: state.instanceReducer.instance,
    dataSelectionColumnData: state.instanceReducer.dataSelectionColumns
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
    dataSelectionObject: bindActionCreators(componentInstance, dispatch),
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(DataSelectionStepWise);