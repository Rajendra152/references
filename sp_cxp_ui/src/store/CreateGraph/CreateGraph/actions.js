import * as types from './actionTypes'

export const isOpenCreateGraph = (message) => {
    return (dispatch) => {
        dispatch(isOpenCreateGraphMessage(message))
    }
}


const isOpenCreateGraphMessage = message => ({
    type: types.ISOPENCREATEGRAPH,
    message
})
