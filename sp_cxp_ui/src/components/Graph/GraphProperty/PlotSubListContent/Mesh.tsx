import React, { useState, useEffect } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox } from '@fluentui/react';
import { getAllColor, getAllLineDash, getAllLineShape } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getLinesModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";




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
    dropdown: { width: 150, height: 22, minHeight: 22 },
};


const stackTokens: IStackTokens = { childrenGap: 4 };
const options_dropdown1: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
];


const colorOptions: IDropdownOption[] = getAllColor();

const Mesh = (props: any) => { 
    console.log("mesh",props)

    const [thickness, setThickness] = useState(props.linesProp.width);
    const [color, setColor] = useState(props.linesProp.color);

useEffect(()=>{
    props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__mesh")

},[])
    useEffect(() => {
        setColor(props.linesProp.color);
        let wid = (props.linesProp.width*10)/1000
        wid = Math.round(wid*1000)/1000;
        setThickness(wid);

    }, [props])


    const changeProperties = (newProps) => {
        const [newLayout, newProperties] = getLinesModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

 

    const colorOnChange = (ev, item) => {
        const newProps = {
            line: {
                ...props.linesProp,
                color: item.key
            }
        }
        setColor(item.key);
        changeProperties(newProps);
    }
     /** Increment the value (or return nothing to keep the previous value if invalid) */
     const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue:any = Math.min(numericValue + 0.005, max) ;
            thicknessOnChange(finalValue)
            finalValue = String(Math.round(finalValue*1000)/1000) + suffix;
            console.log(finalValue)
            return finalValue
        }
    };

    /** Decrement the value (or return nothing to keep the previous value if invalid) */
    const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue:any = Math.max(numericValue - 0.005, min) ;          
            thicknessOnChange(finalValue)
            finalValue = String(Math.round(finalValue*1000)/1000) + suffix;
            return finalValue
        };
    }

    const thicknessOnChange = (value) => {
        const newProps = {
            line: {
                ...props.linesProp,
                width: (value*1000)/10
            }
        }
        
        //console.log("Effect--> ", edgeWid)
        changeProperties(newProps);
    }

    return (
        <div className="ms-Grid d-3d-line" dir="ltr">
            <div className="ms-Grid-row" style={{ padding: '0px' }}>
                <Text variant={'smallPlus'} style={{ fontWeight: 700 }} block>
                    Lines 
                </Text>
            </div>
            <Stack tokens={stackTokens}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4">
                        <Label>Color</Label>
                    </div>
                    <div className="ms-Grid-col ms-sm8">
                        <Dropdown
                            selectedKey={color}
                            options={colorOptions}
                            styles={dropdownStyles}
                            onChange={colorOnChange}
                            disabled
                        />
                    </div>
                </div>
           
                <div className="ms-Grid-row" >
                    <div className="ms-Grid-col ms-sm4">
                        <Label>Thickness</Label>
                    </div>
                    <div className="ms-Grid-col ms-sm8">
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
                            disabled
                        />
                    </div>
                </div>
                <div className="ms-Grid-row" style={{ padding: '0px' }}>
                    <Text variant={'smallPlus'} style={{ fontWeight: 700 }} block>
                        Fill Colors
                    </Text>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4">
                        <Label>Color</Label>
                    </div>
                    <div className="ms-Grid-col ms-sm8">
                        <Dropdown
                            selectedKey={color}
                            options={colorOptions}
                            styles={dropdownStyles}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="ms-Grid-row">
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4">
                        <Label>Transition</Label>
                    </div>
                    <div className="ms-Grid-col ms-sm8">
                        <Dropdown
                            placeholder="Discrete"
                            options={options_dropdown1}
                            styles={dropdownStyles}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12">
                <Checkbox label="Transparent"
                disabled
                //  onChange={_onChange} 
                 />
                 </div>
                </div>
            </Stack>
        </div>
    )
}
export default Mesh