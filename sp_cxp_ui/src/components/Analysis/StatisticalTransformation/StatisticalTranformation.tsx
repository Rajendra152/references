import React, { useEffect, useState, useRef } from 'react';
import { WizardPreview } from '../../RibbonMenu/Wizard/WizardPreview';
import { DATASELECTION } from '../../RibbonMenu/Wizard/GraphFlowTypes';
import WizardNavigation from '../../RibbonMenu/Wizard/WizardNavigation';
import { WizardContentProps } from '../../RibbonMenu/Wizard/GraphWizard';
import { Dropdown, IDropdown, IDropdownOption,ResponsiveMode } from '@fluentui/react/lib/Dropdown';
import * as STDataFormat from "./StatisticalDataFormat";
import { calculations } from "../../../services/analysis/statistical";
import { ipcRenderer } from "electron";
import * as STList from './StatisticalDataFormatList';
import { connect } from 'react-redux';
import { getColumnHeaderText } from '@syncfusion/ej2-react-spreadsheet';
import WizardTitleBar from '../../RibbonMenu/Wizard/TestOptions/WizardTitleBar';

const dropdownStyles = { dropdown: { width: 150 } };

const StatisticalTransformation = (props: any) => {
    console.log("here statistical value",props)
    const previewSource = '';
    const previewTitle = 'Select data by clicking worksheet columns';
    const previewContent = '';
    const step = props.match.params.type;
    const content: WizardContentProps = {
        statisticalType: props.match.params.type,
        stepType: DATASELECTION,
        disableNext: true,
        disableBack: true
    }
    const STDataFormatList: any = STDataFormat;
    const tableListData: STDataFormat.STDataRow[] = [];

    const [currentId, setCurrentId] = useState(1)
    const [tableList, setTableList] = useState(tableListData);
    const [gridData, setGridData] = useState([]);
    const [colData, setColData] = useState([]);
    const [title, setTitle] = useState("");


    const dropdownRef = React.createRef<IDropdown>();
    const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();


useEffect(()=>{
if(props.match.params.type == "randomNumbersuniform"){
    setTitle("Uniform Random Transform")
}
else if(props.match.params.type == "randomNumbersnormal"){
    setTitle("Normal Random Transform")
}
},[])

    const tableListRef = React.useRef(tableList);
    const setMyTableList = (data: any) => {
        tableListRef.current = data;
        setTableList(data);
    };

    const currentIdRef = React.useRef(currentId);
    const setMyCurrentId = (data: any) => {
        currentIdRef.current = data;
        setCurrentId(data);
    };

    const selectedPair = () => {
        if (STDataFormatList[step] !== undefined) {
            let table = STDataFormatList[step];
            setMyTableList([...table]);
            setMyCurrentId(table[0].id);
        }
    }

    const onSelectionChange = (event: any, item: IDropdownOption | undefined): void => {
        console.log("item",item)
        setSelectedItem(item);
        const tableRows: STDataFormat.STDataRow[] = [...tableListRef.current];
        let newRow: any;
        let currentIndex = -1;
        tableRows.map((row: any, index: number) => {
            if (row.id === currentIdRef.current) {
                if (!row.value) {
                    newRow = STDataFormatList.getNewRow(row, step);
                    currentIndex = index
                }
                row.value = (item && item.text) || '';
                row.key = (item && item.key >= 0) ? item.key : '';
                if (tableRows.length > (index + 1)) {
                    row.active = false;
                    tableRows[index + 1].active = true;
                    setMyCurrentId(tableRows[index + 1].id);
                }
            }
            return row;
        });

        if (newRow && currentIndex >= 0) {
            tableRows.push(newRow);
            tableRows[currentIndex].active = false;
            setMyCurrentId(newRow.id);
        }

        setMyTableList([...tableRows]);
    }

    const selectRow = (index: number) => {
        let tableRows: STDataFormat.STDataRow[] = [...tableList];
        tableRows.map((a: STDataFormat.STDataRow) => {
            a.active ? a.active = false : '';
            return a;
        });
        tableRows[index - 1].active = true;
        setMyCurrentId(tableRows[index - 1].id);
        setMyTableList([...tableRows]);
    }

    const actionUpdateHandler = (event: any, args: any) => {
        let newArgs = JSON.parse(JSON.stringify(args));
        let indexes: number[] = [];
        let gridData = JSON.parse(JSON.stringify(newArgs.gridData));
        gridData = (gridData || []).filter((data: any, index: number) => {
            return (data || []).some((grid: any) => {
                if (grid && (grid.value || grid.value <= 0)) {
                    indexes.push(index);
                    return true;
                }
                return false;
            })
            /* if(data && ((data[0] && data[0].value) || (data[1] && data[1].value) || (data[2] && data[2].value))) {
                indexes.push(index);
                return true;
            }
            return false; */
        });
        setGridData(JSON.parse(JSON.stringify(newArgs.gridData)));
        let sheetData = JSON.parse(JSON.stringify(newArgs.sheetData));
        sheetData = (sheetData || []).filter((data: any, index: number) => {
            let gridIndex = indexes.indexOf(index);
            if (gridIndex >= 0) {
                data.text = 'Column ' + data.text;
                data.key = gridIndex;
                return true;
            }
            return false;
        });
        sheetData.push({ key: 'output', text: 'First Empty' })
        setColData(sheetData);
        setSelectedTableData(newArgs.range);
        setTitle(newArgs.titleName)
        console.log('STArgs', newArgs, sheetData);
    }

    const setSelectedTableData = (selectedRange: any[]) => {
        if (selectedRange && selectedRange.length >= 4 && selectedRange[2] === 99) {
            let col1 = selectedRange[1];
            while (col1 <= selectedRange[3]) {
                let selectedCol = { key: col1, text: 'Column ' + getColumnHeaderText((col1 + 1)) }
                onSelectionChange(null, selectedCol);
                col1++;
            }
        }
    }

    const headDataHandler = (event: any, args: any) => {
        let item: IDropdownOption = {
            key: args.key,
            text: `Column ${args.text}`
        }
        console.log(tableListRef.current, item);
        onSelectionChange(null, item);
    }

    useEffect(() => {
        selectedPair();
        ipcRenderer.on('action-update', actionUpdateHandler);
        if (ipcRenderer.rawListeners('mainHeadData').length === 0) {
            ipcRenderer.on('mainHeadData', headDataHandler);
        }
        return () => {
            if (ipcRenderer != undefined) {
                ipcRenderer.removeAllListeners('mainHeadData');
                ipcRenderer.removeAllListeners('action-update');
            }
        }
    }, []);

    const onHadleNavigation = (item: string) => {
        if (item == 'finish') {
            const selectedCols = tableList.filter((data: STDataFormat.STDataRow) => {
                return data.value ? true : false;
            });
            let firstEmpColIndex = 0;
            (gridData || []).forEach((data: any, index: number) => {
                if (firstEmpColIndex === 0 && data && Array.isArray(data) && data.every((grid: any) => {
                    if (grid && (grid.value || grid.value <= 0)) {
                        return false;
                    }
                    return true;
                })) {
                    firstEmpColIndex = index;
                } else {
                    firstEmpColIndex = 0;
                }
                /* if(firstEmpColIndex === 0 && !(data && ((data[0] && data[0].value) || (data[1] && data[1].value) || (data[2] && data[2].value)))) {
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
            let showModalArray = [
                STList.ReferenceCoding,
                STList.EffectsCoding,
                STList.Filter,
                STList.RNUniform,
                STList.RNNormal,
                STList.MissingValues
            ]
            if (showModalArray.includes(step)) {
                ipcRenderer.send('wizToMainWindow', { data: { selectedCols, step }, closeWindow: true });
            } else {
                const resultArray = calculations(gridData, selectedCols, step);
                ipcRenderer.removeListener('action-update', actionUpdateHandler);
                ipcRenderer.send('wizToMainWindow', { data: { resultArray, selectedCols, firstEmpColIndex, updateSheet: true }, closeWindow: true });
                console.log(resultArray);
            }
        }
    }
    const checkValue = useRef(null)

    useEffect(() => {
        console.log('Checkvalue', checkValue.current)
    }, [checkValue])



    return (
        <div>
            <WizardTitleBar stepType={content.stepType} title={title} />
            <div className="graphWizard-mainContext">
                <div className="graphWizard-content">
                    <div className="wizard-listContent" style={{ paddingLeft: "143px !important" }}>
                        <div className="graphWizardLeftCard">
                            <Dropdown
                                componentRef={dropdownRef}
                                placeholder="Select Column"
                                onChange={onSelectionChange}
                                selectedKey={selectedItem ? selectedItem.key : undefined}
                                label="Data Selection"
                                options={colData}
                                styles={dropdownStyles}
                                responsiveMode={ResponsiveMode.large}
                            />
                            <table className={`table cur-pointer`}>
                                <tbody>
                                    {
                                        tableList.map((item: any) => <>
                                            <tr key={item.id} onClick={() => selectRow(item.id)} className={item.active ? "active" : ""}>
                                                <td >{item.title}</td>
                                                <td >{item.value}</td>
                                            </tr>
                                        </>)
                                    }
                                </tbody>
                            </table>
                        </div> 
                    </div>
                    <WizardPreview title={previewTitle} src={previewSource} content={previewContent} />
                </div>
                <WizardNavigation tableList ={tableList} content={content} onHandleItemClick={onHadleNavigation} helpMenu={props.helpMenu} />
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    console.log(state);
    return {
        // openWorksheets: state.worksheetOperationReducer.openWorksheets,
        // activeWorksheet: state.worksheetOperationReducer.activeWorksheet,
        helpMenu: state.helpMenuReducer
    };
}

export default connect(mapStateToProps)(StatisticalTransformation);
