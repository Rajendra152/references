import * as types from './actionTypes'

const initialState = {
    isOpenAdvisor: false,
    screenState: "s_0"
}

const advisorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENADVISOR:
            state.isOpenAdvisor = action.message.message;
            return {...state }
        case types.SETSCREENSTATE:
            state.screenState = action.payload;
            return {...state}
        default:
            return state
    }
}

export default advisorReducer