import React, { useEffect, useState , useRef } from "react";
import { Dropdown, IDropdown, IDropdownOption, ResponsiveMode } from '@fluentui/react/lib/Dropdown';
import * as DataFormat from "./DataFormat";
import { isGPStyle } from './WizardServices';
import { getGPStyle } from './GraphList/GetformatList';
const { ipcRenderer } = require('electron');
export let dataSelectInfo: any = [];

var titleData = '';

const dropdownStyles = { 
  dropdown: { width: 150 }, 
  dropdownItems : { maxHeight : '290px'} 
};

function shiftingTable(tableListVal:any, idx: number) {
  console.log(tableListVal)
  let tableLst = [...tableListVal];
  tableLst = tableLst.map(a=>{a.active=false; return a;})
  let i = idx;
  for (i = idx; i < tableLst.length-1; i++){
    tableLst[i].value = tableLst[i+1].value;
    tableLst[i].idx = tableLst[i+1].idx;
  }
  tableLst[i].value = "";
  return tableLst;
}

export default function DataSelection(props) {
  console.log(props, "props")
  const [step, setStep] = useState(props.select.value);
  const [, setCurrentTitle] = useState("")
  const [tableList, setTableList] = useState([]);
  const dropdownRef = React.createRef<IDropdown>();
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
  const tableListRef = useRef();
  tableListRef.current = tableList;

  useEffect(() => {
    window.addEventListener('keydown', onDeleteKeyPress);

    selectedPair();

    return (() => {
      window.removeEventListener('keydown', onDeleteKeyPress)
    })
  }, [])

  useEffect(() => {
    if (ipcRenderer.rawListeners('mainHeadData').length === 0) {
      ipcRenderer.on('mainHeadData', function (event, arg){
        let item = {
          key: arg.key,
          text: arg.text
        }
        dataselect(item);
    });
    }

    return () => {
      if(ipcRenderer != undefined ){
        ipcRenderer.removeAllListeners('mainHeadData')
      }
    }
  });


  const selectedPair = () => {
    if (isGPStyle(props.content['GRAPHSTYLE'])) {   //This if condition Looks nonsense - never used
      let gpstyle = getGPStyle(props.content['GRAPHSTYLE']);
      setStep(gpstyle);
      let table = DataFormat[gpstyle];
      table = [...table];
      table[0].value = '';
      table[0].active = true;
      setTableList(table);
      setCurrentTitle(table[0].title);
      titleData = table[0].title;
    } else if (DataFormat[step] !== undefined) {
      let table = DataFormat[step];
      table = [...table];
      table[0].value = '';
      table[0].active = true;
      setTableList(table);
      setCurrentTitle(table[0].title);
      titleData = table[0].title;
    }
  }

  const onChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setSelectedItem(item);
    dataselect(item);
  }

  const dataselect = (item: IDropdownOption) =>{
    let titleList = [...tableList];
    let tableInfo = titleList.filter(a => a.title == titleData);
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
            setTableList(titleList);
            if(next!==undefined){
              tableInfo.active = false;
              titleList.splice(indexVal, 1, tableInfo);
              next.active = true;
              titleList.splice(index, 1, next);
              setCurrentTitle(next.title);
              titleData = next.title;
              setTableList(titleList);
            }
          }
        }
      } else {
        tableInfo.value = item.text;
        tableInfo.idx = item.key;
        let indexVal = tableList.findIndex((element) => element.title === tableInfo.title);
        if (indexVal !== -1) {
          let list = DataFormat.findTarget(titleList, tableInfo, step);
          if (list) {
            if (list.length > 0) {
              tableInfo.active = false;
              titleList.splice(indexVal, 1, tableInfo);
              let currTable = list.filter(a => a.active === true);
              setCurrentTitle(currTable[0].title);
              titleData = currTable[0].title;
              titleList = list;
            }
          }
        }
        setTableList(titleList);
        dataSelectInfo =titleList;
        ipcRenderer.send('dataSelectionData', titleList);
      }
      // DataSelectProps.result=titleList;
    }
  }

  const selectRow = (param) => {
    titleData = param.title
    let tablelist = [...tableList];
    tablelist = tablelist.map(a => { a.active = false; return a });
    param.active = true;
    let indexVal = tableList.findIndex((element) => element.title === param.title);
    if (indexVal !== -1) {
      tablelist.splice(indexVal, 1, param);
      setCurrentTitle(param.title);
      titleData=param.title;
      setTableList(tablelist);
    }
  }

  const clearData = (index: number) => {
    let newArray = [...tableListRef.current];
    console.log(newArray, "newArray")
    let flag: boolean = false;
    if (newArray[newArray.length - 1].value === "") flag = true;

    if (newArray.length > 1) {
      let newDataList = shiftingTable(newArray, index);
      if (flag === true && index !== newDataList.length - 1) {
        newDataList.splice(newDataList.length - 1, 1)
      }
      let item = newDataList[newDataList.length - 1];
      selectRow(item);
      setTableList([...newDataList]);
      dataSelectInfo = newDataList;
      ipcRenderer.send('dataSelectionData', newDataList);
    } else {
      selectedPair();
    }
  }

  const onDeleteKeyPress = event => {
    const key = event.key;
    if (key === 'Delete') {
      let selectedRowIdx = tableListRef.current.findIndex(item => item.active === true)
      clearData(selectedRowIdx)
    }
  }

  return (
    <div>
      <Dropdown
        componentRef={dropdownRef}
        placeholder="Select Column"
        onChange={onChange}
        selectedKey={selectedItem ? selectedItem.key : undefined}
        label="Data Selection"
        options={props.content.sheetData}
        styles={dropdownStyles}
        responsiveMode={ResponsiveMode.large}
      />
      <table className={`table cur-pointer data-selection`}>
        <tbody>
          {
            tableList.map((item, index) => {
              return (<>
                <tr onDoubleClick={() => clearData(index)} onClick={() => selectRow(item)} className={(item.active === true) ? "active" : ""}>
                  <td>{item.title}</td>
                  <td>{item.value}</td>
                </tr>
              </>)
            })
          }
        </tbody>
      </table>
    </div>
  )
}
