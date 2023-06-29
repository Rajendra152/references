
import {
    NotebookProps,
    SectionProps,
    WorksheetProp,
    GraphPageProps,
    ReportProps,
    TransformProps
  } from './NotebookManagerInterfaces'
  
  
  import {
    getDefaultSectionObject,
    getDefaultTransform
  } from "./GetDefaultObject";
  
  import * as ITEM_TYPE from './ConstantsNotebookManager'
  import { checkIsNameUnique } from "../NotebookManagerServicesNew";
  
   export const createNewTransform = (props:any, clickedItem?:NotebookProps | SectionProps | WorksheetProp | GraphPageProps | ReportProps | TransformProps) => {
    let notebookId = props.allActiveItem.notebook;
    let sectionId = props.allActiveItem.section;
  
    if (clickedItem) {
      if (clickedItem.type === ITEM_TYPE.NOTEBOOK) {
        return createSectionWithTransform(props, clickedItem)
      }
      else if (clickedItem.type === ITEM_TYPE.SECTION) {
        notebookId = clickedItem.parentNotebookId;
        sectionId =  clickedItem.id;
      }
      else {
        notebookId = clickedItem.parentNotebookId;
        sectionId = clickedItem.parentSectionId;
      }
    }
    else if(!sectionId){
      // no section Active let on delete of all section
      return createSectionWithTransform(props)
    }
  
  
    const activeNotebook = JSON.parse(JSON.stringify(props.notebooks.allNotebooks.byId[notebookId]));
    const activeSection = JSON.parse(JSON.stringify(props.notebooks.allSections.byId[sectionId]));
  
    let repName = `Transform ${activeNotebook.transformLength+1}`;
    let transformLen = activeNotebook.transformLength+1;
  
    while(!checkIsNameUnique(repName,activeNotebook.id, props)){
      transformLen = transformLen+1;
      repName = `Transform ${transformLen}`;
    }
  
    const newTransform = getDefaultTransform(
      `Trans${transformLen}`,
      `Transform ${transformLen}`,
      notebookId,
      sectionId,
      activeSection.worksheetId,
      props.licenseInfo?.userName
    );
  
    newTransform.level = activeSection.level;
    newTransform.parentLoop = [...activeSection.parentLoop, activeSection.id];
  
    activeSection.transform = [...activeSection.transform, newTransform.id];
    activeSection.activeChild = newTransform.id;
    activeSection.allAssetsId.push(newTransform.id);

    activeNotebook.transformLength = transformLen;
    activeNotebook.allTransformsId.push(newTransform.id);
    activeNotebook.allAssetsId.push(newTransform.id);
    activeNotebook.activeSection = activeSection.id;
    activeNotebook.activeChild = newTransform.id;
    activeNotebook.isSaved = false;

    const newAllNotebooks  = {
    newNbk: {...activeNotebook},
    newSec: {...activeSection},
    newTransform: newTransform
    }
  
    const newActiveItem = {
      ...props.allActiveItem,
      notebook: notebookId,
      section: sectionId,
      worksheet: null,
      transform: newTransform.id,
      graphPage: {
        id: '',
        object: ''
      },
      selectedItemOnNotebook: newTransform.id,
      cursor: newTransform.id
    };
    const newSummary = {
      id:newTransform.id,
      type:newTransform.type,
      createdDate: newTransform.createdDate,
      modifiedDate: newTransform.modifiedDate,
      author:newTransform.author,
      description:newTransform.description
    }
    props.summaryInfoAction(newSummary)
    props.addTransform(newAllNotebooks);
    props.setAllActiveItem(newActiveItem);
    //Opens User-Defined Transform Modal
    props.TransformAction.isOpenUserDefined({
      message: true,
      transformId: newTransform.id
    })
  
    return newTransform;
  };
  
  
  
  export const createSectionWithTransform = (props: any, clickedItem?:NotebookProps | SectionProps | WorksheetProp) => {
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
      if(clickedItem.type === ITEM_TYPE.NOTEBOOK){
        sectionObject.parentLoop = [notebookId]
      }
      else if (clickedItem.type === ITEM_TYPE.SECTION) {
        //[n1,s1,s2,s3,s4,s5]
        if(clickedItem.parentLoop.length>1){
          sectionObject.parentSectionId = clickedItem.parentLoop[1];
          sectionObject.parentLoop = clickedItem.parentLoop.slice(0,1+1);
          sectionObject.level = sectionObject.parentLoop.length;
        }
        else{
          sectionObject.parentSectionId = clickedItem.id;
          sectionObject.parentLoop = [...clickedItem.parentLoop, clickedItem.id]
          sectionObject.level = clickedItem.level+1;
        }
  
      }
      else {
        //[n1,s1,d,s2,s3,s4,s5]
        if(clickedItem.parentLoop.length>2){
          sectionObject.parentSectionId = clickedItem.parentLoop[2-1];
          sectionObject.parentLoop = clickedItem.parentLoop.slice(0,2);
          sectionObject.level = sectionObject.parentLoop.length;
        }
        else{
          sectionObject.parentSectionId = clickedItem.parentSectionId;
          sectionObject.parentLoop = [...clickedItem.parentLoop]
          sectionObject.level = clickedItem.level+1;
        }
      }
  
    }
    else {
      //sectionObject.parentSection = sectionId;
      if(sectionId){
        sectionObject.parentSectionId = sectionId;
      }
      else{
        sectionObject.parentLoop = [activeNotebook.id]
      }
    }
  
    let parentSec = null;
    if(sectionObject.parentSectionId){
      parentSec = {...props.notebooks.allSections.byId[sectionObject.parentSectionId]}
      parentSec.children.push(sectionObject.id);
    }
    else{
      activeNotebook.children.push(sectionObject.id);
  
    }
  
    let repName = `Transform ${activeNotebook.transformLength+1}`;
    let transformLen = activeNotebook.transformLength+1;
  
    while(!checkIsNameUnique(repName,activeNotebook.id, props)){
      transformLen = transformLen+1;
      repName = `Transform ${transformLen}`;
    }
  
    const newTransform = getDefaultTransform(
      `Trans${activeNotebook.allTransformsId.length + 1}`,
      `Transform ${activeNotebook.allTransformsId.length + 1}`,
      notebookId,
      sectionObject.id,
      sectionObject.worksheetId,
      props.licenseInfo?.userName
    );
  
    newTransform.level = sectionObject.level;
    newTransform.parentLoop = [...sectionObject.parentLoop, sectionObject.id];
  
    sectionObject.allAssetsId.push(newTransform.id);
    sectionObject.activeChild = newTransform.id;
    sectionObject.transform = [...sectionObject.transform, newTransform.id]
  
    activeNotebook.transformLength = transformLen;
    activeNotebook.sectionLength = secLen;
    activeNotebook.allSectionsId.push(sectionObject.id)
    activeNotebook.allAssetsId.push(newTransform.id)
    activeNotebook.allTransformsId.push(newTransform.id)
    activeNotebook.activeChild = newTransform.id;
    activeNotebook.activeSection = sectionObject.id;
    activeNotebook.isSaved = false;
  
    const newAllNotebooks  = {
      newNbk: {...activeNotebook},
      newSec: sectionObject,
      newParSec: parentSec,
      newTransform: newTransform,
    }
  
    const newActiveItem = {
      ...props.allActiveItem,
      notebook: notebookId,
      section: sectionObject.id,
      worksheet: null,
      transform: newTransform.id,
      graphPage: {
        id: '',
        object: ''
      },
      selectedItemOnNotebook: newTransform.id,
      cursor: newTransform.id
    };
    const newSummary = {
      id:newTransform.id,
      type:newTransform.type,
      createdDate: newTransform.createdDate,
      modifiedDate: newTransform.modifiedDate,
      author:newTransform.author,
      description:newTransform.description
    }
    props.summaryInfoAction(newSummary)
    props.setAllActiveItem(newActiveItem);
    props.addSection(newAllNotebooks);
    //Opens User-Defined Transform Modal
    props.TransformAction.isOpenUserDefined({
      message: true,
      transformId: newTransform.id
    })
    return sectionObject;
  };
  