import * as types from './actionTypes'

const initialState = {
    isOpenImportfile: false,
    isOpenSpreadsheet: false,
    isOpenTableQuery: false,
    isOpenFieldSelection: false,
    isOpenImportText: false,
    spreadsheetData: [],
    importText: [],
    fieldSelection: []
}

const ImportfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENIMPORTFILE:
            state.isOpenImportfile = action.message.message;
            return {...state }
        case types.ISOPENSPREADSHEET:
            state.isOpenSpreadsheet = action.message.message;
            return {...state }
        case types.ISOPENTABLEQUERY:
            state.isOpenTableQuery = action.message.message;
            return {...state }
        case types.ISOPENFIELDSELECTION:
            state.isOpenFieldSelection = action.message.message;
            return {...state }
        case types.ISOPENIMPORTTEXT:
            state.isOpenImportText = action.message.message;
            return {...state }
        case types.SPREADSHEETUPDATE:
            state.spreadsheetData = action.message.message;
            return {...state }
        case types.TEXTUPDATE:
            state.importText = action.message.message;
            return {...state }
        case types.FIELDSELECTIONUPDATE:
            state.fieldSelection = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default ImportfileReducer