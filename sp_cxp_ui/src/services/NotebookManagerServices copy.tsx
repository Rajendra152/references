


// const dispatch = store.dispatch;

// import {
//   IActiveItem
// } from '../components/Redux/notebookReducer';

// import { IWorksheet } from '../components/CanvasManager/CanvasManagerNew';

export const checkStatus = () =>{
  //import { store } from "../../src/components/App/App";
  const store = require("../../src/components/App/App")

  console.log("I am checker")
  console.log(store.store.getState());

}

export interface NotebookProps {
  id: string;
  name: string;
  children: SectionProps[];
}

export interface SectionProps {
  id: string;
  name: string;
  parentNotebook?: string;
  type?: string;
  worksheet?: WorksheetProp;
  graph?: GraphProps[];
  report?: ReportProps;
 }

export interface WorksheetProp {
  id: string;
  name: string;
  parent?: number;
  type?: string;
  data?: WorksheetDataProps[][];
}

export interface WorksheetDataProps {
  value?: string;
  readOnly?: boolean;
}

export interface GraphProps {
  worksheetId: string;
}

export interface ReportProps {
  id: string;
 }

export const getDefaultNotebookObject = (id: string) => {
  const notebookObject: NotebookProps = {
    id,
    name: id,
    children: [],
  };
  return notebookObject;
};

export const getDefaultSection = (name: string, notebookId: string) => {
  const sectionObject: SectionProps = {
    id: notebookId + name,
    parentNotebook: notebookId,
    name,
    type: 'section',
  };
  return sectionObject;
};

export const getDefaultWorksheet = (name: string, sectionId: string) => {
  const worksheetObject: WorksheetProp = {
    id: sectionId+name,
    name,
    type: 'worksheet',
  };
  return worksheetObject;
};

export const getDefaultReport = (name: string, notebookId: string, sectionId: string) => {
  const reportObject = {
  id: notebookId + sectionId+ name,
  sectionId:
  name,
  type: 'report',
  };
  return reportObject;
 };

  /* create notebook */

//  export const createNotebook = () => {

//   console.log(store.getState().notebookReducer);
//   const notebookState=store.getState().notebookReducer;
//   const notebookId = 'Notebook' + (notebookState.notebooks && notebookState.notebooks.length + 1);


//   const notebookObject = getDefaultNotebookObject(notebookId);
//   const sectionObject = getDefaultSection('Section1',notebookId);
//   const worksheetObject = getDefaultWorksheet('Data1',notebookId);
//   const reportObject = getDefaultReport('Report1',notebookId);

//   sectionObject.worksheet = worksheetObject;
//   notebookObject.children.push(sectionObject);
//   sectionObject.report = reportObject;

//   /* adding notebook object to redux store */

//   dispatchOperation.addNotebook(notebookObject);

//   /* add worksheet to open worksheet items and active worksheet items */

//   dispatchOperation.addOpenWorksheet(worksheetObject);
//   dispatchOperation.setActiveItem(worksheetObject);
//   dispatchOperation.setActiveWorksheet(worksheetObject.id);
//   return notebookObject;
// };


// const dispatchOperation = {
// addNotebook: (nObj: NotebookProps) => {
//   console.log("I am dispatched")
//   console.log(nObj)
//   dispatch({ type: 'ADD_NOTEBOOK', payload: nObj });
// },
// addOpenWorksheet: (wObj: IWorksheet) => {
//   dispatch({ type: 'ADD_OPEN_NOTEBOOK', payload: wObj });
// },
// setActiveWorksheet: (wKey: string) => {
//   dispatch({ type: 'SET_ACTIVE_WORKSHEET', payload: wKey });
// },
// setActiveItem: (activeItem: IActiveItem) => {
//   dispatch({ type: 'SET_ACTIVE_ITEM', payload: activeItem });
// },
// }




/* create notebook */

export const  createNotebook = (props) => {
  /* get notebooks array length to set id  */
  // checkStatus();

  const notebookId = 'Notebook' + (props.notebooks.length + 1);
  const notebookObject = getDefaultNotebookObject(notebookId);
  const sectionObject = getDefaultSection('Section1',notebookId);
  const worksheetObject = getDefaultWorksheet(`Data1`, sectionObject.id);
  const reportObject = getDefaultReport('Report1',notebookId,sectionObject.id );

  sectionObject.worksheet = worksheetObject;
  sectionObject.graph = [];
  notebookObject.children.push(sectionObject);
  sectionObject.report = reportObject;

  /* adding notebook object to redux store */

  props.addNotebook(notebookObject);

  // setting Active Item
  let allActiveItem = {
    notebook: notebookId,
    section: sectionObject.id,
    subsection: null,
    worksheet: worksheetObject.id,
    graphpage: {
      id: null,
      objectId: null
    },
    report: null,
    selectedPivotItem: worksheetObject.id
  }

  /* add worksheet to open worksheet items and active worksheet items */

  props.addOpenWorksheet(worksheetObject);
  props.setActiveItem(worksheetObject);
  props.setActiveWorksheet(worksheetObject.id);
  props.setAllActiveItem(allActiveItem);

  return notebookObject;

};

export const createSection = (props) =>{


  const notebookId = props.allActiveItem.notebook;
  const activeNotebook  = props.notebooks.filter(item => item.id == notebookId)


  const sectionObject = getDefaultSection(`Section${activeNotebook[0].children.length+1}`,notebookId);
  const worksheetObject = getDefaultWorksheet(`Data1`,sectionObject.id);
  const newActiveItem = {
    ...props.allActiveItem,
    section: sectionObject.id,
    worksheet: worksheetObject.id,
    selectedPivotItem: worksheetObject.id
  }

  sectionObject.worksheet = worksheetObject;
  sectionObject.graph = [];
  sectionObject.report = null



  props.addOpenWorksheet(worksheetObject);
  props.setActiveItem(worksheetObject);
  props.setActiveWorksheet(worksheetObject.id);
  props.setAllActiveItem(newActiveItem);

  props.addSection(sectionObject)

}
