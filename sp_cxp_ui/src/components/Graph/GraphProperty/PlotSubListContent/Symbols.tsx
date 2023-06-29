import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { Stack, IStackProps, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import { getAllColor, getSymbolTypes, getFillColorScale } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getSymbolModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'
import { classNames } from '@syncfusion/ej2-buttons';
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'
import {
    Image,
  } from 'office-ui-fabric-react';
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};
const stackTokensbutton: IStackTokens = { childrenGap: 10 };
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 24 } };
let suffix = 'in';
let min = 0.005;
let max = 0.750;
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
    dropdown: { width: 170 },
    callout: { maxHeight: 300, overflowY: 'auto',},
};





const onRenderSymbolOption = (symbolsOptions) => {
    return (
        <div style={{display:"flex", alignItems:"center"}} className="colorScheme">
            {symbolsOptions.image && (<Image
                alt="ribbon-icon"
                src={symbolsOptions.image}
            />)}
            <span style={{ marginLeft: '2px' }}>{symbolsOptions.text}</span>
        </div>
    );
};

const onRenderTitleOption = (titleOptions) => {
    console.log("susu",titleOptions)
    return (
        <div style={{display:"flex", alignItems:"center"}} className="colorScheme">
            {titleOptions[0].image && (<Image
                alt="ribbon-icon"
                src={titleOptions[0].image}
            />)}
            <span style={{ marginLeft: '2px' }}>{titleOptions[0].text}</span>
        </div>
    );
  };
  

const Symbol = (props: any) => {
    console.log("sym", props)
    const [symbol, setSymbol] = useState(props.symbolProp.symbol);
    const [symbolSize, setsymbolSize] = useState(0.005);
    const [symbolColor, setSymbolColor] = useState(props.symbolProp.color);
    const [symbolColorScheme, setSymbolColorScheme] = useState(props.symbolProp.colorscale);
    const [edgeColor, setEdgeColor] = useState(props.symbolProp.line.color);
    const [edgeColorScheme, setEdgeColorScheme] = useState(props.symbolProp.line.colorscale);


    const [edgeThickness, setEdgeThickness] = useState((props.symbolProp.line.width * 10) / 1000);
    const options = useRef({
        colorSchemeOptions:getFillColorScale(),
        symbolOptions: getSymbolTypes()
    })

    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__plot_symbols")
      },[])
      
    useEffect(() => {
        let size: any;
        suffix = props.properties?.defaultUnit;
        [max, min] = get_MIN_MAX(suffix)
        step = get_Step(suffix)
        //difference for Bubble and allScatter kind. In bubble 'size' we need to pass as array for different symbol size
        if (Array.isArray(props.symbolProp.size)) {
            size  = convert_To_mmInchPoints(suffix, props.symbolProp.size[0])
        }
        else {
            size  = convert_To_mmInchPoints(suffix, props.symbolProp.size)
        }

        setSymbol(props.symbolProp.symbol);
        setsymbolSize(size);
        setSymbolColor(props.symbolProp.color);
        setEdgeColor(props.symbolProp.line.color);
        setSymbolColorScheme(props.symbolProp.colorscale);
        setEdgeColorScheme(props.symbolProp.line.colorscale);
        let edgeWid = size  = convert_To_mmInchPoints(suffix, props.symbolProp.line.width);
        //console.log("Effect--> ", edgeWid)
        setEdgeThickness(edgeWid);
        options.current.colorSchemeOptions=getFillColorScale()
        options.current.symbolOptions=getSymbolTypes()
        if(props.graphicCell.graphCellPlot[props.worksheetId]){
            props.graphicCell.graphCellPlot[props.worksheetId].clrColIdx.map(clm => {
                options.current.colorSchemeOptions.push({ key: clm, text: `Column ${clm}`, disabled: false, })
            })
    
            props.graphicCell.graphCellPlot[props.worksheetId].shpColIdx.map(clm => {
                options.current.symbolOptions.push({ key: clm, text: `Column ${clm}`, disabled: false, })
            })
        }
        


    }, [props])

    const changeProperties = (newProps) => {
        const [newLayout, newProperties] = getSymbolModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

    const symbolOnChange = (ev, item) => {
        const newProps = {
            marker: {
                ...props.symbolProp,
                symbol: item.key
            }
        }
        setSymbol(item.key);
        changeProperties(newProps);
    }

    /** Increment the value (or return nothing to keep the previous value if invalid) */
    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>, name?: string): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.min(numericValue + step, max);
            if (name === "size") {
                symbolSizeOnChange(finalValue)
            }
            if (name === "edge") {
                edgeThicknessOnChange(finalValue)
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
            if (name === "size") {
                symbolSizeOnChange(finalValue)
            }
            if (name === "edge") {
                edgeThicknessOnChange(finalValue)
            }
            finalValue = String(display_mmPxPt(suffix,finalValue)) + suffix;
            return finalValue
        };
    }

    const symbolSizeOnChange = (value) => {
        const newProps = {
            marker: {
                ...props.symbolProp,
                size: convert_To_Pixel(suffix, value)
            }
        }
        changeProperties(newProps);
    }

    const symbolColorOnChange = (value) => {
        const newProps = {
            marker: {
                ...props.symbolProp,
                color: value,
                colorscale: 'none'
            }
        }
        setSymbolColor(value);
        changeProperties(newProps);
    }

    const fillColorSchemeOnChange = (ev, item) => {
        const newProps = {
            marker: {
                ...props.symbolProp,
                colorscale: item.key
            }
        }
        changeProperties(newProps);
    }

    const edgeColorOnChange = (value) => {
        const newProps = {
            marker: {
                ...props.symbolProp,
                line: {
                    ...props.symbolProp.line,
                    color: value,
                    colorscale: 'none'
                }
            }
        }
        changeProperties(newProps);
    }
    const edgeColorSchemeOnChange = (ev, item) => {
        const newProps = {
            marker: {
                ...props.symbolProp,
                line:{
                    ...props.symbolProp.line,
                    colorscale: item.key
                }
                
            }
        }
        changeProperties(newProps);
    }


    const edgeThicknessOnChange = (value) => {
        const newProps = {
            marker: {
                ...props.symbolProp,
                line: {
                    ...props.symbolProp.line,
                    width: convert_To_Pixel(suffix, value)
                }
            }
        }
        changeProperties(newProps);
    }

    return (
        <div className="insets-container">
            <div className="insets-header">
                <Label className="">
                    Symbols
                </Label>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Type</Label>
                <Dropdown
                    selectedKey={symbol}
                    options={options.current.symbolOptions}
                    styles={dropdownStyles}
                    // onRenderOption={onRenderSymbolOption}
                    onChange={symbolOnChange}
                    className="ms-lg2"
                />
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Size</Label>
                <SpinButton
                    defaultValue={'0.005' + suffix}
                    value={symbolSize + suffix}
                    min={min}
                    max={max}
                    onValidate={onValidate}
                    onIncrement={(value, ev) => onIncrement(value, ev, "size")}
                    onDecrement={(value, ev) => onDecrement(value, ev, "size")}
                    incrementButtonAriaLabel="Increase value by 2"
                    decrementButtonAriaLabel="Decrease value by 2"
                    styles={styles}
                    onChange={onChange}
                    className="ms-lg2"
                />
            </div>
            <div className="insets-header">
                <Label className="">
                    Fill
                </Label>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Color</Label>
                <ColorPickerComponent
                    id="colorpicker"
                    value={symbolColor}
                    mode="Palette"
                    change={(args) => symbolColorOnChange(args.value)}
                    cssClass="e-hide-value"
                />
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Color Scheme</Label>
                <Dropdown
                    selectedKey={symbolColorScheme}
                    options={options.current.colorSchemeOptions}
                    styles={dropdownStyles}
                    onChange={fillColorSchemeOnChange}
                    className="ms-lg2"
                    onRenderOption={onRenderSymbolOption}
                    onRenderTitle={onRenderTitleOption}
                />
            </div>
            <div className="insets-header">
                <Label className="">
                    Edge
                </Label>
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Color</Label>
                <ColorPickerComponent
                    id="colorpicker"
                    value={edgeColor}
                    mode="Palette"
                    change={(args) => edgeColorOnChange(args.value)}
                    cssClass="e-hide-value"
                />
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Color Scheme</Label>
                <Dropdown
                    selectedKey={edgeColorScheme}
                    options={options.current.colorSchemeOptions}
                    styles={dropdownStyles}
                    onChange={edgeColorSchemeOnChange}
                    className="ms-lg2"
                    onRenderOption={onRenderSymbolOption}
                    onRenderTitle={onRenderTitleOption}
                />
            </div>
            <div className={'d-flex'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
                <Label className="ms-lg2">Thickness</Label>
                <SpinButton
                    defaultValue={'1.000' + suffix}
                    value={edgeThickness + suffix}
                    min={min}
                    max={max}
                    onValidate={onValidate}
                    onIncrement={(value, ev) => onIncrement(value, ev, "edge")}
                    onDecrement={(value, ev) => onDecrement(value, ev, "edge")}
                    onChange={onChange}
                    incrementButtonAriaLabel="Increase value by 2"
                    decrementButtonAriaLabel="Decrease value by 2"
                    styles={styles}
                    className="ms-lg2"
                />
            </div>
            {/* <div className="insets-header">
                <Label className="">
                    Symbols Text
                </Label>
            </div>

            <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <TextField
                    // value={title}
                    // onChange={titleOnChange}
                    disabled={true}
                    className="ms-lg11"
                />
            </div>
            <div className={'d-flex'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <DefaultButton
                    text="Symbol Font"
                    allowDisabledFocus
                    disabled={true}
                    className="ms-lg5"
                    style={{ fontSize: '12px' }} />
                <div className="ms-lg1"></div>
                <DefaultButton
                    text="Special Text"
                    allowDisabledFocus
                    disabled={true}
                    className="ms-lg5"
                    style={{ fontSize: '12px' }}
                />
            </div> */}

        </div>
    )
}


  export default Symbol;
