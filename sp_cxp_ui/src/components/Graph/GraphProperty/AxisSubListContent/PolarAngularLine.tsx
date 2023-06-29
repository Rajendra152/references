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


const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 20 } };
let suffixInc = 'in';
const suffixDeg = ' °';
let minInc = 0.005;
let maxInc = 0.750;
const minDeg = 0;
const maxDeg = 360;
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
    dropdown: { width: 100, height: 20 },
};

const PolarRadialLine = (props: any) => {
    console.log(props)

    const [chkSpk1, setChkSpk1] = useState(props.linesProp.showline);
    const [chkSpk2, setChkSpk2] = useState(false);
    const [chkSpk3, setChkSpk3] = useState(false);
    const [chkSpk4, setChkSpk4] = useState(false);
    const [spkPos1, setspkPos1] = useState(props.linesProp.angle);
    const [lineColor, setLineColor] = useState(props.linesProp.linecolor);
    const [linethickness, setThickness] = useState(props.linesProp.linewidth);
    const allListData = useRef({
        colorOptions: getAllColor(),
    })


    useEffect(() => {
        suffixInc = props.properties?.defaultUnit;
        [maxInc, minInc] = get_MIN_MAX(suffixInc)
        step = get_Step(suffixInc)
        let wid = convert_To_mmInchPoints(suffixInc, props.linesProp.linewidth)
        setThickness(wid);
        setLineColor(props.linesProp.linecolor)
        setChkSpk1(props.linesProp.showline);
    }, [props])

    useEffect(()=>{
      props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__radius_lines")
    },[])
    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any

            if (name === "spoke1") {
                // fromRangeOnChange(finalValue)
                finalValue = Math.min(numericValue + 1, maxDeg);
                spoke1PosChange(finalValue)
                finalValue = finalValue + suffixDeg;
              }
              else if (name === "sopke2") {
                // toRangeOnChange(finalValue)
                finalValue = finalValue + suffixDeg;
              }
              else if (name === "spoke3") {
                // arcOnChange(finalValue)
                finalValue = finalValue + suffixDeg;
              }
              else if (name === "spoke4") {
                // angleOnChange(finalValue)
                finalValue = finalValue + suffixDeg;
              }
              else if (name === "thickness") {
                finalValue = Math.min(numericValue + step, maxInc);
                finalValue = String(display_mmPxPt(suffixInc,finalValue));
                thicknessOnChange(finalValue)
                finalValue = finalValue + suffixInc;
              }
            return finalValue
        }
    };

    const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>,name?: string): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any

            if (name === "spoke1") {
                finalValue = Math.max(numericValue - 1, minDeg);
                spoke1PosChange(finalValue)
                finalValue = finalValue + suffixDeg;
              }
              else if (name === "sopke2") {
                // toRangeOnChange(finalValue)
                finalValue = finalValue + suffixDeg;
              }
              else if (name === "spoke3") {
                // arcOnChange(finalValue)
                finalValue = finalValue + suffixDeg;
              }
              else if (name === "spoke4") {
                // angleOnChange(finalValue)
                finalValue = finalValue + suffixDeg;
              }
              else if (name === "thickness") {
                finalValue = Math.max(numericValue - step, minInc);
                finalValue = String(display_mmPxPt(suffixInc,finalValue));
                thicknessOnChange(finalValue)
                finalValue = finalValue + suffixInc;
              }
            return finalValue
        };
    }

    const thicknessOnChange = (value) => {
        const newProps = {
            linewidth: convert_To_Pixel(suffixInc, value)
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


    const spoke1CheckBoxChange = (ev,value) => {

        const newProps = {
            showline: value
        }
        console.log(newProps)

        const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
        props.graphPropertyOnChange(newLayout, newProperties)
    }
    const spoke1PosChange = (value) => {

        const newProps = {
            angle: value
        }
        console.log(newProps)

        const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
        props.graphPropertyOnChange(newLayout, newProperties)
    }



    return (
        <div className="insets-container">
          <div className="insets-header">
            <Label className="">
              Show/Place Axis Lines
            </Label>
          </div>
          <div className={'d-flex align-items-center'} style={{ height:22, marginBottom: '0px', marginLeft: '5px' }}>
          <Checkbox label="" checked={chkSpk1} onChange={spoke1CheckBoxChange}/>
            <Label className="ms-lg2">Spoke 1</Label>
          </div>
          <div className={'d-flex align-items-center'} style={{ height:22, marginBottom: '0px', marginLeft: '20px' }}>
            <Label className="ms-lg2">Position</Label>
            <SpinButton
                // label="Position"
                defaultValue={spkPos1+suffixDeg}
                className="height"
                min={minDeg}
                max={maxDeg}                            
                onIncrement={(value, ev) => onIncrement(value, ev, "spoke1")}
                onDecrement={(value, ev) => onDecrement(value, ev, "spoke1")}
                incrementButtonAriaLabel="Increase value by 1"
                decrementButtonAriaLabel="Decrease value by 1"
                styles={styles}
            />
          </div>
          
          {/* <div className={'d-flex align-items-center'} style={{ height:22, marginBottom: '0px', marginLeft: '5px' }}>
            <Checkbox label="" checked={chkSpk2} disabled/>
            <Label className="ms-lg2">Spoke 2</Label>
          </div>
          <div className={'d-flex align-items-center'} style={{ height:22, marginBottom: '0px', marginLeft: '20px' }}>
            <Label className="ms-lg2">Position</Label>
            <SpinButton
                // label="Position"
                defaultValue="Normal"
                min={minDeg}
                max={maxDeg}                            
                onIncrement={(value, ev) => onIncrement(value, ev, "spoke2")}
                onDecrement={(value, ev) => onDecrement(value, ev, "spoke2")}
                incrementButtonAriaLabel="Increase value by 1"
                decrementButtonAriaLabel="Decrease value by 1"
                styles={styles}
                disabled
            />
          </div> */}
          
          {/* <div className={'d-flex align-items-center'} style={{ height:22, marginBottom: '0px', marginLeft: '5px' }}>
          <Checkbox label="" checked={chkSpk3} disabled/>
            <Label className="ms-lg2">Spoke 3</Label>
          </div>
          <div className={'d-flex align-items-center'} style={{ height:22, marginBottom: '0px', marginLeft: '20px' }}>
            <Label className="ms-lg2">Position</Label>
            <SpinButton
                // label="Position"
                defaultValue="Normal"
                min={minDeg}
                max={maxDeg}                            
                onIncrement={(value, ev) => onIncrement(value, ev, "spoke2")}
                onDecrement={(value, ev) => onDecrement(value, ev, "spoke2")}
                incrementButtonAriaLabel="Increase value by 1"
                decrementButtonAriaLabel="Decrease value by 1"
                styles={styles}
                disabled
            />
          </div> */}
          
          {/* <div className={'d-flex align-items-center'} style={{ height:22, marginBottom: '0px', marginLeft: '5px' }}>
          <Checkbox label="" checked={chkSpk4} disabled/>
            <Label className="ms-lg2">Spoke 4</Label>
          </div>
          <div className={'d-flex align-items-center'} style={{ height:22, marginBottom: '0px', marginLeft: '20px' }}>
            <Label className="ms-lg2">Position</Label>
            <SpinButton
                // label="Position"
                defaultValue="Normal"
                min={minDeg}
                max={maxDeg}                            
                onIncrement={(value, ev) => onIncrement(value, ev, "spoke2")}
                onDecrement={(value, ev) => onDecrement(value, ev, "spoke2")}
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
    
          <div className={'d-flex align-items-center'} style={{ height:28, marginBottom: '2px', marginLeft: '5px' }}>
            <Label className="ms-lg2">Color</Label>
            <ColorPickerComponent
              id="colorpicker"
              value={lineColor}
              mode="Palette"
              change={(args) => colorOnChange(args.value)}
              cssClass="e-hide-value"
            />
          </div>
          <div className={'d-flex align-items-center'} style={{ height:22, marginBottom: '5px', marginLeft: '5px' }}>
            <Label className="ms-lg2">Thickness</Label>
            <SpinButton
                label=""
                value={linethickness + suffixInc}
                min={minInc}
                max={maxInc}
                onValidate={onValidate}                           
                onIncrement={(value, ev) => onIncrement(value, ev, "thickness")}
                onDecrement={(value, ev) => onDecrement(value, ev, "thickness")}
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
export default PolarRadialLine