import React, { useEffect, useState, useRef } from 'react';
import CommonModalComp from "./../../CommonComp/CommonModalComp";
import { DefaultButton } from '@fluentui/react/lib/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/Helpmenu/actions';
import { SpinButton, ISpinButtonStyles, mergeStyleSets, Position } from '@fluentui/react';
import { Checkbox, Stack, IStackTokens } from '@fluentui/react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { api_call_test_options } from "../../RibbonMenu/Wizard/TestOptions/TestOptionsAPI";
import {
    calculateHistogram
} from '../../../utils/spreadsheet/spreadsheetUtility';
import { storeGraph } from '../../../store/Worksheet/WorksheetOperation/actions';
import { summaryInfoAction } from "../../../store/SummaryInfo/actions";
import { storeWorksheet } from '../../../store/Worksheet/WorksheetOperation/actions';
import * as componentInstance from "../../../store/Worksheet/SpreadSheet/actions";
import * as advisorAction from '../../../store/Analysis/Advisor/actions';

import * as sampleSizeAction from "../../../store/Analysis/SampleSize";
import * as reportOptionsAction from "../../../store/Worksheet/Report/actions";
import * as storeSpreadsheetAction from "../../../store/Worksheet/SpreadSheet/actions";
import * as transformAction from "../../../store/Analysis/Transform/actions";
import * as powerAction from "../../../store/Analysis/Power";
import * as formatCellAction from "../../../store/Worksheet/FormatCell/actions";
import { post } from '../../../services/DataService';
import {
    getDataSetByKeyHistogram,
    createNewClient, getDataSetByKey
} from "../../../services/RedisServices";
import { bindActionCreators } from "redux";
import * as plotEquationAction from "../../../store/Worksheet/FormatCell/actions";
import * as plotRegressionAction from "../../../store/Worksheet/FormatCell/actions";
import * as resultGraphAction from "../../../store/Analysis/actions";
import { isReRenderGraph } from '../../../store/CreateGraph/CreateDiagramPage/actions';

import { pairedttesthist } from "../../App/Config";
import { createGraphPage } from '../../../services/NotebookManagerServicesNew';

const { ipcRenderer } = require('electron');

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 30 } };
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
};

const options1: IChoiceGroupOption[] = [
    { key: 'freq', text: 'Frequencies' },
    { key: 'perc', text: 'Percents' }
];
const stackTokens: IStackTokens = { childrenGap: 40 };

const FrequencyBar = (props: any) => {
    console.log("currentReport", props.selectedColumn.dataSelectionColumnsfre[0][0].value)
    const [selectedKey, setSelectedKey] = useState('freq')
    const [drop, setDrop] = useState(props.selectedColumn.dataSelectionColumnsfre[0][0].value)
    const [norm, setnorm] = useState(props.selectedColumn.dataSelectionColumnsfre[0][0].value)

    console.log("props.SourceColumn", props.selectedSrc, props.activeWorksheet, props.typeID)
    var ColumnData = props.selectedColumn.dataSelectionColumnsfre[0]
    useEffect(() => {
        console.log("arg",)
        ipcRenderer.on("dataSelectionTestChild", function (event, arg) {
            alert("hi")
            console.log("hey")
        })
    }, [])
    const sliceIndexOption = () => {
        let allSliceIndex = []
        for (let i = 0; i < props.selectedColumn.dataSelectionColumnsfre[0].length; i++) {
            if (props.selectedColumn.dataSelectionColumnsfre[0][i].value !== "") {
                allSliceIndex.push(
                    { key: props.selectedColumn.dataSelectionColumnsfre[0][i].value, text: props.selectedColumn.dataSelectionColumnsfre[0][i].value })
            }
        }
        return allSliceIndex
    }

    const allList = useRef({
        columnHeader: sliceIndexOption()
    })

    const handleClose = async () => {
        console.log("here", props.selectedColumn.dataSelectionColumnsfre, drop)
        let totalItem = props.selectedColumn.dataSelectionColumnsfre[0].length;
        let totalclm = totalItem * 3
        let IndexSelected, startClm
        for (let i = 0; i < props.selectedColumn.dataSelectionColumnsfre[0].length; i++) {
            console.log("here", props.selectedColumn.dataSelectionColumnsfre, drop)
            if (props.selectedColumn.dataSelectionColumnsfre[0][i].value !== "") {
                if (drop == props.selectedColumn.dataSelectionColumnsfre[0][i].value) {
                    console.log("here", i)
                    IndexSelected = i + 1
                }
            }
        }
        if (IndexSelected < totalclm) {
            console.log("here", IndexSelected, totalclm)
            startClm = IndexSelected * 3 - 2
            console.log("here", startClm)
        }
        let data = { x: [], y: [] }
        console.log("here", props.currentReport.reportData.graph.sheetdata[4])
        if (selectedKey == "freq") {
            data.x = [startClm]
            data.y = [startClm + 1]
            console.log("here", startClm)
        }
        else if (selectedKey == "perc") {
            data.x = [startClm]
            data.y = [startClm + 2]
            console.log("here", startClm)
        }
        let axisname = {yaxis:selectedKey,xaxis:drop}
        props.actions.rowIndexUpdate.updateDataSelectionfreq({
            message:axisname,
          });
        console.log("here", data)
        const graphObject = {
            graphType: "vertical_bar_plot",
            subGraphType: "simpleBar",
            format: "XYpair",
            data,
        };
        createGraphPage(
            props,
            graphObject,
            props.currentReport,
            props.currentReport.id,
            "Frequency Bar Chart"
        );
        // let outputBody = params;
        // calculateHistogram(
        //     spreadSheetReference,
        //     outputBody,
        //     optionsData,
        //     props
        // );

        props.close();
    }

    const onChange = React.useCallback((ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
        console.log(option.key)
        setSelectedKey(option.key);
    }, []);
    const ChangedValue = (ev, item) => {
        console.log("here", item.text)
        setDrop(item.key)
        setnorm(item.key)
    }
    return (
        <>
            <CommonModalComp
                customClass="historeport"
                close={props.close}
                component={
                    <>
                        <div className="ms-Grid" dir="ltr" style={{ backgroundColor: "lightgrey", height: "160px" }}>
                            <div className="ms-Grid-row">
                                <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg6"}>
                                    <div className="ms-Grid-row" style={{ padding: "22px 8px" }}>

                                        <Dropdown
                                            // placeholder="Select an option"
                                            selectedKey={drop}
                                            label="Data column"
                                            options={allList.current.columnHeader}
                                            onChange={ChangedValue}
                                            styles={dropdownStyles}
                                        />
                                    </div>
                                </div>
                                <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg6"}>
                                    <div className="ms-Grid-row" style={{ padding: "7px" }}>
                                        <fieldset>
                                            <legend>
                                                <div style={{ fontSize: "14px" }}>Chart values</div>
                                            </legend>
                                            <ChoiceGroup selectedKey={selectedKey} options={options1} onChange={onChange} />
                                        </fieldset>
                                    </div>
                                </div>
                            </div>

                            <div className="ms-Grid-row">
                                <Stack horizontal tokens={stackTokens} style={{ float: "right", padding: "0px 8px" }}>

                                    {/* <DefaultButton className={contentStyles.button + ' black'} text="Help" /> */}
                                    <DefaultButton className={'black'} text="Close" onClick={handleClose} />
                                </Stack>
                            </div>
                        </div>
                    </>
                }
                title={"Select Data Column and Chart Values"}
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

function mapStateToProps(state) {
    console.log(state);
    return {
        referenceObjectState: state.instanceReducer.instance,
        rowIndex: state.instanceReducer.rowIndex,
        activeWorksheet: state.worksheetOperationReducer.activeWorksheet,
        notebooks: state.notebookReducer.notebooks,
        activeItems: state.notebookReducer.activeItems,
        allActiveItem: state.notebookReducer.allActiveItem,
        openWorksheets: state.worksheetOperationReducer.openWorksheets,
        reportOptionsState: state.reportOptionsReducer,
        stateSpreadSheet: state.instanceReducer,
        isWizardOpen: state.instanceReducer.isWizardOpen,
        transformState: state.transformReducer,
        plotEquationState: state.formatCellReducer,
        notebookState: state.notebookReducer,
        plotRegressionState: state.formatCellReducer,
        defaultOption: state.optionsReducer,
        openGraphs: state.worksheetOperationReducer.openGraphs,
        isOpenResultGraph: state.resultGraphReducer.isOpenResultGraph,
        licenseInfo: state.licenseInfoReducer,
        formatCellState: state.formatCellReducer,
        optionsState: state.optionsReducer,
        worksheetID: state.worksheetOperationReducer.activeWorksheet,
        selectedSrc: state.sortReducer.histogramSrc,
        typeID: state.sortReducer.typeID,
        selectedColumn: state.instanceReducer


    };
}


function mapDispatchToProps(dispatch) {
    return {
        OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
        actions: {
            storeWorksheet: bindActionCreators(storeWorksheet, dispatch),
            rowIndexUpdate: bindActionCreators(componentInstance, dispatch),
            formatCellAction: bindActionCreators(formatCellAction, dispatch),
        },
        reportOptionsAction: bindActionCreators(reportOptionsAction, dispatch),
        sampleSizeAction: bindActionCreators(sampleSizeAction, dispatch),
        powerAction: bindActionCreators(powerAction, dispatch),
        storeSpreadsheet: bindActionCreators(storeSpreadsheetAction, dispatch),
        transformAction: bindActionCreators(transformAction, dispatch),
        plotEquationAction: bindActionCreators(plotEquationAction, dispatch),
        plotRegressionAction: bindActionCreators(plotRegressionAction, dispatch),
        resultGraphAction: bindActionCreators(resultGraphAction, dispatch),
        advisorAction: bindActionCreators(advisorAction, dispatch),
        isReRenderGraph: bindActionCreators(isReRenderGraph, dispatch),


        setActiveItem: (activeItem: IActiveItems) => {
            dispatch({ type: "SET_ACTIVE_ITEM", payload: activeItem });
        },

        setAllActiveItem: (allactiveItem: IActiveItems) => {
            dispatch({ type: "SET_ALL_ACTIVE_ITEM", payload: allactiveItem });
        },
        addSection: (newSection: IActiveItems) => {
            dispatch({ type: "ADD_SECTION", payload: newSection });
        },
        setSelectedPivotItem: (pvtItem) => {
            dispatch({ type: "SET_SELECTED_PIVOT_ITEM", payload: pvtItem });
        },
        addGraphPage: (item) => {
            dispatch({ type: "ADD_GRAPHPAGE", payload: item });
        },
        storeGraph: bindActionCreators(storeGraph, dispatch),

        addReport: (newReport: IActiveItems) => {
            dispatch({ type: "ADD_REPORT", payload: newReport });
        },
        summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FrequencyBar)

