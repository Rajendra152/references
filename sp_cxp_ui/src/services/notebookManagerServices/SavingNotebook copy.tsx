
import { getNotebookFilePath, setNotebookFilePath } from '../RedisServices'

import {
  NotebookProps,
} from './NotebookManagerInterfaces'

const {remote} = require('electron');
const fs = require('fs');
const dialog = remote.dialog;
const browserWindow = remote.getCurrentWindow();

const options = {
  title: "Save file",
  buttonLabel : "Save",
  filters :[
      {name: 'JSON File ( *.json ) ', extensions: ['json']},
      {name: 'All Files', extensions: ['*']}
  ]
};



export const  saveCompleteNotebook = async (notebook:NotebookProps[], props:any)=>{

  for(let i=0; i<notebook.length;i++){
    const data = await getNotebookFilePath(notebook[i].id)
    let newProp = {
      notebooks: props.notebooks,
      saveItem: props.saveItem,
      allActiveItem: props.allActiveItem,
      activeItems: props.activeItems
    }

    let newAllNbkState = null;
    if(data === null){
      const [nbk, newAllState] = await openSaveAsNotebook(notebook[i], newProp, notebook.length>1)
      newAllNbkState = {...newAllState}
    }

    else{
      const [newAllState, newNbkId, savedNbk] = changeNotebookId(notebook[i], newProp, data)
      fs.writeFileSync(data, JSON.stringify(savedNbk, null, 2), 'utf-8');
      newAllNbkState = {...newAllState}
      props.saveItem(newAllNbkState)
    }

    if(newAllNbkState){
      newProp.notebooks.allNotebooks = newAllNbkState.allNbk ? newAllNbkState.allNbk: newProp.notebooks.allNotebooks;
      newProp.notebooks.allSections = newAllNbkState.allSec? newAllNbkState.allSec: newProp.notebooks.allSections;
      newProp.notebooks.allWorksheets = newAllNbkState.allWrk? newAllNbkState.allWrk: newProp.notebooks.allWorksheets;
      newProp.notebooks.allReports = newAllNbkState.allRep ? newAllNbkState.allRep : newProp.notebooks.allReports;
      newProp.notebooks.allGraphPages = newAllNbkState.allGrPg ? newAllNbkState.allGrPg: newProp.notebooks.allGraphPages;
      newProp.activeItems = newAllNbkState.actvItm ? newAllNbkState.actvItm : newProp.activeItems;
      newProp.allActiveItem = newAllNbkState.allActvItm ? newAllNbkState.allActvItm : newProp.allActiveItem;
    }

  }

}


export const openSaveAsNotebook =  async (notebook:NotebookProps, props:any, isAllItem) =>{
  let saveDialog = dialog.showSaveDialog(browserWindow, options);
  let updatedNbk;
  let newAllNbkState;;
  await saveDialog.then(async function(saveTo,) {
      if(saveTo.filePath){
        const [newAllState, newNbkId, savedNbk] = changeNotebookId(notebook, props, saveTo.filePath, true)
        console.log(newAllState)
        newAllNbkState = newAllState;
        fs.writeFileSync(saveTo.filePath, JSON.stringify(savedNbk, null, 2), 'utf-8');
        const status = await setNotebookFilePath(newNbkId, saveTo.filePath)
        if(status === 'OK'){
          props.saveItem(newAllState)
        }

      }
  });

  return [updatedNbk, newAllNbkState]
};



const changeNotebookId = (notebook:NotebookProps, props:any, filePath:string, isRequiredChangeId?:boolean) =>{
  let allNbk = null;
  let allSec = null;
  let allWrk = null;
  let allGrPg = null;
  let allRep = null;
  let worksheetId = [];
  let graphPageId:any =  [];
  let reportId:any = [];
  let updatedActiveItems = [...props.activeItems];
  let fileName  = filePath.split('\\');
  fileName = fileName[fileName.length-1];
  const savedNbk = {
    allNotebooks:{
      byId:{},
      allNotebooksId:[]
    },
    allSections:{
      byId:{},
      allSectionsId:{}
    },
    allWorksheets:{
      byId:{},
      allWorksheetsId:[]
    },
    allGraphPages:{
      byId:{},
      allGraphPagesId:[]
    },
    allReports:{
      byId:{},
      allReportsId:[]
    },
    allTransforms:{
      byId:{},
      allTransformsId:[]
    },
    allEquations:{
      byId:{},
      allEquationsId:[]
    }
  }

  let newNbkId = notebook.id;
  if(isRequiredChangeId){
    newNbkId = getNewNotebookId(notebook.id);
  }



  let allChildren = [...notebook.children]
  let allChildObj = [];
  let index = 0;

    // getting all children section Id
    while(index<allChildren.length){
      const childSec = props.notebooks.allSections.byId[allChildren[index]];

      allChildObj.push({
        ...childSec,
        children: [...childSec.children],
        parentLoop:[...childSec.parentLoop],
        allAssetsId:[...childSec.allAssetsId]
        })

      allChildren = [...allChildren, ...childSec.children];
      index++;
    }

    index = 0;

    for(const obj of allChildObj){
      //const wrksheet = props.notebooks.allWorksheets.byId[obj.worksheetId];
      obj.worksheetId ? worksheetId.push(obj.worksheetId) : '';

      //const grPg = obj.graphPage.map(gId => props.notebooks.allGraphPages.byId[gId])
      graphPageId = [...graphPageId, ...obj.graphPage ];

      //const rep = obj.report.map(rId => props.notebooks.allReports.byId[rId])
      reportId = [...reportId, ... obj.report ];
    }

    // removing all worksheet if it present
    if(worksheetId.length>0){
      allWrk = {
        ...props.notebooks.allWorksheets,
        byId:{
          ...props.notebooks.allWorksheets.byId
        },
        allWorksheetsId: [...props.notebooks.allWorksheets.allWorksheetsId]
      }

      for(const wkId of worksheetId){
        const newWKId = wkId.replace(notebook.id, newNbkId)
        allWrk.byId[newWKId] = {
          ...allWrk.byId[wkId],
          id: allWrk.byId[wkId].id.replace(notebook.id, newNbkId),
          parentNotebookId: allWrk.byId[wkId].parentNotebookId.replace(notebook.id, newNbkId),
          parentSectionId: allWrk.byId[wkId].parentSectionId.replace(notebook.id, newNbkId),
          parentLoop: allWrk.byId[wkId].parentLoop.map(id => id.replace(notebook.id, newNbkId)),
          worksheetId: allWrk.byId[wkId].id.replace(notebook.id, newNbkId)

        }
        savedNbk.allWorksheets.byId[newWKId] = allWrk.byId[newWKId]
        savedNbk.allWorksheets.allWorksheetsId = [...savedNbk.allWorksheets.allWorksheetsId, newWKId]
        if(isRequiredChangeId)
          delete allWrk.byId[wkId];
        allWrk.allWorksheetsId = allWrk.allWorksheetsId.map(wid => wid.replace(notebook.id, newNbkId));
        updatedActiveItems = updatedActiveItems.map(act => {
          if(act.id === wkId){
            return {...allWrk.byId[newWKId]}
          }
          else{
            return act
          }
        });



      }

    }

    // removing all report if it present
    if(graphPageId.length>0){
      allGrPg = {
        ...props.notebooks.allGraphPages,
        byId:{
          ...props.notebooks.allGraphPages.byId
        },
        allGraphPagesId: [...props.notebooks.allGraphPages.allGraphPagesId]
      }

      for(const gpId of graphPageId){
        const newGrpId = gpId.replace(notebook.id, newNbkId)
        allGrPg.byId[newGrpId] = {
          ...allGrPg.byId[gpId],
          id: allGrPg.byId[gpId].id.replace(notebook.id, newNbkId),
          parentNotebookId: allGrPg.byId[gpId].parentNotebookId.replace(notebook.id, newNbkId),
          parentSectionId: allGrPg.byId[gpId].parentSectionId.replace(notebook.id, newNbkId),
          parentLoop: allGrPg.byId[gpId].parentLoop.map(id => id.replace(notebook.id, newNbkId)),
          worksheetId: allGrPg.byId[gpId].id.replace(notebook.id, newNbkId)

        }
        savedNbk.allGraphPages.byId[newGrpId] = allGrPg.byId[newGrpId]
        savedNbk.allGraphPages.allGraphPagesId = [...savedNbk.allGraphPages.allGraphPagesId, newGrpId]
        if(isRequiredChangeId)
          delete allGrPg.byId[gpId];
        allGrPg.allGraphPagesId = allGrPg.allGraphPagesId.map(gid => gid.replace(notebook.id, newNbkId));
        updatedActiveItems = updatedActiveItems.map(act => {
          if(act.id === gpId){
            return {...allGrPg.byId[newGrpId]}
          }
          else{
            return act
          }
        });

      }
    }

    // removing all report if it present
    if(reportId.length>0){
      allRep = {
        ...props.notebooks.allReports,
        byId:{
          ...props.notebooks.allReports.byId
        },
        allReportsId: [...props.notebooks.allReports.allReportsId]
      }

      for(const rpId of reportId){
        const newRepId = rpId.replace(notebook.id, newNbkId)
        allRep.byId[newRepId] = {
          ...allRep.byId[rpId],
          id: allRep.byId[rpId].id.replace(notebook.id, newNbkId),
          parentNotebookId: allRep.byId[rpId].parentNotebookId.replace(notebook.id, newNbkId),
          parentSectionId: allRep.byId[rpId].parentSectionId.replace(notebook.id, newNbkId),
          parentLoop: allRep.byId[rpId].parentLoop.map(id => id.replace(notebook.id, newNbkId)),
          worksheetId: allRep.byId[rpId].id.replace(notebook.id, newNbkId)

        }

        savedNbk.allReports.byId[newRepId] = allRep.byId[newRepId]
        savedNbk.allReports.allReportsId = [...savedNbk.allReports.allReportsId, newRepId]
        if(isRequiredChangeId)
          delete allRep.byId[rpId];
        allRep.allReportsId = allRep.allReportsId.map(rid => rid.replace(notebook.id, newNbkId));
        updatedActiveItems = updatedActiveItems.map(act => {
          if(act.id === rpId){
            return {...allRep.byId[newRepId]}
          }
          else{
            return act
          }
        });
      }
    }


    allSec = {
      ...props.notebooks.allSections,
      byId:{
        ...props.notebooks.allSections.byId,
      },
      allSectionsId: {
        ...props.notebooks.allSections.allSectionsId
      }
    }

    for(const secId of allChildren){
      const newSecId = secId.replace(notebook.id, newNbkId)
        allSec.byId[newSecId] = {
          ...allSec.byId[secId],
          id: allSec.byId[secId].id.replace(notebook.id, newNbkId),
          parentNotebookId: allSec.byId[secId].parentNotebookId.replace(notebook.id, newNbkId),
          parentSectionId: allSec.byId[secId].parentSectionId?  allSec.byId[secId].parentSectionId.replace(notebook.id, newNbkId): allSec.byId[secId].parentSectionId,
          parentLoop: allSec.byId[secId].parentLoop.map(id => id.replace(notebook.id, newNbkId)),
          children: allSec.byId[secId].children.map(id => id.replace(notebook.id, newNbkId)),
          worksheetId: allSec.byId[secId].worksheetId.replace(notebook.id, newNbkId),
          graphPage: allSec.byId[secId].graphPage.map(id => id.replace(notebook.id, newNbkId)),
          report: allSec.byId[secId].report.map(id => id.replace(notebook.id, newNbkId)),
          allAssetsId: allSec.byId[secId].allAssetsId.map(id => id.replace(notebook.id, newNbkId)),
          activeChild: allSec.byId[secId].activeChild.replace(notebook.id, newNbkId)
        }

      savedNbk.allSections.byId[newSecId] = allSec.byId[newSecId]
      savedNbk.allSections.allSectionsId[newNbkId] = savedNbk.allSections.allSectionsId[newNbkId] ?
                    [...savedNbk.allSections.allSectionsId[newNbkId], newSecId]:
                    [newSecId];
      if(isRequiredChangeId)
        delete allSec.byId[secId]
      allSec.allSectionsId[newNbkId] = allSec.allSectionsId[notebook.id].map(id => id.replace(notebook.id, newNbkId));
      allSec.allSectionsId[notebook.id];
    }

    allNbk = {
      ...props.notebooks.allNotebooks,
      byId:{
        ...props.notebooks.allNotebooks.byId,
      },
    }

    allNbk.byId[newNbkId] = {
      ...allNbk.byId[notebook.id],
      id: allNbk.byId[notebook.id].id.replace(notebook.id, newNbkId),
      name: fileName,
      children: allNbk.byId[notebook.id].children.map(id => id.replace(notebook.id, newNbkId)),
      allSectionsId: allNbk.byId[notebook.id].allSectionsId.map(id => id.replace(notebook.id, newNbkId)),
      allWorksheetsId: allNbk.byId[notebook.id].allWorksheetsId.map(id => id.replace(notebook.id, newNbkId)),
      allGraphPagesId: allNbk.byId[notebook.id].allGraphPagesId.map(id => id.replace(notebook.id, newNbkId)),
      allReportsId: allNbk.byId[notebook.id].allReportsId.map(id => id.replace(notebook.id, newNbkId)),
      allAssetsId: allNbk.byId[notebook.id].allAssetsId.map(id => id.replace(notebook.id, newNbkId)),
      activeSection: allNbk.byId[notebook.id].activeSection.replace(notebook.id, newNbkId),
      activeChild: allNbk.byId[notebook.id].activeChild.replace(notebook.id, newNbkId),
      savedPath: filePath,
    }

  savedNbk.allNotebooks.byId[newNbkId] = allNbk.byId[newNbkId]
  savedNbk.allNotebooks.allNotebooksId = [newNbkId]

  if(isRequiredChangeId)
    delete allNbk.byId[notebook.id]
  allNbk.allNotebooksId = allNbk.allNotebooksId.map(id => id.replace(notebook.id, newNbkId))



    const allActvItm = {
      ...props.allActiveItem,
      notebook: props.allActiveItem.notebook ? props.allActiveItem.notebook.replace(notebook.id, newNbkId) :props.allActiveItem.notebook,
      section: props.allActiveItem.section ? props.allActiveItem.section.replace(notebook.id, newNbkId) : props.allActiveItem.section,
      worksheet: props.allActiveItem.worksheet ? props.allActiveItem.worksheet.replace(notebook.id, newNbkId) : props.allActiveItem.worksheet,
      graphPage: {
        id: props.allActiveItem.graphPage.id ? props.allActiveItem.graphPage.id.replace(notebook.id, newNbkId) : props.allActiveItem.graphPage.id,
        object: ""
      },
      report: props.allActiveItem.report ? props.allActiveItem.report.replace(notebook.id, newNbkId) : props.allActiveItem.report,
      selectedItemOnNotebook: props.allActiveItem.selectedItemOnNotebook ? props.allActiveItem.selectedItemOnNotebook.replace(notebook.id, newNbkId) : props.allActiveItem.selectedItemOnNotebook,
      cursor: props.allActiveItem.cursor ? props.allActiveItem.cursor.replace(notebook.id, newNbkId) : props.allActiveItem.cursor
    }

   const updatedItem = {
    allNbk,
    allSec ,
    allWrk,
    allGrPg,
    allRep,
    actvItm:updatedActiveItems,
    allActvItm
  }

  return [updatedItem, newNbkId, savedNbk]

}


const getNewNotebookId = (notebookName:string) => {
  const timestamp = new Date().getTime();
  const nbkId = notebookName.split("_SPX_");
  let newNbkId = "";
  if(nbkId.length>1){
    nbkId.shift();
    newNbkId = `N${timestamp}_SPX_${nbkId.join("")}`
  }
  else{
    newNbkId = `N${timestamp}_SPX_${nbkId.join("")}`
  }

  return newNbkId
}
