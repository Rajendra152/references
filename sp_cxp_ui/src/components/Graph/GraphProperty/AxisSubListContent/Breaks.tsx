import React,{useEffect} from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownStyles, IDropdownOption, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { MaskedTextField } from '@fluentui/react';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';

import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
const maskFormat: { [key: string]: RegExp } = {
    '*': /[0-9_]/,
};
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 120,height:24 } };
const suffix = ' in';
const min = 1.000;
const max = 100;
const options_dropdown1: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
];



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
    dropdown: { width: 120 },
};

const Breaks = (props:any) => {
    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__axis_breaks")
      },[])
    return (
        <div className="insets-container">
          <div className="insets-header">
            <Checkbox label="" checked disabled/>
            <Label >
              Show axis break
            </Label>
          </div>
          <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft:'5px' }}>
            <Label className="ms-lg2">Omit</Label>           
            <MaskedTextField mask="**" maskFormat={maskFormat} maskChar="" disabled className="ms-lg2" />
            <Label className="ms-lg2" style={{marginLeft:'10px' }}>To</Label>
            <MaskedTextField mask="**" maskFormat={maskFormat} maskChar="" disabled className="ms-lg2"/>
          </div>
          <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft:'5px' }}>          
            <Label className="ms-lg2">Position</Label>
            <SpinButton
                defaultValue={'computed'}
                min={min}
                max={max}
                onValidate={onValidate}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onChange={onChange}
                incrementButtonAriaLabel="Increase value by 2"
                decrementButtonAriaLabel="Decrease value by 2"
                styles={styles}
                disabled
                className="ms-lg2"
            />
          </div>
          <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft:'5px' }}>
            <Label className="ms-lg2">Gap width</Label>
            <SpinButton
                defaultValue={'1.000' + suffix}
                min={min}
                max={max}
                onValidate={onValidate}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onChange={onChange}
                incrementButtonAriaLabel="Increase value by 2"
                decrementButtonAriaLabel="Decrease value by 2"
                styles={styles}
                disabled
                className="ms-lg2"
            />
          </div>
          <div className={'d-flex align-items-center'} style={{ marginBottom: '0px', marginLeft:'5px' }}>
            <Label className="ms-lg5">Post break interval</Label>
            <MaskedTextField mask="**" maskFormat={maskFormat} maskChar="" disabled className="ms-lg2"/>
          </div>
          <div className="insets-header">
            <Label className="" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              Break symbol
            </Label>
          </div>
          <div className={'d-flex align-items-center'} style={{ marginBottom: '3px', marginLeft:'5px' }}>
              <Label className="ms-lg2">Symbol</Label>
              <Dropdown
                placeholder="red"
                options={options_dropdown1}
                disabled
                className="ms-lg2"
                styles={dropdownStyles}
            />
          </div>
          <div className={'d-flex align-items-center'} style={{ marginBottom: '3px', marginLeft:'5px' }}>     
              <Label className="ms-lg2">Length</Label>
              <SpinButton
                defaultValue={'0.005' + suffix}
                min={min}
                max={max}
                onValidate={onValidate}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onChange={onChange}
                incrementButtonAriaLabel="Increase value by 2"
                decrementButtonAriaLabel="Decrease value by 2"
                disabled
                styles={styles}
                className="ms-lg2"
            />
            </div>
          <div className={'d-flex align-items-center'} style={{ marginBottom: '3px', marginLeft:'5px' }}>
            <Label className="ms-lg2">Thickness</Label>
            <SpinButton
                defaultValue={'0.005' + suffix}
                min={min}
                max={max}
                onValidate={onValidate}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onChange={onChange}
                incrementButtonAriaLabel="Increase value by 2"
                decrementButtonAriaLabel="Decrease value by 2"
                styles={styles}
                disabled
                className="ms-lg2"
            />
          </div>
          <div className={'d-flex align-items-center'} style={{ marginBottom: '3px', marginLeft:'5px' }}>
            <Label className="ms-lg2">Color</Label>
            <ColorPickerComponent
                id="colorpicker"
                value={"color"}
                mode="Palette"
                change={(args) => console.log(args.value)}
                cssClass="e-hide-value"
            />
          </div>
        </div>
      );
}

  export default Breaks;
