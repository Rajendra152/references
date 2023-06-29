import * as types from './actionTypes'

const initialState = {
    isOpenFind: false,
    isOpenReportFind: false,
   
}

const findReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENFIND:
            state.isOpenFind = action.message.message;
            return {...state }
            case types.ISOPENREPORTFIND: 
            state.isOpenReportFind = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default findReducer;