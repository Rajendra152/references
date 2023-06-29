import * as types from './actionTypes'

export const isOpenReplace = (message) => {
    return (dispatch) => {
        dispatch(isOpenReplaceMessage(message))
    }
}


const isOpenReplaceMessage = message => ({
    type: types.ISOPENREPLACE,
    message
})

export const isOpenReportReplace = (message) => {
    return (dispatch) => {
        dispatch(isOpenReportReplaceMessage(message))
    }
}


const isOpenReportReplaceMessage = message => ({
    type: types.ISOPENREPORTREPLACE,
    message
})


export const isWebLayout= (message) => {
    return (dispatch) => {
        dispatch(isWebLayoutMessage(message))
    }
}


const isWebLayoutMessage = message => ({
    type: types.ISWEBLAYOUT,
    message
})