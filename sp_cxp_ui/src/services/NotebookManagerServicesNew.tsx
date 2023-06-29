import {
  NotebookProps,
  SectionProps,
  WorksheetProp,
  GraphPageProps,
  ReportProps,
  TransformProps,
  EquationProps,
  EquationDataProps,
} from './notebookManagerServices/NotebookManagerInterfaces';

import { createNewNotebook } from './notebookManagerServices/NotebookCreation';
import { createNewWorksheet } from './notebookManagerServices/WorksheetCreation';
import { createNewBlankSection } from './notebookManagerServices/SectionCreation';
import { createNewReport } from './notebookManagerServices/ReportCreation';
import { createNewGraphPage } from './notebookManagerServices/GraphPageCreation';
import {
  openCloseNotebookItems,
  openCloseSectionItems,
  openCloseEachItem,
  closeAllItems,
} from './notebookManagerServices/OpenCloseItems';
import {
  saveCompleteNotebook,
  openSaveAsNotebook,
} from './notebookManagerServices/SavingNotebook';
import { pastingItemIntoNode } from './notebookManagerServices/PastingItems';
import { deleteItemFromNode } from './notebookManagerServices/DeleteNodeItem';
import { createNewTransform } from './notebookManagerServices/TransformCreation';
import { createNewEquation } from './notebookManagerServices/EquationCreation';
import { openNotebookFromFile } from './notebookManagerServices/OpenNotebookFromFile';
import { exportNotebook } from './notebookManagerServices/SavingNotebook';

/* create notebook */
export const createNotebook = (props: any) => {
  createNewNotebook(props);
};

export const createBlankSection = (
  props: any,
  clickedItem?: NotebookProps | SectionProps | WorksheetProp
) => {
  createNewBlankSection(props, clickedItem);
};

export const createWorksheet = (
  props: any,
  clickedItem?: NotebookProps | SectionProps | WorksheetProp,
  data: any,
  sheetHeadData: any
) => {
  createNewWorksheet(props, clickedItem, data, sheetHeadData);
};

export const createReport = (
  props: any,
  clickedItem?: NotebookProps | SectionProps | WorksheetProp,
  reportData?: any,
  staticReportData?: any,
  testOptionNameReport?: any
) => {
  createNewReport( props,
  clickedItem,
  reportData,
  staticReportData,
  testOptionNameReport)
  };

export const createTransform = (
  props: any,
  clickedItem?: NotebookProps | SectionProps | WorksheetProp | TransformProps
) => {
  createNewTransform(props, clickedItem);
};

export const createEquation = (
  props: any,
  clickedItem?: NotebookProps | SectionProps | WorksheetProp | EquationProps,
  equationData?: EquationDataProps
) => {
  createNewEquation(props, clickedItem, equationData);
};

export const createGraphPage = (
  props: any,
  graphObject?: Object | undefined | null,
  clickedItem?: NotebookProps | SectionProps | WorksheetProp | ReportProps | undefined | null,
  resultGraphWorksheetID? : string,
  keyName ?: string
) => {
  createNewGraphPage(props, graphObject, clickedItem, resultGraphWorksheetID, keyName);
};

export const openCloseNotebook = (
  currNotebook: NotebookProps,
  props: any,
  isOpen: boolean
) => {
  openCloseNotebookItems(currNotebook, props, isOpen);
};

export const openCloseSection = (
  currSection: SectionProps,
  props: any,
  isOpen: boolean
) => {
  openCloseSectionItems(currSection, props, isOpen);
};

export const openCloseAsset = (
  currAsset: WorksheetProp | ReportProps | GraphPageProps,
  props: any,
  isOpen: boolean
) => {
  openCloseEachItem(currAsset, props, isOpen);
};

export const closeAllItem = (removeAllActiveItem: any) => {
  closeAllItems(removeAllActiveItem);
};

export const renameItem = (
  currItem: SectionProps | WorksheetProp | ReportProps | GraphPageProps,
  props: any
) => {
  const newItem = {
    newSec: null,
    newWrk: null,
    newRep: null,
    newGrPg: null,
    newTransform: null,
    newEquation: null,
  };
  currItem.isSaved = false;
  if (currItem.type === 'section') {
    newItem.newSec = currItem;
  } else if (currItem.type === 'worksheet') {
    newItem.newWrk = currItem;
  } else if (currItem.type === 'report') {
    newItem.newRep = currItem;
  } else if (currItem.type === 'transform') {
    newItem.newTransform = currItem;
  } else if (currItem.type === 'equation') {
    newItem.newEquation = currItem;
  } else if (currItem.type === 'graphPage') {
    newItem.newGrPg = currItem;
  }
  props.renameItem(newItem);
};

export const checkIsNameUnique = (
  newName: string,
  notebookId: any,
  props: any
) => {
  const activeNotebook = props.notebooks.allNotebooks.byId[notebookId];

  const allNodeId = [
    ...activeNotebook.allSectionsId,
    ...activeNotebook.allAssetsId,
  ];
  for (const assetId of allNodeId) {
    if (assetId in props.notebooks.allSections.byId) {
      const secName = props.notebooks.allSections.byId[assetId].name;
      if (secName === newName) return false;
    } else if (assetId in props.notebooks.allWorksheets.byId) {
      const wrkName = props.notebooks.allWorksheets.byId[assetId].name;
      if (wrkName === newName) return false;
    } else if (assetId in props.notebooks.allGraphPages.byId) {
      const grPgName = props.notebooks.allGraphPages.byId[assetId].name;
      if (grPgName === newName) return false;
    } else if (assetId in props.notebooks.allReports.byId) {
      const repName = props.notebooks.allReports.byId[assetId].name;
      if (repName === newName) return false;
    } else if (assetId in props.notebooks.allTransforms.byId) {
      const transName = props.notebooks.allTransforms.byId[assetId].name;
      if (transName === newName) return false;
    } else if (assetId in props.notebooks.allEquations.byId) {
      const equaName = props.notebooks.allEquations.byId[assetId].name;
      if (equaName === newName) return false;
    }
  }

  return true;
};

export const deleteItem = (
  currItem:
    | SectionProps
    | WorksheetProp
    | ReportProps
    | GraphPageProps
    | TransformProps
    | EquationProps,
  props: any
) => {
  return deleteItemFromNode(currItem, props);
};

export const pasteItem = (
  currItem:
    | NotebookProps
    | SectionProps
    | WorksheetProp
    | ReportProps
    | GraphPageProps
    | TransformProps
    | EquationProps,
  copiedItem:
    | SectionProps
    | WorksheetProp
    | ReportProps
    | GraphPageProps
    | TransformProps,
  props: any
) => {
  pastingItemIntoNode(currItem, copiedItem, props);
};

export const saveNotebook = async (
  notebook: NotebookProps[],
  props: any,
  isRemainOpen?: boolean,
  isAllSaveClose?: any
) => {
  return await saveCompleteNotebook(notebook, props, isRemainOpen);
};

export const exportCompleteNotebook = async (
  notebook: NotebookProps,
  props: any
) => {
  return await exportNotebook(notebook, props);
};

export const openSaveAs = async (
  notebook: NotebookProps,
  props: any,
  isReSave?: boolean
) => {
  openSaveAsNotebook(notebook, props, isReSave);
};

export const openNotebookFile = (openNbk: any, props: any) => {
  openNotebookFromFile(openNbk, props);
};

export const getMaxDepthOfTree = (topNode, sectionsObj) => {
  if (topNode.children.length == 0) return 0;
  let q = [...topNode.children];
  let size = 1;
  while (q.length) {
    size++;
    let len = q.length;
    for (let i = 0; i < len; i++) {
      let vode = q.shift();
      vode = { ...sectionsObj.allSections.byId[vode] };
      vode.children.length && q.push(...vode.children);
    }
  }
  return size;
};
