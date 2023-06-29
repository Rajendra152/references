import React, { useState, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Checkbox, Stack } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { useBoolean } from '@uifabric/react-hooks';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { version } from "../../Constant/ConstInfo";
import * as actionCreators from '../../../store/Helpmenu/actions';
import { connect } from 'react-redux';
const { ipcRenderer } = require('electron');

const dialogContentProps = {
    type: DialogType.normal,
    title: version,
    subText: 'The last plot in a graph cannot be deleted.',
    key: "DELETE_WARN"
};


//const dialogStyles = { main: { maxWidth: "100px" } };
const dialogStyles = { main: { maxWidth: "200px" } };

const dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
    keepInBounds: true,
};

const modalProps = {
    isBlocking: true,
    styles: dialogStyles,
    dragOptions: dragOptions,
    className: "warningDialog"
};


const stackTokens = { childrenGap: 10 };

const Plot = (props: any) => {
    console.log(props)
    const [selPlot, setSelPlot] = useState(props.currPlot)
    const [hideWarningDialog, { toggle: toggleHideWarningDialog }] = useBoolean(true);
    useEffect(()=>{
        props.OpenHelpWindow("wbasics", "pub_dtlgraph_properties__graph", "graph_properties__plot")
      },[])
  

    useEffect(() => {
        const activePlt = props.allPlot.filter(item => item.id == selPlot.id)
        if(!activePlt[0]){        
            setSelPlot(props.allPlot[0])
            props.setPlotOnClick(props.allPlot[0]) 
        }
    }, [props])


    // useEffect(() => {
    //     console.log("Hi Inside Plot Effect ")
    //     if (ipcRenderer.rawListeners('fromWorksheetWizardrahul').length === 0) {
    //         console.log("Hi Inside Plot if ")
    //         ipcRenderer.on('fromWorksheetWizardrahul', function (event, arg) {
    //             // let values = getGraphInfo(arg)
    //             console.log(arg, "short window")
    //             // console.log(values, "long window")
    //             //createGraphinPage(values.graphtype, values.graphstyle, values.dataformat, values.result)
    //             //updatePlotOnListen(values.graphtype, values.graphstyle, values.dataformat, values.result)
    //         });
    //     }
    //     return () => {
    //         if (ipcRenderer != undefined) {
    //             console.log("Hi Inside Remove Plot")
    //             ipcRenderer.removeAllListeners('fromWorksheetWizardrahul')
    //         }
    //     }
    // }, [])

    const openWizard = (format, graphType, graphStyle, isStepExists) => {
        let sheetData = [...props.stateSpreadSheet.spreadSheetColumnData];
        let Data = {
            message: 'Hi',
            someData: "Let's go",
            path: 'graphWizard',
            sheetData: sheetData,
            stepType: isStepExists ? format : '',
            graphType: graphType,
            graphStyle: graphStyle,
        };
        ipcRenderer.send('request-mainprocess-action', Data);
    };


    const checkboxOnChange = (plot, value) => {
        console.log(plot, value)
        plot.isChecked = value

        setSelPlot(plot)
        props.upGraphPlot(plot, "update")
    }

    const datasource = [];
    for (let key in selPlot.data) {
        if (selPlot?.data[key]?.length > 1) {
            for (let index = 0; index < selPlot.data[key].length; index++) {
                const plt = {}
                plt.key = `${key.toUpperCase()} ${index + 1} Data `
                plt.value = `Column ${selPlot.data[key][index] + 1}`
                datasource.push(plt)
            }
        }
        else if (selPlot.data[key]!== undefined && selPlot?.data[key]?.length !== 0  ) {
            const plt = {}
            plt.key = `${key.toUpperCase()} Data `
            plt.value = `Column ${selPlot?.data[key][0] + 1}`
            datasource.push(plt)
        }
    }

    const deleteOnClick = () => {
        if (props.allPlot.length == 1) {
            toggleHideWarningDialog()
        }
        else {
            if (selPlot) {
                props.delGraphPlot(selPlot)
            }
        }
    }

    const modifyPlotOnClick = () => {
        let graphType = selPlot.graphType;
        let graphStyle = selPlot.subGraphType;
        // may need to write function to convert gra[h and subgraph as per wizard accepting
        //openBubble('DATAFORMAT', '1', 'SP1', true)
        openWizard('DATAFORMAT', graphType, graphStyle, true)
    }

    const updatePlotOnListen = (graphType: any, subGraphType: any, dataformat: any, result: any) => {
        const updatePlot = JSON.parse(JSON.stringify(selPlot))
        updatePlot.graphType = graphType;
        updatePlot.subGraphType = subGraphType;
        updatePlot.format = dataformat;
        updatePlot.data = result;
        props.upGraphPlot(updatePlot, "new")

    }
   
    return (
        <div className="insets-container plots">
            <div className="insets-header">
                <Label className="">
                    Show Plots
                </Label>
            </div>
            <div className={'plot-info'} style={{ marginBottom: '2px', marginLeft: '5px' }}>
                {
                    props.allPlot.map(data => {
                        return <div
                            style={data.id == selPlot.id ? { backgroundImage: "linear-gradient(#d5f0fd, #b6f0ff)", cursor: "pointer" } : { cursor: "pointer" }}
                            onClick={() => { setSelPlot(data);props.setPlotOnClick(data) }} 
                            className='d-flex'>
                            <Checkbox
                                label=''
                                key={data.id}
                                checked={data.isChecked}
                                onChange={(ev, value) => { checkboxOnChange(data, value) }}
                            />
                            <Text variant={'small'} block>
                                {data.name}
                            </Text>
                            
                        </div>
                    })
                }
            </div>
            <div className={'d-flex align-items-center justify-content-end'} style={{ marginBottom: '5px', marginLeft: '5px', }}>
                <DefaultButton text="Delete" allowDisabledFocus onClick={deleteOnClick} />
                <DefaultButton text="Modify" allowDisabledFocus
                    onClick={modifyPlotOnClick}
                    disabled
                />
            </div>
            <div className={'d-flex justify-content-end'} style={{ marginBottom: '0px', marginLeft: '0px', }}>
                <div className='ms-lg10'>
                    <Label style={{ padding: ' 0px' }}>Plot type:</Label>
                    <Text variant={'small'} block>
                        {selPlot.subGraphType}
                    </Text>
                    <Label style={{ padding: ' 0px' }}>Data format:</Label>
                    <Text variant={'small'} block>
                        {selPlot.format + " Pair"}
                    </Text>
                    <div className={'plot-col-info'} style={{ marginTop: '2px', marginLeft: '0px' }}>
                        {
                        datasource.map(value => {
                          let symbol =  value.key.includes("SYMBOL_VALUES")
                          if(symbol == false){
                            return (
                                <Label
                                    style={{ padding: ' 0px' }}>{value.key}:
                                    <span style={{ fontWeight: 600 }}>
                                        {value.value}
                                    </span>
                                </Label>
                            )
                        }
                        })
                        }
                    </div>
                    
                </div>
                <div >
                    <img className="img-plot" src="../assets/icons/Graphicons/Bar_VS.svg"></img>
                </div>
            </div>
            {
                (<Dialog
                    hidden={hideWarningDialog}
                    onDismiss={toggleHideWarningDialog}
                    dialogContentProps={dialogContentProps}
                    modalProps={modalProps}
                >
                    <DialogFooter>
                        <DefaultButton onClick={toggleHideWarningDialog} text="OK" />
                    </DialogFooter>
                </Dialog>)
            }

        </div>
    );
}

function mapStateToProps(state) {
    return {
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Plot);
