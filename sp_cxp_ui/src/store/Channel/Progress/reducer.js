import * as types from './actionTypes'

const initialState = {
    isLoadBar: false,
    percentage: 0,
    isLoaderSM: false
}

const progressBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISLOADBAR:
            state.isLoadBar = action.message.message;
            return {...state }
        case types.PERCENTAGE:
            state.percentage = action.message.message;
            return {...state }
        case types.ISLOADERSM:
            state.isLoaderSM = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default progressBarReducer