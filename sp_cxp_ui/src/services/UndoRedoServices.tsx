const graphUndoRedoState: any = {};
let undoRedoInProgress = false;
let graphReload = false;
let initialGraphCreation = false;

export const setGraphReload = (reload: boolean) => {
    graphReload = reload;
}

export const getGraphReload = () => {
    return graphReload;
}

export const setInitialGraphCreation = (creation: boolean) => {
    initialGraphCreation = creation;
}

export const getInitialGraphCreation = () => {
    return initialGraphCreation;
}

export const addNewGraphState = (newState: any, props: any, initialLoad?: boolean, syncfusionUndoRedo?: boolean) => {
    if(undoRedoInProgress) return;
    if(newState && newState.id) {
        if(initialLoad && graphUndoRedoState[newState.id]) {
            enableDisableUndoRedo(newState.id, props);
            return;
        }

        const state = {...newState};
        state.syncfusionUndoRedo = syncfusionUndoRedo ? true : false;
        if(graphUndoRedoState[newState.id]) {
            const currentIndex = graphUndoRedoState[newState.id].currentStateIndex;
            const newStates = [...graphUndoRedoState[newState.id].states.slice(0, (currentIndex+1)), state];
            const newIndex = newStates.length - 1;
            graphUndoRedoState[newState.id] = JSON.parse(JSON.stringify({currentStateIndex: newIndex, states: newStates}))
        } else {
            if(state.graphList.length && getInitialGraphCreation()) {
                setInitialGraphCreation(false);
                const defaultState = {
                    allConnectorsList: [],
                    allGraphId: [],
                    allNodesList: [],
                    contourLength: 0,
                    graph2DLength: 0,
                    graph3DLength: 0,
                    graphLength: 0,
                    graphList: [],
                    pieGraphLength: 0,
                    rectangleList: [],
                    textList: []
                }
                const initialState = {...JSON.parse(JSON.stringify(state)), ...defaultState};
                graphUndoRedoState[newState.id] = JSON.parse(JSON.stringify({currentStateIndex: 1, states: [initialState, state]}));
            } else {
                graphUndoRedoState[newState.id] = JSON.parse(JSON.stringify({currentStateIndex: 0, states: [state]}));
            }
        }
        enableDisableUndoRedo(newState.id, props);

        if(initialLoad) return;

        if(!state.syncfusionUndoRedo) {
            // props.isReRenderGraph(false);
            setGraphReload(false);
            setTimeout(() => {
                // props.isReRenderGraph(true);
            })
        }
    }
}

export const removeGraphState = (graphId: string, props: any) => {
    if(graphUndoRedoState[graphId]) {
        delete graphUndoRedoState[graphId];
    }
    enableDisableUndoRedo(graphId, props);
}

export const undoGraphState = (graphId: string, props: any) => {
    if(graphUndoRedoState[graphId]) {
        const { currentStateIndex, states } = graphUndoRedoState[graphId];
        if(currentStateIndex > 0 && states.length > 1) {
            setProgress(true);
            const newIndex = currentStateIndex - 1
            const newState = JSON.parse(JSON.stringify(graphUndoRedoState[graphId].states[newIndex]));
            graphUndoRedoState[graphId].currentStateIndex = newIndex;
            props.isReRenderGraph(false);
            delete newState.syncfusionUndoRedo;
            props.updateGraphProperty({ upGrPg: newState })
            setTimeout(() => {
                setProgress(false);
            }, 100)
        }
    }
    enableDisableUndoRedo(graphId, props);
}

export const redoGraphState = (graphId: string, props: any) => {
    if(graphUndoRedoState[graphId]) {
        const { currentStateIndex, states } = graphUndoRedoState[graphId];
        if(states.length > (currentStateIndex + 1)) {
            setProgress(true);
            const newIndex = currentStateIndex + 1
            const newState = JSON.parse(JSON.stringify(graphUndoRedoState[graphId].states[newIndex]));
            graphUndoRedoState[graphId].currentStateIndex = newIndex;
            props.isReRenderGraph(false);
            delete newState.syncfusionUndoRedo;
            props.updateGraphProperty({ upGrPg: newState })
            setTimeout(() => {
                setProgress(false);
            }, 100)
        }
    }
    enableDisableUndoRedo(graphId, props);
}

export const getActiveGraphPage = (notebookState: any) => {
    const { activeItems, selectedPivotItem } = notebookState;
    let activeGraphId = [];
    if(activeItems && activeItems.length && selectedPivotItem) {
        activeGraphId = activeItems.filter((item: any) => {
        if(item.id === selectedPivotItem && item.type === 'graphPage') {
            return true;
        }
        return false;
        })
    }
    return activeGraphId;
}

const enableDisableUndoRedo = (graphId: string, props: any) => {
    if(graphUndoRedoState[graphId]) {
        const { currentStateIndex, states } = graphUndoRedoState[graphId];
        if(currentStateIndex > 0) {
            enableDisableUndo('', props);
        } else {
            enableDisableUndo('disableUndo', props);
        }
        if((currentStateIndex + 1)  < states.length) {
            enableDisableRedo('', props);
        } else {
            enableDisableRedo('disableRedo', props);
        }
    } else {
        enableDisableUndo('disableUndo', props);
        enableDisableRedo('disableRedo', props);
    }
}

const enableDisableUndo = (message: string, props: any) => {
    props.isUndoDataAvailable({message})
}

const enableDisableRedo = (message: string, props: any) => {
    props.isRedoDataAvailable({message})
}

const setProgress = (flag: boolean) => {
    undoRedoInProgress = flag;
}
