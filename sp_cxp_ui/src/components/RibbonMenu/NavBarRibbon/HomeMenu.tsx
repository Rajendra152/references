import {
  ActionButton,
  IContextualMenuProps,
  IIconProps,
  Image,
} from 'office-ui-fabric-react';
const { remote } = require('electron');
import React, { useState, useEffect, useCallback } from 'react';
import {
  TooltipHost,
  ITooltipHostStyles,
  DirectionalHint,
} from '@fluentui/react/lib/Tooltip';
import * as toolTipId from './ToolTipIDs';
import * as ConstantImage from '../../Constant/ConstantImage';
import * as ConstantFunc from '../../Constant/ConstantFunction';
import { useBoolean } from '@uifabric/react-hooks';
import { openSaveAsNotebook } from './../../../services/ExportWorksheetService';
import { toJpeg, toPng, toSvg } from 'html-to-image';
import html2canvas from 'html2canvas';
import {jsPDF } from 'jspdf';
import { worksheetExport } from '../../App/Config';
import { post } from './../../../services/DataService';
import { setOptions } from './Options/OptionsService';
import * as optionsAction from '../../../store/MainWindow/Options/actions';
import {
  PdfDocument,
  PdfBitmap,
  PdfSection,
  PdfPageSettings,
  SizeF,
  PdfPageOrientation,
} from '@syncfusion/ej2-pdf-export';
import { homeDir,showSaveDialog } from '../../../utils/globalUtility';
import {
  createNotebook,
  closeAllItem,
  exportCompleteNotebook,
} from '../../../services/NotebookManagerServicesNew';
import {
  IState,
  INotebook,
  IAction,
  IActiveItems,
} from '../../Redux/notebookReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as graphPropertyAction from '../../../store//GraphProperty/GraphProperty/actions';
import { isStatusbarDisplay, isNotebookManagerDisplay, isNotebookManagerDisplay2, isLoaderDisplay } from '../../../store/MainWindow/actions';
import { WindowListModal } from './WindowListModal';
import * as ITEM_TYPE from '../../../services/notebookManagerServices/ConstantsNotebookManager';
import { getDataSetByKey } from '../../../services/RedisServices';
import { convertMetadata } from '../../../components/Worksheet/Metadata';
import { setWorksheetData } from '../../../services/WorksheetServicesNew';
import * as actionCreators from '../../../store/Helpmenu/actions';
import { useTranslation } from 'react-i18next';
import process from 'process';
// import jsPDF from 'jspdf';
import { getCell, getIndexesFromAddress, getCellAddress, getColIndex, getColumnHeaderText, getRangeFromAddress } from '@syncfusion/ej2-react-spreadsheet';
import * as ProgressAction from '../../../store/Channel/Progress/actions';
import { summaryInfoAction } from "../../../store/SummaryInfo/actions";
import {
  isSetRuler
} from '../../../store/CreateGraph/CreateDiagramPage/actions';
const styles: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
};

const calloutProps = { gapSpace: 0 };

function HomeMenu(props: { smartToggle: boolean }) {
  const { t } = useTranslation();

  const [OSName, setOSName] = useState('Windows');

  console.log(props);

  const [
    isWindowListOpen,
    { setTrue: showWindowList, setFalse: hideWindowList },
  ] = useBoolean(false);

  useEffect(() => {
    props.OpenHelpWindow('introduction', '', '');
    let OS = getOS();
    console.log(OS);
    setOSName(OS);
  }, []);
  let value = null;
  //Function used for exporting worksheet data
  async function exportWorksheet() {
    console.log('props contains', props);
    console.log('Active worksheet contains', props.allActiveItem.worksheet);
    const checkSpreadsheetHead = (param) => {
      let gridData = param;
      var lastColumn =
        props.referenceObjectState.getActiveSheet().usedRange.colIndex;
      var firstColums = [];
      for (let i = 0; i <= lastColumn; i++) {
        let cell = getCell(0, i, props.referenceObjectState.getActiveSheet());
        if (cell && cell.value) {
          firstColums.push(cell);
        } else {
          firstColums.push({});
        }
      }
      let count = 0,
        total = gridData.length;
      for (let i = 0; i < gridData.length; i++) {
        let element = gridData[i];
        if (element) {
          element = element[0];
          if (element && element.value) {
            if (element.value === firstColums[i]?.value) {
              count++;
            }
          }
          if (!element || Object.keys(element).length == 0) {
            if (!firstColums[i] || Object.keys(firstColums[i]).length == 0) {
              count++;
            } else {
              count--;
            }
          }
        }
      }
      if (count == total) {
        for (let i = 0; i < gridData.length; i++) {
          let element = gridData[i];
          if (element)
            gridData[i].shift();
        }
      }
      return gridData;
    };
    if (props.allActiveItem.worksheet) {
      let openedWorksheet = props.openWorksheets.filter(
        (item) => item.key == props.allActiveItem.worksheet
      );
      console.log('Opened worksheet', openedWorksheet);
      if (openedWorksheet.length) {
        console.log('Inside if length');
        let gridData = await getDataSetByKey(
          openedWorksheet[0].key,
          openedWorksheet[0].client
        );
        //debugger;
        gridData = gridData.map((_, colIndex) =>
          gridData.map((row) => (row[colIndex] ? row[colIndex] : {}))
        );
        let metadata = convertMetadata(gridData);
        gridData = checkSpreadsheetHead(gridData);
        // let req =
        const clientData = await setWorksheetData(
          [
            {
              sheetdata: gridData,
              // metadata: convertMetadata(gridData),
              metadata: metadata,
            },
          ],
          'meta' + openedWorksheet[0].key
        );
        console.log('client data: ', clientData);
        value = await openSaveAsNotebook();
        console.log('value contains', value);
        console.log(props);
        if (value) {
          // const requestOptions = {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     file_path: value.file_path,
          //     file_name: value.file_name,
          //     extension: value.extension,
          //     redis_key: clientData.key,//'Nbk1_1627295373470Sec1Data1'
          //   }),
          // };
          let body = {
            file_path: value.file_path,
            file_name: value.file_name,
            extension: value.extension,
            redis_key: clientData.key,
          };
          // let sendData = await fetch('http://localhost:8000/files/export_file', requestOptions);
          // let sendRes = await sendData.json();
          props.actions.ProgressAction.isLoaderSM({ message: true });
          let sendRes = await post(worksheetExport, body);
          props.actions.ProgressAction.isLoaderSM({ message: false });
          console.log('Response from backend', sendRes);
        }
      }
    } else {
      alert('please select worksheet');
    }
  }

  //Function used for exporting Document Editor content as PDF
  const exportAsPdf = (name: string) => {
    var pdfdocument = new PdfDocument();
    var count = props.exportInstance.documentEditor.pageCount;
    props.exportInstance.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
    var loadedPage = 0;
    for (let i = 1; i <= count; i++) {
      setTimeout(() => {
        var image = props.exportInstance.documentEditor.exportAsImage(
          i,
          'image/jpeg'
        );
        console.log(image, 'image');
        image.onload = function () {
          var imageHeight = parseInt(
            image.style.height.toString().replace('px', '')
          );
          var imageWidth = parseInt(
            image.style.width.toString().replace('px', '')
          );
          var section = pdfdocument.sections.add();
          var settings = new PdfPageSettings(0);
          if (imageWidth > imageHeight) {
            settings.orientation = PdfPageOrientation.Landscape;
          }
          settings.size = new SizeF(imageWidth, imageHeight);
          section.setPageSettings(settings);
          var page = section.pages.add();
          var graphics = page.graphics;
          var imageStr = image.src.replace('data:image/jpeg;base64,', '');
          var pdfImage = new PdfBitmap(imageStr);
          graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
          loadedPage++;
          if (loadedPage == count) {
            pdfdocument.save(
              (props.exportInstance.documentEditor.documentName === ''
                ? name
                : props.exportInstance.documentEditor.documentName) + '.pdf'
            );
          }
        };
      }, 500);
    }
  };
  // const [
  //   teachingBubbleVisible,
  //   { toggle: toggleTeachingBubbleVisible },
  // ] = useBoolean(false);
  // const [
  //   teachingTabBubbleVisible,
  //   { toggle: toggleTabBubbleVisible },
  // ] = useBoolean(false);
  // const [
  //   teachingWorksheetBubbleVisible,
  //   { toggle: toggleWorksheetBubbleVisible },
  // ] = useBoolean(false);
  // const [bubbleObj, setBubbleObj] = useState({});
  // const exampleSecondaryButtonProps: IButtonProps = React.useMemo(
  //   () => ({
  //     children: 'OK',
  //     onClick: toggleTeachingBubbleVisible,
  //   }),
  //   [toggleTeachingBubbleVisible]
  // );
  // const exampleSecondaryBtnProps: IButtonProps = React.useMemo(
  //   () => ({
  //     children: 'OK',
  //     onClick: toggleTabBubbleVisible,
  //   }),
  //   [toggleTabBubbleVisible]
  // );
  // const exampleSecondaryWorksheetProps: IButtonProps = React.useMemo(
  //   () => ({
  //     children: 'OK',
  //     onClick: toggleWorksheetBubbleVisible,
  //   }),
  //   [toggleWorksheetBubbleVisible]
  // );

  const Page: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Page,
    'menuIcon'
  );
  const Data: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Data,
    'menuIcon'
  );
  const Report: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Report,
    'menuIcon'
  );
  const FullScreen: IIconProps = ConstantFunc.imageProp(
    ConstantImage.FullScreen,
    'menuIcon'
  );
  const Cascade: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Cascade,
    'menuIcon'
  );
  const CloseAll: IIconProps = ConstantFunc.imageProp(
    ConstantImage.CloseAll,
    'menuIcon'
  );
  const Tabs: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Tabs,
    'menuIcon'
  );
  const Tile: IIconProps = ConstantFunc.imageProp(
    ConstantImage.Tile,
    'menuIcon'
  );
  const StatusBar: IIconProps = ConstantFunc.imageProp(
    ConstantImage.StatusBar,
    'menuIcon'
  );

  const insertOfficeDropdownProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'pasteGraphPpt',
        text: 'Paste graph into Powerpoint..',
        iconProps: { iconName: 'Mail' },
      },
      {
        key: 'pasteWord',
        text: 'Paste into Word',
        iconProps: { iconName: 'Mail' },
      },
    ],
  };

  const graphDropdownProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [

      {
        key: 'graphDropdownExportJPG',
        title: 'Export the Graph as JPG',
        text: 'Export As JPG',
        onClick: () => {
          if(props.allActiveItem.graphPage && props.allActiveItem.graphPage.id){
            props.isLoaderDisplay(true)
            onExportDiagram('jpeg');
          } else {
            alert('please open graph page')
          }
        },
      },
      {
        key: 'graphDropdownExportPNG',
        title: 'Export the Graph as PNG',
        text: 'Export As PNG',
        onClick: () => {
           if(props.allActiveItem.graphPage && props.allActiveItem.graphPage.id){
            props.isLoaderDisplay(true)
            onExportDiagram('png');
          } else {
            alert('please open graph page')
          }
        },
      },
      {
        key: 'graphDropdownExportSVG',
        title: 'Export the Graph as SVG',
        text: 'Export As SVG',
        onClick: () => {
          if(props.allActiveItem.graphPage && props.allActiveItem.graphPage.id){
            props.isLoaderDisplay(true)
            onExportDiagram('svg');
          } else {
            alert('please open graph page')
          }
        },
      },
      {
        key: 'graphDropdownExportPDF',
        title: 'Export the Graph as PDF',
        text: 'Export As PDF',
        onClick: () => {
          if(props.allActiveItem.graphPage && props.allActiveItem.graphPage.id){
            props.isLoaderDisplay(true)
            onExportDiagram('PDF');
          } else {
            alert('please open graph page')
          }
        },
      },
    ],
  };
  //For exporting document editor/Report file formats
  const reportDropdownProps: IContextualMenuProps = {
    className: 'dropdownList',
    items: [
      {
        key: 'Text',
        text: 'Save as Text file',
        onClick: () => {
          console.log(process.env);
          if (OSName.includes('Mac OS')) {
            props.exportInstance.documentEditor.save('sample', 'Txt');
          } else if (OSName.includes('Windows')) {
            props.exportInstance.documentEditor.save('sample', 'Txt');
          }
        },
      },
      {
        key: 'Doc',
        text: 'Save as Word file',
        onClick: () => {
          if (OSName.includes('Mac OS')) {
            props.exportInstance.documentEditor.save('sample', 'Docx');
          } else if (OSName.includes('Windows')) {
            props.exportInstance.documentEditor.save('sample', 'Docx');
          }
          
        },
      },
      {
        key: 'pdf',
        text: 'Save as PDF file',
        onClick: () => {
          if (OSName.includes('Mac OS')) {
            exportAsPdf("Sample");
          } else if (OSName.includes('Windows')) {
            exportAsPdf("Sample");
          }
          
        },
      },
    ],
  };

  // const openBubble = (param) => {
  //   toggleTeachingBubbleVisible();
  //   setBubbleObj(param);
  // };

  // const openTabBubble = (param) => {
  //   toggleTabBubbleVisible();
  //   setBubbleObj(param);
  // };

  // const openWorksheetBubble = (param) => {
  //   toggleWorksheetBubbleVisible();
  //   setBubbleObj(param);
  // };
  const getOS = () => {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  };

  const toggleStatusBar = () => {
    console.log(props.isStatusbarDisplayState);
    props.actions.changeStatusbarDisplay(!props.isStatusbarDisplayState);
  };

  const gphPrpDisable =
    props.allActiveItem.graphPage && props.allActiveItem.graphPage.id
      ? ''
      : 'disableItem';
  let disablePage = 'disableItem';
  let disableData = 'disableItem';
  let disableReport = 'disableItem';

  let actvItem = [...props.activeItems].sort(
    (a, b) => b.lastActive - a.lastActive
  );

  console.log('Active Item -------->  ', actvItem);
  for (const item of actvItem) {
    if (item.parentNotebookId === props.allActiveItem.notebook) {
      if (item.type === ITEM_TYPE.REPORT) {
        disableReport = '';
      }
    }
  }

  let sectionId = '';
  for (const item of actvItem) {
    if (item.parentNotebookId === props.allActiveItem.notebook) {
      if (!sectionId) {
        if (item.type === ITEM_TYPE.GRAPHPAGE) {
          disablePage = '';
          sectionId = item.parentSectionId;
        }
        if (item.type === ITEM_TYPE.WORKSHEET) {
          disableData = '';
          sectionId = item.parentSectionId;
        }
      } else {
        if (
          item.type === ITEM_TYPE.GRAPHPAGE &&
          item.parentSectionId === sectionId
        ) {
          disablePage = '';
        }
        if (
          item.type === ITEM_TYPE.WORKSHEET &&
          item.parentSectionId === sectionId
        ) {
          disableData = '';
        }
      }
    }
  }

  actvItem = actvItem.reverse();
  const dataActionOnClick = () => {
    const currNbkId = props.allActiveItem.notebook;
    let secId = '';
    let index = null;

    for (let i = actvItem.length - 1; i >= 0; i--) {
      if (!secId) {
        if (
          actvItem[i].parentNotebookId === currNbkId &&
          actvItem[i].type === ITEM_TYPE.GRAPHPAGE
        ) {
          secId = actvItem[i].parentSectionId;
        }
        if (
          actvItem[i].parentNotebookId === currNbkId &&
          actvItem[i].type === ITEM_TYPE.WORKSHEET
        ) {
          index = i;
          break;
        }
      } else {
        if (
          actvItem[i].parentSectionId === secId &&
          actvItem[i].type === ITEM_TYPE.WORKSHEET
        ) {
          index = i;
          break;
        }
      }
    }

    if (index !== null) {
      let allActiveItem = {
        notebook: actvItem[index].parentNotebookId,
        section: actvItem[index].parentSectionId,
        worksheet: actvItem[index].id,
        graphPage: {
          id: null,
          object: null,
        },
        report: null,
        selectedItemOnNotebook: actvItem[index].id,
        cursor: actvItem[index].id,
      };
      const newSummary = {
        id: actvItem[index].id,
        type: actvItem[index].type,
        createdDate: actvItem[index].createdDate,
        modifiedDate: actvItem[index].modifiedDate,
        author: actvItem[index].author,
        description: actvItem[index].description
      }
      props.summaryInfoAction(newSummary)

      props.setAllActiveItem(allActiveItem);
      // setSelectedPivotItem: (pvtItem) => {
      props.setSelectedPivotItem(actvItem[index].id);
    }
  };

  const pageActionOnClick = () => {
    const currNbkId = props.allActiveItem.notebook;
    let secId = '';
    let index = null;

    for (let i = actvItem.length - 1; i >= 0; i--) {
      if (!secId) {
        if (
          actvItem[i].parentNotebookId === currNbkId &&
          actvItem[i].type === ITEM_TYPE.WORKSHEET
        ) {
          secId = actvItem[i].parentSectionId;
        }
        if (
          actvItem[i].parentNotebookId === currNbkId &&
          actvItem[i].type === ITEM_TYPE.GRAPHPAGE
        ) {
          index = i;
          break;
        }
      } else {
        if (
          actvItem[i].parentSectionId === secId &&
          actvItem[i].type === ITEM_TYPE.GRAPHPAGE
        ) {
          index = i;
          break;
        }
      }
    }
    if (index !== null) {
      let allActiveItem = {
        notebook: actvItem[index].parentNotebookId,
        section: actvItem[index].parentSectionId,
        worksheet: null,
        graphPage: {
          id: actvItem[index].id,
          object: null,
        },
        report: null,
        selectedItemOnNotebook: actvItem[index].id,
        cursor: actvItem[index].id,
      };
      const newSummary = {
        id: actvItem[index].id,
        type: actvItem[index].type,
        createdDate: actvItem[index].createdDate,
        modifiedDate: actvItem[index].modifiedDate,
        author: actvItem[index].author,
        description: actvItem[index].description
      }
      props.summaryInfoAction(newSummary)
      props.setAllActiveItem(allActiveItem);
      props.setSelectedPivotItem(actvItem[index].id);
    }
  };

  const reportActionOnClick = () => {
    const currNbkId = props.allActiveItem.notebook;

    for (let i = actvItem.length - 1; i >= 0; i--) {
      if (
        actvItem[i].parentNotebookId === currNbkId &&
        actvItem[i].type === ITEM_TYPE.REPORT
      ) {
        let allActiveItem = {
          notebook: actvItem[i].parentNotebookId,
          section: actvItem[i].parentSectionId,
          worksheet: null,
          graphPage: {
            id: null,
            object: null,
          },
          report: actvItem[i].id,
          selectedItemOnNotebook: actvItem[i].id,
          cursor: actvItem[i].id,
        };
        const newSummary = {
          id: actvItem[i].id,
          type: actvItem[i].type,
          createdDate: actvItem[i].createdDate,
          modifiedDate: actvItem[i].modifiedDate,
          author: actvItem[i].author,
          description: actvItem[i].description
        }
        props.summaryInfoAction(newSummary)
        props.setAllActiveItem(allActiveItem);
        props.setSelectedPivotItem(actvItem[i].id);
        break;
      }
    }
  };
  const exportNoteBook = () => {
    const currentNotebook =
      props.notebooks.allNotebooks.byId[props.allActiveItem.notebook];
    exportCompleteNotebook(currentNotebook, props);
  };

  const onExportDiagram = (type) => {
   
    if (props.allActiveItem.graphPage && props.allActiveItem.graphPage.id){
      props.actions.isSetRuler(false);
      // Updating options
      setOptions('GraphPage.Rulers', value, props);
      let node = document.getElementById('diagram');
  
      let blobImage = document.getElementById('blobImage');
      console.log(node);
      if (type == 'PDF') {
        html2canvas(node, { scale: 3 }).then(async (canvas) => {
          props.isLoaderDisplay(false)
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('l', 'mm', 'a4');
          var width = pdf.internal.pageSize.getWidth();
          var height = pdf.internal.pageSize.getHeight();
          let values = imgData.replace(
            /^data:image\/[^;]/,
            'data:application/octet-stream'
          );
          pdf.addImage(values, 'JPEG', 4, 4, width, height);
          pdf.save('graphPage.pdf');
        });
      } else {
        let value;
        switch (type) {
          case 'jpeg':
            value = toJpeg(node);
            break;
          case 'png':
            value = toPng(node);
            break;
          case 'svg':
            value = toSvg(node);
            break;
        }
        value
          .then(function (dataUrl) {
            props.isLoaderDisplay(false)
            var link = document.createElement('a');
            link.download = `graphPage.${type}`;
            link.href = dataUrl;
            link.click();
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
      }
    } else {
      alert("please select graph page")
    }
   
  };

  const allNbk = Object.values(props.notebooks.allNotebooks.byId);
  const isNbkDisable = allNbk.length == 0 ? 'disableItem' : '';

  return (
    <div className="ms-Grid" dir="ltr">
      {/* {teachingBubbleVisible && (
        <TeachingBubble
          target={'#' + bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={toggleTeachingBubbleVisible}
          headline={bubbleObj.title}
        >
          <div className="ms-Grid">
            <div className="ms-Grid-row d-flex">
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                <div className="LayoutPage-demoBlock">
                  <img
                    src={ConstantImage.GraphPropertyImg}
                    className={'bubbleImg'}
                  />
                </div>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                <div className="LayoutPage-demoBlock">{bubbleObj.message}</div>
              </div>
            </div>
          </div>
        </TeachingBubble>
      )}
      {teachingTabBubbleVisible && (
        <TeachingBubble
          target={'#' + bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryBtnProps}
          onDismiss={toggleTabBubbleVisible}
          headline={bubbleObj.title}
        >
          {bubbleObj.message}
        </TeachingBubble>
      )}
      {teachingWorksheetBubbleVisible && (
        <TeachingBubble
          target={'#' + bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryWorksheetProps}
          onDismiss={toggleWorksheetBubbleVisible}
          headline={bubbleObj.title}
        >
          {bubbleObj.message}
        </TeachingBubble>
      )} */}
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ribbon-container">
          <div className="ribbon-btn-box mrspace">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-button'
              }
            >
              <div
                onClick={() => exportNoteBook(props)}
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${isNbkDisable}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${isNbkDisable}`
                }
              >
                <TooltipHost
                  content={t('Export Notebook as JSON')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdNote}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.Notebook}
                  />

                  <ActionButton
                    aria-describedby={toolTipId.tooltipIdNote}
                    className="box-btn"
                    allowDisabledFocus
                  >
                    {t("Notebook")}
                  </ActionButton>
                </TooltipHost>
              </div>

              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
              >
                <TooltipHost
                  content={t('Export Graph as PNG, JPG, SVG or PDF')}
                  // Give the user more time to interact with the tooltip before it closes
                  closeDelay={100}
                  id={toolTipId.tooltipIdGraph}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.Graph}
                  />
                  <ActionButton
                    className="box-btn"
                    allowDisabledFocus
                    menuProps={graphDropdownProps}
                  >
                    Graph
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="worksheetID"
                onClick={exportWorksheet}
              // onClick={() =>
              //   openWorksheetBubble({
              //     id: 'worksheetID',
              //     title: 'Exporting data',
              //     message:
              //       'SigmaPlot 15 supports data export in a wide variety of popular formats.',
              //   })
              // }
              >
                <TooltipHost
                  content={t('Export Worksheet to a file')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdWorksheet}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.WorkSheet}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Worksheet
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
              >
                <TooltipHost
                  content={t('Export Report as text, word or PDF file')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdReport}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.Report}
                  />
                  <ActionButton
                    className="box-btn"
                    allowDisabledFocus
                    menuProps={reportDropdownProps}
                  >
                    Report
                  </ActionButton>
                </TooltipHost>
              </div>
              {/* <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton lastBox-btn'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.CreatePDF}
                />
                <ActionButton className="box-btn" allowDisabledFocus>
                  Create&nbsp;PDF
                </ActionButton>
              </div> */}
            </div>
            <label className="ribbon-boxbtn-lbl">Export</label>
          </div>

          {/* <div className="v-hr"></div>
                    <div className="ribbon-btn-box">
                        <div className={!props.smartToggle ? "ribbon-grid-button" : "ribbon-grid-button sim-ribbon-grid-submenubutton"}>
                            <div className={!props.smartToggle ? "ribbon-gbutton singleIcon lastBox-btn" : "ribbon-gbutton sim-ribbon-gbutton"}>
                                <Image alt="ribbon-icon" className="ribbon-icon-svg" src={RibbonFreezePanes} />
                                <ActionButton className="box-btn" allowDisabledFocus menuProps={insertOfficeDropdownProps}>
                                    Insert Into Office
       </ActionButton>
                            </div>
                        </div>
                        <label className="ribbon-boxbtn-lbl">Graph Output</label>
                    </div> */}

          
          <div className="ribbon-btn-box mrspace">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-submenubutton'
              }
            >
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id='notebookManagerDiv'
                style={
                  props.isNotebookManagerDisplay
                    ? {
                      backgroundImage:
                        `linear-gradient(#cccccc,#cccccc)`,
                    }
                    : {}
                }
                onClick={() => {
                  props.actions.changeNotebookManagerDisplay(!props.isNotebookManagerDisplay);
                  props.actions.changeNotebookManagerDisplay2(!props.isNotebookManagerDisplay2);
                  //props
                  //by default in redux
                  //onclick we need to make it false/true
                }}
              >
                <TooltipHost
                  content={t('Show or Hide the Notebook Manager Window')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdNoteManager}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.NotebookManager}
                  />
                  <ActionButton
                    className="box-btn"
                    allowDisabledFocus

                  >
                    Notebook Manager
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${disablePage}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${disablePage}`
                }
                onClick={pageActionOnClick}
              >
                <TooltipHost
                  content={t('View Graph Page')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdPage}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.Page}
                  />
                  <ActionButton className="box-btn">Page</ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${disableData}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${disableData}`
                }
                onClick={dataActionOnClick}
              >
                <TooltipHost
                  content={t('View Data Page')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdPage}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.Data}
                  />
                  <ActionButton className="box-btn " allowDisabledFocus>
                    Data
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton ${disableReport}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${disableReport}`
                }
                onClick={reportActionOnClick}
              >
                <TooltipHost
                  content={t('View Report Page')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdPage}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.ReportPage}
                  />
                  <ActionButton className="box-btn " allowDisabledFocus>
                    Report
                  </ActionButton>
                </TooltipHost>
              </div>

              {/* <div className="hor-button hr-btn-smallIcons">
                <ActionButton
                  iconProps={Page}
                  className={disablePage}
                  onClick={pageActionOnClick}
                >
                  {' '}
                  Page
                </ActionButton>

                <ActionButton
                  iconProps={Data}
                  className={disableData}
                  onClick={dataActionOnClick}
                >
                  Data{' '}
                </ActionButton>

                <ActionButton
                  iconProps={Report}
                  className={disableReport}
                  onClick={reportActionOnClick}
                >
                  Report
                </ActionButton>
              </div> */}
            </div>
            <label className="ribbon-boxbtn-lbl">Navigate</label>
          </div>
          {/* <div className="v-hr"></div> */}
          {/* <div className="ribbon-btn-box">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-submenubutton'
              }
            >
              <div
                className={
                  !props.smartToggle
                    ? `ribbon-gbutton lastBox-btn ${gphPrpDisable}`
                    : `ribbon-gbutton sim-ribbon-gbutton ${gphPrpDisable}`
                }
                style={
                  props.graphPropertyState.isOpen
                    ? {
                        backgroundImage:
                          'linear-gradient(rgb(250, 164, 65),rgb(254, 236, 165)',
                      }
                    : {}
                }
                id="graphPropID"
                onClick={() => {
                  console.log('---------->', props.graphPropertyState);
                  props.graphPropertyAction.isOpenGraphProperty({
                    isOpen: !props.graphPropertyState.isOpen,
                    graphId: props.graphPropertyState.graphId,
                  });
                }}
              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.GraphProperties}
                />
                <ActionButton className="box-btn" allowDisabledFocus>
                  Graph Properties
                </ActionButton>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton lastBox-btn'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
              >
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantImage.ObjectProperties}
                />
                <ActionButton className="box-btn" allowDisabledFocus>
                  Object Properties
                </ActionButton>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Properties</label>
          </div> */}
         
          <div className="ribbon-btn-box mrspace">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-submenubutton'
              }
            >
              <div className="hor-button hr-btn-smallIcons">
                <TooltipHost
                  content={t('Show or Hide Window Tabs')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdTabs}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    id="tabsID"
                    // onClick={() =>
                    //   openTabBubble({
                    //     id: 'tabsID',
                    //     title: 'Ribbons and the Quick Access Toolbar',
                    //     message:
                    //       'Using SigmaPlot has never been easier with its new look and feel, including full cross-platform ribbons',
                    //   })
                    // }
                    iconProps={Tabs}
                  >
                    Tabs
                  </ActionButton>
                </TooltipHost>
                {/* <TooltipHost
                  content={t('Arrange windows as non-overlapping tiles')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdTiles}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton iconProps={Tile} className="disableItem">
                    Tile
                  </ActionButton>
                </TooltipHost>
                <TooltipHost
                  content={t('Arrange windows so they overlap')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdCascade}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton iconProps={Cascade} className="disableItem">
                    Cascade
                  </ActionButton>
                </TooltipHost> */}
                <TooltipHost
                  content="Show or Hide the status bar"
                  closeDelay={100}
                  id={toolTipId.tooltipIdStatusBar}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    className={
                      props.isStatusbarDisplayState ? 'windows-statusbar' : ''
                    }
                    iconProps={StatusBar}
                    onClick={toggleStatusBar}
                  >
                    {t('Status\u00a0Bar')}
                  </ActionButton>
                </TooltipHost>
                <TooltipHost
                  content={t('Close All open windows')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdCloseAll}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    iconProps={CloseAll}
                    className={!props.activeItems.length ? 'disableItem' : ''}
                    onClick={() => closeAllItem(props.removeAllActiveItem)}
                  >
                    {t('Close\u00a0All')}
                  </ActionButton>
                </TooltipHost>
              </div>

              {/* <div className="hor-button hr-btn-smallIcons">
                <TooltipHost
                  content={t(
                    'Display the Graph Page as full screen with no menus, page borders or other windows'
                  )}
                  closeDelay={100}
                  id={toolTipId.tooltipIdFullScreen}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <ActionButton
                    className="for-whiteSpace disableItem"
                    iconProps={FullScreen}
                  >
                    {t('Full\u00a0Screen')}
                  </ActionButton>
                </TooltipHost>
                
              </div> */}

              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton lastBox-btn'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                onClick={showWindowList}
              >
                <TooltipHost
                  content={t('Manage the currently open windows')}
                  closeDelay={100}
                  id={toolTipId.tooltipIdWindowList}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.WindowsList}
                  />
                  <ActionButton className="box-btn " allowDisabledFocus>
                    {t('Window List')}
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Windows</label>
          </div>
        </div>
      </div>
      <WindowListModal
        isWindowListOpen={isWindowListOpen}
        hideWindowList={hideWindowList}
        activeItems={props.activeItems}
        selectedPivotItem={props.selectedPivotItem}
        setSelectedPivotItem={props.setSelectedPivotItem}
        removeActiveItem={props.removeActiveItem}
        saveProps={props}
      />
    </div>
  );
}

function mapStateToProps(state: IState) {
  return {
    notebooks: state.notebookReducer.notebooks,
    activeItems: state.notebookReducer.activeItems,
    allActiveItem: state.notebookReducer.allActiveItem,
    allNotebookId: state.notebookReducer.allNotebookId,
    isStatusbarDisplayState: state.mainWindowReducer.isStatusbarDisplay,
    selectedPivotItem: state.notebookReducer.selectedPivotItem,
    graphPropertyState: state.graphPropertyReducer.isOpenGraphProperty,
    exportInstance: state.instanceReducer.exportInstance,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    pageInstance: state.createDiagramPageReducer.diagramPageInstance,
    nodeElementType: state.createDiagramPageReducer.selectedNode,
    isNotebookManagerDisplay: state.mainWindowReducer.isNotebookManagerDisplay,
    isNotebookManagerDisplay2: state.mainWindowReducer.isNotebookManagerDisplay2,
    optionsState: state.optionsReducer,
    referenceObjectState: state.instanceReducer.instance,
    isLoaderDisplay: state.mainWindowReducer.isLoaderDisplay,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    OpenHelpWindow: (
      RibbonMenu: string,
      selectedElement: string,
      selectedItem: string
    ) =>
      dispatch(
        actionCreators.setHelpWindowOpen(
          RibbonMenu,
          selectedElement,
          selectedItem
        )
      ),

    addNotebook: (nObj: INotebook) => {
      dispatch({ type: 'ADD_NOTEBOOK', payload: nObj });
    },
    addOpenWorksheet: (wObj: IWorksheet) => {
      dispatch({ type: 'ADD_OPEN_NOTEBOOK', payload: wObj });
    },
    setActiveWorksheet: (wKey: string) => {
      dispatch({ type: 'SET_ACTIVE_WORKSHEET', payload: wKey });
    },
    setActiveItem: (activeItem: IActiveItems) => {
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: activeItem });
    },
    setAllActiveItem: (allactiveItem: IActiveItems) => {
      dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
    },
    setSelectedPivotItem: (pvtItem) => {
      dispatch({ type: 'SET_SELECTED_PIVOT_ITEM', payload: pvtItem });
    },
    removeAllActiveItem: () => {
      dispatch({ type: 'REMOVE_ALL_ACTIVE_ITEM', payload: [] });
    },
    removeActiveItem: (itemId) => {
      dispatch({ type: 'REMOVE_ACTIVE_ITEM', payload: itemId });
    },
    actions: {
      changeStatusbarDisplay: bindActionCreators(isStatusbarDisplay, dispatch),
      ProgressAction: bindActionCreators(ProgressAction, dispatch),
      changeNotebookManagerDisplay: bindActionCreators(isNotebookManagerDisplay, dispatch),
      changeNotebookManagerDisplay2: bindActionCreators(isNotebookManagerDisplay2, dispatch),
      isSetRuler: bindActionCreators(isSetRuler, dispatch),
    },
    saveItem: (item) => {
      dispatch({ type: 'SAVE_ITEM', payload: item });
    },
    optionsAction: bindActionCreators(optionsAction, dispatch),
    graphPropertyAction: bindActionCreators(graphPropertyAction, dispatch),
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
    isLoaderDisplay: bindActionCreators(isLoaderDisplay, dispatch)
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(HomeMenu);
