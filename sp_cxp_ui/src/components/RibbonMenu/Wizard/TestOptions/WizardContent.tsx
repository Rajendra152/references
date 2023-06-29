import React, { useState,useEffect } from 'react';

import { DATAFORMAT, DATASELECTION, MEDIAN, DATASELECTIONSTEPWISE, SCALETYPE, BINOPTIONS, GRAPHDATA, OUTPUTOPTIONS, SELECTGRAPHSTYLE, STATUSLABEL } from './GraphFlowTypes'
//import { WizardContentProps } from './GraphWizard'
//import { WizardContentProps } from './TestOptionsWizard';
import { List } from './List'
import DataSelection from './DataSelection';
import DataSelectionStepWise from './DataSelectionStepWise';
import Mean from './Mean';
import ScaleType from './ScaleType';
import { getAllFormatList } from './GraphList/GetformatList';
import { getDataSelection1 } from './GraphList/GetformatList';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react';
import { BinOptions } from './BinOptions';
import SelectGraphStyle from './SelectGraphStyle';
import {OutputOptions} from './OutputOptions';
import {GraphData} from './GraphData';
import StatusLabel from './StatusLabel'
import * as actionCreators from '../../../../store/Helpmenu/actions'

let recentInfo = {}; 
export const WizardContent = (wizardContentProps: WizardContentProps) => {
  
  const [dataSelect, setDataSelect] = useState({});
  const [disableXY, setdisableXY] = useState();
  const [calculationInfo, setCalculationInfo] = useState({
    symbol: {},
    upper: {},
    lower: {},
  });
  const onListItemClick = (item) => {
    //alert("calling hree");
    //alert(JSON.stringify(item))
    if (item.title === "XY Pair-Errors") {
      setdisableXY(true);
      wizardContentProps.content.sd_x = 1;
      wizardContentProps.content.sd_y=1;
    } else {
      setdisableXY(false);
      wizardContentProps.content.sd_x = 1;
      wizardContentProps.content.sd_y=1;
    }
    // console.log(item);
    wizardContentProps.content.onHandleItemClick(item); //commented for the purpose of showing title
    let data = { ...item };
    setDataSelect(data);
    // console.log(item, 'item');
  }

  const onCalItemClick = (item) => {
    let data = { ...item };
    setCalculationInfo(data);
    // console.log(item, 'item');
  }
  const getDataSelection = (param,getType) => {
    //for only single dialog like this
    if (param === "Descriptive Statistics") {
      return {
        id: "55", value: "Descriptive", title: "Descriptive Data"
      }
    }
    if (param === "One Way Frequency Tables") {
      return {
        id: "56", value: "Frequency", title: "One way frequency table"
      }

    }
    if (param === "Two Way ANOVA") {
      return {
        id: "57", value: "Two_way_anova", title: "Two Way ANOVA"
      }

    }
    if (param === "One-Sample Signed Rank Test") {
      return {
        id: "58", value: "One_Sample_Ranked_Test", title: "One Sample Ranked Test"
      }

    }
    if (param === "Three Way ANOVA") {
      return {
        id: "59", value: "Three_way_anova", title: "Three way anova"
      }

    }
    if (param === "One Way ANCOVA") {
      return {
        id: "60", value: "One_Way_ANCOVA", title: "One Way ANCOVA"
      }

    }
    if (param === "Two Way Repeated Measures ANOVA") {
      return {
        id: "61", value: "Two_Way_Repeated_Measures_ANOVA", title: "Two Way Repeated Measures ANOVA"
      }

    }
    if (param === "z-test") {
      return {
        id: "63", value: "z_test", title: "z-test"
      }

    }
    if (param === "Linear") {
      return {
        id: "73", value: "Linear_Regression", title: "Linear Regression"
      }

    }
    if (param === "Multiple Logistic") {
      return {
        id: "74", value: "Multiple_Logistic", title: "Multiple Logistic Regression"
      }

    }
    if (param === "Multiple Linear") {
      return {
        id: "75", value: "Multiple_Linear", title: "Multiple Linear Regression"
      }

    }
    if (param === "Polynomial") {
      return {
        id: "76", value: "Polynomial_Regression", title: "Polynomial Regression"
      }

    }
    if (param === "Forward" && wizardContentProps.content.stepType == DATASELECTION) {
      return {
        id: "77", value: "Forward_Stepwise", title: "Forward Stepwise Regression"
      }

    }
    if (param === "Forward" && wizardContentProps.content.stepType == DATASELECTIONSTEPWISE) {
      return {
        id: "78", value: "Forward_Stepwise_Var", title: "Forward Stepwise Regression Var"
      }

    }
    if (param === "Backward" && wizardContentProps.content.stepType == DATASELECTION) {
      return {
        id: "79", value: "Backward_Stepwise", title: "Backward Stepwise Regression"
      }

    }
    if (param === "Backward" && wizardContentProps.content.stepType == DATASELECTIONSTEPWISE) {
      return {
        id: "80", value: "Backward_Stepwise_Var", title: "Backward Stepwise Regression Var"
      }

    }
    if (param === "Best Subset") {
      return {
        id: "81", value: "Best_Subset_Regression", title: "Best Subset Regression"
      }

    }
    if (param === "Normalize Ternary Data") {
      return {
        id: "85", value: "Normalize_Ternary_Data", title: "Normalize Ternary Data"
      }

    }
    if (param === "Histogram") {
      return {
        id: "100", value: "Histogram", title: "Histogram"
      }

    }
    if (param === "Smoothers2D") {
      return {
        id: "101", value: "Smoothers2D", title: "Smoothers2D"
      }

    }
    if (param === "Smoothers3D") {
      return {
        id: "102", value: "Smoothers3D", title: "Smoothers3D"
      }

    }
    if(param === "LogRank" && getType === "datasectionstepwise"){
      return {
        id: "103", value: "LogRankIndexedLabel", title: "LogRankIndexedLabel"
      }
    }
    if(param === "Gehan-Breslow" && getType === "datasectionstepwise"){
      return {
        id: "104", value: "GehanBreslowIndexedLabel", title: "GehanBreslowIndexedLabel"
      }
    }
    if(param === "Stratified Model" && getType === "datasectionstepwise"){
      return {
        id: "105", value: "StratifiedModelLabel", title: "StratifiedModelLabel"
      }
    }
    if(param === "Proportional Hazards" && getType === "datasectionstepwise"){
      return {
        id: "106", value: "ProportionalHazardsLabel", title: "ProportionalHazardsLabel"
      }
    }
    // if(param === "Fisher Exact Test"){
    //   return {
    //     id: "113", value: "Raw_Fischer_Exact", title: "Fisher Exact Test"
    //   }
    // }
    return undefined;
  }
  

  const checkSecDataSelection = (item) =>{
    console.log(item, 'Second dataselect');
    if(wizardContentProps.content["testOptions"]=='Principal Components' || wizardContentProps.content["testOptions"]=='Proportional Hazards'){
      let data = {...item};
      // data.value = data.data_value;
      if(data.hasOwnProperty('data_value')){
        let originalValue = data;
        originalValue.value = data.data_value;
        recentInfo = originalValue;
        // wizardContentProps.recentInfo(originalValue);
        // setSecondDataSelect(originalValue);
      }
    }
    if(wizardContentProps.content["testOptions"]=='Stratified Model' ) {
      let data = {...item};
      // data.value = data.data_value;
      if(data.hasOwnProperty('data_value')){
        let originalValue = data;
        originalValue.value = data.data_value;
        recentInfo = originalValue;
        // wizardContentProps.recentInfo(originalValue);
        // setSecondDataSelect(originalValue);
      }
    }

    if(wizardContentProps.content["testOptions"]=='LogRank' || wizardContentProps.content["testOptions"]=='Gehan-Breslow') {
      let data = {...item};
      console.log(data);
      // data.value = data.data_value;
      if(data.hasOwnProperty('data_value')){
        let originalValue = data;
        originalValue.value = data.data_value;
        recentInfo = originalValue;
        // wizardContentProps.recentInfo(originalValue);
        // setSecondDataSelect(originalValue);
      }
    }
  }
  const setDeviations=(e,getlabel)=>{
    if(getlabel == 'sd_x'){
      wizardContentProps.content.sd_x = e.target.value;
    }else{
      wizardContentProps.content.sd_y = e.target.value;
    }
   }

   useEffect(() => {
    if (wizardContentProps.content.stepType == BINOPTIONS) {
        wizardContentProps.OpenHelpWindow("wbasics", "histogram_wizard___bin_options", "")
    }
    else if (wizardContentProps.content.stepType == GRAPHDATA ) {
        wizardContentProps.OpenHelpWindow("wbasics", "smoothed_curve_options", "")
    }
    else if (wizardContentProps.content.stepType == DATASELECTION) {
      if(wizardContentProps.title == "Normalize Ternary Data"){
        wizardContentProps.OpenHelpWindow("wbasics", " Normalize_Ternary_Data_Column_Picker", "")
      }
      else{
        wizardContentProps.OpenHelpWindow("wbasics", "histogram_wizard___select_data", "")
      }
    }
    else if (wizardContentProps.content.stepType == SELECTGRAPHSTYLE) {
        wizardContentProps.OpenHelpWindow("wbasics", "histogram_wizard___select_graph_style", "")
    }
    else if (wizardContentProps.content.stepType == SCALETYPE) {
      wizardContentProps.OpenHelpWindow("wbasics", "Normalize_Ternary_Data_Scale_Type", "")
  }
}, [wizardContentProps.content.stepType])

  const Content = () => {
    switch (wizardContentProps.content.stepType) {

      case DATAFORMAT:
        const dataFormatList = getAllFormatList(wizardContentProps.content, wizardContentProps.content.testOptions);
        return <List onHandleClick={onListItemClick} list={dataFormatList} onInitialSelect={wizardContentProps.content.setInitialContent} isNextClicked={wizardContentProps.isNextClicked} content={wizardContentProps.content} title = {wizardContentProps.title}/>
      case DATASELECTION:
        let dataSelectionInfo = {};
        dataSelectionInfo = dataSelect;
        console.log(dataSelectionInfo)
        let data = getDataSelection(wizardContentProps.content["testOptions"]);
        let data2 = getDataSelection1(wizardContentProps.content["testOptions"]);
        if (data) {
          dataSelectionInfo = data;
        }else if(data2) {
          dataSelectionInfo = data2;
        }
        console.log(dataSelectionInfo)
        return <DataSelection checkSecDataSelection={(data)=>checkSecDataSelection(data)} content={wizardContentProps.content} select={{ ...dataSelectionInfo }}></DataSelection>
      case MEDIAN:
        return <Mean content={wizardContentProps.content} />
      case DATASELECTIONSTEPWISE:
        let dataSelectionInfoStepWise = {};
       // dataSelectionInfoStepWise = dataSelect;
        let datastepwise = getDataSelection(wizardContentProps.content["testOptions"],'datasectionstepwise');
        console.log(datastepwise);
        let dataSelectionInfo2 = {};
        // updateinfo
        dataSelectionInfo2 = recentInfo;
        console.log(dataSelectionInfo2);
        let data3 = getDataSelection1(recentInfo.value);
        if (datastepwise) {
          dataSelectionInfoStepWise = datastepwise;
        }
        else if (data3) {
          dataSelectionInfoStepWise = data3;
        }
        return <DataSelectionStepWise content={wizardContentProps.content} select={{ ...dataSelectionInfoStepWise }} dataSelectList={dataSelect}></DataSelectionStepWise>
      case SCALETYPE:
        return <ScaleType content={wizardContentProps.content} />
      case BINOPTIONS:
        return <BinOptions content={wizardContentProps.content}/>
      case SELECTGRAPHSTYLE:
        const graphStyleList = getAllFormatList(wizardContentProps.content, wizardContentProps.content.testOptions);
        return (
          <>
            <Label>Graph styles</Label>
            <List onHandleClick={onListItemClick} list={graphStyleList} onInitialSelect={wizardContentProps.content.setInitialContent} isNextClicked={wizardContentProps.isNextClicked} content={wizardContentProps.content} title = {wizardContentProps.title}/>
          </>
        )
      case OUTPUTOPTIONS:
        return <OutputOptions content={wizardContentProps.content} />
        case STATUSLABEL:
          return <StatusLabel content={wizardContentProps.content}></StatusLabel>
      case GRAPHDATA:
        {
          return <GraphData />
        }
        break;
      default:
        return <div>List</div>
    }
  }

  return (
    <div className="wizard-listContent" style= {{width: wizardContentProps.content.stepType === 'STATUSLABEL'? "100%":"40%"}}>
      {/* <div className="graphWizardLeftCard"></div> */}
      <Content />
      {wizardContentProps.content["testOptions"] === "Deming" && wizardContentProps.content.stepType === "DATAFORMAT" &&
        <fieldset>
          <legend><Label>Standard deviations</Label></legend>
          <TextField disabled={disableXY}
            label="SD of X:"
            placeholder="1.0"
            style={{ color: '#333' }}
            onChange={(e)=>setDeviations(e,'sd_x')}
          />
          <TextField disabled={disableXY}
            label="SD of Y:"
            placeholder="1.0"
            style={{ color: '#333' }}
            onChange={(e)=>setDeviations(e,'sd_y')}
          />
        </fieldset>
      }

    </div>
  )
}
