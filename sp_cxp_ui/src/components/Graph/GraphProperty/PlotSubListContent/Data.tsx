import React, { useState, useEffect } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { Checkbox } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { getDataModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";
import { getSpreadsheetColumn} from  '../../../../services/graphPageServices/GraphServices'
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
  callout:{maxHeight:250, overflowY:'auto'}
};

const stackTokens: IStackTokens = { childrenGap: 4 };


const options_dropdown1: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
];

const rangeRowoptions: IChoiceGroupOption[] = [
  { key: 'A', text: 'Entire range' },
  { key: 'B', text: 'Rows only' }
];

//let rangeOption: IDropdownOption[] = [];
const factorOption: IDropdownOption[] = [];
for(let i=1; i<=10; i++){
  factorOption.push({ key: i, text: `${i}`})
}

const Data = (props) => {
  console.log(props)
  const [isEntireRange, setisEntireRange] = useState(true);
  const [isRowsOnly, setIsRowsOnly] = useState(false);
  const [startRow, setstartRow] = useState(1);
  const [endRow, setendRow] = useState(1);
  const [factor, setfactor] = useState(1);

  const [ignoreMissing, setIgnoreMissing] = useState(false);
  const [ignoreOutRange, setIgnoreOutRange] = useState(false);
  const [rangeOption, setrangeOption] = useState([]);

  
//   useEffect(async () => {
//     console.log("Iam also called.............")
//     let allColIndex = []
//     for(const key in props.plotData){
//       allColIndex = [...allColIndex, ...props.plotData[key]]
//     }

//     let unique = allColIndex.filter((value, index, arr) => arr.indexOf(value) === index);

//     let row = 0;
//     console.log(props.openWorksheets)
//     const openedWrk = props.openWorksheets.filter(wrk =>wrk.key===props.currGrPg.worksheetId)
//     console.log(openedWrk, unique)
//     for(const index of unique){
//       const columnData = await getSpreadsheetColumn(openedWrk, index);
//       console.log(columnData)
//       if(row<columnData.length){
//         row=columnData.length
//       }
//     }
//     let allrangeOption: IDropdownOption[]=[]
//     for(let i=1; i<=row; i++){
//       allrangeOption.push({ key: i, text: `${i}`})
//     }
//     setrangeOption(allrangeOption)
//     if(startRow>allrangeOption.length){

//       setstartRow(allrangeOption[allrangeOption.length-1].key)
//     }
//     console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiii",endRow, endRow>allrangeOption.length)
//     if(endRow>allrangeOption.length){
//       console.log(allrangeOption[allrangeOption.length-1].key)
//       setendRow(allrangeOption[allrangeOption.length-1].key)
//     }
    
// }, [])

useEffect(()=>{
  props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__plot_data")
},[])
  useEffect(async () => {
    let start = 0;
    let end = 0;
    for (const key in props.dataProp.data) {
      setisEntireRange(props.dataProp.data[key].isentirerange);
      setstartRow(props.dataProp.data[key].start);
      start= props.dataProp.data[key].start;
      setendRow(props.dataProp.data[key].end); 
      end = props.dataProp.data[key].end
      setfactor(props.dataProp.data[key].gap);
      setIgnoreMissing(props.dataProp.data[key].missingvalues);
      setIgnoreOutRange(props.dataProp.data[key].outofrange);
      break;
    }

    let allColIndex = []
    for(const key in props.plotData){
      console.log("here check",props.plotData[key])
      if(props.plotData[key] == undefined){
        console.log("here yes",props.plotData[key])
      }
      else{
        console.log("here no*",props.plotData[key])
        allColIndex = [...allColIndex, ...props.plotData[key]]
      }    
    }
    let unique = allColIndex.filter((value, index, arr) => arr.indexOf(value) === index);

    let row = 0;
    console.log(props.openWorksheets)
    const openedWrk = props.openWorksheets.filter(wrk =>wrk.key===props.currGrPg.worksheetId)
    console.log(openedWrk, unique)
    for(const index of unique){
      const columnData = await getSpreadsheetColumn(openedWrk, index);
      console.log(columnData)
      if(row<columnData.length){
        row=columnData.length
      }
    }
    let allrangeOption: IDropdownOption[]=[]
    for(let i=1; i<=row; i++){
      allrangeOption.push({ key: i, text: `${i}`})
    }
    setrangeOption(allrangeOption)
    if(start>allrangeOption.length){
      setstartRow(allrangeOption[allrangeOption.length-1].key)
    }
    if(end>allrangeOption.length){
      console.log(allrangeOption[allrangeOption.length-1].key)
      setendRow(allrangeOption[allrangeOption.length-1].key)
    }
}, [props])


  const changeProperties = (newProps) => {
    const [newLayout, newProperties] = getDataModifiedJSON(newProps, props.properties, props.layout)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  const radioOnChange = (ev, item) => {
    const isEntireRange = item.key === "A" ? true : false;

    const newProps = {
      data: {
        ...props.dataProp.data,
      }
    }
    for (const key in newProps.data) {
      newProps.data[key] = {
        ...newProps.data[key],
        isentirerange: isEntireRange

      }
    }
    changeProperties(newProps);
  }

  const missingOnChange = (ev, value) => {
    const newProps = {
      data: {
        ...props.dataProp.data,
      }
    }
    for (const key in newProps.data) {
      newProps.data[key] = {
        ...newProps.data[key],
        missingvalues: value

      }
    }
    changeProperties(newProps);
  }

  const outRangeOnChange = (ev, value) => {

    const newProps = {
      data: {
        ...props.dataProp.data,
      }
    }
    for (const key in newProps.data) {
      newProps.data[key] = {
        ...newProps.data[key],
        outofrange: value

      }
    }
    changeProperties(newProps);
  }

  const startOnChange = (ev, item) => {

    const newProps = {
      data: {
        ...props.dataProp.data,
      }
    }
    for (const key in newProps.data) {
      newProps.data[key] = {
        ...newProps.data[key],
        start: item.key
      }
    }
    changeProperties(newProps);
  }

  const endOnChange = (ev, item) => {

    const newProps = {
      data: {
        ...props.dataProp.data,
      }
    }
    for (const key in newProps.data) {
      newProps.data[key] = {
        ...newProps.data[key],
        end: item.key
      }
    }
    changeProperties(newProps);
  }

  const factorOnChange = (ev, item) => {

    const newProps = {
      data: {
        ...props.dataProp.data,
      }
    }
    for (const key in newProps.data) {
      newProps.data[key] = {
        ...newProps.data[key],
        gap: item.key
      }
    }
    changeProperties(newProps);
  }



  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
          Data Sampling
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <ChoiceGroup
          selectedKey={isEntireRange ? "A": "B"}
          options={rangeRowoptions}
          required={true}
          onChange={radioOnChange} />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg2">Start row</Label>
        <Dropdown
          selectedKey={startRow}
          options={rangeOption}
          styles={dropdownStyles}
          onChange={startOnChange}
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg2">End row</Label>
        <Dropdown
          selectedKey={endRow}
          options={rangeOption}
          styles={dropdownStyles}
          onChange={endOnChange}
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '15px', }}>
        <Label className="ms-lg2">Factor By</Label>
        <Dropdown
          selectedKey={factor}
          options={factorOption}
          styles={dropdownStyles}
          onChange={factorOnChange}
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '5px' }}>
      <Checkbox 
        label="Ignore missing values"
        checked={ignoreMissing}
        onChange={missingOnChange} 
      />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '5px' }}>
      <Checkbox 
        label="Ignore out of range values"
        checked={ignoreOutRange}
        onChange={outRangeOnChange}
      />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Data);
