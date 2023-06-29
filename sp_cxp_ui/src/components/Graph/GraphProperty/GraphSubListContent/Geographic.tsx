
import React, { useState, useRef, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { getAllColor, getAllRegion } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getChoroModifiedJSON } from "../../../../utils/graphDailogProperty/graphSubListJSON/graphModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Slider, IStackTokens, Stack, IStackStyles } from '@fluentui/react';
const onRenderPlanesOption = (planesoptions) => {
    return (
        <div>
            {planesoptions.data && planesoptions.data.icon && (
                <Icon iconName={planesoptions.data.icon} aria-hidden="true" title={planesoptions.data.icon} />
            )}
            <span style={{ marginLeft: '10px' }}>{planesoptions.text}</span>
        </div>
    );
};

const min = -100
const max = 100

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };

const getNumericPart = (value: string): number | undefined => {
    const valueRegex = /^(\d+(\.\d+)?).*/;
    if (valueRegex.test(value)) {
        const numericValue = Number(value.replace(valueRegex, '$1'));
        return isNaN(numericValue) ? undefined : numericValue;
    }
    return undefined;
};

const onValidate = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    let numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
        numericValue = Math.min(numericValue, max);
        numericValue = Math.max(numericValue, min);
        return String(numericValue);
    }
};


const Geographic = (props: any) => {
    console.log(props)
    const [region, setRegion] = useState(props.geog.scope)
    const [centerLat, setCenterLat] = useState(props.geog.center)
    const [centerLong, setCenterLong] = useState(props.geog.center)
    const [scale, setScale] = useState(props.geog.projection.scale)

    const allListData = useRef({
        regionOptions: getAllRegion()
    })


    useEffect(() => {
        setRegion(props.geog.scope)
        setScale(props.geog.projection.scale)
        console.log("geog", props.geog.scope)
        console.log("geog", allListData.current.regionOptions)
    }, [props])

    const regionOnChange = (ev: any, value: any) => {
        console.log("hi", value)
        const newProps = {
            ...props.geog,
            scope: value.key
        }

        const [newLayout, newProperties] = getChoroModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)

    }

    const centerLatOnChange = (value: any) => {

    }

    const scalerOnChange = (value: any) => {
        
        console.log("hi", value)
        const newProps = {
            ...props.geog,
            projection:{
                ...props.geog.projection,
                scale:value
            }
        }

        const [newLayout, newProperties] = getChoroModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
        
    }

    // const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, type: any): string | void => {
    //     const numericValue = getNumericPart(value);
    //     if (numericValue !== undefined) {
    //         let finalValue: any = Math.min(numericValue + 5, max);
    //         if (type === 'latitude') {
    //             centerLatOnChange(finalValue)
    //         }
    //         else {
    //             centerLongOnChange(finalValue)
    //         }
    //         finalValue = String(finalValue);
    //         return finalValue
    //     }
    // };

    // /** Decrement the value (or return nothing to keep the previous value if invalid) */
    // const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, type: any): string | void => {
    //     const numericValue = getNumericPart(value);
    //     if (numericValue !== undefined) {
    //         let finalValue: any = Math.max(numericValue - 5, min);
    //         if (type === 'latitude') {
    //             centerLatOnChange(finalValue)
    //         }
    //         else {
    //             centerLongOnChange(finalValue)
    //         }
    //         finalValue = String(finalValue);
    //         return finalValue
    //     };
    // }


    return (
        <div className="insets-container">
            <div className="insets-header">
                <Label className="">
                    Map Projection
                </Label>
            </div>
            <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Region</Label>
                <Dropdown
                    selectedKey={region}
                    options={allListData.current.regionOptions}
                    className={'ms-lg5'}
                    onChange={regionOnChange}
                />
            </div>
            <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Scale</Label>
                <Slider
                    // label="Example with formatted value"
                    max={10}
                    min={1}
                    onChange={scalerOnChange}
                    value={scale}
                    showValue={true}
                    className={'ms-lg7'}
                    styles={styles}

                />
            </div>
            {/* <div className="insets-header">
                <Label className="">
                    Map Positioning
                </Label>
            </div>
            <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Center Latitude</Label>
                <SpinButton
                    value={centerLat}
                    min={min}
                    max={max}
                    onValidate={onValidate}
                    onIncrement={(value, ev) => onIncrement(value, ev, 'latitude')}
                    onDecrement={(value, ev) => onDecrement(value, ev, 'latitude')}
                    // onChange={onChange}
                    className={'ms-lg5'}
                    incrementButtonAriaLabel="Increase value by 5"
                    decrementButtonAriaLabel="Decrease value by 5"
                    styles={styles}
                />
            </div>
            <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Center Longitude</Label>
                <SpinButton
                    value={centerLong}
                    min={min}
                    max={max}
                    onValidate={onValidate}
                    onIncrement={(value, ev) => onIncrement(value, ev, 'longtitde')}
                    onDecrement={(value, ev) => onDecrement(value, ev, 'longtitde')}
                    // onChange={onChange}
                    className={'ms-lg5'}
                    incrementButtonAriaLabel="Increase value by 5"
                    decrementButtonAriaLabel="Decrease value by 5"
                    styles={styles}
                />
            </div> */}


        </div>
    );
};


export default Geographic;