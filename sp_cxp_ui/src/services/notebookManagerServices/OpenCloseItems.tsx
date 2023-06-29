
import {
  NotebookProps,
  SectionProps,
  WorksheetProp,
  GraphPageProps,
  ReportProps,
} from './NotebookManagerInterfaces'

import * as TYPES from "./ConstantsNotebookManager";

export const openCloseNotebookItems = (currNotebook:NotebookProps, props:any, isOpen: boolean) => {

  console.log("Hello---> OPE", currNotebook)
  let allChildren = [...currNotebook.children]
  let allChildObj = [];
  let index = 0;

  // getting all children section Id
  while(index<allChildren.length){
    const childSec = props.notebooks.allSections.byId[allChildren[index]];
    allChildObj.push(childSec)
    //allChildren = [...allChildren, ...childSec.children];
    index++;
  }


  let worksheetObj = [];
  let graphPageObj:any =  [];
  let reportObj:any = [];

  for(const obj of allChildObj){
    const wrksheet = props.notebooks.allWorksheets.byId[obj.worksheetId];
    wrksheet ? worksheetObj.push(wrksheet) : '';

    const grPg = obj.graphPage.map(gId => props.notebooks.allGraphPages.byId[gId])
    graphPageObj = [...graphPageObj, ...grPg ];

    const rep = obj.report.map(rId => props.notebooks.allReports.byId[rId])
    reportObj = [...reportObj, ...rep ];
  }

  let allAssets = [...worksheetObj, ...graphPageObj, ...reportObj, ...allChildObj];
  allAssets = allAssets.sort((a,b) => a.createdDate - b.createdDate)

  //checking and Injecting if open and  Ejecting if Close each element from activeItem
  for (const element of allAssets) {
    let isUnique = true;

    for (const item of props.activeItems) {
      if (item.id == element.id) {
        isUnique = false;
      }
    }

    // If opening required and Injecting missing Item
    if(element.type === TYPES.SECTION){
      openCloseNotebookItems(element, props, isOpen)
    }
    else{
      if (isOpen && isUnique) {
        let allActiveItem = {
          notebook: element.parentNotebookId,
          section: element.parentSectionId,
          worksheet: null,
          graphPage: {
            id: null,
            objectId: null,
          },
          report: null,
          selectedItemOnNotebook: element.id,
          cursor: element.id,
        };

        if(element.type === TYPES.WORKSHEET){
          allActiveItem.worksheet = element.id
        }
        else if(element.type === TYPES.GRAPHPAGE){
          allActiveItem.graphPage.id = element.id
        }
        else if(element.type === TYPES.REPORT){
          allActiveItem.report = element.id
        }
        const newSummary = {
          id:element.id,
          type:element.type,
          createdDate: element.createdDate,
          modifiedDate: element.modifiedDate,
          author:element.author,
          description:element.description
        }
        props.summaryInfoAction(newSummary)
        props.setActiveItem(element);
        props.setAllActiveItem(allActiveItem)
        props.setSelectedPivotItem(element.id)
      }

  }

    // If closing required and ejecting matched Item
    // if (!isOpen && !isUnique) {
    //   props.removeActiveItem(element.id);
    // }
  }
};


export const openCloseSectionItems = (currSection:SectionProps, props:any, isOpen: boolean) => {
  // collecting all worksheet, graphPage, report, and subsection`s wksheet, grphPage and report


  let allChildObj = [currSection];

  let worksheetObj = [];
  let graphPageObj:any =  [];
  let reportObj:any = [];

  for(const obj of allChildObj){
    const wrksheet = props.notebooks.allWorksheets.byId[obj.worksheetId];
    wrksheet ? worksheetObj.push(wrksheet) : '';

    const grPg = obj.graphPage.map(gId => props.notebooks.allGraphPages.byId[gId])
    graphPageObj = [...graphPageObj, ...grPg ];

    const rep = obj.report.map(rId => props.notebooks.allReports.byId[rId])
    reportObj = [...reportObj, ...rep ];
  }

  let allAssets = [...worksheetObj, ...graphPageObj, ...reportObj];
  allAssets = allAssets.sort((a,b) => a.createdDate - b.createdDate)
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
      let allActiveItem = {
        notebook: element.parentNotebookId,
        section: element.parentSectionId,
        worksheet: null,
        graphPage: {
          id: null,
          objectId: null,
        },
        report: null,
        selectedItemOnNotebook: element.id,
        cursor: element.id,
      };

      if(element.type === TYPES.WORKSHEET){
        allActiveItem.worksheet = element.id
      }
      else if(element.type === TYPES.GRAPHPAGE){
        allActiveItem.graphPage.id = element.id
      }
      else if(element.type === TYPES.REPORT){
        allActiveItem.report = element.id
      }
      const newSummary = {
        id:element.id,
        type:element.type,
        createdDate: element.createdDate,
        modifiedDate: element.modifiedDate,
        author:element.author,
        description:element.description
      }
      props.summaryInfoAction(newSummary)
      props.setActiveItem(element);
      props.setAllActiveItem(allActiveItem)
      props.setSelectedPivotItem(element.id)
    }

    // If closing required and ejecting matched Item
    if (!isOpen && !isUnique) {
      props.removeActiveItem(element.id);
    }
  }
};


export const openCloseEachItem = (currAsset:WorksheetProp|ReportProps|GraphPageProps, props:any, isOpen: boolean) => {
  let isUnique = true;
  for (const item of props.activeItems) {
    if (item.id == currAsset.id) {
      isUnique = false;
    }
  }

  if (isOpen && isUnique) {
    let allActiveItem = {
      notebook: currAsset.parentNotebookId,
      section: currAsset.parentSectionId,
      worksheet: null,
      graphPage: {
        id: null,
        objectId: null,
      },
      report: null,
      selectedItemOnNotebook: currAsset.id,
      cursor: currAsset.id,
    };

    if(currAsset.type === TYPES.WORKSHEET){
      allActiveItem.worksheet = currAsset.id
    }
    else if(currAsset.type === TYPES.GRAPHPAGE){
      allActiveItem.graphPage.id = currAsset.id
    }
    else if(currAsset.type === TYPES.REPORT){
      allActiveItem.report = currAsset.id
    }
    else if(currAsset.type === TYPES.TRANSFORM){
      props.TransformAction.isOpenUserDefined({
        message: true,
        transformId: currAsset.id
      })
    }
    else if(currAsset.type === TYPES.EQUATION){
      // TODO: Open regression wizard instead of equation
      props.TransformAction.isOpenEquation({
        message: true,
        equationId: currAsset.id
      })
    }

    if(currAsset.type !== TYPES.TRANSFORM && currAsset.type !== TYPES.EQUATION) {
      const newSummary = {
        id:currAsset.id,
        type:currAsset.type,
        createdDate: currAsset.createdDate,
        modifiedDate: currAsset.modifiedDate,
        author:currAsset.author,
        description:currAsset.description
      }
      props.summaryInfoAction(newSummary)
      props.setActiveItem(currAsset);
      props.setAllActiveItem(allActiveItem)
      props.setSelectedPivotItem(currAsset.id)
    }
  }
  if (!isOpen && !isUnique) {
    props.removeActiveItem(currAsset.id);
  }
};


export const closeAllItems = (removeAllActiveItem:any) => {
  removeAllActiveItem();
}
