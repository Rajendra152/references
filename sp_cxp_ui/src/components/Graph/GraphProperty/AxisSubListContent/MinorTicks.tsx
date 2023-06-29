
import React, { useState, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownOption, IDropdownStyles, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { getAllColor, getTickPosition, getTickInterval } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import * as actionCreators from '../../../../store/Helpmenu/actions';
import { connect } from 'react-redux';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';


const maskFormat: { [key: string]: RegExp } = {
  '*': /[0-9_]/,
};
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
const suffix = ' in';
const min = 0.005;
const max = 0.750;
const options_dropdown1: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
];
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

const MinorTicks = (props: any) => {
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
    setColor(props.majorTick.tickcolor);
    setIntervalType(props.majorTick.tickmode)
    setTickFrom(props.majorTick.tick0)
    setTickGap(props.majorTick.dtick)

    let wid = (props.majorTick.tickwidth * 10) / 1000
    wid = Math.round(wid * 1000) / 1000;
    setThickness(wid);

    let len = (props.majorTick.ticklen * 10) / 1000
    len = Math.round(len * 1000) / 1000;
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
      let finalValue: any = Math.min(numericValue + 0.005, max);
      if (name === "ticklen") {
        tickLengthOnChange(finalValue)
      }
      if (name === "tickwidth") {
        tickWidthOnChange(finalValue)
      }
      finalValue = String(Math.round(finalValue * 1000) / 1000) + suffix;
      console.log(finalValue)
      return finalValue
    }
  };

  /** Decrement the value (or return nothing to keep the previous value if invalid) */
  const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      let finalValue: any = Math.max(numericValue - 0.005, min);
      if (name === "ticklen") {
        tickLengthOnChange(finalValue)
      }
      if (name === "tickwidth") {
        tickWidthOnChange(finalValue)
      }
      finalValue = String(Math.round(finalValue * 1000) / 1000) + suffix;
      return finalValue
    };
  }

  const tickLengthOnChange = (value) => {
    const newProps = {
      ...props.majorTick,
      ticklen: (value * 1000) / 10

    }
    changeProperties(newProps);
  }

  const tickWidthOnChange = (value) => {
    const newProps = {
      ...props.majorTick,
      tickwidth: (value * 1000) / 10

    }
    changeProperties(newProps);
  }

  const colorOnChange = (value) => {
    const newProps = {
      ...props.majorTick,
      tickcolor: value

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

  
  let directionLabel1 = props.currAxis === "xaxis" ?"Top":"Left";
  let directionLabel2 = props.currAxis === "xaxis" ?"Bottom":"Right";

  return (
    <div className="insets-container">
      <div className="insets-header">
        <Label style={{ paddingTop: '2px', paddingBottom: '0px' }}>
          Tick Lines
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '1px',marginLeft:'5px' }}>
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
              disabled
            />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '1px',marginLeft:'5px' }}>
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
            disabled
          />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '0px',marginLeft:'5px' }}>
          <Label className="ms-lg2">Color</Label>
          <ColorPickerComponent
            id="colorpicker"
            value={color}
            mode="Palette"
            change={(args) => colorOnChange(args.value)}
            cssClass="e-hide-value"
            disabled
        />
      </div>
      <div className="insets-header">
        <Label className="" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          Direction
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '3px',marginLeft:'5px' }}>
          <Label className="ms-lg2">{directionLabel1}</Label>
          <Dropdown
            selectedKey={leftTopPos}
            options={tickPositionOptions}
            styles={dropdownStyles}
            onChange={ticksOnChange}
            // disabled={props.currAxis === "yaxis"}
            disabled
          />
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '0px',marginLeft:'5px' }}>     
          <Label className="ms-lg2">{directionLabel2}</Label>
          <Dropdown
            selectedKey={rightBotPos}
            options={tickPositionOptions}
            styles={dropdownStyles}
            onChange={ticksOnChange}
            // disabled={props.currAxis === "xaxis" || props.currAxis === "radialaxis"}
            disabled
          />
        </div>
      <div className="insets-header">
        <Label className="" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          Intervals
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '3px',marginLeft:'5px' }}>
        <Label className="ms-lg10">
          Minor tick intervals per major tick interval
        </Label>
      </div>
      <div className={'d-flex align-items-center'} style={{ marginBottom: '3px',marginLeft:'5px'}}>
        <Dropdown
          selectedKey={intervalType}
          options={intervalTypeOptions}
          styles={dropdownStyles}
          onChange={intervalTypeOnChange}
          disabled
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MinorTicks);
