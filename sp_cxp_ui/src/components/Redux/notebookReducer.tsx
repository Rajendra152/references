import {
  ADD_NOTEBOOK,
  CLEAR_NOTEBOOK,
  SET_ACTIVE_ITEM,
  REMOVE_ACTIVE_ITEM,
  ADD_OPEN_WORKSHEET,
  SET_ACTIVE_WORKSHEET,
  ADD_GRAPH_TO_SECTION,
  SET_SELECTED_PIVOT_ITEM,
  SET_ALL_ACTIVE_ITEM,
  ADD_SECTION,
  ADD_REPORT,
  ADD_TRANSFORM,
  ADD_GRAPHPAGE,
  RENAME_ITEM,
  REMOVE_NOTEBOOK,
  ADD_WORKSHEET,
  DELETE_ITEM,
  REMOVE_ALL_ACTIVE_ITEM,
  //UPDATE_TRANSFORM_DATA
} from './actionConstants';

import { WorksheetProp } from './../../services/NotebookManagerServices';


export interface IAction {
  type: string;
  payload?: INotebook | IActiveItem[] | string | [];
}

export interface IActiveItem {
  id: string;
  type?: string;
  data: any;
  name?: string;
  parent?: string;
}

export interface IState {
  notebooks?: INotebook[];
  allNotebookId: string[];
  activeItems?: IActiveItem[];
  openWorksheets?: WorksheetProp[];
  activeWorksheet?: string;
  selectedPivotItem?: string;
  allActiveItem?: Object
}

export interface INotebook {
  id?: number;
  name?: string;
}

const initialState: IState = 
{
  notebooks: [],
  allNotebookId: [],
  activeItems: [],
  openWorksheets: [],
  activeWorksheet: 'string',
  selectedPivotItem: '',
  allActiveItem: {
    notebook: "",
    section: "",
    subSection: "",
    worksheet: "",
    graphPage: "",
    report: "",
    selectedPivotItem: ""
  }
};


function notebookReducer(state = initialState, action: IAction): IState {
  switch (action.type) {
    case ADD_NOTEBOOK:

      state = {
        ...state,
        notebooks: [...state.notebooks, action.payload],
        allNotebookId: [...state.allNotebookId, action.payload.id],
      };
      return { ...state };

    case REMOVE_NOTEBOOK:

      state = {
        ...state,
        notebooks: state.notebooks.filter(item => item.id != action.payload.id),
      };

      return { ...state };

    case ADD_OPEN_WORKSHEET:
      state = {
        ...state,
        openWorksheets: [...state.openWorksheets, action.payload],
      };
      return { ...state };

    case SET_ACTIVE_WORKSHEET:
      state = {
        ...state,
        activeWorksheet: action.payload,
      };
      return { ...state };

    case CLEAR_NOTEBOOK:
      return {
        ...state,
        notebooks: [],
        activeItems: [],
        openWorksheets: [],
        activeWorksheet: 'string',
        selectedPivotItem: '',
        allActiveItem: {
          notebook: "",
          section: "",
          subSection: "",
          worksheet: "",
          graphPage: {
            id: "",
            objectId: ""
          },
          report: "",
          selectedItemOnNotebook: ""
        }
      };

    case SET_ACTIVE_ITEM:
      state = {
        ...state,
        activeItems: [...state.activeItems, action.payload],
      };
      return { ...state };

    case REMOVE_ACTIVE_ITEM:
      state = {
        ...state,
        activeItems: state.activeItems.filter((item) => {
          return item.id != action.payload;
        }),
      };
      return { ...state };

    case REMOVE_ALL_ACTIVE_ITEM:
      state = {
        ...state,
        activeItems: []
      }

      return {...state}

    case ADD_GRAPH_TO_SECTION:
      state = {
        ...state,
        notebooks: [...action.payload]
      }
      return {...state};

    case SET_SELECTED_PIVOT_ITEM:
      state = {
        ...state,
        selectedPivotItem: action.payload
      }
      return {...state}

    case SET_ALL_ACTIVE_ITEM:
      state = {
        ...state,
        allActiveItem: action.payload,

      }
      return {...state}


    case ADD_SECTION:

      const newNotebooks = state.notebooks.map(item => {
        if(item.id == action.payload.parentNotebookId){
          if(action.payload.parentSection){
            for (const obj of item.children) {
              if(action.payload.parentSection == obj.id){

               obj.childSection.push(action.payload);
               //1st time worksheet object or report or graphpage
               if(action.payload.worksheet){
                obj.allAssetsId.push(action.payload.worksheet.id);
               }
               else if(action.payload.report.length>0){
                obj.allAssetsId.push(action.payload.report[0].id);
               }
               else if(action.payload.graphPage.length>0){
                obj.allAssetsId.push(action.payload.graphPage[0].id);
               }

              }
            }
          }
          else {
            item.children.push(action.payload);
          }

          item.allSectionId.push(action.payload.id);

          if(action.payload.worksheet){
            item.allAssetsId.push(action.payload.worksheet.id);
            item.allWorksheetId.push(action.payload.worksheet.id);
          }
          else if(action.payload.report.length>0){
            item.allAssetsId.push(action.payload.report[0].id);
            item.allReportId.push(action.payload.report[0].id);
           }
           else if(action.payload.graphPage.length>0){
            item.allAssetsId.push(action.payload.graphPage[0].id);
            item.allGraphPageId.push(action.payload.graphPage[0].id);
           }

        }
        return item
      })
        state = {
          ...state,
          notebooks: newNotebooks
        }
        return {...state}


    case ADD_WORKSHEET:
      const newWorksheetNotebooks= state.notebooks.map(item => {
        if(item.id == action.payload.parentNotebookId){
          item.children=item.children.map(ele => {
            if(action.payload.parentSectionId == ele.id){
              if(action.payload.parentSubSectionId){
                for (const subSec of ele.childSection) {
                  if(subSec.id == action.payload.parentSubSectionId)
                  {
                    subSec.worksheet = action.payload;
                    subSec.report.map(report => {
                      report.worksheetId = action.payload.id;
                      return report
                    })
                    subSec.graphPage.map(page => {
                      page.worksheetId = action.payload.id
                      return page
                    })
                    subSec.allAssetsId.push(action.payload.id);
                    ele.allAssetsId.push(action.payload.id);
                    break;
                  }
                }
              }// if not then directly injecting to 1st level section
              else{
                ele.worksheet = action.payload
                ele.allAssetsId.push(action.payload.id);
              }
            }
            return ele
          })
          item.allAssetsId.push(action.payload.id);
          item.allWorksheetId.push(action.payload.id)
        }
        return item
      })

      state = {
        ...state,
        notebooks: newWorksheetNotebooks
      }
      return {...state}

    case ADD_REPORT:
      const newReportNotebooks= state.notebooks.map(item => {
        if(item.id == action.payload.parentNotebookId){
          item.children=item.children.map(ele => {
            if(action.payload.parentSectionId == ele.id){
              if(action.payload.parentSubSectionId){
                for (const subSec of ele.childSection) {
                  if(subSec.id == action.payload.parentSubSectionId)
                  {
                    subSec.report.push(action.payload);
                    subSec.allAssetsId.push(action.payload.id);
                    ele.allAssetsId.push(action.payload.id);
                    break;
                  }
                }
              }// if not then directly injecting to 1st level section
              else{
                ele.report.push(action.payload)
                ele.allAssetsId.push(action.payload.id);
              }
            }
            return ele
          })
          item.allAssetsId.push(action.payload.id);
          item.allReportId.push(action.payload.id)
        }
        return item
      })

      state = {
        ...state,
        notebooks: newReportNotebooks
      }
      return {...state}

    case ADD_TRANSFORM:
      const newTransformNotebooks= state.notebooks.map(item => {
        if(item.id == action.payload.parentNotebookId){
          item.children=item.children.map(ele => {
            if(action.payload.parentSectionId == ele.id){
              if(action.payload.parentSubSectionId){
                for (const subSec of ele.childSection) {
                  if(subSec.id == action.payload.parentSubSectionId)
                  {
                    subSec.transform.push(action.payload);
                    subSec.allAssetsId.push(action.payload.id);
                    ele.allAssetsId.push(action.payload.id);
                    break;
                  }
                }
              }// if not then directly injecting to 1st level section
              else{
                ele.transform.push(action.payload)
                ele.allAssetsId.push(action.payload.id);
              }
            }
            return ele
          })
          item.allAssetsId.push(action.payload.id);
          item.allReportId.push(action.payload.id)
        }
        return item
      })

      state = {
        ...state,
        notebooks: newTransformNotebooks
      }
      return {...state}
    
    case UPDATE_TRANSFORM_DATA:
      console.log(state.notebooks, action.payload);
      return {...state};

    case ADD_GRAPHPAGE:
      const newGraphPageNotebooks= state.notebooks.map(item => {
        if(item.id == action.payload.parentNotebookId){
          //Iterating to each section
          item.children=item.children.map(ele => {

              if(action.payload.parentSectionId == ele.id){
                // checking if subsection then Iterating in subSection
                if(action.payload.parentSubSectionId){
                  for (const subSec of ele.childSection) {
                    if(subSec.id == action.payload.parentSubSectionId)
                    {
                      subSec.graphPage.push(action.payload);
                      subSec.allAssetsId.push(action.payload.id);
                      ele.allAssetsId.push(action.payload.id);
                      break;
                    }
                  }
                }// if not then directly injecting to 1st level section
                else{
                  ele.graphPage.push(action.payload)
                  ele.allAssetsId.push(action.payload.id);
                }
              }
              return ele
          })
          item.allAssetsId.push(action.payload.id);
          item.allGraphPageId.push(action.payload.id)
        }
        return item
      })

      state = {
        ...state,
        notebooks: newGraphPageNotebooks
      }

      return {...state}

    case RENAME_ITEM:
      const renamedNotebooks= state.notebooks.map(item => {
        if(item.id === action.payload.parentNotebookId){
          //renaming for section
          if(action.payload.type === "section"){
            let topSectionId = action.payload.parentSection ? action.payload.parentSection :action.payload.id
            for(const sec of item.children){
              if(sec.id === topSectionId ){
                if(action.payload.parentSection){
                  for(const subSec of sec.childSection){
                    if(subSec.id === action.payload.id){
                      subSec.name = action.payload.name;
                      return item;
                    }
                  }
                }
                else{
                  sec.name === action.payload.name;
                  return item;
                }
              }
            }
          }
          // renaming for all other item
          else{
            for(const sec of item.children){
              if(sec.id === action.payload.parentSectionId ){
                if(action.payload.parentSubSectionId){
                  for(const subSec of sec.childSection){
                    if(subSec.id === action.payload.parentSubSectionId){
                      //name getting changed in notebook managerNew itself because all are pointing to same reference
                      // So here this is for trigeering changes only. Wll c later to improve
                      return item;
                    }
                  }
                }
                else{
                  if(action.payload.type === "worksheet"){
                    sec.worksheet.name = action.payload.name;
                  }
                  else if(action.payload.type === "report"){
                    for(const secReport of sec.report){
                      if(secReport.id === action.payload.id){
                        secReport.name = action.payload.name;
                        return item;
                      }
                    }
                  }
                  else if(action.payload.type === "graphPage"){
                    for(const secGraph of sec.graphPage){
                      if(secGraph.id === action.payload.id){
                        secGraph.name = action.payload.name;
                        return item;
                      }
                    }
                  }

                  return item;
                }
              }
            }
          }

        }
        return item
      })


      let  renamedActiveItem =state.activeItems;
      if(action.payload.type !== "section"){
         renamedActiveItem = state.activeItems?.map(active => {
          if(active.id === action.payload.id){
            active.name = action.payload.name;
          }
          return active
        })
      }


      state = {
        ...state,
        notebooks: renamedNotebooks,
        activeItems: renamedActiveItem
      }

      return {...state}

    case DELETE_ITEM:
      let updatedActiveItems = state.activeItems;
      let updatedAllActiveItem = state.allActiveItem;
      const updatedNotebooks= state.notebooks.map(item => {
        if(item.id === action.payload.parentNotebookId){
          if(action.payload.type === "section"){

            if(action.payload.parentSection){
              for(const sec of item.children){
                if(sec.id === action.payload.parentSection){
                  sec.childSection = sec.childSection.filter(subSec => subSec.id !== action.payload.id)
                  if(action.payload.parentSection === updatedAllActiveItem.section){
                    updatedAllActiveItem = {...updatedAllActiveItem, subSection:null}
                  }
                  return item;
                }
              }
            }
            else{
              item.children = item.children.filter(sec => sec.id !== action.payload.id);
              if(action.payload.id === updatedAllActiveItem.section){
                item.children[item.children.length-1]
                updatedAllActiveItem = {
                  ...updatedAllActiveItem,
                  section: item.children[item.children.length-1] ? item.children[item.children.length-1].id : null,
                  subSection: null
                }
              }
              return item;
            }

          }
          else {
              for(const sec of item.children){
                if(sec.id === action.payload.parentSectionId ){
                  if(action.payload.parentSubSectionId){
                    for(const subSec of sec.childSection){
                      if(subSec.id === action.payload.parentSubSectionId){
                        if(action.payload.type === "worksheet"){
                          subSec.worksheet = null;
                          subSec.report = subSec.report.map( rep => {
                            rep.worksheetId = null;
                            return rep
                          })
                          subSec.graphPage = subSec.graphPage.map( page => {
                            page.worksheetId = null;
                            return page
                          })
                        }
                        else if(action.payload.type === "report"){
                          subSec.report = subSec.report.filter( rep => rep.id !== action.payload.id)
                        }
                        else if(action.payload.type === "graphPage"){
                          subSec.graphPage = subSec.graphPage.filter( page => page.id !== action.payload.id)

                        }
                        subSec.allAssetsId = subSec.allAssetsId.filter (asset => asset.id !== action.payload.id)
                        sec.allAssetsId = sec.allAssetsId.filter (asset => asset.id !== action.payload.id)
                        item.allAssetsId = item.allAssetsId.filter (asset => asset.id !== action.payload.id)

                        return item;
                      }
                    }
                  }
                  else{
                    if(action.payload.type === "worksheet"){
                      sec.worksheet = null;
                      sec.report = sec.report.map( rep => {
                        rep.worksheetId = null;
                        return rep
                      })
                      sec.graphPage = sec.graphPage.map( page => {
                        page.worksheetId = null;
                        return page
                      })
                    }
                    else if(action.payload.type === "report"){
                      sec.report = sec.report.filter( rep => rep.id !== action.payload.id)
                    }
                    else if(action.payload.type === "graphPage"){
                      sec.graphPage = sec.graphPage.filter( page => page.id !== action.payload.id)

                    }
                    sec.allAssetsId = sec.allAssetsId.filter (asset => asset.id !== action.payload.id)
                    item.allAssetsId = item.allAssetsId.filter (asset => asset.id !== action.payload.id)
                    return item;
                  }
                }
              }
          }
        }

        return item;
      })

      if(action.payload.type === "section"){

        for (const item of action.payload.allAssetsId) {
          updatedActiveItems = updatedActiveItems.filter(active => active.id !== item);
        }
      }
      else{
        updatedActiveItems = state.activeItems.filter(active => active.id !== action.payload.id);
      }



      state = {
        ...state,
        notebooks: updatedNotebooks,
        activeItems: updatedActiveItems,
        allActiveItem: updatedAllActiveItem
      }

      return {...state}

    default:
      return state;
  }
}

export default notebookReducer;
