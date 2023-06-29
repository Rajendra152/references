import * as types from './actionTypes'

export const isOpenImportfile = (message) => {
    return (dispatch) => {
        dispatch(isOpenImportfileMessage(message))
    }
}


const isOpenImportfileMessage = message => ({
    type: types.ISOPENIMPORTFILE,
    message
})


export const isOpenSpreadsheet = (message) => {
    return (dispatch) => {
        dispatch({
            type: types.ISOPENSPREADSHEET,
            message
        })
    }
}

export const isOpenTableQuery = (message) => {
    return (dispatch) => {
        dispatch({
            type: types.ISOPENTABLEQUERY,
            message
        })
    }
}

export const isOpenFieldSelection = (message) => {
    return (dispatch) => {
        dispatch({
            type: types.ISOPENFIELDSELECTION,
            message
        })
    }
}

// export const isOpenImportText = (message) => {
//     return (dispatch) => {
//         dispatch({
//             type: types.ISOPENIMPORTTEXT,
//             message
//         })
//     }
// }
export const isOpenImportText = (message) => {
    return (dispatch) => {
        dispatch(isOpenImportTextMessage(message))
    }
}


const isOpenImportTextMessage = message => ({
    type: types.ISOPENIMPORTTEXT,
    message
})


export const spreadsheetUpdate = (message) => {
    return (dispatch) => {
        dispatch(spreadsheetUpdateMessage(message))
    }
}


const spreadsheetUpdateMessage = message => ({
    type: types.SPREADSHEETUPDATE,
    message
})


export const importTextUpdate = (message) => {
    return (dispatch) => {
        dispatch(importTextUpdateMessage(message))
    }
}


const importTextUpdateMessage = message => ({
    type: types.TEXTUPDATE,
    message
})

export const fieldSelectionUpdate = (message) => {
    return (dispatch) => {
        dispatch(fieldSelectionUpdateMessage(message))
    }
}


const fieldSelectionUpdateMessage = message => ({
    type: types.FIELDSELECTIONUPDATE,
    message
})