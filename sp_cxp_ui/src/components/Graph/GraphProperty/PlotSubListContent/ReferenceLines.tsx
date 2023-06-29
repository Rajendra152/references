import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownStyles, IDropdownOption, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { MaskedTextField } from '@fluentui/react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox } from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';

import {
    getAllColor, getFillDirection, getRefType, getRefCalculation, getRefDirection, getLayering, getAllDropLineDash
} from "../../../../utils/graphDailogProperty/differentPropertyList";
import { getRefLineModifiedJSON } from "../../../../utils/graphDailogProperty/plotSubListJSON/plotModifyJSON";

import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { getSpreadsheetColumn } from '../../../../services/graphPageServices/GraphServices';
import { CONFIDENCE_95 } from '../../../Constant/ErrorCalculationTypes';
import { convert_To_Pixel, convert_To_mmInchPoints, get_MIN_MAX, get_Step, display_mmPxPt } from '../../../../utils/conversion'



const maskFormat: { [key: string]: RegExp } = {
    '*': /[0-9_]/,
};
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100, height: 21 } };
let suffix = ' in';
let min = 0.005;
let max = 0.750;
let step = 0.005;

const options_dropdown1: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
];
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 100 },
};


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

const typeOptions: IDropdownOption[] = getRefType();
const calculationOptions: IDropdownOption[] = getRefCalculation();
const directionOptions: IDropdownOption[] = getRefDirection();
const layeringOptions: IDropdownOption[] = getLayering();
const colorOptions: IDropdownOption[] = getAllColor();
const lineStyleOptions: IDropdownOption[] = getAllDropLineDash();

const ReferenceLines = (props: any) => {

    const [refType, setRefType] = useState(props.refreProp.specification);
    const [calculation, setCalculation] = useState("stddev");
    const [direction, setDirection] = useState("x-hor");
    const [layering, setLayering] = useState(props.refreProp.layer);
    const [color, setColor] = useState(props.refreProp.color);
    const [gapColor, setgapColor] = useState("");
    const [lineStyle, setLineStyle] = useState(props.refreProp.dash);
    const [thickness, setThickness] = useState(props.refreProp.width);
    const [mask, setMask] = useState(0);
    const [mean, setMean] = useState(0);
    const [stddev, setStdDev] = useState(0);
    const [worksheetData, setWorkSheetData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [calMean, setCalMean] = useState(0);


    useEffect(() => {
        suffix = props.properties?.defaultUnit;
        [max, min] = get_MIN_MAX(suffix)
        step = get_Step(suffix)
        let wid = convert_To_mmInchPoints(suffix, props.refreProp.width)
        setThickness(wid);
        var ActiveWorkSheetId = props.notebooks.allGraphPages.byId[props.allActiveItem.graphPage.id];
        var worksheet = props.openWorksheets.filter(item => item.key == ActiveWorkSheetId.worksheetId);
        var GraphData = getSpreadsheetColumn(worksheet, [1]);
        GraphData.then((result) => setWorkSheetData(result));
    }, [props])

    const changeProperties = (newProps: any) => {
        const [newLayout, newProperties] = getRefLineModifiedJSON(newProps, props.properties, props.layout)
        props.graphPropertyOnChange(newLayout, newProperties)
    }

    /** Increment the value (or return nothing to keep the previous value if invalid) */
    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        console.log("step",step,value)
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.min(numericValue + step, max);
            onChange(finalValue)
            // let finalValue1 = Math.round(finalValue * 1000) / 1000;
            finalValue = String(display_mmPxPt(suffix, finalValue)) + suffix;
            console.log("thick", finalValue)
            return finalValue
        }
    };

    /** Decrement the value (or return nothing to keep the previous value if invalid) */
    const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        console.log("step",step,value)
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue: any = Math.max(numericValue - step, min);
            onChange(finalValue)
            finalValue = String(display_mmPxPt(suffix, finalValue)) + suffix;
            return finalValue
        };
    };


    /** This will be called after each change */
    const onChange = (value: any) => {
        const newProps = {
            line: {
                ...props.refreProp,
                width: convert_To_Pixel(suffix, value)
            }
        }
        changeProperties(newProps);
    }

    const colorPicker = (value: any) => {
        const newProps = {
            line: {
                ...props.refreProp,
                color: value
            }
        }
        setColor(value);
        changeProperties(newProps);
    }

    const gapColorPicker = (value: any) => {
        const newProps = {
            line: {
                ...props.refreProp,
                flag: true,
                gapColor: value
            }
        }
        setgapColor(value);
        changeProperties(newProps);
    }

    const styleOnChange = (ev, item) => {
        const newProps = {
            line: {
                ...props.refreProp,
                dash: item.key
            }
        }
        if (item.key != 'solid') {
            setFlag(true)
        }
        setLineStyle(item.key);
        changeProperties(newProps);
    }

    const stdNumber = (ev, value: any) => {
        console.log("stdNum", value);
        setMask(value);
        calculation != 'constant' ? calculationChanges(refType, value) : confidentInterval(calculation, value);
    }

    const refLineDirectionChange = (ev, item) => {
        const newProps = {
            line: {
                ...props.refreProp,
                direction: item.key
            }
        }
        setDirection(item.key);
        changeProperties(newProps);
    }

    const layerOnChange = (ev, item) => {
        const newProps = {
            line: {
                ...props.refreProp,
                layer: item.key
            }
        }
        setLayering(item.key);
        changeProperties(newProps);
    }

    const variance = (arr: any) => {
        var len = 0;
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == "") { }
            else if (!isNum(arr[i])) {
                alert(arr[i] + " is not number, Variance Calculation failed!");
                return 0;
            }
            else {
                len = len + 1;
                sum = sum + parseFloat(arr[i]);
            }
        }
        var v = 0;
        if (len > 1) {
            var mean = sum / len;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == "") { }
                else { v = v + (arr[i] - mean) * (arr[i] - mean); }
            }
            return v / len;
        }
        else { return 0; }
    }

    const isNum = (args: any) => {
        args = args.toString();
        if (args.length == 0) return false;
        for (var i = 0; i < args.length; i++) {
            if ((args.substring(i, i + 1) < "0" || args.substring(i, i + 1) > "9")
                && args.substring(i, i + 1) != "." && args.substring(i, i + 1) != "-") { return false; }
        }
        return true;
    }

    const calcMean = (arr: any) => {
        var len = 0;
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == "") { }
            else if (!isNum(arr[i])) {
                alert(arr[i] + " is not number!");
                return;
            }
            else {
                len = len + 1;
                sum = sum + parseFloat(arr[i]);
            }
        }
        setCalMean(sum / len);
        return sum / len;
    }

    const confident95 = (arr: any, z: number) => {
        let CI: any;
        let xmean: any;
        let sd: any;
        xmean = calcMean(worksheetData && worksheetData);
        sd = Math.sqrt(variance(worksheetData && worksheetData));
        CI = z * (sd / Math.sqrt(arr.length));
        return xmean + CI;
    }

    const refLineTypeOnChange = (ev, item: any) => {
        setRefType(item.key);
        if (item.key == "upperspec") {
            setMask(3)
            setCalculation('stddev')
            calculationChanges(item.key, 3);
        } else if (item.key == "upperctrl") {
            setMask(1)
            setCalculation('stddev')
            calculationChanges(item.key, 1);
        } else if (item.key == "mean") {
            setMask(0)
            setCalculation('meanonly')
            calculationChanges(item.key, mask);
        } else if (item.key == 'lowerctrl') {
            setMask(-1)
            setCalculation('stddev')
            calculationChanges(item.key, 1);
        } else if (item.key == 'lowerspec') {
            setMask(-3)
            setCalculation('stddev')
            calculationChanges(item.key, 3);
        } else {
            calculationChanges(item.key, mask);
        }
    }

    const refLinecalculation = (ev, item: any) => {
        console.log("reflineCalc", item.key);
        setCalculation(item.key);
        confidentInterval(item.key, mask);
    }

    const confidentInterval = (calc: any, mask: any) => {
        const newProps = {
            line: {
                ...props.refreProp,
                specification: calculation
            }
        }
        if (calc == 'meanonly') {
            let std: any;
            let stdDevNumber: number;
            setMask(0);
            std = calcMean(worksheetData && worksheetData);
            stdDevNumber = std;
            console.log("stddev", refType);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: refType,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);
        } else if (calc == 'stddev') {
            let std: any;
            let stdDevNumber: number;
            console.log("GetActiveItem", props.allActiveItem);
            calcMean(worksheetData && worksheetData);
            std = Math.sqrt(variance(worksheetData && worksheetData));
            console.log("worksheet", std);
            stdDevNumber = calMean + (std * mask);
            console.log("worsheetdatacount", stdDevNumber);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: refType,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);

        } else if (calc == 'stderr') {
            let std: any;
            let stdDevNumber: number;
            console.log("GetActiveItem", props.allActiveItem);
            calcMean(worksheetData && worksheetData);
            std = Math.sqrt(variance(worksheetData && worksheetData) / (worksheetData.length - 1));
            console.log("worksheet", std);
            stdDevNumber = calMean + (std * mask);
            console.log("worsheetdatacount", stdDevNumber);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: refType,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);

        } else if (calc == '95%conf') {
            let std: any;
            let stdDevNumber: number;
            console.log("GetActiveItem", props.allActiveItem);
            std = confident95(worksheetData && worksheetData, 1.96);
            console.log("worksheet", std);
            stdDevNumber = std + mask;
            console.log("worsheetdatacount", stdDevNumber);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: refType,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);

        } else if (calc == '99%conf') {
            let std: any;
            let stdDevNumber: number;
            console.log("GetActiveItem", props.allActiveItem);
            std = confident95(worksheetData && worksheetData, 2.58);
            console.log("worksheet", std);
            stdDevNumber = std + mask;
            console.log("worsheetdatacount", stdDevNumber);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: refType,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);

        } else if (calc == 'constant') {
            let stdDevNumber: number;
            stdDevNumber = 0 + mask;
            console.log("worsheetdatacount", stdDevNumber);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: refType,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);

        } else {
            changeProperties(newProps);
        }
    }

    const calculationChanges = (linekey: any, data: number) => {
        const newProps = {
            line: {
                ...props.refreProp,
                specification: linekey
            }
        }
        if (linekey == "upperspec") {
            let std: any;
            let stdDevNumber: number;
            console.log("GetActiveItem", props.allActiveItem);
            calcMean(worksheetData && worksheetData);
            std = Math.sqrt(variance(worksheetData && worksheetData));
            console.log("worksheet", std);
            stdDevNumber = calMean + (std * data);
            console.log("worsheetdatacount", stdDevNumber);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: linekey,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);

        } else if (linekey == "upperctrl") {
            let std: any;
            let stdDevNumber: number;
            let stdInc: number;
            console.log("GetActiveItem", props.allActiveItem);
            std = Math.sqrt(variance(worksheetData && worksheetData));
            console.log("worksheet", std);
            stdInc = std * data;
            stdDevNumber = calMean + stdInc;
            console.log("worsheetdatacount", stdDevNumber);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: linekey,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);

        } else if (linekey == "mean") {
            let std: any;
            let stdDevNumber: number;
            std = calcMean(worksheetData && worksheetData);
            stdDevNumber = std;
            console.log("stddev", stdDevNumber);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: linekey,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);
        } else if (linekey == 'lowerctrl') {
            let std: any;
            let stdDevNumber: number;
            let stdInc: number;
            std = Math.sqrt(variance(worksheetData && worksheetData));
            stdInc = std * data;
            console.log("stdInc", stdInc);
            console.log("calMean", calMean);
            stdDevNumber = calMean - stdInc;
            console.log("stddev", stdDevNumber);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: linekey,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);
        } else if (linekey == 'lowerspec') {
            let std: any;
            let stdDevNumber: number;
            let stdInc: number;
            std = Math.sqrt(variance(worksheetData && worksheetData));
            stdInc = std * data;
            stdDevNumber = calMean - stdInc;
            console.log("stddev", stdDevNumber);
            const newProps = {
                line: {
                    ...props.refreProp,
                    specification: linekey,
                    axis: stdDevNumber
                }
            }
            changeProperties(newProps);
        } else {
            changeProperties(newProps);
        }
    }


    return (
        <div className="referline">
            <div className="ms-Grid" dir="ltr" style={{ padding: '5px 0px' }}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm3">
                        <Label style={{ padding: '4px 0px' }}>Type</Label></div>
                    <div className="ms-Grid-col ms-sm9">
                        <Dropdown
                            selectedKey={refType}
                            options={typeOptions}
                            onChange={refLineTypeOnChange}
                        />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm3">
                        <Label style={{ padding: '4px 0px' }}>Calculation</Label></div>
                    <div className="ms-Grid-col ms-sm5">
                        <Dropdown
                            options={calculationOptions}
                            selectedKey={calculation}
                            onChange={refLinecalculation}
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm1">
                        <span style={{ fontSize: '15px', lineHeight: '1px' }}>x</span>
                    </div>
                    <div className="ms-Grid-col ms-sm3">
                        <TextField
                            name={`Adding number`}
                            className={'ms-lg9'}
                            value={mask}
                            onChange={(e, value) => stdNumber(e, value)}
                        />
                    </div>
                </div>
                <div className="ms-Grid-row" style={{ padding: ' 0px' }}>
                    <div className="ms-Grid-col ms-sm3">
                        <Label style={{ padding: '4px 0px' }}>Direction</Label></div>
                    <div className="ms-Grid-col ms-sm9">
                        <Dropdown
                            options={directionOptions}
                            selectedKey={direction}
                            onChange={refLineDirectionChange}
                        />
                    </div>
                </div>
                <div className="ms-Grid-row" style={{ padding: ' 0px' }}>
                    <div className="ms-Grid-col ms-sm3">
                        <Label style={{ padding: '4px 0px' }}>Layering</Label></div>
                    <div className="ms-Grid-col ms-sm9">
                        <Dropdown
                            options={layeringOptions}
                            selectedKey={layering}
                            onChange={layerOnChange}
                        />
                    </div>
                </div>
                <div className="ms-Grid-row" style={{ padding: '0px' }}>
                    <div className="ms-Grid-col ms-sm3">
                        <Label style={{ padding: '4px 0px' }} >Label</Label></div>
                    <div className="ms-Grid-col ms-sm9">
                        <TextField disabled={true} value="Upper control line" />

                    </div>
                </div>
                <div className="ms-Grid-row" style={{ padding: '0px' }}>
                    <div className="ms-Grid-col ms-sm3">
                        <Label ></Label></div>
                    <div className="ms-Grid-col ms-sm9">
                        <div className="ms-Grid-row check-refer">
                            <div className="ms-Grid-col ms-sm-6">
                                <Checkbox label="Right" disabled checked /></div>
                            <div className="ms-Grid-col ms-sm-6">
                                <Checkbox label="Left" disabled checked /></div>
                        </div>
                    </div>
                </div>
                <div className="ms-Grid-row" style={{ padding: '3px 0px 0px 0px' }}>
                    <div className="ms-Grid-col ms-sm3">
                        <Label style={{ padding: '4px 0px' }}>Style</Label></div>
                    <div className="ms-Grid-col ms-sm9">
                        <Dropdown
                            selectedKey={lineStyle}
                            options={lineStyleOptions}
                            onChange={styleOnChange}
                            styles={dropdownStyles}
                            className="ms-lg2"
                        />
                    </div>
                </div>
                <div className="ms-Grid-row" style={{ padding: ' 0px' }}>
                    <div className="ms-Grid-col ms-sm3">
                        <Label style={{ padding: '4px 0px' }}>Thickness</Label>
                    </div>
                    <div className="ms-Grid-col ms-sm9">
                        <SpinButton
                            value={thickness + suffix}
                            defaultValue={thickness + suffix}
                            min={min}
                            max={max}
                            onValidate={onValidate}
                            onIncrement={onIncrement}
                            onDecrement={onDecrement}
                            onChange={onChange}
                            incrementButtonAriaLabel="Increase value by 2"
                            decrementButtonAriaLabel="Decrease value by 2"
                            styles={styles}
                            disabled={false}
                        />
                    </div>
                </div>
                <div className="ms-Grid-row" style={{ padding: ' 0px' }}>
                    <div className="ms-Grid-col ms-sm3">
                        <Label style={{ padding: '4px 0px' }}>Color</Label>
                    </div>
                    <div className="ms-Grid-col ms-sm9">
                        <ColorPickerComponent
                            id="colorpicker"
                            value={color}
                            mode="Palette"
                            change={(args) => colorPicker(args.value)}
                            cssClass="e-hide-value"
                        />
                    </div>
                </div>
                <div className="ms-Grid-row" style={{ padding: ' 0px' }}>
                    <div className="ms-Grid-col ms-sm3">
                        <Label style={{ padding: '4px 0px' }}>Gap color</Label>
                    </div>
                    <div className="ms-Grid-col ms-sm9">
                        <ColorPickerComponent
                            id="colorpicke"
                            value={gapColor}
                            mode="Palette"
                            change={(args) => gapColorPicker(args.value)}
                            cssClass="e-hide-value"
                            disabled={lineStyle != 'solid' ? false : true}
                        />
                    </div>
                </div>
            </div>
        </div>)
}

const mapStateToProps = (canvasState: any) => {
    return {
        activeItems: canvasState.notebookReducer.activeItems,
        selectedPivotItem: canvasState.notebookReducer.selectedPivotItem,
        activeWorksheet: canvasState.worksheetOperationReducer.activeWorksheet,
        openWorksheets: canvasState.worksheetOperationReducer.openWorksheets,
        openGraphs: canvasState.worksheetOperationReducer.openGraphs,
        allActiveItem: canvasState.notebookReducer.allActiveItem,
        notebooks: canvasState.notebookReducer.notebooks,
    };
};

const connector = connect(mapStateToProps);

export default connector(ReferenceLines);
