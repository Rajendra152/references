import * as types from './actionTypes'

export const isLoadBar = (message) => {
    return (dispatch) => {
        dispatch(isLoadBarMessage(message))
    }
}


const isLoadBarMessage = message => ({
    type: types.ISLOADBAR,
    message
})

export const updatePercentageMessage = (message) => {
    return (dispatch) => {
        dispatch(updatePerctMessage(message))
    }
}


const updatePerctMessage = message => ({
    type: types.PERCENTAGE,
    message
})


export const isLoaderSM = (message) => {
    return (dispatch) => {
        dispatch(isLoaderSMMessage(message))
    }
}


const isLoaderSMMessage = message => ({
    type: types.ISLOADERSM,
    message
})