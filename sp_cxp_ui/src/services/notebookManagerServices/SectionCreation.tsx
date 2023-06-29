import {
  NotebookProps,
  SectionProps,
  WorksheetProp,
  GraphPageProps,
  ReportProps,
} from './NotebookManagerInterfaces';

import {
  getDefaultSectionObject,
  getDefaultWorksheet,
  getDefaultGraphPage,
  getDefaultReport,
  getDefaultAuditLogObject,
} from './GetDefaultObject';

import * as ITEM_TYPE from './ConstantsNotebookManager';
import { checkIsNameUnique } from '../NotebookManagerServicesNew';

export const createNewBlankSection = (
  props: any,
  clickedItem?:
    | NotebookProps
    | SectionProps
    | WorksheetProp
    | GraphPageProps
    | ReportProps
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

  const activeNotebook = props.notebooks.allNotebooks.byId[notebookId];
  let secName = `Section ${activeNotebook.sectionLength + 1}`;
  let secLen = activeNotebook.sectionLength + 1;

  while (!checkIsNameUnique(secName, activeNotebook.id, props)) {
    secLen = secLen + 1;
    secName = `Section ${secLen}`;
  }

  const sectionObject = getDefaultSectionObject(
    `Sec${secLen}`,
    `Section ${secLen}`,
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
  } else if (!sectionId) {
    //sectionObject.parentSection = sectionId;
    sectionObject.parentLoop = [notebookId];
  } else {
    const activeSec = props.notebooks.allSections.byId[sectionId];
    if (activeSec.parentLoop.length > 1) {
      sectionObject.parentSectionId = activeSec.parentLoop[1];
      sectionObject.parentLoop = activeSec.parentLoop.slice(0, 1 + 1);
      sectionObject.level = sectionObject.parentLoop.length;
    } else {
      sectionObject.parentSectionId = activeSec.id;
      sectionObject.parentLoop = [...activeSec.parentLoop, activeSec.id];
      sectionObject.level = activeSec.level + 1;
    }
  }

  let parentSec = null;
  if (sectionObject.parentSectionId) {
    parentSec = {
      ...props.notebooks.allSections.byId[sectionObject.parentSectionId],
    };
    parentSec.children.push(sectionObject.id);
  } else {
    activeNotebook.children.push(sectionObject.id);
  }

  activeNotebook.allSectionsId.push(sectionObject.id);
  activeNotebook.sectionLength = secLen;

  // activeNotebook.auditLogs.push(getDefaultAuditLogObject('ADD_SECTION'))

  const newAllNotebooks = {
    newNbk: { ...activeNotebook },
    newSec: { ...sectionObject },
    newParSec: parentSec,
  };

  props.addSection(newAllNotebooks);
  return sectionObject;
};

export const createSection = (props, clickedItem?, type?) => {
  let notebookId = props.allActiveItem.notebook;
  let subSectionId = props.allActiveItem.subSection;

  // if from context menu editing NotebookID
  if (clickedItem) {
    if (clickedItem.type === ITEM_TYPE.NOTEBOOK) {
      notebookId = clickedItem.id;
    } else {
      notebookId = clickedItem.parentNotebookId;
    }
  }
  const activeNotebook = props.notebooks.filter(
    (item) => item.id == notebookId
  );

  const sectionObject = getDefaultSectionObject(
    `Sec${activeNotebook.allSectionsId.length + 1}`,
    `Section ${activeNotebook.allSectionsId.length + 1}`,
    notebookId,
    props.licenseInfo?.userName
  );
  let sectionId = sectionObject.id;

  if (clickedItem && clickedItem.type === ITEM_TYPE.SECTION) {
    if (clickedItem.parentSection) {
      sectionObject.parentSection = clickedItem.parentSection;
      sectionId = sectionObject.parentSection;
    }
  } else if (clickedItem && clickedItem.parentSubSectionId) {
    sectionObject.parentSection = clickedItem.parentSectionId;
    sectionId = sectionObject.parentSection;
  } else if (props.allActiveItem.subSection) {
    sectionObject.parentSection = props.allActiveItem.section;
  }

  let objectItem;
  let newActiveItem = {
    ...props.allActiveItem,
    notebook: notebookId,
    section: sectionId,
  };

  if (type == ITEM_TYPE.REPORT) {
    objectItem = getDefaultReport(
      `Rep${activeNotebook[0].allReportId.length + 1}`,
      `Report ${activeNotebook[0].allReportId.length + 1}`,
      notebookId,
      sectionId,
      null,
      props.licenseInfo?.userName
    );

    sectionObject.report.push(objectItem);

    newActiveItem = {
      ...newActiveItem,
      subSection: objectItem.parentSubSectionId,
      worksheet: null,
      report: objectItem.id,
      graphPage: {
        id: '',
        object: '',
      },
      selectedItemOnNotebook: objectItem.id,
      cursor: objectItem.id,
    };
  } else if (type === ITEM_TYPE.GRAPHPAGE) {
    objectItem = getDefaultGraphPage(
      `GrPg${activeNotebook[0].allGraphPageId.length + 1}`,
      `GraphPage ${activeNotebook[0].allGraphPageId.length + 1}`,
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
      cursor: objectItem.id,
    };
  } else {
    let parentSubSection;

    if (clickedItem) {
      parentSubSection = clickedItem.parentSection ? sectionObject.id : null;
    } else {
      parentSubSection = subSectionId ? sectionObject.id : null;
    }

    objectItem = getDefaultWorksheet(
      `Wrk${activeNotebook[0].allWorksheetId.length + 1}`,
      `Data ${activeNotebook[0].allWorksheetId.length + 1}`,
      notebookId,
      sectionId,
      props.licenseInfo?.userName
    );
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
      cursor: objectItem.id,
    };
    props.addOpenWorksheet(objectItem);
    props.setActiveWorksheet(objectItem.id);
  }

  sectionObject.allAssetsId.push(objectItem.id);
  const newSummary = {
    id:objectItem.id,
    type:objectItem.type,
    createdDate: objectItem.createdDate,
    modifiedDate: objectItem.modifiedDate,
    author:objectItem.author,
    description:objectItem.description
  }
  props.summaryInfoAction(newSummary)
  props.setActiveItem(objectItem);
  props.setAllActiveItem(newActiveItem);
  props.setSelectedPivotItem(objectItem.id);
  props.addSection(sectionObject);

  return sectionObject;
};
