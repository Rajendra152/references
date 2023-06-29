import * as types from './actionTypes'

const initialState = {
    isOpenCreateGraph: false,
}

const createGraphReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENCREATEGRAPH:
            state.isOpenCreateGraph = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default createGraphReducer
