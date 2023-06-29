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
const { ipcRenderer } = require('electron');

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

const SelectVariable = (props: any) => {
    const [selectedKey, setSelectedKey] = useState(props.selectedColumn.spreadSheetColumnData[0].text)
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
        console.log("selected column", props.selectedColumn.spreadSheetColumnData)

    }, [])
    const handleClose = async () => {

        props.close();
    }


    const UpdateSrcCol = () => {
        props.updateSrcColum(selectedKey)
    }
    useEffect(() => {
        UpdateSrcCol()
    }, [selectedKey])

    const ValueChange = (ev) => {
        ev.preventDefault()
        console.log("value", ev.target.value)
        setuservalue(ev.target.value)
    }

    return (
        <>
            <CommonModalComp
                customClass="SvDialog"
                close={props.close}
                component={
                    <>
                        <div className="ms-Grid" dir="ltr" style={{ backgroundColor: "lightgrey", height: "112px" }}>
                            <div className="ms-Grid-row" style={{ padding: "7px" }}>
                                <div className={"ms-Grid-col ms-sm8 ms-md8 ms-lg8"}>

                                    <div className="ms-Grid-row" style={{ backgroundColor: "white", margin: "0px 0px 0px ", minHeight: "100px", height: "100px", overflowY: "scroll" }}>
                                        {props.selectedColumn.spreadSheetColumnData.map((e, i) => {
                                            return (
                                                <div className={i == selectedIndex ? 'bg-type' : ""} onClick={() => { setselectedIndex(i); setSelectedKey(e.text);UpdateSrcCol() }}>
                                                    {e.text}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={"ms-Grid-col ms-sm4 ms-md4 ms-lg"}>
                                    <div className="ms-Grid-row">
                                        <Stack tokens={stackTokens} style={{ float: "right", padding: "0px 8px" }}>
                                            <DefaultButton onClick={(ev) => { props.OpenHistogram() }} className={contentStyles.button + ' black'} text="OK" />
                                            <DefaultButton className={'black'} text="Cancel" onClick={handleClose} />
                                            {/* <DefaultButton disabled className={contentStyles.button + ' black'} text="Help" /> */}
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                title={"Select Data Variable"}
            ></CommonModalComp>
        </>
    )
}


const contentStyles = mergeStyleSets({
    table: {
        height: '150px',
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
        selectedColumn: state.instanceReducer

    };
}


function mapDispatchToProps(dispatch) {
    return {
        OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectVariable)

