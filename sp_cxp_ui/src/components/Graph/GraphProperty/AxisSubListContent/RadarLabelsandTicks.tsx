
import React, { useState, useEffect, useRef } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { getAllColor, getTickPosition, getTickInterval } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'
const legendarray = [{ value: "legend" }, { value: "legend" }, { value: "legend" }, { value: "legend" }, { value: "legend" }];
const Legendli = legendarray.map((legendvalue, index) =>
  <li>{legendvalue.value} {index + 1}</li>
);
const scltypeoptions = [
  { key: 'beforetext', text: 'Before Text', disabled: false },
  { key: 'aftertext', text: 'After Text', disabled: false },
];


const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };

let suffix = 'in';
let min = 0.005;
let max = 0.750;
let step = 0.005;

const getNumericPart = (value: string): number | undefined => {
  const valueRegex = /^(\d+(\.\d+)?).*/;
  if (valueRegex.test(value)) {
    const numericValue = Number(value.replace(valueRegex, '$1'));
    return isNaN(numericValue) ? undefined : numericValue;
  }
  return undefined;
};

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


const colorOptions: IDropdownOption[] = getAllColor();
const tickPositionOptions: IDropdownOption[] = getTickPosition();

const RadarLabelsandTicks = (props: any) => {
  console.log("Radr Plot--- ", props)
  const [length, setLength] = useState(props.majorLabel.ticklen);
  const [thickness, setThickness] = useState(props.majorLabel.tickwidth);
  const [color, setColor] = useState(props.majorLabel.tickcolor);
  const [tickPosition, settickPosition] = useState(props.majorLabel.ticks);
  const [tickPrefix, setTickPrefix] = useState(props.majorLabel.tickprefix);
  const [tickSuffix, setTickSuffix] = useState(props.majorLabel.ticksuffix);
  const [showticklabels, setShowticklabels] = useState(props.majorLabel.showticklabels);


  useEffect(() => {
    suffix = props.properties?.defaultUnit;
    [max, min] = get_MIN_MAX(suffix)
    step = get_Step(suffix)
    setColor(props.majorLabel.tickcolor);
    let wid = convert_To_mmInchPoints(suffix, props.majorLabel.tickwidth);
    setThickness(wid);

    let len = convert_To_mmInchPoints(suffix, props.majorLabel.ticklen);
    setLength(len);
    setTickPrefix(props.majorLabel.tickprefix)
    setTickSuffix(props.majorLabel.ticksuffix)
    settickPosition(props.majorLabel.ticks);
    setShowticklabels(props.majorLabel.showticklabels);

  }, [props])

  const changeProperties = (newProps) => {
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
    console.log(newLayout)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

  const prefixOnChange = (ev, value) => {
    const newProps = {
      ...props.majorLabel,
      tickprefix: value
    }

    changeProperties(newProps);
  }

  const sufixOnChange = (ev, value) => {
    const newProps = {
      ...props.majorLabel,
      ticksuffix: value
    }

    changeProperties(newProps);
  }

  const colorOnChange = (value:any) => {
    const newProps = {
      tickcolor: value,
      ticklen: props.majorLabel.ticklen + 0.0001

    }
    changeProperties(newProps);
  }

  const ticksOnChange = (ev, item) => {
    const newProps = {
      ticks: item.key

    }
    changeProperties(newProps);
  }

  /** Increment the value (or return nothing to keep the previous value if invalid) */
  const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any = Math.min(numericValue + step, max);
      if (name === "ticklen") {
        tickLengthOnChange(finalValue)
      }
      if (name === "tickwidth") {
        tickWidthOnChange(finalValue)
      }
      finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
      console.log(finalValue)
      return finalValue
    }
  };

  /** Decrement the value (or return nothing to keep the previous value if invalid) */
  const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any = Math.max(numericValue - step, min);
      if (name === "ticklen") {
        tickLengthOnChange(finalValue)
      }
      if (name === "tickwidth") {
        tickWidthOnChange(finalValue)
      }
      finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
      return finalValue
    };
  }

  const tickLengthOnChange = (value) => {
    const newProps = {
      ...props.majorLabel,
      ticklen: convert_To_Pixel(suffix, value),

    }
    changeProperties(newProps);
  }

  const tickWidthOnChange = (value) => {
    const newProps = {
      ...props.majorLabel,
      tickwidth: convert_To_Pixel(suffix, value),
      ticklen: props.majorLabel.ticklen + 0.0001

    }
    changeProperties(newProps);
  }

  const showTickOnChnage = (ev, value) => {
    console.log(value, "$$$$$$$$$$$$$$$$$$$$")
    const newProps = {
      showticklabels: value

    }
    changeProperties(newProps);
  }

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label className="">
          Tick Lines
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        <div className="ms-Grid-col ms-sm4">
          <Label>Length</Label>
        </div>
        <div className="ms-Grid-col ms-sm8">
          <SpinButton
            value={length + suffix}
            min={min}
            max={max}
            onValidate={onValidate}
            onIncrement={(value, ev) => onIncrement(value, ev, "ticklen")}
            onDecrement={(value, ev) => onDecrement(value, ev, "ticklen")}
            onChange={onChange}
            incrementButtonAriaLabel="Increase value by 2"
            decrementButtonAriaLabel="Decrease value by 2"
            styles={styles}
          />
        </div>

      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        <div className="ms-Grid-col ms-sm4">
          <Label>Thickness</Label>
        </div>
        <div className="ms-Grid-col ms-sm8">
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
          />
        </div>

      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        <div className="ms-Grid-col ms-sm4">
          <Label>Color</Label>
        </div>
        <div className="ms-Grid-col ms-sm8">
        <ColorPickerComponent
            id="colorpicker"
            value={color}
            mode="Palette"
            change={(args) => colorOnChange(args.value)}
            cssClass="e-hide-value"
          />
        </div>

      </div>
      <div className="insets-header">
        <Label className="">
          Direction
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        <div className="ms-Grid-col ms-sm4">
          <Label>Outer</Label>
        </div>
        <div className="ms-Grid-col ms-sm8">
          <Dropdown
            selectedKey={tickPosition}
            options={tickPositionOptions}
            onChange={ticksOnChange}
            styles={dropdownStyles}
          />
        </div>

      </div>
      <div className="insets-header">
        <Label className="">
          Major Tick Label
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        <div className="ms-Grid-col ms-sm4">
          <Checkbox label="Outer" checked={showticklabels} onChange={showTickOnChnage} />
        </div>

      </div>
      <div className="insets-header">
        <Label className="">
          Add To Major Tick Labels
        </Label>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '5px' }}>
        <div className="ms-Grid-col ms-sm4">
          <Label>Prefix</Label>
        </div>
        <div className="ms-Grid-col ms-sm8">
          <TextField name={`prefix`} type="text" className={'ms-lg10'} value={tickPrefix} onChange={prefixOnChange} />
        </div>
      </div>
      <div className={'d-flex'} style={{ marginBottom: '0px' }}>
        <div className="ms-Grid-col ms-sm4">
          <Label>Suffix</Label>
        </div>
        <div className="ms-Grid-col ms-sm8">
          <TextField name={`sufix`} type="text" className={'ms-lg10'} value={tickSuffix} onChange={sufixOnChange} />
        </div>
      </div>
    </div>
  );
};

export default RadarLabelsandTicks
