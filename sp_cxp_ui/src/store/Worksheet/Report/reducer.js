import * as types from './actionTypes';

const initialState = {
    isOpenReportOptions: false,
    selectedOptionType: ''
}

const reportOptionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENREPORTOPTIONS:
            state.isOpenReportOptions = action.message.message;
            state.selectedOptionType = action.message.optionType;
            return {...state }
        default:
            return state
    }
}

export default reportOptionsReducer
