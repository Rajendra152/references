import * as types from './actionTypes'


const isNotebookManagerDisplayMsg = message => ({
  type: types.IS_NOTEBOOKMANAGER_DISPLAY,
  message
})
const isNotebookManagerDisplayMsg2 = message => ({
  type: types.IS_NOTEBOOKMANAGER_DISPLAY2,
  message
})

const isGraphGalleryDisplayMsg = message => ({
  type: types.IS_GRAPHGALLERY_DISPLAY,
  message
})

const isTemplateDisplayMsg = message => ({
  type: types.IS_TEMPLATE_DISPLAY,
  message
})

const isStatusbarDisplayMsg = message => ({
  type: types.IS_STATUSBAR_DISPLAY,
  message
})

const isWorksheetDialogHideMsg = message => ({
  type: types.IS_WORKSHEETDIALOG_HIDE,
  message
})


export const isNotebookManagerDisplay = (message) => {
    return (dispatch) => {
        dispatch(isNotebookManagerDisplayMsg(message))
    }
}
export const isNotebookManagerDisplay2 = (message) => {
    return (dispatch) => {
        dispatch(isNotebookManagerDisplayMsg2(message))
    }
}

export const isGraphGalleryDisplay = (message) => {
    return (dispatch) => {
        dispatch(isGraphGalleryDisplayMsg(message))
    }
}


export const isTemplateDisplay = (message) => {
    return (dispatch) => {
        dispatch(isTemplateDisplayMsg(message))
    }
}

export const isStatusbarDisplay = (message) => {
    return (dispatch) => {
        dispatch(isStatusbarDisplayMsg(message))
    }
}

export const isWorksheetDialogHide = (message) => {
    return (dispatch) => {
        dispatch(isWorksheetDialogHideMsg(message))
    }
}

const isLoaderDisplayMsg = message => ({
  type: types.IS_LOADER_DISPLAY,
  message
})

export const isLoaderDisplay = (message) => {
  return (dispatch) => {
      dispatch(isLoaderDisplayMsg(message))
  }
}

