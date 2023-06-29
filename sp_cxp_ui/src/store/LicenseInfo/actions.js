import * as types from './actionTypes'

export const licenseInfoAction = (message) => {
    return (dispatch) => {
        dispatch(licenseInfoMessage(message))
    }
}

const licenseInfoMessage = message => ({
    type: types.LICENSE_DETAILS,
    message
})
