import {
  INavStyles,
  Nav,
  Panel,
  INavLink,
  PanelType,
  Link,
} from 'office-ui-fabric-react';
import React, { useState, useEffect, Dispatch } from 'react';
import { navLinkGroups } from './MainMenuGroup';
import * as ConstantImage from '../../Constant/ConstantImage';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
//import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { useBoolean } from '@uifabric/react-hooks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../store/Helpmenu/actions';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import * as ProgressAction from '../../../store/Channel/Progress/actions';
import {
  createNotebook,
  createBlankSection,
  createReport,
  createGraphPage,
  createWorksheet,
  saveNotebook,
  openSaveAs,
  createTransform,
  openNotebookFile,
  exportCompleteNotebook,
  deleteItem,
} from '../../../services/NotebookManagerServicesNew';
import * as importDBAction from '../../../store/Worksheet/ImportDB/actions';
import {
  storeWorksheet,
  storeGraph,
  setActiveWorksheet,
} from '../../../store/Worksheet/WorksheetOperation/actions';
import * as importfileAction from '../../../store/Worksheet/FileImport/actions';
import { isWorksheetDialogHide } from '../../../store/MainWindow/actions';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import * as transformAction from '../../../store/Analysis/Transform/actions';
import * as auditingAction from '../../../store/MainWindow/Auditing/actions';
import * as optionsAction from '../../../store/MainWindow/Options/actions';
import { fileOpen, fileOpenWithPath } from '../../../services/EncrypDecrypt';
import {
  PdfDocument,
  PdfBitmap,
  PdfSection,
  PdfPageSettings,
  SizeF,
  PdfPageOrientation,
} from '@syncfusion/ej2-pdf-export';
const { ipcRenderer } = require('electron');
// import UserDefinedCompontent from './AnalysisMenu/UserDefined';
// import Options from './Options/Options';
import {
  TooltipHost,
  ITooltipHostStyles,
  DirectionalHint,
} from '@fluentui/react/lib/Tooltip';
import { useTranslation } from 'react-i18next';
import { print } from '@syncfusion/ej2-base';

import { summaryInfoAction } from '../../../store/SummaryInfo/actions';
import { createElement, getComponent } from '@syncfusion/ej2-base';
import { useReactToPrint } from 'react-to-print';
import { homeDir } from '../../../utils/globalUtility';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import PgeSetupModal from './PgeSetupModal';

import {
  recentSavedFileAction,
  deleteAllFileAction,
} from '../../../store/RecentSavedFile/actions';
import { version } from '../../Constant/ConstInfo';
import * as ITEM_TYPE from '../../../services/notebookManagerServices/ConstantsNotebookManager';
import { getUpdatedNewProps } from '../../../utils/notebookManagerUtils/notebookManagerUtility';
import {
  writeIntoINIFile,
  readFromINIFile,
} from '../../../utils/globalUtility';
import { isReRenderGraph } from '../../../store/CreateGraph/CreateDiagramPage/actions';
import { saveAllFileAction } from '../../../store/RecentSavedFile/actions';
import * as ACTION from '../../Redux/actionConstants';
import { openSaveAsNotebook } from '../../../services/ExportWorksheetService';
import { getCell } from '@syncfusion/ej2-react-spreadsheet';
import { getDataSetByKey } from '../../../services/RedisServices';
import { post } from '../../../services/DataService';
import { setWorksheetData } from '../../../services/WorksheetServicesNew';
import { worksheetExport } from '../../App/Config';
import { IWorksheet } from '../../CanvasManager/CanvasManagerNew';
import { IState, IAction, INotebook } from '../../Redux/notebookReducer';
import { convertMetadata } from '../../Worksheet/Metadata';
const elecRemote = require('electron').remote;

const styles: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
};
const modalPropsStyles = { main: { maxWidth: 450 } };
const SAVEFILEPATH = 'savedFilePath.ini';
const calloutProps = { gapSpace: 0 };
function MainMenu(props: {
  noteBookpanelClose: any;
  noteBookpanel: boolean;
  toggleOpen: boolean;
}) {
  const [selectedMenu, setselectedMenu] = useState({
    name: '',
    desc: '',
    subCat: [],
  });
  const { t } = useTranslation();
  // const [bubbleObj, setBubbleObj] = useState({})
  // const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
  // const [teachingAuditBubbleVisible, { toggle: toggleAuditTeachingBubbleVisible }] = useBoolean(false);
  const [hideWrkDialog, { toggle: toggleHideWrkDialog }] = useBoolean(true);
  // const exampleSecondaryAuditProps: IButtonProps = React.useMemo(
  //   () => ({
  //     children: 'OK',
  //     onClick: toggleAuditTeachingBubbleVisible,
  //   }),
  //   [toggleAuditTeachingBubbleVisible],
  // );
  // const exampleSecondaryButtonProps: IButtonProps = React.useMemo(
  //   () => ({
  //     children: 'OK',
  //     onClick: toggleTeachingBubbleVisible,
  //   }),
  //   [toggleTeachingBubbleVisible],
  // );
  const [isPass, setIsPass] = useState(false);
  const [password, setPassword] = useState('');
  const [decodeInfo, setDecodeInfo] = useState();
  const [Pagesetup, setPageSetup] = useState(false);
  const [hideWarningDialog, setHideWarningDialog] = useState(true);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [warningMsgProps, setWarningMsgProps] = useState({
    type: DialogType.normal,
    title: version,
    subText:
      'Worksheet in this section already Exist. Pasting Duplicate worksheet not allowed.',
    key: ITEM_TYPE.SAVE_ALERT,
  });

  const [canceledNbkId, setCanceledNbkId] = useState([]);
  console.log(warningMsgProps);


  const popupWarningMsgDailog = (newMsg: any) => {
    setWarningMsgProps({
      ...warningMsgProps,
      ...newMsg,
    });
    toggleHideDialog()
  };
  const  dailog_CANCEL_OnClick = (warnMsg: any) => {
    toggleHideDialog();
  };
const  closeWindowAfter =() => {
    writeIntoINIFile(props.recentSavedFile, SAVEFILEPATH);
    const window = elecRemote.getCurrentWindow();
    window.close();
  }
const  triggerNextPopup = (allNbk: any, newProps: any) => {
    let latProp = { ...newProps };
    let isAllNbkAlreadySaved = true;
    if (allNbk.length > 0) {
      for (let i = 0; i < allNbk.length; i++) {
        console.log(allNbk[i]);
        if (allNbk[i].isSaved) {
          // console.log(newProps);
          const updateState = deleteItem(allNbk[i], latProp);
          latProp = getUpdatedNewProps(latProp, updateState);
        } else {
          isAllNbkAlreadySaved = false;
          popupWarningMsgDailog({
            title: version,
            subText: `Save changes to ${allNbk[i].name} ?`,
            key: ITEM_TYPE.SAVE_ALERT,
            currItem: allNbk[i],
            multipleNbk: allNbk,
          });
          break;
        }
      }
      if (isAllNbkAlreadySaved) {
        closeWindowAfter();
      }
    } else {
     // closeWindowAfter();
    }
  };
const  dailog_YES_OnClick = async (warnMsg: any) => {
  console.log(warnMsg);
    if (warnMsg.multipleNbk) {
     toggleHideDialog();
      let allNbk = Object.values(props.notebooks.allNotebooks.byId);
      allNbk = allNbk.filter((obj) => obj.id !== warnMsg.currItem.id);
      console.log(allNbk);
      for (const cancelId of canceledNbkId) {
        allNbk = allNbk.filter((obj) => obj.id !== cancelId);
      }

      const [allNewState, isSuccess] = await saveNotebook(
        [warnMsg.currItem],
        props,
        false
      );
      if (!isSuccess) {
        canceledNbkId.push(warnMsg.currItem.id);
      }

      let newProps = {
        ...props,
        ...allNewState,
      };

      //checking more notebook is there for save then next save dailog wll be popuped.
       triggerNextPopup(allNbk, newProps);
    } else {
      saveNotebook([warnMsg.currItem], props, false);
      toggleHideDialog();
    }
  };

 const dailog_NO_OnClick = async (warnMsg: any) => {
   console.log(`No buttons`);
    if (warnMsg.multipleNbk) {
      toggleHideDialog();
      let allNbk = Object.values(props.notebooks.allNotebooks.byId);
      allNbk = allNbk.filter((obj) => obj.id !== warnMsg.currItem.id);
      for (const cancelId of canceledNbkId) {
        allNbk = allNbk.filter((obj) => obj.id !== cancelId);
      }

      const updateState = await deleteItem(warnMsg.currItem, props);
      let newProps = getUpdatedNewProps(props, updateState);
      triggerNextPopup(allNbk, newProps);
    } else {
      deleteItem(warnMsg.currItem, props);
      toggleHideDialog();
    }
  };

  // const [warningModalProps, setWarningModalProps] = useState({
  //   isBlocking: true,
  //   styles: { main: { maxWidth: '200px' } },
  //   dragOptions: {
  //     moveMenuItemText: 'Move',
  //     closeMenuItemText: 'Close',
  //     menu: ContextualMenu,
  //     keepInBounds: true,
  //   },
  //   className: 'warningDialog',
  // });

  const navStyles: Partial<INavStyles> = {
    root: {
      width: 170,
      height: 498,
      boxSizing: 'border-box',
      border: '1px solid #eee',
      overflowY: 'hidden',
    },
  };

  const dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
    keepInBounds: true,
  };

  const wrkDialogContentProps = {
    type: DialogType.normal,
    title: 'SigmaPlot',
    subText:
      'Pages in this section will become associated with this new worksheet and loose any data stored in them?',
  };

  const wrkDialogStyles = { main: { maxWidth: '200px' } };

  const wrkModalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: wrkDialogStyles,
      dragOptions: dragOptions,
      className: 'deleteDialouge',
    }),
    []
  );

  //Function used for exporting Document Editor content as PDF
  const exportAsPdf = () => {
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
                ? 'sample'
                : props.exportInstance.documentEditor.documentName) + '.pdf'
            );
          }
        };
      }, 500);
    }
  };

  const handleWorksheetPrint = useReactToPrint({
    content: () => {
      let printElement: HTMLElement = createElement('div', {
        className: 'e-sheet-panel',
        innerHTML:
          '<div class="e-spreadsheet-print"></div><div class="e-sheet"><div class="e-main-panel style="height:100%" style="overflow: unset"><div class="e-sheet-content" ></div></div></div>',
      });
      if (document.getElementById('spreadsheet')) {
        let spreadsheet1 = getComponent(
          document.getElementById('spreadsheet'),
          'spreadsheet'
        );
        printElement.querySelector('.e-sheet-content').innerHTML =
          document.querySelector('.e-sheet-content').outerHTML;
        const rows = spreadsheet1.getActiveSheet().rows;
        let rowsData = '';
        for (let i = 0; i < rows.length; i++) {
          rowsData += `<tr role="row" class="e-row" aria-rowindex="${
            i + 1
          }" style="height: 20px;">`;
          const row = rows[i];
          for (let j = 0; j < row.cells.length; j++) {
            rowsData += `<td class="e-cell e-right-align" role="gridcell" aria-colindex="${
              j + 1
            }" tabindex="-1">${
              (row.cells[j] && row.cells[j].value) || ''
            }</td>`;
          }
          rowsData += `</tr>`;
        }
        printElement.querySelector('tbody').innerHTML = rowsData;
        printElement
          .querySelector('.e-sheet-content')
          .children[0].getElementsByClassName(
            'e-virtualtrack'
          )[0].style.height = 'auto';
        const tableRef = printElement.querySelector('.e-content-table');
        tableRef.setAttribute('border', '1');
        tableRef.style.borderCollapse = 'collapse';
      }
      return printElement;
    },
  });

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
          if (element) gridData[i].shift();
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
        let value = await openSaveAsNotebook();
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

  const handleReportPrint = async () => {
    var blobData;
    var pdfdocument = new PdfDocument();
    var count = props.exportInstance.documentEditor.pageCount;
    props.exportInstance.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
    var loadedPage = 0;
    for (let i = 1; i <= count; i++) {
      var image = props.exportInstance.documentEditor.exportAsImage(
        i,
        'image/jpeg'
      );
      var imageHeight = parseInt(
        image.style.height.toString().replace('px', '')
      );
      var imageWidth = parseInt(image.style.width.toString().replace('px', ''));
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
        console.log('vasu', pdfdocument);
        blobData = await pdfdocument.save();
      }
    }
    let fileData = new Int8Array(await blobData.blobData.arrayBuffer());
    const path = homeDir + '/Documents/SigmaPlot/SPW15/sampleprint.pdf';
    require('fs').writeFileSync(path, fileData);
    require('electron').ipcRenderer.send('printPdfFile', { path: path });
  };

  const handleGraphPrint = () => {
    let node = document.getElementById('diagram');
    html2canvas(node, { scale: 3 }).then(async (canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 4, 4, width, height);
      var blobPDF = new Blob([pdf.output('blob')], { type: 'application/pdf' });
      let fileData = new Int8Array(await blobPDF.arrayBuffer());
      const path = homeDir + '/Documents/SigmaPlot/SPW15/sampleprint.pdf';
      require('fs').writeFileSync(path, fileData);
      require('electron').ipcRenderer.send('printPdfFile', { path: path });
    });
  };

  const onLinkClick = async (item?: INavLink, ...evData: any) => {
    console.log('key bro', item.key);

    if (item && item.name != '') {
      let subCategory = item.subCat ? item.subCat : [];
      setselectedMenu({
        ...item,
        name: item.name,
        subCat: subCategory,
        desc: item.desc,
      });
      if (item.key == 'exportNotebook') {
        const currentNotebook =
          props.notebooks.allNotebooks.byId[props.allActiveItem.notebook];
        if (currentNotebook) {
          exportCompleteNotebook(currentNotebook, props);
          props.noteBookpanelClose();
        } else {
          alert('Create a new notebook');
        }
      }
      if (item.key == 'password') {
        // console.log("password123");
        props.actions.auditingAction.isPasswordMain({ message: true });
        props.noteBookpanelClose();
        // props.noteBookpanelClose()
      }
      if (item.key == 'pageSet') {
        props.actions.optionsAction.isOptions({ message: false });
        props.actions.auditingAction.isAuditMain({ message: false });
        props.actions.auditingAction.isPasswordMain({ message: false });
        props.OpenPageSetup(true);
        console.log('here tooo');
        props.noteBookpanelClose();
      }
      if (item.key === 'print') {
        const { activeItems, selectedPivotItem } = props.notebookState;
        if (activeItems && activeItems.length && selectedPivotItem) {
          activeItems.some((item: any) => {
            if (item.id === selectedPivotItem) {
              switch (item.type) {
                case 'worksheet':
                  handleWorksheetPrint(...evData);
                  break;
                case 'report':
                  handleReportPrint();
                  break;
                case 'graphPage':
                  handleGraphPrint();
                  break;
              }
              return true;
            }
            return false;
          });
        }
        props.noteBookpanelClose();
      }
      if (item.key == 'save') {
        const currentNotebook =
          props.notebooks.allNotebooks.byId[props.allActiveItem.notebook];
        if (currentNotebook) {
          saveNotebook([currentNotebook], props, true);
          props.noteBookpanelClose();
        } else {
          alert('Create a new notebook');
        }

        // toggleTeachingBubbleVisible();
      }
      if (item.key == 'saveall') {
        const allNbk = Object.values(props.notebooks.allNotebooks.byId);
        if (allNbk) {
          saveNotebook(allNbk, props, true);
          props.noteBookpanelClose();
        } else {
          alert('Create a new notebook');
        }
        // toggleTeachingBubbleVisible();
      }
      // if(item.name == 'Auditing'){
      //   toggleAuditTeachingBubbleVisible();
      // }
      if (item.key == 'auditing') {
        console.log('Auditing');
        props.actions.auditingAction.isAuditMain({ message: true });
        props.OpenPageSetup(false);
        props.actions.optionsAction.isOptions({ message: false });
        props.actions.auditingAction.isPasswordMain({ message: false });
        props.noteBookpanelClose();
      }
      if (item.key == 'options') {
        props.actions.auditingAction.isAuditMain({ message: false });
        props.OpenPageSetup(false);
        props.actions.auditingAction.isPasswordMain({ message: false });
        props.actions.optionsAction.isOptions({ message: true });
        props.noteBookpanelClose();
      }
      if (item.key == 'exit') {
        const allNbk = Object.values(props.notebooks.allNotebooks.byId);
        let latProp = { ...props };
        console.log(allNbk);
        console.log(latProp);
        let isAllNbkAlreadySaved = true;
        if (allNbk.length > 0) {
          for (let i = 0; i < allNbk.length; i++) {
            if (allNbk[i].isSaved === undefined) {
              const updateState = deleteItem(allNbk[i], latProp);
              latProp = getUpdatedNewProps(latProp, updateState);
             ipcRenderer.send('window_close_all');
            } else {
              isAllNbkAlreadySaved = false;
              popupWarningMsgDailog({
                title: version,
                subText: `Save changes to ${allNbk[i].name} ?`,
                key: ITEM_TYPE.SAVE_ALERT,
                currItem: allNbk[i],
                multipleNbk: allNbk,
              });
              break;
            }
            if (isAllNbkAlreadySaved) {
             ipcRenderer.send('window_close_all');
            }
          }
        } else {
          //  console.log(`ELSE STATEMENT: length is equal to 0`);
         ipcRenderer.send('window_close_all');
        }

        // props.actions.optionsAction.isExit({message: true});
        // const allNbk = Object.values(props.notebooks.allNotebooks.byId);
        // saveNotebook(allNbk, props, true).then(() => {
        //   ipcRenderer.send('window_close_all');
        // })
        //
        // document.getElementById('close-btn').click();
        // closeWindowOnClick();
        // props.noteBookpanelClose()
      }

      if (item.key === 'open') {
        props.noteBookpanelClose();
        const decData = await fileOpen(props);
        if (decData.code === 500) {
          alert(decData.message);
        } else if (decData.code === 20) {
          console.log(decData.code, decData.message);
        } else {
          setDecodeInfo(decData);
          props.actions.auditingAction.updateEncrpPass({
            message: { decData: decData, props: props },
          });
          const currNbkId = decData.allNotebooks.allNotebooksId[0];
          const currNbk = decData.allNotebooks.byId[currNbkId];
          console.log(currNbk.password.password);
          console.log(currNbk);
          if (currNbk.password.password) {
            // setIsPass(true);
            props.actions.auditingAction.isOpenNotePass({ message: true });
          } else {
            openNotebookFile(decData, props);
          }
        }
      }

      // if(item.key === 'print') {

      //     let active_item = props.allActiveItem;
      //     if (active_item.graphPage.id && active_item.graphPage.id !== null) {
      //       console.log('inside graph');
      //     } else if (active_item.worksheet && active_item.worksheet !== null) {
      //       console.log('inside spreadsheet');
      //       var ele = document.querySelector('.spreadsheetComponent');
      //       print(ele);
      //     } else if (active_item.report && active_item.report !== null) {
      //       // console.log('inside report');
      //       props.reportInstance.documentEditor.editorHistory.undo();
      //     } else {
      //       console.log('not openend any thing');
      //     }
      // }
    }

    if (item && item.name == '') {
      props.noteBookpanelClose();
    }
  };

  const openSubmenu = (item: Object) => {
    console.log(item);
    if (item.key == 'importjdbc') {
      if (props.importDBState.isOpenJDBCConn) {
        props.actions.importDBAction.isOpenJDBCConn({ message: false });
      }
      props.actions.importDBAction.isOpenJDBCConn({ message: true });
    }
    if (item.key == 'importodbc') {
      if (props.importDBState.isOpenImportDB) {
        props.actions.importDBAction.isOpenImportDB({ message: false });
      }
      props.actions.importDBAction.isOpenImportDB({ message: true });
    }
    if (item.key == 'fileimport') {
      if (props.importfileState.isOpenImportfile) {
        props.actions.importfileAction.isOpenImportfile({ message: false });
      }
      props.actions.importfileAction.isOpenImportfile({ message: true });
    }
    if (item.key == 'exportgraph') {
      console.log('exportgraph');
      props.OpenHelpWindow('wbasics', 'export_graphic', '');

      // props.actions.importfileAction.isOpenImportfile({message: true})
    }
    if (item.key == 'exporttxt') {
      props.exportInstance.documentEditor.save('sample', 'Txt');
      // props.actions.importfileAction.isOpenImportfile({message: true})
    }
    if (item.key == 'exportword') {
      props.exportInstance.documentEditor.save('sample', 'Docx');
      // props.actions.importfileAction.isOpenImportfile({message: true})
    }
    if (item.key == 'exportpdf') {
      exportAsPdf();
      // props.actions.importfileAction.isOpenImportfile({message: true})
    }
    if (item.key == 'exportworksheet') {
      // document.getElementById('worksheetID').click();
      exportWorksheet();
      // props.actions.importfileAction.isOpenImportfile({message: true})
    }

    if (item.key == 'sigmaPlotNotebook') {
      const currentNotebook =
        props.notebooks.allNotebooks.byId[props.allActiveItem.notebook];
      openSaveAs(currentNotebook, props, true);
    }
    if (item.key === 'quickPrint') {
      console.log('in here');
      printFunctionality();
    }
    props.noteBookpanelClose();
  };

  // used for rendered custom svg icons for menu items, as default Nav tag has limitation for using custom icons for menu items.
  function onRenderLink(props) {
    console.log(props, 'I am Not Ready-->');
    return (
      <Link
        className="menuLinks"
        style={{ color: 'inherit', boxSizing: 'border-box' }}
        to={props.href}
        onClick={(...evData) => onLinkClick(props.link, ...evData)}
      >
        <TooltipHost
          content={props.link.desc}
          closeDelay={10}
          id={props.link.key}
          calloutProps={calloutProps}
          styles={styles}
          directionalHint={DirectionalHint.bottomCenter}
        >
          <span style={{ display: 'flex' }} aria-describedby={props.link.key}>
            {!!props.iconProps && (
              <img
                src={ConstantImage[props.iconProps.iconName]}
                style={{ width: '14%', marginRight : '3%'}}
              />
            )}
            {props.title}
          </span>
        </TooltipHost>
      </Link>
    );
  }

  const printFunctionality = () => {
    let active_item = props.allActiveItem;
    if (active_item.graphPage.id && active_item.graphPage.id !== null) {
      console.log('inside graph');
    } else if (active_item.worksheet && active_item.worksheet !== null) {
      console.log('inside spreadsheet');
      var ele = document
        .getElementsByClassName('spreadsheetComponent')[0]
        .print(ele);
      ipcRenderer.send('print-to-pdf', ele);

      // print(ele);
    } else if (active_item.report && active_item.report !== null) {
      // console.log('inside report');
      props.reportInstance.documentEditor.editorHistory.undo();
    } else {
      console.log('not openend any thing');
    }
  };

  const onCreateWorksheet = () => {
    const activeSec =
      props.notebooks.allSections.byId[props.allActiveItem.section];
    if (activeSec && !activeSec.worksheetId && activeSec.graphPage.length) {
      props.actions.worksheetDialogHide(false);
    } else {
      createWorksheet(props);
    }
  };

  const onMenuItemClick = (key) => {
    // console.log(ele)
    if (key == 'keyNotebook') {
      console.log('Notebook');
      createNotebook(props);
      props.noteBookpanelClose();
    } else if (key == 'keyWorksheet') {
      console.log('Worksheet');
      onCreateWorksheet();
      props.noteBookpanelClose();
    } else if (key == 'graphPage') {
      console.log('Graph Page');
      createGraphPage(props);
      props.noteBookpanelClose();
    } else if (key == 'report') {
      console.log('Report');
      createReport(props);
      props.noteBookpanelClose();
    } else if (key == 'transform') {
      console.log('Transform');
      createTransform(props);
      props.noteBookpanelClose();
    } else if (key == 'equation') {
      console.log('Equation');
      props.TransformAction.isOpenEquation({
        message: true,
      });
      props.noteBookpanelClose();
    } else if (key == 'section') {
      console.log('Section');
      createBlankSection(props);
      props.noteBookpanelClose();
    }
    if (key == 'importjdbc') {
      if (props.importDBState.isOpenJDBCConn) {
        props.actions.importDBAction.isOpenJDBCConn({ message: false });
      }
      props.actions.importDBAction.isOpenJDBCConn({ message: true });
      props.noteBookpanelClose();
    }
    if (key == 'importodbc') {
      if (props.importDBState.isOpenImportDB) {
        props.actions.importDBAction.isOpenImportDB({ message: false });
      }
      props.actions.importDBAction.isOpenImportDB({ message: true });
      props.noteBookpanelClose();
    }
  };

  const subMenuRender = (subItem, listClassName) => {
    return (
      <li key={subItem.key} className={listClassName} id={subItem.name}>
        <img alt="ribbon-icon" src={ConstantImage[subItem.imgSrc]} />
        <div>
          <p className="sub-title">{subItem.name}</p>
          <p className="sub-desc">{subItem.desc}</p>
        </div>
      </li>
    );
  };

  const disableMenu = (subItem) => {
    if (!props.allActiveItem.notebook) {
      if (
        subItem.key === 'exportworksheet' ||
        subItem.key === 'fileimport' ||
        subItem.key === 'importjdbc' ||
        subItem.key === 'importodbc' ||
        subItem.key === 'sigmaPlotNotebook'
      ) {
        return ' disableListItem';
      }
    }
    console.log('sub item', subItem);
    if (!props.allActiveItem.worksheet) {
      console.log(props.allActiveItem);
      console.log('props file', props);
      console.log('sub item', subItem);
      if (
        subItem.key === 'exportworksheet' ||
        subItem.key === 'fileimport' ||
        subItem.key === 'importjdbc' ||
        subItem.key === 'importodbc' ||
        subItem.key === 'saveas'
      ) {
        return ' disableListItem';
      }
    }
    if (!props.allActiveItem.report) {
      if (
        subItem.key === 'exportpdf' ||
        subItem.key === 'exportword' ||
        subItem.key === 'exporttxt'
      ) {
        return ' disableListItem';
      }
    }
    if (!props.allActiveItem.graphPage) {
      if (subItem.key === 'exportgraph') {
        return ' disableListItem';
      }
    }
  };

  const openFileDirectlyFromPath = async (path: any) => {
    let decData = await fileOpenWithPath(path);
    console.log('decData', decData);
    if (decData.code == 'ENOENT') {
      alert(decData.message);
      props.deleteSavedFileAction(path);
    } else if (decData.code) {
      alert('Something went wrong.');
    } else {
      setDecodeInfo(decData);
      props.actions.auditingAction.updateEncrpPass({
        message: { decData: decData, props: props },
      });
      const currNbkId = decData.allNotebooks.allNotebooksId[0];
      const currNbk = decData.allNotebooks.byId[currNbkId];
      console.log(currNbk.password.password);
      console.log(currNbk);
      if (currNbk.password.password) {
        // setIsPass(true);
        props.actions.auditingAction.isOpenNotePass({ message: true });
      } else {
        openNotebookFile(decData, props);
      }
    }
    props.noteBookpanelClose();
  };
  const dialogContentProps = {
    type: DialogType.normal,
    title: version,
    subText: warningMsgProps.subText
  };
  const modalProps = React.useMemo(
    () => ({
    isBlocking: true,
      styles: modalPropsStyles,
     
  }),
    [],
  );
  let recentFile = props.recentSavedFile
    ? Object.values(props.recentSavedFile)
    : [];
  return (
    <>
      <Panel
        className="noteBookpanel-slide"
        isOpen={props.noteBookpanel}
        type={PanelType.customNear}
        customWidth="500px"
        onDismiss={props.noteBookpanelClose}
        // closeButtonAriaLabel="Close"
        hasCloseButton={false}
        isLightDismiss
      >
        {/* {
        teachingBubbleVisible && (
          <TeachingBubble
            target={'[name="Save"]'}
            // primaryButtonProps={examplePrimaryButtonProps}
            secondaryButtonProps={exampleSecondaryButtonProps}
            onDismiss={toggleTeachingBubbleVisible}
            headline="Save"
          >
            {bubbleObj.message}
            {'Seamlessly share files between Mac and Windows.'}
          </TeachingBubble>
        )
      }
      {
        teachingAuditBubbleVisible && (
          <TeachingBubble
          target={'[name="Auditing"]'}
            // primaryButtonProps={examplePrimaryButtonProps}
            secondaryButtonProps={exampleSecondaryAuditProps}
            onDismiss={toggleAuditTeachingBubbleVisible}
            headline="Audit Trail"
          >
            {bubbleObj.message}
            {"To enhance and improve scientific research quality, SigmaPlot provides password support with an audit trail to protect data integrity. It can also capture footprints of all changes made to a protected worksheet. You can also quickly restore any data you've changed"}
          </TeachingBubble>
        )
      } */}

        {
          <>
            <Dialog
              hidden={hideDialog}
              onDismiss={()=>{
                dailog_CANCEL_OnClick(warningMsgProps)
              }}
              dialogContentProps={dialogContentProps}
              modalProps={modalProps}
              //  hidden={this.state.hideWarningDialog}
              // onDismiss={() =>
              //   this.dailog_CANCEL_OnClick(this.state.warningMsgProps)
              // }
              // dialogContentProps={this.state.warningMsgProps}
              // modalProps={this.warningModalProps}
            >
              <DialogFooter>
                <DefaultButton
                  onClick={() =>
                    dailog_YES_OnClick(warningMsgProps)
                  }
                  text="Yes"
                />
                <DefaultButton
                  onClick={() =>
                    dailog_NO_OnClick(warningMsgProps)
                  }
                  text="No"
                />
                <DefaultButton
                  onClick={() =>
                    dailog_CANCEL_OnClick(warningMsgProps)
                  }
                  text="Cancel"
                />
              </DialogFooter>
            </Dialog>
            <Dialog
              hidden={hideWrkDialog}
              onDismiss={toggleHideWrkDialog}
              dialogContentProps={wrkDialogContentProps}
              modalProps={wrkModalProps}
            >
              <DialogFooter>
                <DefaultButton
                  onClick={() => {
                    createWorksheet(props);
                  }}
                  text={t('OK')}
                />
                <DefaultButton
                  onClick={toggleHideWrkDialog}
                  text={t('Cancel')}
                />
              </DialogFooter>
            </Dialog>
          </>
        }
        <div className="notebook-continer">
          {props.toggleOpen && (
            <>
              <div className="mainMenuContents">
                <Nav
                  className="menuLinks"
                  selectedKey={'quickStart'}
                  ariaLabel="Nav bar"
                  styles={navStyles}
                  groups={navLinkGroups}
                  linkAs={onRenderLink}
                />
                <div
                  className="mainMenuContentsRecent"
                  style={
                    selectedMenu.subCat.length > 0
                      ? { backgroundColor: 'white' }
                      : {}
                  }
                >
                  {selectedMenu.subCat.length > 0 ? (
                    <h4 className="mainMenuContentsRecent-text">
                      {selectedMenu.desc}
                    </h4>
                  ) : (
                    <h4 className="mainMenuContentsRecent-text">
                      {t('Recent Documents')}
                    </h4>
                  )}
                  <ul
                    className="menuLinks subItems"
                    // onClick={onMenuItemClick}
                  >
                    {selectedMenu.subCat.length > 0 ? (
                      selectedMenu.subCat.map((subItem) => {
                        console.log(
                          subItem.key,
                          selectedMenu.key === 'keyOpen'
                        );
                        if (
                          selectedMenu.key === 'newKey' &&
                          subItem.key !== 'keyNotebook'
                        ) {
                          let listClassName = 'subListItem';
                          console.log(
                            Object.values(props.notebooks.allNotebooks.byId)
                          );
                          if (
                            !Object.values(props.notebooks.allNotebooks.byId)
                              .length
                          ) {
                            listClassName = `${listClassName} disableListItem`;
                          }

                          return (
                            <li
                              key={subItem.key}
                              className={listClassName}
                              id={subItem.name}
                              onClick={() => onMenuItemClick(subItem.key)}
                            >
                              <img
                                alt="ribbon-icon"
                                src={ConstantImage[subItem.imgSrc]}
                              />
                              <TooltipHost
                                content={t(subItem.desc)}
                                closeDelay={10}
                                id={subItem.key}
                                calloutProps={calloutProps}
                                styles={styles}
                                directionalHint={DirectionalHint.bottomCenter}
                              >
                                <div>
                                  <p className="sub-title">{t(subItem.name)}</p>
                                  <p className="sub-desc">{t(subItem.desc)}</p>
                                </div>
                              </TooltipHost>
                            </li>
                          );
                        } else if (
                          selectedMenu.key === 'keyOpen' &&
                          subItem.key !== 'fileimport'
                        ) {
                          let listClassName = 'subListItem';
                          if (props.allActiveItem.report) {
                            listClassName = `${listClassName} disableListItem`;
                          }

                          return (
                            <li
                              key={subItem.key}
                              className={listClassName + disableMenu(subItem)}
                              id={subItem.name}
                              onClick={() => onMenuItemClick(subItem.key)}
                            >
                              <img
                                alt="ribbon-icon"
                                src={ConstantImage[subItem.imgSrc]}
                              />
                              <TooltipHost
                                content={t(subItem.desc)}
                                closeDelay={10}
                                id={subItem.key}
                                calloutProps={calloutProps}
                                styles={styles}
                                directionalHint={DirectionalHint.bottomCenter}
                              >
                                <div>
                                  <p className="sub-title">{t(subItem.name)}</p>
                                  <p className="sub-desc">{t(subItem.desc)}</p>
                                </div>
                              </TooltipHost>
                            </li>
                          );
                        } else if (selectedMenu.key === 'saveas') {
                          let listClassName = 'subListItem';
                          if (props.allActiveItem.notebook) {
                            listClassName = `${listClassName} disableListItem`;
                            console.log(listClassName);
                          }

                          return (
                            <li
                              key={subItem.key}
                              className={listClassName + disableMenu(subItem)}
                              id={subItem.name}
                              onClick={() =>{
                                onMenuItemClick(subItem.key)
                                openSubmenu(subItem);
                              }
                            }
                            >
                              <img
                                alt="ribbon-icon"
                                src={ConstantImage[subItem.imgSrc]}
                              />
                              <TooltipHost
                                content={t(subItem.desc)}
                                closeDelay={10}
                                id={subItem.key}
                                calloutProps={calloutProps}
                                styles={styles}
                                directionalHint={DirectionalHint.bottomCenter}
                              >
                                <div>
                                  <p className="sub-title">{t(subItem.name)}</p>
                                  <p className="sub-desc">{t(subItem.desc)}</p>
                                </div>
                              </TooltipHost>
                            </li>
                          );
                        } else {
                          console.log('Hiiiiiiiiii');
                          return (
                            <li
                              key={subItem.key}
                              className="subListItem"
                              id={subItem.name}
                              onClick={() => {
                                openSubmenu(subItem);
                                onMenuItemClick(subItem.key);
                              }}
                            >
                              <img
                                alt="ribbon-icon"
                                src={ConstantImage[subItem.imgSrc]}
                              />
                              <TooltipHost
                                content={t(subItem.desc)}
                                closeDelay={10}
                                id={subItem.key}
                                calloutProps={calloutProps}
                                styles={styles}
                                directionalHint={DirectionalHint.bottomCenter}
                              >
                                <div>
                                  <p className="sub-title">{t(subItem.name)}</p>
                                  <p className="sub-desc">{t(subItem.desc)}</p>
                                </div>
                              </TooltipHost>
                            </li>
                          );
                        }
                      })
                    ) : (
                      <>
                        {recentFile.map((item, index) => {
                          return (
                            <li
                              className="recentFile"
                              onClick={() =>
                                openFileDirectlyFromPath(item.path)
                              }
                            >
                              <TooltipHost
                                content={item.path}
                                closeDelay={10}
                                id={item.path}
                                calloutProps={calloutProps}
                                styles={styles}
                                directionalHint={DirectionalHint.bottomCenter}
                              >
                                {index + 1} {item.path_shortHand}
                              </TooltipHost>
                            </li>
                          );
                        })}
                      </>
                      // <li onClick={openFileDirectlyFromPath}></li>
                    )}
                  </ul>
                </div>
              </div>
            </>
          )}
          {/* <input type="file" ></input> */}
        </div>
      </Panel>
      {/* {props.transformState.isOpenUserDefined && (
          <UserDefinedCompontent />
      )} */}
      {/* {props.optionsState.isOptions && (
          <Options />
      )} */}
    </>
  );
}

function mapStateToProps(state: IState) {
  return {
    notebooks: state.notebookReducer.notebooks,
    activeItems: state.notebookReducer.activeItems,
    allActiveItem: state.notebookReducer.allActiveItem,
    importDBState: state.importDBReducer,
    importfileState: state.ImportfileReducer,
    allNotebookId: state.notebookReducer.allNotebookId,
    isWorksheetDialogOpen: state.mainWindowReducer.isHideWorksheetDialog,
    transformState: state.transformReducer,
    exportInstance: state.instanceReducer.exportInstance,
    auditingState: state.auditingReducer,
    optionsState: state.optionsReducer,
    openWorksheets: state.worksheetOperationReducer.openWorksheets,
    licenseInfo: state.licenseInfoReducer,
    notebookState: state.notebookReducer,
    recentSavedFile: state.recentSavedFileReducer,
    referenceObjectState: state.instanceReducer.instance,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    OpenPageSetup: (message) => dispatch(actionCreators.setpageSetup(message)),

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
    clearNotebooks: () => {
      dispatch({ type: 'CLEAR_NOTEBOOK' });
      dispatch({ type: 'CLEARNOTEBOOK' });
    },
    createNotebook: (nobj: INotebook) => {
      dispatch({ type: 'CREATE_NOTEBOOK', payload: nobj });
    },
    setActiveItem: (activeItem: IActiveItems) => {
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: activeItem });
    },
    setAllActiveItem: (allactiveItem: IActiveItems) => {
      dispatch({ type: 'SET_ALL_ACTIVE_ITEM', payload: allactiveItem });
    },
    addSection: (newSection: IActiveItems) => {
      dispatch({ type: 'ADD_SECTION', payload: newSection });
    },
    addReport: (newReport: IActiveItems) => {
      dispatch({ type: 'ADD_REPORT', payload: newReport });
    },
    addTransform: (newTransform: IActiveItems) => {
      dispatch({ type: 'ADD_TRANSFORM', payload: newTransform });
    },
    addEquation: (newEquation: IActiveItems) => {
      dispatch({ type: 'ADD_EQUATION', payload: newEquation });
    },
    setSelectedPivotItem: (pvtItem) => {
      dispatch({ type: 'SET_SELECTED_PIVOT_ITEM', payload: pvtItem });
    },
    addGraphPage: (graphPage) => {
      dispatch({ type: 'ADD_GRAPHPAGE', payload: graphPage });
    },
    saveItem: (item) => {
      dispatch({ type: 'SAVE_ITEM', payload: item });
    },
    actions: {
      importDBAction: bindActionCreators(importDBAction, dispatch),
      importfileAction: bindActionCreators(importfileAction, dispatch),
      worksheetDialogHide: bindActionCreators(isWorksheetDialogHide, dispatch),
      auditingAction: bindActionCreators(auditingAction, dispatch),
      optionsAction: bindActionCreators(optionsAction, dispatch),
      storeWorksheet: bindActionCreators(storeWorksheet, dispatch),
      setActiveWorksheet: bindActionCreators(setActiveWorksheet, dispatch),
      storeGraph: bindActionCreators(storeGraph, dispatch),
      ProgressAction: bindActionCreators(ProgressAction, dispatch),
     
    },
    deleteItem: (item) => {
      dispatch({ type: 'DELETE_ITEM', payload: item });
    },
    addWorksheet: (item) => {
      dispatch({ type: 'ADD_WORKSHEET', payload: item });
    },
    TransformAction: bindActionCreators(transformAction, dispatch),
    pasteItem: (item) => {
      dispatch({ type: 'PASTE_ITEM', payload: item });
    },
    summaryInfoAction: bindActionCreators(summaryInfoAction, dispatch),
    recentSavedFileAction: bindActionCreators(recentSavedFileAction, dispatch),
    deleteSavedFileAction: bindActionCreators(deleteAllFileAction, dispatch),
    isReRenderGraph: bindActionCreators(isReRenderGraph, dispatch),
    updateGraphProperty: (item) => {
      dispatch({ type: ACTION.UPDATE_GRAPH_PROPERTY, payload: item });
    },
    saveAllFileAction: bindActionCreators(saveAllFileAction, dispatch),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MainMenu);
