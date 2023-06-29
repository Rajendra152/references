import * as types from './actionTypes'

export const add = (message) => {
    return (dispatch) => {
        dispatch(addMessage(message))
    }
}


const addMessage = message => ({
    type: types.NOTIFYADD,
    message
})

export const emptyNotification = (message) => {
    return (dispatch) => {
        dispatch(emptyServiceNotification(message))
    }
}


const emptyServiceNotification = message => ({
    type: types.NOTIFYEMPTY,
    message
})

export const update = (message) => {
    return (dispatch) => {
        dispatch(updateMessage(message))
    }
}


const updateMessage = message => ({
    type: types.NOTIFYUPDATE,
    message
})


export const contactIncUpdate = (message) => {
    return (dispatch) => {
        dispatch(contactIncUpdateMessage(message))
    }
}


const contactIncUpdateMessage = message => ({
    type: types.CONTACTINCUPDATE,
    message
})

export const openFind = (message) => {
    return (dispatch) => {
        dispatch(openFindMessage(message))
    }
}


const openFindMessage = message => ({
    type: types.OPENFIND,
    message
})