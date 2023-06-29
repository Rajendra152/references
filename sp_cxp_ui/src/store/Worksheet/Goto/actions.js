import * as types from './actionTypes'

export const isOpenGoto = (message) => {
    return (dispatch) => {
        dispatch(isOpenGotoMessage(message))
    }
}


const isOpenGotoMessage = message => ({
    type: types.ISOPENGOTO,
    message
})