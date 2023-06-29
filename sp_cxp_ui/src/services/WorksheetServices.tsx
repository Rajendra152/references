


// const initGrid = (rows,columns)=>{
//     const cell = {}
//     const readonlyCell = { value : '', readOnly: true }
//     const result=[]
//     const readonlyRow = new Array(columns)
//     const row = new Array(columns)
//     readonlyRow.fill(readonlyCell)
//     result.push(readonlyRow)
//     row.fill(cell)
//     row[0] = { value : '', readOnly: true }
//     for(let i=0 ; i< rows;i++){
//         result.push(row)
//     }
//     return result
// }

// export const getWorksheetData = (rows,columns)=>{
//     return initGrid(rows,columns)
// } 


import { createDataSet, getDataSet } from '../components/Redis/data';
import * as Config from '../components/App/Config';
import { post } from './DataService';

export const addRows = (rows,columns,cell)=>{
    const result = []
    const row = new Array(columns)
    row.fill(cell)
    for(let i=0 ; i< rows;i++){
        result.push(row)
    }
    return result
}

const initGrid = ()=>{
    const rows = 10;
    const columns = 6;
    const cell = {}
    const readonlyCell = { value : '', readOnly: true }
    const result=[]
    result.push(...addRows(1,columns,readonlyCell))
    result.push(...addRows(rows,columns,cell))
    return result
}

export const creatNewWorksheet = ()=>{
    return initGrid()
} 

export async function getWorksheetData(key){
    const dataset = await getDataSet(key)
    return dataset
}

export async function setWorksheetData(data){
    const key = await createDataSet(data);
    return key;
}

export async function  getReportDataFromDB(columnData){
    const data = await post(Config.getReportDataFromDB, columnData)
    return data
}