
import {
  NotebookProps,
  SectionProps,
  WorksheetProp,
  GraphPageProps,
  ReportProps,
  TransformProps,
  EquationProps
} from './NotebookManagerInterfaces'


import {
  getDefaultSectionObject,
  getDefaultWorksheet,
  getDefaultReport,
  getDefaultGraphPage,
  getDefaultTransform,
  getDefaultEquation
 } from "./GetDefaultObject";

 import { getDataSetByKey } from '../../services/RedisServices';
 import {
  setWorksheetData,
} from './../../services/WorksheetServicesNew';

 import * as ITEM_TYPE from './ConstantsNotebookManager'

export const pastingItemIntoNode = (currItem:NotebookProps|SectionProps|WorksheetProp|ReportProps|GraphPageProps|TransformProps|EquationProps, copiedItem:SectionProps|WorksheetProp|ReportProps|GraphPageProps|TransformProps|EquationProps, props:any) => {

  const newAllNotebooks  = {
    newNbk: null,
    newSec: null,
    newWrk: null,
    newGrPg: null,
    newRep: null,
    newCopied: null,
    newTransform: null,
    newEquation: null,
  }

  let allCopiedId = {...props.notebooks.allCopiedId}
  if(copiedItem.type === ITEM_TYPE.SECTION){
    console.log("here section",currItem, copiedItem, props)  
    pasteEntireSection(currItem, copiedItem, props);
  }
  else{

    let parentNbk = props.notebooks.allNotebooks.byId[currItem.parentNotebookId];
    let parentSec = null;

    if(currItem.type === ITEM_TYPE.NOTEBOOK){

      parentNbk = props.notebooks.allNotebooks.byId[currItem.id]
      parentSec = getDefaultSectionObject(
        `Sec${parentNbk.allSectionsId.length + 1}`,
        `Section ${parentNbk.allSectionsId.length + 1}`,
        parentNbk.id,
        props.licenseInfo?.userName
      );

      parentSec.parentLoop= [parentNbk.id];
      parentNbk.allSectionsId.push(parentSec.id)
      parentNbk.children.push(parentSec.id)

    }
    else if(currItem.type === ITEM_TYPE.SECTION){
      parentSec = props.notebooks.allSections.byId[currItem.id];
    }
    else{
      parentSec = props.notebooks.allSections.byId[currItem.parentSectionId];
    }

    parentNbk.isSaved = false
    if(copiedItem.type === ITEM_TYPE.WORKSHEET){
      let [wrkName, obj] = getCopiedItemId(copiedItem.name, allCopiedId, true);
      const newWrk = getDefaultWorksheet(wrkName, wrkName, parentNbk.id, parentSec.id,props.licenseInfo?.userName);
      allCopiedId = obj;
      newWrk.level = parentSec.level;
      newWrk.parentLoop = [...parentSec.parentLoop, parentSec.id];
      //data need to copy
      cloneWorksheetData(copiedItem.id, newWrk.id, props)
      parentSec.worksheetId = newWrk.id;
      parentSec.allAssetsId.push(newWrk.id);

      parentNbk.allAssetsId.push(newWrk.id);

      // need to refactor more for already graph exist.
      newAllNotebooks.newNbk = parentNbk;
      newAllNotebooks.newSec = parentSec;
      newAllNotebooks.newWrk = newWrk;
      newAllNotebooks.newCopied = allCopiedId;
      props.addWorksheet(newAllNotebooks);

    }

    else if(copiedItem.type === ITEM_TYPE.GRAPHPAGE){
      let [grName, obj] = getCopiedItemId(copiedItem.name, allCopiedId, true);
      const newGrPg = getDefaultGraphPage(grName, grName, parentNbk.id, parentSec.id, null,props.licenseInfo?.userName);
      allCopiedId = obj;
      newGrPg.level = parentSec.level;
      newGrPg.parentLoop = [...parentSec.parentLoop, parentSec.id];
      newGrPg.worksheetId = parentSec.worksheetId;
      //need to copy GraphPage Object
      const newGrList = cloneGraphList(copiedItem.id, newGrPg.id, copiedItem.worksheetId, newGrPg.worksheetId, copiedItem.graphList, props)
      newGrPg.graphList = [...newGrList]
      newGrPg.allGraphId = JSON.parse(JSON.stringify(copiedItem.allGraphId).replaceAll(copiedItem.id,newGrPg.id))
      newGrPg.allNodesList = JSON.parse(JSON.stringify(copiedItem.allNodesList))
      newGrPg.allConnectorsList = JSON.parse(JSON.stringify(copiedItem.allConnectorsList))
      parentSec.graphPage = [...parentSec.graphPage, newGrPg.id];
      parentSec.allAssetsId.push(newGrPg.id);

      parentNbk.allAssetsId.push(newGrPg.id);

      newAllNotebooks.newNbk = parentNbk;
      newAllNotebooks.newSec = parentSec;
      newAllNotebooks.newGrPg = newGrPg;
      newAllNotebooks.newCopied = allCopiedId;
      props.addGraphPage(newAllNotebooks);

    }

    else if(copiedItem.type === ITEM_TYPE.REPORT){
      let [reName, obj] = getCopiedItemId(copiedItem.name, allCopiedId, true);
      const newRep = getDefaultReport(reName, reName, parentNbk.id, parentSec.id,null,props.licenseInfo?.userName);
      allCopiedId = obj;
      newRep.level = parentSec.level;
      newRep.parentLoop = [...parentSec.parentLoop, parentSec.id];
      newRep.worksheetId = parentSec.worksheetId;
      //need to copy report Object
      console.log(copiedItem)
      newRep.staticReportData=copiedItem.staticReportData
      newRep.reportData=copiedItem.reportData
      parentSec.report = [...parentSec.report, newRep.id];
      parentSec.allAssetsId.push(newRep.id);

      parentNbk.allAssetsId.push(newRep.id);

      newAllNotebooks.newNbk = parentNbk;
      newAllNotebooks.newSec = parentSec;
      newAllNotebooks.newRep = newRep;
      newAllNotebooks.newCopied = allCopiedId;
      props.addReport(newAllNotebooks);

    }
    else if(copiedItem.type === ITEM_TYPE.TRANSFORM){
      let [reName, obj] = getCopiedItemId(copiedItem.name, allCopiedId, true);
      const newTransform = getDefaultTransform(reName, reName, parentNbk.id, parentSec.id);
      allCopiedId = obj;
      newTransform.level = parentSec.level;
      newTransform.parentLoop = [...parentSec.parentLoop, parentSec.id];
      newTransform.worksheetId = parentSec.worksheetId;
      //need to copy GraphPage Object

      parentSec.transform = [...parentSec.transform, newTransform.id];
      parentSec.allAssetsId.push(newTransform.id);

      parentNbk.allAssetsId.push(newTransform.id);

      newAllNotebooks.newNbk = parentNbk;
      newAllNotebooks.newSec = parentSec;
      newAllNotebooks.newTransform = newTransform;
      newAllNotebooks.newCopied = allCopiedId;
      props.addTransform(newAllNotebooks);

    }
    else if(copiedItem.type === ITEM_TYPE.EQUATION){
      let [eqName, obj] = getCopiedItemId(copiedItem.name, allCopiedId, true);
      const newEquation = getDefaultEquation(eqName, eqName, parentNbk.id, parentSec.id,null,props.licenseInfo?.userName);
      allCopiedId = obj;
      newEquation.level = parentSec.level;
      newEquation.parentLoop = [...parentSec.parentLoop, parentSec.id];
      newEquation.worksheetId = parentSec.worksheetId;
      //need to copy GraphPage Object

      parentSec.equation = [...parentSec.equation, newEquation.id];
      parentSec.allAssetsId.push(newEquation.id);

      parentNbk.allAssetsId.push(newEquation.id);

      newAllNotebooks.newNbk = parentNbk;
      newAllNotebooks.newSec = parentSec;
      newAllNotebooks.newEquation = newEquation;
      newAllNotebooks.newCopied = allCopiedId;
      props.addEquation(newAllNotebooks);

    }

  }
}

const pasteEntireSection = async (currItem:NotebookProps|SectionProps|WorksheetProp|ReportProps|GraphPageProps|TransformProps|EquationProps, copiedItem:SectionProps|WorksheetProp|ReportProps|GraphPageProps|TransformProps|EquationProps, props:any) => {

  let actNbk = null;;
  let actSec = null;
  if(currItem.type === ITEM_TYPE.NOTEBOOK){
    actNbk = JSON.parse(JSON.stringify(props.notebooks.allNotebooks.byId[currItem.id]));
    actNbk.isSaved = false;
  }
  else if(currItem.type === ITEM_TYPE.SECTION){
    actNbk = {
        ...JSON.parse(JSON.stringify(props.notebooks.allNotebooks.byId[currItem.parentNotebookId])),
        children: [...props.notebooks.allNotebooks.byId[currItem.parentNotebookId].children],
        isSaved : false
      };
    actSec = {
        ...JSON.parse(JSON.stringify(props.notebooks.allSections.byId[currItem.id])),
        children:[...props.notebooks.allSections.byId[currItem.id].children]
      };
  }
  else{
    actNbk = {
      ...JSON.parse(JSON.stringify(props.notebooks.allNotebooks.byId[currItem.parentNotebookId])),
      children: [...props.notebooks.allNotebooks.byId[currItem.parentNotebookId].children],
      isSaved: false
    };
    actSec = {
        ...JSON.parse(JSON.stringify(props.notebooks.allSections.byId[currItem.parentSectionId])),
        children:[...props.notebooks.allSections.byId[currItem.parentSectionId].children]
      };
  }


  const newNbkState = {
      allNotebooks:{
        byId:{
        },
      },
      allSections: {
        byId:{
        },
        allSectionsId: {
          [actNbk.id]: [...props.notebooks.allSections.allSectionsId[actNbk.id]]
        }
      },
      allWorksheets: {
        byId: {
        },
        allWorksheetsId: []
      },
      allGraphPages: {
        byId: {
        },
        graphs:{
          byId:{
          },
          allGraphsId: []
        },
        allGraphPagesId: [],
      },
      allReports: {
        byId:{
        },
        allReportsId: []
      },
      allTransforms: {
        byId:{
        },
        allTransformsId: []
      },
      allEquations: {
        byId:{
        },
        allEquationsId: []
      },
      allCopiedId:{
      }
  }

  const allCopiedId = props.notebooks.allCopiedId;

  await createCloneSection(copiedItem.id, newNbkState, props, allCopiedId, actSec,  actNbk)

  props.pasteItem(newNbkState);

}

const getCopiedItemId = (currName:string, allCopiedId, isEdit:boolean) => {

  let newName = `Copy Of ${currName}`;
  if(isEdit){
    if(allCopiedId[currName]){
      allCopiedId[currName] = allCopiedId[currName]+1
    }
    else{
      allCopiedId[currName] = 1
    }
  }

  newName = allCopiedId[currName]>1 ? `${newName} (${allCopiedId[currName]})` : newName;

  return [newName, allCopiedId]

}

const createCloneSection = async (currSecId, newNbkState, props, allCopiedId, parentSec, parentNbk) => {

  const copiedSecObj = JSON.parse(JSON.stringify(props.notebooks.allSections.byId[currSecId]));

  let [secName, obj] = getCopiedItemId(copiedSecObj.name, allCopiedId, true); 
  console.log('i came here first',secName,obj)

  const cloneSec = getDefaultSectionObject(secName, secName, parentNbk.id,props.licenseInfo?.userName);
  if(parentSec){
    cloneSec.parentLoop= [...parentSec.parentLoop, parentSec.id];
    cloneSec.level = parentSec.level+1
    cloneSec.parentSectionId = parentSec.id
    parentNbk.children.push(cloneSec.id);
  }
  else{
    cloneSec.parentLoop= [parentNbk.id];
    parentNbk.children.push(cloneSec.id);
  }

  parentNbk.allSectionsId.push(cloneSec.id)


  //*********Worksheet */
  if(copiedSecObj.worksheetId){
    const copWrk = JSON.parse(JSON.stringify(props.notebooks.allWorksheets.byId[copiedSecObj.worksheetId]));
    let [wrkName, obj] = getCopiedItemId(copWrk.name, allCopiedId, true);
    const cloneWrk = getDefaultWorksheet(wrkName, wrkName, parentNbk.id, cloneSec.id,props.licenseInfo?.userName);
    cloneWrk.level = cloneSec.level;
    cloneWrk.parentLoop = [...cloneSec.parentLoop, cloneSec.id];
    //data need to copy
    await cloneWorksheetData(copWrk.id,cloneWrk.id,props)
    cloneSec.worksheetId = cloneWrk.id;
    cloneSec.allAssetsId.push(cloneWrk.id);
    parentNbk.allAssetsId.push(cloneWrk.id);
    newNbkState.allWorksheets.byId[cloneWrk.id] = cloneWrk;
    newNbkState.allWorksheets.allWorksheetsId.push(cloneWrk.id);
  }


  const allGrpg = copiedSecObj.graphPage.map(gid => props.notebooks.allGraphPages.byId[gid]);

  for(const gp of allGrpg){
    // create grpahPageObject

    const copGrPg = JSON.parse(JSON.stringify(props.notebooks.allGraphPages.byId[gp.id]));
    let [grName, obj] = getCopiedItemId(copGrPg.name, allCopiedId, true);
    const cloneGrPg = getDefaultGraphPage(grName, grName, parentNbk.id, cloneSec.id, null, props.licenseInfo?.userName);

    cloneGrPg.level = cloneSec.level;
    cloneGrPg.parentLoop = [...cloneSec.parentLoop, cloneSec.id];
    cloneGrPg.worksheetId = cloneSec.worksheetId;
    //need to copy GraphPage Object
    const newGrList = cloneGraphList(copGrPg.id, cloneGrPg.id, copGrPg.worksheetId, cloneGrPg.worksheetId, copGrPg.graphList, props)
    console.log(newGrList)
    cloneGrPg.graphList = [...newGrList]
    cloneGrPg.allNodesList = JSON.parse(JSON.stringify(copGrPg.allNodesList))
    cloneGrPg.allConnectorsList = JSON.parse(JSON.stringify(copGrPg.allConnectorsList))
    cloneSec.graphPage = [...cloneSec.graphPage, cloneGrPg.id];
    cloneSec.allAssetsId.push(cloneGrPg.id);
    parentNbk.allAssetsId.push(cloneGrPg.id);
    cloneGrPg.allGraphId = JSON.parse(JSON.stringify(copGrPg.allGraphId).replaceAll(copGrPg.id, cloneGrPg.id))
    

    newNbkState.allGraphPages.byId[cloneGrPg.id] = cloneGrPg;
    newNbkState.allGraphPages.allGraphPagesId.push(cloneGrPg.id);
  }


  const allRep = copiedSecObj.report.map(rid => props.notebooks.allReports.byId[rid]);
  for(const rp of allRep){
    // create reportObject

    const copRep = JSON.parse(JSON.stringify(props.notebooks.allReports.byId[rp.id]));
    let [rpName, obj] = getCopiedItemId(copRep.name, allCopiedId, true);
    const cloneRep = getDefaultReport(rpName, rpName, parentNbk.id, cloneSec.id,null,props.licenseInfo?.userName);

    cloneRep.level = cloneSec.level;
    cloneRep.staticReportData=copRep.staticReportData
    cloneRep.reportData=copRep.reportData
    cloneRep.parentLoop = [...cloneSec.parentLoop, cloneSec.id];
    cloneRep.worksheetId = cloneSec.worksheetId;
    cloneSec.report = [...cloneSec.report, cloneRep.id];
    cloneSec.allAssetsId.push(cloneRep.id);

    parentNbk.allAssetsId.push(cloneRep.id);

    newNbkState.allReports.byId[cloneRep.id] = cloneRep;
    newNbkState.allReports.allReportsId.push(cloneRep.id);

  }

  const allTransform = copiedSecObj.transform.map(tid => props.notebooks.allTransforms.byId[tid]);
  for(const trans of allTransform){
    // create reportObject

    const copTransform = JSON.parse(JSON.stringify(props.notebooks.allTransforms.byId[trans.id]));
    let [rpName, obj] = getCopiedItemId(copTransform.name, allCopiedId, true);
    const cloneRep = getDefaultTransform(rpName, rpName, parentNbk.id, cloneSec.id);

    cloneRep.level = cloneSec.level;

    cloneRep.parentLoop = [...cloneSec.parentLoop, cloneSec.id];
    cloneRep.worksheetId = cloneSec.worksheetId;
    cloneSec.transform = [...cloneSec.transform, cloneRep.id];
    cloneSec.allAssetsId.push(cloneRep.id);

    parentNbk.allAssetsId.push(cloneRep.id);

    newNbkState.allTransforms.byId[cloneRep.id] = cloneRep;
    newNbkState.allTransforms.allTransformsId.push(cloneRep.id);

  }

  const allEquation = copiedSecObj.equation.map(eid => props.notebooks.allEquations.byId[eid]);
  for(const equation of allEquation){
    // create reportObject

    const copEquation = JSON.parse(JSON.stringify(props.notebooks.allEquations.byId[equation.id]));
    let [eqName, obj] = getCopiedItemId(copEquation.name, allCopiedId, true);
    const cloneRep = getDefaultEquation(eqName, eqName, parentNbk.id, cloneSec.id, null, props.licenseInfo?.userName);

    cloneRep.level = cloneSec.level;

    cloneRep.parentLoop = [...cloneSec.parentLoop, cloneSec.id];
    cloneRep.worksheetId = cloneSec.worksheetId;
    cloneSec.equation = [...cloneSec.equation, cloneRep.id];
    cloneSec.allAssetsId.push(cloneRep.id);

    parentNbk.allAssetsId.push(cloneRep.id);

    newNbkState.allEquations.byId[cloneRep.id] = cloneRep;
    newNbkState.allEquations.allEquationsId.push(cloneRep.id);

  }

  newNbkState.allSections.byId[cloneSec.id] = cloneSec;
  if(parentSec){
    console.log('i came here no')

    newNbkState.allSections.byId[parentSec.id] = parentSec;
  }
  newNbkState.allSections.allSectionsId[parentNbk.id] = [...newNbkState.allSections.allSectionsId[parentNbk.id], cloneSec.id];
  newNbkState.allCopiedId = allCopiedId;
  newNbkState.allNotebooks.byId[parentNbk.id] = parentNbk;

  if(copiedSecObj.children.length == 0){
    return newNbkState;
  }
  else{
    for(const sid of copiedSecObj.children){
      createCloneSection(sid, newNbkState, props, allCopiedId, cloneSec, parentNbk);
    }
  }
  return newNbkState;
}


const cloneWorksheetData = async (worksheetKey:string, newWrkKey:string, props:any) => {

  let openedWorksheet = props.openWorksheets.filter(
    (item) => item.key == worksheetKey
  );

  let gridData = await getDataSetByKey(
    openedWorksheet[0].key,
    openedWorksheet[0].client
  );

  const clientData = await setWorksheetData(
    gridData,
    newWrkKey
  );


  props.storeWorksheet(clientData);
  props.setActiveWorksheet(clientData.key);
}

const cloneGraphList = (oldGrPgId:string, newGrPgId:string, oldWrkKey:string, newWrkKey:string, graphList:any, props:any) => {
  let newGrphList = JSON.stringify(graphList)
  newGrphList = newGrphList.replaceAll(oldGrPgId, newGrPgId);
  if(oldWrkKey)
    newGrphList = newGrphList.replaceAll(oldWrkKey, newWrkKey);
  newGrphList = JSON.parse(newGrphList)


  if(oldWrkKey){
    console.log(props)
    const openedWorksheet = props.openWorksheets.filter(
      (item) => item.key == newWrkKey
    );
    for(const grph of newGrphList){
      const openGraph = {
      id: grph.id,
      worksheetId:newWrkKey,
      wrkClient: openedWorksheet[0].client
      }
      props.storeGraph(openGraph)
    }
  }


return newGrphList;
}
