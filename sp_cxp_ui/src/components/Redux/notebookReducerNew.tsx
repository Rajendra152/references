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
  ADD_EQUATION,
  ADD_GRAPHPAGE,
  RENAME_ITEM,
  REMOVE_NOTEBOOK,
  ADD_WORKSHEET,
  DELETE_ITEM,
  PASTE_ITEM,
  SAVE_ITEM,
  REMOVE_ALL_ACTIVE_ITEM,
  UPDATE_GRAPH_PROPERTY,
  UPDATE_TRANSFORM_DATA,
  UPDATE_EQUATION_DATA,
  ADD_SELECTED_ITEM,
  RESET_SELECTED_ITEMS,
} from './actionConstants';

import { WorksheetProp } from '../../services/NotebookManagerServices';
import * as ITEM_TYPE  from '../../services/NotebookManagerServices/ConstantsNotebookManager';

import { initialNotebookState } from './initialNotebookState';
import { getDefaultAuditLogObject } from '../../services/notebookManagerServices/GetDefaultObject';
import AuditLog from '../../services/AuditLogService';

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
  allActiveItem?: Object;
}

export interface INotebook {
  id?: number;
  name?: string;
}

function notebookReducer(
  state = initialNotebookState,
  action: IAction
): IState {
  let newState = {};

  // console.log(
  //   'State nOtebook object is .............................. : ',
  //   state.notebooks.allNotebooks.byId
  // );

  switch (action.type) {
    case ADD_NOTEBOOK:
      AuditLog.log(
        action.payload.notebook,
        getDefaultAuditLogObject('SECTION')
        // getDefaultAuditLogObject('ADD_SECTION')
      );
      AuditLog.log(
        action.payload.notebook,
        getDefaultAuditLogObject('WORKSHEET')
        // getDefaultAuditLogObject('ADD_WORKSHEET')
      );

      newState = {
        ...state,
        notebooks: {
          ...state.notebooks,
          allNotebooks: {
            byId: {
              ...state.notebooks.allNotebooks.byId,
              [action.payload.notebook.id]: action.payload.notebook,
            },
            allNotebooksId: [
              ...state.notebooks.allNotebooks.allNotebooksId,
              action.payload.notebook.id,
            ],
          },
          allSections: {
            byId: {
              ...state.notebooks.allSections.byId,
              [action.payload.section.id]: action.payload.section,
            },
            allSectionsId: {
              ...state.notebooks.allSections.allSectionsId,
              [action.payload.section.parentNotebookId]: state.notebooks
                .allSections.allSectionsId[
                action.payload.section.parentNotebookId
              ]
                ? [
                    ...state.notebooks.allSections.allSectionsId[
                      action.payload.section.parentNotebookId
                    ],
                    action.payload.section.id,
                  ]
                : [action.payload.section.id],
            },
          },
          allWorksheets: {
            byId: {
              ...state.notebooks.allWorksheets.byId,
              [action.payload.worksheet.id]: action.payload.worksheet,
            },
            allWorksheetsId: [
              ...state.notebooks.allWorksheets.allWorksheetsId,
              action.payload.worksheet.id,
            ],
          },
        },
      };
      return newState;

    case REMOVE_NOTEBOOK:
      newState = {
        ...state,
        notebooks: action.payload,
      };
      return newState;

    case ADD_OPEN_WORKSHEET:
      newState = {
        ...state,
        openWorksheets: [...state.openWorksheets, action.payload],
      };
      return newState;

    case SET_ACTIVE_WORKSHEET:
      newState = {
        ...state,
        activeWorksheet: action.payload,
      };
      return newState;

    case CLEAR_NOTEBOOK:
      newState = {
        notebooks: {
          allNotebooks: {
            byId: {},
            allNotebooksId: state.notebooks.allNotebooks.allNotebooksId,
          },
          allSections: {
            byId: {},
            allSectionsId: {},
          },
          allWorksheets: {
            byId: {},
            allWorksheetsId: [],
          },
          allGraphPages: {
            byId: {},
            graphs: {
              byId: {},
              allGraphsId: [],
            },
            allGraphPagesId: [],
          },
          allReports: {
            byId: {},
            allReportsId: [],
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
          allCopiedId: {},
        },
        activeItems: [],
        selectedItems: new Set(),
        openWorksheets: [],
        activeWorksheet: 'string',
        selectedPivotItem: '',
        allActiveItem: {
          notebook: '',
          section: '',
          worksheet: '',
          graphPage: {
            id: '',
            object: '',
          },
          report: '',
          transform: '',
          equation: '',
          selectedItemOnNotebook: '',
          cursor: '',
        },
      };

      return newState;

    case SET_ACTIVE_ITEM:
      let newItem = action.payload
      newItem.lastActive = new Date()
      console.log(newItem)
      newState = {
        ...state,
        activeItems: [...state.activeItems, newItem],
      };
      return newState;

    case REMOVE_ACTIVE_ITEM:
      let currItem = state.activeItems.filter((item) => {
        return item.id === action.payload;
      })
      newState = {
        ...state,
        activeItems: state.activeItems.filter((item) => {
          return item.id != action.payload;
        }),
      };
      let newAllActvItem = {...state.allActiveItem}
      let newPivotItem = state.selectedPivotItem
      if(currItem[0].id === state.selectedPivotItem && newState.activeItems.length>0){
        let sortedAcvItem  = [...newState.activeItems].sort((a, b) => b.lastActive - a.lastActive)[0];
        console.log("sortedAcvItem",sortedAcvItem)
        newPivotItem = sortedAcvItem.id;
        newAllActvItem = {
          notebook: sortedAcvItem.parentNotebookId,
          section: sortedAcvItem.parentSectionId,
          worksheet: '',
          graphPage: {
            id: '',
            object: '',
          },
          report: '',
          transform: '',
          equation: '',
          selectedItemOnNotebook: sortedAcvItem.id,
          cursor: sortedAcvItem.id,
        }
        if(sortedAcvItem.type===ITEM_TYPE.WORKSHEET){
          newAllActvItem.worksheet = sortedAcvItem.id
        }
        else if(sortedAcvItem.type===ITEM_TYPE.GRAPHPAGE){
          newAllActvItem.graphPage= {
            id:  sortedAcvItem.id,
            object: '',
          }
        }
        else if(sortedAcvItem.type===ITEM_TYPE.REPORT){
          newAllActvItem.report = sortedAcvItem.id
        }
        else if(sortedAcvItem.type===ITEM_TYPE.EQUATION){
          newAllActvItem.equation = sortedAcvItem.id
        }
        else if(sortedAcvItem.type===ITEM_TYPE.TRANSFORM){
          newAllActvItem.transform = sortedAcvItem.id
        }
      }
      if(newState.activeItems.length == 0){
        newAllActvItem.worksheet = '';
        newAllActvItem.graphPage= {
          id:  '',
          object: '',
        }
        newAllActvItem.report = ''
        newAllActvItem.equation = ''
        newAllActvItem.transform = ''
      } 
      newState = {
        ...newState,
        allActiveItem: newAllActvItem,
        selectedPivotItem: newPivotItem      
      };

      return newState

    case REMOVE_ALL_ACTIVE_ITEM:
      newState = {
        ...state,
        activeItems: [],
      };

      return newState;

    case ADD_GRAPH_TO_SECTION:
      state = {
        ...state,
        notebooks: [...action.payload],
      };
      return { ...state };

    case SET_SELECTED_PIVOT_ITEM:
      newState = {
        ...state,
        selectedPivotItem: action.payload,
      };
      return newState;

    case SET_ALL_ACTIVE_ITEM:
      // const currItem = state.activeItems.filter((item) => {
      //   return item.id === action.payload.cursor;
      // })
      const newActItems = state.activeItems.map(item => {
         if(item.id === action.payload.cursor){
           item.lastActive = new Date();
          
          }
        return item
      })

      // if(currItem[0]){
      //   newActItems.push(currItem[0])
      // }

      newState = {
        ...state,
        allActiveItem: action.payload,
        activeItems: newActItems,
      }
      return newState

    case ADD_SECTION:
      AuditLog.log(
        action.payload.newNbk,
        getDefaultAuditLogObject('SECTION')
        // getDefaultAuditLogObject('ADD_SECTION')
      );

      action.payload.newWrk &&
        AuditLog.log(
          action.payload.newNbk,
          getDefaultAuditLogObject('WORKSHEET')
          // getDefaultAuditLogObject('ADD_WORKSHEET')
        );

      action.payload.newRep &&
        AuditLog.log(
          action.payload.newNbk,
          getDefaultAuditLogObject('REPORT')
          // getDefaultAuditLogObject('ADD_REPORT')
        );

      action.payload.newGrPg &&
        AuditLog.log(
          action.payload.newNbk,
          getDefaultAuditLogObject('GRAPHPAGE')
          // getDefaultAuditLogObject('ADD_GRAPHPAGE')
        );

      action.payload.newTransform &&
        AuditLog.log(
          action.payload.newNbk,
          getDefaultAuditLogObject('TRANSFORM')
          // getDefaultAuditLogObject('ADD_TRANSFORM')
        );

      action.payload.newEquation &&
        AuditLog.log(
          action.payload.newNbk,
          getDefaultAuditLogObject('EQUATION')
          // getDefaultAuditLogObject('ADD_EQUATION')
        );

      newState = {
        ...state,
        notebooks: {
          ...state.notebooks,
          allNotebooks: {
            ...state.notebooks.allNotebooks,
            byId: {
              ...state.notebooks.allNotebooks.byId,
              [action.payload.newNbk.id]: action.payload.newNbk,
            },
          },
          allSections: {
            ...state.notebooks.allSections,
            byId: {
              ...state.notebooks.allSections.byId,
              [action.payload.newSec.id]: action.payload.newSec,
              ...(action.payload.newParSec && {
                [action.payload.newParSec.id]: action.payload.newParSec,
              }),
            },
            allSectionsId: {
              ...state.notebooks.allSections.allSectionsId,
              [action.payload.newNbk.id]: [
                ...state.notebooks.allSections.allSectionsId[
                  action.payload.newNbk.id
                ],
                action.payload.newSec.id,
              ],
            },
          },

          ...(action.payload.newWrk && {
            allWorksheets: {
              byId: {
                ...state.notebooks.allWorksheets.byId,
                [action.payload.newWrk.id]: action.payload.newWrk,
              },
              allWorksheetsId: [
                ...state.notebooks.allWorksheets.allWorksheetsId,
                action.payload.newWrk.id,
              ],
            },
          }),

          ...(action.payload.newGrPg && {
            allGraphPages: {
              byId: {
                ...state.notebooks.allGraphPages.byId,
                [action.payload.newGrPg.id]: action.payload.newGrPg,
              },
              allGraphPagesId: [
                ...state.notebooks.allGraphPages.allGraphPagesId,
                action.payload.newGrPg.id,
              ],
            },
          }),

          ...(action.payload.newRep && {
            allReports: {
              byId: {
                ...state.notebooks.allReports.byId,
                [action.payload.newRep.id]: action.payload.newRep,
              },
              allReportsId: [
                ...state.notebooks.allReports.allReportsId,
                action.payload.newRep.id,
              ],
            },
          }),

          ...(action.payload.newTransform && {
            allTransforms: {
              byId: {
                ...state.notebooks.allTransforms.byId,
                [action.payload.newTransform.id]: action.payload.newTransform,
              },
              allTransformsId: [
                ...state.notebooks.allTransforms.allTransformsId,
                action.payload.newTransform.id,
              ],
            },
          }),

          ...(action.payload.newEquation && {
            allEquations: {
              byId: {
                ...state.notebooks.allEquations.byId,
                [action.payload.newEquation.id]: action.payload.newEquation,
              },
              allEquationsId: [
                ...state.notebooks.allEquations.allEquationsId,
                action.payload.newEquation.id,
              ],
            },
          }),
        },
      };

      return newState;

    case ADD_WORKSHEET:
      AuditLog.log(
        action.payload.newNbk,
        getDefaultAuditLogObject('WORKSHEET')
        // getDefaultAuditLogObject('ADD_WORKSHEET')
      );
      newState = {
        ...state,
        notebooks: {
          ...state.notebooks,
          allNotebooks: {
            ...state.notebooks.allNotebooks,
            byId: {
              ...state.notebooks.allNotebooks.byId,
              [action.payload.newNbk.id]: action.payload.newNbk,
            },
          },

          allSections: {
            ...state.notebooks.allSections,
            byId: {
              ...state.notebooks.allSections.byId,
              [action.payload.newSec.id]: action.payload.newSec,
            },
          },

          allWorksheets: {
            ...state.notebooks.allWorksheets,
            byId: {
              ...state.notebooks.allWorksheets.byId,
              [action.payload.newWrk.id]: action.payload.newWrk,
            },
            allWorksheetsId: [
              ...state.notebooks.allWorksheets.allWorksheetsId,
              action.payload.newWrk.id,
            ],
          },

          ...(action.payload.newAllGrPg && {
            allGraphPages: {
              ...state.notebooks.allGraphPages,
              byId: {
                ...state.notebooks.allGraphPages.byId,
                ...action.payload.newAllGrPg,
              },
            },
          }),

          ...(action.payload.newCopied && {
            allCopiedId: action.payload.newCopied,
          }),
        },
      };
      console.log(newState);
      return newState;

    case ADD_REPORT:
      AuditLog.log(
        action.payload.newNbk,
        getDefaultAuditLogObject('REPORT')
        // getDefaultAuditLogObject('ADD_REPORT')
      );
      newState = {
        ...state,
        notebooks: {
          ...state.notebooks,
          allNotebooks: {
            ...state.notebooks.allNotebooks,
            byId: {
              ...state.notebooks.allNotebooks.byId,
              [action.payload.newNbk.id]: action.payload.newNbk,
            },
          },

          allSections: {
            ...state.notebooks.allSections,
            byId: {
              ...state.notebooks.allSections.byId,
              [action.payload.newSec.id]: action.payload.newSec,
            },
          },

          allReports: {
            ...state.notebooks.allReports,
            byId: {
              ...state.notebooks.allReports.byId,
              [action.payload.newRep.id]: action.payload.newRep,
            },
            allReportsId: [
              ...state.notebooks.allReports.allReportsId,
              action.payload.newRep.id,
            ],
          },

          ...(action.payload.newCopied && {
            allCopiedId: action.payload.newCopied,
          }),
        },
      };

      return newState;

    case ADD_TRANSFORM:
        newState = {
          ...state,
          notebooks:{
            ...state.notebooks,
            allNotebooks: {
              ...state.notebooks.allNotebooks,
              byId: {
                ...state.notebooks.allNotebooks.byId,
                [action.payload.newNbk.id] : action.payload.newNbk
              }
            },

            allSections: {
              ...state.notebooks.allSections,
              byId: {
                ...state.notebooks.allSections.byId,
                [action.payload.newSec.id] : action.payload.newSec
              }
            },

            allTransforms: {
              ...state.notebooks.allTransforms,
              byId: {
                ...state.notebooks.allTransforms.byId,
                [action.payload.newTransform.id] : action.payload.newTransform
              },
              allTransformsId: [...state.notebooks.allTransforms.allTransformsId, action.payload.newTransform.id]
            },

            ...(action.payload.newCopied) && {allCopiedId:action.payload.newCopied}

          }
        }
        return newState

    case UPDATE_TRANSFORM_DATA:
      let trans = state.notebooks.allTransforms.byId[action.payload.transformId]
      state.notebooks.allNotebooks.byId[trans.parentNotebookId].isSaved = false;
      newState = {
        ...state,
        notebooks:{
          ...state.notebooks,
          allTransforms: {
            ...state.notebooks.allTransforms,
            byId: {
              ...state.notebooks.allTransforms.byId,
              [action.payload.transformId]: {
                ...state.notebooks.allTransforms.byId[action.payload.transformId],
                transformData: action.payload,
                isSaved: false,
              }
            }
          }
        }
      }
      return newState;

    case ADD_EQUATION:
      newState = {
        ...state,
        notebooks:{
          ...state.notebooks,
          allNotebooks: {
            ...state.notebooks.allNotebooks,
            byId: {
              ...state.notebooks.allNotebooks.byId,
              [action.payload.newNbk.id] : action.payload.newNbk
            }
          },

          allSections: {
            ...state.notebooks.allSections,
            byId: {
              ...state.notebooks.allSections.byId,
              [action.payload.newSec.id] : action.payload.newSec
            }
          },

          allEquations: {
            ...state.notebooks.allEquations,
            byId: {
              ...state.notebooks.allEquations.byId,
              [action.payload.newEquation.id] : action.payload.newEquation
            },
            allEquationsId: [...state.notebooks.allEquations.allEquationsId, action.payload.newEquation.id]
          },

          ...(action.payload.newCopied) && {allCopiedId:action.payload.newCopied}

        }
      }
      return newState

    case UPDATE_EQUATION_DATA:
      let equ = state.notebooks.allTransforms.byId[action.payload.equationId]
      state.notebooks.allNotebooks.byId[equ.parentNotebookId].isSaved = false;
      newState = {
        ...state,
        notebooks:{
          ...state.notebooks,
          allEquations: {
            ...state.notebooks.allEquations,
            byId: {
              ...state.notebooks.allEquations.byId,
              [action.payload.equationId]: {
                ...state.notebooks.allEquations.byId[action.payload.equationId],
                equationData: action.payload,
                isSaved:false
              }
            }
          }
        }
      }
      return newState;

    case ADD_GRAPHPAGE:
      AuditLog.log(
        action.payload.newNbk,
        getDefaultAuditLogObject('GRAPHPAGE')
        // getDefaultAuditLogObject('ADD_GRAPHPAGE')
      );
      newState = {
        ...state,
        notebooks: {
          ...state.notebooks,
          allNotebooks: {
            ...state.notebooks.allNotebooks,
            byId: {
              ...state.notebooks.allNotebooks.byId,
              [action.payload.newNbk.id]: action.payload.newNbk,
            },
          },

          allSections: {
            ...state.notebooks.allSections,
            byId: {
              ...state.notebooks.allSections.byId,
              [action.payload.newSec.id]: action.payload.newSec,
            },
          },

          allGraphPages: {
            ...state.notebooks.allGraphPages,
            byId: {
              ...state.notebooks.allGraphPages.byId,
              [action.payload.newGrPg.id]: action.payload.newGrPg,
            },
            allGraphPagesId: [
              ...state.notebooks.allGraphPages.allGraphPagesId,
              action.payload.newGrPg.id,
            ],
          },

          ...(action.payload.newCopied && {
            allCopiedId: action.payload.newCopied,
          }),
        },
      };
      return newState;

    case RENAME_ITEM:
      let renamedActiveItem = state.activeItems;
      let changedItem: any;
      if (action.payload.newWrk) {
        changedItem = action.payload.newWrk;
      } else if (action.payload.newRep) {
        changedItem = action.payload.newRep;
      } else if (action.payload.newGrPg) {
        changedItem = action.payload.newGrPg;
      } else if (action.payload.newTransform) {
        changedItem = action.payload.newTransform;
      } else if (action.payload.newEquation) {
        changedItem = action.payload.newEquation;
      }

      if (!action.payload.newSec) {
        renamedActiveItem = state.activeItems?.map((active) => {
          if (active.id === changedItem.id) {
            active.name = changedItem.name;
          }
          return active;
        });
      }

      state.notebooks.allNotebooks.byId[changedItem.parentNotebookId].isSaved = false;
      newState = {
        ...state,
        notebooks: {
          ...state.notebooks,

          ...(action.payload.newSec && {
            allSections: {
              ...state.notebooks.allSections,
              byId: {
                ...state.notebooks.allSections.byId,
                [action.payload.newSec.id]: action.payload.newSec,
              },
            },
          }),

          ...(action.payload.newWrk && {
            allWorksheets: {
              ...state.notebooks.allWorksheets,
              byId: {
                ...state.notebooks.allWorksheets.byId,
                [action.payload.newWrk.id]: action.payload.newWrk,
              },
            },
          }),

          ...(action.payload.newRep && {
            allReports: {
              ...state.notebooks.allReports,
              byId: {
                ...state.notebooks.allReports.byId,
                [action.payload.newRep.id]: action.payload.newRep,
              },
            },
          }),

          ...(action.payload.newGrPg && {
            allGraphPages: {
              ...state.notebooks.allGraphPages,
              byId: {
                ...state.notebooks.allGraphPages.byId,
                [action.payload.newGrPg.id]: action.payload.newGrPg,
              },
            },
          }),

          ...(action.payload.newTransform && {
            allTransforms:{
              ...state.notebooks.allTransforms,
              byId:{
                ...state.notebooks.allTransforms.byId,
                [action.payload.newTransform.id] : action.payload.newTransform
              }
            },
          }),

          ...(action.payload.newEquation && {
            allEquations: {
              ...state.notebooks.allEquations,
              byId: {
                ...state.notebooks.allEquations.byId,
                [action.payload.newEquation.id]: action.payload.newEquation,
              },
            },
          }),

        },
        activeItems: renamedActiveItem,
      };

      return newState;

    case DELETE_ITEM:
      newState = {
        ...state,
        notebooks: {
          ...state.notebooks,
          ...(action.payload.allNbk && { allNotebooks: action.payload.allNbk }),
          ...(action.payload.allSec && { allSections: action.payload.allSec }),
          ...(action.payload.allWrk && {
            allWorksheets: action.payload.allWrk,
          }),
          ...(action.payload.allGrPg && {
            allGraphPages: action.payload.allGrPg,
          }),
          ...(action.payload.allRep && { allReports: action.payload.allRep }),
          ...(action.payload.allTransform && { allTransform: action.payload.allTransform }),
          ...(action.payload.allEquation && { allEquation: action.payload.allEquation }),
        },
        activeItems: action.payload.actvItm,
        allActiveItem: action.payload.allActvItm,
      };

      return newState;

    case SAVE_ITEM:
      newState = {
        ...state,
        notebooks: {
          ...state.notebooks,
          ...(action.payload.allNbk && { allNotebooks: action.payload.allNbk }),
          ...(action.payload.allSec && { allSections: action.payload.allSec }),
          ...(action.payload.allWrk && {
            allWorksheets: action.payload.allWrk,
          }),
          ...(action.payload.allGrPg && {
            allGraphPages: action.payload.allGrPg,
          }),
          ...(action.payload.allRep && { allReports: action.payload.allRep }),
          ...(action.payload.allTransform && { allTransform: action.payload.allTransform }),
          ...(action.payload.allEquation && { allEquation: action.payload.allEquation }),
        },
      };

      return newState;

    case PASTE_ITEM:
      newState = {
        ...state,
        notebooks: {
          ...state.notebooks,
          allNotebooks: {
            ...state.notebooks.allNotebooks,
            byId: {
              ...state.notebooks.allNotebooks.byId,
              ...action.payload.allNotebooks.byId,
            },
          },
          allSections: {
            ...state.notebooks.allSections,
            byId: {
              ...state.notebooks.allSections.byId,
              ...action.payload.allSections.byId,
            },
            allSectionsId: {
              ...state.notebooks.allSections.allSectionsId,
              ...action.payload.allSections.allSectionsId,
            },
          },
          allWorksheets: {
            ...state.notebooks.allWorksheets,
            byId: {
              ...state.notebooks.allWorksheets.byId,
              ...action.payload.allWorksheets.byId,
            },
            allWorksheetsId: [
              ...state.notebooks.allWorksheets.allWorksheetsId,
              ...action.payload.allWorksheets.allWorksheetsId,
            ],
          },
          allGraphPages: {
            ...state.notebooks.allGraphPages,
            byId: {
              ...state.notebooks.allGraphPages.byId,
              ...action.payload.allGraphPages.byId,
            },
            allGraphPagesId: [
              ...state.notebooks.allGraphPages.allGraphPagesId,
              ...action.payload.allGraphPages.allGraphPagesId,
            ],
          },
          allReports: {
            ...state.notebooks.allReports,
            byId: {
              ...state.notebooks.allReports.byId,
              ...action.payload.allReports.byId,
            },
            allReportsId: [
              ...state.notebooks.allReports.allReportsId,
              ...action.payload.allReports.allReportsId,
            ],
          },

          allTransforms:{
            ...state.notebooks.allTransforms,
            byId:{
              ...state.notebooks.allTransforms.byId,
              ...action.payload.allTransforms.byId,
            },
            allTransformsId:[
              ...state.notebooks.allTransforms.allTransformsId,
              ...action.payload.allTransforms.allTransformsId
            ]
          },

          allEquations: {
            ...state.notebooks.allEquations,
            byId: {
              ...state.notebooks.allEquations.byId,
              ...action.payload.allEquations.byId,
            },
            allEquationsId: [
              ...state.notebooks.allEquations.allEquationsId,
              ...action.payload.allEquations.allEquationsId,
            ],
          },

          ...(action.payload.allCopiedId && {
            allCopiedId: action.payload.allCopiedId,
          }),
        },
      };
      console.log(newState)
      return newState;

    case UPDATE_GRAPH_PROPERTY:
      state.notebooks.allNotebooks.byId[action.payload.upGrPg.parentNotebookId].isSaved = false;
      newState = {
        ...state,
        notebooks: {
          ...state.notebooks,
          allGraphPages: {
            ...state.notebooks.allGraphPages,
            byId: {
              ...state.notebooks.allGraphPages.byId,
              [action.payload.upGrPg.id]: action.payload.upGrPg,
            },
          },
        },
        activeItems: state.activeItems.map((item) => {
          if(item.id === action.payload.upGrPg.id){
            return action.payload.upGrPg
          } else {
           return item
          }
        }),
      };
      console.log(newState)
      return newState;
    
    case ADD_SELECTED_ITEM:
      let newSelectedItems = new Set(state.selectedItems)
      newSelectedItems.add(action.payload);
      newState = {...state, selectedItems: newSelectedItems};
      return newState;

    case RESET_SELECTED_ITEMS:
      let emptySelectedItems = new Set()
      newState = {...state, selectedItems: emptySelectedItems};
      return newState;

    default:
      return state;
  }
}

export default notebookReducer;
