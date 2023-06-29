import * as Types from './actionTypes'


export const setDiagramPageInstance = (message) => {
    return (dispatch) => {
        dispatch(setPageInstance(message))
    }
}

const setPageInstance = (message) => ({
    type: Types.DIAGRAMPAGEINSTANCE,
    message
})
export const setSelectedNode = (message) => {
    console.log(message, "in action")
    return (dispatch) => {
        dispatch(setSelectedElement(message),setundotype(message))
        if(message == "SELECT"){
        }
        else{
            dispatch(setundotype(message))
        }
    }
}

const setundotype = message =>({
    type:Types.SETUNDOTYPE,
    message
})

const setSelectedElement = message => ({
    type: Types.SETGRAPHNODETYPE,
    message
})

export const isSetRuler = (message) => {
    return (dispatch) => {
        dispatch(setRulers(message))
    }
}

const setRulers = message => (
    {
        type: Types.ISSETRULERS,
        message
    }
)


export const isShowGrids = (message) => {
    return (dispatch) => {
        dispatch(showGrids(message))
    }
}

const showGrids = message => (
    {
        type: Types.ISSHOWGRIDS,
        message
    }
)

export const isSetSnapTo = (message) => {
    return (dispatch) => {
        dispatch(enableSnapTo(message))
    }
}

const enableSnapTo = message => (
    {
        type: Types.ISSETSNAPTO,
        message
    }
)

export const isReRenderGraph = (message) => {
    return (dispatch) => {
        dispatch(enableReRenderGraph(message))
    }
}

const enableReRenderGraph = message => (
    {
        type: Types.RERENDERGRAPH,
        message
    }
)

export const setZoomActionType = (message) => {
    return (dispatch) => {
        dispatch(setActionType(message))
    }
}

const setActionType = message => ({
    type: Types.ZOOMACTIONTYPE,
    message
})

export const setPageZoomValue = (message) => {
    return (dispatch) => {
        dispatch(setZoomValue(message))
    }
}

const setZoomValue = message => ({
    type: Types.PAGEZOOMVALUE,
    message
})

export const setDiagramNodes = (message) => {
    return (dispatch) => {
        dispatch(setAllDiagramNodes(message))
    }
}

const setAllDiagramNodes = message => ({
    type: Types.SETDIAGRAMNODES,
    message
})

export const setPageMovement = (message) => {
    return (dispatch) => {
        dispatch(enablePageMovement(message))
    }
}

const enablePageMovement = message => (
    {
        type: Types.ISSETPAGEMOVEMENT,
        message
    }
)

export const setCopiedEleID = (message) => {
    return (dispatch) => {
        dispatch(setElementID(message))
    }
}

const setElementID = message => (
    {
        type: Types.SETCOPIEDELEID,
        message
    }
)


export const setXYCoordinates  = (message) => {
    return (dispatch) => {
        dispatch(setCoordinates(message))
    }
}

const setCoordinates  = (message) => ({
    type: Types.SETPAGECOORDINATES,
    message
})


export const setViewDataSecObj  = (message) => {
    return (dispatch) => {
        dispatch(setViewData(message))
    }
}

const setViewData  = (message) => ({
    type: Types.SETNEWVIEWSECOBJ,
    message
})

export const setIsNextValue  = (message) => {
    return (dispatch) => {
        dispatch(setNextValue(message))
    }
}

const setNextValue  = (message) => ({
    type: Types.ISNEXT,
    message
})


export const setSelectedElements  = (message) => {
    return (dispatch) => {
        dispatch(setElements(message))
    }
}

const setElements  = (message) => ({
    type: Types.SETCOPIEDITEMS,
    message
})