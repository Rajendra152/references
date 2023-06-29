// const dispatch = store.dispatch;

// import {
//   IActiveItem
// } from '../components/Redux/notebookReducer';

// import { IWorksheet } from '../components/CanvasManager/CanvasManagerNew';
import { getNotebookFilePath, setNotebookFilePath } from './RedisServices'

const {remote} = require('electron');
const fs = require('fs');
const dialog = remote.dialog;
const browserWindow = remote.getCurrentWindow();

export const checkStatus = () => {
  //import { store } from "../../src/components/App/App";
  const store = require('../../src/components/App/App');

  console.log('I am checker');
  console.log(store.store.getState());
};

export interface NotebookProps {
  id: string;
  name: string;
  type: string;
  children: SectionProps[];
  allSectionId: [];
  allAssetsId: string[];
  allWorksheetId: string[];
  allReportId: string[];
  allGraphPageId: string[];
  createdDate: Date;
  modifiedDate: Date;
}

export interface SectionProps {
  id: string;
  name: string;
  parentNotebookId?: string;
  type?: string;
  parentSection?: string | null;
  childSection?: SectionProps[];

  worksheet?: WorksheetProp;
  graph?: GraphProps[];
  graphPage?: GraphPageProps[];
  report?: ReportProps[];
  allAssetsId: string[];
  createdDate: Date;
  modifiedDate: Date;
}

export interface WorksheetProp {
  id: string;
  name: string;
  parentSectionId?: string;
  parentNotebookId?: string;
  parentSubSectionId?: string | null;
  worksheetId: string;
  type?: string;
  data?: WorksheetDataProps[][];
  createdDate: Date;
  modifiedDate: Date;
}

export interface WorksheetDataProps {
  value?: string;
  readOnly?: boolean;
}

export interface GraphProps {
  worksheetId: string;
}

export interface GraphPageProps {
  id: string;
  name: string;
  type: string;
  parentNotebook: string;
  parentSection: string;
  parentSubSectionId?: string | null;
  worksheetId: string;
  graphs?: Object[];
  rectangles?: Object[];
  circle?: Object[];
  lines?: Object[];
  text?: Object[];
  createdDate: Date;
  modifiedDate: Date;
}

export interface ReportProps {
  id: string;
}

export const getDefaultNotebookObject = (id: string) => {
  const notebookObject: NotebookProps = {
    id,
    name: id,
    type: 'notebook',
    children: [],
    allSectionId: [],
    allAssetsId: [],
    allWorksheetId: [],
    allReportId: [],
    allGraphPageId: [],
    createdDate: new Date(),
    modifiedDate: new Date(),
  };

  return notebookObject;
};

export const getDefaultSection = (name: string, notebookId: string) => {
  const sectionObject: SectionProps = {
    id: notebookId + name,
    name,
    parentNotebookId: notebookId,
    parentSection: null,
    childSection: [],
    type: 'section',
    graph: [],
    graphPage: [],
    report: [],
    allAssetsId: [],
    createdDate: new Date(),
    modifiedDate: new Date(),
  };
  return sectionObject;
};

export const getDefaultWorksheet = (
  name: string,
  notebookId: string,
  sectionId: string,
  subSectionId?: string
) => {
  const worksheetObject: WorksheetProp = {
    id: sectionId + name,
    name,
    parentNotebookId: notebookId,
    parentSectionId: sectionId,
    worksheetId: sectionId + name,
    parentSubSectionId: subSectionId ? subSectionId : null,
    type: 'worksheet',
    createdDate: new Date(),
    modifiedDate: new Date(),
  };
  return worksheetObject;
};

export const getDefaultReport = (
  name: string,
  notebookId: string,
  sectionId: string,
  worksheet?: WorksheetDataProps,
  subSectionId?: string
) => {
  const reportObject = {
    id: sectionId + name,
    name,
    parentNotebookId: notebookId,
    parentSectionId: sectionId,
    worksheetId: worksheet ? worksheet.id : null,
    parentSubSectionId: subSectionId ? subSectionId : null,
    type: 'report',
    createdDate: new Date(),
    modifiedDate: new Date(),
  };
  return reportObject;
};

export const getDefaultGraphPage = (
  name: string,
  notebookId: string,
  sectionId: string,
  worksheet?:string,
  subSectionId?: string
) => {
  const graphPageObject = {
    id: sectionId + name,
    name,
    parentNotebookId: notebookId,
    parentSectionId: sectionId,
    worksheetId: worksheet ? worksheet.id : null,
    parentSubSectionId: subSectionId ? subSectionId : null,
    type: 'graphPage',
    graphs: [],
    createdDate: new Date(),
    modifiedDate: new Date(),
  };

  return graphPageObject;
};

/* create notebook */

export const createNotebook = (props) => {
  /* get notebooks array length to set id  */
  // checkStatus();
  const notebookId = 'Notebook' + (props.allNotebookId.length + 1);

  const notebookObject = getDefaultNotebookObject(notebookId);
  const sectionObject = getDefaultSection('Section1', notebookId);
  const worksheetObject = getDefaultWorksheet(
    `Wrk${notebookObject.allWorksheetId.length + 1}`,
    `Data ${notebookObject.allWorksheetId.length + 1}`,
    notebookId,
    sectionObject.id
  );
  //const reportObject = getDefaultReport('Report1',notebookId, sectionObject.id,worksheetObject.id );

  sectionObject.worksheet = worksheetObject;
  //sectionObject.report?.push(reportObject)
  //sectionObject.report.push(reportObject);
  sectionObject.allAssetsId.push(worksheetObject.id);
  notebookObject.children.push(sectionObject);
  notebookObject.allSectionId.push(sectionObject.id);
  notebookObject.allWorksheetId.push(worksheetObject.id);
  notebookObject.allAssetsId.push(worksheetObject.id);

  // setting Active Item
  let allActiveItem = {
    notebook: notebookId,
    section: sectionObject.id,
    subSection: null,
    worksheet: worksheetObject.id,
    graphPage: {
      id: null,
      objectId: null,
    },
    report: null,
    selectedItemOnNotebook: worksheetObject.id,
  };

  /* adding notebook object to redux store */
  
  const newSummary = {
    id:worksheetObject.id,
    type:worksheetObject.type,
    createdDate: worksheetObject.createdDate,
    modifiedDate: worksheetObject.modifiedDate,
    author:worksheetObject.author,
    description:worksheetObject.description
  }
  props.summaryInfoAction(newSummary)
  props.addNotebook(notebookObject);

  /* add worksheet to open worksheet items and active worksheet items */

  props.addOpenWorksheet(worksheetObject);
  props.setActiveItem(worksheetObject);
  props.setActiveWorksheet(worksheetObject.id);
  props.setAllActiveItem(allActiveItem);
  props.setSelectedPivotItem(worksheetObject.id);
  return notebookObject;
};

export const createSection = (props, clickedItem?, type?) => {
  let notebookId = props.allActiveItem.notebook;
  let subSectionId = props.allActiveItem.subSection;

  // if from context menu editing NotebookID
  if (clickedItem) {
    if (clickedItem.type == 'notebook') {
      notebookId = clickedItem.id;
    } else {
      notebookId = clickedItem.parentNotebookId;
    }
  }
  const activeNotebook = props.notebooks.filter( (item) => item.id == notebookId);

  const sectionObject = getDefaultSection(`Section${activeNotebook[0].allSectionId.length + 1}`, notebookId);
  let sectionId = sectionObject.id;

  if (clickedItem && clickedItem.type == 'section') {
    if (clickedItem.parentSection) {
      sectionObject.parentSection = clickedItem.parentSection;
      sectionId = sectionObject.parentSection;

    }
  }
  else if(clickedItem && clickedItem.parentSubSectionId){
      sectionObject.parentSection = clickedItem.parentSectionId;
      sectionId = sectionObject.parentSection;

  }
  else if(props.allActiveItem.subSection){
    sectionObject.parentSection = props.allActiveItem.section;
  }

  let objectItem;
  let newActiveItem = {
    ...props.allActiveItem,
    notebook: notebookId,
    section: sectionId,
  };

  if(type == "report"){
    objectItem = getDefaultReport(
      `Report${activeNotebook[0].allReportId.length + 1}`,
      notebookId,
      sectionId,
    );

    sectionObject.report.push(objectItem);

    newActiveItem = {
      ...newActiveItem,
      subSection: objectItem.parentSubSectionId,
      worksheet: null,
      report: objectItem.id,
      graphPage: null,
      selectedItemOnNotebook: objectItem.id,
      cursor: objectItem.id
    }

  }
  else if(type == "graphPage"){
    objectItem = getDefaultGraphPage(
      `GraphPage${activeNotebook[0].allGraphPageId.length + 1}`,
      notebookId,
      sectionId,
      null,
      props.licenseInfo?.userName
    );

    sectionObject.graphPage.push(objectItem);

    newActiveItem = {
      ...newActiveItem,
      subSection: objectItem.parentSubSectionId,
      worksheet: null,
      report: null,
      graphPage: {
        id: objectItem.id,
        graphObject: null,
      },
      selectedItemOnNotebook: objectItem.id,
      cursor: objectItem.id
    }
  }
  else{
    let parentSubSection;

    if(clickedItem){
      parentSubSection = clickedItem.parentSection ? sectionObject.id : null;
    }
    else{
      parentSubSection = subSectionId ? sectionObject.id : null;
    }

    objectItem = getDefaultWorksheet(
      `Wrk${activeNotebook[0].allWorksheetId.length + 1}`,
      `Data ${activeNotebook[0].allWorksheetId.length + 1}`, notebookId, sectionId);
    objectItem.parentSubSectionId = parentSubSection;
    sectionObject.worksheet = objectItem;
    newActiveItem = {
      ...newActiveItem,
      subSection: objectItem.parentSubSectionId,
      worksheet: objectItem.id,
      report: null,
      graphPage: {
        id: null,
        graphObject: null,
      },
      selectedItemOnNotebook: objectItem.id,
      cursor: objectItem.id
    }
    props.addOpenWorksheet(objectItem);
    props.setActiveWorksheet(objectItem.id);

  }


  sectionObject.allAssetsId.push(objectItem.id);

  props.setActiveItem(objectItem);
  props.setAllActiveItem(newActiveItem);
  props.setSelectedPivotItem(objectItem.id);
  props.addSection(sectionObject);

  return sectionObject;
};


export const createBlankSection = (props, clickedItem?) => {
  let notebookId = props.allActiveItem.notebook;
  let sectionId = props.allActiveItem.section;
  let subSectionId = props.allActiveItem.subSection;

  // if from context menu editing NotebookID
  if (clickedItem) {
    if (clickedItem.type == 'notebook') {
      notebookId = clickedItem.id;
    } else {
      notebookId = clickedItem.parentNotebookId;
    }
  }

  const activeNotebook = props.notebooks.filter(
    (item) => item.id == notebookId
  );

  const sectionObject = getDefaultSection(
    `Section${activeNotebook[0].allSectionId.length + 1}`,
    notebookId
  );

  // clickedItem comming from context Menu only

  if(clickedItem){
    if(clickedItem.type == 'notebook'){
      sectionObject.parentSection = null;
    }
    else if (clickedItem.type == 'section') {
      if (clickedItem.parentSection) {
        sectionObject.parentSection = clickedItem.parentSection;
      } else {
        sectionObject.parentSection = clickedItem.id;
      }
    }
    else {
      sectionObject.parentSection = clickedItem.parentSectionId;
    }
  }
  else {
    sectionObject.parentSection = sectionId;
  }


  // const newActiveItem = {
  //   ...props.allActiveItem,
  //   section: sectionObject.id,
  //   worksheet: null,
  //   subSection: sectionObject.parentSection,
  // };

  //props.setAllActiveItem(newActiveItem);
  props.addSection(sectionObject);
  return sectionObject;
};

export const createWorksheet = (props, clickedItem?) => {
  let notebookId = props.allActiveItem.notebook;
  let sectionId = props.allActiveItem.section;
  let subSectionId = props.allActiveItem.subSection;
  let isWorksheet = false;
  // this check Is from context Menu creation
  if (clickedItem) {
    if (clickedItem.type == 'notebook') {
      if(!sectionId || !sectionId.includes(notebookId)){
        createSection(props,clickedItem, "worksheet")
        return;
      }

    }
    else if (clickedItem.type == 'section') {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.parentSection
        ? clickedItem.parentSection
        : clickedItem.id;
    }
    else {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.parentSectionId;
    }
  }
  else if(!sectionId){
    return createSection(props, null, "worksheet")
  }

  const activeNotebook = props.notebooks.filter(
    (item) => item.id == notebookId
  );
  // this is top level section in any Item clicked
  const activeSection = activeNotebook[0].children.filter(
    (item) => item.id == sectionId
  );

  let activeSubSec= null;
  if(clickedItem){
    if(clickedItem.type == "notebook"){
      if(subSectionId){
         activeSubSec = activeSection[0].childSection.filter(
                              (el) => el.id == subSectionId
                            );
        isWorksheet = activeSubSec[0].worksheet ? true : false;
      }
      else{
        isWorksheet = activeSection[0].worksheet ? true :false
      }
    }
    else if(clickedItem.parentSection){
      activeSubSec = activeSection[0].childSection.filter(
        (el) => el.id == clickedItem.id
      );
    }
    else if(clickedItem.parentSubSectionId){
      activeSubSec = activeSection[0].childSection.filter(
        (el) => el.id == clickedItem.parentSubSectionId
      );
    }
  }
  else {
    if(subSectionId){
       activeSubSec = activeSection[0].childSection.filter(
                            (el) => el.id == subSectionId
                          );
      isWorksheet = activeSubSec[0].worksheet ? true : false;
    }
    else{
      isWorksheet = activeSection[0].worksheet ? true :false
    }
  }



  //if section have already worksheet than create new worksheet with new section.

  if ( isWorksheet || clickedItem && (clickedItem.worksheet ||clickedItem.worksheetId)) {
    return createSection(props, clickedItem);
  }

  else {
    const worksheetObject = getDefaultWorksheet(
      `Wrk${activeNotebook[0].allWorksheetId.length + 1}`,
      `Data ${activeNotebook[0].allWorksheetId.length + 1}`,
      notebookId,
      activeSection[0].id
    );

    if (clickedItem && clickedItem.parentSection) {
      worksheetObject.parentSubSectionId = clickedItem.id;
    }
    else if(subSectionId){
      worksheetObject.parentSubSectionId = subSectionId;
    }


    if(activeSubSec && activeSubSec.length>0){
      if(activeSubSec[0].graphPage.length){
        if(!confirm("Pages in this section will become associated with this new worksheet and loose any data stored in them")){
          return false;
        }
      }
    }
    else {
      if(activeSection[0].graphPage.length){
        if(!confirm("Pages in this section will become associated with this new worksheet and loose any data stored in them")){
          return false;
        }
      }
    }

    const newActiveItem = {
      ...props.allActiveItem,
      notebook: notebookId,
      section: sectionId,
      subSection: worksheetObject.parentSubSectionId,
      worksheet: worksheetObject.id,
      report: null,
      graphPage: null,
      selectedItemOnNotebook: worksheetObject.id,
      cursor: worksheetObject.id
    };

    props.setActiveItem(worksheetObject);
    props.addWorksheet(worksheetObject);
    props.setAllActiveItem(newActiveItem);
    props.setSelectedPivotItem(worksheetObject.id);

    return worksheetObject;
  }
};

export const createReport = (props, clickedItem?) => {
  let notebookId = props.allActiveItem.notebook;
  let sectionId = props.allActiveItem.section;
  let subSectionId = props.allActiveItem.subSection;

  if (clickedItem) {
    if (clickedItem.type == 'notebook') {
      if(!sectionId || !sectionId.includes(clickedItem.id)){
        //alert("New Section with Report");
        createSection(props,clickedItem, "report")
        return;
      }
    }
    else if (clickedItem.type == 'section') {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.parentSection? clickedItem.parentSection: clickedItem.id;
    }
    else {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.parentSectionId;
    }
  }
  else if(!sectionId){
    return createSection(props, null, "report")
  }


  const activeNotebook = props.notebooks.filter(
    (item) => item.id == notebookId
  );
  const activeSection = activeNotebook[0].children.filter(
    (item) => item.id == sectionId
  );


  const newReport = getDefaultReport(
    `Report${activeNotebook[0].allReportId.length + 1}`,
    notebookId,
    sectionId,
    activeSection[0].worksheet
  );

  if(clickedItem){
    if (clickedItem.parentSection) {
      const activeSubSec = activeSection[0].childSection.filter(
        (el) => el.id == clickedItem.id
      );

      newReport.parentSubSectionId = clickedItem.id;
      newReport.worksheetId = activeSubSec[0].worksheet
                                ? activeSubSec[0].worksheet.id
                                : null;
    }
    else if(clickedItem.parentSubSectionId){
      newReport.parentSubSectionId = clickedItem.parentSubSectionId;
      newReport.worksheetId = clickedItem.worksheetId;
    }
    else if(clickedItem.type == "notebook" && subSectionId){
      newReport.parentSubSectionId = subSectionId;
      const activeSubSec = activeSection[0].childSection.filter(
        (el) => el.id == subSectionId
      );
      newReport.worksheetId = activeSubSec[0].worksheet
                                ? activeSubSec[0].worksheet.id
                                : null;
    }
  }
  else {
    if(subSectionId){
      newReport.parentSubSectionId = subSectionId;
      const activeSubSec = activeSection[0].childSection.filter(
                            (el) => el.id == subSectionId
                          );

      newReport.worksheetId = activeSubSec[0].worksheet ? activeSubSec[0].worksheet.id : null;
    }
  }



  // const newActiveItem = {
  //   ...props.allActiveItem,
  //   report: newReport.id,
  //   selectedPivotItem: newReport.id,
  //   graphPage: null,
  //   worksheet: null,
  //   subSection: newReport.parentSubSectionId,
  // };

  const newActiveItem = {
    ...props.allActiveItem,
    notebook: notebookId,
    section: sectionId,
    subSection: newReport.parentSubSectionId,
    worksheet: null,
    report: newReport.id,
    graphPage: null,
    selectedItemOnNotebook: newReport.id,
    cursor: newReport.id
  };

  props.setActiveItem(newReport);
  props.addReport(newReport);
  props.setAllActiveItem(newActiveItem);
  props.setSelectedPivotItem(newReport.id);

  return newReport;
};


export const createGraphPage = (props, graphObject?: Object | undefined, clickedItem? ) => {
  let notebookId = props.allActiveItem.notebook;
  let sectionId = props.allActiveItem.section;
  let subSectionId = props.allActiveItem.subSection;

  if (clickedItem) {
    if (clickedItem.type == 'notebook') {
      if(!sectionId || !sectionId.includes(clickedItem.id)){
        //alert("New Section with Report");
        createSection(props,clickedItem, "graphPage")
        return;
      }
    }
    else if (clickedItem.type == 'section') {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.parentSection
        ? clickedItem.parentSection
        : clickedItem.id;
    }
    else {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.parentSectionId;
    }
  }
  else if(!sectionId){
    return createSection(props, null, "graphPage")
  }

  const activeNotebook = props.notebooks.filter(
    (item) => item.id == notebookId
  );
  const activeSection = activeNotebook[0].children.filter(
    (item) => item.id == sectionId
  );

  let newGraphPage = getDefaultGraphPage(
    `GraphPage${activeNotebook[0].allGraphPageId.length + 1}`,
    notebookId,
    sectionId,
    activeSection[0].worksheet,
    props.licenseInfo?.userName
  );

  if(clickedItem){
    if (clickedItem.parentSection) {
      const activeSubSec = activeSection[0].childSection.filter(
        (el) => el.id == clickedItem.id
      );
      newGraphPage.parentSubSectionId = clickedItem.id;
      newGraphPage.worksheetId = activeSubSec[0].worksheet
        ? activeSubSec[0].worksheet.id
        : null;
    }
    else if(clickedItem.parentSubSectionId){
      newGraphPage.parentSubSectionId = clickedItem.parentSubSectionId;
      newGraphPage.worksheetId = clickedItem.worksheetId
    }
    else if(clickedItem.type == "notebook" && subSectionId){
      newGraphPage.parentSubSectionId = subSectionId;
      const activeSubSec = activeSection[0].childSection.filter(
        (el) => el.id == subSectionId
      );
      newGraphPage.worksheetId = activeSubSec[0].worksheet
                                ? activeSubSec[0].worksheet.id
                                : null;
    }
  }
  else {
    if(subSectionId){
      newGraphPage.parentSubSectionId = subSectionId;
      const activeSubSec = activeSection[0].childSection.filter(
                            (el) => el.id == subSectionId
                          );

      newGraphPage.worksheetId = activeSubSec[0].worksheet ? activeSubSec[0].worksheet.id : null;
    }
  }


  if (graphObject) {
    newGraphPage.graphs.push(graphObject);
  }

  // const newActiveItem = {
  //   ...props.allActiveItem,
  //   report: null,
  //   graphPage: newGraphPage.id,
  //   worksheet: null,
  //   selectedPivotItem: newGraphPage.id,
  // };

  const newActiveItem = {
    ...props.allActiveItem,
    notebook: notebookId,
    section: sectionId,
    subSection: newGraphPage.parentSubSectionId,
    worksheet: null,
    report: newGraphPage.id,
    graphPage: null,
    selectedItemOnNotebook: newGraphPage.id,
    cursor: newGraphPage.id

  };

  props.setActiveItem(newGraphPage);
  props.addGraphPage(newGraphPage);
  props.setAllActiveItem(newActiveItem);
  props.setSelectedPivotItem(newGraphPage.id);

  return newGraphPage;
};

export const openCloseNotebook = (currNotebook, props, isOpen: boolean) => {
  let allAssets = [];
  // collecting all worksheet, graphPage, report, and subsection`s wksheet, grphPage and report
  for (const section of currNotebook.children) {

    allAssets = section.worksheet ? [
      ...allAssets,
      section.worksheet,
      ...section.graphPage,
      ...section.report,
    ]
    : [
      ...allAssets,
      ...section.graphPage,
      ...section.report,
    ];
    if (section.childSection && section.childSection.length > 0) {
      for (const subSection of section.childSection) {
        allAssets = subSection.worksheet ? [
          ...allAssets,
          subSection.worksheet,
          ...subSection.graphPage,
          ...subSection.report,
        ]
        : [
          ...allAssets,
          ...subSection.graphPage,
          ...subSection.report,
        ];
      }
    }
  }

  //checking and Injecting if open and  Ejecting if Close each element from activeItem
  for (const element of allAssets) {
    let isUnique = true;
    for (const item of props.activeItems) {
      if (item.id == element.id) {
        isUnique = false;
      }
    }

    // If opening required and Injecting missing Item
    if (isOpen && isUnique) {
      props.setActiveItem(element);
    }

    // If closing required and ejecting matched Item
    if (!isOpen && !isUnique) {
      props.removeActiveItem(element.id);
    }
  }

  // removing notebook from Notebook Manager also
  if (!isOpen) {
    props.removeNotebook(currNotebook);
  }
};

export const openCloseSection = (currSection, props, isOpen: boolean) => {
  // collecting all worksheet, graphPage, report, and subsection`s wksheet, grphPage and report

  let allAssets = currSection.worksheet ? [
    currSection.worksheet,
    ...currSection.graphPage,
    ...currSection.report,
  ]
  : [
    ...currSection.graphPage,
    ...currSection.report,
  ];
  if (currSection.childSection && currSection.childSection.length > 0) {
    for (const subSection of currSection.childSection) {
      allAssets = subSection.worksheet ? [
        ...allAssets,
        subSection.worksheet,
        ...subSection.graphPage,
        ...subSection.report,
      ]
      : [
        ...allAssets,
        ...subSection.graphPage,
        ...subSection.report,
      ];
    }
  }

  //checking and Injecting if open and  Ejecting if Close each element from activeItem
  for (const element of allAssets) {
    let isUnique = true;

    for (const item of props.activeItems) {
      if (item.id == element.id) {
        isUnique = false;
      }
    }

    // If opening required and Injecting missing Item
    if (isOpen && isUnique) {
      props.setActiveItem(element);
    }

    // If closing required and ejecting matched Item
    if (!isOpen && !isUnique) {
      props.removeActiveItem(element.id);
    }
  }
};

export const openCloseAsset = (currAsset, props, isOpen: boolean) => {
  let isUnique = true;
  for (const item of props.activeItems) {
    if (item.id == currAsset.id) {
      isUnique = false;
    }
  }

  if (isOpen && isUnique) {
    props.setActiveItem(currAsset);
  }
  if (!isOpen && !isUnique) {
    props.removeActiveItem(currAsset.id);
  }
};

export const closeAllItem = (removeAllActiveItem) => {
  removeAllActiveItem();
}

export const renameItem = (currItem, props) => {
  props.renameItem(currItem)
}

export const deleteItem = (currItem, deleteItem) => {
  deleteItem(currItem);
}
