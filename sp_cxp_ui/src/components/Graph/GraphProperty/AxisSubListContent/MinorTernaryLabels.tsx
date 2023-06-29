
import React, { useState, useEffect, useRef } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { getAxisShowAtTypes } from "../../../../utils/graphDailogProperty/differentPropertyList";
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';

const legendarray = [{ value: "legend" }, { value: "legend" }, { value: "legend" }, { value: "legend" }, { value: "legend" }];
const Legendli = legendarray.map((legendvalue, index) =>
  <li>{legendvalue.value} {index + 1}</li>
);
const spoke1option = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];

const spoke2option = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];

const showat = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];
const spoke4option = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
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

const MinorTernaryLabels = (props: any) => {

  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);
  const [clockwise, setClockwise] = useState(false);
  const [counterClk, setCounterclock] = useState(false);
  const [axis, setAxis] = useState(false);
  const [label, setLabel] = useState(false);
  const [showAxisAt, setshowAxisAt] = useState("apex");

  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__ternary_axis_labels")
  },[])
  const allListData = useRef({
    AxisShowType: getAxisShowAtTypes()
  })

  const checkLeft = () => {
    setLeft(!left)

  }
  const checkRight = () => {
    setRight(!right)
  }
  const checkClockwise = () => {
    setClockwise(!clockwise)
  }
  const checkCounterclock = () => {
    setCounterclock(!counterClk)
  }
  const checkAxis = () => {
    setAxis(!axis)
  }
  const checkLabel = () => {
    setLabel(!label)
  }
  const axisShowOnChange = (ev, item) => {
    setshowAxisAt(item.key)
  }
  const suffixChange = (ev,val)=>{

  }
  const prefixChange = (ev,val)=>{
    
  }

  console.log("minTerProp", props)
  return (
    <div className="insets-container maj-ter-lab">
      <div className="insets-header">
        <Label className="">
          Axis Title
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Show At</Label>
        <Dropdown
          selectedKey={showAxisAt}
          options={allListData.current.AxisShowType}
          onChange={axisShowOnChange}
          className={'ms-lg3'}
        />
      </div>
      <div className="insets-header">
        <Label className="">
          Minor Tick Labels
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Checkbox label="Left" onChange={checkLeft} checked={left} className="ms-lg3" disabled />
        <Checkbox label="Right" onChange={checkRight} checked={right} className="ms-lg3" disabled />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Checkbox label="Clockwise" onChange={checkClockwise} checked={clockwise} className="ms-lg3" disabled />
        <Checkbox label="Counter Clockwise" onChange={checkCounterclock} checked={counterClk} className="ms-lg6" disabled />
      </div>
      <div className="insets-header">
        <Label className="">
          Rotate With Axis
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Checkbox label="Axis Title" onChange={checkAxis} checked={axis} className="ms-lg3" disabled />
        <Checkbox label="Axis labels" onChange={checkLabel} checked={label} className="ms-lg3" disabled />
      </div>
      <div className="insets-header">
        <Label className="">
          Add To Minor Tick Labels
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Prefix</Label>
        <TextField name={`prefix`} type="number" className={'ms-lg5'} value="" onChange={(e,value)=>suffixChange(e,value)} disabled />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Sufix</Label>
        <TextField name={`sufix`} type="number" className={'ms-lg5'} value="" onChange={(e,value)=>prefixChange(e,value)} disabled />
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
export default connect(mapStateToProps, mapDispatchToProps)(MinorTernaryLabels);
