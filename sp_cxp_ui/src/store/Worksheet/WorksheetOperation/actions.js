import * as types from './actionTypes'

// setting Active Worksheet
export const setActiveWorksheet = (activeKey) => {
  return (dispatch) => {
      dispatch(activeWorksheetKey(activeKey))
  }
}

const activeWorksheetKey = activeKey => ({
  type: types.SETACTIVEWORKSHEET,
  activeKey
})


// storing new worksheet
export const storeWorksheet = (worksheetInfo) => {
    return (dispatch) => {
        dispatch(storeWorksheetKey(worksheetInfo))
    }
}

const storeWorksheetKey = worksheetInfo => ({
    type: types.STOREWORKSHEET,
    worksheetInfo
})


// Remove worksheet
export const removeWorksheet = (worksheetKey) => {
    return (dispatch) => {
        dispatch(removeWorksheetKey(worksheetKey))
    }
}

const removeWorksheetKey = worksheetKey => ({
    type: types.REMOVEWORKSHEET,
    worksheetKey
})

// storing new graph
export const storeGraph = (GraphInfo) => {
    return (dispatch) => {
        dispatch(storeGraphKey(GraphInfo))
    }
}

const storeGraphKey = graphInfo => ({
    type: types.STOREGRAPH,
    graphInfo
})


// Remove worksheet
export const removeGraph = (graphKey) => {
    return (dispatch) => {
        dispatch(removeGraphKey(graphtKey))
    }
}

const removeGraphKey = graphKey => ({
    type: types.REMOVEGRAPH,
    graphKey
})

