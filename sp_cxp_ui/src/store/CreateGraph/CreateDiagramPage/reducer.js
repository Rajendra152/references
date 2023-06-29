import { type } from 'os'
import * as types from './actionTypes'

const initialState = {
    selectedNodeType: '',
    zoomType: '',
    nodes: { allNodes: [], allConnectors: [] },
    showRuler: false,
    grids: true,
    showHorizontal: true,
    showVertical: true,
    diagramPageInstance: '',
    pageZoomValue: '',
    enablePageMovement: false,
    enableSnapTo: false,
    reRenderGraph: true,
    copiedElementIDS : { nodeIDs: [], connectorIDs: [], graphIDs: [], graphPageID : ''},
    pageCoordinates : {x: '', y : ''},
    isViewData : '',
    isNext: false,
    selectedCopiedItems : {},
    previosSelectedNode:''
}

const createDiagramPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.DIAGRAMPAGEINSTANCE:
            state.diagramPageInstance = action.message
            return { ...state }
        case types.SETUNDOTYPE:
            state.previosSelectedNode = action.message
            return {...state}
        case types.ISSHOWGRIDS:
            if(action.message) {
                if('showGrid' in action.message) {
                    state.grids = action.message.showGrid
                }
                if('showHorizontal' in action.message) {
                    state.showHorizontal = action.message.showHorizontal
                }
                if('showVertical' in action.message) {
                    state.showVertical = action.message.showVertical
                }
            }
            return { ...state }
        case types.SETGRAPHNODETYPE:
            state.selectedNodeType = action.message;
            return { ...state }
         
        case types.ZOOMACTIONTYPE:
            state.zoomType = action.message
            return { ...state }
        case types.PAGEZOOMVALUE:
            state.pageZoomValue = action.message
            return { ...state }
        case types.SETDIAGRAMNODES:
            state.nodes = action.message
            return { ...state }
        case types.ISSETRULERS:
            state.showRuler = action.message
            return { ...state }
        case types.ISSETPAGEMOVEMENT:
            state.enablePageMovement = action.message
            return { ...state }
        case types.ISSETSNAPTO:
            state.enableSnapTo = action.message
            return { ...state }
        case types.RERENDERGRAPH:
            state.reRenderGraph = action.message
            return { ...state }
        case types.SETCOPIEDELEID:
            state.copiedElementIDS = action.message
            return { ...state }
            case types.SETPAGECOORDINATES:
                state.pageCoordinates = action.message
                return { ...state }

        case types.SETNEWVIEWSECOBJ:
            state.isViewData = action.message
            return { ...state} 

        case types.ISNEXT:
            state.isNext = action.message
            return { ...state}   
        case types.SETCOPIEDITEMS:
            state.selectedCopiedItems = action.message
            return { ...state}   
        default:
            return state
    }
}

export default createDiagramPageReducer
