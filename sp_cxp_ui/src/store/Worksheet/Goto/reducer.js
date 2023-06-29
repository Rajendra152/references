import * as types from './actionTypes'

const initialState = {
    isOpenGoto: false,
}

const gotoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENGOTO:
            state.isOpenGoto = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default gotoReducer