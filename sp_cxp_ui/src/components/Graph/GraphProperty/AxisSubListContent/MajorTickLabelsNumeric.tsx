
import React,{ useEffect, useState, useRef } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownOption ,IDropdownStyles} from '@fluentui/react/lib/Dropdown';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { getNotationTypes } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";

const oraoptions = [
  { key: '-4', text: '<= 10^-4', disabled: false },
  { key: '-3', text: '<= 10^-3', disabled: false },
  { key: '-2', text: '<= 10^-2', disabled: false },
  { key: '-1', text: '<= 10^-1', disabled: false },
  { key: '0', text: '<= 10^0', disabled: false },
];

const pricisionchoice:IDropdownOption[] = [
  { key: '1', text: 'Automatic'  },
  { key: '2', text: 'Manual' },
];

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200 },
 // callout:{maxHeight:250, overflowY:'auto'}
};


const useoption = getNotationTypes();
const placeOption = [];
for(let i=0; i<=15; i++){
  placeOption.push({ key: i, text: i },)
}

const numericValueStart=[];
for(let i=1; i<=15; i++){
  numericValueStart.push({ key: i, text: i },)
}
const MajorTickLabelsNumeric = (props: any) => {
  console.log(props)
  
  const [useNot, setuseNot] = useState(props.majTckProp.exponentformat);

  useEffect(() => {
    setuseNot(props.majTckProp.exponentformat);
    
  }, [props])

  const changeProperty = (newProps) => {
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
     props.graphPropertyOnChange(newLayout,newProperties)
  }


  const notationOnChange = (ev, item) => {
    const newProps = {
      ...props.majTckProp,
      exponentformat:  item.key
    }

    changeProperty(newProps)
  }

  return (
    <div className="insets-container num-tick">
      <div className="insets-header">
        <Label className="">
          Label Appearence
        </Label>
      </div>
      {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">When Label is</Label>
        <Dropdown
          placeholder=">= 10^4"
          options={oraoptions}
          styles={dropdownStyles}
          className={'ms-lg6'}
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Or Above</Label>
        <Dropdown
          placeholder="<= 10^-4"
          options={oraoptions}
          styles={dropdownStyles}
          className={'ms-lg6'}
        />
      </div> */}
      <div className={'d-flex align-items-center'} style={{ marginBottom: '0px' }}>
        <Label className="ms-lg1" style={{marginRight:'10px'}}>Use</Label>
        <Dropdown
          selectedKey={useNot}
          options={useoption}
           styles={dropdownStyles}
          className={'ms-lg12'}
          onChange={notationOnChange}
        />
      </div>
      {/* <div className="insets-header">
        <Label>
         Precision
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '0px' }}>
      <ChoiceGroup defaultSelectedKey="1" options={pricisionchoice} onChange=""  required={true} disabled/>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Places</Label>
        <Dropdown
          placeholder="1"
          options={placeOption}
          styles={dropdownStyles}         
          className={'ms-lg3'}
          disabled
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
          <Label className="ms-lg3">Factor Out</Label>
          <Dropdown
            placeholder="1"
            options={placeOption}
            styles={dropdownStyles}
            className={'ms-lg3'}
            disabled
          />
      </div> */}
    </div>
  );
};

export default MajorTickLabelsNumeric
