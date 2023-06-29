import * as types from './actionTypes'

export const isOpenSaTtest  = (message) => {
    return (dispatch) => {
        dispatch(isOpenSaTtestMessage(message))
    }
}

const isOpenSaTtestMessage = message => ({
    type: types.ISOPENTTEST,
    message
})

export const isOpenSaPairedTtest = (message) => {
    return (dispatch) => {
        dispatch(isOpenSaPairedTtestMessage(message))
    }
}


const isOpenSaPairedTtestMessage = message => ({
    type: types.ISOPENPAIREDTTEST,
    message
})

export const isOpenSaProportions = (message) => {
    return (dispatch) => {
        dispatch(isOpenSaisOpenSaProportionsMessage(message))
    }
}


const isOpenSaisOpenSaProportionsMessage = message => ({
    type: types.ISOPENPROPORIONS,
    message
})

export const isOpenSaAnova = (message) => {
    return (dispatch) => {
        dispatch(isOpenSaAnovaMessage(message))
    }
}


const isOpenSaAnovaMessage = message => ({
    type: types.ISOPENANOVA,
    message
})

export const isOpenSaChisquare = (message) => {
    return (dispatch) => {
        dispatch(isOpenSaChisquareMessage(message))
    }
}


const isOpenSaChisquareMessage = message => ({
    type: types.ISOPENCHISQUARE,
    message
})

export const isOpenSaCorrelation = (message) => {
    return (dispatch) => {
        dispatch(isOpenSaCorrelationMessage(message))
    }
}


const isOpenSaCorrelationMessage = message => ({
    type: types.ISOPENCORRELATION,
    message
})

export const isChiSquareDataAvailable = (message) => {
    return (dispatch) => {
        dispatch(isChiSquareDataAvailableMessage(message))
    }
}
const isChiSquareDataAvailableMessage = message => ({
    type: types.ISCHISQUAREDATAVAILABLE,
    message
})
