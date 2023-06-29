
import {
    NotebookProps,
    SectionProps,
    WorksheetProp,
    EquationProps,
    EquationDataProps
  } from './NotebookManagerInterfaces'
  
  
  import {
    getDefaultSectionObject,
    getDefaultTransform,
    getDefaultEquation
  } from "./GetDefaultObject";
  
  import * as ITEM_TYPE from './ConstantsNotebookManager'
  import { checkIsNameUnique } from "../NotebookManagerServicesNew";
  
   export const createNewEquation = (props:any, clickedItem?:NotebookProps | SectionProps | WorksheetProp | EquationProps, equationData?: EquationDataProps) => {
    let notebookId = props.allActiveItem.notebook;
    let sectionId = props.allActiveItem.section;
  
    if (clickedItem) {
      if (clickedItem.type === ITEM_TYPE.NOTEBOOK) {
        return createSectionWithEquation(props, clickedItem, equationData)
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
      return createSectionWithEquation(props, undefined, equationData)
    }
  
  
    const activeNotebook = JSON.parse(JSON.stringify(props.notebooks.allNotebooks.byId[notebookId]));
    const activeSection = JSON.parse(JSON.stringify(props.notebooks.allSections.byId[sectionId]));
  
    let eqName = (equationData && equationData.name) || '';
    let equationLen = activeNotebook.equationLength+1;
  
    while(!checkIsNameUnique(eqName,activeNotebook.id, props)){
        equationLen = equationLen+1;
        eqName = `Equation ${equationLen}`;
    }
  
    const newEquation = getDefaultEquation(
      `Equa${equationLen}`,
      (equationData && equationData.name) || `Equation ${equationLen}`,
      notebookId,
      sectionId,
      activeSection.worksheetId,
      props.licenseInfo?.userName
    );
  
    newEquation.level = activeSection.level;
    newEquation.parentLoop = [...activeSection.parentLoop, activeSection.id];
  
    activeSection.equation = [...activeSection.equation, newEquation.id];
    activeSection.activeChild = newEquation.id;
    activeSection.allAssetsId.push(newEquation.id);

    activeNotebook.equationLength = equationLen;
    activeNotebook.allEquationsId.push(newEquation.id);
    activeNotebook.allAssetsId.push(newEquation.id);
    activeNotebook.activeSection = activeSection.id;
    activeNotebook.activeChild = newEquation.id;
    activeNotebook.isSaved = false;

    const newAllNotebooks  = {
    newNbk: {...activeNotebook},
    newSec: {...activeSection},
    newEquation: newEquation
    }
  
    const newActiveItem = {
      ...props.allActiveItem,
      notebook: notebookId,
      section: sectionId,
      worksheet: null,
      equation: newEquation.id,
      graphPage: {
        id: '',
        object: ''
      },
      selectedItemOnNotebook: newEquation.id,
      cursor: newEquation.id
    };
    const newSummary = {
      id:newEquation.id,
      type:newEquation.type,
      createdDate: newEquation.createdDate,
      modifiedDate: newEquation.modifiedDate,
      author:newEquation.author,
      description:newEquation.description
    }
    props.summaryInfoAction(newSummary)
    props.addEquation(newAllNotebooks);
    props.setAllActiveItem(newActiveItem);
    //Closes Equation Modal
    props.TransformAction.isOpenEquation({
      message: false
    });
    if(equationData) {
      equationData.equationId = newEquation.id;
      props.updateEquationData(equationData);
    }
  
    return newEquation;
  };
  
  
  
  export const createSectionWithEquation = (props: any, clickedItem?:NotebookProps | SectionProps | WorksheetProp | EquationProps, equationData?: EquationDataProps) => {
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
  
    let eqName = (equationData && equationData.name) || '';
    let equationLen = activeNotebook.equationLength+1;
  
    while(!checkIsNameUnique(eqName,activeNotebook.id, props)){
        equationLen = equationLen+1;
        eqName = `Equation ${equationLen}`;
    }
  
    const newEquation = getDefaultEquation(
      `Equa${activeNotebook.allEquationsId.length + 1}`,
      (equationData && equationData.name) || `Equation ${activeNotebook.allEquationsId.length + 1}`,
      notebookId,
      sectionObject.id,
      sectionObject.worksheetId,
      props.licenseInfo?.userName
    );
  
    newEquation.level = sectionObject.level;
    newEquation.parentLoop = [...sectionObject.parentLoop, sectionObject.id];
  
    sectionObject.allAssetsId.push(newEquation.id);
    sectionObject.activeChild = newEquation.id;
    sectionObject.equation = [...sectionObject.equation, newEquation.id]
  
    activeNotebook.equationLength = equationLen;
    activeNotebook.sectionLength = secLen;
    activeNotebook.allSectionsId.push(sectionObject.id)
    activeNotebook.allAssetsId.push(newEquation.id)
    activeNotebook.allEquationsId.push(newEquation.id)
    activeNotebook.activeChild = newEquation.id;
    activeNotebook.activeSection = sectionObject.id;
    activeNotebook.isSaved = false;
    
    const newAllNotebooks  = {
      newNbk: {...activeNotebook},
      newSec: sectionObject,
      newParSec: parentSec,
      newEquation: newEquation,
    }
  
    const newActiveItem = {
      ...props.allActiveItem,
      notebook: notebookId,
      section: sectionObject.id,
      worksheet: null,
      equation: newEquation.id,
      graphPage: {
        id: '',
        object: ''
      },
      selectedItemOnNotebook: newEquation.id,
      cursor: newEquation.id
    };
    const newSummary = {
      id:newEquation.id,
      type:newEquation.type,
      createdDate: newEquation.createdDate,
      modifiedDate: newEquation.modifiedDate,
      author:newEquation.author,
      description:newEquation.description
    }
    props.summaryInfoAction(newSummary)
    props.setAllActiveItem(newActiveItem);
    props.addSection(newAllNotebooks);
    //Opens User-Defined Transform Modal
    props.TransformAction.isOpenEquation({
      message: false
    })
    if(equationData) {
      equationData.equationId = newEquation.id;
      props.updateEquationData(equationData);
    }
    return sectionObject;
  };
  