import * as types from './actionTypes'

export const isOpenGraphProperty = (message) => {
    return (dispatch) => {
        dispatch(isOpenGraphPropertyMessage(message))
    }
}


const isOpenGraphPropertyMessage = message => ({
    type: types.ISOPENGRAPHPROPERTY,
    message
})