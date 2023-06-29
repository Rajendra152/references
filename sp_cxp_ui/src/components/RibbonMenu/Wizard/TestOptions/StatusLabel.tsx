
import React, { useEffect, useState } from "react";
import { Dropdown, IDropdown } from '@fluentui/react/lib/Dropdown';
import * as DataFormat from "./DataFormat";
import { connect } from 'react-redux';
import { DefaultButton} from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import {getSpreadsheetColumn} from '../../../../utils/spreadsheet/spreadsheetUtility';
import { constants } from "zlib";
const { ipcRenderer } = require('electron');
import { bindActionCreators } from 'redux';
import * as componentInstance from '../../../../store/Worksheet/SpreadSheet/actions';

export let statusSelectInfo = [{status_label:[],event_label:[],censor_label:[],groups:[],selectallGroups:false,covariates:[],fromIndex:false,navigationFlowType:''}];


const dropdownStyles = { dropdown: { width: 100 } };

 function StatusLabel(props) {
  const [statusLabels, setStatusLabels] = useState([]);
  const [eventLabels, setEventLabels] = useState([]);
  const [censorLabels, setCensorLabels] = useState([]);
  const [selectedRowValue, setSelectedRowValue] = useState();
  const [statusLabelActive, setStatusLabelActive] = useState(false);
  const [eventLabelActive, setEventLabelsActive] = useState(false);
  const [censorLabelsActive, setCensorLabelsActive] = useState(false);
  const dropdownRef = React.createRef<IDropdown>();


  useEffect(async () => {
    if(props.dataSelectionStepWise && props.dataSelectionStepWise.navigationFlow === 'fromIndexed'){
      setStatusLabels(props.dataSelectionStepWise.data);
      statusSelectInfo[0].status_label = props.dataSelectionStepWise.data;
      statusSelectInfo[0].selectallGroups = props.dataSelectionStepWise.isSelected
      statusSelectInfo[0].groups = props.dataSelectionStepWise.selectedGroup
      statusSelectInfo[0].navigationFlowType = props.dataSelectionStepWise.navigationFlow
    }else if(props.dataSelectionStepWise && props.dataSelectionStepWise.navigationFlow === 'fromCovariant'){
      setStatusLabels(props.dataSelectionStepWise.data);
      statusSelectInfo[0].status_label = props.dataSelectionStepWise.data;
      statusSelectInfo[0].covariates = props.dataSelectionStepWise.covariantGroup
      statusSelectInfo[0].navigationFlowType = props.dataSelectionStepWise.navigationFlow
    }
    else{
     let getFilterDataSelectionColumn = props.dataSelectionColumnData.filter(element => element.title.startsWith("Status"))
     let workSheetData = [];
     //loop over selected data selection items and get respective column data from sheet
     getFilterDataSelectionColumn.map((eachSelection)=>{
       console.log('eachSelection',eachSelection);
       console.log('props.content.openWorkSheetData',props.content.openWorkSheetData);
      let getSheetColumnData = props.content.openWorkSheetData[eachSelection.idx];
      console.log('getSheetColumnData',getSheetColumnData);
      workSheetData.push(getSheetColumnData);
     })
     //club all array of objects,remove duplicates and form single array with sorted order
     let merged = [];
     workSheetData && workSheetData.forEach((eachworksheet => a => a.forEach(b => {
      if (!eachworksheet[b.value]) {
          eachworksheet[b.value] = {};
          merged.push(eachworksheet[b.value]);
      }
      Object.assign(eachworksheet[b.value], b);
     }))(Object.create(null)));

     merged.sort((a, b) => a.value - b.value);
     merged.map((e,key)=>{
      e.id = key+1;
    });
    setStatusLabels(merged);
     statusSelectInfo[0].status_label = merged;
  }
},[])
 
  // const selectRow = (param) => {
  //   alert(param)
  //   console.log(param)
  //   setSelectedRowValue(param)
  // }
  const firstRight = () => {
    console.log(selectedRowValue)
    eventLabels.push(selectedRowValue);
    // console.log( eventLabels.push(selectedRowValue));
    let result = statusLabels.filter(element => element.id != selectedRowValue.id)
    result.sort(function(a, b) {
      if (a.id !== b.id) {
          return a.id - b.id
      }
    })
    let eventLabelsData = eventLabels;
   eventLabelsData.sort(function(a, b) {
      if (a.id !== b.id) {
          return a.id - b.id
      }
    })
    console.log(result);
    console.log(eventLabelsData);
    props.actions.dataSelectionObject.exportStatusLabelValues({
      message:eventLabelsData,
    });
    setStatusLabels(result);
    statusSelectInfo[0].status_label = result;
    setEventLabels(eventLabelsData);
    statusSelectInfo[0].event_label = eventLabelsData;
    setSelectedRowValue({});
  }
  
  const firstLeft = () => {
    statusLabels.push(selectedRowValue);
    // console.log( eventLabels.push(selectedRowValue));
    let result = eventLabels.filter(element => element.id != selectedRowValue.id)
    result.sort(function(a, b) {
      if (a.id !== b.id) {
          return a.id - b.id
      }
    })
    let statusLabelsData = statusLabels;
    statusLabelsData.sort(function(a, b) {
      if (a.id !== b.id) {
          return a.id - b.id
      }
    })
    setStatusLabels(statusLabelsData);
    statusSelectInfo[0].status_label = statusLabelsData;
    setEventLabels(result);
    statusSelectInfo[0].event_label = result;
    setSelectedRowValue({});
    var tbody = document.querySelectorAll('.test tbody tr').length;
    console.log(tbody);
    if(tbody == 1){
      props.actions.dataSelectionObject.exportStatusLabelValues({
        message:[],
      });
    }
  }

  // const [censorLabels, setCensorLabels] = useState([]);
  const secondRight = () => {
    censorLabels.push(selectedRowValue);
    // console.log( eventLabels.push(selectedRowValue));
    let result = statusLabels.filter(element => element.id != selectedRowValue.id)
    result.sort(function(a, b) {
      if (a.id !== b.id) {
          return a.id - b.id
      }
    })
    let censorLabelsData = censorLabels;
    censorLabelsData.sort(function(a, b) {
      if (a.id !== b.id) {
          return a.id - b.id
      }
    })
    setStatusLabels(result);
    statusSelectInfo[0].status_label = result;
    setCensorLabels(censorLabelsData);
    statusSelectInfo[0].censor_label = censorLabelsData;
    setSelectedRowValue({});
  }

  const secondLeft = () => {
    statusLabels.push(selectedRowValue);
    // console.log( eventLabels.push(selectedRowValue));
    let result = censorLabels.filter(element => element.id != selectedRowValue.id)
    result.sort(function(a, b) {
      if (a.id !== b.id) {
          return a.id - b.id
      }
    })
    let statusLabelsData = statusLabels;
    statusLabelsData.sort(function(a, b) {
      if (a.id !== b.id) {
          return a.id - b.id
      }
    })
    setStatusLabels(statusLabelsData);
    statusSelectInfo[0].status_label = statusLabelsData;
    setCensorLabels(result);
    statusSelectInfo[0].censor_label = result;
    setSelectedRowValue({});
  }


  const selectStatusRow = (param) => {
    setStatusLabelActive(true)
    setSelectedRowValue(param)
    setCensorLabelsActive(false)
    setEventLabelsActive(false)
  }

  const selectEvetRow = (param) => {
    setEventLabelsActive(true)
    setStatusLabelActive(false)
    setCensorLabelsActive(false)
    setSelectedRowValue(param)


   
  }
  const selectCensorRow = (param) => {
    setCensorLabelsActive(true)
    setEventLabelsActive(false)
    setStatusLabelActive(false)
    setSelectedRowValue(param)
  }
  return (
        <div className="statusLabel" style={{display:"flex"}}>
        {/* <div className="ms-Grid-row">    */}
        <div style={{width:"40%"}}>
        <Label>Status labels:</Label>
        <div  style={{minHeight:"260px", border:"1px solid black"}}>   
           <table className={`table cur-pointer`}>
        
        <tbody>
          { statusLabels.length &&
            statusLabels.map((item,key) => <>
              <tr key = {key} onClick={() => 
              selectStatusRow(item)
                
                }
                >
                <td>{item.value}</td>
              </tr>
            </>)
          }
        </tbody>
      </table> 
     </div>
        </div>
     <div  style={{width:"20%", textAlign:"center"}}>  
     <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
     <button  style={{width:"80%", marginTop:"20px"}} onClick={() => statusLabelActive ? firstRight() : null}>	&gt; 	&gt;</button>
     </div>
     <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
     <button style={{width:"80%", marginTop:"10px"}}  onClick={() => eventLabelActive ?  firstLeft() : null}>	&lt;	&lt;</button>
     </div>
     <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
     <button style={{width:"80%", marginTop:"130px"}}  onClick={() => statusLabelActive ? secondRight() : null}>	&gt; 	&gt;</button>
     </div>
     <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
     <button style={{width:"80%", marginTop:"10px"}}  onClick={() => censorLabelsActive ? secondLeft() : null}>	&lt;	&lt;</button>
     </div>
     </div>
     <div style={{width:"40%"}}> 
     <Label>Event labels:</Label>
     <div style={{border:"1px solid black",  minHeight:"110px"}}>
     <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
     <table className={`table cur-pointer test`}>
        
        <tbody>
          {eventLabels && 
            eventLabels.map(item => <>
              <tr key = {item.id} onClick={() => 
              selectEvetRow(item)
                
                }>
                <td>{item.value}</td>
              </tr>
            </>)
          }
        </tbody>
      </table> 
    </div>
    </div>
    <div style={{marginTop:"20px"}}></div>
    <Label>Censor labels:</Label>
    <div style={{border:"1px solid black",  minHeight:"110px"}}>
    <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
    <table className={`table cur-pointer`}>   
        <tbody>
          {
            censorLabels.map(item => <>
              <tr onClick={() => 
              selectCensorRow(item)

                }>
                <td>{item.value}</td>
              </tr>
            </>)
          }
        </tbody>
      </table> 
</div>      
    </div>
    </div>  
     </div>

   
  )
}
function mapStateToProps(state) {
  console.log('state calling in status compnent',state);
  return {
    dataSelectionColumnData: state.instanceReducer.dataSelectionColumns,
    dataSelectionStepWise:state.instanceReducer.dataSelectionStepWise
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
    dataSelectionObject: bindActionCreators(componentInstance, dispatch),
    },
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(StatusLabel);