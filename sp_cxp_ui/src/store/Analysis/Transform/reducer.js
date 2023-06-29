import * as types from './actionTypes';

const initialState = {
    isOpenQuickTransform: false,
    isOpenUserDefined: false,
    isOpenEquation: false,
    transformId: '',
    equationId: '',
    itemClicked: {},
    selectedRange: []
}

const transformReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENQUICKTRANSFORM:
            state.isOpenQuickTransform = action.message.message;
            return {...state }
        case types.SETSELECTEDRANGE:
            state.selectedRange = action.message.range;
            return {...state }
        case types.ISOPENUSERDEFINED:
            state.isOpenUserDefined = action.message.message;
            state.transformId = '';
            if(action.message.transformId) {
                state.transformId = action.message.transformId;
            }
            return {...state }
        case types.ISOPENEQUATION:
            state.isOpenEquation = action.message.message;
            state.equationId = '';
            state.itemClicked = {};
            if(action.message.equationId) {
                state.equationId = action.message.equationId;
            }
            if(action.message.clickedItem) {
                state.itemClicked = action.message.clickedItem;
            }
            return {...state }
        default:
            return state
    }
}

export default transformReducer