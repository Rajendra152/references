import * as types from './actionTypes'

export const isFetchedOptionKey = (message) => {
    return (dispatch) => {
        dispatch(isFetchedOptionKey(message))
    }
}


const isFetchedOptionKey = message => ({
    type: types.ISFETCHEDOPTIONKEY,
    message
})
