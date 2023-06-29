
import React, {useState, useEffect} from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField';


import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";


const axisTilePosition = [
  { key: 'apex', text: 'Apex', disabled: true },
  { key: 'alongAxis', text: 'Along Axis', disabled: true },
  { key: 'none', text: '(None)', disabled: true },
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

const MajorTernaryLabels = (props: any) => {
  console.log(props)

  const [axisPosition, setaxisPosition] = useState("apex");
  const [tickPrefix, setTickPrefix] = useState(props.majorLabel.tickprefix);
  const [tickSuffix, setTickSuffix] = useState(props.majorLabel.ticksuffix);
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__ternary_axis_labels")
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

  return (
    <div className="insets-container maj-ter-lab">
      {/* <div className="insets-header">
        <Label className="">
         Axis Title
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Show At</Label>
        <Dropdown
          selectedKey={axisPosition}
          options={axisTilePosition}
          // styles={dropdownStyles}
          className={'ms-lg3'}
        />
      </div>
      <div className="insets-header">
        <Label className="">
          Major Tick Labels
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Checkbox label="Left" onChange="" className="ms-lg3" disabled/>
        <Checkbox label="Right" onChange="" className="ms-lg3" disabled/>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
      <Checkbox label="Clockwise" onChange="" className="ms-lg3" disabled/>
        <Checkbox label="Counter Clockwise" onChange="" className="ms-lg6" disabled/>
      </div>
      <div className="insets-header">
        <Label className="">
          Rotate With Axis
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Checkbox label="Axis Title" onChange="" className="ms-lg3" disabled/>
        <Checkbox label="Axis labels" onChange="" className="ms-lg3" disabled/>
      </div> */}
      <div className="insets-header">
        <Label className="">
         Add To Major Tick Labels
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Prefix</Label>
        <TextField name={`prefix`} type="text" className={'ms-lg5'} value={tickPrefix} onChange={prefixOnChange} />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Sufix</Label>
        <TextField name={`sufix`} type="text" className={'ms-lg5'} value={tickSuffix} onChange={sufixOnChange} />
      </div>
    </div>
  );
};



export default (MajorTernaryLabels);
