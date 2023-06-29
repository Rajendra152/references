
import React, {useState, useEffect} from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField'; 

import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";

const spokeoption = [
  // { key: 'none', text: '(none)', disabled: true },
  { key: 'clockwise', text: 'clockwise', disabled: false },
  { key: 'counterclockwise', text: 'counterclockwise', disabled: false },
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




const MajorPolarLabel = (props: any) => {
  console.log("Major-->Polar-->Labels",props)
  const [showSpoke1, setShowSpoke1] = useState(true)
  const [showSpoke2, setShowSpoke2] = useState(false)
  const [showSpoke3, setShowSpoke3] = useState(false)
  const [showSpoke4, setShowSpoke4] = useState(false)
  const [spoke1, setSpoke1] = useState(props.majorLabel.side)
  const [spoke2, setSpoke2] = useState('clockwise')
  const [spoke3, setSpoke3] = useState('clockwise')
  const [spoke4, setSpoke4] = useState('clockwise')
  const [tickPrefix, setTickPrefix] = useState(props.majorLabel.tickprefix);
  const [tickSuffix, setTickSuffix] = useState(props.majorLabel.ticksuffix);

  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__tick_label")
  },[])
  useEffect(()=>{
    setTickPrefix(props.majorLabel.tickprefix)
    setTickSuffix(props.majorLabel.ticksuffix)
    setSpoke1(props.majorLabel.side)
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

  const spoke1OnChange = (ev, item) => {      
    const newProps = {
      ...props.majorLabel,
      side: item.key
    }
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout,props.currAxis)
  
    props.graphPropertyOnChange(newLayout,newProperties)
  }


  return (
    <div className="insets-container maj-pol-lab">
    
      {/* <div className="insets-header">
        <Label className="">
        Show Axis Title
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Checkbox label="Spoke 1" onChange="" className="ms-lg3" checked={showSpoke1} disabled />
        <Checkbox label="Spoke 3" onChange="" className="ms-lg3" checked={showSpoke3} disabled/>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
      <Checkbox label="Spoke 2" onChange="" className="ms-lg3" checked={showSpoke2} disabled/>
        <Checkbox label="Spoke 4" onChange="" className="ms-lg6" checked={showSpoke4} disabled/>
      </div> */}
      <div className="insets-header">
        <Label className="">
         Major Tick Labels
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Spoke 1</Label>
        <Dropdown
          selectedKey={spoke1}
          options={spokeoption}
          // styles={dropdownStyles}
          onChange={spoke1OnChange}
          className={'ms-lg6'}
        />
      </div>
      {/* <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Spoke 2</Label>
        <Dropdown
          selectedKey={spoke2}
          options={spokeoption}
          // styles={dropdownStyles}
          disabled
          className={'ms-lg6'}
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Spoke 3</Label>
        <Dropdown
          selectedKey={spoke3}
          options={spokeoption}
          // styles={dropdownStyles}
          disabled
          className={'ms-lg6'}
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Spoke 4</Label>
        <Dropdown
          selectedKey={spoke4}
          options={spokeoption}
          // styles={dropdownStyles}
          disabled
          className={'ms-lg6'}
        />
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


export default (MajorPolarLabel);
