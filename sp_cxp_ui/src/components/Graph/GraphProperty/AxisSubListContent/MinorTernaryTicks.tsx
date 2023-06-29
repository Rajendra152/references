import React, { useState, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Checkbox } from '@fluentui/react';
import { Dropdown, IDropdownOption, IDropdownStyles, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { getAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
import { getAllColor, getDirectionTypes } from "../../../../utils/graphDailogProperty/differentPropertyList";

import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
const suffix = ' in';
const min = 0.005;
const max = 0.750;
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


const MinorTernaryTicks = (props: any) => {
    const [length, setLength] = useState(props.minTerTickProp.ticklen);
    const [thickness, setThickness] = useState(props.minTerTickProp.tickwidth);
    const [color, setColor] = useState(props.minTerTickProp.tickcolor);
    const [direction, setDirection] = useState(props.minTerTickProp.ticks);

    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__ternary_ticks")
      },[])
    useEffect(() => {
        setColor(props.minTerTickProp.tickcolor);
        setDirection(props.minTerTickProp.ticks)

        let wid = (props.minTerTickProp.tickwidth * 10) / 1000
        wid = Math.round(wid * 1000) / 1000;
        setThickness(wid);

        let len = (props.minTerTickProp.ticklen * 10) / 1000
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
            else if (name === "tickwidth") {
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
            else if (name === "tickwidth") {
                tickWidthOnChange(finalValue)
            }
            finalValue = String(Math.round(finalValue * 1000) / 1000) + suffix;
            return finalValue
        };
    }

    const tickLengthOnChange = (value) => {
        const newProps = {
            ...props.minTerTickProp,
            ticklen: (value * 1000) / 10

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
    const tickWidthOnChange = (value) => {
        const newProps = {
            ...props.minTerTickProp,
            tickwidth: (value * 1000) / 10

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
    console.log("min-ter-tic", props)
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
                                disabled
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
                                disabled
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
                            disabled
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
                            // onChange={colorOnChange}
                            disabled
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
                <div className="ms-Grid-col ms-sm12 insets-header">
                    <p className="text">Minor Tick Intervals</p>
                </div>
                <div className="ms-Grid-col ms-sm12">
                    <div className={'ms-Grid-row'} style={{ marginBottom: '0px' }}>
                        <div className="ms-Grid-col ms-sm7">
                            <Label>Ticks per major tick intervals</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm3" style={{ padding: '0px' }}>
                            <Dropdown
                                // selectedKey={color}
                                options={options_dropdown1}
                            // styles={dropdownStyles}
                            // onChange={colorOnChange}
                            disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}


  export default MinorTernaryTicks;
