import React, { useEffect, useState, useRef } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

import { getAllColor } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'


const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height:24 } };
let suffix = 'in';
let min = 0.005;
let max = 0.750;
let step= 0.005;
// By default the field grows to fit available width. Constrain the width instead.

/** Remove the suffix or any other text after the numbers, or return undefined if not a number */
const getNumericPart = (value: string): number | undefined => {
  const valueRegex = /^(\d+(\.\d+)?).*/;
  if (valueRegex.test(value)) {
    const numericValue = Number(value.replace(valueRegex, '$1'));
    return isNaN(numericValue) ? undefined : numericValue;
  }
  return undefined;
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
  dropdown: { width: 100 },
};

const PolarAngularLines = (props:any) => {
  console.log(props)
    const [lineColor, setLineColor] = useState(props.linesProp.linecolor);
    const [linethickness, setThickness] = useState(props.linesProp.linewidth);
    const allListData = useRef({
        colorOptions: getAllColor(),
    })


    useEffect(() => {
        suffix = props.properties?.defaultUnit;
        [max, min] = get_MIN_MAX(suffix)
        step = get_Step(suffix)
        let wid = convert_To_mmInchPoints(suffix, props.linesProp.linewidth);
        setThickness(wid);
        setLineColor(props.linesProp.linecolor)
    }, [props])


    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.min(numericValue + step, max);
            thicknessOnChange(finalValue)
            finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
            console.log(finalValue)
            return finalValue
        }
    };

    const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.max(numericValue - step, min);
            thicknessOnChange(finalValue)
            finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
            return finalValue
        };
    }

    const thicknessOnChange = (value) => {
        const newProps = {
            linewidth: convert_To_Pixel(suffix, value)
        }

        const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

    const colorOnChange = (value) => {

        const newProps = {
            linecolor: value
        }
        console.log(newProps)

        const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
        props.graphPropertyOnChange(newLayout, newProperties)
    }


  return (
    <div className="insets-container fills">
      {/* <div className="insets-header">
        <Label className="">
          Show/Place Axis Lines
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Checkbox label="" checked  disabled/>
        <Label className="ms-lg2">Outer</Label>
      </div>

      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '20px' }}>
        <Label className="ms-lg2">Position</Label>
        <SpinButton
            label=""
            defaultValue="Normal"
            min={0}
            max={100}
            step={1}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
            styles={styles}
            disabled
          />
      </div> */}
      
      {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Checkbox label="" checked  disabled/>
        <Label className="ms-lg2">Inner</Label>
      </div>

      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '20px' }}>
        <Label className="ms-lg2">Position</Label>
        <SpinButton
            label=""
            defaultValue="Normal"
            min={0}
            max={100}
            step={1}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
            styles={styles}
            disabled
          />
      </div>
       */}
      <div className="insets-header">
        <Label className="">
          Line properties
        </Label>
      </div>

      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          value={lineColor}
          mode="Palette"
          change={(args) => colorOnChange(args.value)}
          cssClass="e-hide-value"
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Thickness</Label>
        <SpinButton
            label=""
            value={linethickness + suffix}
            min={min}
            max={max}
            onValidate={onValidate}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onChange={onChange}
            incrementButtonAriaLabel="Increase value by 0.005"
            decrementButtonAriaLabel="Decrease value by 0.005"
            styles={styles}
            className="ms-lg2"
          />
      </div>

    </div>
  )
}
export default PolarAngularLines