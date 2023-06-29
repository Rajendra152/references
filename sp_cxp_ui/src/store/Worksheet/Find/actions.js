import * as types from './actionTypes'

export const isOpenFind = (message) => {
    return (dispatch) => {
        dispatch(isOpenFindMessage(message))
    }
}


const isOpenFindMessage = message => ({
    type: types.ISOPENFIND,
    message
})

export const isOpenReportFind = (message) => {
    return (dispatch) => {
        dispatch(isOpenReportFindMessage(message))
    }
}


const isOpenReportFindMessage = message => ({
    type: types.ISOPENREPORTFIND,
    message
})