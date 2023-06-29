
import React, {useState} from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField'; 

import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import { useEffect } from 'react';
const legendarray = [{ value: "legend" }, { value: "legend" }, { value: "legend" }, { value: "legend" }, { value: "legend" }];
const Legendli = legendarray.map((legendvalue, index) =>
  <li>{legendvalue.value} {index + 1}</li>
);
const scltypeoptions = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];

const stdtrngoptions = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];

const clroptions = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];


const planesoptions = [
  { key: 'A', text: 'XY Plane', data: { icon: 'Memo' } },
  { key: 'B', text: 'Option a', data: { icon: 'Memo' } },
];

const onRenderPlanesOption = (planesoptions) => {
  return (
    <div>
      {planesoptions.data && planesoptions.data.icon && (
        <Icon iconName={planesoptions.data.icon} aria-hidden="true" title={planesoptions.data.icon} />
      )}
      <span style={{ marginLeft: '10px' }}>{planesoptions.text}</span>
    </div>
  );
};

const MajorLabels = (props: any) => {
  console.log(props)
  const [tickPrefix, setTickPrefix] = useState(props.majorLabel.tickprefix);
  const [tickSuffix, setTickSuffix] = useState(props.majorLabel.ticksuffix);
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__major_and_minor_axis_labels")
  },[])
  useEffect(()=>{
    setTickPrefix(props.majorLabel.tickprefix)
    setTickSuffix(props.majorLabel.ticksuffix)
  },[props])

  const prefixOnChange = (ev, value) => {
      
    const newProps = {
      ...props.majorLabel,
      tickprefix: value
    }
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout,props.currAxis)
     
    props.graphPropertyOnChange(newLayout,newProperties)
  }

  const sufixOnChange = (ev, value) => {
      
    const newProps = {
      ...props.majorLabel,
      ticksuffix: value
    }
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout,props.currAxis)
  
    props.graphPropertyOnChange(newLayout,newProperties)
  }

  const onAxisChange = (ev, value) => {

    const newProps = {
      ...props.majorLabel,
      side: ev.target.name
    }
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
    props.graphPropertyOnChange(newLayout, newProperties);
  }

  let axislabel1, axislabel2, selectedOption1, selectedOption2, labelName1,labelName2, disableAxis1, disableAxis2, temporaryHide;
  if (props.layout.graphType === "polarPlot") {
    axislabel1 = "Outer";
    axislabel2 = "Inner";
    disableAxis1=true;
    disableAxis2=true;
    temporaryHide='tempHide'
  } 
  else if (props.layout.graphType === "radarPlot") {
    axislabel1 = "Bottom";
    axislabel2 = "Top";
    labelName1 = 'clockwise'
    labelName2 = 'counterclockwise'
    disableAxis1=false;
    disableAxis2=false;
    selectedOption1 = (labelName1 === props.layout.polar.radialaxis.side);
    selectedOption2 = (labelName2 === props.layout.polar.radialaxis.side);
  } 
  else if(props.layout.hasOwnProperty('scene')){
    disableAxis1=true;
    disableAxis2=true;
    temporaryHide='tempHide'
    if(props.currAxis.includes("xaxis")){
      axislabel1='Bottom';
      axislabel2='Top';
    }
    else if(props.currAxis.includes("yaxis")){
      axislabel1='Left';
      axislabel2='Right';
    }
    else if(props.currAxis.includes("zaxis")){
      axislabel1='Front';
      axislabel2='Rear';
    }
    
    labelName1 = axislabel1.toLowerCase()
    labelName2 = axislabel2.toLowerCase()
    selectedOption1 = (labelName1 === props.layout.scene[props.currAxis].side);
    selectedOption2 = (labelName2 === props.layout.scene[props.currAxis].side);
  }
  else {
    axislabel1 = props.currAxis.includes("yaxis") ? "Left" : "Bottom";
    axislabel2 = props.currAxis.includes("yaxis") ? "Right" : "Top";
    disableAxis1=false;
    disableAxis2=false;
    
    labelName1 = axislabel1.toLowerCase()
    labelName2 = axislabel2.toLowerCase()
   
    selectedOption1 = (labelName1 === props.layout[props.currAxis].side);
    selectedOption2 = (labelName2 === props.layout[props.currAxis].side);
  }

  return (
    <div className="insets-container">
      <div className={`insets-header ${temporaryHide}`}>
        <Label className="">
         Major Tick Labels
        </Label>
      </div>
      <div className={`d-flex ${temporaryHide}`} style={{ marginBottom: '10px' }}>
        <Checkbox label={axislabel1} disabled = {disableAxis1} onChange={onAxisChange} name={labelName1} checked={selectedOption1} />
      </div>
      <div className={`d-flex ${temporaryHide}`} style={{ marginBottom: '10px' }}>
        <Checkbox label={axislabel2} disabled = {disableAxis2} onChange={onAxisChange} name={labelName2} checked={selectedOption2}/>
      </div>
      <div className="insets-header">
        <Label className="">
         Add To Major Tick Labels
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '10px' }}>
        <Label className="ms-lg3">Prefix</Label>
        <TextField 
            name={`prefix`} 
            type="text" 
            className={'ms-lg5'} 
            value={tickPrefix} 
            onChange={prefixOnChange} />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '10px' }}>
        <Label className="ms-lg3">Sufix</Label>
        <TextField 
            name={`sufix`} 
            type="text" 
            className={'ms-lg5'} 
            value={tickSuffix}
            onChange={sufixOnChange} />
      </div>
    </div>
  );
};


export default (MajorLabels);
