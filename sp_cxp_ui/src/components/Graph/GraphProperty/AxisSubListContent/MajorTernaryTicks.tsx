import React, { useState, useEffect } from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { Label } from '@fluentui/react/lib/Label';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Slider } from '@fluentui/react';
import { getAllColor, getDirectionTypes } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
let suffix = 'in';
let min = 0.005;
let max = 0.750;
let step=0.005;
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 100 },
};
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


const MajorTernaryTicks = (props) => {
    console.log("maj-Prop", props)
    const [length, setLength] = useState(props.majorTick.ticklen);
    const [thickness, setThickness] = useState(props.majorTick.tickwidth);
    const [color, setColor] = useState(props.majorTick.tickcolor);
    const [direction, setDirection] = useState(props.majorTick.ticks);
    const [sliderValue, setSliderValue] = useState(props.majorTick.dtick);


    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__ternary_ticks")
      },[])
    useEffect(() => {
        suffix = props.properties?.defaultUnit;
        [max, min] = get_MIN_MAX(suffix)
        step = get_Step(suffix)
        setSliderValue(props.majorTick.dtick);
        setColor(props.majorTick.tickcolor);
        setDirection(props.majorTick.ticks)
        let wid = convert_To_mmInchPoints(suffix, props.majorTick.tickwidth)
        setThickness(wid);

        let len = convert_To_mmInchPoints(suffix, props.majorTick.ticklen);
        setLength(len);

    }, [props])


    const changeProperties = (newProps) => {
        const [newLayout, newProperties] = getAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
        console.log("3", newLayout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

    /** Increment the value (or return nothing to keep the previous value if invalid) */
    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {

        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            console.log("1")
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
    const DirectionOnChange = (ev, item) => {
        const newProps = {
            ...props.majorTick,
            ticks: item.key,
            ticklen: props.majorTick.ticklen + 0.0001


        }
        changeProperties(newProps);
    }

    const sliderOnChange = (value: number) => {
        const newProps = {
            ...props.majorTick,
            dtick: value,
            tick0: 1,
            ticklen: props.majorTick.ticklen + 0.0001
        }
        changeProperties(newProps);
    }


    return (
        <div className="ms-Grid box" dir="ltr" >
            <div className="ms-Grid-row insets-container" >
                <div className="ms-Grid-col ms-sm12 insets-header">
                    <p className="text">Tick Lines</p>
                </div>
                <div className="ms-Grid-col ms-sm12">
                    <div className={'ms-Grid-row'} style={{ marginBottom: '1px' }}>
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
                        </div> </div>
                </div>
                <div className="ms-Grid-col ms-sm12">
                    <div className={'ms-Grid-row'} style={{ marginBottom: '1px' }}>
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
                        </div> </div>
                </div>
                <div className="ms-Grid-col ms-sm12">
                    <div className={'ms-Grid-row'} style={{ marginBottom: '3px' }}>
                        <div className="ms-Grid-col ms-sm4">
                            <Label>Color</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm3">
                            <ColorPickerComponent
                                id="colorpicker"
                                value={color}
                                mode="Palette"
                                change={(args) => colorOnChange(args.value)}
                                cssClass="e-hide-value"

                            />
                        </div>
                    </div>
                </div>
                <div className="ms-Grid-col ms-sm12 insets-header">
                    <p className="text">Direction</p>
                </div>
                <div className="ms-Grid-col ms-sm12">
                    <div className={'ms-Grid-row'} style={{ marginBottom: '3px' }}>
                        <div className="ms-Grid-col ms-sm4">
                            <Label>{props.currAxis === "aaxis" ? "Bottom" : (props.currAxis === "baxis" ? "Right" : "Left")}</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm5">
                            <Dropdown
                                selectedKey={direction}
                                options={getDirectionTypes()}
                                // styles={dropdownStyles}
                                onChange={DirectionOnChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="ms-Grid-col ms-sm12">
                    <div className={'ms-Grid-row'} style={{ marginBottom: '3px' }}>
                        <div className="ms-Grid-col ms-sm4">
                            <Label>{props.currAxis === "aaxis" ? "top" : (props.currAxis === "baxis" ? "Left" : "Right")}</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm5">
                            <Dropdown
                                selectedKey={direction}
                                options={getDirectionTypes()}
                                // styles={dropdownStyles}
                                // onChange={colorOnChange}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="ms-Grid-col ms-sm12 insets-header">
                    <p className="text">Major Tick Intervals</p>
                </div> */}
                {/* <div className="ms-Grid-col ms-sm12 ">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm4 " style={{ lineHeight: "24px", fontSize: "12px", fontWeight: 600 }}>Ticks every</div>
                        <div className="ms-Grid-col ms-sm2 slider-value">
                            {sliderValue}</div>
                        <div className="ms-Grid-col ms-sm5 ">
                            <Slider
                                max={100}
                                min={0}
                                value={sliderValue}
                                showValue={false}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={sliderOnChange}
                                disabled
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>)
}


  export default (MajorTernaryTicks);
