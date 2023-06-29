import * as types from './actionTypes'

const initialState = {
    id:'',
    type:'',
    createdDate: '',
    modifiedDate: '',
    author:'',
    description:''
    
}

const summaryInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SUMMARYDETAILS:
            const newState = {
                id:action.message.id,
                type:action.message.type,
                createdDate: action.message.createdDate,
                modifiedDate: action.message.modifiedDate,
                author:action.message.author,
                description:action.message.description
            }
            return {...newState }
            
        default:
            return state
    }
}

export default summaryInfoReducer