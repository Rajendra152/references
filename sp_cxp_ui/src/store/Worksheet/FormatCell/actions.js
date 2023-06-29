import * as types from './actionTypes'

export const isOpenFormatCell = (message) => {
    return (dispatch) => {
        dispatch(isOpenFormatCellMessage(message))
    }
}


const isOpenFormatCellMessage = message => ({
    type: types.ISOPENFORMATCELL,
    message
})

export const isOpenPlotEquation = (message) => {
    return (dispatch) => {
        dispatch(isOpenPlotEquationMessage(message))
    }
}


const isOpenPlotEquationMessage = message => ({
    type: types.ISOPENPLOTEQUATION,
    message
})

export const isOpenPlotRegression = (message) => {
    return (dispatch) => {
        dispatch(isOpenPlotRegressionMessage(message))
    }
}


const isOpenPlotRegressionMessage = message => ({
    type: types.ISOPENPLOTREGRESSION,
    message
})

export const isOptionsUpdated = (message) => {
    return (dispatch) => {
        dispatch(isOptionsUpdatedMessage(message))
    }
}


const isOptionsUpdatedMessage = message => ({
    type: types.ISOPTIONSUPDATED,
    message
})

export const isOpenMultipleComparisons = (message) => {
    return (dispatch) => {
        dispatch(isOpenMultipleComparisonsMessage(message))
    }
}


const isOpenMultipleComparisonsMessage = message => ({
    type: types.ISOPENMULTIPLECOMPARISONS,
    message
})


export const isOpenMultipleControl = (message) => {
    return (dispatch) => {
        dispatch(isOpenMultipleControlMessage(message))
    }
}


const isOpenMultipleControlMessage = message => ({
    type: types.ISOPENMULTIPLECONTROL,
    message
})




export const isOpenMultipleControlL2 = (message) => {
    return (dispatch) => {
        dispatch(isOpenMultipleControlMessageL2(message))
    }
}


const isOpenMultipleControlMessageL2 = message => ({
    type: types.ISOPENMULTIPLECONTROLL2,
    message
})


export const isOpenMultipleControlL3 = (message) => {
    return (dispatch) => {
        dispatch(isOpenMultipleControlMessageL3(message))
    }
}


const isOpenMultipleControlMessageL3 = message => ({
    type: types.ISOPENMULTIPLECONTROLL3,
    message
})


export const isOutputFormatAvaialble= (message) => {
    console.log(message)
    return (dispatch) => {
        dispatch(isOutputFormatAvaialbleMessage(message))
    }
}


const isOutputFormatAvaialbleMessage = message => ({
    type: types.ISOUTPUTFORMATAVAIALBLE,
    message
})