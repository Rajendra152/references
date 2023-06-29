import * as types from './actionTypes'

export const isOpenPwTtest  = (message) => {
    return (dispatch) => {
        dispatch(isOpenPwTtestMessage(message))
    }
}

const isOpenPwTtestMessage = message => ({
    type: types.ISOPENPWTTEST,
    message
})

export const isOpenPwPairedTtest = (message) => {
    return (dispatch) => {
        dispatch(isOpenPwPairedTtestMessage(message))
    }
}


const isOpenPwPairedTtestMessage = message => ({
    type: types.ISOPENPWPAIREDTTEST,
    message
})

export const isOpenPwProportions = (message) => {
    return (dispatch) => {
        dispatch(isOpenPwProportionsMessage(message))
    }
}


const isOpenPwProportionsMessage = message => ({
    type: types.ISOPENPWPROPORIONS,
    message
})

export const isOpenPwAnova = (message) => {
    return (dispatch) => {
        dispatch(isOpenPwAnovaMessage(message))
    }
}


const isOpenPwAnovaMessage = message => ({
    type: types.ISOPENPWANOVA,
    message
})

export const isOpenPwChisquare = (message) => {
    console.log(message)
    return (dispatch) => {
        dispatch(isOpenPwChisquareMessage(message))
    }
}


const isOpenPwChisquareMessage = message => ({
    type: types.ISOPENPWCHISQUARE,
    message
})

export const isOpenPwCorrelation = (message) => {
    return (dispatch) => {
        dispatch(isOpenPwCorrelationMessage(message))
    }
}


const isOpenPwCorrelationMessage = message => ({
    type: types.ISOPENPWCORRELATION,
    message
})

