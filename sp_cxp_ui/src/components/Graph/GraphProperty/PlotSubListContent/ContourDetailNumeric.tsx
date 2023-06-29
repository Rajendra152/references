
import React,{ useEffect, useState, useRef } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { getNotationTypes } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";

const oraoptions = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];

const pricisionchoice:IDropdownOption[] = [
  { key: '1', text: 'Automatic'  },
  { key: '2', text: 'Manual' },
];


// const onRenderPlanesOption = (data) => {
//   return (    
//       <p>{"< 10"} <sup>{data.key}</sup></p>
    
//   );
// };

const useoption = getNotationTypes();
const placeOption = [];
for(let i=0; i<=15; i++){
  placeOption.push({ key: i, text: i },)
}

const numericValueStart=[];
for(let i=1; i<=15; i++){
  numericValueStart.push({ key: i, text: i },)
}



const ContourDetailNumeric = (props: any) => {
  console.log(props)
  
  const [useNot, setuseNot] = useState('power');

  useEffect(() => {
    // setuseNot(props.majTckProp.exponentformat);
    
  }, [props])

  const changeProperty = (newProps) => {
    // const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
    //  props.graphPropertyOnChange(newLayout,newProperties)
  }


  const notationOnChange = (ev, item) => {
    const newProps = {
    //   exponentformat:  item.key
    }

    changeProperty(newProps)
  }

  return (
    <div className="insets-container num-tick">
      <div className="insets-header">
        <Label className="" style={{paddingBottom:'1px',paddingTop:'1px'}}>
          Label Appearence
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">When Label is</Label>
        <Dropdown
          placeholder=">= 10^4"
          // styles={dropdownStyles}
          className={'ms-lg6'}
          disabled
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Or Above</Label>
        <Dropdown
          placeholder="<= 10^-4"
          options={oraoptions}
          // styles={dropdownStyles}
          className={'ms-lg6'}
          disabled
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        <Label className="ms-lg1">Use</Label>
        <Dropdown
          selectedKey={useNot}
          options={useoption}
          // styles={dropdownStyles}
          className={'ms-lg12'}
          onChange={notationOnChange}
          disabled
        />
      </div>
      <div className="insets-header">
        <Label className="" style={{paddingBottom:'1px',paddingTop:'1px'}}>
         Preceision
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
      <ChoiceGroup defaultSelectedKey="1" options={pricisionchoice} onChange=""  required={true} disabled/>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Place</Label>
        <Dropdown
          placeholder="1"
          options={placeOption}
          // styles={dropdownStyles}
          
          className={'ms-lg6'}
          disabled
        />
         <Label className="ms-lg3">Factor Out</Label>
        <Dropdown
          placeholder="1"
          options={placeOption}
          // styles={dropdownStyles}
          className={'ms-lg6'}
          disabled
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
       
      </div>
    </div>
  );
};

export default ContourDetailNumeric
