import * as types from './actionTypes'

export const isOpenReportOptions = (message) => {
    return (dispatch) => {
        dispatch(isOpenReportOptionsMessage(message))
    }
}


const isOpenReportOptionsMessage = message => ({
    type: types.ISOPENREPORTOPTIONS,
    message
})
