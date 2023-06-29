import * as types from './actionTypes'

export const isOpenTitles = (message) => {
    return (dispatch) => {
        dispatch(isOpenTitlesMessage(message))
    }
}


const isOpenTitlesMessage = message => ({
    type: types.ISOPENTITLES,
    message
})
