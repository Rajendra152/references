import React, { useState, useEffect } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { getAllColor, getAllLineDash, getFillColorScale } from "../../../../utils/graphDailogProperty/differentPropertyList";

import { getContourFillLineModifiedJSON, getContourFillModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";

import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
const suffix = ' in';
const min = 0.005;
const max = 0.750;
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
    dropdown: { width: 100 },
    callout: { maxHeight: 200, overflowY: 'auto' }
};

const stackTokens: IStackTokens = { childrenGap: 4 };


const contour_options: IDropdownOption[] = [
    { key: 'major', text: 'Major', },
    { key: 'minor', text: 'Minor', disabled: true, }
];

const startOptions: IDropdownOption[] = [
    { key: 'bottom', text: 'Bottom', disabled: true },
    { key: 'top', text: 'Top', disabled: true },
];

const colorOptions: IDropdownOption[] = getAllColor();
const dashOptions: IDropdownOption[] = getAllLineDash();
const fillColorOptions: IDropdownOption[] = getFillColorScale();

const CounterFills = (props: any) => {
    console.log('Contor Fills -->', props)
    const [contor, setContor] = useState('major')
    const [style, setStyle] = useState(props.fillProp.dash)
    const [thickness, setThickness] = useState(props.fillProp.thickness)
    const [color, setColor] = useState(props.fillProp.color)
    const [gapColor, setGapColor] = useState('white ')
    const [fillColor, setFillColor] = useState(props.fillProp.colorscale)
    const [start, setStart] = useState('bottom')

    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__contours")
      },[])
    useEffect(() => {
        let wid = (props.fillProp.width * 10) / 1000
        wid = Math.round(wid * 1000) / 1000;
        setThickness(wid);
        setStyle(props.fillProp.dash)
        setColor(props.fillProp.color)
        setFillColor(props.fillProp.colorscale)
    }, [props])


    /** Increment the value (or return nothing to keep the previous value if invalid) */
    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.min(numericValue + 0.005, max);
            thicknessOnChange(finalValue)
            finalValue = String(Math.round(finalValue * 1000) / 1000) + suffix;
            console.log(finalValue)
            return finalValue
        }
    };

    /** Decrement the value (or return nothing to keep the previous value if invalid) */
    const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.max(numericValue - 0.005, min);
            thicknessOnChange(finalValue)
            finalValue = String(Math.round(finalValue * 1000) / 1000) + suffix;
            return finalValue
        };
    }

    const thicknessOnChange = (value) => {

        const newProps = {
            width: (value * 1000) / 10
        }

        const [newLayout, newProperties] = getContourFillLineModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

    const colorOnChange = (value) => {
        const newProps = {
            color: value
        }
        const [newLayout, newProperties] = getContourFillLineModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

    const styleOnChange = (ev, item) => {
        const newProps = {
            dash: item.key
        }
        const [newLayout, newProperties] = getContourFillLineModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

    const fillColorOnChange = (ev, item) => {
        const newProps = {
            colorscale: item.key
        }
        const [newLayout, newProperties] = getContourFillModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }



    return (
        <div className="insets-container">
            <div className="ms-Grid-row" style={{ padding: '4px 8px 0px' }}>
                <div className="ms-Grid-col ms-sm4 block-label" style={{ padding: '0px' }}>
                    <Label>Contours</Label>
                </div>
                <div className="ms-Grid-col ms-sm5">
                    <Dropdown
                        selectedKey={contor}
                        options={contour_options}
                        styles={dropdownStyles}
                    // disabled={true}
                    />
                </div>
            </div>
            <div className="insets-header">
                <Label className="">
                    Line Types
                </Label>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '5px' }}>
                <div className="ms-Grid-col ms-sm4">
                    <Label>Style</Label>
                </div>
                <div className="ms-Grid-col ms-sm8">
                    <Dropdown
                        selectedKey={style}
                        options={dashOptions}
                        onChange={styleOnChange}
                        styles={dropdownStyles}
                    />
                </div>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '5px' }}>
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
            <div className={'d-flex'} style={{ marginBottom: '5px' }}>
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
                        disabled
                    />
                </div>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '5px' }}>
                <div className="ms-Grid-col ms-sm4">
                    <Label>Gap Color</Label>
                </div>
                <div className="ms-Grid-col ms-sm8">
                    <ColorPickerComponent
                        id="colorpicker"
                        value={gapColor}
                        mode="Palette"
                        change={(args) => colorOnChange(args.value)}
                        cssClass="e-hide-value"
                        disabled
                    />
                </div>
            </div>
            <div className="insets-header">
                <Label className="">
                    Fill
                </Label>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '5px' }}>
                <div className="ms-Grid-col ms-sm4">
                    <Label>Color</Label>
                </div>
                <div className="ms-Grid-col ms-sm8">
                    <Dropdown
                        selectedKey={fillColor}
                        options={fillColorOptions}
                        onChange={fillColorOnChange}
                        styles={dropdownStyles}
                    />
                </div>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '5px' }}>
                <div className="ms-Grid-col ms-sm4">
                    <Label>Start</Label>
                </div>
                <div className="ms-Grid-col ms-sm8">
                    <Dropdown
                        selectedKey={start}
                        options={startOptions}
                        // onChange={colorOnChange}
                        styles={dropdownStyles}
                        disabled
                    />
                </div>
            </div>

        </div>
    )
}
export default CounterFills