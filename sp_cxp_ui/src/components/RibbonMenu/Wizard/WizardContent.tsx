import React, { useState, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { GRAPHTYPE, GRAPHSTYLE, DATAFORMAT, CALCULATIONS, DATASELECTION } from './GraphFlowTypes'
import { WizardContentProps } from './GraphWizard'
import { getGraphList, getGraphStyleList, getDataFormats } from './WizardServices';
import { List } from './List'
import { Calculations } from './Calculations';
import DataSelection from './DataSelection';
import { getAllFormatList } from './GraphList/GetformatList';
import { Properties } from '../../Constant/ConstantImage';
import { isCalculation, isAngleCalculation } from "./WizardServices";



export const WizardContent = (wizardContentProps) => {
    const [dataSelect, setDataSelect] = useState({});
    const [dataSelectionResult, setDataSelectionResult] = useState([]);
    const [calculationInfo, setCalculationInfo] = useState({
        symbol: {},
        upper: {},
        lower: {},
        isClockWise: false,
    });
    useEffect(() => {
        if (wizardContentProps.content.stepType == DATASELECTION) {
            wizardContentProps.OpenHelpWindow("wbasics", "graph_wizard__create_graph___select_data", "")
        }
        else if (wizardContentProps.content.stepType == GRAPHSTYLE) {
            wizardContentProps.OpenHelpWindow("wbasics", "graph_wizard__create_graph___style", "")
        }
        else if (wizardContentProps.content.stepType == GRAPHTYPE) {
            wizardContentProps.OpenHelpWindow("wbasics", "graph_wizard__create_graph___type", "")
        }
        else if (wizardContentProps.content.stepType == DATAFORMAT) {
            wizardContentProps.OpenHelpWindow("wbasics", "graph_wizard__create_graph___data_format", "")
        }
        else if (wizardContentProps.content.stepType == CALCULATIONS) {
            if (isCalculation(wizardContentProps.content.GRAPHSTYLE)) {
                wizardContentProps.OpenHelpWindow("wbasics", "graph_wizard__create_graph___error_bars", "")
            }
            if (isAngleCalculation(wizardContentProps.content.GRAPHSTYLE) || wizardContentProps.content['DATAFORMAT'] == '44') {
                wizardContentProps.OpenHelpWindow("wbasics", "graph_wizard__create_graph___axis_angle_units", "")
            }
            wizardContentProps.OpenHelpWindow("wbasics", "graph_wizard__create_graph___data_format", "")
        }
    }, [wizardContentProps.content.stepType])
    const onListItemClick = (item) => {
        item.activeId = item.id;

        wizardContentProps.content.activeId =item.id;
        wizardContentProps.content.onHandleItemClick(item);

        let data = { ...item };
    
        setDataSelect(data);
        
    }

    const onCalItemClick = (item) => {
        let data = [...item];
        setCalculationInfo(data);
        wizardContentProps.content.onHandleErrorClick(data);
    }

    // const onDataSelectItemClick = (item)=>{
    //   let data = [...item];
    //   setDataSelectionResult(data);
    //   wizardContentProps.content.onHandleDataSelectClick(data);
    //   console.log(item, 'item');
    // }

    const Content = (props) => {
        console.log(wizardContentProps, "wizardContentProps")
        switch (wizardContentProps.content.stepType) {
            case GRAPHTYPE:
                let graphList;
                if (wizardContentProps.content.graphTypeForAddPlot){
                    graphList = getGraphList(wizardContentProps.content.graphTypeForAddPlot)
                } else {
                    graphList = getGraphList();
                }
                return <List onHandleClick={onListItemClick} content={wizardContentProps.content} list={graphList} onInitialSelect={wizardContentProps.content.setInitialContent} isNextClicked={wizardContentProps.isNextClicked} />
            case GRAPHSTYLE: console.log("heelo graphstyle")
                const graphTypeList = getGraphStyleList(wizardContentProps.content['GRAPHTYPE'])
                console.log(graphTypeList, "graphtypelist")
                return <List onHandleClick={onListItemClick} content={wizardContentProps.content}  list={graphTypeList} onInitialSelect={wizardContentProps.content.setInitialContent} isNextClicked={wizardContentProps.isNextClicked} />
            case CALCULATIONS: console.log("heelo calculations")
                return <Calculations calculationInfo={calculationInfo} content={wizardContentProps.content} type={wizardContentProps.content.GRAPHSTYLE} onHandleClick={onCalItemClick} />
            case DATAFORMAT: console.log("heelo data format")
                console.log(wizardContentProps)
                console.log(calculationInfo)
                const dataFormatList = getAllFormatList(wizardContentProps.content, calculationInfo);
                console.log(dataFormatList)
                return <List onHandleClick={onListItemClick} content={wizardContentProps.content}  list={dataFormatList} onInitialSelect={wizardContentProps.content.setInitialContent} isNextClicked={wizardContentProps.isNextClicked} />
            case DATASELECTION: console.log("heelo hello data selection")
                // getDataFormats(wizardContentProps.content['GRAPHSTYLE'])
                // return <DataSelection onSelectItemClick={onDataSelectItemClick} content={wizardContentProps.content} select={dataSelect}></DataSelection>
                return <DataSelection content={wizardContentProps.content} select={dataSelect}></DataSelection>
            default:
                return <div>List</div>
        }
    }

    return (
        <div className="wizard-listContent">
            {/* <Label>{wizardContentProps.content.stepType}</Label> */}
            {/* <Content stepType={wizardContentProps.stepType} value={wizardContentProps.value}/> */}
            <div className="graphWizardLeftCard">
                <Content OpenHelpWindow={wizardContentProps.OpenHelpWindow} />
            </div>

        </div>
    )
}
