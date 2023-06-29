import React, { useState, useEffect } from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    ContextualMenu,
    Toggle,
    Modal,
    IDragOptions,
    IIconProps,
    Stack,
    IStackTokens,
    IStackProps,
} from '@fluentui/react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import {
    isRedoDataAvailable,
    isUndoDataAvailable,
  } from '../../../../store/Worksheet/SpreadSheet/actions';

import { DefaultButton, PrimaryButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { addNewAxis } from '../../../../services/graphPageServices/GraphServices';
import * as ACTION from '../../../Redux/actionConstants';
import Helpbutton from '../../../../HelpButton';
const stackTokens: IStackTokens = { childrenGap: 20 };

const AddAxis: React.FunctionComponent = (props) => {
    const [modifyPlotId, setmodifyId] = useState('')
    const [Allplots, setAllPlot] = useState([])
    const [modifyPlot, setModify] = useState([])
    const [isSelectAxisOpen, setSelectAxisOpen] = useState(false);
    const [selectedplot, setSelectedPlot] = useState('')
    const [selectedAxis, setSelectedAxis] = useState('')
    const [plot, setPlotDialog] = useState(true)
    const [axis, setAxisDialog] = useState(false)
    const [position, setPositionDialog] = useState(false)
    const [selectedPOsition, setSelectedPosition] = useState('')
    const [sideplaced, setsideplaced] = useState('')

    const [keepInBounds,{toggle:toggleKeepInBounds}] = useBoolean(true);
  
    const dragOptions = React.useMemo(
      (): IDragOptions => ({
        moveMenuItemText: 'Move',
        closeMenuItemText: 'Close',
        menu: ContextualMenu,
        keepInBounds,
      }),
      [keepInBounds],
    );

    useEffect(() => {
        setPlotDialog(props.plot)
        setAxisDialog(props.axis)
        setPositionDialog(props.position)
    }, [props.axis, props.plot, props.position])

    useEffect(() => {
        let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
        let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
        if (allGraphsInPage && allGraphsInPage.graphList && props.pageInstance.selectedItems.nodes.length > 0) {

            for (let i = 0; i < allGraphsInPage.graphList.length; i++) {
                if (allGraphsInPage.graphList[i].id == props.pageInstance.selectedItems.nodes[0].id) {
                    var allPlots = allGraphsInPage.graphList[i].plotData;
                    setAllPlot(allPlots)
                }
            }
        }
    }, [props])
    useEffect(() => {
        let activeGraphId = props.allActiveItem.selectedItemOnNotebook;
        let allGraphsInPage = props.notebooks.allGraphPages.byId[activeGraphId];
        var allPlots = allGraphsInPage && allGraphsInPage.graphList[0] ? allGraphsInPage.graphList[0].plotData : [];
        setModify(allPlots[0])
    }, [])

    const onDismiss=(ev)=>{
        ev.preventDefault();
        props.setAxisOpen(false)
    }

    const modifyCurrentPlot = () => {
        props.setModifyOpen(false)
    }

    const SelectedPlot = () => {
        console.log("modifyPlot", modifyPlot)
        // setPlotDialog(false)
        // setAxisDialog(true)
        // setPositionDialog(false)
        props.setplot(false)
        props.setposition(false)
        props.setaxis(true)
        setSelectedPlot(modifyPlot)
        if (Allplots.length == 2) {
            //   props.setDeleteOpen(false)
        }
    }
    const SelectedAxis = () => {
        if (selectedAxis == "") {
            alert("Select axis")
        }
        else {
            props.setplot(false)
            props.setposition(true)
            props.setaxis(false)
        }
    }
    const selectedsidechange = (side) => {
        setsideplaced(side)
        setSelectedPosition(side)
    }
    const SelectedAxisBack = () => {
        props.setplot(true)
        props.setposition(false)
        props.setaxis(false)
    }
    const SelectedSideBack = () => {
        props.setplot(false)
        props.setposition(false)
        props.setaxis(true)
    }
    const finish = () => {
        console.log("plot", modifyPlot)
        console.log("axis", selectedAxis)
        console.log("position", selectedPOsition)
        addNewAxis(modifyPlot, props, selectedPOsition, selectedAxis)
        props.setAxisOpen(false)


    }
    const titleId = useId('title');

    return (
        <div className="modify">
            <Modal
                titleAriaId={titleId}
                isOpen={props.isAxisOpen}
                onDismiss={(ev)=>onDismiss(ev)}
                isBlocking={false}
                isModeless={false}
                className="add-axis"
                containerClassName={contentStyles.container}
                dragOptions={dragOptions}
            >
                <div className="ms-Grid " dir="ltr">
                    <div className='ms-Grid-row' >
                        <div className={contentStyles.header}>
                            <div className="ms-Grid-col ms-sm9">
                                <span id={titleId}>Graph Wizard - Add Axis</span>
                            </div>
                            <div className="ms-Grid-col ms-sm3 " style={{ paddingTop: "5px" }}>
                                <Helpbutton nodeId="graph_wizard___add_axis" />
                            </div>
                            <IconButton
                                styles={iconButtonStyles}
                                iconProps={cancelIcon}
                                ariaLabel="Close popup modal"
                                onClick={() => props.setAxisOpen(false)}
                            />
                        </div>
                    </div>
                </div>
                {plot && (
                    <div className="bg-add-axis">
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm7 ">
                                    <div className="ms-Grid-row">
                                        <p style={{ fontSize: "12px", margin: "0px 0px 5px 0px" }}>Add axis to which plot?</p>
                                        <div className="ms-Grid-col ms-sm7 ">
                                            <img src="../assets/img/plot.png"></img>
                                        </div>
                                        <div className="ms-Grid-col ms-sm5 ">
                                            <div style={{ fontSize: "12px" }}>Select the plot to add an axis to. Click Next to continue</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ms-Grid-col ms-sm5 modify-bg" style={{ margin: "15px 0px" }}>
                                    {Allplots.map((e) => {
                                        return <div className="ms-Grid-row pointer">
                                            <div id={e.id} className={modifyPlotId == e.id ? "selectedPLot" :( modifyPlot.id == e.id ? "selectedPLot" : '')}>
                                                <Text variant={'smallPlus'} onClick={() => { setmodifyId(e.id); setModify(e) }}>
                                                    {e.name}
                                                </Text>
                                            </div>
                                        </div>
                                    })}
                                </div>

                            </div>
                            <Stack horizontal tokens={stackTokens}>
                                <DefaultButton text="Cancel" onClick={() => props.setAxisOpen(false)} allowDisabledFocus />
                                <DefaultButton text="Back" disabled />
                                <DefaultButton text="Next" onClick={SelectedPlot} allowDisabledFocus />
                                <DefaultButton text="Finish" disabled />
                            </Stack>

                        </div>

                    </div>
                )}
                {axis && (
                    <div className="bg-add-axis">
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm7 ">
                                    <div className="ms-Grid-row">
                                        <p style={{ fontSize: "12px", margin: "0px 0px 5px 0px" }}>Add X or Y axis?</p>
                                        <div className="ms-Grid-col ms-sm7 ">
                                            <img src="../assets/img/plot.png"></img>
                                        </div>
                                        <div className="ms-Grid-col ms-sm5 ">
                                            <div style={{ fontSize: "12px" }}>Select to add a vertical(y) or horizontal(x) axis,then click Next to continue</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ms-Grid-col ms-sm5 modify-bg" style={{ margin: "15px 0px" }}>
                                    <div className="ms-Grid-row pointer">
                                        <div id="xaxis" className={selectedAxis == 'xaxis' ? "selectedPLot" : ""}>
                                            <Text variant={'smallPlus'} onClick={() => { setSelectedAxis('xaxis') }}>
                                                X Axis
                                            </Text>
                                        </div>
                                        <div id="yaxis" className={selectedAxis == 'yaxis' ? "selectedPLot" : ""}>

                                            <Text variant={'smallPlus'} onClick={() => { setSelectedAxis('yaxis') }}>
                                                Y Axis                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Stack horizontal tokens={stackTokens}>
                                <DefaultButton text="Cancel" onClick={() => props.setAxisOpen(false)} allowDisabledFocus />
                                <DefaultButton text="Back" onClick={SelectedAxisBack} />
                                <DefaultButton text="Next" onClick={SelectedAxis} allowDisabledFocus />
                                <DefaultButton text="Finish" disabled />
                            </Stack>
                        </div>
                    </div>
                )}
                {position && (
                    <div className="bg-add-axis">
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm7 ">
                                    <div className="ms-Grid-row">
                                        <p style={{ fontSize: "12px", margin: "0px 0px 5px 0px" }}>Add axis to which side?</p>
                                        <div className="ms-Grid-col ms-sm7 ">
                                            <img src="../assets/img/plot.png"></img>
                                        </div>
                                        <div className="ms-Grid-col ms-sm5 ">
                                            <div style={{ fontSize: "12px" }}>The new axis is placed on the {sideplaced} side of the graph.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ms-Grid-col ms-sm5 modify-bg" style={{ margin: "15px 0px" }}>
                                    {selectedAxis == 'xaxis' ? 
                                    ( <div className="ms-Grid-row pointer">
                                    <div id="left" className={selectedPOsition == 'top' ? "selectedPLot" : ""}>
                                        <Text variant={'smallPlus'} onClick={() => { selectedsidechange('top') }}>
                                            top
                                        </Text>
                                    </div>
                                    <div id="yaxis" className={selectedPOsition == 'bottom' ? "selectedPLot" : ""}>
                                        <Text variant={'smallPlus'} onClick={() => { selectedsidechange('bottom') }}>
                                            bottom                                          </Text>
                                    </div>
                                </div>):
                                ( <div className="ms-Grid-row pointer">
                                <div id="left" className={selectedPOsition == 'left' ? "selectedPLot" : ""}>
                                    <Text variant={'smallPlus'} onClick={() => { selectedsidechange('left') }}>
                                        left
                                    </Text>
                                </div>
                                <div id="yaxis" className={selectedPOsition == 'right' ? "selectedPLot" : ""}>
                                    <Text variant={'smallPlus'} onClick={() => { selectedsidechange('right') }}>
                                        right                                          </Text>
                                </div>
                            </div>)}
                                   
                                </div>
                            </div>
                            <Stack horizontal tokens={stackTokens}>
                                <DefaultButton text="Cancel" onClick={() => props.setAxisOpen(false)} allowDisabledFocus />
                                <DefaultButton text="Back" onClick={SelectedSideBack} />
                                <DefaultButton text="Next" disabled allowDisabledFocus />
                                <DefaultButton text="Finish" onClick={finish} />
                            </Stack>
                        </div>
                    </div>
                )}

            </Modal>
        </div>
    );
};
function mapStateToProps(state: any) {
    return {
        notebooks: state.notebookReducer.notebooks,
        allActiveItem: state.notebookReducer.allActiveItem,
        pageInstance: state.createDiagramPageReducer.diagramPageInstance,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateGraphProperty: (item) => {
            dispatch({ type: ACTION.UPDATE_GRAPH_PROPERTY, payload: item });
        },
        isUndoDataAvailable: bindActionCreators(isUndoDataAvailable, dispatch),
        isRedoDataAvailable: bindActionCreators(isRedoDataAvailable, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAxis)

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
        width: 200
    },
    header: [
        // eslint-disable-next-line deprecation/deprecation
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '0px 8px 0px 24px',
            fontSize: '15px'
        },
    ],
    body: {
        flex: '4 4 auto',
        fontWeight: 500,
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});
const stackProps: Partial<IStackProps> = {
    horizontal: true,
    tokens: { childrenGap: 40 },
    styles: { root: { marginBottom: 20 } },
};
const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};
