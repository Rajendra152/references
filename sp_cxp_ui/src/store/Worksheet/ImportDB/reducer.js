import * as types from './actionTypes';

const initialState = {
    isOpenImportDB: false,
    tableList: {},
    isTableQuery: false,
    isODBCOption: false,
    isOpenImportTable: false,
    isOpenSQLQuery: false,
    isODBCConnectionStr: false,
    isODBCConnectionPath: false,
    isOpenJDBCConn: false,
    dataSheet: [],
    isUpdateSheet: false,
    recentConn: 'ODBC',
    countSheet: 0
}

const importDBReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPENIMPORTDB:
            state.recentConn = 'ODBC';
            state.isOpenImportDB = action.message.message;
            return {...state }
        case types.ISOPENODBCOPTION:
            state.recentConn = 'ODBC';
            state.isODBCOption = action.message.message;
            return {...state }
        case types.ISOPENIMPORTTABLE:
            state.isOpenImportTable = action.message.message;
            return {...state }
        case types.ISOPENODBCCONNSTRING:
            state.recentConn = 'ODBC';
            state.isODBCConnectionStr = action.message.message;
            return {...state }
        case types.ISOPENODBCCONNPATH:
            state.isODBCConnectionPath = action.message.message;
            return {...state }
        case types.ISOPENSQLQUERY:
            state.isOpenSQLQuery = action.message.message;
            return {...state }
        case types.ISOPENJDBCCONN:
            state.recentConn = 'JDBC';
            state.isOpenJDBCConn = action.message.message;
            return {...state }
        case types.ADDTABLELIST:
            state.tableList = action.message.message;
            return {...state }
        case types.ISOPENTABLELIST:
            state.isTableQuery = action.message.message;
            return {...state }
        case types.SHEETUPDATE:
            state.dataSheet = [...action.message.message];
            state.isUpdateSheet = true;
            return {...state }
        case types.ISSHEETUPDATE:
            state.isUpdateSheet = action.message.message;
            return {...state }
        case types.COUNTSHEET:
            state.countSheet = action.message.message;
            return {...state }
        default:
            return state
    }
}

export default importDBReducer