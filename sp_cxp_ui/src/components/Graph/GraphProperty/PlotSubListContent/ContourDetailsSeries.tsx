
import React from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown,IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';

const whlioptions = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];

const oraoptions = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];

const showat = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];
const useoption = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 ,height:22 },
};






const ContourDetailSeries = (props: any) => {

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
          Label Format
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Series</Label>
        <Dropdown
          placeholder="Months"
          options={whlioptions}
          styles={dropdownStyles}
          className={'ms-lg4'}
          disabled
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Length</Label>
        <Dropdown
          placeholder="9 characters"
          options={oraoptions}
          styles={dropdownStyles}
          className={'ms-lg4'}
          disabled
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Start At</Label>
        <Dropdown
          placeholder="January"
          options={useoption}
          styles={dropdownStyles}
          className={'ms-lg4'}
          disabled
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Step By</Label>
        <Dropdown
          placeholder="1"
          options={useoption}
          styles={dropdownStyles}
          className={'ms-lg2'}
          disabled
        />
        <Label className="ms-lg3">months</Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">After</Label>
        <Dropdown
          placeholder="December"
          options={useoption}
          styles={dropdownStyles}
          className={'ms-lg4'}
          disabled
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px' }}>
        <Label className="ms-lg3">Repeat</Label>
        <Dropdown
          placeholder="January"
          options={useoption}
          styles={dropdownStyles}
          className={'ms-lg4'}
          disabled
        />
      </div>
    
    </div>
  );
};

export default ContourDetailSeries
