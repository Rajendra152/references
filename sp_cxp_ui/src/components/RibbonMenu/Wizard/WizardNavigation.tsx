import React, { useEffect, useState } from 'react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { GRAPHTYPE, GRAPHSTYLE, DATAFORMAT, CALCULATIONS, DATASELECTION } from './GraphFlowTypes'
import { WizardContentProps } from './GraphWizard';
import { closeWindow, sendtoMainWindow, sendToMainGraphWindow } from './DataTransfer/DataTransfer';
import * as allTypeList from './GraphList/DataFormatList';
import { dataSelectInfo } from './DataSelection';
import { errorCalculationInfo } from './ErrorCalculations';
import { angleCalculationInfo } from './AngleCalculations';
import Helpbutton from '../../../HelpView';
import { connect } from 'react-redux';
import { oneMaxValue, twoMaxValue, threeMaxValue, statsByOne, statsByTwo, statsByThree, statsByFour, statsByInput, fourMaxValue } from "./WizardServices";
const getTypeList = (param: string) =>{
  let dataformat = allTypeList.typeList.filter((a)=>a.id==param)
  // console.log(dataformat);
  if (dataformat.length > 0) {
    return dataformat;
  }
  return [];
}


const { ipcRenderer } = require('electron');
var current
export interface NavigationProps{
    content: WizardContentProps,
    onHandleItemClick? : (item:string)=>void
    tableList: STDataFormat.STDataRow[]
}

const WizardNavigation = (props: NavigationProps) => {
  // console.log("help", props.helpMenu)

  const handleBack = () => {
    props.onHandleItemClick('back')
    // const backValue = getStep(props.content.stepType,props.content.value)
    // props.onHandleItemClick('back',backValue?.['prev-step'])
  }

  const handleNext = () => {
    props.onHandleItemClick('next')
    // const nextValue = getStep(props.content.stepType,props.content.value)
    // props.onHandleItemClick('next',nextValue?.['next-step'])
  }

  const handleFinish = () => {
    // console.log('handle finish is called');
      props.onHandleItemClick && props.onHandleItemClick('finish');
      handleClose();
  }

  const [isBack,setBack] = useState(false);
  const [isNext,setNext] = useState(false);
  const [getDataformat, setDataformat] = useState(0);
  const [isFinish, setIsFinish] = useState(true); //disabled
  const [dataSelection, setDataSelection] = useState([]);

  const isDataSelection = (param) => {
    if (param === GRAPHTYPE || param === GRAPHSTYLE || param === CALCULATIONS || param === DATAFORMAT) {
      return true;
    }
  }
    
  const getDataSelectionInfo = () =>{
    const dataSelectionLength = dataSelection.filter((item) => {
      if (item.value == "") return false;
      return true;
    }).length
    if (isDataSelection(props.content.stepType)) {
      setDataformat(0);
      setDataSelection([]);
      setIsFinish(true)
    } else if(props.tableList) {
      let tableListCount = props.tableList.length;
      let STType = props.content.statisticalType;
      for (var i = 0; i < tableListCount; i++) {
        let isOutputValue = props.tableList[i].title === 'Output' && props.tableList[i].value;
        if(tableListCount >= 1 && statsByOne.includes(STType) && isOutputValue) {
          setIsFinish(false)
        }
        if(tableListCount > 2 && statsByInput.includes(STType)) {
          setIsFinish(false)
        }
        if(tableListCount >= 2 && statsByTwo.includes(STType) && isOutputValue) {
          setIsFinish(false)
        }
        if(tableListCount >= 3 && statsByThree.includes(STType) && isOutputValue) {
          setIsFinish(false)
        }
        if (tableListCount >= 4 && statsByFour.includes(STType) && isOutputValue) {
          setIsFinish(false)
        }
      }
    } else if (((dataSelectionLength == getDataformat) || (dataSelectionLength > getDataformat)) && getDataformat !== 0) {
      setIsFinish(false)
    } else {
      setIsFinish(true)
    }
  }

  useEffect(()=>{
    if(props.content.disableBack) {
        setBack(true);
        return;
    }
    if(props.content.stepType === GRAPHTYPE){
        setBack(true)
    }else{ 
      setBack(false)
    }
    if(props.content.stepType === CALCULATIONS){
      setNext(false)
    }

    getDataSelectionInfo();
    if (ipcRenderer.rawListeners('dataSelectionChild').length === 0) {
      ipcRenderer.on('dataSelectionChild', function (event, arg) {
        console.log(arg)
        setDataSelection(arg);
        getDataSelectionInfo();
      });
    }

    return () => {
      if(ipcRenderer != undefined ){
        ipcRenderer.removeAllListeners('dataSelectionChild')
      }
    }
  })

  if (props.helpMenu.HelpValue[0].selectedItem !== "") {
    current = props.helpMenu.HelpValue[0].selectedItem
    // console.log("x", current)
  }
  else if (props.helpMenu.HelpValue[0].selectedElement !== "") {
    current = props.helpMenu.HelpValue[0].selectedElement
    // console.log("3", current)
  }
  else {
    current = props.helpMenu.HelpValue[0].RibbonMenu
    // console.log("4", current)
  }

  const handleClose = () => {
    let dataSelect = dataSelectInfo.filter(a => (a.value !== '' && a.value !== undefined && a.value !== null))
    let data = {
      GRAPHTYPE: props.content.GRAPHTYPE,
      GRAPHSTYLE: props.content.GRAPHSTYLE,
      DATAFORMAT: props.content.DATAFORMAT,
      CALCULATIONS: props.content.CALCULATIONS,
      DATASELECTION: props.content.DATASELECTION,
      errorCalculation: errorCalculationInfo,
      angleCalculation: angleCalculationInfo,
      dataformatInfo: dataSelect
    };
    sendToMainGraphWindow(data);
    // ipcRenderer.send('wizToMainWindow', data);
    closeWindow();
  }
  let table = document.getElementsByClassName('data-selection')


  useEffect(() => {
    if (props.isNext || props.content.stepType === CALCULATIONS) {
      setNext(false)
    }
    else {
      setNext(true)
    }
    // if(props.content.disableNext ) {
    //     setNext(true);
    //     return;
    // }
    // if( props.content.stepType === DATASELECTION){
    //     setNext(true)
    // }
    // else{
    //     setNext(false)
    // }
    // getDataSelectionInfo();
    let getDataFormat = getTypeList(props.content.DATAFORMAT);
    if (getDataFormat.length > 0) {
      getDataFormat = getDataFormat[0];
      let dataKey = getDataFormat.value;
      if (oneMaxValue.includes(dataKey)) {
        setDataformat(1)
      }
      if (twoMaxValue.includes(dataKey)) {
        setDataformat(2)
      }
        // if(props.content.disableNext ) {
        //     setNext(true);
        //     return;
        // }
        // if( props.content.stepType === DATASELECTION){
        //     setNext(true)
        // }
        // else{
        //     setNext(false)
        // }
      
      if(threeMaxValue.includes(dataKey)){
          setDataformat(3)
      }
      if(fourMaxValue.includes(dataKey)){
        setDataformat(4)
      }
    } else {
      getDataFormat = {};
      setDataformat(0);
    }       
    })
    
// console.log(isNext)
    return (
        <div className = "graphWizard-navigation">
          <div className="navigation-leftSide">
            <DefaultButton className={'black'} text="Back" onClick={handleBack} allowDisabledFocus 
            disabled={isBack}
            />
            <DefaultButton className={'black'} text="Next" onClick={handleNext} allowDisabledFocus 
            disabled={isNext}
            />
          </div>
          <div className="navigation-RightSide">
            {/* <DefaultButton className={'black'} text="Help"allowDisabledFocus disabled={isNext}/> */}
            <Helpbutton nodeId={current}/>
            {/* <DefaultButton className={'black'} text="Finish" allowDisabledFocus onClick={handleFinish} disabled={!isNext}/> */}
            <DefaultButton className={'black'} text="Finish" allowDisabledFocus onClick={handleFinish} disabled={isFinish}
            />
          </div>
        </div>
    )
}
function mapStateToProps(state) {
  return {
    isNext: state.createDiagramPageReducer.isNext
  };
}
export default connect(mapStateToProps)(WizardNavigation);
