import * as types from './actionTypes'

export const isOpenQuickTransform = (message) => {
    return (dispatch) => {
        dispatch(isOpenQuickTransformMessage(message))
    }
}


const isOpenQuickTransformMessage = message => ({
    type: types.ISOPENQUICKTRANSFORM,
    message
})


export const isOpenUserDefined = (message) => {
    return (dispatch) => {
        dispatch(isOpenUserDefinedMessage(message))
    }
}


const isOpenUserDefinedMessage = message => ({
    type: types.ISOPENUSERDEFINED,
    message
})

export const isOpenEquation = (message) => {
    return (dispatch) => {
        dispatch(isOpenEquationMessage(message))
    }
}


const isOpenEquationMessage = message => ({
    type: types.ISOPENEQUATION,
    message
})

export const setSelectedRange = (message) => {
    return (dispatch) => {
        dispatch(setSelectedRangeMessage(message))
    }
}

const setSelectedRangeMessage = message => ({
    type: types.SETSELECTEDRANGE,
    message
})