import React, { useState, useEffect } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox } from '@fluentui/react';
import { getAllColor, getAllLineDash, getAllLineShape } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getLinesModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'




const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
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

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150, height: 22, minHeight: 22 },
    callout:{maxHeight:250, overflowY:'auto'}
};
const dropdowncolor: Partial<IDropdownStyles> = {
    dropdown: { width: 80, height: 22, minHeight: 22 },
};


const stackTokens: IStackTokens = { childrenGap: 4 };
const options_dropdown1: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
];


const colorOptions: IDropdownOption[] = getAllColor();
const dashOptions: IDropdownOption[] = getAllLineDash();

const Lines3D = (props: any) => {
    console.log("3d lines", props)

    const [style, setStyle] = useState(props.linesProp.dash);
    const [thickness, setThickness] = useState(props.linesProp.width);
    const [shape, setShape] = useState(props.linesProp.shape);
    const [color, setColor] = useState(props.linesProp.color);
    const [gapColor, setGapColor] = useState("black");

    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties___3d__lines")
      },[])
    useEffect(() => {
        suffix = props.properties?.defaultUnit;
        [max, min] = get_MIN_MAX(suffix)
        step = get_Step(suffix)
        setStyle(props.linesProp.dash);
        setShape(props.linesProp.shape);
        setColor(props.linesProp.color);
        let wid = convert_To_mmInchPoints(suffix, props.linesProp.width)
        setThickness(wid);

    }, [props])


    const changeProperties = (newProps) => {
        const [newLayout, newProperties] = getLinesModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

    const styleOnChange = (ev, item) => {
        const newProps = {
            line: {
                ...props.linesProp,
                dash: item.key
            }
        }
        setStyle(item.key);
        changeProperties(newProps);
    }

    const colorOnChange = (value:any) => {
        const newProps = {
            line: {
                ...props.linesProp,
                color: value
            }
        }
        setColor(value);
        changeProperties(newProps);
    }
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

    const thicknessOnChange = (value) => {
        const newProps = {
            line: {
                ...props.linesProp,
                width: convert_To_Pixel(suffix, value)
            }
        }

        //console.log("Effect--> ", edgeWid)
        changeProperties(newProps);
    }

    return (
            <div className="insets-container">
                <div className="insets-header">
                    <Label className="">
                        Line Style
                    </Label>
                </div>
                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg2">Style</Label>
                    <Dropdown
                        selectedKey={style}
                        options={dashOptions}
                        styles={dropdownStyles}
                        onChange={styleOnChange}
                        className="ms-lg2"
                    />
                </div>
                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg2">Thickness</Label>
                    <SpinButton
                        defaultValue={'0.005' + suffix}
                        value={thickness + suffix}
                        min={min}
                        max={max}
                        onValidate={onValidate}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        onChange={onChange}
                        incrementButtonAriaLabel="Increase value by 0.005"
                        decrementButtonAriaLabel="Decrease value by 0.005"
                        styles={styles}
                        className="ms-lg2"
                    />
                </div>
                <div className="insets-header">
                    <Label>Line Color</Label>
                </div>

                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg2">Color</Label>
                    <ColorPickerComponent
                        id="colorpicker"
                        value={color}
                        mode="Palette"
                        change={(args) => colorOnChange(args.value)}
                        cssClass="e-hide-value"
                    />
                </div>
                
                {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg2">Gap Color</Label>
                    <ColorPickerComponent
                        id="colorpicker"
                        value={gapColor}
                        mode="Palette"
                        change={(args) => colorOnChange(args.value)}
                        cssClass="e-hide-value"
                        disabled
                    />
                </div> */}

                {/* <div className="insets-header">
                    <Label >Fill Color</Label>
                </div> */}
                {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg2">Color</Label>
                    <ColorPickerComponent
                        id="colorpicker"
                        value={gapColor}
                        mode="Palette"
                        change={(args) => colorOnChange(args.value)}
                        cssClass="e-hide-value"
                        disabled
                    />
                </div> */}

                {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Checkbox
                        label=""
                        checked={false}
                        disabled={true}
                        className=""
                    />
                    <Label className="ms-lg5">Within drop planes</Label>
                </div> */}
                {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg2">Transition</Label>
                    <Dropdown
                            placeholder="Discrete"
                            options={options_dropdown1}
                            styles={dropdownStyles}
                            disabled={true}
                            className="ms-lg2"
                        />
                </div> */}
                {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Checkbox
                        label=""
                        checked={false}
                        disabled={true}
                        className=""
                    />
                    <Label className="ms-lg5">Transparent</Label>
                </div> */}

            </div>
        )
}

  export default Lines3D;
