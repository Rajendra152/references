import React, { useEffect, useState } from 'react';
import CommonModalComp from "./../../CommonComp/CommonModalComp";
import { DefaultButton } from '@fluentui/react/lib/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/Helpmenu/actions';
import { SpinButton, ISpinButtonStyles, mergeStyleSets, Position } from '@fluentui/react';
import { Checkbox, Stack, IStackTokens } from '@fluentui/react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { api_call_test_options } from "../../RibbonMenu/Wizard/TestOptions/TestOptionsAPI";
import { post } from '../../../services/DataService';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { RecomputeStratifiedData } from '../../App/Config';
import {
    getDataSetByKey,
    createNewClient,
} from "../../../services/RedisServices";
import { createGraphPage } from '../../../services/NotebookManagerServicesNew';
import { createWorksheetDatarecompute } from '../../../services/NotebookManagerServices/ReportCreation';
import { storeWorksheet } from '../../../store/Worksheet/WorksheetOperation/actions';
import { bindActionCreators } from "redux";
import { storeGraph } from '../../../store/Worksheet/WorksheetOperation/actions';
import * as advisorAction from '../../../store/Analysis/Advisor/actions';

import { summaryInfoAction } from "../../../store/SummaryInfo/actions";

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 30 } };
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
};
const options: IDropdownOption[] = [
    { key: 'base', text: 'Baseline' },
    { key: 'mean', text: 'Mean' },
    { key: 'median', text: 'Meadian' },
    { key: 'user', text: 'User-Defined' },

];

const stackTokens: IStackTokens = { childrenGap: 10 };

const CoviriantReport = (props: any) => {
    const [selectedKey, setSelectedKey] = useState('mean')
    const [selectedKeyIndex, setSelectedKeyIndex] = useState(1)
    const [disableEdit, setdisableEdit] = useState(true)
    const [mean, setMean] = useState([]);
    const [median, setMedian] = useState([]);
    const [coname, setCOname] = useState([]);
    const [user, setUser] = useState([]);
    const [uservalue, setuservalue] = useState(0);
    const [selectedIndex, setselectedIndex] = useState(0)
    var arrayLength: Number
    console.log("currentReport", props.currentReport, props.selectedGraph)
    useEffect(() => {
        let selectedValues = Object.values(props.selectedGraph);
        let selectedGraphKeys = Object.keys(props.selectedGraph);

        let item = selectedValues[0];
        console.log(" rachu", item)

        console.log("here", props.currentReport.reportData.graph.sheetdata[1])
        setMedian(props.currentReport.reportData.graph.sheetdata[2])
        setMean(props.currentReport.reportData.graph.sheetdata[1])
        setCOname(props.currentReport.reportData.graph.sheetdata[3])
        arrayLength = props.currentReport.reportData.graph.sheetdata[3].length
        for (let i = 0; i < arrayLength; i++) {
            console.log("here", user[i])
            user[i] = 0
        }
        console.log("here", user)

    }, [])
    const handleClose = async () => {
        let selectedValues = Object.values(props.selectedGraph);
        let selectedGraphKeys = Object.keys(props.selectedGraph);

        let item = selectedValues[0];
        console.log("here me", item.data)

        const arg = {
            worksheet: props.rediskeytest.message, //sucess response key received after running the test
            graph_type: selectedGraphKeys[0], //various graph types "Adjusted Survival Curves","Cumulative Hazard Curves","Log-Log Survival Curves"
            value_selection: selectedKeyIndex, //baseline ,mean, median , userdefined index numbers
            user_defined_values: user //userdefined array values

        }
        var RowIndex = props.rowIndex
        var result = api_call_test_options(arg, props.activeWorksheet, RowIndex);
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let rand = ''
        for (var i = 0; i < 4; i++) {
            rand += characters.charAt(Math.floor(Math.random() *
                4))
        }
        let ReportNew = props.currentReport
        ReportNew.coxTestId = props.currentReport.id + rand + "cox"
        let sendRes = await post(RecomputeStratifiedData, arg);
        console.log("here result ", sendRes)


        if (sendRes !== undefined) {
            if (sendRes.data.result !== undefined) {
                const client = createNewClient();
                let graphData = await getDataSetByKey(
                    sendRes.data.result.key_name,
                    client
                );
                console.log("here graph data", graphData)

                console.log("here me", item.data)
                // selectedGraph
                // createGraphinPage(
                //     item.graphType,
                //     item.subGraphType,
                //     item.format,
                //     item.data,
                //     currentReport.id,
                //     selectedGraphKeys[0]
                // );
                let data = { x: [], y: [] }

                createWorksheetDatarecompute(graphData.sheetdata, ReportNew.coxTestId, props, 'Cox stratified')
                for (let i = 0; i < graphData.graph_types.length; i++) {
                    console.log("rachu")
                    if (graphData.graph_types[i].name == selectedGraphKeys[0]) {
                        console.log("rachu", graphData.graph_types[i].name, selectedGraphKeys[0])

                        if (graphData.graph_types[i].name == "Adjusted Survival Curves") {
                            data.y = [graphData.graph_types[i].col_selections[graphData.graph_types[i].col_selections.length - 1]]
                            data.x = [graphData.graph_types[i].col_selections[graphData.graph_types[i].col_selections.length - 2]]
                            console.log("rachu", graphData.graph_types[i].col_selections[graphData.graph_types[i].col_selections.length - 1])
                        }
                        else if (graphData.graph_types[i].name == "Cumulative Hazard Curves") {
                            data.y = [graphData.graph_types[i].col_selections[graphData.graph_types[i].col_selections.length - 1]]
                            data.x = [graphData.graph_types[i].col_selections[graphData.graph_types[i].col_selections.length - 2]]
                            console.log("rachu", graphData.graph_types[i].col_selections[graphData.graph_types[i].col_selections.length - 1])
                        }
                        else if (graphData.graph_types[i].name == "Log-Log Survival Curves") {
                            data.y = [graphData.graph_types[i].col_selections[graphData.graph_types[i].col_selections.length - 1]]
                            data.x = [graphData.graph_types[i].col_selections[graphData.graph_types[i].col_selections.length - 2]]
                            console.log("rachu", graphData.graph_types[i].col_selections[graphData.graph_types[i].col_selections.length - 1])
                        }
                    }
                }

                console.log("here", item.graphType,
                    item.subGraphType,
                    item.format,
                    data)
                const graphObject = {
                    graphType: item.graphType,
                    subGraphType: item.subGraphType,
                    format: item.format,
                    data: data,

                };
                createGraphPage(
                    props,
                    graphObject,
                    ReportNew,
                    ReportNew.coxTestId,
                    selectedGraphKeys[0]
                );
            }
        }
        props.close();
    }


    const ChangedValue = (ev, item) => {
        console.log("here", item.text)
        setSelectedKey(item.key)
        if (item.key == "mean") {
            setdisableEdit(true)
            setSelectedKeyIndex(1)
        }
        else if (item.key == "median") {
            setdisableEdit(true)
            setSelectedKeyIndex(2)
        }
        else if (item.key == "base") {
            setdisableEdit(true)
            setSelectedKeyIndex(0)
        }
        else if (item.key == "user") {
            setdisableEdit(false)
            setSelectedKeyIndex(3)
        }
    }
    const ValueChange = (ev) => {
        ev.preventDefault()
        console.log("value", ev.target.value)
        setuservalue(ev.target.value)
    }
    const ChangeUserDefined = (ev) => {
        ev.preventDefault()
        console.log("here")
        let newArr = [...user];

        for (let i = 0; i < user.length; i++) {
            if (i == selectedIndex) {
                // user[i] = parseInt(uservalue)
                newArr[i] = Number(uservalue);

            }
        }

        setUser(newArr);
        // setUser(user => [...user, user]) 
    }
    return (
        <>
            <CommonModalComp
                customClass="STRefDialog"
                close={props.close}
                component={
                    <>
                        <div className="ms-Grid" dir="ltr" style={{ backgroundColor: "lightgrey", height: "254px" }}>
                            <div className="ms-Grid-row" style={{ padding: "7px" }}>
                                <div className={"ms-Grid-col ms-sm8 ms-md8 ms-lg8"}>
                                    <div className="ms-Grid-row">
                                        <div className="ms-Grid-row" style={{ padding: "0px 8px" }}>
                                            <Dropdown
                                                // placeholder="Select an option"
                                                selectedKey={selectedKey}
                                                label="Select value type"
                                                options={options}
                                                onChange={ChangedValue}
                                                styles={dropdownStyles}
                                            />
                                        </div>
                                        <div className="ms-Grid-row" style={{ padding: "8px 0px", margin: "30px 0px 0px " }}>
                                            Select a covariate to change its value
                                        </div>
                                        <div className="ms-Grid-row" style={{ padding: "0px 8px", backgroundColor: "white", margin: "0px 0px 0px ", minHeight: "100px", height: "100px", overflowY: "scroll" }}>
                                            <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg6"} style={{ padding: "0px" }}>
                                                <div className="ms-Grid-row" style={{ borderRight: "1px solid lightgrey", padding: "0px 8px" }}>
                                                    Covariate
                                                </div>
                                                {coname.map((e, i) => {
                                                    return (
                                                        <div className={i == selectedIndex ? 'bg-type' : ""} onClick={() => setselectedIndex(i)}>
                                                            {e.value}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg6"} style={{ textAlign: "center", padding: "0px" }}>

                                                <div className="ms-Grid-row" style={{ padding: "0px 8px" }}>
                                                    Value
                                                </div>
                                                {selectedKey == "mean" && (
                                                    <>{mean.map((e, i) => {
                                                        return (
                                                            <div className={i == selectedIndex ? 'bg-type' : ""} onClick={() => setselectedIndex(i)}>
                                                                {e.value}
                                                            </div>
                                                        )
                                                    })}
                                                    </>
                                                )}
                                                {selectedKey == "base" && (
                                                    <>{coname.map((e, i) => {
                                                        return (
                                                            <div className={i == selectedIndex ? 'bg-type' : ""} onClick={() => setselectedIndex(i)}>
                                                                0
                                                            </div>
                                                        )
                                                    })}
                                                    </>
                                                )}
                                                {selectedKey == "median" && (
                                                    <>{median.map((e, i) => {
                                                        return (
                                                            <div className={i == selectedIndex ? 'bg-type' : ""} onClick={() => setselectedIndex(i)}>
                                                                {e.value}
                                                            </div>
                                                        )
                                                    })}
                                                    </>
                                                )}
                                                {selectedKey == "user" && (
                                                    <>{user.map((e, i) => {
                                                        return (
                                                            <div className={i == selectedIndex ? 'bg-type' : ""} onClick={() => setselectedIndex(i)}>
                                                                {e}
                                                            </div>
                                                        )
                                                    })}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"ms-Grid-col ms-sm4 ms-md4 ms-lg"}>
                                    <div className="ms-Grid-row">
                                        <Stack tokens={stackTokens} style={{ float: "right", padding: "0px 8px" }}>
                                            <DefaultButton className={'black'} text="Close" onClick={handleClose} />
                                            {/* <DefaultButton disabled className={contentStyles.button + ' black'} text="Help" /> */}
                                        </Stack>
                                    </div>
                                    <div className="ms-Grid-row" style={{ padding: "28px 17px" }}>
                                        <TextField value={uservalue} disabled={disableEdit} onChange={(ev) => { ValueChange(ev) }} label="Enter value" />
                                        <div style={{ paddingTop: "6px" }}>
                                            <DefaultButton disabled={disableEdit} onClick={(ev) => { ChangeUserDefined(ev) }} className={contentStyles.button + ' black'} text="Change" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                title={"Covariate Values for Plot"}
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
        rediskeytest: state.instanceReducer.rediskeytest,
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
        typeID: state.sortReducer.typeID
    };
}


function mapDispatchToProps(dispatch) {
    return {
        setActiveItem: (activeItem: IActiveItems) => {
            dispatch({ type: 'SET_ACTIVE_ITEM', payload: activeItem });
        },
        setAllActiveItem: (allactiveItem: IActiveItems) => {
            dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
          },
          addSection: (newSection: IActiveItems) => {
            dispatch({ type: 'ADD_SECTION', payload: newSection });
          },
          setSelectedPivotItem: (pvtItem) => {
            dispatch({ type: 'SET_SELECTED_PIVOT_ITEM', payload: pvtItem });
          },
        OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
        actions: {
            storeWorksheet: bindActionCreators(storeWorksheet, dispatch),
        },
        storeGraph: bindActionCreators(storeGraph, dispatch),
        summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
        addGraphPage: (item) => {
            dispatch({ type: "ADD_GRAPHPAGE", payload: item });
        },


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoviriantReport)

