import * as types from './actionTypes'

export const isOpenDelCol = (message) => {
    return (dispatch) => {
        dispatch(isOpenDelColMessage(message))
    }
}

const isOpenDelColMessage = message => ({
    type: types.ISOPENDELCOL,
    message
})

export const isOpenDelRow = (message) => {
    return (dispatch) => {
        dispatch(isOpenDelRowMessage(message))
    }
}


const isOpenDelRowMessage = message => ({
    type: types.ISOPENDELROW,
    message
})

export const isOpenShiftCellLeft = (message) => {
    return (dispatch) => {
        dispatch(isOpenShiftCellLeftMsg(message))
    }
}


const isOpenShiftCellLeftMsg = message => ({
    type: types.ISOPENSHIFTCELLLEFT,
    message
})


export const isOpenShiftCellUp = (message) => {
    return (dispatch) => {
        dispatch(isOpenShiftCellUpMsg(message))
    }
}


const isOpenShiftCellUpMsg = message => ({
    type: types.ISOPENSHIFTCELLUP,
    message
})
