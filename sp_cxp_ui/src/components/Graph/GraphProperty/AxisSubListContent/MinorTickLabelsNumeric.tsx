
import React,{useState} from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { getNotationTypes } from "../../../../utils/graphDailogProperty/differentPropertyList";

const oraoptions = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];

const useoption = getNotationTypes();

const pricisionchoice = [
  { key: '1', text: 'Automatic' },
  { key: '2', text: 'Manual' },
];

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100 },
  callout:{maxHeight:250, overflowY:'auto'}
};

const usedropdownStyles: Partial<IDropdownStyles> = {
  callout:{maxHeight:250, overflowY:'auto'}
};

const placeOption = [];
for(let i=0; i<=15; i++){
  placeOption.push({ key: i, text: i },)
}

const MinorTickLabelsNumeric = (props: any) => {
  const [useNot, setuseNot] = useState("power");

  return (
    <div className="insets-container num-tick">
      <div className="insets-header">
        <Label className="">
          Label Appearence
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">When Label is</Label>
        <Dropdown
          placeholder=">= 10^4"
          // styles={dropdownStyles}
          className={'ms-lg6'}
          disabled
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Or Above</Label>
        <Dropdown
          placeholder="<= 10^-4"
          options={oraoptions}
          // styles={dropdownStyles}
          className={'ms-lg6'}
          disabled
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '0px' }}>
        <Label className="ms-lg1">Use</Label>
        <Dropdown
          selectedKey={useNot}
          options={useoption}
          styles={usedropdownStyles}
          className={'ms-lg12'}
          // onChange={notationOnChange}
          disabled
        />
      </div>
      <div className="insets-header">
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
      </div>
    </div>
  );
};

export default MinorTickLabelsNumeric
