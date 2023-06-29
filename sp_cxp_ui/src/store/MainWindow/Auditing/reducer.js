import * as types from './actionTypes'

const initialState = {
    isAuditing: false,
    auditingInfo: {},
    isAuditMain: false,
    isPasswordData: {},
    isEnableView: false,
    EncrpNotebook: {},
    isOpenNotePass: false,
    isAuditPasswordData: {}
}

const auditingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISAUDITING:
            state.isAuditing = action.message.message;
            return {...state }
            break;
        case types.AUDITINGUPDATE:
            state.auditingInfo = action.message.message;
            return {...state }
            break;
        case types.ISAUDITINGMAIN:
            state.isAuditMain = action.message.message;
            return {...state }
            break;
        case types.ISPASSWORDMAIN:
            state.isPasswordMain = action.message.message;
            return {...state }
            break;
        case types.ISPASSWORDDATA:
            state.isPasswordData = action.message.message
            return {...state }
        case types.ISENABLEVIEW:
            state.isEnableView = action.message.message
            return {...state }
        case types.UPDATE_ECRP_PASS:
            state.EncrpNotebook = action.message.message
            return {...state }
        case types.ISOPENNOTEPASS:
            state.isOpenNotePass = action.message.message
            return {...state }
        case types.ISAUDITPASSWORDDATA:
            state.isAuditPasswordData = action.message.message
            return {...state }
        default:
            return state
    }
}

export default auditingReducer