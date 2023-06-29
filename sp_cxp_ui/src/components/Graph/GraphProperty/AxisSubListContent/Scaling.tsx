
import React, {useEffect, useRef, useState} from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownStyles, } from '@fluentui/react/lib/Dropdown';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { getAllScaleType, getScaleRangeCalc } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
  callout:{maxHeight:250, overflowY:'auto'}
};

const Scaling = (props: any) => {
  console.log(props)
  const [scaleType, setScale] = useState(props.scaleProp.type);
  const [startRange, setStartRange] = useState(Math.round(props.scaleProp.range[0]*10)/10);
  const [startCal, setStartCal] = useState("dataRange");
  const [endRange, setEndRange] = useState(Math.round(props.scaleProp.range[1]*10)/10);
  const [endCal, setEndCal] = useState("dataRange");

  const allListData = useRef({
    allScaleType: getAllScaleType(),
    allRangeCalc: getScaleRangeCalc()
  })
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__axis_scaling")
  },[])
  useEffect(()=>{
    setScale(props.scaleProp.type);
    setStartRange(Math.round(props.scaleProp.range[0]*10)/10)
    if(props.scaleProp.autorange){
      setStartCal("dataRange");
      setEndCal("dataRange")
    }
    else{
      setStartCal("constant");
      setEndCal("constant");
      
    }
    
    setEndRange(Math.round(props.scaleProp.range[1]*10)/10)

  },[props])


  const scaleTypeOnChange = (ev, item) => {
    const newProps = {
      ...props.scaleProp,
      type: item.key,
      autorange: startCal=== "dataRange" ? true : false,
      range: [startRange, endRange]
     }
  
     setScale(item.key)
     
     const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
     props.graphPropertyOnChange(newLayout,newProperties)
  }

  const startRangeOnChange = (ev, value) => {
    const newProps = {
      ...props.scaleProp,
      range: [value, endRange]
     }
  
     setStartRange(value)
     
     const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
     props.graphPropertyOnChange(newLayout,newProperties)
  }

  const endRangeOnChange = (ev, value) => {
    const newProps = {
      ...props.scaleProp,
      range: [startRange, value]
     }
  
     setEndRange(value)
     
     const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
     props.graphPropertyOnChange(newLayout,newProperties)
  }

  const calcOnChange = (ev, item) => {

    const newProps = {
      ...props.scaleProp,
      autorange: item.key === "dataRange" ? true : false,
     }
  
     setStartCal(item.key)
     setEndCal(item.key)
     
     const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
     props.graphPropertyOnChange(newLayout,newProperties)
  }


  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
          Scale Type
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Scale Type</Label>
        <Dropdown
          defaultSelectedKey={scaleType}
          selectedKey={scaleType}
          options={allListData.current.allScaleType}
          className={'ms-lg7'}
          onChange={scaleTypeOnChange}
          styles={dropdownStyles}
        />
      </div>
      <div className="insets-header">
        <Label className="">
          Range
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg2">Start</Label>
        <TextField name={`start`} 
              type="number" 
              className={'ms-lg3 text-s'} 
              value={startRange}
              disabled={startCal==="dataRange" ? true: false}
              onChange= {startRangeOnChange} />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Calculation</Label>
        <Dropdown
          defaultSelectedKey={startCal}
          selectedKey={startCal}
          options={allListData.current.allRangeCalc}
          className={'ms-lg5'}
          onChange={calcOnChange}
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg2">End</Label>
        <TextField name={`end`} 
              type="number" 
              className={'ms-lg3 text-s'} 
              value={endRange} 
              disabled={startCal==="dataRange" ? true: false}
              onChange= {endRangeOnChange} />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px' }}>
        <Label className="ms-lg3">Calculation</Label>
        <Dropdown
          defaultSelectedKey={startCal}
          selectedKey={startCal}
          options={allListData.current.allRangeCalc}
          className={'ms-lg5'}
          onChange={calcOnChange}
        />      </div>
      {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '0px' }}>
        <Checkbox label=""   disabled = {true} onChange="" />
        <Label className="ms-lg3">Pad 5%</Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '0px' }}>
        <Checkbox label="" disabled = {true}  onChange="" />      
        <Label className="ms-lg3">Nearest Tick</Label>
      </div> */}
    </div>
  );
};

export default Scaling;

