import * as types from './actionTypes'

export const isOpenResultGraph = (message) => {
    return (dispatch) => {
        dispatch(ResultGraph(message))
    }
}


const ResultGraph = message => ({
    type: types.ISOPENRESULTGRAPH,
    message
})

export const isTestOptionDisabled = (message) => {
    return (dispatch) => {
        dispatch(HandleTestOptionDisable(message))
    }
}

const HandleTestOptionDisable = message => ({
    type: types.TEST_OPTION_DISABLE,
    message
})