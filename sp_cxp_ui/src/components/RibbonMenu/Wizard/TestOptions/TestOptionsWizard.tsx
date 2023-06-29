import React, { useRef, useEffect } from 'react'
import WizardTitleBar from './WizardTitleBar'
import WizardPreview from './WizardPreview'
import { WizardContent } from './WizardContent'
import { GRAPHTYPE, GRAPHSTYLE, DATAFORMAT, CALCULATIONS, DATASELECTION } from './GraphFlowTypes'
import { useState } from 'react'
import WizardNavigation from './WizardNavigation'
import { getStep } from './WizardServices'
import { accessTestOptions } from './TestOptionsPlaceholders'
const { ipcRenderer } = require('electron');
import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/Helpmenu/actions';


export interface WizardContentProps {
  stepType: string
  value?: string
  GRAPHTYPE?: string
  GRAPHSTYLE?: string
  DATAFORMAT?: string
  CALCULATIONS?: string
  DATASELECTION?: string
  testOptions?: string
  referenceSpreadsheet?: object
  onHandleItemClick?: (item: string) => void
  setInitialContent?: (item: string) => void
  onHandleStepTypeClick?: (item: string) => void
  sheetData?: Object[],
  meanValue: number,
  dataSelectionObject?: Object[],
  stepWiseValue?: string,
  stepId?: string,
  sd_x: string,
  sd_y: string,
  type?: string,
  openWorkSheetData?: Object[],
  normalization: string,
  binNumber: number,
  binEdge: string,
  automaticBinning: boolean,
  graphStyle: string,
  range ? : Object[]
}


const TestOptionsWizard = (props) => {

  const [previewSource, setPreviewSource] = useState('')
  const [previewTitle, setPreviewTitle] = useState()
  const [title, setTitle] = useState()
  const [previewContent, setPreviewContent] = useState('')
  const isNextClicked = useRef(false);
  const [stepType, setStepType] = useState('DATAFORMAT');
  const [wizardImageData, setwizardImageData] = useState('');
  const [ClickedItem, setClickedItem] = useState('XY Pair');
  const [stepId, setStepId] = useState();


  let helpEvent = props;
  let current = ''

  window.addEventListener('keydown', function (event) {
    console.log("key pressed f1")
    if (event.code == 'F1' || event.code == 'F1') {
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

  const help = (a: string, b: string, c: string) => {
    props.OpenHelpWindow(a, b, c)
  }

  useEffect(() => {
    ipcRenderer.on('action-update', function (event, Data) {
      let info = accessTestOptions(Data.testOptions);
      var titleInfo = Data.testOptions;
      setTitle(titleInfo)
      setPreviewTitle(titleInfo);
      onHandleStepType(info.wizardpreview);
      setwizardImageData(info.wizardImageData)
      setContent({
        ...content,
        openWorkSheetData: Data.openWorksheet,
        stepType: info.wizardpreview,
        testOptions: Data.testOptions,
        sheetData: Data.sheetData,
        meanValue: -111111,
        dataSelectionObject: [],
        stepWiseValue: "",
        sd_x: '',
        sd_y: '',
        type: Data.someData,
        normalization: "",
        binNumber: 0,
        binEdge: "",
        automaticBinning: false,
        graphStyle: "",
        range : Data?.range
      });

    });
    return () => {
      if (ipcRenderer != undefined) {
        ipcRenderer.removeAllListeners('action-update')
      }
    }
  }, [])

  const initContent: WizardContentProps = {
    stepType: stepType,
    value: 'scatter',
    onHandleItemClick: (item) => {
      //alert("test");
      //alert(JSON.stringify(item.title))
      setClickedItem(item.title)
      onListItemClick(item)
    },
    setInitialContent: (item) => {
      setInitialListItem(item)
    },
    onHandleStepTypeClick: (item) => {
      onHandleStepType(item)
    },
    sheetData: [],
    stepId: stepId,
    range : []
  }
  const [content, setContent] = useState(initContent)
  const [listItem, setListItem] = useState({
    id: '1',
    title: "Scatter Plot",
    //   previewImage: ConstantImage.CreateResultGraph,
    previewImageText: "Plot data as XY points using symbols.",
    previewImageTitle: "Select the type of graph you want to create"
  });

  const onHandleStepType = (item) => {
    setStepType(item);
  }

  const onListItemClick = (item) => {
    console.log(item)
    //setPreviewTitle(item.title)
    setPreviewContent(item.previewImageText)
    setListItem(item)
    // setContent({
    //     ...content,
    //      'value': item.id
    // })
    setStepId(item.id);
    setClickedItem(item.title)
  }

  const setInitialListItem = (item) => {
    // setPreviewTitle(item.title)
    setPreviewContent(item.previewImageText)
    setListItem(item)

  }
  const onHadleNavigation = (item: string) => {
    // setContent({
    //     ...content,
    //     stepType : item,
    // })
    if (item == 'back') {
      const backValue = getStep(content.stepType, listItem.id, content);
      isNextClicked.current = true;
      //alert(JSON.stringify(backValue)+"backValue")
      setContent({
        ...content,
        [content.stepType]: listItem.id,
        stepId: stepId,
        stepType: backValue?.['prev-step'],
      })

    }
    else if (item == 'next') {
      const nextValue = getStep(content.stepType, listItem.id, content)
      // const nextValue = getStep(content)
      isNextClicked.current = true;
      //alert(JSON.stringify(nextValue)+"nextValue");
      setContent({
        ...content,
        [content.stepType]: listItem.id,
        stepId: stepId,
        stepType: nextValue?.['next-step'],
      })

    }


  }

  return (
    <>
      <WizardTitleBar title={content.testOptions} stepType={content.stepType} />
      <div className="graphWizard-mainContext">
        <div className="graphWizard-content">
          <WizardContent content={content} isNextClicked={isNextClicked} OpenHelpWindow={help} />


          {content.stepType != 'STATUSLABEL' &&
            <WizardPreview ClickedItem={ClickedItem} stepId={stepId} onHandleItemClick={onHadleNavigation} wizardImageData={wizardImageData} title={previewTitle} src={previewSource} content={content} />
          }
        </div>
        <WizardNavigation content={content} onHandleItemClick={onHadleNavigation} stepId={stepId} helpMenu={props.helpMenu} />
      </div>
    </>
  )
}
function mapStateToProps(state) {
  return {
    helpMenu: state.helpMenuReducer
  };
}
const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestOptionsWizard);



