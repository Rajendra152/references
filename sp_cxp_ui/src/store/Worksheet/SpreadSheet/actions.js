import * as types from './actionTypes'

export const isInstanceAvailable = (message) => {
    return (dispatch) => {
        dispatch(isInstanceAvailableMessage(message))
    }
}

const isInstanceAvailableMessage = message => ({
    type: types.ISINSTANCEAVAILABLE,
    message
})





export const isUndoDataAvailable = (message) => {
    return (dispatch) => {
        dispatch(isUndoDataAvailableMessage(message))
    }
}

const isUndoDataAvailableMessage = message => ({
    type: types.ISUNDODATAVAILABLE,
    message
})


export const isRedoDataAvailable = (message) => {
    return (dispatch) => {
        dispatch(isRedoDataAvailableMessage(message))
    }
}

const isRedoDataAvailableMessage = message => ({
    type: types.ISREDODATAVAILABLE,
    message
})


export const updateRowIndex = (message) => {
    return (dispatch) => {
        dispatch(isUpdateRowIndexMessage(message))
    }
}

const isUpdateRowIndexMessage = message => ({
    type: types.UPDATEROWINDEX,
    message
})


export const updateWizardOpen = (message) => {
    return (dispatch) => {
        dispatch(updateWizardOpenMessage(message))
    }
}

const updateWizardOpenMessage = message => ({
    type: types.ISWIZARDOPEN,
    message
})
export const setDialogInstance = (message) => {
    return (dispatch) => {
        dispatch(diaglogInstanceObjSet(message))
    }
}

const diaglogInstanceObjSet = message => ({
    type: types.DIALOGINSTANCE,
    message
})

export const isDataSelectionAvailable = (message) => {
    return (dispatch) => {
        dispatch(isDataSelectionAvailableMessage(message))
    }
}

const isDataSelectionAvailableMessage = message => ({
    type: types.ISDATASELECTIONAVAILABLE,
    message
})

export const isRangeAvailable = (message) => {
    return (dispatch) => {
        dispatch(isRangeAvailableMessage(message))
    }
}

const isRangeAvailableMessage = message => ({
    type: types.ISRANGEAVAILABLE,
    message
})


export const updateColumnData = (message) => {
    return (dispatch) => {
        dispatch(updateColumnDataMessage(message))
    }
}

const updateColumnDataMessage = message => ({
    type: types.UPDATECOLUMNDATA,
    message
})
export const isExportInstanceAvailable = (message) => {
    return (dispatch) => {
        dispatch(isExportInstanceAvailableMessage(message))
    }
}

const isExportInstanceAvailableMessage = message => ({
    type: types.ISEXPORTINSTANCEAVAILABLE,
    message
})

export const showCalculations = (message) => {
    return (dispatch) => {
        dispatch(showCalculationsMessage(message))
    }
}

const showCalculationsMessage = message => ({
    type: types.SHOWCALCULATIONS,
    message
})

export const exportDataSelectionColumnData = (message) => {
    return (dispatch) => {
        dispatch(exportDataSelectionColumnDataMessage(message))
    }
}

const exportDataSelectionColumnDataMessage = message => ({
    type: types.EXPORTDATASELECTIONCOLUMNS,
    message
})

export const exportDataSelectionStepWiseData = (message) => {
    return (dispatch) => {
        dispatch(exportDataSelectionStepWiseDataMessage(message))
    }
}
const updateDataSelectionColumnDataMessage = message => ({
    type: types.UPDATEFREQLIST,
    message
})

export const updateDataSelectionStepWiseData = (message) => {
    return (dispatch) => {
        dispatch(updateDataSelectionColumnDataMessage(message))
    }
}
const updateDataSelectionfre = message => ({
    type: types.UPDATEFREQ,
    message
})

export const updateDataSelectionfreq = (message) => {
    return (dispatch) => {
        dispatch(updateDataSelectionfre(message))
    }
}



const exportDataSelectionStepWiseDataMessage = message => ({
    type: types.EXPORTDATASELECTIONSTEPWISE,
    message
})
//for data selection table
export const exportDataSelectionStepWiseDataTable = (message) => {
    return (dispatch) => {
        dispatch(exportDataSelectionStepWiseDataTableMessage(message))
    }
}

const exportDataSelectionStepWiseDataTableMessage = message => ({
    type: types.EXPORTDATASELECTIONSTEPWISETABLE,
    message
})
//for status label
export const exportStatusLabelValues = (message) => {
    return (dispatch) => {
        dispatch(exportStatusLabelValuesMessage(message))
    }
}

const exportStatusLabelValuesMessage = message => ({
    type: types.EXPORTSTATUSLABELVALUES,
    message
})

export const updateRegion = (message) => {
    return (dispatch) => {
        dispatch(updateRegionMessage(message))
    }
}

const updateRegionMessage = message => ({
    type: types.UPDATEREGION,
    message
})


export const updateRedistestkey = (message) => {
    console.log("entered")
    return (dispatch) => {
        dispatch(updateRedistestkeys(message))
    }
}

const updateRedistestkeys = message => ({
    type: types.UPDATEREDISTEST,
    message
})