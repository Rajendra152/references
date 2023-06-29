import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from '@fluentui/react/lib/Dropdown';
import { Icon } from '@fluentui/react/lib/Icon';
import { IconButton } from '@fluentui/react/lib/Button'; import { Checkbox } from '@fluentui/react';
import { getAllColor, getAllLineStyle, getFrameLines } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getSceneAxisModifiedJSON } from "../../../../utils/graphDailogProperty/axisSubListJSON/axisModifyJSON";
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
    dropdown: { width: 150, height: 26, minHeight: 22 },
};
const dropdowncolor: Partial<IDropdownStyles> = {
    dropdown: { width: 80, height: 26, minHeight: 22 },
};


const stackTokens: IStackTokens = { childrenGap: 4 };
const options_dropdown1: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
];
const exampleOptions: IDropdownOption[] = [
    { key: 'Header', text: 'Options', itemType: DropdownMenuItemType.Header },
    { key: 'A', text: 'Option a', data: { icon: 'Memo' } },
    { key: 'B', text: 'Option b', data: { icon: 'Print' } },
];
const iconStyles = { marginRight: '8px' };

const FrameLines = (props: any) => {
    console.log("frame", props)

    const [lineColor, setLineColor] = useState(props.frameProp.x_major.linecolor);
    const [linethickness, setThickness] = useState(props.frameProp.x_major.linewidth);
    const [lineStyle, setLineStyle] = useState(props.frameProp.x_major.lineStyle)
    const [frameLine, setFrameLine] = useState("viewer")

    const allListData = useRef({
        colorOptions: getAllColor(),
        lineStylesOptions: getAllLineStyle(),
        frameOptions: getFrameLines()
    })
    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__frame_lines")
      },[])
    useEffect(() => {
        setLineColor(props.frameProp.x_major.linecolor);
        setLineStyle(props.frameProp.x_major.gridStyle);
        setFrameLine("viewer")

        let wid = (props.frameProp.x_major.linewidth * 10) / 1000
        wid = Math.round(wid * 1000) / 1000;
        setThickness(wid);
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
            ...props.frameProp,
            linewidth: (value * 1000) / 10
        }
        setThickness(value)

        const [newLayout, newProperties] = getSceneAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

    const colorOnChange = (value:any) => {

        const newProps = {
            ...props.frameProp,
            linecolor: value
        }
        console.log(newProps)
        setLineColor(value)

        const [newLayout, newProperties] = getSceneAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
        props.graphPropertyOnChange(newLayout, newProperties)
    }
    const styleOnChange = (ev, item) => {

        const newProps = {
            ...props.frameProp,
            linecolor: item.key
        }
        setLineStyle(item.key)
        const [newLayout, newProperties] = getSceneAxisModifiedJSON(newProps, props.properties, props.layout, props.currAxis)
        props.graphPropertyOnChange(newLayout, newProperties)
    }


    const onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
        return (
            <div className="dropdownExample-placeholder">
                <Icon style={iconStyles} iconName={'MessageFill'} aria-hidden="true" />
                <span>{props.placeholder}</span>
            </div>
        );
    };
    const onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
        const option = options[0];

        return (
            <div>
                {option.data && option.data.icon && (
                    <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
                )}
                <span>{option.text}</span>
            </div>
        );
    };

    const onRenderCaretDown = (): JSX.Element => {
        return <Icon iconName="CirclePlus" />;
    };
    const onRenderOption = (option: IDropdownOption): JSX.Element => {
        return (
            <div>
                {option.data && option.data.icon && (
                    <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
                )}
                <span>{option.text}</span>
            </div>
        );
    };

    return (
            <div className="insets-container">
                <div className="insets-header">
                    <Label className="">
                        Frame Lines
                    </Label>
                </div>
                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg2">Select Lines</Label>
                    <Dropdown
                        // placeholder="Select an option"
                        selectedKey={frameLine}
                        // onRenderPlaceholder={onRenderPlaceholder}
                        // onRenderTitle={onRenderTitle}
                        // onRenderOption={onRenderOption}
                        // onRenderCaretDown={onRenderCaretDown}
                        styles={dropdownStyles}
                        options={allListData.current.frameOptions}
                        className="ms-lg2"
                    />
                </div>
                <div className="insets-header">
                    <Checkbox
                        label=""
                        checked={false}
                        disabled={true}
                        className=""
                    />
                    <Label className="ms-lg5">Show Front Lines</Label>
                </div>

                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>  
                    <Label className="ms-lg2">Style</Label>
                    <Dropdown
                        selectedKey={lineStyle}
                        defaultSelectedKey={lineStyle}
                        options={allListData.current.lineStylesOptions}
                        styles={dropdownStyles}
                        className={'ms-lg2'}
                        onChange={styleOnChange}
                        disabled
                    />
                </div>
                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>  
                    <Label className="ms-lg2">Thickness</Label>
                    <SpinButton
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
                            disabled
                            className="ms-lg2"
                        />
                </div>
                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg2">Color</Label>
                    <ColorPickerComponent
                        id="colorpicker"
                        value={lineColor}
                        mode="Palette"
                        change={(args) => colorOnChange(args.value)}
                        cssClass="e-hide-value"
                        disabled
                    />
                </div>
                
                <div className="insets-header">
                    <Checkbox
                        label=""
                        checked={false}
                        disabled={true}
                        className=""
                    />
                    <Label className="ms-lg5">Show Rear Lines</Label>
                </div>

                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>  
                    <Label className="ms-lg2">Style</Label>
                    <Dropdown
                        selectedKey={lineStyle}
                        defaultSelectedKey={lineStyle}
                        options={allListData.current.lineStylesOptions}
                        styles={dropdownStyles}
                        className={'ms-lg2'}
                        onChange={styleOnChange}
                        disabled
                    />
                </div>
                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>  
                    <Label className="ms-lg2">Thickness</Label>
                    <SpinButton
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
                            disabled
                            className="ms-lg2"
                        />
                </div>
                <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                    <Label className="ms-lg2">Color</Label>
                    <ColorPickerComponent
                        id="colorpicker"
                        value={lineColor}
                        mode="Palette"
                        change={(args) => colorOnChange(args.value)}
                        cssClass="e-hide-value"
                        disabled
                    />
                </div>
                

            </div>
        )
}

  export default FrameLines;
