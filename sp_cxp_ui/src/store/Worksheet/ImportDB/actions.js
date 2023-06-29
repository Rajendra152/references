import * as types from './actionTypes'

export const isOpenImportDB = (message) => {
    return (dispatch) => {
        dispatch(isOpenImportDBMessage(message))
    }
}


const isOpenImportDBMessage = message => ({
    type: types.ISOPENIMPORTDB,
    message
})

export const addTableList = (message) => {
    return (dispatch) => {
        dispatch(addTableListMsg(message))
    }
}

const addTableListMsg = message => ({
    type: types.ADDTABLELIST,
    message
})



export const isOpenTableQuery = (message) => {
    return (dispatch) => {
        dispatch(isOpenTableListMsg(message))
    }
}

const isOpenTableListMsg = message => ({
    type: types.ISOPENTABLELIST,
    message
})


export const isOpenODBCOption = (message) => {
    return (dispatch) => {
        dispatch(isOpenODBCOptionMsg(message))
    }
}

const isOpenODBCOptionMsg = message => ({
    type: types.ISOPENODBCOPTION,
    message
})


export const isOpenImportTable = (message) => {
    return (dispatch) => {
        dispatch(isOpenImportTableMsg(message))
    }
}

const isOpenImportTableMsg = message => ({
    type: types.ISOPENIMPORTTABLE,
    message
})


export const isOpenSQLQuery = (message) => {
    return (dispatch) => {
        dispatch(isOpenSQLQueryMsg(message))
    }
}

const isOpenSQLQueryMsg = message => ({
    type: types.ISOPENSQLQUERY,
    message
})

export const isOpenODBCConnStr = (message) => {
    return (dispatch) => {
        dispatch(isOpenODBCConnStrMsg(message))
    }
}

const isOpenODBCConnStrMsg = message => ({
    type: types.ISOPENODBCCONNSTRING,
    message
})


export const isOpenODBCConnPath = (message) => {
    return (dispatch) => {
        dispatch(isOpenODBCConnPathMsg(message))
    }
}

const isOpenODBCConnPathMsg = message => ({
    type: types.ISOPENODBCCONNPATH,
    message
})

export const isOpenJDBCConn = (message) => {
    return (dispatch) => {
        dispatch(isOpenJDBCConnMsg(message))
    }
}

const isOpenJDBCConnMsg = message => ({
    type: types.ISOPENJDBCCONN,
    message
})

export const updateDataSheet = (message) => {
    return (dispatch) => {
        dispatch(updateDataSheetMsg(message))
    }
}

const updateDataSheetMsg = message => ({
    type: types.SHEETUPDATE,
    message
})


export const isUpdateSheet = (message) => {
    return (dispatch) => {
        dispatch(isUpdateSheetMsg(message))
    }
}

const isUpdateSheetMsg = message => ({
    type: types.ISSHEETUPDATE,
    message
})


export const countSheet = (message) => {
    return (dispatch) => {
        dispatch(countSheetMsg(message))
    }
}

const countSheetMsg = message => ({
    type: types.COUNTSHEET,
    message
})
