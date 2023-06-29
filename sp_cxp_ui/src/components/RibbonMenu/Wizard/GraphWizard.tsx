import React, { useRef, useEffect } from 'react'
import { WizardPreview } from './WizardPreview'
import { WizardContent } from './WizardContent'
import { GRAPHTYPE, GRAPHSTYLE, DATAFORMAT, CALCULATIONS, DATASELECTION } from './GraphFlowTypes'
import { useState } from 'react'

import { getStep } from './WizardServices';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/Helpmenu/actions';
import { bindActionCreators } from 'redux'
import { setIsNextValue } from '../../../store/CreateGraph/CreateDiagramPage/actions'
import WizardNavigation from './WizardNavigation'
import WizardTitleBar from './TestOptions/WizardTitleBar'
import * as ConstantImage from '../../Constant/ConstantImage'
const { ipcRenderer } = require('electron');

import * as STDataFormat from "../../Analysis/StatisticalTransformation/StatisticalDataFormat";


export interface WizardContentProps {
  tableList: STDataFormat.STDataRow[]  
  statisticalType: any 
  stepType: string
  value?: string
  GRAPHTYPE?: string
  GRAPHSTYLE?: string
  DATAFORMAT?: string
  CALCULATIONS?: string
  DATASELECTION?: string
  disableNext?: boolean
  disableBack?: boolean
  onHandleItemClick?: (item: string) => void
  setInitialContent?: (item: string) => void
  onHandleErrorClick?: (item: Object) => void
  errorCalculation?: Object
  sheetData?: Object[],
  activeId: string,
  onHandleRemoveId?: (item: string) => void
  graphTypeForAddPlot?: string
}

const GraphWizard = (props) => {

  // const [previewSource,setPreviewSource] = useState('Align')
  // const [previewTitle,setPreviewTitle] = useState('Preview Title')
  // const [previewContent,setPreviewContent] = useState('Scatter Plot')

  const [previewSource, setPreviewSource] = useState(ConstantImage.SimplePlot)
  const [previewTitle, setPreviewTitle] = useState('Select the type of graph you want to create.')
  const [previewContent, setPreviewContent] = useState('Plot data as XY points using symbols')
  const isNextClicked = useRef(false);
  let helpEvent = props;
  let current = ''

  window.addEventListener('keydown', function (event) {
   

    if (event.code == 'F1' || event.key == 'F1') {
      console.log("entered f1", document)
      if (helpEvent.helpMenu.HelpValue[0].selectedItem !== "") {
        current = helpEvent.helpMenu.HelpValue[0].selectedItem
      }
      else if (helpEvent.helpMenu.HelpValue[0].selectedElement !== "") {
        current = helpEvent.helpMenu.HelpValue[0].selectedElement
      }
      else {
        current = helpEvent.helpMenu.HelpValue[0].RibbonMenu
      }
      let Data = {
        message: 'Help',
        someData: "Let's go",
        path: `helpMenu/${current}`
      };
      ipcRenderer.send('request-mainprocess-action', Data);
    }
  }, true);

  const initContent: WizardContentProps = {
    stepType: GRAPHTYPE,
    value: 'scatter',
    onHandleItemClick: (item) => {
      onListItemClick(item)
    },
    setInitialContent: (item) => {
      setInitialListItem(item)
    },
    onHandleErrorClick: (item) => {
      setErrorCals(item)
    },
    errorCalculation: {},
    sheetData: [],
    activeId: '1',
    onHandleRemoveId: (item) =>{
      setRmActiveId(item)
    }
  }
  const [errorCalculation, setErrorCalculation] = useState({});
  const [activeId, setActiveId] = useState('1');
  const [sheetData, setSheetData] = useState([]);
  const [content, setContent] = useState(initContent)

  const [listItem, setListItem] = useState({
    id: '1',
    title: "Scatter Plot",
    previewImage: ConstantImage.SimplePlot,
    previewImageText: "Plot data as XY points using symbols.",
    previewImageTitle: "Select the type of graph you want to create",
    activeId: '1'
  });

  const setErrorCals = (item) => {
    setErrorCalculation(item)
  }

  const setRmActiveId = (item) => {
    setActiveId('')
  }

  const help = (a:string,b:string,c:string)=>{
    props.OpenHelpWindow(a,b,c)
  }

  


  useEffect(() => {
    console.log("helo", previewTitle)

    ipcRenderer.on('action-update', (event, arg) => {
      console.log(arg.selectedGraphType, "inside graph wizard here --->")

      if (arg.stepType) {
        console.log("action IF")
        setContent({
          ...content,
          sheetData: arg.sheetData,
          stepType: arg.stepType,
          GRAPHTYPE: arg.graphType,
          GRAPHSTYLE: arg.graphStyle,
          DATASELECTION: arg.dataselection,
          graphTypeForAddPlot: arg.selectedGraphType
        })
      } else {
        console.log("action else")
        setContent({
          ...content,
          sheetData: arg.sheetData
        })
      }

    });
  }, [])

  const onListItemClick = (item) => {
    console.log(item)
    setPreviewTitle(item.previewImageTitle)
    setPreviewSource(item.previewImage)
    setPreviewContent(item.previewImageText)
    item.activeId = item.id; 
    setListItem(item)
    props.setIsNextValue(true)
    // setContent({
    //     ...content,
    //      'value': item.id
    // })
  }

  const setInitialListItem = (item) => {
    setPreviewTitle(item.previewImageTitle)
    setPreviewContent(item.previewImageText)
    setPreviewSource(item.previewImage)
    setListItem(item)
    

  }
  const onHadleNavigation = (item: string) => {
    // setContent({
    //     ...content,
    //     stepType : item,
    // })
    if (item == 'back') {
      props.setIsNextValue(false)
      const backValue = getStep(content.stepType, listItem.id, content)
      // const backValue = getStep(content)
      isNextClicked.current = true;
      setContent({
        ...content,
        stepType: backValue?.['prev-step'],
        errorCalculation: errorCalculation,
        activeId: ''
      })
    }
    else if (item == 'next') {
      props.setIsNextValue(false)
      console.log(listItem.id, "listitemid")
      const nextValue = getStep(content.stepType, listItem.id, content)
      // const nextValue = getStep(content)
      isNextClicked.current = true;
      setContent({
        ...content,
        [content.stepType]: listItem.id,
        stepType: nextValue?.['next-step'],
        errorCalculation: errorCalculation,
        activeId: ''
      })

    }


  }

  console.log(previewSource)

  return (
    <>
      <WizardTitleBar title={"Create Graph"} stepType={""} />
      <div className="graphWizard-mainContext">
        <div className="graphWizard-content">
          <WizardContent content={content} isNextClicked={isNextClicked} OpenHelpWindow={help}/>
          <WizardPreview title={previewTitle} src={previewSource} content={previewContent} OpenHelpWindow={help}/>
        </div>
        <WizardNavigation content={content} onHandleItemClick={onHadleNavigation}  helpMenu={props.helpMenu}/>
      </div>
    </>
  )
}

function mapStateToProps(state) {
  return {
    helpMenu: state.helpMenuReducer,
    isNext : state.createDiagramPageReducer.isNext
  };
}
const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
    setIsNextValue: bindActionCreators(setIsNextValue, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GraphWizard);
