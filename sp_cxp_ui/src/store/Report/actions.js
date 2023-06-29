import * as types from './actionTypes'

export const isInstanceAvailable = (message) => {
    return (dispatch) => {
        dispatch(isInstanceAvailableMessage(message))
    }
}

const isReportAvailableMessage = message => ({
    type: types.ISREPORTAVAILABLE,
    message
})

export const isColorAvailable = (message) => {
    return (dispatch) => {
        dispatch(isColorAvailableMessage(message))
    }
}

const isColorAvailableMessage = message => ({
    type: types.ISCOLORAVAILABLE,
    message
})
