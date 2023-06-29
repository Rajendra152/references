import { createDataSet, getDataSet } from '../components/Redis/data';
import * as Config from '../components/App/Config';
import { post } from './DataService';
import { updatDatasetInRedis } from '../services/RedisServices';
import { GridConst } from "./../components/Worksheet/Grid";

export const addRows = (rows, columns, cell) => {
  const result = [];
  const row = new Array(columns);
  row.fill(cell);
  for (let i = 0; i < rows; i++) {
    result.push(row);
  }
  return result;
};

export const initGrid = () => {
  const rows = 10;
  const columns = 6;
  const cell = {value:""};
  const readonlyCell = { value: '', readOnly: true };
  const result = [];
  result.push(...addRows(1, columns, readonlyCell));
  result.push(...addRows(rows, columns, cell));

  // return result;
  console.log(GridConst())
  return GridConst();
};

export async function setWorksheetData(data, worksheetKey) {
  const key = await createDataSet(data, worksheetKey);
  return key;
}

export const creatNewWorksheet = () => {
  const data = initGrid();
  const key = setWorksheetData(data);
  return data;
};

export async function getWorksheetData(key) {
  const dataset = await getDataSet(key);
  return dataset;
}

export async function getReportDataFromDB(columnData) {
  const data = await post(
    Config.getReportDataFromDB,
    columnData
  );
  return data;
}

export async function updateData(client, data, worksheetId) {
  const response = await updatDatasetInRedis(client, data, worksheetId);
  return response;
}
