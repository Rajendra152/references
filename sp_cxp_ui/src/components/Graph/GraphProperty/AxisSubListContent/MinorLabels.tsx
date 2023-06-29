
import React, {useState,useEffect} from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';
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

const MinorLabels = (props: any) => {
  console.log(props)
  const [tickPrefix, setTickPrefix] = useState(props.majorLabel.tickprefix);
  const [tickSuffix, setTickSuffix] = useState(props.majorLabel.ticksuffix);

  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__major_and_minor_axis_labels")
  },[])
  const prefixOnChange = (ev, value) => {
      
    const newProps = {
      ...props.majorLabel,
      tickprefix: value
    }
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout,props.currAxis)
    console.log(newLayout)
    setTickPrefix(value)
    props.graphPropertyOnChange(newLayout,newProperties)
  }

  const sufixOnChange = (ev, value) => {
      
    const newProps = {
      ...props.majorLabel,
      ticksuffix: value
    }
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout,props.currAxis)
    console.log(newLayout)
    setTickSuffix(value)
    props.graphPropertyOnChange(newLayout,newProperties)
  }

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
         Minor Tick Labels
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '10px' }}>
        <Checkbox label="Bottom" disabled={true} onChange="" />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '10px' }}>
        <Checkbox label="Top" disabled={true} onChange="" />
      </div>
      <div className="insets-header">
        <Label className="">
         Add To Minor Tick Labels
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '10px' }}>
        <Label className="ms-lg3">Prefix</Label>
        <TextField 
            name={`prefix`} 
            type="text" 
            className={'ms-lg5'} 
            value={tickPrefix} 
            onChange={prefixOnChange}
            disabled />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '10px' }}>
        <Label className="ms-lg3">Sufix</Label>
        <TextField 
            name={`sufix`} 
            type="text" 
            className={'ms-lg5'} 
            value={tickSuffix}
            onChange={sufixOnChange}
            disabled />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MinorLabels);
