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
    createNewClient,
} from "../../../services/RedisServices";
import { bindActionCreators } from "redux";
import * as plotEquationAction from "../../../store/Worksheet/FormatCell/actions";
import * as plotRegressionAction from "../../../store/Worksheet/FormatCell/actions";
import * as resultGraphAction from "../../../store/Analysis/actions";
import { isReRenderGraph } from '../../../store/CreateGraph/CreateDiagramPage/actions';
import { pairedttesthist } from "../../App/Config";
import {createWorksheetDatarecompute} from '../../../services/NotebookManagerServices/ReportCreation';
import { createGraphPage } from '../../../services/NotebookManagerServicesNew';

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 30 } };
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
};
const options: IDropdownOption[] = [
    { key: 'NONE', text: 'None' },
    { key: '1', text: 'Fraction' },
    { key: '100', text: 'Percent' },
];
const options1: IChoiceGroupOption[] = [
    { key: 'Left', text: 'Left-edge binning' },
    { key: 'Right', text: 'Right-edge binning' }
];
const stackTokens: IStackTokens = { childrenGap: 40 };



const HistogramModal = (props: any) => {
    console.log("currentReport",props.activeWorksheet)
    const [selectedKey, setSelectedKey] = useState('Left')
    const [disableBin, setDisableBin] = useState(false)
    const [binValue, setBinValue] = useState(10);
    const [autobin, setAutoBin] = useState(false);
    const [drop, setDrop] = useState('NONE')
    const [norm, setnorm] = useState('NONE')

    console.log("props.SourceColumn",props.selectedSrc,props.activeWorksheet,props.typeID)


    const handleClose = async () => {
        let spreadSheetReference = props.referenceObjectState;
        console.log("props.SourceColumn",props.selectedSrc,props.activeWorksheet)
        const arg = {
            dataformatInfo: [{ title: "Source :", value: props.selectedSrc, next: "Output :", active: false, didx: 1 }
                , { title: "Output :", value: "H", next: undefined, active: true, idx: 1 }],
            testOptionsName: "Histogram",
            normalization: norm,
            graphStyle: 'Vertical Bar',
            binEdge: selectedKey,
            binNumber: binValue,
            automaticBinning: disableBin
        };
        var RowIndex = props.rowIndex
        var clientID
        if(props.typeID == "worsheet"){
            clientID = "meta" + props.activeWorksheet
        }
        else if(props.typeID == "report"){
             clientID = "meta" + props.currentReport.id
        }
        else if(props.typeID == "paired"){
            clientID = props.rediskeytest.message
       }
        else{
            clientID = "meta" + props.currentReport.id
        }
        
        var result = api_call_test_options(arg, clientID , RowIndex);
        let sendRes
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let rand = ''
        for ( var i = 0; i < 4; i++ ) {
            rand += characters.charAt(Math.floor(Math.random() * 
     4))}
        let ReportNew = props.currentReport 
        ReportNew.histogramId = props.currentReport.id + rand +"hist"
        if(props.typeID == "paired"){
            let arg1 ={worksheet:clientID,
            no_of_bins:binValue,
            auto_binning:disableBin,
            normalization:norm,
            bin_edge:selectedKey=='Left'?0:1
            }
            
             sendRes = await post(pairedttesthist,arg1);
             if (sendRes !== undefined) {
                if (sendRes.data.result !== undefined) {
                    console.log(sendRes.data.result.key_name);
                    console.log("here result 1")
                    const client = createNewClient();
                    console.log("here result 2")
                    
                    let optionsData = await getDataSetByKeyHistogram(
                        sendRes.data.result.key_name,
                        client
                    );
                    console.log("here result 3")
                    let outputBody = arg;
                    console.log("here result ", props, spreadSheetReference, outputBody, optionsData)
                    console.log("here result ", spreadSheetReference)
                    console.log("here result ", outputBody)
                    console.log("here result ", optionsData)
                    let selectedGraphKeys = Object.keys(props.selectedGraph);
                    console.log(selectedGraphKeys, "selectedGraphKeys")
                    let data = {x:[1],y:[2]}
                    console.log("here",props.currentReport.reportData.graph.sheetdata[4])
                    if(drop == "freq"){
            
                    }
                    else if(drop == "perc"){
            
                    }
                    // data.x.push(1)
                    // data.y.push(2)
                    await createWorksheetDatarecompute(optionsData.sheetdata,ReportNew.histogramId,props,'Paired t test')

                    // data.x.push(1)
                    // data.y.push(0)
                    const graphObject = {
                        graphType:"vertical_bar_plot",
                        subGraphType:"simpleBar",
                        format:"XYpair",
                        data,
                      };
                      console.log(graphObject, 'insdiecreategraph',                         ReportNew.histogramId,
                      );
                      createGraphPage(
                        props,
                        graphObject,
                        ReportNew,
                        ReportNew.histogramId,
                        'Histogram'
                      );
                }
            }
        }
        else {
            console.log("here else")
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let rand = ''
            for ( var i = 0; i < 4; i++ ) {
                rand += characters.charAt(Math.floor(Math.random() * 
         4))}
            let ReportNew = props.currentReport 
            ReportNew.histogramId = props.currentReport.id + rand + "hist" 
             sendRes = await post(result[0], result[1]);
             if (sendRes !== undefined) {
                if (sendRes.data.result !== undefined) {
                    console.log(sendRes.data.result.redis_id);
                    console.log("here result 1")
                    const client = createNewClient();
                    console.log("here result 2")
                    
                    let optionsData = await getDataSetByKeyHistogram(
                        sendRes.data.result.redis_id,
                        client
                    );
                    console.log("here result 3")
                    let outputBody = arg;
                    console.log("here result ", props, spreadSheetReference, outputBody, optionsData)
                    console.log("here result ", spreadSheetReference)
                    console.log("here result ", outputBody)
                    console.log("here result ", optionsData)
                    let selectedGraphKeys = Object.keys(props.selectedGraph);
                    console.log(selectedGraphKeys, "selectedGraphKeys")
                    createWorksheetDatarecompute(optionsData.graph[0].sheetdata,ReportNew.histogramId,props,'Two way Repeated Measures')

                    let data = {x:[0],y:[1]}
                    // data.x.push(1)
                    // data.y.push(0)
                    const graphObject = {
                        graphType:"vertical_bar_plot",
                        subGraphType:"simpleBar",
                        format:"XYpair",
                        data,
                      };
                      console.log(graphObject, 'insdiecreategraph',                         ReportNew.histogramId,
                      );
                      createGraphPage(
                        props,
                        graphObject,
                        ReportNew,
                        ReportNew.histogramId,
                        'Histogram'
                      );

                    // calculateHistogram(
                    //     spreadSheetReference,
                    //     outputBody,
                    //     optionsData,
                    //     props,
                    //     props.currentReport,
                    //     'Histogram'
                    // );
                }
            }
        }
     

        console.log("here result ", sendRes)
        // let outputBody = params;
        // calculateHistogram(
        //     spreadSheetReference,
        //     outputBody,
        //     optionsData,
        //     props
        // );

        props.close();
    }
    const _onChange = (ev) => {
        console.log("jjj", ev.target.checked)
        if (ev.target.checked == true) {
            setDisableBin(true)
        }
        else if (ev.target.checked == false) {
            setDisableBin(false)

        }
    }
    const onChange = React.useCallback((ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
        console.log(option.key)
        setSelectedKey(option.key);
    }, []);
    const ChangeBinInc = (value) => {
        if(value >0){
            let inc = parseInt(value) + 1;
            setBinValue(inc)
            console.log("here", inc)
        }
      
    }
    const ChangeBinDec = (value) => {
        if(value == 1){

        }
        else{
        let dec = parseInt(value) - 1;
        setBinValue(dec)
        }
    }
    const ChangedValue = (ev, item) => {
        console.log("here", item.text)
        setDrop(item.key)
        setnorm(item.key)
    }
    const ChangeBinValue = (e)=>{
        if (e.target.value <= 0) {
            alert('Enter number greater than zero')
            setBinValue(1)
          }
          else{
            setBinValue(e.target.value)
          }
    }
    return (
        <>
            <CommonModalComp
                customClass="historeport"
                close={props.close}
                component={
                    <>
                        <div className="ms-Grid" dir="ltr" style={{ backgroundColor: "lightgrey", height: "212px" }}>
                            <div className="ms-Grid-row">
                                <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg6"}>
                                    <div className="ms-Grid-row">
                                        <div className={"ms-Grid-col ms-sm9 ms-md9 ms-lg9"}>

                                            <SpinButton
                                                label="Number of bins"
                                                labelPosition={Position.top}
                                                value={binValue}
                                                min={1}
                                                max={100}
                                                disabled={disableBin}
                                                step={1}
                                                onChange={ChangeBinValue}
                                                onIncrement={ChangeBinInc}
                                                onDecrement={ChangeBinDec}
                                                incrementButtonAriaLabel="Increase value by 1"
                                                decrementButtonAriaLabel="Decrease value by 1"
                                                styles={styles}
                                            />
                                        </div>
                                    </div>

                                    <div className="ms-Grid-row" style={{ padding: "8px" }}>

                                        <Checkbox label="Automatic binning" onChange={(ev) => _onChange(ev)} />
                                    </div>
                                    <div className="ms-Grid-row" style={{ padding: "0px 8px" }}>

                                        <Dropdown
                                            // placeholder="Select an option"
                                            selectedKey={drop}
                                            label="Normalization"
                                            options={options}
                                            onChange={ChangedValue}
                                            styles={dropdownStyles}
                                        />
                                    </div>
                                </div>
                                <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg6"}>
                                    <div className="ms-Grid-row" style={{ padding: "7px" }}>
                                        <fieldset>
                                            <legend>
                                                <div style={{ fontSize: "14px" }}>Bin type</div>
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
                title={"Histogram Options"}
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
        rediskeytest: state.instanceReducer.rediskeytest


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
export default connect(mapStateToProps, mapDispatchToProps)(HistogramModal)

