import * as types from './actionTypes'

const initialState = {
    isOpenSort: false,
    selectedop: "",
    histogramSrc: "",
    typeID:""
}

const gotoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENSORT:
            state.isOpenSort = action.message.message;
            return { ...state }
        case types.SELECTOP:
            state.selectedop = action.message;
            return { ...state }
        case types.UPDATEHIST:
            console.log("UPDATEHIST", action.message)
            state.histogramSrc = action.message;
            return { ...state }
        case types.TYPEID:
            console.log("UPDATETYPE", action.message)
            state.typeID = action.message;
            return { ...state }
        default:
            return state
    }
}

export default gotoReducer