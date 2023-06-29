import {
  NotebookProps,
  SectionProps,
  WorksheetProp,
  GraphPageProps,
  ReportProps,
} from './NotebookManagerInterfaces';

import { getDefaultSectionObject, getDefaultReport } from './GetDefaultObject';

import * as ITEM_TYPE from './ConstantsNotebookManager';
import { checkIsNameUnique } from '../NotebookManagerServicesNew';
import {
  // updateData,
  initGrid,
  setWorksheetData,
} from './../../services/WorksheetServicesNew';

import { transposeRowsToColumns } from '../graphPageServices/GraphServices'
import { convertMetadata, convertNegtoPos } from "../../components/Worksheet/Metadata";

export const createNewReport = (
  props: any,
  clickedItem?:
    | NotebookProps
    | SectionProps
    | WorksheetProp
    | GraphPageProps
    | ReportProps,
  reportData?: any,
  staticReportData?: any,
  testOptionName?: any
) => {
  let notebookId = props.allActiveItem.notebook;
  let sectionId = props.allActiveItem.section;

  if (clickedItem) {
    if (clickedItem.type === ITEM_TYPE.NOTEBOOK) {
      return createSectionWithReport(props, clickedItem);
    } else if (clickedItem.type === ITEM_TYPE.SECTION) {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.id;
    } else {
      notebookId = clickedItem.parentNotebookId;
      sectionId = clickedItem.parentSectionId;
    }
  } else if (!sectionId) {
    // no section Active let on delete of all section
    return createSectionWithReport(props);
  }

  const activeNotebook = JSON.parse(
    JSON.stringify(props.notebooks.allNotebooks.byId[notebookId])
  );
  const activeSection = JSON.parse(
    JSON.stringify(props.notebooks.allSections.byId[sectionId])
  );

  let repName = `Report ${activeNotebook.reportLength + 1}`;
  let repLen = activeNotebook.reportLength + 1;

  while (!checkIsNameUnique(repName, activeNotebook.id, props)) {
    repLen = repLen + 1;
    repName = `Report ${repLen}`;
  }

  const newReport = getDefaultReport(
    `Rep${repLen}`,
    `Report ${repLen}`,
    notebookId,
    sectionId,
    activeSection.worksheetId,
    props.licenseInfo?.userName
  );

  newReport.level = activeSection.level;
  newReport.parentLoop = [...activeSection.parentLoop, activeSection.id];
  newReport.reportData = reportData ? reportData : '';
  if (reportData) {
    console.log(testOptionName);
    newReport.name = testOptionName + ' Report';
  }
  newReport.staticReportData = staticReportData ? staticReportData : '';
  activeSection.report = [...activeSection.report, newReport.id];
  activeSection.activeChild = newReport.id;
  activeSection.allAssetsId.push(newReport.id);

  activeNotebook.reportLength = repLen;
  activeNotebook.allReportsId.push(newReport.id);
  activeNotebook.allAssetsId.push(newReport.id);
  activeNotebook.activeSection = activeSection.id;
  activeNotebook.activeChild = newReport.id;
  activeNotebook.isSaved = false;

  const newAllNotebooks = {
    newNbk: { ...activeNotebook },
    newSec: { ...activeSection },
    newRep: newReport,
  };

  const newActiveItem = {
    ...props.allActiveItem,
    notebook: notebookId,
    section: sectionId,
    worksheet: null,
    report: newReport.id,
    graphPage: {
      id: '',
      object: '',
    },
    selectedItemOnNotebook: newReport.id,
    cursor: newReport.id,
  };
  const newSummary = {
    id:newReport.id,
    type:newReport.type,
    createdDate: newReport.createdDate,
    modifiedDate: newReport.modifiedDate,
    author:newReport.author,
    description:newReport.description
  }
  props.summaryInfoAction(newSummary)
  props.setActiveItem(newReport);
  props.addReport(newAllNotebooks);
  props.setAllActiveItem(newActiveItem);
  props.setSelectedPivotItem(newReport.id);
  console.log(props, 'propspropsprops');
  return newReport;
};

export const createSectionWithReport = (
  props: any,
  clickedItem?: NotebookProps | SectionProps | WorksheetProp,
  reportData?: any,
  staticReportData?: any,
  testOptionName?: any,
  isDescriptive?: any
) => {
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

  const activeNotebook = JSON.parse(
    JSON.stringify(props.notebooks.allNotebooks.byId[notebookId])
  );
  let secName = isDescriptive ? `${testOptionName} ${activeNotebook.sectionLength + 1}` : `Section ${activeNotebook.sectionLength + 1}`;
  let secLen = activeNotebook.sectionLength + 1;

  while (!checkIsNameUnique(secName, activeNotebook.id, props)) {
    secLen = secLen + 1;
    secName = `Section ${secLen}`;
  }

  const sectionObject = getDefaultSectionObject(
    `Sec${secLen}`,
    secName,
    notebookId,
    props.licenseInfo?.userName
  );

  // clickedItem comming from context Menu only

  if (clickedItem) {
    if (clickedItem.type === ITEM_TYPE.NOTEBOOK) {
      sectionObject.parentLoop = [notebookId];
    } else if (clickedItem.type === ITEM_TYPE.SECTION) {
      //[n1,s1,s2,s3,s4,s5]
      if (clickedItem.parentLoop.length > 1) {
        sectionObject.parentSectionId = clickedItem.parentLoop[1];
        sectionObject.parentLoop = clickedItem.parentLoop.slice(0, 1 + 1);
        sectionObject.level = sectionObject.parentLoop.length;
      } else {
        sectionObject.parentSectionId = clickedItem.id;
        sectionObject.parentLoop = [...clickedItem.parentLoop, clickedItem.id];
        sectionObject.level = clickedItem.level + 1;
      }
    } else {
      //[n1,s1,d,s2,s3,s4,s5]
      if (clickedItem.parentLoop.length > 2) {
        sectionObject.parentSectionId = clickedItem.parentLoop[2 - 1];
        sectionObject.parentLoop = clickedItem.parentLoop.slice(0, 2);
        sectionObject.level = sectionObject.parentLoop.length;
      } else {
        sectionObject.parentSectionId = clickedItem.parentSectionId;
        sectionObject.parentLoop = [...clickedItem.parentLoop];
        sectionObject.level = clickedItem.level + 1;
      }
    }
  } else {
    //sectionObject.parentSection = sectionId;
    if (sectionId) {
      sectionObject.parentSectionId = sectionId;
    } else {
      sectionObject.parentLoop = [activeNotebook.id];
    }
  }

  let parentSec = null;
  if (sectionObject.parentSectionId) {
    parentSec = {
      ...props.notebooks.allSections.byId[sectionObject.parentSectionId],
    };
    parentSec = JSON.parse(JSON.stringify(parentSec))
    parentSec.children.push(sectionObject.id);
  } else {
    activeNotebook.children.push(sectionObject.id);
  }

  let repName = `Report ${activeNotebook.reportLength + 1}`;
  let repLen = activeNotebook.reportLength + 1;

  while (!checkIsNameUnique(repName, activeNotebook.id, props)) {
    repLen = repLen + 1;
    repName = `Report ${repLen}`;
  }

  const newReport = getDefaultReport(
    `Rep${activeNotebook.allReportsId.length + 1}`,
    `Report ${activeNotebook.allReportsId.length + 1}`,
    notebookId,
    sectionObject.id,
    sectionObject.worksheetId,
    props.licenseInfo?.userName
  );

  newReport.level = sectionObject.level;
  newReport.parentLoop = [...sectionObject.parentLoop, sectionObject.id];
  newReport.reportData = reportData ? reportData : '';
console.log("new report",newReport)
  if (reportData) {
    console.log("testOptionName",testOptionName);
    // newReport.worksheetId = newReport.id;
    createWorksheetData(reportData, newReport.id, props, testOptionName);
    newReport.worksheetId = 'meta' + newReport.id;
    newReport.testOptionName = testOptionName;
    newReport.name = testOptionName + ' Report';
  }
  newReport.staticReportData = staticReportData ? staticReportData : '';
  sectionObject.allAssetsId.push(newReport.id);
  sectionObject.activeChild = newReport.id;
  sectionObject.report = [...sectionObject.report, newReport.id];

  activeNotebook.reportLength = repLen;
  activeNotebook.sectionLength = secLen;
  activeNotebook.allSectionsId.push(sectionObject.id);
  activeNotebook.allAssetsId.push(newReport.id);
  activeNotebook.allReportsId.push(newReport.id);
  activeNotebook.activeChild = newReport.id;
  activeNotebook.activeSection = sectionObject.id;
  activeNotebook.isSaved = false;

  const newAllNotebooks = {
    newNbk: { ...activeNotebook },
    newSec: sectionObject,
    newParSec: parentSec,
    newRep: newReport,
  };

  const newActiveItem = {
    ...props.allActiveItem,
    notebook: notebookId,
    section: sectionObject.id,
    worksheet: null,
    report: newReport.id,
    graphPage: {
      id: '',
      object: '',
    },
    selectedItemOnNotebook: newReport.id,
    cursor: newReport.id,
  };
  const newSummary = {
    id:newReport.id,
    type:newReport.type,
    createdDate: newReport.createdDate,
    modifiedDate: newReport.modifiedDate,
    author:newReport.author,
    description:newReport.description
  }
  props.summaryInfoAction(newSummary)
  props.setActiveItem(newReport);
  props.setAllActiveItem(newActiveItem);
  props.setSelectedPivotItem(newReport.id);
  props.addSection(newAllNotebooks);
  console.log('***********asaasss',props)
  return sectionObject;
};

 const createWorksheetData = async (
  reportData? : any,
  worksheetId? : any,
  props? : any,
  testOptionName ? : string
) => {

  let resultGraphDataSet = transposeRowsToColumns(reportData.graph.sheetdata)
  console.log(resultGraphDataSet, "resultGraphDataSet")
  let clientData
//   if(testOptionName == 'Two Way Repeated Measures ANOVA'){

// } else {
//  clientData = await setWorksheetData(resultGraphDataSet, worksheetId);
// }
  clientData = await setWorksheetData(
    [
      {
        sheetdata: reportData.graph.sheetdata,
        metadata: convertMetadata(reportData.graph.sheetdata),
      },
    ],
    "meta" + worksheetId
  );
  console.log("client data",clientData)
  props.actions.storeWorksheet(clientData);
  return clientData
};

export const createWorksheetDatarecompute = async (
  sheetdata? : any,
  worksheetId? : any,
  props? : any,
  testOptionName ? : string
) => {

  let resultGraphDataSet = transposeRowsToColumns(sheetdata)
  console.log(resultGraphDataSet, "resultGraphDataSet")
  let clientData
//   if(testOptionName == 'Two Way Repeated Measures ANOVA'){

// } else {
//  clientData = await setWorksheetData(resultGraphDataSet, worksheetId);
// }
  clientData = await setWorksheetData(
    [
      {
        sheetdata: sheetdata,
        metadata: convertMetadata(sheetdata),
      },
    ],
    "meta" + worksheetId
  );
  console.log("client data",props)
  props.actions.storeWorksheet(clientData);
  return clientData
};
