import * as types from './actionTypes'

export const isAuditList = (message) => {
    return (dispatch) => {
        dispatch(isAuditListMessage(message))
    }
}


const isAuditListMessage = message => ({
    type: types.ISAUDITING,
    message
})


export const AuditListUpdate = (message) => {
    return (dispatch) => {
        dispatch(AuditListUpdateMessage(message))
    }
}


const AuditListUpdateMessage = message => ({
    type: types.AUDITINGUPDATE,
    message
})

export const isAuditMain = (message) => {
    return (dispatch) => {
        dispatch(isAuditMainMessage(message))
    }
}

const isAuditMainMessage = message => ({
    type: types.ISAUDITINGMAIN,
    message
})

export const isPasswordMain = (message) => {
    return (dispatch) => {
        dispatch(isPassordMainMessage(message))
    }
}

const isPassordMainMessage = message => ({
    type: types.ISPASSWORDMAIN,
    message
})


export const isPasswordUpdate = (message) => {
    return (dispatch) => {
        console.log(message, 'isPasswordUpdate');
        dispatch(isPasswordUpdateMessage(message))
    }
}

const isPasswordUpdateMessage = message => ({
    type: types.ISPASSWORDDATA,
    message
})

export const isEnableView = (message) => {
    return (dispatch) => {
        dispatch(isEnableViewMessage(message))
    }
}

const isEnableViewMessage = message => ({
    type: types.ISENABLEVIEW,
    message
})


export const updateEncrpPass = (message) => {
    return (dispatch) => {
        dispatch(updateEncrpPassMessage(message))
    }
}

const updateEncrpPassMessage = message => ({
    type: types.UPDATE_ECRP_PASS,
    message
})

export const isOpenNotePass = (message) => {
    return (dispatch) => {
        dispatch(isOpenNotePassMessage(message))
    }
}

const isOpenNotePassMessage = message => ({
    type: types.ISOPENNOTEPASS,
    message
})

export const isAuditPasswordUpdate = (message) => {
    return (dispatch) => {
        console.log(message, 'isPasswordUpdate');
        dispatch(isAuditPasswordUpdateMessage(message))
    }
}

const isAuditPasswordUpdateMessage = message => ({
    type: types.ISAUDITPASSWORDDATA,
    message
})