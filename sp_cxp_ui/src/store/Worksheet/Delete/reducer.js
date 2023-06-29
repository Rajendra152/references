import * as types from './actionTypes'

const initialState = {
    isOpenDelCol: false,
    isOpenDelRow: false,
    isOpenShiftCellLeft: false,
    isOpenShiftCellUp: false,
}

const deleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENDELCOL:
            state.isOpenDelCol = action.message.message;
            return {...state }
        case types.ISOPENDELROW:
            state.isOpenDelRow = action.message.message;
            return {...state }
        case types.ISOPENSHIFTCELLLEFT:
            state.isOpenShiftCellLeft = action.message.message;
            return {...state }
        case types.ISOPENSHIFTCELLUP:
            state.isOpenShiftCellUp = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default deleteReducer
