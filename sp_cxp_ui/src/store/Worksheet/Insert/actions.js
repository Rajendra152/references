import * as types from './actionTypes'

export const isOpenInsCol = (message) => {
    return (dispatch) => {
        dispatch(isOpenInsColMessage(message))
    }
}

const isOpenInsColMessage = message => ({
    type: types.ISOPENINSCOL,
    message
})

export const isOpenInsRow = (message) => {
    return (dispatch) => {
        dispatch(isOpenInsRowMessage(message))
    }
}


const isOpenInsRowMessage = message => ({
    type: types.ISOPENINSROW,
    message
})


export const isOpenShiftCellRight = (message) => {
    return (dispatch) => {
        dispatch(isOpenShiftCellRightMsg(message))
    }
}


const isOpenShiftCellRightMsg = message => ({
    type: types.ISOPENSHIFTCELLRIGHT,
    message
})


export const isOpenShiftCellDown = (message) => {
    return (dispatch) => {
        dispatch(isOpenShiftCellDownMsg(message))
    }
}


const isOpenShiftCellDownMsg = message => ({
    type: types.ISOPENSHIFTCELLDOWN,
    message
})
