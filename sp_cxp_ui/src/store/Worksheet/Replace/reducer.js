import * as types from './actionTypes'

const initialState = {
    isOpenReplace: false,
    isOpenReportReplace: false,
    isWebLayout: 'Pages'
}

const replaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENREPLACE:
            state.isOpenReplace = action.message.message;
            return {...state }
            case types.ISOPENREPORTREPLACE:
            state.isOpenReportReplace = action.message.message;
            return {...state }
            case types.ISWEBLAYOUT:
            state.isWebLayout = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default replaceReducer