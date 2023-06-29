import * as types from './actionTypes'

const initialState = {
    isOpenInsCol: false,
    isOpenInsRow: false,
    isOpenShiftCellRight: false,
    isOpenShiftCellDown: false,
}

const insertReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENINSCOL:
            state.isOpenInsCol = action.message.message;
            return {...state }
        case types.ISOPENINSROW:
            state.isOpenInsRow = action.message.message;
            return {...state }
        case types.ISOPENSHIFTCELLRIGHT:
            state.isOpenShiftCellRight = action.message.message;
            return {...state }
        case types.ISOPENSHIFTCELLDOWN:
            state.isOpenShiftCellDown = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default insertReducer
