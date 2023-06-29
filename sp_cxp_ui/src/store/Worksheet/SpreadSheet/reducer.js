import * as types from './actionTypes'

const initialState = {
    instance: null,
    range: null,
    spreadSheetColumnData: [],
    exportInstance: null,
    dataSelection: null,
    dialogInstance: '',
    showCalculations: false,
    dataSelectionColumns: null,
    dataSelectionColumnsfre: null,
    dataSelColumnsfre: null,
    dataSelectionStepWise: null,
    sum: 0,
    min: 0,
    max: 0,
    average: 0,
    undo: "disableUndo",
    redo: "disableRedo",
    rowIndex: 1,
    colIndex: 1,
    isWizardOpen: false,
    statuslabelvalue: [],
    dataSelectionStepWiseTable: null,
    rediskeytest: ""

}

const instanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISINSTANCEAVAILABLE:
            state.instance = action.message.message;
            return { ...state }
        case types.ISUNDODATAVAILABLE:
            state.undo = action.message.message;
            return { ...state }
        case types.ISREDODATAVAILABLE:
            state.redo = action.message.message;
            return { ...state }
        case types.ISRANGEAVAILABLE:
            state.range = action.message.message;
            return { ...state }
        case types.UPDATECOLUMNDATA:
            state.spreadSheetColumnData = action.message.message;
            return { ...state }
        case types.ISEXPORTINSTANCEAVAILABLE:
            state.exportInstance = action.message.message
            return { ...state }
        case types.ISDATASELECTIONAVAILABLE:
            state.dataSelection = action.message.message
            return { ...state }
        case types.DIALOGINSTANCE:
            state.dialogInstance = action.message
            return { ...state }
        case types.UPDATEREDISTEST:
            state.rediskeytest = action.message
            return { ...state }
        case types.ISDATASELECTIONAVAILABLE:
            state.dataSelection = action.message.message
            return { ...state }
        case types.SHOWCALCULATIONS:
            state.showCalculations = action.message.message
            state.sum = 0;
            state.min = 0;
            state.max = 0;
            state.average = 0;
            if ('sum' in action.message) {
                state.sum = action.message.sum;
            }
            if ('min' in action.message) {
                state.min = action.message.min;
            }
            if ('max' in action.message) {
                state.max = action.message.max;
            }
            if ('average' in action.message) {
                state.average = action.message.average;
            }
            return { ...state }
        case types.EXPORTDATASELECTIONCOLUMNS:
            state.dataSelectionColumns = action.message.message
            return { ...state }
        case types.UPDATEFREQLIST:
            state.dataSelectionColumnsfre = action.message.message
            return { ...state }
        case types.UPDATEFREQ:
            state.dataSelColumnsfre = action.message.message
            return { ...state }
        case types.EXPORTDATASELECTIONSTEPWISE:
            state.dataSelectionStepWise = action.message.message
            return { ...state }
        case types.UPDATEROWINDEX:
            state.rowIndex = action.message.message
            return { ...state }
        case types.ISWIZARDOPEN:
            state.isWizardOpen = action.message.message;
            return { ...state }
        case types.EXPORTSTATUSLABELVALUES:
            state.statuslabelvalue = action.message.message;
            return { ...state }
        case types.EXPORTDATASELECTIONSTEPWISETABLE:
            state.dataSelectionStepWiseTable = action.message.message;
            return { ...state }
        default:
            return state
    }
}

export default instanceReducer