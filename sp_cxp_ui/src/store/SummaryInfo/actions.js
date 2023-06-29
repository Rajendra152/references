import * as types from './actionTypes'

export const summaryInfoAction = (message) => {
    return (dispatch) => {
        dispatch(summaryInfoMessage(message))
    }
}

const summaryInfoMessage = message => ({
    type: types.SUMMARYDETAILS,
    message
})
