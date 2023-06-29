import * as types from './actionTypes'

export const isOptions = (message) => {
    return (dispatch) => {
        dispatch(isOptionsMessage(message))
    }
}


const isOptionsMessage = message => ({
    type: types.ISOPTIONS,
    message
})


export const isExit = (message) => {
    return (dispatch) => {
        dispatch(isExitMessage(message))
    }
}


const isExitMessage = message => ({
    type: types.ISEXIT,
    message
})



export const OptionsUpdate = (message) => {
    return (dispatch) => {
        dispatch(OptionsUpdateMessage(message))
    }
}


const OptionsUpdateMessage = message => ({
    type: types.OPTIONSUPDATE,
    message
})


export const OptionsUpdateCollection = (message) => {
    return (dispatch) => {
        dispatch(OptionsUpdateCollectionMessage(message))
    }
}


const OptionsUpdateCollectionMessage = message => ({
    type: types.OPTIONSUPDATECOLLECTION,
    message
})

export const ShowPropertiesPane = (message) => {
    return (dispatch) => {
        dispatch(ShowPropertiesPaneMessage(message))
    }
}


const ShowPropertiesPaneMessage = message => ({
    type: types.SHOWPROPERTIESPANE,
    message
})


export const EnableToolbar = (message) => {
    return (dispatch) => {
        dispatch(EnableToolbarMessage(message))
    }
}


const EnableToolbarMessage = message => ({
    type: types.ENABLETOOLBAR,
    message
})


