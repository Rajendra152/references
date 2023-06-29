import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { getAllColor, getAllLineDash, getAllLineShape,getFillColorScale } from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getLinesModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'
import {
    Image,
  } from 'office-ui-fabric-react';

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
    dropdown: { width: 150 },
    callout: { maxHeight: 250, overflowY: 'auto' }
};

const stackTokens: IStackTokens = { childrenGap: 4 };


const options_dropdown1: IDropdownOption[] = [
    { key: 'above', text: 'Line Front' },
    { key: 'below', text: 'Line Behind' },
  ];

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

const shapeOptions: IDropdownOption[] = getAllLineShape();

const Lines = (props: any) => {
    console.log(props)
    const [style, setStyle] = useState(props.linesProp.dash);
    const [thickness, setThickness] = useState(props.linesProp.width);
    const [shape, setShape] = useState(props.linesProp.shape);
    const [color, setColor] = useState(props.linesProp.color);
    const [colorScheme, setColorScheme] = useState(props.linesProp.colorscheme);
    const [gapColor, setGapColor] = useState("black");
    const [layering, setLayering] = useState("");
    const options = useRef({
        colorSchemeOptions:getFillColorScale(),
        dashOptions: getAllLineDash(),
    })

    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__plot_lines")
      },[])
      
    useEffect(() => {
        suffix = props.properties?.defaultUnit;
        [max, min] = get_MIN_MAX(suffix)
        step = get_Step(suffix)
        setStyle(props.linesProp.dash);
        setShape(props.linesProp.shape);
        setColor(props.linesProp.color);      
        setColorScheme(props.linesProp.colorscheme);
        let wid = convert_To_mmInchPoints(suffix, props.linesProp.width)
        setThickness(wid);

        options.current.colorSchemeOptions=getFillColorScale()
        options.current.dashOptions= getAllLineDash()
        if(props.graphicCell.graphCellPlot[props.worksheetId]){
            props.graphicCell.graphCellPlot[props.worksheetId].clrColIdx.map(clm => {
                console.log("-----------------",clm)
                options.current.colorSchemeOptions.push({ key: clm, text: `Column ${clm}`, disabled: false, })
            })
    
            props.graphicCell.graphCellPlot[props.worksheetId].lnColIdx.map(clm => {
                options.current.dashOptions.push({ key: clm, text: `Column ${clm}`, disabled: false, })
            })
        }
        

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
        changeProperties(newProps);
    }

    const colorOnChange = (value) => {
        const newProps = {
            line: {
                ...props.linesProp,
                color: value,
                colorscheme:'none'
            }
        }
        changeProperties(newProps);
    }

    const colorSchemeOnChange = (ev, item) => {
        const newProps = {
            line: {
                ...props.linesProp,
                colorscheme:item.key
            }
        }
        changeProperties(newProps);
    }

    const shapeOnChange = (ev, item) => {
        const newProps = {
            line: {
                ...props.linesProp,
                shape: item.key
            }
        }
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
    const layerOnChange = (_, item) => {
        const newProps = {
          line: {
            ...props.linesProp,
            layer: item.key,
          },
        };
        changeProperties(newProps);
      };

    return (
        <div className="insets-container">
            <div className="insets-header">
                <Label className="">
                    Lines Style
                </Label>
            </div>
            <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg5">Style</Label>
                <Dropdown
                    selectedKey={style}
                    options={options.current.dashOptions}
                    styles={dropdownStyles}
                    onChange={styleOnChange}
                    className="ms-lg2"
                />
            </div>
            <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg5">Thickness</Label>
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
            <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg5">Shape</Label>
                <Dropdown
                    selectedKey={shape}
                    options={shapeOptions}
                    styles={dropdownStyles}
                    onChange={shapeOnChange}
                    className="ms-lg2"
                />
            </div>

            <div className="insets-header">
                <Label className="">
                    Line Color
                </Label>
            </div>

            <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg5">Color</Label>
                <ColorPickerComponent
                    id="colorpicker"
                    value={color}
                    mode="Palette"
                    change={(args) => colorOnChange(args.value)}
                    cssClass="e-hide-value"
                />
            </div>
            <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg5">Color Scheme</Label>
                <Dropdown
                    selectedKey={colorScheme}
                    options={options.current.colorSchemeOptions}
                    styles={dropdownStyles}
                    onChange={colorSchemeOnChange}
                    className="ms-lg2"
                    onRenderOption={onRenderSymbolOption}
                    onRenderTitle={onRenderTitleOption}
                />
            </div>
            {/* <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg5">Gap color</Label>
                <ColorPickerComponent
                    id="colorpicker"
                    value={gapColor}
                    mode="Palette"
                    change={(args) => console.log(args.value)}
                    cssClass="e-hide-value"
                    disabled
                />
            </div>
            <div className={'d-flex align-items-center'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                <Label className="ms-lg5">Gap ColorScheme</Label>
                <Dropdown
                    selectedKey={colorScheme}
                    options={options.current.colorSchemeOptions}
                    styles={dropdownStyles}
                    onChange={colorSchemeOnChange}
                    className="ms-lg2"
                    disabled
                    onRenderOption={onRenderSymbolOption}
                />
            </div> */}

            {/* <div className="insets-header">
                <Label className="">Layering</Label>
            </div>
            <div className={'d-flex align-items-center'} style={{ marginBottom: '5px', marginLeft: '5px' }}>
                <Label className="ms-lg5">Lines</Label>
                <Dropdown
                    placeholder="Behind symbol"
                    options={options_dropdown1}
                    styles={dropdownStyles}
                    // disabled={true}
                    className="ms-lg2"
                    onChange={layerOnChange}
                />
            </div> */}

        </div>
    )
}


  export default Lines;
