import * as types from './actionTypes'

const initialState = {
    
}

const recentSavedFileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RECENTSAVEDFILE:
            const newState = {
                ...state,
                [action.message.path]:action.message
            }
            return {...newState }
            
        case types.SAVEDALLFILEPATH:
            const newSaveState = {
                ...state,
                ...action.message
            }
            return {...newSaveState }
            
        case types.DELETEALLFILEPATH:
            const newDelState = {
                ...state,
            }
            delete newDelState[action.message]
            return {...newDelState }
            
        default:
            return state
    }
}

export default recentSavedFileReducer