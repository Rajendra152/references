import {
  SectionProps,
  WorksheetProp,
  GraphPageProps,
  ReportProps,
  NotebookProps,
  TransformProps,
  EquationProps
} from './NotebookManagerInterfaces';

import {
  getNotebooksWithNewInstance,
  getSectionsWithNewInstance,
  getWorksheetsWithNewInstance,
  getGraphPagesWithNewInstance,
  getReportsWithNewInstance,
  getTransformsWithNewInstance,
  getEquationsWithNewInstance} from "./NewInstanceObject";

import * as ITEM_TYPE from './ConstantsNotebookManager'


export const deleteItemFromNode = (
  currItem: SectionProps | WorksheetProp | ReportProps | GraphPageProps | TransformProps | EquationProps,
  props: any
) => {
  let allNbk = null;
  let allSec = null;
  let allWrk = null;
  let allGrPg = null;
  let allRep = null;
  let allTransform = null;
  let allEquation = null;

  let allActvItm = {
    ...props.allActiveItem,
  };
  let updatedActiveItems = [...props.activeItems];


  if (currItem.type === ITEM_TYPE.NOTEBOOK) {
    [
      allNbk,
      allSec,
      allWrk,
      allGrPg,
      allRep,
      allTransform,
      allEquation,
      updatedActiveItems,
      allActvItm,
    ] = deleteCompleteNotebook(currItem, props);

  }
  else if (currItem.type === ITEM_TYPE.SECTION) {
    [
      allNbk,
      allSec,
      allWrk,
      allGrPg,
      allRep,
      allTransform,
      allEquation,
      updatedActiveItems,
      allActvItm,
    ] = deleteCompleteSection(currItem, props);

  } else {

    [
      allNbk,
      allSec,
      allWrk,
      allGrPg,
      allRep,
      allTransform,
      allEquation,
      updatedActiveItems,
      allActvItm,
    ] = deleteSingleItem(currItem, props);

  }

  const deletedItem = {
    allNbk,
    allSec,
    allWrk,
    allGrPg,
    allRep,
    allTransform,
    allEquation,
    actvItm: updatedActiveItems,
    allActvItm,
  };
  
  props.deleteItem(deletedItem);
  return deletedItem
};



//Deleting Single Item Worksheet GraphPage Report
const deleteSingleItem = (
  currItem: SectionProps | WorksheetProp | ReportProps | GraphPageProps | TransformProps | EquationProps,
  props: any
) => {
  let allNbk = null;
  let allSec = null;
  let allWrk = null;
  let allGrPg = null;
  let allRep = null;
  let allTransform = null;
  let allEquation = null;
  let allActvItm = {
    ...props.allActiveItem,
  };
  let updatedActiveItems = [...props.activeItems];

  allNbk = getNotebooksWithNewInstance(props.notebooks.allNotebooks);

  allSec = getSectionsWithNewInstance(props.notebooks.allSections);

  if (currItem.type === ITEM_TYPE.WORKSHEET) {
    allWrk = getWorksheetsWithNewInstance(props.notebooks.allWorksheets);

    delete allWrk.byId[currItem.id];
    allWrk.allWorksheetsId = allWrk.allWorksheetsId.filter(
      (wid) => wid !== currItem.id
    );

    allSec.byId[currItem.parentSectionId].worksheetId = null;
    allSec.byId[currItem.parentSectionId].allAssetsId = allSec.byId[
      currItem.parentSectionId
    ].allAssetsId.filter((id) => id !== currItem.id);
    allNbk.byId[currItem.parentNotebookId].allAssetsId = allNbk.byId[
      currItem.parentNotebookId
    ].allAssetsId.filter((id) => id !== currItem.id);

    //need to make all associated item worksheetId to be null.. pending
  }

  if (currItem.type === ITEM_TYPE.GRAPHPAGE) {
    allGrPg = getGraphPagesWithNewInstance(props.notebooks.allGraphPages)

    delete allGrPg.byId[currItem.id];
    allGrPg.allGraphPagesId = allGrPg.allGraphPagesId.filter(
      (gid) => gid !== currItem.id
    );

    allSec.byId[currItem.parentSectionId].graphPage = allSec.byId[
      currItem.parentSectionId
    ].graphPage.filter((gid) => gid !== currItem.id);
    allSec.byId[currItem.parentSectionId].allAssetsId = allSec.byId[
      currItem.parentSectionId
    ].allAssetsId.filter((id) => id !== currItem.id);
    allNbk.byId[currItem.parentNotebookId].allAssetsId = allNbk.byId[
      currItem.parentNotebookId
    ].allAssetsId.filter((id) => id !== currItem.id);
  }

  if (currItem.type === ITEM_TYPE.REPORT) {
    allRep = getReportsWithNewInstance(props.notebooks.allReports);

    delete allRep.byId[currItem.id];
    allRep.allReportsId = allRep.allReportsId.filter(
      (rid) => rid !== currItem.id
    );

    allSec.byId[currItem.parentSectionId].report = allSec.byId[
      currItem.parentSectionId
    ].report.filter((rid) => rid !== currItem.id);
    allSec.byId[currItem.parentSectionId].allAssetsId = allSec.byId[
      currItem.parentSectionId
    ].allAssetsId.filter((id) => id !== currItem.id);
    allNbk.byId[currItem.parentNotebookId].allAssetsId = allNbk.byId[
      currItem.parentNotebookId
    ].allAssetsId.filter((id) => id !== currItem.id);
  }

  if (currItem.type === ITEM_TYPE.TRANSFORM) {
    allTransform = getTransformsWithNewInstance(props.notebooks.allTransforms);

    delete allTransform.byId[currItem.id];
    allTransform.allTransformsId = allTransform.allTransformsId.filter(
      (tid) => tid !== currItem.id
    );

    allSec.byId[currItem.parentSectionId].transform = allSec.byId[
      currItem.parentSectionId
    ].transform.filter((tid) => tid !== currItem.id);
    allSec.byId[currItem.parentSectionId].allAssetsId = allSec.byId[
      currItem.parentSectionId
    ].allAssetsId.filter((id) => id !== currItem.id);
    allNbk.byId[currItem.parentNotebookId].allAssetsId = allNbk.byId[
      currItem.parentNotebookId
    ].allAssetsId.filter((id) => id !== currItem.id);
  }

  if (currItem.type === ITEM_TYPE.EQUATION) {
    allEquation = getEquationsWithNewInstance(props.notebooks.allEquations);

    delete allEquation.byId[currItem.id];
    allEquation.allEquationsId = allEquation.allEquationsId.filter(
      (tid) => tid !== currItem.id
    );

    allSec.byId[currItem.parentSectionId].equation = allSec.byId[
      currItem.parentSectionId
    ].equation.filter((tid) => tid !== currItem.id);
    allSec.byId[currItem.parentSectionId].allAssetsId = allSec.byId[
      currItem.parentSectionId
    ].allAssetsId.filter((id) => id !== currItem.id);
    allNbk.byId[currItem.parentNotebookId].allAssetsId = allNbk.byId[
      currItem.parentNotebookId
    ].allAssetsId.filter((id) => id !== currItem.id);
  }

  allNbk.byId[currItem.parentNotebookId].isSaved = false
  currItem.isSaved = false
  updatedActiveItems = props.activeItems.filter(
    (active) => active.id !== currItem.id
  );

  return [
    allNbk,
    allSec,
    allWrk,
    allGrPg,
    allRep,
    allTransform,
    allEquation,
    updatedActiveItems,
    allActvItm,
  ];
};



//Deleting complete Section including each Section,Worksheet,Graph, Report

const deleteCompleteSection = (
  currItem: SectionProps | WorksheetProp | ReportProps | GraphPageProps,
  props: any
) => {
  let allNbk = null;
  let allSec = null;
  let allWrk = null;
  let allGrPg = null;
  let allRep = null;
  let allTransform = null;
  let allEquation = null;

  let worksheetId = [];
  let graphPageId: any = [];
  let reportId: any = [];
  let transformId: any = [];
  let equationId: any = [];

  let allActvItm = {
    ...props.allActiveItem,
  };
  let updatedActiveItems = [...props.activeItems];

  let allChildren = [currItem.id, ...currItem.children];
  let allChildObj = [];
  let index = 0;

  // getting all children section Id
  while (index < allChildren.length) {
    const childSec = props.notebooks.allSections.byId[allChildren[index]];
    allChildObj.push(childSec);
    allChildren = [...allChildren, ...childSec.children];
    index++;
  }

  index = 0;

  for (const obj of allChildObj) {
    //const wrksheet = props.notebooks.allWorksheets.byId[obj.worksheetId];
    obj.worksheetId ? worksheetId.push(obj.worksheetId) : '';

    //const grPg = obj.graphPage.map(gId => props.notebooks.allGraphPages.byId[gId])
    graphPageId = [...graphPageId, ...obj.graphPage];

    //const rep = obj.report.map(rId => props.notebooks.allReports.byId[rId])
    reportId = [...reportId, ...obj.report];

    transformId = [...transformId, ...obj.transform];

    equationId = [...equationId, ...obj.equation];
  }

  if (currItem.parentSectionId === null) {
    allNbk = {
      ...props.notebooks.allNotebooks,
      byId: {
        ...props.notebooks.allNotebooks.byId,
        [currItem.parentNotebookId]: {
          ...props.notebooks.allNotebooks.byId[currItem.parentNotebookId],
          children: props.notebooks.allNotebooks.byId[
            currItem.parentNotebookId
          ].children.filter((id) => currItem.id !== id),
        },
      },
    };

    allSec = getSectionsWithNewInstance(props.notebooks.allSections)
  }
  else {
    allNbk = getNotebooksWithNewInstance(props.notebooks.allNotebooks);

    allSec = {
      ...props.notebooks.allSections,
      byId: {
        ...props.notebooks.allSections.byId,
        [currItem.parentSectionId]: {
          ...props.notebooks.allSections.byId[currItem.parentSectionId],
          children: props.notebooks.allSections.byId[
            currItem.parentSectionId
          ].children.filter((id) => currItem.id !== id),

        },
      },
    };
    //little confusing
  }

  for (const secId of allChildren) {
    delete allSec.byId[secId];
    allSec.allSectionsId[currItem.parentNotebookId] = allSec.allSectionsId[
      currItem.parentNotebookId
    ].filter((id) => id !== secId);
  }

  // removing all worksheet if it present
  if (worksheetId.length > 0) {
    allWrk = getWorksheetsWithNewInstance(props.notebooks.allWorksheets);

    for (const wkId of worksheetId) {
      delete allWrk.byId[wkId];
      allWrk.allWorksheetsId = allWrk.allWorksheetsId.filter(
        (wid) => wid !== wkId
      );
      allNbk.byId[currItem.parentNotebookId].allAssetsId = allNbk.byId[
        currItem.parentNotebookId
      ].allAssetsId.filter((id) => id !== wkId);
    }
  }

  // removing all report if it present
  if (graphPageId.length > 0) {
    allGrPg = getGraphPagesWithNewInstance(props.notebooks.allGraphPages)

    for (const gpId of graphPageId) {
      delete allGrPg.byId[gpId];
      allGrPg.allGraphPagesId = allGrPg.allGraphPagesId.filter(
        (gid) => gid !== gpId
      );
      allNbk.byId[currItem.parentNotebookId].allAssetsId = allNbk.byId[
        currItem.parentNotebookId
      ].allAssetsId.filter((id) => id !== gpId);
    }
  }

  // removing all report if it present
  if (reportId.length > 0) {
    allRep = getReportsWithNewInstance(props.notebooks.allReports)

    for (const rpId of reportId) {
      delete allRep.byId[rpId];
      allRep.allReportsId = allRep.allReportsId.filter((rid) => rid !== rpId);
      allNbk.byId[currItem.parentNotebookId].allAssetsId = allNbk.byId[
        currItem.parentNotebookId
      ].allAssetsId.filter((id) => id !== rpId);
    }
  }

  if (transformId.length > 0) {
    allTransform = getTransformsWithNewInstance(props.notebooks.allTransforms)

    for (const rpId of transformId) {
      delete allTransform.byId[rpId];
      allTransform.allTransformsId = allTransform.allTransformsId.filter((rid) => rid !== rpId);
      allNbk.byId[currItem.parentNotebookId].allAssetsId = allNbk.byId[
        currItem.parentNotebookId
      ].allAssetsId.filter((id) => id !== rpId);
    }
  }

  if (equationId.length > 0) {
    allEquation = getEquationsWithNewInstance(props.notebooks.allEquations)

    for (const rpId of equationId) {
      delete allEquation.byId[rpId];
      allEquation.allEquationsId = allEquation.allEquationsId.filter((rid) => rid !== rpId);
      allNbk.byId[currItem.parentNotebookId].allAssetsId = allNbk.byId[
        currItem.parentNotebookId
      ].allAssetsId.filter((id) => id !== rpId);
    }
  }

  allNbk.byId[currItem.parentNotebookId].isSaved = false

  if (props.allActiveItem.notebook === currItem.parentNotebookId) {
    for (const secId of allChildren) {
      if (props.allActiveItem.section === secId) {
        allActvItm.section = '';
        allActvItm.worksheet = '';
        allActvItm.graphPage = '';
        allActvItm.report = '';
        allActvItm.transform = '';
        allActvItm.equation = '';
        allActvItm.selectedPivotItem = '';
        allActvItm.cursor = currItem.parentNotebookId;
        break;
      }
    }
  }

  for (const item of [...worksheetId, ...graphPageId, ...reportId, ...transformId, ...equationId]) {
    updatedActiveItems = updatedActiveItems.filter(
      (active) => active.id !== item
    );
  }

  return [
    allNbk,
    allSec,
    allWrk,
    allGrPg,
    allRep,
    allTransform,
    allEquation,
    updatedActiveItems,
    allActvItm,
  ];
};


export const deleteCompleteNotebook = (
  currItem: NotebookProps,
  props: any) =>{

    let allNbk = getNotebooksWithNewInstance(props.notebooks.allNotebooks);
    let allSec = getSectionsWithNewInstance(props.notebooks.allSections);
    let allWrk = getWorksheetsWithNewInstance(props.notebooks.allWorksheets);;
    let allGrPg = getGraphPagesWithNewInstance(props.notebooks.allGraphPages);
    let allRep = getReportsWithNewInstance(props.notebooks.allReports);
    let allTransform = getTransformsWithNewInstance(props.notebooks.allTransforms);
    let allEquation = getEquationsWithNewInstance(props.notebooks.allEquations);


    for (const secId of currItem.allSectionsId) {
      delete allSec.byId[secId];
    }
    delete allSec.allSectionsId[currItem.id]

    for(const assetId of currItem.allAssetsId){
      if(assetId in allWrk.byId){
        delete allWrk.byId[assetId]
        allWrk.allWorksheetsId = allWrk.allWorksheetsId.filter(
          (id) => id !== assetId
        );
      }
      else if(assetId in allGrPg.byId){
        delete allGrPg.byId[assetId]
        allGrPg.allGraphPagesId = allGrPg.allGraphPagesId.filter(
          (id) => id !== assetId
        );
      }
      else if(assetId in allRep.byId){
        delete allRep.byId[assetId]
        console.log(allRep)
        allRep.allReportsId = allRep.allReportsId.filter(
          (id) => id !== assetId
        );
      }
      else if(assetId in allTransform.byId){
        delete allTransform.byId[assetId]
        console.log(allTransform)
        allTransform.allTransformsId = allTransform.allTransformsId.filter(
          (id) => id !== assetId
        );
      }
      else if(assetId in allEquation.byId){
        delete allEquation.byId[assetId]
        console.log(allEquation)
        allEquation.allEquationsId = allEquation.allEquationsId.filter(
          (id) => id !== assetId
        );
      }
    }

    delete allNbk.byId[currItem.id]

    let allActvItm = {
      ...props.allActiveItem,
    };

    if (props.allActiveItem.notebook === currItem.id) {
      allActvItm.section = '';
      allActvItm.worksheet = '';
      allActvItm.graphPage = {
        id: '',
        object: ''
      };
      allActvItm.report = '';
      allActvItm.transform = '';
      allActvItm.equation = '';
      allActvItm.selectedPivotItem = '';
      allActvItm.cursor = '';

      let totalNotebook = Object.values(props.notebooks.allNotebooks.byId).sort((a, b) => a.createdDate - b.createdDate);

      totalNotebook = totalNotebook.filter(obj => obj.id!== currItem.id);
      allActvItm.notebook = totalNotebook.length>0 ? totalNotebook[0].id :'';

    }

    let updatedActiveItems = [...props.activeItems];

    for (const item of currItem.allAssetsId) {
      updatedActiveItems = updatedActiveItems.filter(
        (active) => active.id !== item
      );
    }

    return [
      allNbk,
      allSec,
      allWrk,
      allGrPg,
      allRep,
      allTransform,
      allEquation,
      updatedActiveItems,
      allActvItm,
    ];
}
