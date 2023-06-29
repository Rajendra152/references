import * as types from './actionTypes'

export const isOpenSort = (message) => {
    return (dispatch) => {
        dispatch(isOpenSortMessage(message))
    }
}


const isOpenSortMessage = message => ({
    type: types.ISOPENSORT,
    message
})

export const selectOPtion = message => ({
    type: types.SELECTOP,
    message
})


export const selecthistSrc = message => ({
    type: types.UPDATEHIST,
    message
})
export const selectTypeId = message => ({
    type: types.TYPEID,
    message
})