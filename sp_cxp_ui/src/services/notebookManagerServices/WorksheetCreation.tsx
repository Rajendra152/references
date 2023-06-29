import {
  NotebookProps,
  SectionProps,
  WorksheetProp,
  GraphPageProps,
  ReportProps,
} from './NotebookManagerInterfaces'

import {
  getDefaultSectionObject,
  getDefaultWorksheet,

 } from "./GetDefaultObject";

import * as ITEM_TYPE from './ConstantsNotebookManager'
import { checkIsNameUnique } from "../NotebookManagerServicesNew";
import {
  setWorksheetData,
} from './../../services/WorksheetServicesNew';
 export const createNewWorksheet = async (props:any, clickedItem?:NotebookProps | SectionProps | WorksheetProp | GraphPageProps | ReportProps, sheetData?: any, sheetDataHead?: any) => {
  let notebookId = props.allActiveItem.notebook;
  let sectionId = props.allActiveItem.section;


  // this check Is from context Menu creation
  if (clickedItem) {
    if (clickedItem.type === ITEM_TYPE.NOTEBOOK) {
      //create new worksheet with new section alwyas at top level
      return createSectionWithWorksheet(props, clickedItem, sheetData, sheetDataHead)

    }
    else if (clickedItem.type === ITEM_TYPE.SECTION) {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.id;
    }
    else {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.parentSectionId;
    }
  }
  else if(!sectionId){
    // no active section than created at top level with section
    return createSectionWithWorksheet(props, undefined, sheetData || [], sheetDataHead || [])
  }

  const activeNotebook = JSON.parse(JSON.stringify(props.notebooks.allNotebooks.byId[notebookId]));
  const activeSection = JSON.parse(JSON.stringify(props.notebooks.allSections.byId[sectionId]));

  if(activeSection && activeSection.worksheetId){
    // create new worksheet with new Section at that appropriate level only
    return createSectionWithWorksheet(props, clickedItem, sheetData || [], sheetDataHead || [])
  }
  else {
    let dataName = `Data ${activeNotebook.worksheetLength+1}`;
    let dataLen = activeNotebook.worksheetLength+1;

    while(!checkIsNameUnique(dataName,activeNotebook.id, props)){
      dataLen =  dataLen+1;
      dataName = `Data ${dataLen}`;
    }

    const worksheetObject = getDefaultWorksheet(
      `Data${dataLen}`,
      `Data ${dataLen}`,
      notebookId,
      activeSection.id,
      props.licenseInfo?.userName,
      sheetData || [],
      sheetDataHead || []
    );

    let newAllGrPg:any =  null;
    if(activeSection.graphPage.length){
      newAllGrPg = {};
     activeSection.graphPage.map( (grPgId:string) => {
       const obj =  JSON.parse(JSON.stringify(props.notebooks.allGraphPages.byId[grPgId]));
       obj.worksheetId = worksheetObject.id;
       newAllGrPg[grPgId] = obj;
     })
    }

    worksheetObject.level = activeSection.level;
    worksheetObject.parentLoop = [...activeSection.parentLoop, activeSection.id];

    activeSection.worksheetId = worksheetObject.id;
    activeSection.activeChild = worksheetObject.id;
    activeSection.allAssetsId.push(worksheetObject.id);

    activeNotebook.worksheetLength = dataLen;
    activeNotebook.allWorksheetsId.push(worksheetObject.id);
    activeNotebook.allAssetsId.push(worksheetObject.id);
    activeNotebook.activeSection = activeSection.id;
    activeNotebook.activeChild = worksheetObject.id;
    activeNotebook.isSaved = false;

    const newAllNotebooks  = {
      newNbk: {...activeNotebook},
      newSec: {...activeSection},
      newWrk: worksheetObject,
      newAllRep: newAllGrPg
    }

    const newActiveItem = {
      ...props.allActiveItem,
      notebook: notebookId,
      section: sectionId,
      worksheet: worksheetObject.id,
      report: null,
      graphPage: {
        id: '',
        object: ''
      },
      selectedItemOnNotebook: worksheetObject.id,
      cursor: worksheetObject.id
    };
    if(sheetData){
      const clientData = await setWorksheetData(
        sheetData,
        worksheetObject.id
      );
      props.actions.storeWorksheet(clientData);
      props.actions.setActiveWorksheet(clientData.key);
      const sheetHeadData = await setWorksheetData(
        sheetDataHead,
        'sheetHead' + worksheetObject.id
      );
      props.actions.storeWorksheet(sheetHeadData);
      const reduxSheetHeadData = await setWorksheetData(
        [],
        'reduxHead' + worksheetObject.id
      );
      props.actions.storeWorksheet(reduxSheetHeadData);
    }
    const newSummary = {
      id:worksheetObject.id,
      type:worksheetObject.type,
      createdDate: worksheetObject.createdDate,
      modifiedDate: worksheetObject.modifiedDate,
      author:worksheetObject.author,
      description:worksheetObject.description
    }
    props.summaryInfoAction(newSummary)

    props.setActiveItem(worksheetObject);
    props.addWorksheet(newAllNotebooks);
    props.setAllActiveItem(newActiveItem);
    props.setSelectedPivotItem(worksheetObject.id);

    return worksheetObject;
  }
};


export const createSectionWithWorksheet = async (props: any, clickedItem?:NotebookProps | SectionProps | WorksheetProp, gridData ?: any, sheetDataHead?: any) => {
  let notebookId = props.allActiveItem.notebook;
  let sectionId = props.allActiveItem.section;

  // if from context menu editing NotebookID
  if (clickedItem) {
    if (clickedItem.type === ITEM_TYPE.NOTEBOOK) {
      notebookId = clickedItem.id;
    } else {
      notebookId = clickedItem?.parentNotebookId;
    }
  }

  const activeNotebook = JSON.parse(JSON.stringify(props.notebooks.allNotebooks.byId[notebookId]));
  let secName = `Section ${activeNotebook.sectionLength+1}`;
  let secLen = activeNotebook.sectionLength+1;

  while(!checkIsNameUnique(secName,activeNotebook.id, props)){
    secLen = secLen+1;
    secName = `Section ${secLen}`
  }

  const sectionObject = getDefaultSectionObject(
    `Sec${secLen}`,
    `Section ${secLen}`,
    notebookId,
    props.licenseInfo?.userName
  );

  // clickedItem comming from context Menu only

  if(clickedItem){
    if(clickedItem.type == 'notebook'){
      sectionObject.parentLoop = [notebookId]
    }
    else if (clickedItem.type == 'section') {
      //[n1,s1,s2,s3,s4,s5]
      if(clickedItem.parentLoop.length>1){
        const topSec = JSON.parse(JSON.stringify(props.notebooks.allSections.byId[clickedItem.parentLoop[1]]))
        sectionObject.parentSectionId = topSec.id;
        sectionObject.parentLoop = [...topSec.parentLoop,topSec.id];
        sectionObject.level = topSec.level+1;
      }
      else{

        sectionObject.parentSectionId = clickedItem.parentSectionId;
        sectionObject.parentLoop = [...clickedItem.parentLoop]
        sectionObject.level = clickedItem.level;
      }

    }
    else {
      //[n1,s1,s2,s3,s4,s5]
      let topSec:any
      if(clickedItem.parentLoop.length>2){
        topSec = JSON.parse(JSON.stringify(props.notebooks.allSections.byId[clickedItem.parentLoop[2]]));
      }
      else{
        topSec =JSON.parse(JSON.stringify(props.notebooks.allSections.byId[clickedItem.parentSectionId]));
      }
      sectionObject.parentSectionId = topSec.parentSectionId;
      sectionObject.parentLoop = [...topSec.parentLoop];
      sectionObject.level = topSec.level;
    }

  }
  else {
    //sectionObject.parentSection = sectionId;
    if(sectionId){
      const activeSec = props.notebooks.allSections.byId[sectionId];
      if(activeSec.parentLoop.length>1){
        const topSec = props.notebooks.allSections.byId[activeSec.parentLoop[1]];
        sectionObject.parentSectionId = topSec.id;
        sectionObject.parentLoop = [...topSec.parentLoop,topSec.id];
        sectionObject.level = topSec.level+1;
      }
      else{
        sectionObject.parentSectionId = activeSec.parentSectionId;
        sectionObject.parentLoop = [...activeSec.parentLoop]
        sectionObject.level = activeSec.level;
      }
    }
    else{
      sectionObject.parentLoop = [activeNotebook.id]
    }

  }

  // if no active section means null then it create at top level

  let parentSec = null;
  if(sectionObject.parentSectionId){
    parentSec = JSON.parse(JSON.stringify(props.notebooks.allSections.byId[sectionObject.parentSectionId]))
    parentSec.children.push(sectionObject.id);
  }
  else{
    activeNotebook.children.push(sectionObject.id);
  }

  let dataName = `Data ${activeNotebook.worksheetLength+1}`;
  let dataLen = activeNotebook.worksheetLength+1;

  while(!checkIsNameUnique(dataName, activeNotebook.id, props)){
    dataLen = dataLen+1;
    dataName = `Data ${dataLen}`
  }

  const worksheetObject = getDefaultWorksheet(
    `Data${dataName}`,
    `Data ${dataLen}`,
    notebookId,
    sectionObject.id,
    props.licenseInfo?.userName,
    gridData || [],
    sheetDataHead || []
  );

  console.log(worksheetObject, "worksheetObject")
  worksheetObject.level = sectionObject.level;
  worksheetObject.parentLoop = [...sectionObject.parentLoop, sectionObject.id];

  sectionObject.allAssetsId.push(worksheetObject.id);
  sectionObject.activeChild = worksheetObject.id;
  sectionObject.worksheetId = worksheetObject.id;

  activeNotebook.sectionLength = secLen;
  activeNotebook.worksheetLength = dataLen;
  activeNotebook.allSectionsId.push(sectionObject.id)
  activeNotebook.allAssetsId.push(worksheetObject.id)
  activeNotebook.allWorksheetsId.push(worksheetObject.id)
  activeNotebook.activeChild = worksheetObject.id;
  activeNotebook.activeSection = sectionObject.id;
  activeNotebook.isSaved = false;
  if(gridData){
    const clientData = await setWorksheetData(
      gridData,
      worksheetObject.id
    );
    props.actions.storeWorksheet(clientData);
    props.actions.setActiveWorksheet(clientData.key);
    const sheetHeadData = await setWorksheetData(
      sheetDataHead,
      'sheetHead' + worksheetObject.id
    );
    props.actions.storeWorksheet(sheetHeadData);
    const reduxSheetHeadData = await setWorksheetData(
      [],
      'reduxHead' + worksheetObject.id
    );
    props.actions.storeWorksheet(reduxSheetHeadData);
    // props.actions.setActiveWorksheet(clientData.key);
  }
  const newAllNotebooks  = {
    newNbk: {...activeNotebook},
    newSec: sectionObject,
    newParSec: parentSec,
    newWrk: worksheetObject,
  }

  const newActiveItem = {
    ...props.allActiveItem,
    notebook: notebookId,
    section: sectionObject.id,
    worksheet: worksheetObject.id,
    report: null,
    graphPage: {
      id: null,
      object: null
    },
    selectedItemOnNotebook: worksheetObject.id,
    cursor: worksheetObject.id
  };
  const newSummary = {
    id:worksheetObject.id,
    type:worksheetObject.type,
    createdDate: worksheetObject.createdDate,
    modifiedDate: worksheetObject.modifiedDate,
    author:worksheetObject.author,
    description:worksheetObject.description
  }
  props.summaryInfoAction(newSummary)
  props.setActiveItem(worksheetObject);
  props.setAllActiveItem(newActiveItem);
  props.setSelectedPivotItem(worksheetObject.id);
  props.addSection(newAllNotebooks);
  return sectionObject;

};
