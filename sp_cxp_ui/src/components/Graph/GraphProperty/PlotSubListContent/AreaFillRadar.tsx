import React, { useState, useEffect } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

import { getAllColor, getFillDirection } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getAreaFillsModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'



const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200 },
};
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100 } };
const suffix = ' °';
const min = 0;
const max = 100;
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



const colorOptions: IDropdownOption[] = getAllColor();
const directionOptions: IDropdownOption[] = getFillDirection();

const Areafill = (props) => {
  console.log(props)
  const [color, setColor] = useState(props.areaProp.fillcolor);
  const [Identify, setIdentify] = useState(true);
  const [gradient, setgradient] = useState(true);
  const [endColor, setEndColor] = useState("white ");
  const [angle, setAngle] = useState("black");
  const [style, setStyle] = useState("Solid");
  const [direction, setDirection] = useState(props.areaProp.fill==="none" ? "tozeroy":props.areaProp.fill);


  const changeProperties = (newProps) => {
    const [newLayout, newProperties] = getAreaFillsModifiedJSON(newProps, props.properties, props.layout)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  const colorOnChange = (value) => {
    const newProps = {
      areaFills: {
        ...props.areaProp,
        fillcolor:value,
        fill: value === "white " ? "none" : "toself"
      }
    }
    setColor(value);
    changeProperties(newProps);
    
  }

  const directionOnChange = (ev, item) => {
    const newProps = {
      areaFills: {
        ...props.areaProp,
        fill:item.key
      }
    }
    setDirection(item.key);
    changeProperties(newProps);
  }

  return (
    <div className="insets-container area-fills">
      <div className="insets-header">
        <Label className="">
          Fill color
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          value={color}
          mode="Palette"
          change={(args) => colorOnChange(args.value)}
          cssClass="e-hide-value"
        />
      </div>
      {/* <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Fill Color Scheme</Label>
        <Dropdown
            defaultValue="Black Body"
            selectedKey={symbol}
            options={symbolOptions}
            styles={dropdownStyles}
            onRenderOption={onRenderSymbolOption}
            onChange={symbolOnChange}
            className="ms-lg2"
            />
        </div> */}
      
      {/* <div className="insets-header">
        <Label className="">Gradient</Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Checkbox
          label=""
          checked={gradient}
          disabled={true} />
        <Label className="ms-lg5">Use gradient</Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">End Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          value={endColor}
          mode="Palette"
          change={(args) => colorOnChange(args.value)}
          cssClass="e-hide-value"
          disabled
        />
      </div>
      <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Fill Color Scheme</Label>
        <Dropdown
            defaultValue="Black Body"
            selectedKey={symbol}
            options={symbolOptions}
            styles={dropdownStyles}
            onRenderOption={onRenderSymbolOption}
            onChange={symbolOnChange}
            className="ms-lg2"
            />
        </div>
      <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Angle</Label>
        <SpinButton
          label=""
          defaultValue={'270' + suffix}
          min={min}
          max={max}
          onValidate={onValidate}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onChange={onChange}
          incrementButtonAriaLabel="Increase value by 2"
          decrementButtonAriaLabel="Decrease value by 2"
          styles={styles}
          disabled={true}
          className="ms-lg2"
        />
      </div> */}

      {/* <div className="insets-header">
        <Label className="">Pattern</Label>
      </div>

      <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
        <Label className="ms-lg2">Style</Label>
        <Dropdown
          placeholder="(None)"
          // selectedKey={style}
          options={directionOptions}
          styles={dropdownStyles}
          className={'ms-lg2'}
          disabled={true}
        // onChange={colorOnChange}
        />
      </div> */}

      
    </div>
  )
}
export default Areafill