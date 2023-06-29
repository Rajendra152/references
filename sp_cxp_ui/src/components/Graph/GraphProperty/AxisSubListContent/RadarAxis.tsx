import React, { useEffect, useState, useRef } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

import { getAllColor } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'



const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
let suffix = 'in';
let min = 0.005;
let max = 0.750;
const suffixDeg = ' °';
const minDeg = 0;
const maxDeg = 360;
let step = 0.005;
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
  dropdown: { width: 100, height: 32 },
};


const colorOptions: IDropdownOption[] = getAllColor();

const RadarAxis = (props: any) => {

  const [thickness, setThickness] = useState(props.linesProp.gridwidth);
  const [color, setColor] = useState(props.linesProp.gridcolor);
  const [showLine, setShowLine] = useState(props.linesProp.showline);
  const [angle, setAngle] = useState(props.linesProp.angle);
  const [axesStart, setAxesStart] = useState("Normal");

  useEffect(() => {
    suffix = props.properties?.defaultUnit;
    [max, min] = get_MIN_MAX(suffix)
    step = get_Step(suffix)
    setColor(props.linesProp.gridcolor);
    let wid = convert_To_mmInchPoints(suffix, props.linesProp.gridwidth);
    setThickness(wid);
    setShowLine(props.linesProp.showline);
    setAngle(props.linesProp.angle);

  }, [props])

  const changeProperties = (newProps) => {
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  /** Increment the value (or return nothing to keep the previous value if invalid) */
  const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any;
      if (name === "angle") {
        finalValue = Math.min(numericValue + 1, maxDeg);
        angleOnChnage(finalValue)
        finalValue = String(finalValue) + suffixDeg;
      }
      if (name === "tickwidth") {
        finalValue = Math.min(numericValue +step, max);
        tickWidthOnChange(finalValue)
        finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
      }

      console.log(finalValue)
      return finalValue
    }
  };

  /** Decrement the value (or return nothing to keep the previous value if invalid) */
  const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any;
      if (name === "angle") {
        finalValue = Math.max(numericValue - 1, minDeg);
        angleOnChnage(finalValue)
        finalValue = String(finalValue) + suffixDeg;
      }
      if (name === "tickwidth") {
        finalValue = Math.max(numericValue - step, min);
        tickWidthOnChange(finalValue)
        finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
      }
      return finalValue
    };
  }

  const tickWidthOnChange = (value) => {
    const newProps = {
      gridwidth: convert_To_Pixel(suffix, value),
    }
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, "angularaxis")
    props.graphPropertyOnChange(newLayout, newProperties)

  }

  const colorOnChange = (value: any) => {
    const newProps = {
      gridcolor: value,
    }
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, "angularaxis")
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  const showLineOnChnage = (ev, value) => {
    const newProps = {
      showline: value
    }
    changeProperties(newProps);
  }

  const angleOnChnage = (value) => {
    const newProps = {
      angle: value
    }
    changeProperties(newProps);
  }

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
          Show Radar Axis
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
        <Checkbox label=""
          checked={showLine} onChange={showLineOnChnage}
        />
        <Label className="">
          Axis
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Position</Label>
        <SpinButton
          value={angle + suffixDeg}
          min={minDeg}
          max={maxDeg}
          onValidate={onValidate}
          onIncrement={(value, ev) => onIncrement(value, ev, "angle")}
          onDecrement={(value, ev) => onDecrement(value, ev, "angle")}
          onChange={onChange}
          incrementButtonAriaLabel="Increase value by 1"
          decrementButtonAriaLabel="Decrease value by 1"
          styles={styles}
          className="ms-lg2"
        />

      </div>
      {/* <Label className="ms-lg2">
        Axes Start
      </Label>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
          <Label className="ms-lg2">Position</Label>
          <SpinButton
            // value={axesStart + suffix}
            value={axesStart}
            min={min}
            max={max}
            onValidate={onValidate}
            onIncrement={(value, ev) => onIncrement(value, ev, "startangle")}
            onDecrement={(value, ev) => onDecrement(value, ev, "startangle")}
            onChange={onChange}
            incrementButtonAriaLabel="Increase value by 2"
            decrementButtonAriaLabel="Decrease value by 2"
            styles={styles}
            disabled
            className="ms-lg2"
          />
      </div> */}

      <div className="insets-header">
        <Label className="">
          Line Properties
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          value={color}
          mode="Palette"
          change={(args) => colorOnChange(args.value)}
          cssClass="e-hide-value"
        />

      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Thickness</Label>
        <SpinButton
          value={thickness + suffix}
          min={min}
          max={max}
          onValidate={onValidate}
          onIncrement={(value, ev) => onIncrement(value, ev, "tickwidth")}
          onDecrement={(value, ev) => onDecrement(value, ev, "tickwidth")}
          onChange={onChange}
          incrementButtonAriaLabel="Increase value by 2"
          decrementButtonAriaLabel="Decrease value by 2"
          styles={styles}
          className="ms-lg2"
        />

      </div>
    </div>
  )
}
export default RadarAxis