import React, { useEffect, useState } from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { WizardContentProps } from './TestOptionsWizard';
import * as resultGraphAction from "../../../../store/Analysis/actions";
import {
  closeWindow,
  sendtoMainWindow,
  sendtoMainWindowSpreadSheet,
  openSampleSize,
  openPower,
  openSmoothWizard,
  sendtoMainWindowReport,
  mainwindowReportwinOpen,
  sendtoAnalysisMenu,
} from '../DataTransfer/DataTransfer';
import { dataSelectInfo } from './DataSelection';
import { connect } from 'react-redux';
import { dataSelectInfoStepWise } from './DataSelectionStepWise';
import Helpbutton from '../../../../HelpView';
import { graphDataVal } from './GraphData';
import { Output } from './OutputOptions';
import { statusSelectInfo } from './StatusLabel';
import { bindActionCreators } from 'redux';
import { updateWizardOpen } from '../../../../store/Worksheet/SpreadSheet';
import * as componentInstance from '../../../../store/Worksheet/SpreadSheet/actions';
export interface NavigationProps {
  content: WizardContentProps;
    onHandleItemClick?: (item: string) => void;
    
}

const WizardNavigation = (props: NavigationProps) => {
  console.log("help",props)
  var current

  if (props.helpMenu.HelpValue[0].selectedItem !== "") {
    current = props.helpMenu.HelpValue[0].selectedItem
    console.log("x", current)

  }
  else if (props.helpMenu.HelpValue[0].selectedElement !== "") {
    current = props.helpMenu.HelpValue[0].selectedElement
    console.log("3", current)

  }
  else {
    current = props.helpMenu.HelpValue[0].RibbonMenu
    console.log("4", current)

  }


  const handleClose = () => {
    // console.log('handleClose is called');
    // alert(props.allActiveItem.worksheet);
    if (
      props.content.testOptions === 'Smoothers2D' ||
      props.content.testOptions === 'Smoothers3D'
    ) {
      closeWindow();
      let dataSelect = dataSelectInfo.filter(
        (a) => a.value !== '' && a.value !== undefined && a.value !== null
      );

      let data = {
        DATAFORMAT: props.content.DATAFORMAT,
        DATASELECTION: props.content.DATASELECTION,
        dataformatInfo: dataSelect,
        testOptionsName: props.content.testOptions,
        graphData: graphDataVal,
        Output: Output,
      };
      openSmoothWizard(data);
    } else if (props.content.testOptions === 'Normalize Ternary Data') {
      let dataSelect = dataSelectInfo.filter(
        (a) => a.value !== '' && a.value !== undefined && a.value !== null
      );
      let data = {
        DATAFORMAT: props.content.DATAFORMAT,
        DATASELECTION: props.content.DATASELECTION,
        dataformatInfo: dataSelect,
        testOptionsName: props.content.testOptions,
        stepWiseValue: props.content.stepWiseValue,
      };

      console.log('Progressing bro, data contains', data);
      sendtoMainWindowSpreadSheet(data);
      closeWindow();
    } else if (props.content.type === 'sampleSize') {
      let dataSelect = dataSelectInfo.filter(
        (a) => a.value !== '' && a.value !== undefined && a.value !== null
      );
      let data = {
        DATAFORMAT: props.content.DATAFORMAT,
        DATASELECTION: props.content.DATASELECTION,
        dataformatInfo: dataSelect,
        testOptionsName: props.content.testOptions,
      };
      openSampleSize(data);
      closeWindow();
    } else if (props.content.type === 'power') {
      let dataSelect = dataSelectInfo.filter(
        (a) => a.value !== '' && a.value !== undefined && a.value !== null
      );
      let data = {
        DATAFORMAT: props.content.DATAFORMAT,
        DATASELECTION: props.content.DATASELECTION,
        dataformatInfo: dataSelect,
        testOptionsName: props.content.testOptions,
      };
      openPower(data);
      closeWindow();
    }
    else if (props.content.testOptions === 'Histogram') {
      
    
      let dataSelect = dataSelectInfo.filter(
        (a) => a.value !== '' && a.value !== undefined && a.value !== null
      );
      // debugger;

      let data = {
       
       
        dataformatInfo: dataSelect,
        testOptionsName: props.content.testOptions,
        normalization: props.content.normalization,
        graphStyle: props.content.graphStyle,
        binEdge: props.content.binEdge,
        binNumber: props.content.binNumber,
        automaticBinning: props.content.automaticBinning
        
        
      };
    
    
      mainwindowReportwinOpen(data);
  

      console.log('Progressing bro, data contains', data);
      sendtoMainWindowReport(data);
      
      closeWindow();

    }
    
    else {

       if(props.content.testOptions === "One Sample t-test" || props.content.testOptions === "One-Sample Signed Rank Test"){
        if(props.content.meanValue == -111111 &&  props.content.stepType === 'MEDIAN'){
          alert("Entry on Population Value panel must be numeric value.")
        }else{
          let dataSelect = dataSelectInfo.filter(
            (a) => a.value !== '' && a.value !== undefined && a.value !== null
          );
          let dataSelectStepwise = dataSelectInfoStepWise.filter(
            (a) => a.value !== '' && a.value !== undefined && a.value !== null
          );
          
          let data = {
            DATAFORMAT: props.content.DATAFORMAT,
            DATASELECTION: props.content.DATASELECTION,
            dataformatInfo: dataSelect,
            testOptionsName: props.content.testOptions,
            meanValue: props.content.meanValue,
            sdDeviationX: props.content.sd_x,
            sdDeviationY: props.content.sd_y,
              dataformatInfoNext: dataSelectStepwise,
              statusSelectionInfo:statusSelectInfo
            // workSheetId: props.allActiveItem.worksheet
          };
          console.log(data.statusSelectionInfo);
          mainwindowReportwinOpen(data);
          console.log('Progressing bro, data contains', data);
          sendtoMainWindowReport(data);
          closeWindow();
        }
       }else{
        let dataSelect = dataSelectInfo.filter(
          (a) => a.value !== '' && a.value !== undefined && a.value !== null
        );
        let dataSelectStepwise = dataSelectInfoStepWise.filter(
          (a) => a.value !== '' && a.value !== undefined && a.value !== null
        );
        
        let data = {
          DATAFORMAT: props.content.DATAFORMAT,
          DATASELECTION: props.content.DATASELECTION,
          dataformatInfo: dataSelect,
          testOptionsName: props.content.testOptions,
          meanValue: props.content.meanValue,
          sdDeviationX: props.content.sd_x,
          sdDeviationY: props.content.sd_y,
            dataformatInfoNext: dataSelectStepwise,
            statusSelectionInfo:statusSelectInfo
          // workSheetId: props.allActiveItem.worksheet
        };
        mainwindowReportwinOpen(data);
        console.log('Progressing bro, data contains', data);
        sendtoMainWindowReport(data);
        closeWindow();
       }
   
    }
 
    props.resultGraphAction.isTestOptionDisabled({ message: false })
    let data ={
      testOptionDisabled: props.isTestOptionDisabled
    }
    sendtoAnalysisMenu(data)
  };

  const handleBack = () => {
    props.onHandleItemClick('back');
    if(props.content.testOptions !== 'Proportional Hazards' ){
      if(props.content.testOptions !== 'Stratified Model' ){
        if(props.content.testOptions !== 'LogRank'){
    props.actions.dataSelectionObject.exportDataSelectionColumnData({
      message: '',
    });
    props.actions.dataSelectionObject.exportStatusLabelValues({
      message: [],
    })
    props.actions.dataSelectionObject.exportDataSelectionStepWiseDataTable({
      message: '',
    });
  }
  }
  }
  };

  const handleNext = () => {
    props.onHandleItemClick('next');
  };

  const [isBack, setBack] = useState(false);
  const [isNext, setNext] = useState(false);
  const [isFinish, setFinish] = useState(false);

  useEffect(() => {
    
    if(props.content.testOptions === 'Descriptive Statistics' && props.dataColumns !== null){
      setBack(true);
      setNext(true);
      setFinish(false);
    }
    if(props.content.testOptions === 'Descriptive Statistics' && props.dataColumns === null){
      setBack(true);
      setNext(true);
      setFinish(true);
    }

    if(props.content.testOptions === 'One Way Frequency Tables' && props.dataColumns !== null){
      setBack(true);
      setNext(true);
      setFinish(false);
    }
    if(props.content.testOptions === 'One Way Frequency Tables' && props.dataColumns === null){
      setBack(true);
      setNext(true);
      setFinish(true);
    }

    if(props.content.testOptions === 'Two Way ANOVA'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }
    
    if(props.content.testOptions === 'Three Way ANOVA'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[3] !== undefined && props.dataColumns[3].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }
    if(props.content.testOptions === 'One Way ANCOVA'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }
    if(props.content.testOptions === 'Two Way Repeated Measures ANOVA'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[3] !== undefined && props.dataColumns[3].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }

    if(props.content.testOptions === 'z-test'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }

    if(props.content.testOptions === 'Linear'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }
    if(props.content.testOptions === 'Multiple Logistic'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }
  

    if(props.content.testOptions === 'Multiple Linear'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }
    if(props.content.testOptions === 'Polynomial'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }

    if(props.content.testOptions === 'Best Subset'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }
    if(props.content.testOptions === 'Pearson Product Moment'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }

    if(props.content.testOptions === 'Spearman Rank Order'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }
    if(props.content.testOptions === 'Normality'){
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[0] !== undefined && props.dataColumns[0].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(false);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
    }

    //for only data format and data selection
    if (
      props.content.testOptions === 'One Sample t-test' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'One Sample t-test' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 50){
          if(props.dataColumns[0] !== undefined && props.dataColumns[0].value !== "" && props.dataColumns[0].title == "Data"){
            setBack(false);
            setNext(false);
            setFinish(true);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 52){
          if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[0].title == "Mean"){
            setBack(false);
            setNext(false);
            setFinish(true);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{
          if( props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Standard Error" ){
            setBack(false);
            setNext(false);
            setFinish(true);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }
      }
    }
    if (
      props.content.testOptions === 'One Sample t-test' &&
      props.content.stepType === 'MEDIAN'
    ) {
      setBack(false);
      setNext(true);
      setFinish(false);
    }

    

    if (
      props.content.testOptions === 'One-Sample Signed Rank Test' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[3] !== undefined && props.dataColumns[3].value !== ""){
          setBack(true);
          setNext(true);
          setFinish(true);
        }else{
          setBack(true);
          setNext(false);
          setFinish(false);
        }
        
      }
    }
    if (
      props.content.testOptions === 'One-Sample Signed Rank Test' &&
      props.content.stepType === 'MEDIAN'
    ) {
      setBack(false);
      setNext(true);
      setFinish(false);
    }




    if (
      props.content.testOptions === 't test' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 't test' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 66){
          //raw
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data1"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 51){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
          //indexed
        }else if(props.stepId == 52){
          if( props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Standard Dev." ){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
          //standardd devivaiton
        }else{
          if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Standard Error"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
  
        }

      }
    }








    if (
      props.content.testOptions === 'Rank Sum Test' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'Rank Sum Test' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      setBack(false);
      setNext(true);
      setFinish(false);

      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 67){
          //raw
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data1"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 51){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }
    }




    if (
      props.content.testOptions === 'One Way ANOVA' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'One Way ANOVA' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 68){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data1"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 51){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
          //indexed
        }else if(props.stepId == 52){
          if( props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Standard Dev." ){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
          //standardd devivaiton
        }else{
          if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Standard Error"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
  
        }
        
      }




    }





    if (
      props.content.testOptions === 'ANOVA On Ranks' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'ANOVA On Ranks' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 68){
          //raw
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data1"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 69){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }

    }

    if (
      props.content.testOptions === 'Paired T-test' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
	  
    }
    if (
      props.content.testOptions === 'Paired T-test' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 112){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data1"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 70){
          if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Data"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }
    }

    if (
      props.content.testOptions === 'Signed Rank Test' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'Signed Rank Test' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        console.log("props.stepId ",props.stepId )
        if(props.stepId == 103){
          //raw
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data1"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 104){
          if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Data"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }
    }
    if (
      props.content.testOptions === 'One Way Repeated Measures ANOVA' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
	  
    }
    if (
      props.content.testOptions === 'One Way Repeated Measures ANOVA' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 68){
          //raw
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Data1"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 71){
          if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Data"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }
    }

    if (
      props.content.testOptions === 'Repeated Measures ANOVA On Ranks' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'Repeated Measures ANOVA On Ranks' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 68){
          //raw
          if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Data2"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 71){
          if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Data"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }
    }

    if (
      props.content.testOptions === 'Chi-square' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'Chi-square' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 63){
          //raw
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Category 2"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 72){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Observations1"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }
    }
    if (props.content.testOptions === 'Chi-square...') {
      setBack(true);
      setNext(true);
      setFinish(false);
    }

    if (
      props.content.testOptions === 'Fisher Exact Test' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'Fisher Exact Test' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 113){
          //raw
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Category-2:"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 114){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Observation-2:"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }
    }
    if (
      props.content.testOptions === "McNemar's Test" &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
	  
    }
    if (
      props.content.testOptions === "McNemar's Test" &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 63){
          //raw
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Category 2"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 72){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Observations1"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }
    }
    if (
      props.content.testOptions === 'Relative Risk' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'Relative Risk' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 64){
          //raw
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Group"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 65){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "No Event"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }
    }
    if (
      props.content.testOptions === 'Odds Ratio' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'Odds Ratio' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.stepId == 86){
          //raw
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Group"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else if(props.stepId == 87){
          if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "No Event"){
            setBack(false);
            setNext(true);
            setFinish(false);
          }else{
            setBack(false);
            setNext(true);
            setFinish(true);
          }
        }else{

        }
      }
    }


    if (
      props.content.testOptions === 'Forward' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Independent (x) :1"){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }

    }
    if (
      props.content.testOptions === 'Forward' &&
      props.content.stepType === 'DATASELECTIONSTEPWISE'
    ) {
      // alert("inside if");
      if(props.dataColumnsStepwise === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumnsStepwise[1] !== undefined && props.dataColumnsStepwise[1].value !== "" && props.dataColumnsStepwise[1].title == "Var:1"){
        setBack(false);
        setNext(true);
        setFinish(false);
      }else{
        setBack(false);
        setNext(true);
        setFinish(true);
      }
    }
      // setBack(false);
      // setNext(true);
      // setFinish(false);
    }
    if (
      props.content.testOptions === 'Backward' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Independent (x) :1"){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    }
    if (
      props.content.testOptions === 'Backward' &&
      props.content.stepType === 'DATASELECTIONSTEPWISE'
    ) {
      // alert("inside if");
      if(props.dataColumnsStepwise === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumnsStepwise[1] !== undefined && props.dataColumnsStepwise[1].value !== "" && props.dataColumnsStepwise[1].title == "Var:1"){
        setBack(false);
        setNext(true);
        setFinish(false);
      }else{
        setBack(false);
        setNext(true);
        setFinish(true);
      }
    }
    }

    if (
      props.content.testOptions === 'Principal Components' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Variable1"){
        setBack(true);
        setNext(false);
        setFinish(false);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
      // setBack(true);
      // setNext(false);
      // setFinish(true);
    }
    if (
      props.content.testOptions === 'Principal Components' &&
      props.content.stepType === 'DATASELECTIONSTEPWISE'
    ) {
      if(props.dataColumnsStepwise === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumnsStepwise[0] !== undefined && props.dataColumnsStepwise[0].value !== "" && props.dataColumnsStepwise[0].title == "Label"){
        setBack(false);
        setNext(true);
        setFinish(false);
      }else{
        setBack(false);
        setNext(true);
        setFinish(true);
      }
    }
    }
 
    if (
      props.content.testOptions === 'Single Group' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Status"){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }


    }
    if (
      props.content.testOptions === 'Single Group' &&
      props.content.stepType === 'STATUSLABEL'
    ) {
      if(props.statusLabel.length > 0){
        setBack(false);
      setNext(true);
      setFinish(false);
      }else{
      setBack(false);
      setNext(true);
      setFinish(true);
    }
    }
    if (
      props.content.testOptions === 'Proportional Hazards' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      // setBack(true);
      // setNext(false);
      // setFinish(true);
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title =="Covariate1"){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    }
    if (
      props.content.testOptions === 'Proportional Hazards' &&
      props.content.stepType === 'DATASELECTIONSTEPWISE'
    ) {
      if(props.dataColumnsStepwise === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumnsStepwise[0] !== undefined && props.dataColumnsStepwise[0].value !== "" && props.dataColumnsStepwise[0].title == "Covariate"){
        setBack(false);
        setNext(false);
        setFinish(true);
      }else{
        setBack(false);
        setNext(true);
        setFinish(true);
      }
    }
    }
    if (
      props.content.testOptions === 'Proportional Hazards' &&
      props.content.stepType === 'STATUSLABEL'
    ) {
      // setBack(false);
      // setNext(true);
      // setFinish(false);
      if(props.statusLabel.length > 0){
        setBack(false);
      setNext(true);
      setFinish(false);
      }else{
      setBack(false);
      setNext(true);
      setFinish(true);
    }
    }

    if (
      props.content.testOptions === 'Stratified Model' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      // setBack(true);
      // setNext(false);
      // setFinish(true);
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumns[3] !== undefined && props.dataColumns[3].value !== "" && props.dataColumns[3].title =="Covariate1"){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    }
    if (
      props.content.testOptions === 'Stratified Model' &&
      props.content.stepType === 'DATASELECTIONSTEPWISE'
    ) {
      // setBack(false);
      // setNext(false);
      // setFinish(true);
      if(props.dataColumnsStepwise === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumnsStepwise[0] !== undefined && props.dataColumnsStepwise[0].value !== "" && props.dataColumnsStepwise[0].title == "Covariate"){
        setBack(false);
        setNext(false);
        setFinish(true);
      }else{
        setBack(false);
        setNext(true);
        setFinish(true);
      }
    }
    }
    if (
      props.content.testOptions === 'Stratified Model' &&
      props.content.stepType === 'STATUSLABEL'
    ) {
      if(props.statusLabel.length > 0){
        setBack(false);
      setNext(true);
      setFinish(false);
      }else{
      setBack(false);
      setNext(true);
      setFinish(true);
    }
    }


    if (
      props.content.testOptions === 'LogRank' &&
      props.stepId != 93 &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'LogRank' &&
      props.stepId != 93 &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(false);
        setNext(false);
        setFinish(true);
      }else{
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Status 1"){
          setBack(false);
          setNext(false);
          setFinish(true);
        }else{
          setBack(false);
          setNext(true);
          setFinish(true);
        }
      }
    }
    if (
      props.content.testOptions === 'LogRank' &&
      props.stepId != 93 &&
      props.content.stepType === 'STATUSLABEL'
    ) {
      if(props.statusLabel.length > 0){
        setBack(false);
      setNext(true);
      setFinish(false);
      }else{
      setBack(false);
      setNext(true);
      setFinish(true);
    }
    }

    if (
      props.content.testOptions === 'LogRank' &&
      props.stepId == 93 &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'LogRank' &&
      props.stepId == 93 &&
      props.content.stepType === 'DATASELECTION'
    ) {
      // setBack(false);
      // setNext(false);
      // setFinish(true);
      if(props.dataColumns === null){
        setBack(false);
        setNext(false);
        setFinish(true);
      }else{
        if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Status"){
          setBack(false);
          setNext(false);
          setFinish(true);
        }else{
          setBack(false);
          setNext(true);
          setFinish(true);
        }
      }
    }
    if (
      props.content.testOptions === 'LogRank' &&
      props.stepId == 93 &&
      props.content.stepType === 'DATASELECTIONSTEPWISE'
    ) {
      // setBack(false);
      // setNext(false);
      // setFinish(true);
      if(props.dataColumnsStepwise === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumnsStepwise[0] !== undefined && props.dataColumnsStepwise[0].value !== "" && props.dataColumnsStepwise[0].title == "Group1"){
        setBack(false);
        setNext(false);
        setFinish(true);
      }else{
        setBack(false);
        setNext(true);
        setFinish(true);
      }
    }
    }
    if (
      props.content.testOptions === 'LogRank' &&
      props.stepId == 93 &&
      props.content.stepType === 'STATUSLABEL'
    ) {
      if(props.statusLabel.length > 0){
        setBack(false);
      setNext(true);
      setFinish(false);
      }else{
      setBack(false);
      setNext(true);
      setFinish(true);
    }
    }

    if (
      props.content.testOptions === 'Gehan-Breslow' &&
      props.stepId != 95 &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      // setBack(true);
      // setNext(false);
      // setFinish(true);
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'Gehan-Breslow' &&
      props.stepId != 95 &&
      props.content.stepType === 'DATASELECTION'
    ) {
      // setBack(false);
      // setNext(false);
      // setFinish(true);
      if(props.dataColumns === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Status 1"){
          setBack(false);
          setNext(false);
          setFinish(true);
        }else{
          setBack(false);
          setNext(true);
          setFinish(true);
        }
      }
    }
    if (
      props.content.testOptions === 'Gehan-Breslow' &&
      props.stepId != 95 &&
      props.content.stepType === 'STATUSLABEL'
    ) {
      // setBack(false);
      // setNext(true);
      // setFinish(false);
      if(props.statusLabel.length > 0){
        setBack(false);
      setNext(true);
      setFinish(false);
      }else{
      setBack(false);
      setNext(true);
      setFinish(true);
    }
    }

    if (
      props.content.testOptions === 'Gehan-Breslow' &&
      props.stepId == 95 &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      // setBack(true);
      // setNext(false);
      // setFinish(true);
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'Gehan-Breslow' &&
      props.stepId == 95 &&
      props.content.stepType === 'DATASELECTION'
    ) {
      // setBack(false);
      // setNext(false);
      // setFinish(true);
      if(props.dataColumns === null){
        setBack(false);
        setNext(false);
        setFinish(true);
      }else{
        if(props.dataColumns[2] !== undefined && props.dataColumns[2].value !== "" && props.dataColumns[2].title == "Status"){
          setBack(false);
          setNext(false);
          setFinish(true);
        }else{
          setBack(false);
          setNext(true);
          setFinish(true);
        }
      }
    }
    if (
      props.content.testOptions === 'Gehan-Breslow' &&
      props.stepId == 95 &&
      props.content.stepType === 'DATASELECTIONSTEPWISE'
    ) {
      // setBack(false);
      // setNext(false);
      // setFinish(true);
      if(props.dataColumnsStepwise === null){
        setBack(false);
        setNext(true);
        setFinish(true);
      }else{
      if(props.dataColumnsStepwise[0] !== undefined && props.dataColumnsStepwise[0].value !== "" && props.dataColumnsStepwise[0].title == "Group1"){
        setBack(false);
        setNext(false);
        setFinish(true);
      }else{
        setBack(false);
        setNext(true);
        setFinish(true);
      }
    }
    }
    if (
      props.content.testOptions === 'Gehan-Breslow' &&
      props.stepId == 95 &&
      props.content.stepType === 'STATUSLABEL'
    ) {
      // setBack(false);
      // setNext(true);
      // setFinish(false);
      if(props.statusLabel.length > 0){
        setBack(false);
      setNext(true);
      setFinish(false);
      }else{
      setBack(false);
      setNext(true);
      setFinish(true);
    }
    }

    if (
      props.content.testOptions === 'Deming' &&
      props.content.stepType === 'DATAFORMAT'
    ) {
      if(props.stepId !== undefined){
        setBack(true);
        setNext(false);
        setFinish(true);
      }else{
        setBack(true);
        setNext(true);
        setFinish(true);
      }
    }
    if (
      props.content.testOptions === 'Deming' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      	
		if(props.dataColumns === null){
      setBack(false);
      setNext(true);
      setFinish(true);
    }else{
      if(props.stepId == 83){
        //raw
        if(props.dataColumns[1] !== undefined && props.dataColumns[1].value !== "" && props.dataColumns[1].title == "Y :"){
          setBack(false);
          setNext(true);
          setFinish(false);
        }else{
          setBack(false);
          setNext(true);
          setFinish(true);
        }
      }else if(props.stepId == 84){
        if(props.dataColumns[3] !== undefined && props.dataColumns[3].value !== "" && props.dataColumns[3].title == "Y Error :"){
          setBack(false);
          setNext(true);
          setFinish(false);
        }else{
          setBack(false);
          setNext(true);
          setFinish(true);
        }
      }else{

      }
    }

      // setBack(false);
      // setNext(true);
      // setFinish(false);
    }
    if (
      props.content.testOptions === 'Normalize Ternary Data' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      if(props.dataColumns === null){
        setBack(true);
        setNext(true);
        setFinish(true);
      }else{
        if(props.dataColumns[5] !== undefined && props.dataColumns[5].value !== ""){
          setBack(true);
          setNext(false);
          setFinish(true);
        }else{
          setBack(true);
          setNext(true);
          setFinish(true);
        }
        
      }
     
    }
    if (
      props.content.testOptions === 'Normalize Ternary Data' &&
      props.content.stepType === 'SCALETYPE'
    ) {
      setBack(false);
      setNext(true);
      setFinish(false);
    }
    if (
      props.content.testOptions === 'Histogram' &&
      props.content.stepType === 'DATASELECTION'
    ) {
      setBack(true);
      setNext(false);
      setFinish(false);
    }
    if (
      props.content.testOptions === 'Histogram' &&
      props.content.stepType === 'BINOPTIONS'
    ) {
      setBack(false);
      setNext(false);
      setFinish(false);
    }
    if (
      props.content.testOptions === 'Histogram' &&
      props.content.stepType === 'SELECTGRAPHSTYLE'
    ) {
      setBack(false);
      setNext(true);
      setFinish(false);
    }
    if (
      (props.content.testOptions === 'Smoothers2D' ||
        props.content.testOptions === 'Smoothers3D') &&
      props.content.stepType === 'DATASELECTION'
    ) {
      setBack(true);
      setNext(false);
      setFinish(false);
    }
    if (
      (props.content.testOptions === 'Smoothers2D' ||
        props.content.testOptions === 'Smoothers3D') &&
      props.content.stepType === 'OUTPUTOPTIONS'
    ) {
      setBack(false);
      setNext(false);
      setFinish(false);
    }
    if (
      (props.content.testOptions === 'Smoothers2D' ||
        props.content.testOptions === 'Smoothers3D') &&
      props.content.stepType === 'GRAPHDATA'
    ) {
      setBack(false);
      setNext(true);
      setFinish(false);
    }
  });

  return (
    <div className="graphWizard-navigation">
      <div
        className="navigation-leftSide"
        style={{
          width: props.content.stepType === 'STATUSLABEL' ? '35%' : '40%',
        }}
      >
        <DefaultButton
          className={'black'}
          text="Back"
          onClick={handleBack}
          allowDisabledFocus
          disabled={isBack}
        />
        <DefaultButton
          className={'black'}
          text="Next"
          onClick={handleNext}
          allowDisabledFocus
          disabled={isNext}
        />
      </div>
      <div
        className="navigation-RightSide"
        style={{
          width: props.content.stepType === 'STATUSLABEL' ? '64%' : '58%',
        }}
      >
        {/* {props.content.stepType === 'STATUSLABEL' && (
          <DefaultButton
            className="alignColor"
            text="Test Options"
            style={{ marginLeft: '2px' }}
          />
        )} */}
        <div
          // style={{ marginLeft: '128px' }}
          className={
            props.content.stepType === 'STATUSLABEL' ? 'black' : 'alignColor'
          }
        >
          <Helpbutton
            nodeId={current}
            className={
              props.content.stepType === 'STATUSLABEL' ? 'black' : 'alignColor'
            }
            disabled={isNext}
          />
        </div>
        <DefaultButton
          className={'black'}
          onClick={handleClose}
          allowDisabledFocus
          text="Finish"
          disabled={isFinish}
        />
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    isTestOptionDisabled: state.resultGraphReducer.testOptionDisable,
    allActiveItem: state.notebookReducer.allActiveItem,
    helpMenu: state.helpMenuReducer,
    dataColumns:state.instanceReducer.dataSelectionColumns,
    dataColumnsStepwise:state.instanceReducer.dataSelectionStepWiseTable,
    statusLabel:state.instanceReducer.statuslabelvalue
  };
}
function mapDispatchToProps(dispatch) {
  return {
    
    resultGraphAction: bindActionCreators(resultGraphAction, dispatch),
    actions: {
    dataSelectionObject: bindActionCreators(componentInstance, dispatch),

    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardNavigation);


