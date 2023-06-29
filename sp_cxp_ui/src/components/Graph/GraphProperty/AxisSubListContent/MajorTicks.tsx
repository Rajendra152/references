
import React, { useState, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownOption, IDropdownStyles, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { getAllColor, getTickPosition, getTickInterval } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { getAxisJSON } from '../../../../utils/graphDailogProperty/axisSubListJSON/getAxisInsetsJSON';
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'

const maskFormat: { [key: string]: RegExp } = {
  '*': /[0-9_]/,
};
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
let suffix = 'in';
let min = 0.005;
let max = 0.750;
let step=0.005;

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100 },
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
const tickPositionOptions: IDropdownOption[] = getTickPosition();
const intervalTypeOptions: IDropdownOption[] = getTickInterval();

const MajorTicks = (props: any) => {
  console.log(props)
  const [length, setLength] = useState(props.majorTick.ticklen);
  const [thickness, setThickness] = useState(props.majorTick.tickwidth);
  const [color, setColor] = useState(props.majorTick.tickcolor);
  const [leftTopPos, setleftTopPos] = useState(props.majorTick.ticks);
  const [rightBotPos, setrightBotPos] = useState(props.majorTick.ticks);
  const [intervalType, setIntervalType] = useState(props.majorTick.tickmode);
  const [tickFrom, setTickFrom] = useState(props.majorTick.tick0);
  const [tickGap, setTickGap] = useState(props.majorTick.dtick);

  useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__ticks")
  },[])
  useEffect(() => {
    suffix = props.properties?.defaultUnit;
    [max, min] = get_MIN_MAX(suffix)
    step = get_Step(suffix)
    setColor(props.majorTick.tickcolor);
    setIntervalType(props.majorTick.tickmode)
    setTickFrom(props.majorTick.tick0)
    setTickGap(props.majorTick.dtick)
    setleftTopPos(props.majorTick.ticks)
    setrightBotPos(props.majorTick.ticks)
    let wid = convert_To_mmInchPoints(suffix, props.majorTick.tickwidth)
    setThickness(wid);

    let len =  convert_To_mmInchPoints(suffix, props.majorTick.ticklen)
    setLength(len);

  }, [props])


  const changeProperties = (newProps) => {
    const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
    console.log(newLayout)
    props.graphPropertyOnChange(newLayout, newProperties)
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
    console.log("lenght changing===", value, length)
    const newProps = {
      ...props.majorTick,
      ticklen: convert_To_Pixel(suffix, value)

    }
    changeProperties(newProps);
  }

  const tickWidthOnChange = (value) => {
    const newProps = {
      ...props.majorTick,
      tickwidth: convert_To_Pixel(suffix, value),
      ticklen: props.majorTick.ticklen + 0.0001

    }
    changeProperties(newProps);
  }
  
  const colorOnChange = (value) => {
    const newProps = {
      ...props.majorTick,
      tickcolor: value,
      ticklen: props.majorTick.ticklen + 0.0001

    }
    changeProperties(newProps);
  }
  
  const ticksOnChange = (ev, item) => {
    const newProps = {
      ...props.majorTick,
      ticks: item.key

    }
    changeProperties(newProps);
  }

  const intervalTypeOnChange = (ev, item) => {
    console.log(item.key)
    const newProps = {
      ...props.majorTick,
      tickmode: item.key

    }
    changeProperties(newProps);
  }

  
  const gapIntervalOnChange = (ev, value) => {
    console.log(value)
    const newProps = {
      ...props.majorTick,
      dtick: value

    }
    changeProperties(newProps);
  }

  const startIntervalOnChange = (ev, value) => {
    const newProps = {
      ...props.majorTick,
      tick0: value

    }
    changeProperties(newProps);
  }


  let directionLabel1 = props.currAxis === "xaxis" ?"Bottom":"Left";
  let directionLabel2 = props.currAxis === "xaxis" ?"Top":"Right";
  let isDisable1=false;
  let isDisable2=true;
  let axisObj = getAxisJSON(props.layout, {key:props.currAxis})
  console.log(props.currAxis, axisObj.side, "side")
  if(props.currAxis === "xaxis" && axisObj.side=='top'){
    isDisable1=true;
    isDisable2=false
  }
  else if(props.currAxis === "xaxis" && axisObj.side=='bottom'){
    isDisable1=false;
    isDisable2=true;
  }
  else if(props.currAxis === "yaxis" && axisObj.side=='left'){
    isDisable1=false;
    isDisable2=true
  }
  else if(props.currAxis === "yaxis" && axisObj.side=='right'){
    isDisable1=true;
    isDisable2=false;
  }

  if(props.currAxis === 'radialaxis'){
    directionLabel1 = 'spoke 1,3' 
    directionLabel2 = 'spoke 2,4'
  }
  else if(props.currAxis === 'angularaxis'){
    directionLabel1 = 'Outer'
    directionLabel2 = 'Inner'
  }

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label style={{ paddingTop: '2px', paddingBottom: '0px' }}>
          Tick Lines
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '1px', marginLeft:'5px' }}>
        <Label className="ms-lg2">Length</Label>
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
              className="ms-lg2"
            />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '1px', marginLeft:'5px' }}>
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
      <div className={'d-flex align-items-center'} style={{ marginBottom: '0px', marginLeft:'5px' }}>
          <Label className="ms-lg2">Color</Label>
          <ColorPickerComponent
            id="colorpicker"
            value={color}
            mode="Palette"
            change={(args) => colorOnChange(args.value)}
            cssClass="e-hide-value"
        />
      </div>
      <div className="insets-header">
        <Label className="" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          Direction
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '3px', marginLeft:'5px' }}>
          <Label className="ms-lg2">{directionLabel1}</Label>
          <Dropdown
            selectedKey={leftTopPos}
            options={tickPositionOptions}
            styles={dropdownStyles}
            onChange={ticksOnChange}
            // disabled={props.currAxis === "yaxis"}
            disabled={isDisable1}
          />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '0px', marginLeft:'5px' }}>     
          <Label className="ms-lg2">{directionLabel2}</Label>
          <Dropdown
            selectedKey={rightBotPos}
            options={tickPositionOptions}
            styles={dropdownStyles}
            onChange={ticksOnChange}
            // disabled={props.currAxis === "xaxis" || props.currAxis === "radialaxis"}
            disabled={isDisable2}
          />
        </div>
      <div className="insets-header">
        <Label className="" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          Intervals
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '3px', marginLeft:'5px' }}>
        <Label className="ms-lg2">Major ticks</Label>
        <Dropdown
          selectedKey={intervalType}
          options={intervalTypeOptions}
          styles={dropdownStyles}
          onChange={intervalTypeOnChange}
        />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '3px', marginLeft:'5px' }}>
        <Label className="ms-lg2">Every</Label>
          <TextField 
            name={`every`} 
            type="number" 
            //maskFormat={maskFormat} 
            value={tickGap} 
            disabled={intervalType==="auto"}
            onChange={gapIntervalOnChange}
            className="ms-lg2"
          />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '3px', marginLeft:'5px' }}>
          <Label className="ms-lg2">From</Label>
          <TextField 
            name={`from`} 
            type="number" 
            //maskFormat={maskFormat} 
            value={tickFrom}
            disabled={intervalType==="auto"}
            onChange={startIntervalOnChange}
            className="ms-lg2"
          />
      </div>
    </div>
  );
};


export default MajorTicks;
