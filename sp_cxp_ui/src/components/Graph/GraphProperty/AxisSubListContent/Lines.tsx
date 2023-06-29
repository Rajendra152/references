import React, { useEffect, useState} from 'react';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Label } from '@fluentui/react/lib/Label';
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height:24 } };
let suffix = 'in';
let min = 0.005;
let max = 0.750;
let step=0.005;
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

const Lines = (props:any) => {
  console.log("lines",props)
  const [lineColor, setLineColor] = useState(props.linesProp.linecolor);
  const [linethickness, setThickness] = useState(props.linesProp.linewidth);

  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__axis_lines")
  },[])
  useEffect(() => {
    suffix = props.properties?.defaultUnit;
    [max, min] = get_MIN_MAX(suffix)
    step = get_Step(suffix)
    setLineColor(props.linesProp.linecolor);
    let wid = convert_To_mmInchPoints(suffix, props.linesProp.linewidth)
        setThickness(wid);
  }, [props])

  /** Increment the value (or return nothing to keep the previous value if invalid) */
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

  /** Decrement the value (or return nothing to keep the previous value if invalid) */
  const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any = Math.max(numericValue - step, min);
      thicknessOnChange(finalValue)
      finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
      return finalValue
    };
  }

  const thicknessOnChange = (value:any) => {
    
    const newProps = {
      ...props.linesProp,
      linewidth:  convert_To_Pixel(suffix, value)
    }

    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
    props.graphPropertyOnChange(newLayout, newProperties)
}

  const colorOnChange = (value:any) => {

    const newProps = {
      ...props.linesProp,
      linecolor: value
    }

    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
    props.graphPropertyOnChange(newLayout, newProperties)
  }

   return (
    <div className="insets-container">
      {/* Show Axis Lines */}
      {/* <div className="insets-header">
        <Label className="">
          Show/Place Axis Lines
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Checkbox label="Bottom" checked disabled={true} />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <SpinButton
            label="Position"
            defaultValue="Normal"
            min={0}
            max={100}
            step={1}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
            styles={styles}
            disabled={true}
          />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <Checkbox label="Top" checked disabled={true} />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
        <SpinButton
          label="Position"
          defaultValue="Normal"
          min={0}
          max={100}
          step={1}
          incrementButtonAriaLabel="Increase value by 1"
          decrementButtonAriaLabel="Decrease value by 1"
          styles={styles}
          disabled={true}
        />
      </div> */}
      
      {/* Line Properties */}
      <div className="insets-header">
        <Label className="">
          Line Properties
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '5px' }}>
        <Label className="ms-lg2">Color</Label>
        <ColorPickerComponent
          id="colorpicker"
          value={lineColor}
          mode="Palette"
          change={(args) => colorOnChange(args.value)}
          cssClass="e-hide-value"
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '2px' }}>
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
          className={'ms-lg2'}
        />
      </div>
      
    </div>
  )
}

export default Lines;
