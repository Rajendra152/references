import * as types from './actionTypes'

const initialState = {
    isOpenGraphicCell: false,
    graphCellInfo: {},
    graphCellrgbInfo: {},
    graphCellPlot: {
        id: {
            clrColIdx: [],
            ptrColIdx: [],
            shpColIdx: [],
            lnColIdx: []
        }
    }
}

const graphicCellReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENGRAPHICCELL:
            state.isOpenGraphicCell = action.message.message;
            return { ...state }
            break;
        case types.GRAPHICCELLUPDATE:
            state.graphCellInfo = action.message.message;
            return { ...state }
            break;
        case types.GRAPHICCELLRGBUPDATE:
            state.graphCellrgbInfo = action.message.message;
            return { ...state }
            break;
        case types.GP_CELL_PLOTUPDATE:
            state.graphCellPlot = action.message.message;
            return { ...state }
            break;
        default:
            return state
    }
}

export default graphicCellReducer