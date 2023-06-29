import React,{ useState, useRef,useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownStyles, IDropdownOption, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { MaskedTextField } from '@fluentui/react';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { getAllScaleType, getScaleRangeCalc } from "../../../../utils/graphDailogProperty/differentPropertyList";

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';
const maskFormat: { [key: string]: RegExp } = {
    '*': /[0-9_]/,
};
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 114, height: 15 } };
const suffix = ' in';
const min = 1.000;
const max = 100;





/** Remove the suffix or any other text after the numbers, or return undefined if not a number */
const getNumericPart = (value: string): number | undefined => {
    const valueRegex = /^(\d+(\.\d+)?).*/;
    if (valueRegex.test(value)) {
        const numericValue = Number(value.replace(valueRegex, '$1'));
        return isNaN(numericValue) ? undefined : numericValue;
    }
    return undefined;
};

/** Increment the value (or return nothing to keep the previous value if invalid) */
const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
        return String(Math.min(numericValue + 2, max)) + suffix;
    }
};

/** Decrement the value (or return nothing to keep the previous value if invalid) */
const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
        return String(Math.max(numericValue - 2, min)) + suffix;
    }
};

/**
* Clamp the value within the valid range (or return nothing to keep the previous value
* if there's not valid numeric input)
*/
const onValidate = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    let numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
        numericValue = Math.min(numericValue, max);
        numericValue = Math.max(numericValue, min);
        return String(numericValue) + suffix;
    }
};
/** This will be called after each change */
const onChange = (event: React.SyntheticEvent<HTMLElement>, value?: string): void => {
    console.log('Value changed to ' + value);
};



const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
  callout:{maxHeight:200, overflowY:'auto'}
};

const appyToOption: IDropdownOption[] = [
  { key: 'major', text: 'Major',disabled:true},
  { key: 'minor', text: 'Minor', disabled:true },
];


const CounterScale = (props:any) => {
  console.log('Scale--> ',props)

  const [scaleType, setScaleType] = useState('linear')
  const [applyTo, setApplyTo] = useState('major')
  const [start, setstart] = useState(0)
  const [startCalc, setstartCalc] = useState('dataRange')
  const [end, setEnd] = useState('')
  const [endCalc, setEndCalc] = useState('dataRange')
  const [interval, setInterval] = useState(1)

  const allListData = useRef({
    allScaleType: getAllScaleType(),
    allRangeCalc: getScaleRangeCalc()
  })
  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__contour_scale")
  },[])
    return (
        <div className="insets-container">
        <div className="insets-header">
          <Label className="">
            Scale Type
          </Label>
        </div>
        <div className={'d-flex'}>
          <Label className="ms-lg3">Scale Type</Label>
          <Dropdown
            defaultSelectedKey={scaleType}
            // selectedKey={scaleType}
            options={allListData.current.allScaleType}
            styles={dropdownStyles}
            // onChange={scaleTypeOnChange}
            disabled
          />
        </div>
        <div className={'d-flex'}>
          <Label className="ms-lg3">Apply To</Label>
          <Dropdown
            selectedKey={applyTo}
            options={appyToOption}
            // className={'ms-lg7'}
            // onChange={scaleTypeOnChange}
            styles={dropdownStyles}
          />
        </div>
        
        <div className="insets-header">
          <Label className="">
            Range
          </Label>
        </div>
        <div className={'d-flex'} style={{ marginBottom: '2px' }}>
          <Label className="ms-lg2">Start</Label>
          <TextField name={`start`} 
                type="number" 
                className={'ms-lg3 text-s'} 
                value={start}
                // disabled={startCal==="dataRange" ? true: false}
                // onChange= {startRangeOnChange} 
                disabled
                />
        </div>
        <div className={'d-flex'} style={{ marginBottom: '2px' }}>
          <Label className="ms-lg3">Calculation</Label>
          <Dropdown
            selectedKey={startCalc}
            options={allListData.current.allRangeCalc}
            className={'ms-lg5'}
            // onChange={calcOnChange}
            disabled
          />
        </div>
        <div className={'d-flex'} style={{ marginBottom: '2px' }}>
          <Label className="ms-lg2">End</Label>
          <TextField name={`end`} 
                type="number" 
                className={'ms-lg3 text-s'} 
                // value={endRange} 
                // disabled={startCal==="dataRange" ? true: false}
                // onChange= {endRangeOnChange} 
                disabled
                />
        </div>
        <div className={'d-flex'} style={{ marginBottom: '2px' }}>
          <Label className="ms-lg3">Calculation</Label>
          <Dropdown
            selectedKey={endCalc}
            options={allListData.current.allRangeCalc}
            className={'ms-lg5'}
            // onChange={calcOnChange}
            disabled
          />      </div>
        <div className={'d-flex check-scale'} style={{ marginBottom: '2px' }}>
          <Checkbox label="Pad 5%   "   disabled = {true} onChange="" />
        </div>
        <div className={'d-flex check-scale'} style={{ marginBottom: '2px' }}>
          <Checkbox label="Nearest Tick" disabled = {true}  onChange="" />
        </div>
        <div className="insets-header">
          <Label className="">
            Line Intervals
          </Label>
        </div>
        <div className={'d-flex'}>
          <Label className="ms-lg3">Minor lines</Label>
          <Dropdown
            placeholder='1'
            // options={allListData.current.allScaleType}
            className={'ms-lg5'}
            // onChange={scaleTypeOnChange}
            disabled
          />
        </div>
        
      </div>
      )
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CounterScale);
