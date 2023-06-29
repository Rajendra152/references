import React, { useEffect, useState } from 'react';
import * as STList from './StatisticalDataFormatList';
import {
    Dropdown,
    mergeStyleSets,
    IDropdown,
    IDropdownOption
} from 'office-ui-fabric-react';
import CommonModalComp from "./../../CommonComp/CommonModalComp";
import { DefaultButton } from '@fluentui/react/lib/Button';
import { calculations } from "../../../services/analysis/statistical";
import { ipcRenderer } from "electron";
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/Helpmenu/actions';
import { showMessageBox } from '../../../utils/globalUtility';

const lowValueWarning  = {
    buttons: ["OK"],
    type: 'warning',
    message: "The Low end of the range should be below the High",
    title: "SigmaPlot 15"
}

const cancelWarning  = {
    buttons: ["OK"],
    type: 'warning',
    message: "Transform Canceled",
    title: "SigmaPlot 15"
}

const StatisticalTransformationModal = (props: any) => {
    const [refIndexData, setRefIndexData] = useState([]);

    const dropdownRef = React.createRef<IDropdown>();
    const [missingValue, setMissingValue] = React.useState<IDropdownOption>({ key: '--', text: '--' });

    const [title, setTitle] = useState('');
    const [step, setStep] = useState('');
    const [quantity, setQuantity] = useState(10);
    const [low, setLow] = useState(2);
    const [high, setHigh] = useState(10);
    const [seed, setSeed] = React.useState<IDropdownOption>({ key: 'Random', text: 'Random' });
    const [upperBound, setUpperBound] = React.useState<IDropdownOption>({ key: Infinity, text: 'infinity' });
    const [lower, setLower] = React.useState<IDropdownOption>({ key: -Infinity, text: '-infinity' });
    const [keyLabel, setKeyLabel] = useState(1);
    const [filterType, setFilterType] = useState(true);

    const titleMap: any = {
        [STList.ReferenceCoding]: 'Selecct Reference Index',
        [STList.EffectsCoding]: 'Selecct Reference Index',
        [STList.Filter]: 'Set Filter',
        [STList.RNUniform]: 'Uniform Random Number Generation',
        [STList.RNNormal]: 'Normal Random Numbers',
        [STList.MissingValues]: 'Missing Value Transform',
    }

    const selectRefRow = (index: number) => {
        let tableRows: any = [...refIndexData];
        tableRows.map((a: any) => {
            a.active ? a.active = false : '';
            return a;
        });
        tableRows[index].active = true;
        setRefIndexData(tableRows);
    }

    const updateFilterType = (event: any) => {
        console.log(event.target.value);
        setFilterType(event.target.value === 'true' ? true : false)
    }

    const handleCalculation = () => {
        const lowVal = parseInt(low.toString().replace(/\D/g,''));
        const highVal = parseInt(high.toString().replace(/\D/g,''));
        const quantityVal = parseInt(quantity.toString().replace(/\D/g,''));
        if(lowVal > highVal) {
            showMessageBox(lowValueWarning);
            return;
        }
        const { gridData, selectedCols, step } = props;

        let firstEmpColIndex = 0;
        (gridData || []).forEach((data: any, index: number) => {
            if(firstEmpColIndex === 0 && data && Array.isArray(data) && data.every((grid: any) => {
                if(grid && (grid.value || grid.value <= 0)) {
                  return false;
                }
                return true;
            })) {
                firstEmpColIndex = index;
            } else {
                firstEmpColIndex = 0;
            }
            /* 
            if(firstEmpColIndex === 0 && !(data && ((data[0] && data[0].value) || (data[1] && data[1].value) || (data[2] && data[2].value)))) {
                firstEmpColIndex = index;
                return true;
            } else {
                firstEmpColIndex = 0;
            } */
            return false;
        });
        if (firstEmpColIndex === 0) {
            firstEmpColIndex = gridData.length;
        }

        let selectedRow: any = [];
        let gridData2: any = [...gridData];
        if (step === STList.ReferenceCoding || step === STList.EffectsCoding) {
            selectedRow = (refIndexData || []).filter((data: any) => {
                return data.active ? true : false
            })
        } else if(step === STList.RNUniform || step === STList.RNNormal) {
            gridData2 = { min: lowVal, max: highVal, quantity: quantityVal, seed };
        } else if(step === STList.MissingValues) {
            selectedRow[0] = { value: missingValue.key };
        } else if (step === STList.Filter) {
            selectedRow[0] = { value: { filterType, upperBound, lower, keyLabel } };
        }
        const resultArray = calculations(gridData2, selectedCols, step, (selectedRow[0] && selectedRow[0].value));
        ipcRenderer.send('wizToMainWindow', { data: { resultArray, selectedCols, firstEmpColIndex, updateSheet: true }, closeWindow: true });
        props.close();
    }

    useEffect(() => {
        const { gridData, selectedCols, step } = props;
        setStep(step);
        setTitle(titleMap[step]);
        if (titleMap[step] == "Missing Value Transform") {
            props.OpenHelpWindow('translating_missing_value_codes', '', '')
        }
        else if (titleMap[step] == "Center") {
            props.OpenHelpWindow(' centering_data', '', '')
        }
        else if (titleMap[step] == "Uniform Random Number Generation") {
            props.OpenHelpWindow('generating_random_numbers', '', '')
        }
        else if (titleMap[step] == "Normal Random Numbers") {
            props.OpenHelpWindow('generating_random_numbers', '', '')
        }
        else if (titleMap[step] == "Selecct Reference Index") {
            props.OpenHelpWindow('index_transform', '', '')
        }
        console.log("title", titleMap[step])
        if (step === STList.ReferenceCoding || step === STList.EffectsCoding) {
            (selectedCols || [])
                .filter((col: any) => col.title === 'Input' ? true : false)
                .map((col: any) => {
                    if (gridData[parseInt(col.key)]) {
                        let uniqueArray: any = [];
                        let gridArray: any = (gridData[parseInt(col.key)] || []).filter((data: any) => {
                            if (uniqueArray.includes(data.value)) {
                                return false;
                            }
                            uniqueArray.push(data.value);
                            return data.value ? true : false;
                        });
                        gridArray = gridArray.map((data: any) => {
                            data.active = false;
                            return data;
                        })
                        gridArray[0].active = true;
                        setRefIndexData(gridArray);
                    }
                })
        }
        if (step === STList.RNUniform) {
            setLow(2);
            setHigh(10);
        } else if (step === STList.RNNormal) {
            setLow(1);
            setHigh(2);
        }
    }, []);

    const handleClose = () => {
        showMessageBox(cancelWarning);
        props.close();
    }

    return (
        <>
            <CommonModalComp
                customClass="STRefDialog"
                close={props.close}
                component={
                    <>
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className={contentStyles.table + " ms-Grid-col ms-sm9 ms-md9 ms-lg9"}>
                                    {(step === STList.ReferenceCoding || step === STList.EffectsCoding) &&
                                        <table className={'table cur-pointer'}>
                                            <tbody>
                                                {
                                                    refIndexData.map((item: any, index: number) => <>
                                                        <tr key={index} onClick={() => selectRefRow(index)} className={item.active ? "active" : ""}>
                                                            <td>{index + 1}: {item.value}</td>
                                                        </tr>
                                                    </>)
                                                }
                                            </tbody>
                                        </table>
                                    }
                                    {step === STList.MissingValues &&
                                        <div style={{ position: 'absolute', left: '25%' }}>
                                            Tranform all instances of
                                            <Dropdown
                                                componentRef={dropdownRef}
                                                onChange={(ev, item: any) => { setMissingValue(item) }}
                                                selectedKey={missingValue ? missingValue.key : undefined}
                                                options={[
                                                    { key: '--', text: '--' },
                                                    { key: '#', text: '#' },
                                                    { key: '$', text: '$' },
                                                    { key: '*', text: '*' },
                                                    { key: 'blank', text: 'blank' },
                                                    { key: 'N/A', text: 'N/A' },
                                                ]}
                                                styles={{ dropdown: { width: 100, margin: '15px 0 10px 20px' } }}
                                            />
                                            to missing values [--].
                                        </div>
                                    }
                                    {(step === STList.RNUniform || step === STList.RNNormal) &&
                                        <div>
                                            <div className={contentStyles.block}>
                                                <label className={contentStyles.label}>
                                                    Quantity
                                                </label>
                                                <input
                                                    className={contentStyles.input}
                                                    value={quantity}
                                                    onChange={(ev: any) => setQuantity(ev.target.value)} />
                                            </div>
                                            <div className={contentStyles.block}>
                                                <label className={contentStyles.label}>
                                                    {step === STList.RNUniform ? 'Low' : 'Mean'}
                                                </label>
                                                <input
                                                    className={contentStyles.input}
                                                    value={low}
                                                    onChange={(ev: any) => setLow(ev.target.value)} />
                                            </div>
                                            <div className={contentStyles.block}>
                                                <label className={contentStyles.label}>
                                                    {step === STList.RNUniform ? 'High' : 'Standard Deviation'}
                                                </label>
                                                <input
                                                    className={contentStyles.input}
                                                    value={high}
                                                    onChange={(ev: any) => setHigh(ev.target.value)} />
                                            </div>
                                            <div className={contentStyles.block}>
                                                <label className={contentStyles.label}>
                                                    Seed
                                                </label>
                                                <Dropdown
                                                    onChange={(ev, item: any) => setSeed(item)}
                                                    selectedKey={seed ? seed.key : undefined}
                                                    options={[
                                                        { key: 'Random', text: 'Random' },
                                                        { key: '0', text: '0/0' }
                                                    ]}
                                                    styles={{ dropdown: { width: 90 } }}
                                                />
                                            </div>
                                        </div>
                                    }
                                    {step === STList.Filter &&
                                        <div>
                                            <fieldset className={contentStyles.fieldSet} onChange={updateFilterType}>
                                                <legend>Filter Type</legend>
                                                <input
                                                    name="filterType"
                                                    type="radio"
                                                    value="true"
                                                    defaultChecked />
                                                <label style={{ marginRight: '10px' }}>Numeric</label>
                                                <input
                                                    name="filterType"
                                                    type="radio"
                                                    value="false" />
                                                <label>Text</label>
                                            </fieldset>
                                            <fieldset className={contentStyles.fieldSet}>
                                                <legend>Numeric Filter</legend>
                                                <div className={contentStyles.block}>
                                                    <label className={contentStyles.label}>
                                                        Upper Bound
                                                    </label>
                                                    <Dropdown
                                                        disabled={!filterType}
                                                        onChange={(ev, item: any) => setUpperBound(item)}
                                                        selectedKey={upperBound ? upperBound.key : undefined}
                                                        options={[
                                                            { key: Infinity, text: 'infinity' }
                                                        ]}
                                                        styles={{ dropdown: { width: 90 } }}
                                                    />
                                                </div>
                                                <div className={contentStyles.block}>
                                                    <label className={contentStyles.label}>
                                                        Lower
                                                    </label>
                                                    <Dropdown
                                                        disabled={!filterType}
                                                        onChange={(ev, item: any) => setLower(item)}
                                                        selectedKey={lower ? lower.key : undefined}
                                                        options={[
                                                            { key: -Infinity, text: '-infinity' }
                                                        ]}
                                                        styles={{ dropdown: { width: 90 } }}
                                                    />
                                                </div>
                                            </fieldset>
                                            <fieldset className={contentStyles.fieldSet}>
                                                <legend>Text Filter</legend>
                                                <div className={contentStyles.block}>
                                                    <label className={contentStyles.label}>
                                                        Key Label
                                                    </label>
                                                    <input
                                                        disabled={filterType}
                                                        className={contentStyles.input}
                                                        value={keyLabel}
                                                        onChange={(ev: any) => setKeyLabel(ev.target.value)} />
                                                </div>
                                            </fieldset>
                                        </div>
                                    }
                                </div>
                                
                    <div className={"ms-Grid-col ms-sm3 ms-md3 ms-lg3"}>
                        <DefaultButton className={contentStyles.button + ' black'} text="OK" onClick={handleCalculation}/>
                        <DefaultButton className={'black'} text="Cancel" onClick={handleClose}/>
                    </div>
                    </div>
                </div>
                </>
            }
            title={title}
            ></CommonModalComp>
        </>
    )
}


const contentStyles = mergeStyleSets({
    table: {
        height: '250px',
        overflowY: 'scroll',
        border: '1px solid lightgrey'
    },
    button: {
        marginBottom: '10px',
        width: '84px'
    },
    block: {
        display: 'flex',
        margin: '8px 0'
    },
    label: {
        width: '120px',
        textAlign: 'right',
        paddingRight: '10px'
    },
    input: {
        width: '80px'
    },
    fieldSet: {
        border: '1px solid rgb(211, 211, 218, 0.7)'
    }
});

function mapDispatchToProps(dispatch) {
    return {
        OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem))
    }
}
export default connect(null, mapDispatchToProps)(StatisticalTransformationModal)

