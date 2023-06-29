import * as types from './actionTypes'

export const recentSavedFileAction = (message) => {
    return (dispatch) => {
        dispatch(recentSavedFileMessage(message))
    }
}

const recentSavedFileMessage = message => ({
    type: types.RECENTSAVEDFILE,
    message
})

export const saveAllFileAction = (message) => {
    return (dispatch) => {
        dispatch(savedAllFileMessage(message))
    }
}

const savedAllFileMessage = message => ({
    type: types.SAVEDALLFILEPATH,
    message
})

export const deleteAllFileAction = (message) => {
    return (dispatch) => {
        dispatch(deletedAllFileMessage(message))
    }
}

const deletedAllFileMessage = message => ({
    type: types.DELETEALLFILEPATH,
    message
})
