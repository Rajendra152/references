import * as types from './actionTypes'

export const isOpenGraphicCell = (message) => {
    return (dispatch) => {
        dispatch(isOpenGraphicCellMessage(message))
    }
}


const isOpenGraphicCellMessage = message => ({
    type: types.ISOPENGRAPHICCELL,
    message
})


export const GraphicCellUpdate = (message) => {
    return (dispatch) => {
        dispatch(GraphicCellUpdateMessage(message))
    }
}
export const GraphicCellRGBUpdate = (message) => {
    return (dispatch) => {
        dispatch(GraphicCellRGBUpdateMessage(message))
    }
}
const GraphicCellRGBUpdateMessage = message => ({
    type: types.GRAPHICCELLRGBUPDATE,
    message
})

const GraphicCellUpdateMessage = message => ({
    type: types.GRAPHICCELLUPDATE,
    message
})


export const GraphicCellPlotUpdate = (message) => {
    return (dispatch) => {
        dispatch(GraphicCellPlotMessage(message))
    }
}


const GraphicCellPlotMessage = message => ({
    type: types.GP_CELL_PLOTUPDATE,
    message
})