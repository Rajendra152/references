import * as types from './actionTypes'

const initialState = {
    isOpenSaTtest: false,
    isOpenSaPairedTtest: false,
    isOpenSaProportions: false,
    isOpenSaAnova: false,
    isOpenSaChisquare: false,
    isOpenSaCorrelation: false,
    isChiSquareDataAvailable:'',
}

const sampleSizeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENTTEST:
            state.isOpenSaTtest = action.message.message;
            return {...state }
        case types.ISOPENPAIREDTTEST:
            state.isOpenSaPairedTtest = action.message.message;
            return {...state }
        case types.ISOPENPROPORIONS:
            state.isOpenSaProportions = action.message.message;
            return {...state }
        case types.ISOPENANOVA:
            state.isOpenSaAnova = action.message.message;
            return {...state }
        case types.ISOPENCHISQUARE:
            state.isOpenSaChisquare = action.message.message;
            return {...state }
        case types.ISOPENCORRELATION:
            state.isOpenSaCorrelation = action.message.message;
            return {...state }
        case types.ISCHISQUAREDATAVAILABLE:
        state.isChiSquareDataAvailable = action.message.message;
        return {...state }
        default:
            return state
    }
}

export default sampleSizeReducer