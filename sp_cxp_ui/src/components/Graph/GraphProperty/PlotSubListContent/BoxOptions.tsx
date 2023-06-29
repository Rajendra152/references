import React, { useState, useEffect, useRef } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Checkbox } from '@fluentui/react';
import { Dropdown, IDropdownOption, IDropdownStyles, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { getBoxOptionsModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";
import { getAllColor, getOutliersTypes, getAllBoxLineDash } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'

// add outliers handling options

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
let suffix = 'in';
let min = 0.005;
let max = 0.750;
let step= 0.005;

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },  
    callout: { maxHeight: 250, overflowY: 'auto' }
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



const BoxOptions = (props: any) => {
    console.log(props.boxProp)
    const [boxmean, setMeanLine] = useState(props.boxProp.boxmean);
    const [meanstyle, setMeanstyle] = useState(props.boxProp.meanstyle.meancolor);
    const [gapColor, setgapColor] = useState(props.boxProp.meanstyle.meangapcolor);
    const [color, setColor] = useState(props.boxProp.meanstyle.meancolor);
    const [whiskerwidth, setWiskerWidth] = useState(props.boxProp.whiskerwidth);
    const [thickness, setThickness] = useState(props.boxProp.meanstyle.meanwidth);
    const [length, setLength] = useState(0.005);
    const [outlier, setOutlier] = useState(props.boxProp.outlierType);
    const [dash, setDash] = useState(props.boxProp.meanstyle.meanpad);




    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__box_options")
      },[])

    useEffect(() => {
        suffix = props.properties?.defaultUnit;
        [max, min] = get_MIN_MAX(suffix)
        step = get_Step(suffix)
        // let wid =  convert_To_mmInchPoints(suffix, props.boxProp.whiskerwidth);
        setMeanLine(props.boxProp.boxmean);
        setWiskerWidth(props.boxProp.whiskerwidth)

        setgapColor(props.boxProp.meanstyle.meangapcolor)
        setColor(props.boxProp.meanstyle.meancolor)
        setDash(props.boxProp.meanstyle.meanpad)
        let meanwid = convert_To_mmInchPoints(suffix, props.boxProp.meanstyle.meanwidth);
        setThickness(meanwid);

    }, [props])

    console.log("box", props.boxProp)

    /** Increment the value (or return nothing to keep the previous value if invalid) */
    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.min(numericValue + step, max);
            if (name === "thickness") {
                meanWidthOnChange(finalValue)
                finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
            }
            else if (name === "length") {
                setLength(finalValue)
                finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
            }
            else if (name === "whiskerwidth") {
                let numVal= +numericValue.toFixed(2)
                numVal = numVal + 0.1
                numVal = +numVal.toFixed(2)
                finalValue = Math.min(numVal, 1);
                whiskerwidthonchange(finalValue)
            }
            
            console.log(finalValue)
            return finalValue
        }
    };

    /** Decrement the value (or return nothing to keep the previous value if invalid) */
    const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.max(numericValue - step, min);
            if (name === "thickness") {
                meanWidthOnChange(finalValue)
                finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
            }
            else if (name === "length") {
                setLength(finalValue)
                finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
            }
            else if (name === "whiskerwidth") {
                let numVal= +numericValue.toFixed(2)
                numVal = numVal - 0.1
                numVal = +numVal.toFixed(2)
                finalValue = Math.max(numVal, 0);
                whiskerwidthonchange(finalValue)
            }

            
            return finalValue
        };
    }

    const whiskerwidthonchange = (value) => {
        const newProps = {
            ...props.boxProp,
            whiskerwidth: value

        }
        changeProperties(newProps);
    }

    const meanWidthOnChange = (value) => {
        console.log("rey..",value)
        const newProps = {
            ...props.boxProp,
            meanstyle:{
                ...props.boxProp.meanstyle,
                meanwidth: convert_To_Pixel(suffix, value)
            }

        }
        changeProperties(newProps);
    }


    const changeProperties = (newProps) => {
        const [newLayout, newProperties] = getBoxOptionsModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }


    const changeMeanLine = () => {
        const newProps = {
            ...props.boxProp,
            boxmean: !boxmean
        }
        changeProperties(newProps);
    }

    const changeMeanColor = (param) => {

        const newProps = {
            ...props.boxProp,
            meanstyle:{
                ...props.boxProp.meanstyle,
                meancolor: param
            }
        }
        changeProperties(newProps);
    }

    const changeMeanGapColor = (param) => {

           const newProps = {
            ...props.boxProp,
            meanstyle:{
                ...props.boxProp.meanstyle,
                meangapcolor: param
            }
        }
            changeProperties(newProps);
    }


    const outlierOnChange = (param, value) =>{
        setOutlier(value.key);
        const newProps = {
            ...props.boxProp,
            outlierType: value.key
        }
        changeProperties(newProps);
    }

    const dashOnChange = (param, value) =>{
        const newProps = {
            ...props.boxProp,
            meanstyle:{
                ...props.boxProp.meanstyle,
                meanpad: value.key
            },
            boxmean: value.key == 'none' ? false : true
        }
        changeProperties(newProps);
        
    }
    

    return (
        <div className="ms-Grid box" dir="ltr" >
            <div className="ms-Grid-row insets-container" >
                <div className='insets-header' style={{marginTop:'5px', marginBottom:'5px'}}>
                   <Checkbox checked={boxmean} onChange={() => changeMeanLine()} />       
                   <Label >Show Mean line</Label>
                </div>
                <div>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                       <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                       <Label>Thickness</Label>
                       </div>
                       <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                            <SpinButton
                                value={thickness + suffix}
                                min={min}
                                max={max}
                                onValidate={onValidate}
                                onIncrement={(value, ev) => onIncrement(value, ev, "thickness")}
                                onDecrement={(value, ev) => onDecrement(value, ev, "thickness")}
                                onChange={onChange}
                                incrementButtonAriaLabel="Increase value by 2"
                                decrementButtonAriaLabel="Decrease value by 2"
                                styles={styles}
                                // disabled
                            />
                       </div>
                    </div>
                    <div className="ms-Grid-row" style={{marginTop:'10px'}}>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                        <Label>Color</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                        <ColorPickerComponent
                                id="colorpicker"
                                value={color}
                                mode="Palette"
                                // change={(args) => console.log(args.value)}
                                change={(args) => changeMeanColor(args.value)} 
                                cssClass="e-hide-value"
                                // disabled
                            />
                        </div>
                    </div>
                    <div className="ms-Grid-row" style={{marginTop:'10px'}}>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                        <Label>Gap color</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                        <ColorPickerComponent
                                id="colorpicker"
                                value={gapColor}
                                mode="Palette"
                                change={(args) => changeMeanGapColor(args.value)} 
                                cssClass="e-hide-value"
                                // disabled
                            />
                        </div>
                    </div>
                    <div className="ms-Grid-row" style={{marginTop:'10px'}}>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6"></div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6"></div>
                    </div>
                </div>
                </div>
                <div className='insets-header' style={{marginTop:'5px', marginBottom:'5px'}}>
                   <Label >Whisker Cap</Label>
                   </div>
                   <div>
                   <div className="ms-Grid">
                   <div className="ms-Grid-row" >
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                            <Label>Width</Label>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                        <SpinButton
                                value={whiskerwidth+''}
                                min={min}
                                max={max}
                                onValidate={onValidate}
                                onIncrement={(value, ev) => onIncrement(value, ev, "whiskerwidth")}
                                onDecrement={(value, ev) => onDecrement(value, ev, "whiskerwidth")}
                                onChange={onChange}
                                incrementButtonAriaLabel="Increase value by 2"
                                decrementButtonAriaLabel="Decrease value by 2"
                                styles={styles}
                            />
                        </div>
                    </div>
                   </div>
                   </div>
              
                <div className='insets-header' style={{marginTop:'10px', marginBottom:'10px'}}>
                   <Label >Outliers Handling</Label>
                </div>
                <div>
                <Dropdown
                                selectedKey={outlier}
                                options={getOutliersTypes()}
                                styles={dropdownStyles}
                                onChange={(e, value)=>outlierOnChange(e, value)}
                                // disabled
                            />
                </div>
                <div className='insets-header' style={{marginTop:'10px', marginBottom:'10px'}}>
                   <Label >Line Type</Label>
                </div>
                <div>
                <Dropdown
                                selectedKey={dash}
                                options={getAllBoxLineDash()}
                                styles={dropdownStyles}
                                onChange={(e, value)=>dashOnChange(e, value)}
                                // disabled
                            />
                </div>
            </div>
        </div>
        )
}

  export default BoxOptions;
