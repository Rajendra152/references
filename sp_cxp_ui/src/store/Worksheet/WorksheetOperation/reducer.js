import * as types from './actionTypes'

const initialState = {
    activeWorksheet: '',
    openWorksheets:[],
    openGraphs:[],
    openGraphPages:[]
}

const worksheetOperationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SETACTIVEWORKSHEET:
            state.activeWorksheet = action.activeKey;
            return {...state }

        case types.STOREWORKSHEET:
            state.openWorksheets.push(action.worksheetInfo);
            return {...state }

        case types.REMOVEWORKSHEET:
            state.openWorksheets= state.openWorksheets.filter(data=> !action.worksheetKey in data)
            return {...state }

        case types.STOREGRAPH:
            state.openGraphs.push(action.graphInfo);
            return {...state }

        case types.REMOVEGRAPH:
            state.openGraphs= state.openGraphs.filter(data => !action.graphKey in data)
            return {...state }

        case types.CLEARNOTEBOOK:
            console.log("Is I am clearing Hereor not...............****************")
            return {
              activeWorksheet: '',
              openWorksheets:[],
              openGraphs:[],
              openGraphPages:[]
          }

        default:
            return state
    }
}

export default worksheetOperationReducer;
