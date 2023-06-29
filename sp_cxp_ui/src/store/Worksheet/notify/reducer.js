import * as types from './actionTypes'

const initialState = {
    notificationList: [],
    contactInstance: [],
    findcompontent: { openFind: false, },
    openFind: false,
}

const notify = (state = initialState, action) => {
    switch (action.type) {
        case types.NOTIFYADD:
            state.notificationList.push(action.message);
            return {...state, notificationList: [...state.notificationList] }
        case types.NOTIFYUPDATE:
            state.notificationList = action.message;
            return {...state, notificationList: action.message }
        case types.NOTIFYEMPTY:
            state.notificationList = [];
            return {...state, notificationList: [] }
        case types.CONTACTINCUPDATE:
            state.contactInstance.push(action.message);
            return {...state, contactInstance: [...state.contactInstance] }
        case types.OPENFIND:
            state.openFind = action.message.message;
            console.log(state.openFind);
            return {...state }
        default:
            return state
    }
}

export default notify