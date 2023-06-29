import React, { useEffect,useState } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
  DropdownMenuItemType,
} from '@fluentui/react/lib/Dropdown';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';

import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { getAllDropLineDash } from '../../../../utils/graphDailogProperty/differentPropertyList';
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'
const maskFormat: { [key: string]: RegExp } = {
  '*': /[0-9_]/,
};
const styles: Partial<ISpinButtonStyles> = {
  spinButtonWrapper: { width: 150, height:25, },
};
let suffix = 'in';
let min = 0.005;
let max = 0.750;
let step=0.005;
const options_dropdown1: IDropdownOption[] = [
  {
    key: 'fruitsHeader',
    text: 'Fruits',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
];
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
  callout: { maxHeight: 250, overflowY: 'auto' },
};

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


/**
 * Clamp the value within the valid range (or return nothing to keep the previous value
 * if there's not valid numeric input)
 */
const onValidate = (
  value: string,
  event?: React.SyntheticEvent<HTMLElement>
): string | void => {
  let numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    numericValue = Math.min(numericValue, max);
    numericValue = Math.max(numericValue, min);
    return String(numericValue) + suffix;
  }
};
/** This will be called after each change */
const onChange = (
  event: React.SyntheticEvent<HTMLElement>,
  value?: string
): void => {
  console.log('Value changed to ' + value);
};

type DroplinesProps = {
  layout: any;
  properties: any;
  graphPropertyOnChange: Function;
  OpenHelpWindow: Function;
  dropProp?:any;
};

export type DroplinesAxis = {
  visible: boolean;
  type: string;
  thickness: number;
  color: string;
};

type Droplines = {
  xaxis: DroplinesAxis;
  yaxis: DroplinesAxis;
};

const Droplines = ({
  layout,
  properties,
  graphPropertyOnChange,
  OpenHelpWindow,
  dropProp,
}: DroplinesProps) => {

  const [xThickness, setXThickness] = useState(dropProp.xaxis.thickness);
  const [yThickness, setYThickness] = useState(dropProp.yaxis.thickness);

  useEffect(() => {
    suffix = properties?.defaultUnit;
    [max, min] = get_MIN_MAX(suffix)
    step = get_Step(suffix)
    let xwid = convert_To_mmInchPoints(suffix, dropProp.xaxis.thickness)
    setXThickness(xwid);

    let len = convert_To_mmInchPoints(suffix, dropProp.yaxis.thickness)
    setYThickness(len);

  }, [dropProp,properties.defaultUnit])


  console.log(dropProp, "dropProp")
  useEffect(() => {
    OpenHelpWindow(
      'wbasics',
      'pub_dtlgraph_properties__graph',
      'graph_properties__mesh'
    );
  }, []);
  const droplines: Droplines = layout?.droplines ?? {
    xaxis: {
      visible: dropProp.xaxis.visible,
      type: dropProp.xaxis.type,
      thickness: dropProp.xaxis.thickness,
      color: dropProp.xaxis.color,
    },
    yaxis: {
      visible: dropProp.yaxis.visible,
      type: dropProp.yaxis.type,
      thickness: dropProp.yaxis.thickness,
      color: dropProp.yaxis.color,
    },
  };

  const { xaxis, yaxis } = droplines;

  const droplinesOnChange = (newDroplines: Partial<Droplines>) => {
    graphPropertyOnChange(
      { ...layout, droplines: { ...droplines, ...newDroplines } },
      properties
    );
  };

 /** Increment the value (or return nothing to keep the previous value if invalid) */
 const onIncrement = (value: string, axis?:any): string | void => {
  const numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
      let finalValue: any = Math.min(numericValue + step, max);
      thicknessOnChange(finalValue,axis)
      finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
      console.log(finalValue)
      return finalValue
  }
};

/** Decrement the value (or return nothing to keep the previous value if invalid) */
const onDecrement = (value: string, axis?:any): string | void => {
  const numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
      let finalValue: any = Math.max(numericValue - step, min);
      thicknessOnChange(finalValue, axis)
      finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
      return finalValue
  };
}

const thicknessOnChange = (finalValue, axis) => {
  console.log(finalValue, "finalValue")
  console.log((finalValue * 1000) / 10, "finalValue")

  if(axis=='yaxis'){
    droplinesOnChange({
      yaxis: { ...yaxis, thickness: convert_To_Pixel(suffix, finalValue)},
    })
  }
  else{
    droplinesOnChange({
      xaxis: { ...xaxis, thickness: convert_To_Pixel(suffix, finalValue) },
    })
  }
  
}
  return (
    <div className="insets-container dropline">
        <div className="insets-header">
          <Checkbox
            checked={yaxis.visible}
            onChange={(_, checked) =>
              droplinesOnChange({ yaxis: { ...yaxis, visible: !!checked } })
            }
          />
          <Label style={{ paddingLeft: '0px' }}>Vertical lines</Label>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4">
            <Label>Style</Label>
          </div>
          <div className="ms-Grid-col ms-sm8">
            <Dropdown
              options={getAllDropLineDash()}
              selectedKey={yaxis.type}
              styles={dropdownStyles}
              onChange={(_, item) =>
                droplinesOnChange({
                  yaxis: { ...yaxis, type: item?.key as string, visible: item?.key == 'none' ? false :true },
                })
              }
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4">
            <Label>Thickness</Label>
          </div>
          <div className="ms-Grid-col ms-sm8">
            <SpinButton
              value={yThickness + suffix}
              min={min}
              max={max}
              // step={0.1}
              onIncrement={(value) =>onIncrement(value, 'yaxis')}
              onDecrement={(value) =>onDecrement(value, 'yaxis')}
              incrementButtonAriaLabel="Increase value by 2"
              decrementButtonAriaLabel="Decrease value by 2"
              styles={styles}
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm8 ">
                <Label>Color</Label>
              </div>
              <div className="ms-Grid-col ms-sm1"></div>
              <div className="ms-Grid-col ms-sm3 gap">
                <ColorPickerComponent
                  id="colorpicker"
                  value={yaxis.color}
                  mode="Palette"
                  change={(args) =>
                    droplinesOnChange({
                      yaxis: { ...yaxis, color: args.value },
                    })
                  }
                  cssClass="e-hide-value"
                />
              </div>
            </div>
          </div>
          {/* <div className="ms-Grid-col ms-sm6">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6">
                <Label>Gap color</Label>
              </div>
              <div className="ms-Grid-col gap ms-sm5">
                <ColorPickerComponent
                  id="colorpicker"
                  value="#4db6acff"
                  mode="Palette"
                  change={(args) => console.log(args.value)}
                  cssClass="e-hide-value"
                  disabled
                />
              </div>
            </div>
          </div> */}
        </div>
        <div>
        <div className="insets-header" style={{display:"none"}}>
          <Checkbox label="" checked disabled />
          <Label style={{ paddingLeft: '0px' }}>ZX lines</Label>
        </div>
        <div className="ms-Grid-row" style={{display:"none"}}>
          <div className="ms-Grid-col ms-sm4">
            <Label>Style</Label>
          </div>
          <div className="ms-Grid-col ms-sm8">
            <Dropdown
              options={getAllDropLineDash()}
              // selectedKey={planeColor}
              styles={dropdownStyles}
              placeholder="Solid"
              // onChange={colorOnChange}
              disabled
            />
          </div>
        </div>
        <div className="ms-Grid-row" style={{display:"none"}}>
          <div className="ms-Grid-col ms-sm4">
            <Label>Thickness</Label>
          </div>
          <div className="ms-Grid-col ms-sm8">
            <SpinButton
              value={xThickness + suffix}
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
            />
          </div>
        </div>
        <div className="ms-Grid-row" style={{display:"none"}}>
          <div className="ms-Grid-col ms-sm6">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm8 ">
                <Label>Color</Label>
              </div>
              <div className="ms-Grid-col ms-sm1"></div>
              <div className="ms-Grid-col ms-sm3 gap">
                <ColorPickerComponent
                  id="colorpicker"
                  value="#4db6acff"
                  mode="Palette"
                  change={(args) => console.log(args.value)}
                  cssClass="e-hide-value"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="ms-Grid-col ms-sm6">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 gap-color">
                <Label>Gap color</Label>
              </div>
              <div className="ms-Grid-col gap ms-sm5">
                <ColorPickerComponent
                  id="colorpicker"
                  value="#4db6acff"
                  mode="Palette"
                  change={(args) => console.log(args.value)}
                  cssClass="e-hide-value"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="insets-header">
          <Checkbox
            checked={xaxis.visible}
            onChange={(_, checked) =>
              droplinesOnChange({ xaxis: { ...xaxis, visible: !!checked } })
            }
          />
          <Label style={{ paddingLeft: '0px' }}>Horizontal lines</Label>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4">
            <Label>Style</Label>
          </div>
          <div className="ms-Grid-col ms-sm8">
            <Dropdown
              options={getAllDropLineDash()}
              selectedKey={xaxis.type}
              styles={dropdownStyles}
              onChange={(_, item) =>
                droplinesOnChange({
                  xaxis: { ...xaxis, type: item?.key as string, visible: item?.key == 'none' ? false :true },
                })
              }
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4">
            <Label>Thickness</Label>
          </div>
          <div className="ms-Grid-col ms-sm8">
            <SpinButton
              value={xThickness + suffix}
              min={min}
              max={max}
              // step={0.1}
              onIncrement={(value) =>onIncrement(value, 'xaxis')}
              onDecrement={(value) =>onDecrement(value, 'xaxis')}
              incrementButtonAriaLabel="Increase value by 2"
              decrementButtonAriaLabel="Decrease value by 2"
              styles={styles}
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm8 ">
                <Label>Color</Label>
              </div>
              <div className="ms-Grid-col ms-sm1"></div>
              <div className="ms-Grid-col gap ms-sm3">
                <ColorPickerComponent
                  id="colorpicker"
                  value={xaxis.color}
                  mode="Palette"
                  change={(args) =>
                    droplinesOnChange({
                      xaxis: { ...xaxis, color: args.value },
                    })
                  }
                  cssClass="e-hide-value"
                />
              </div>
            </div>
          </div>
          {/* <div className="ms-Grid-col ms-sm6">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col  ms-sm6">
                <Label>Gap color</Label>
              </div>
              <div className="ms-Grid-col gap ms-sm5">
                <ColorPickerComponent
                  id="colorpicker"
                  value="#4db6acff"
                  mode="Palette"
                  change={(args) => console.log(args.value)}
                  cssClass="e-hide-value"
                  disabled
                />
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};
export default Droplines;
