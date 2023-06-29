import React, { useEffect, useRef, useState } from 'react';
import {
  Dropdown,
  IDropdown,
  IDropdownOption,
  ResponsiveMode,
} from '@fluentui/react/lib/Dropdown';
import * as DataFormat from './DataFormat';
import { connect } from 'react-redux';
import { Label } from '@fluentui/react/lib/Label';
import { bindActionCreators } from 'redux';
import * as componentInstance from '../../../../store/Worksheet/SpreadSheet/actions';
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { getColumnHeaderText } from '@syncfusion/ej2-react-spreadsheet';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
const { ipcRenderer } = require('electron');
const fields = { text: 'text', value: 'key' };
export let dataSelectInfo = [];
var titleData = '';
const dropdownStyles = {
  dropdown: { width: 150 },
  dropdownItems: { maxHeight: '290px' },
};

function shiftingTable(tableListVal: any, idx: number) {
  const fields = { text: 'text', value: 'key' };
  console.log(tableListVal);
  let tableLst = [...tableListVal];
  tableLst = tableLst.map((a) => {
    a.active = false;
    return a;
  });
  let i = idx;
  tableLst[i].active = false;
  for (i = idx; i < tableLst.length-1; i++){
    tableLst[i].value = tableLst[i+1].value;
    tableLst[i].idx = tableLst[i+1].idx;
  }
  tableLst[i].value = '';
  tableLst[i].active = true;
  titleData = tableLst[i].title;
  return tableLst;
}

function DataSelection(props) {
  const [step, setStep] = useState(props.select.value); //Mean
  const [itemValue, setItemValue] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [tableList, setTableList] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [labelDataSelection, setlabelDataSelection] =
    useState('Data selection');
  const dropdownRef = React.createRef<IDropdown>();
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
  const tableListRef = useRef();
  tableListRef.current = tableList;
  // useEffect(()=>{
  //   props.OpenHelpWindow("wbasics","mcnemar_s_test","")
  // },[])

  useEffect(() => {
    window.addEventListener('keydown', onDeleteKeyPress);

    return () => {
      window.removeEventListener('keydown', onDeleteKeyPress);
    };
  }, []);

  // const onDeleteKeyPress = event => {
  //   const key = event.key;
  //   if (key === 'Delete') {
  //     let selectedRowIdx = tableListRef.findIndex(item => {
  //       item.active === true
  //     })
  //     clearData(selectedRowIdx)
  //   }
  // }
  // const tableListRef = React.useRef(tableList);
  const setMyTableList = (data: any) => {
    console.log('setMyTableList');
    tableListRef.current = data;
    setTableList(data);
  };
  const onDeleteKeyPress = (event) => {
    const key = event.key;
    if (key === 'Delete') {
      let selectedRowIdx = tableListRef.current.findIndex(
        (item) => item.active === true
      );
      clearData(selectedRowIdx);
    }
  };

  const selectedPair = () => {
    if (DataFormat[step] !== undefined) {
      console.log(DataFormat);
      let table = DataFormat[step];
      table = [...table];
      table[0].value = '';
      table[0].active = true;

      console.log('table', table);
      if (props.select.title.includes('Histogram')) {
        let initialTitle = 'Source data for histogram';
        setlabelDataSelection(initialTitle);
        setCurrentTitle(table[0].title);
        titleData = table[0].title;
      } else {
        let initialTitle = 'Data for ' + table[0].title;
        setlabelDataSelection(initialTitle);
        setCurrentTitle(table[0].title);
        titleData = table[0].title;
      }
      setMyTableList(table);
    }
  };

  ipcRenderer.on('mainHeadDataToTestWizard', function (event, arg) {
    let item = {
      key: arg.key,
      text: arg.text,
    };
    // console.log('item contains', item);
    dataselect(item);
  });

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    console.log(item, 'onChange item');
    setSelectedItem(item);
    dataselect(item);
  };
  const dataselect = (item) => {
    setSelectedItem(item);
    console.log(item, tableListRef, 'tableListRef');
    let tableInfo = tableListRef.current.filter((a) => a.title == titleData);
    let titleList = [...tableListRef.current];
    console.log(item, tableListRef, titleList, tableInfo, 'tableListRef');
    if (tableInfo.length > 0) {
      console.log(tableInfo);
      //alert("inside here")
      selectRow(tableInfo[0]);
      tableInfo = tableInfo[0];
      if (tableInfo.value) {
        tableInfo.value = item.text;
        tableInfo.idx = item.key;
        let indexVal = tableListRef.current.findIndex(
          (element) => element.title === tableInfo.title
        );
        if (indexVal !== -1) {
          let index = indexVal;
          index = index + 1;
          if (tableListRef.current.length >= index) {
            let next = tableList[index];
            if (next !== undefined) {
              tableInfo.active = false;
              titleList.splice(indexVal, 1, tableInfo);
              next.active = true;
              titleList.splice(index, 1, next);
              setCurrentTitle(next.title);
              console.log('title contains ', next.title);
              titleData = next.title;
              let label = 'Data for ' + next.title;
              props.actions.dataSelectionObject.isDataSelectionAvailable({
                message: next.title,
              });
              setlabelDataSelection(label);
            }
            setTableList([...titleList]);
          }
        }
      } else {
        tableInfo.idx = item.key;
        tableInfo.value = item.text;
        let indexVal = tableListRef.current.findIndex(
          (element) => element.title === tableInfo.title
        );
        if (indexVal !== -1) {
          let list = DataFormat.findTarget(titleList, tableInfo, step);
          if (list) {
            if (list.length > 0) {
              tableInfo.active = false;
              titleList.splice(indexVal, 1, tableInfo);
              let currTable = list.filter((a) => a.active === true);
              props.actions.dataSelectionObject.isDataSelectionAvailable({
                message: currTable[0].title,
              });
              setCurrentTitle(currTable[0].title);
              titleData = currTable[0].title;
              if (props.select.title.includes('Histogram')) {
                if (currTable[0].title.includes('Source :')) {
                  let label = 'Source data for Histogram';
                  setlabelDataSelection(label);
                } else {
                  let label = 'Output for bin centers';
                  // console.log(currTable[0].title);
                  // console.log(props);
                  setlabelDataSelection(label);
                }
              } else {
                let label = 'Data for ' + currTable[0].title;
                console.log(currTable[0].title);
                console.log(props);
                setlabelDataSelection(label);
              }

              titleList = list;
            }
          }
        }
        setMyTableList(titleList);
        //  console.log(titleList);
        dataSelectInfo = titleList;
      }

      props.actions.dataSelectionObject.exportDataSelectionColumnData({
        message: titleList,
      }); 
      ipcRenderer.send('dataSelectionTest', titleList);

    }
  };

  const selectRow = (param) => {
    titleData = param.title;
    props.actions.dataSelectionObject.isDataSelectionAvailable({
      message: param.title,
    });
    props.content.dataSelectionObject = param;
    console.log(props.content.dataSelectionObject);
    let label = 'Data for ' + param.title;
    setlabelDataSelection(label);
    let tablelist = [...tableList];
    //tablelist = tableListRef.map(a => { if (a.active == true) { a.active = false } return a });
    tablelist = tableListRef.current.map((a) => {
      a.active = false;
      return a;
    });
    param.active = true;
    let indexVal = tableListRef.current.findIndex(
      (element) => element.title === param.title
    );
    if (indexVal !== -1) {
      tableListRef.current.splice(indexVal, 1, param);
      setCurrentTitle(param.title);
      titleData = param.title;
      setMyTableList(tablelist);
      dataSelectInfo = tableList;
      props.checkSecDataSelection(param);
    } else {
      props.checkSecDataSelection(param[0]);
    }
  };

  useEffect(() => {
    console.log('using this88888888888888');
    if (ipcRenderer.rawListeners('mainHeadData').length === 0) {
      ipcRenderer.on('mainHeadData', function (event, arg) {
        let item = {
          key: arg.key,
          text: arg.text,
        };
        dataselect(item);
      });
    }
    // selectedPair();
    return () => {
      if (ipcRenderer != undefined) {
        ipcRenderer.removeAllListeners('mainHeadData');
      }
    };
  });
  const actionUpdateHandler = (event: any, args: any) => {
    console.log(args, 'action-update');
    // setTitle(newArgs.titleName)
    setSelectedTableData(args.range);
  };

  const setSelectedTableData = (selectedRange: any[]) => {
    if (selectedRange && selectedRange.length >= 4 && selectedRange[2] === 99) {
      let col1 = selectedRange[1];
      while (col1 <= selectedRange[3]) {
        let selectedCol = { key: col1, text: getColumnHeaderText(col1 + 1) };
        let item = {
          key: col1,
          text: selectedCol.text,
        };
        console.log(item, 'item--->');
        dataselect(item);
        col1++;
      }
      // onSelectionChange(null, selectedCol);
    }
  };

  useEffect(() => {
    let emptyValue = true;
    console.log('props contains', props);
    console.log(props.content.sheetData);
    if (props.content.testOptions === 'Histogram') {
      props.content.sheetData.forEach((item) => {
        console.log(item);
        if (item.text.includes('First Empty')) {
          emptyValue = false;
        }
      });
      console.log(emptyValue);
      if (emptyValue) {
        props.content.sheetData.push({
          text: 'First Empty',
          key: 0,
        });
        return;
      }
    }
    selectedPair();
    if (
      props.content.range &&
      ipcRenderer.rawListeners('action-update').length == 1
    ) {
      console.log('here we goo--->');
      actionUpdateHandler(event, props.content);
    }
  }, []);

  const clearData = (index: number) => {
    let newArray = [...tableListRef.current];
    console.log(newArray, 'newArray');
    let flag: boolean = false;
    if (newArray[newArray.length - 1].value === '') flag = true;

    if (newArray.length > 1) {
      let newDataList = shiftingTable(newArray, index);
      if (index !== newDataList.length - 1 && flag === true) {
        newDataList.splice(newDataList.length - 1, 1);
      }
      let item = newDataList[newDataList.length - 1];
      selectRow(item);
      dataSelectInfo = newDataList;
      setTableList([...newDataList]);
    } else {
      selectedPair();
    }
  };

  return (
    <div>
      <DropDownListComponent
        className="e-icon-anim"
        id="ddlelement"
        dataSource={props.content.sheetData}
        fields={fields}
        value={selectedItem ? selectedItem.key : undefined}
        // popupHeight="200px"
        // popupWidth="250px"
        placeholder="Select Column"
        change={(param: any) => {
          onChange('', param.itemData);
        }}
      />
      <br></br>
      <Label>Selected columns</Label>
      <div className="graphWizardLeftCard" style={{ height: '285px' }}>
        <table className={`table cur-pointer`}>
          <tbody>
            {tableList.map((item: any, index) => (
              <tr
                onDoubleClick={() => clearData(index)}
                onClick={() => selectRow(item)}
                className={item.active === true ? 'active' : ''}
              >
                <td>{item.title + ':'}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state);
  return {
    referenceObjectState: state.instanceReducer.instance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (
      RibbonMenu: string,
      selectedElement: string,
      selectedItem: string
    ) =>
      dispatch(
        actionCreators.setHelpWindowOpen(
          RibbonMenu,
          selectedElement,
          selectedItem
        )
      ),

    actions: {
      dataSelectionObject: bindActionCreators(componentInstance, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSelection);
