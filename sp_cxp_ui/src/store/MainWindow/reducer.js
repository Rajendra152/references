import * as types from './actionTypes'

const initialState = {
    isStatusbarDisplay: true,
    isNotebookManagerDisplay: true,
    isNotebookManagerDisplay2: true,
    // isGraphGalleryDisplay: false,
    // isTemplateDisplay: false,
    isHideWorksheetDialog: true,
    isLoaderDisplay: false,
}

const mainWindowReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.IS_NOTEBOOKMANAGER_DISPLAY:
            state = {
              ...state,
              isNotebookManagerDisplay: action.message
            }
            return {...state }
        case types.IS_NOTEBOOKMANAGER_DISPLAY2:
            state = {
              ...state,
              isNotebookManagerDisplay2: action.message
            }
            return {...state }

        // case types.IS_GRAPHGALLERY_DISPLAY:
        //   state = {
        //     ...state,
        //     isGraphGalleryDisplay: action.message
        //   }
        //   return {...state }

        // case types.IS_TEMPLATE_DISPLAY:
        //     state = {
        //       ...state,
        //       isTemplateDisplay: action.message
        //     }
        //     return {...state }

        case types.IS_STATUSBAR_DISPLAY:

          state = {
            ...state,
            isStatusbarDisplay: action.message
          }
          return {...state }

        case types.IS_WORKSHEETDIALOG_HIDE:

          state = {
            ...state,
            isHideWorksheetDialog: action.message
          }
          return {...state }

        case types.IS_LOADER_DISPLAY:
          state = {
            ...state,  
            isLoaderDisplay: action.message
          } 
          return {...state }

        default:
            return state
    }
}

export default mainWindowReducer
