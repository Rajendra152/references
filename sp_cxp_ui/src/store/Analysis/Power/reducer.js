import * as types from './actionTypes'

const initialState = {
    isOpenPwTtest: false,
    isOpenPwPairedTtest: false,
    isOpenPwProportions: false,
    isOpenPwAnova: false,
    isOpenPwChisquare: false,
    isOpenPwCorrelation: false
}

const powerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENPWTTEST:
            state.isOpenPwTtest = action.message.message;
            return {...state }
        case types.ISOPENPWPAIREDTTEST:
            state.isOpenPwPairedTtest = action.message.message;
            return {...state }
        case types.ISOPENPWPROPORIONS:
            state.isOpenPwProportions = action.message.message;
            return {...state }
        case types.ISOPENPWANOVA:
            state.isOpenPwAnova = action.message.message;
            return {...state }
        case types.ISOPENPWCHISQUARE:
            state.isOpenPwChisquare = action.message.message;
            return {...state }
        case types.ISOPENPWCORRELATION:
            state.isOpenPwCorrelation = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default powerReducer;
// export const ISOPENPWTTEST = 'ISOPENPWTTEST';
// export const ISOPENPWPAIREDTTEST = 'ISOPENPWPAIREDTTEST';
// export const ISOPENPWPROPORIONS = 'ISOPENPWPROPORIONS';
// export const ISOPENPWANOVA = 'ISOPENPWANOVA';
// export const ISOPENPWCHISQUARE = 'ISOPENPWCHISQUARE';
// export const ISOPENPWCORRELATION = 'ISOPENPWCORRELATION';