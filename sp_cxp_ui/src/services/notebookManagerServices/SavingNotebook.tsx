
// import { getNotebookFilePath, setNotebookFilePath } from '../RedisServices'

import {
  NotebookProps,
} from './NotebookManagerInterfaces'

import {
  getAllNotebookSaveStructure,
  getNotebooksWithNewInstance,
  getSectionsWithNewInstance,
  getWorksheetsWithNewInstance,
  getGraphPagesWithNewInstance,
  getReportsWithNewInstance } from "./NewInstanceObject";
import { deleteItem } from '../NotebookManagerServicesNew';
import {encrypt} from '../EncrypDecrypt'
const {remote} = require('electron');
const fs = require('fs');
// const dialog = remote.dialog;
// const browserWindow = remote.getCurrentWindow();

import { getDataSetByKey } from '../../services/RedisServices';

import { getOS } from '../../utils/globalUtility'
const options = {
  title: "Save As",
 
  buttonLabel : "Save",
  filters :[
      {name: 'SigmaPlot Notebook File', extensions: ['JNBx']},
      {name: 'All Files', extensions: ['*']}
  ]
};

export const  saveCompleteNotebook = async (notebook:NotebookProps[], props:any, isRemainOpen?:any)=>{

  let newAllNbkState = null;
  let isSuccess = true;
  let newProp = {
    notebooks: props.notebooks,
    saveItem: props.saveItem,
    allActiveItem: props.allActiveItem,
    activeItems: props.activeItems,
    openWorksheets:props.openWorksheets,
    recentSavedFileAction: props.recentSavedFileAction
  }
  for(let i=0; i<notebook.length;i++){
    //const savedFilePath = await getNotebookFilePath(notebook[i].savedId)
    let savedFilePath = notebook[i].savedPath
    if(!savedFilePath){

      [newAllNbkState, isSuccess] = await openSaveAsNotebook(notebook[i], newProp, isRemainOpen)
      if(!isRemainOpen && isSuccess){
        newAllNbkState = deleteItem(notebook[i], props)
      }

    }
    else{
      const [savedNbkObj, newNbkId] = await getNotebookObjectForSave(notebook[i], newProp, savedFilePath);
      newAllNbkState = getUpdatedSavedNotebookState(notebook[i], props, savedFilePath, newNbkId);
      let encryptedNotebook = encrypt(savedNbkObj)
      fs.writeFileSync(savedFilePath, JSON.stringify(encryptedNotebook));
      if(!isRemainOpen){
        newAllNbkState = deleteItem(notebook[i], props)
      }
      else{
        props.saveItem(newAllNbkState)
      }

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

  return [newProp, isSuccess]

}


export const openSaveAsNotebook =  async (notebook:NotebookProps, props:any, isRemainOpen:any, isReSave?:boolean) => {
 let saveOption={
    ...options,
    defaultPath : notebook.name,
  }
  let saveDialog = remote.dialog.showSaveDialog(remote.getCurrentWindow(), saveOption);
  let newAllNbkState = props.notebooks;
  let isSuccess = true;
  await saveDialog.then(async function(saveTo) {

      if(saveTo.filePath){
        console.log('SAVINF NNNN', notebook)
        // 1. get object for Saving
        // 2. updated Notebook Object.
        //const [newAllState, newNbkId, savedNbkObj] = changeNotebookId(notebook, props, saveTo.filePath, true)
        console.log('************************', )
        const [savedNbkObj, newNbkId] = await getNotebookObjectForSave(notebook, props, saveTo.filePath);
        console.log('-----------------------', savedNbkObj)
        let encryptedNotebook = encrypt(savedNbkObj)

        fs.writeFileSync(saveTo.filePath, JSON.stringify(encryptedNotebook));

        let allPath = saveTo.filePath.split('\\')
        if(getOS() == 'Mac OS'){
          allPath  = saveTo.filePath.split('/');
        }
        let shortHand = saveTo.filePath;
        if(allPath.length>=4){
          if(getOS() == 'Mac OS'){
            shortHand = [allPath[0],allPath[1],'...',allPath[allPath.length-2],allPath[allPath.length-1]].join('/');
          }
          else{
            shortHand = [allPath[0],allPath[1],'...',allPath[allPath.length-2],allPath[allPath.length-1]].join('\\');
          }
          

        }
        const recentPath = {
          path: saveTo.filePath,
          path_shortHand: shortHand
        }
        props.recentSavedFileAction(recentPath)
        // const status = await setNotebookFilePath(notebook.savedId, saveTo.filePath)
        if(isRemainOpen){
          newAllNbkState = getUpdatedSavedNotebookState(notebook, props, saveTo.filePath, newNbkId, isReSave);
          props.saveItem(newAllNbkState)
        }
      }
      else{
        isSuccess = false;
      }
  })
  .catch((err)=>{
    console.log(err)
  });

  return [newAllNbkState, isSuccess]
};


const getNewNotebookId = (notebookId:string) => {
  const timestamp = new Date().getTime();
  const nbkId = notebookId.split("_");
  let newNbkId = `${nbkId[0]}_${timestamp}`;
  return newNbkId
}


export const getNotebookObjectForSave = async (notebook:NotebookProps, props:any, filePath:string,) =>{
  let saveNbkStr = getAllNotebookSaveStructure(); 

  let fileName  = filePath.split('\\');
  if(getOS() == 'Mac OS'){
    fileName  = filePath.split('/');
  }
  fileName = fileName[fileName.length-1];

  let sectionsId = [...notebook.allSectionsId];
  let assetsId = [...notebook.allAssetsId];


  let newNbkId = getNewNotebookId(notebook.id);

  saveNbkStr.allNotebooks.byId[notebook.id] = {...notebook};
  saveNbkStr.allNotebooks.allNotebooksId.push(notebook.id);
  saveNbkStr.allNotebooks.byId[notebook.id].name = fileName;
  saveNbkStr.allNotebooks.byId[notebook.id].isSaved = true;
  saveNbkStr.allNotebooks.byId[notebook.id].savedPath = filePath;
  saveNbkStr.allNotebooks.byId[notebook.id].savedId = newNbkId;

  saveNbkStr.allSections.allSectionsId[notebook.id] = [];
  for (const secId of sectionsId) {
    if(secId in props.notebooks.allSections.byId){
      saveNbkStr.allSections.byId[secId] = props.notebooks.allSections.byId[secId];
      saveNbkStr.allSections.byId[secId].isSaved = true
      saveNbkStr.allSections.allSectionsId[notebook.id].push(secId)
    }

  }

  for (const id of assetsId) {

    if(id in props.notebooks.allWorksheets.byId){
      saveNbkStr.allWorksheets.byId[id] = props.notebooks.allWorksheets.byId[id];
      saveNbkStr.allWorksheets.byId[id].isSaved = true
      saveNbkStr.allWorksheets.allWorksheetsId.push(id)
      let openedWorksheet = props.openWorksheets.filter(
        (item) => item.key == id
      );
      if (openedWorksheet.length) {
        let gridData = await getDataSetByKey(
          openedWorksheet[0].key,
          openedWorksheet[0].client
        );
        
        saveNbkStr.allWorksheetDetails.push({
          wid:id,
          data:gridData
        })
      }
    }
    else if(id in props.notebooks.allGraphPages.byId){
      saveNbkStr.allGraphPages.byId[id] = props.notebooks.allGraphPages.byId[id];
      saveNbkStr.allGraphPages.byId[id].isSaved = true
      saveNbkStr.allGraphPages.allGraphPagesId.push(id)
     let isWorksheetIDExist = saveNbkStr.allWorksheetDetails.filter((item) => item.wid === props.notebooks.allGraphPages.byId[id].worksheetId)
      if(!isWorksheetIDExist[0]) {
        let openedWorksheet = props.openWorksheets.filter(
          (item) => item.key == props.notebooks.allGraphPages.byId[id].worksheetId
        );
        if (openedWorksheet.length) {
          let gridData = await getDataSetByKey(
            openedWorksheet[0].key,
            openedWorksheet[0].client
          );
          saveNbkStr.allWorksheetDetails.push({
            wid:openedWorksheet[0].key,
            data:gridData
          })
        }
      }

    }
    else if(id in props.notebooks.allReports.byId){
      saveNbkStr.allReports.byId[id] = props.notebooks.allReports.byId[id];
      saveNbkStr.allReports.byId[id].isSaved = true
      saveNbkStr.allReports.allReportsId.push(id)
    }
    else if(id in props.notebooks.allTransforms.byId){
      saveNbkStr.allTransforms.byId[id] = props.notebooks.allTransforms.byId[id];
      saveNbkStr.allTransforms.byId[id].isSaved = true
      saveNbkStr.allTransforms.allTransformsId.push(id)
    }


  }


  let savedObj = JSON.stringify(saveNbkStr);

  //change ID of Notebook from everywhere
  savedObj = savedObj.replaceAll(notebook.id,newNbkId)

  saveNbkStr = JSON.parse(savedObj)

  return [saveNbkStr, newNbkId]

}

export const getUpdatedSavedNotebookState = (notebook:NotebookProps, props:any, filePath:string, newNbkId:string, isReSave?:boolean) => {
  let allNbk = getNotebooksWithNewInstance(props.notebooks.allNotebooks);
  let allSec = null;
  let allWrk = null;
  let allGrPg = null;
  let allRep = null;

  let sectionsId = [...notebook.allSectionsId];
  let assetsId = [...notebook.allAssetsId];

  let fileName  = filePath.split('\\');
  if(getOS() == 'Mac OS'){
    fileName  = filePath.split('/');
  }
  fileName = fileName[fileName.length-1];
  console.log(allNbk.byId[notebook.id])
  allNbk.byId[notebook.id].name = fileName;
  allNbk.byId[notebook.id].isSaved = true;
  allNbk.byId[notebook.id].savedPath = filePath;

  if(isReSave)
    allNbk.byId[notebook.id].savedId = newNbkId;


  // iterating through each section
  for (const secId of sectionsId) {
    if(secId in props.notebooks.allSections.byId){
      if(!allSec){
        allSec = getSectionsWithNewInstance(props.notebooks.allSections);
      }
      allSec.byId[secId].isSaved = true
    }

  }

  // iterating through all Assets like worksheet, graphPage, Reports and making isSaved = true
  for (const id of assetsId) {
    if(id in props.notebooks.allWorksheets.byId){
      if(!allWrk){
        allWrk = getWorksheetsWithNewInstance(props.notebooks.allWorksheets);
      }
      allWrk.byId[id].isSaved = true
    }
    else if(id in props.notebooks.allGraphPages.byId){
      if(!allGrPg){
        allGrPg = getGraphPagesWithNewInstance(props.notebooks.allGraphPages);
      }
      allGrPg.byId[id].isSaved = true
    }
    else if(id in props.notebooks.allReports.byId){
      if(!allRep){
        allRep = getReportsWithNewInstance(props.notebooks.allReports);
      }
      allRep.byId[id].isSaved = true
    }

  }

  return {
    allNbk,
    allSec,
    allWrk,
    allGrPg,
    allRep,
  }

}

export const getUpdatedNewProps = (newProps:any, updateState:any) => {
  const latestProps = {
    ...newProps,
    notebooks:{
      ...newProps.notebooks,
      ...(updateState.allNbk) && {allNotebooks:updateState.allNbk},
      ...(updateState.allSec) && {allSections:updateState.allSec},
      ...(updateState.allWrk) && {allWorksheets:updateState.allWrk},
      ...(updateState.allGrPg) && {allGraphPages:updateState.allGrPg},
      ...(updateState.allRep) && {allReports:updateState.allRep},
    },
    ...(updateState.actvItm) && {activeItems:updateState.actvItm},
    ...(updateState.allActvItm) && {allActiveItem:updateState.allActvItm},
  }

  return latestProps
}

export const exportNotebook =  async (notebook:NotebookProps, props:any) => {
  
  let saveDialog = remote.dialog.showSaveDialog(remote.getCurrentWindow(), options);
  let newAllNbkState = props.notebooks;
  let isSuccess = true;
  await saveDialog.then(async function(saveTo) {

      if(saveTo.filePath){
        // 1. get object for Saving
        // 2. updated Notebook Object.
        //const [newAllState, newNbkId, savedNbkObj] = changeNotebookId(notebook, props, saveTo.filePath, true)
        console.log('************************', )
        const [savedNbkObj, newNbkId] = await getNotebookObjectForSave(notebook, props, saveTo.filePath);
        console.log('-----------------------', savedNbkObj)
        let encryptedNotebook = encrypt(savedNbkObj)

        fs.writeFileSync(saveTo.filePath, JSON.stringify(encryptedNotebook));

      }
      else{
        isSuccess = false;
      }
  })
  .catch((err)=>{
    console.log(err)
  });

  return [newAllNbkState, isSuccess]
};