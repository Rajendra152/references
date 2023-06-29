import * as types from './actionTypes'

const initialState = {
    isFetchedOptionKey: false,
}

const createOptionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISFETCHEDOPTIONKEY:
            state.isFetchedOptionKey = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default createOptionsReducer
