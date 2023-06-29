import * as types from './actionTypes'

const initialState = {
    isOpenTitles: false,
}

const titlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENTITLES:
            state.isOpenTitles = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default titlesReducer
