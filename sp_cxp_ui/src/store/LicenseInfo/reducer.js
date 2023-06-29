import * as types from './actionTypes'
import {getSystemHostName} from '../../utils/globalUtility'
const initialState = {
    userName: getSystemHostName()
}

const LicenseInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SUMMARYDETAILS:
            const newState = {
                ...state,
                ...action.message,
            }
            return {...newState }
            
        default:
            return state
    }
}

export default LicenseInfoReducer