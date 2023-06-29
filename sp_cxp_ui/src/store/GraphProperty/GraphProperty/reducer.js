import * as types from './actionTypes'

const initialState = {
    isOpenGraphProperty: { isOpen : false, graphId : ''}
}

const graphPropertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENGRAPHPROPERTY:
            state.isOpenGraphProperty = action.message;
            console.log(state, "insidereducer")
            return {...state }
        default:
            return state
    }
}

export default graphPropertyReducer