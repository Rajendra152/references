import * as types from './actionTypes'

const initialState = {
    instance: null,
    color: null
    
}

const instanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISREPORTAVAILABLE:
            state.instance = action.message.message;
            return {...state }
            case types.ISCOLORAVAILABLE:
                state.instance = action.message.message;
                return {...state }
        default:
            return state
    }
}

export default instanceReducer